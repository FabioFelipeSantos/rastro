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
    def retweet(user, tweet, associated_tweets=None):
        """Registra um retweet e associa outros tweets opcionalmente"""
        retweet, created = Re_Tweet.objects.get_or_create(user=user, tweet=tweet)

        if associated_tweets:
            for associated_id in associated_tweets:
                associated_tweet = TweetService.get_tweet_by_id(associated_id)
                if associated_tweet:
                    TweetAssociation.objects.get_or_create(
                        parent_tweet=tweet,
                        associated_tweet=associated_tweet,
                        association_type="retweet",
                    )

        return retweet, created

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
    def share_tweet(user, tweet, associated_tweets=None):
        """Compartilha um tweet e associa outros tweets opcionalmente"""
        share, created = Share.objects.get_or_create(user=user, tweet=tweet)

        if associated_tweets:
            for associated_id in associated_tweets:
                associated_tweet = TweetService.get_tweet_by_id(associated_id)
                if associated_tweet:
                    TweetAssociation.objects.get_or_create(
                        parent_tweet=tweet,
                        associated_tweet=associated_tweet,
                        association_type="share",
                    )

        return share, created

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
