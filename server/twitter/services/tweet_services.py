from twitter.models import Tweet, Like, Re_Tweet, Dislike, Share, TweetAssociation


class TweetService:
    @staticmethod
    def create_tweet(user, text):
        """Cria um novo tweet para o usuário"""
        tweet = Tweet.objects.create(user=user, text=text)
        return tweet

    @staticmethod
    def get_tweet_by_id(tweet_id):
        """Busca um tweet pelo ID"""
        try:
            return Tweet.objects.get(id=tweet_id)
        except Tweet.DoesNotExist:
            return None

    @staticmethod
    def update_tweet(tweet, text):
        """Atualiza o texto de um tweet"""
        tweet.text = text
        tweet.save()
        return tweet

    @staticmethod
    def delete_tweet(tweet):
        """Deleta um tweet"""
        tweet.delete()

    @staticmethod
    def like_tweet(user, tweet):
        """Registra um like no tweet"""
        like, created = Like.objects.get_or_create(user=user, tweet=tweet)
        return like, created

    @staticmethod
    def unlike_tweet(user, tweet):
        """Remove o like do tweet"""
        try:
            like = Like.objects.get(user=user, tweet=tweet)
            like.delete()
            return True
        except Like.DoesNotExist:
            return False

    @staticmethod
    def dislike_tweet(user, tweet):
        """Registra um dislike no tweet"""
        dislike, created = Dislike.objects.get_or_create(user=user, tweet=tweet)
        return dislike, created

    @staticmethod
    def remove_dislike(user, tweet):
        """Remove o dislike"""
        try:
            dislike = Dislike.objects.get(user=user, tweet=tweet)
            dislike.delete()
            return True
        except Dislike.DoesNotExist:
            return False

    @staticmethod
    def retweet(user, original_tweet, text):
        """
        Cria um novo tweet como resposta ao tweet original e registra um retweet

        Args:
            user: O usuário que está retweetando
            original_tweet: O tweet original que está sendo retweetado
            text: O texto do novo tweet (comentário/resposta)

        Returns:
            tuple: (novo_tweet, retweet)
        """
        new_tweet = Tweet.objects.create(user=user, text=text)

        retweet, created = Re_Tweet.objects.get_or_create(
            user=user, tweet=original_tweet
        )

        TweetAssociation.objects.create(
            parent_tweet=original_tweet,
            associated_tweet=new_tweet,
            association_type="retweet",
        )

        new_tweet = Tweet.objects.select_related("user").get(id=new_tweet.id)

        return new_tweet, retweet, created

    @staticmethod
    def remove_retweet(user, tweet):
        """Remove o retweet"""
        try:
            retweet = Re_Tweet.objects.get(user=user, tweet=tweet)
            TweetAssociation.objects.filter(
                parent_tweet=tweet, association_type="retweet"
            ).delete()
            retweet.delete()
            return True
        except Re_Tweet.DoesNotExist:
            return False

    @staticmethod
    def share_tweet(user, original_tweet, text=None):
        """
        Registra um compartilhamento e opcionalmente cria um novo tweet com comentário

        Args:
            user: O usuário que está compartilhando
            original_tweet: O tweet original que está sendo compartilhado
            text: Texto opcional do novo tweet (comentário)

        Returns:
            tuple: (novo_tweet ou None, share, created)
        """
        share, created = Share.objects.get_or_create(user=user, tweet=original_tweet)

        new_tweet = None
        if text:
            new_tweet = Tweet.objects.create(user=user, text=text)

            TweetAssociation.objects.create(
                parent_tweet=original_tweet,
                associated_tweet=new_tweet,
                association_type="share",
            )

            new_tweet = Tweet.objects.select_related("user").get(id=new_tweet.id)

        return new_tweet, share, created

    @staticmethod
    def remove_share(user, tweet):
        """Remove o compartilhamento"""
        try:
            share = Share.objects.get(user=user, tweet=tweet)
            TweetAssociation.objects.filter(
                parent_tweet=tweet, association_type="share"
            ).delete()
            share.delete()
            return True
        except Share.DoesNotExist:
            return False
