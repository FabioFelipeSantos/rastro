from rest_framework import viewsets, permissions
from rest_framework.decorators import action

from twitter.models import Tweet
from twitter.serializers.tweet_serializers import (
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

    queryset = Tweet.objects.all().order_by("-created_at")
    serializer_class = TweetSerializer
    permission_classes = [permissions.IsAuthenticated]

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
        tweet = TweetService.get_tweet_by_id(pk)
        if not tweet:
            return ApiResponse(message="Tweet não encontrado", status_code=404)

        serializer = ReTweetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        associated_tweets = serializer.validated_data.get("associated_tweets")

        _, created = TweetService.retweet(
            user=request.user, tweet=tweet, associated_tweets=associated_tweets
        )

        message = (
            "Tweet retweetado com sucesso"
            if created
            else "Você já retweetou este tweet"
        )

        return ApiResponse(
            data={"tweet_id": str(pk), "statistics": tweet.get_all_statistics()},
            message=message,
            status_code=200,
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
        tweet = TweetService.get_tweet_by_id(pk)
        if not tweet:
            return ApiResponse(message="Tweet não encontrado", status_code=404)

        serializer = ShareSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        associated_tweets = serializer.validated_data.get("associated_tweets")

        _, created = TweetService.share_tweet(
            user=request.user, tweet=tweet, associated_tweets=associated_tweets
        )

        message = (
            "Tweet compartilhado com sucesso"
            if created
            else "Você já compartilhou este tweet"
        )

        return ApiResponse(
            data={"tweet_id": str(pk), "statistics": tweet.get_all_statistics()},
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
