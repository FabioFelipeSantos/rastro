from rest_framework import viewsets, permissions
from rest_framework.decorators import action

from twitter.models import Tweet, TweetAssociation
from twitter.serializers import (
    TweetSerializer,
    ReTweetSerializer,
    ShareSerializer,
)
from twitter.services.tweet_services import TweetService
from twitter.response import ApiResponse, standard_response


class TweetViewSet(viewsets.ModelViewSet):
    """
    ViewSet para operações CRUD de tweets e suas interações
    """

    serializer_class = TweetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            Tweet.objects.all()
            .order_by("-created_at")
            .select_related("user", "user__bio", "user__bio__avatar")[:50]
        )

    @standard_response
    def list(self, request, *args, **kwargs):
        user = request.user
        user_tweets = Tweet.objects.filter(user=user).order_by("-created_at")

        result_serializer = self.get_serializer(user_tweets, many=True)

        return ApiResponse(
            data=result_serializer.data,
            message=f"Tweets do usuário {user.nickname} resgatados com sucesso",
            status_code=200,
        )

    @standard_response
    def create(self, request, *args, **kwargs):
        """Cria um novo tweet associado ao usuário logado"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        tweet = TweetService.create_tweet(
            user=request.user, text=serializer.validated_data["text"]
        )

        result_serializer = self.get_serializer(tweet)
        return ApiResponse(
            data=result_serializer.data,
            message="Tweet criado com sucesso",
            status_code=201,
        )

    @standard_response
    def retrieve(self, request, *args, **kwargs):
        """Retorna detalhes de um tweet"""
        tweet = TweetService.get_tweet_by_id(kwargs.get("pk"))
        if not tweet:
            return ApiResponse(message="Tweet não encontrado", status_code=404)

        serializer = self.get_serializer(tweet)
        return ApiResponse(
            data=serializer.data,
            message="Tweet encontrado com sucesso",
            status_code=200,
        )

    @standard_response
    def update(self, request, *args, **kwargs):
        """Atualiza um tweet existente"""
        tweet = TweetService.get_tweet_by_id(kwargs.get("pk"))
        if not tweet:
            return ApiResponse(message="Tweet não encontrado", status_code=404)

        if str(tweet.user.id) != str(request.user.id):
            return ApiResponse(
                message="Você não tem permissão para editar este tweet", status_code=403
            )

        serializer = self.get_serializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        updated_tweet = TweetService.update_tweet(
            tweet=tweet, text=serializer.validated_data.get("text", tweet.text)
        )

        result_serializer = self.get_serializer(updated_tweet)
        return ApiResponse(
            data=result_serializer.data,
            message="Tweet atualizado com sucesso",
            status_code=200,
        )

    @standard_response
    def destroy(self, request, *args, **kwargs):
        """Exclui um tweet"""
        tweet = TweetService.get_tweet_by_id(kwargs.get("pk"))
        if not tweet:
            return ApiResponse(message="Tweet não encontrado", status_code=404)

        if str(tweet.user.id) != str(request.user.id):
            return ApiResponse(
                message="Você não tem permissão para excluir este tweet",
                status_code=403,
            )

        TweetService.delete_tweet(tweet)

        return ApiResponse(message="Tweet excluído com sucesso", status_code=200)

    @action(detail=True, methods=["post"])
    @standard_response
    def like(self, request, pk=None):
        """Endpoint para curtir um tweet"""
        tweet = TweetService.get_tweet_by_id(pk)
        if not tweet:
            return ApiResponse(message="Tweet não encontrado", status_code=404)

        _, created = TweetService.like_tweet(user=request.user, tweet=tweet)

        message = (
            "Tweet curtido com sucesso" if created else "Você já curtiu este tweet"
        )

        return ApiResponse(
            data={"tweet_id": str(pk), "statistics": tweet.get_all_statistics()},
            message=message,
            status_code=200,
        )

    @action(detail=True, methods=["post"])
    @standard_response
    def unlike(self, request, pk=None):
        """Endpoint para descurtir um tweet"""
        tweet = TweetService.get_tweet_by_id(pk)
        if not tweet:
            return ApiResponse(message="Tweet não encontrado", status_code=404)

        success = TweetService.unlike_tweet(user=request.user, tweet=tweet)

        message = (
            "Curtida removida com sucesso"
            if success
            else "Você não havia curtido este tweet"
        )

        return ApiResponse(
            data={"tweet_id": str(pk), "statistics": tweet.get_all_statistics()},
            message=message,
            status_code=200,
        )

    @action(detail=True, methods=["post"])
    @standard_response
    def dislike(self, request, pk=None):
        """Endpoint para não gostar de um tweet"""
        tweet = TweetService.get_tweet_by_id(pk)
        if not tweet:
            return ApiResponse(message="Tweet não encontrado", status_code=404)

        _, created = TweetService.dislike_tweet(user=request.user, tweet=tweet)

        message = (
            "Dislike registrado com sucesso"
            if created
            else "Você já registrou dislike neste tweet"
        )

        return ApiResponse(
            data={"tweet_id": str(pk), "statistics": tweet.get_all_statistics()},
            message=message,
            status_code=200,
        )

    @action(detail=True, methods=["post"])
    @standard_response
    def remove_dislike(self, request, pk=None):
        """Endpoint para remover o não gostar de um tweet"""
        tweet = TweetService.get_tweet_by_id(pk)
        if not tweet:
            return ApiResponse(message="Tweet não encontrado", status_code=404)

        success = TweetService.remove_dislike(user=request.user, tweet=tweet)

        message = (
            "Dislike removido com sucesso"
            if success
            else "Você não havia registrado dislike neste tweet"
        )

        return ApiResponse(
            data={"tweet_id": str(pk), "statistics": tweet.get_all_statistics()},
            message=message,
            status_code=200,
        )

    @action(detail=True, methods=["post"])
    @standard_response
    def retweet(self, request, pk=None):
        """Endpoint para retweetar"""
        original_tweet = TweetService.get_tweet_by_id(pk)
        if not original_tweet:
            return ApiResponse(message="Tweet não encontrado", status_code=404)

        retweetSerializer = ReTweetSerializer(data=request.data)
        retweetSerializer.is_valid(raise_exception=True)

        text = retweetSerializer.validated_data["text"]

        try:
            retweet, _, created = TweetService.retweet(
                user=request.user, original_tweet=original_tweet, text=text
            )

            if not hasattr(retweet, "user") or not retweet.user:
                return ApiResponse(
                    message="Erro: Relação de usuário não carregada corretamente",
                    status_code=500,
                )

            tweetSerializer = self.get_serializer(retweet)

            message = "Tweet retweetado com sucesso"

            return ApiResponse(
                data=tweetSerializer.data,
                message=message,
                status_code=201,
            )
        except Exception as e:
            return ApiResponse(
                message=f"Erro ao processar retweet: {str(e)}",
                data={"error": str(e)},
                status_code=500,
            )

    @action(detail=True, methods=["get"], url_path="associated-tweets")
    @standard_response
    def associated_tweets(self, request, pk=None):
        try:
            type = "retweet"
            query_params = request.query_params

            if len(query_params) > 0:
                if len(query_params) > 1:
                    return ApiResponse(
                        message="O único parâmetro de pesquisa permitido é 'type'",
                        status_code=400,
                    )

                type = next(query_params.values())
                if type not in ["retweet", "share"]:
                    return ApiResponse(
                        message="Os únicos valores para a pesquisa são retweet ou share",
                        status_code=400,
                    )

            retweet_info = (
                TweetAssociation.objects.filter(
                    parent_tweet_id=pk, association_type=type
                )
                .select_related("associated_tweet")
                .order_by("-created_at")
            )

            retweets = []
            for tweet in retweet_info:
                retweets.append(tweet.associated_tweet)

            serializer = self.get_serializer(retweets, many=True)

            return ApiResponse(
                data=serializer.data, message="Tweets recuperados", status_code=200
            )
        except Exception as Error:
            return ApiResponse(
                message=f"Erro ao processar os tweets associados: {str(Error)}",
                data={"error": str(Error)},
                status_code=500,
            )

    @action(detail=True, methods=["post"])
    @standard_response
    def remove_retweet(self, request, pk=None):
        """Endpoint para desfazer retweet"""
        tweet = TweetService.get_tweet_by_id(pk)
        if not tweet:
            return ApiResponse(message="Tweet não encontrado", status_code=404)

        success = TweetService.remove_retweet(user=request.user, tweet=tweet)

        message = (
            "Retweet removido com sucesso"
            if success
            else "Você não havia retweetado este tweet"
        )

        return ApiResponse(
            data={"tweet_id": str(pk), "statistics": tweet.get_all_statistics()},
            message=message,
            status_code=200,
        )

    @action(detail=True, methods=["post"])
    @standard_response
    def share(self, request, pk=None):
        """Endpoint para compartilhar um tweet"""
        original_tweet = TweetService.get_tweet_by_id(pk)
        if not original_tweet:
            return ApiResponse(message="Tweet não encontrado", status_code=404)

        serializer = ShareSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        text = serializer.validated_data.get("text", "")

        new_tweet, _, created = TweetService.share_tweet(
            user=request.user,
            original_tweet=original_tweet,
            text=text if text else None,
        )

        message = "Tweet compartilhado com sucesso"

        response_data = {
            "original_tweet_id": str(pk),
            "statistics": original_tweet.get_all_statistics(),
        }

        if new_tweet:
            tweet_serializer = TweetSerializer(new_tweet)
            response_data["new_tweet"] = tweet_serializer.data

        return ApiResponse(
            data=response_data,
            message=message,
            status_code=200,
        )

    @action(detail=True, methods=["post"])
    @standard_response
    def remove_share(self, request, pk=None):
        """Endpoint para desfazer compartilhamento"""
        tweet = TweetService.get_tweet_by_id(pk)
        if not tweet:
            return ApiResponse(message="Tweet não encontrado", status_code=404)

        success = TweetService.remove_share(user=request.user, tweet=tweet)

        message = (
            "Compartilhamento removido com sucesso"
            if success
            else "Você não havia compartilhado este tweet"
        )

        return ApiResponse(
            data={"tweet_id": str(pk), "statistics": tweet.get_all_statistics()},
            message=message,
            status_code=200,
        )

    @action(detail=True, methods=["get"], url_path="reacted-by-user")
    @standard_response
    def reacted_by_user(self, request, pk=None):
        tweet = Tweet.objects.filter(id=pk)

        if not tweet:
            return ApiResponse(
                data=None,
                message="Nenhum tweet foi encontrado com o id fornecido",
                status_code=404,
            )

        reactions = TweetService.verifying_reaction_by_user(request.user, tweet[0])

        return ApiResponse(
            data=reactions,
            message="Reações resgatadas com sucesso",
            status_code=200,
        )

    @action(detail=False, methods=["get"], url_path="all")
    @standard_response
    def all_tweets(self, request):
        import random

        tweets_not_associated = [
            tweet for tweet in self.get_queryset() if not tweet.get_if_is_associated()
        ]

        serializer = self.get_serializer(tweets_not_associated, many=True)
        return ApiResponse(
            data=random.sample(serializer.data, len(serializer.data)),
            message=f"{len(serializer.data)} tweets encontrados",
            status_code=200,
        )
