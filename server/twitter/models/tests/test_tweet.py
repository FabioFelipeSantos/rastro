import pytest
from twitter.models import User, Tweet, Like, Re_Tweet, Dislike, Share


@pytest.mark.django_db
class TestTweetModel:
    @pytest.fixture
    def user(self, user_data):
        return User.objects.create_user(
            email=user_data["email"],
            nickname=user_data["nickname"],
            first_name=user_data["first_name"],
            password=user_data["password"],
        )

    @pytest.fixture
    def tweet(self, user):
        return Tweet.objects.create(text="This is a test tweet", user=user)

    def test_create_tweet(self, user):
        tweet = Tweet.objects.create(text="Hello world!", user=user)

        assert tweet.pk is not None
        assert tweet.text == "Hello world!"
        assert tweet.user == user

    def test_tweet_statistics_empty(self, tweet):
        assert tweet.get_statistics("likes") == 0
        assert tweet.get_statistics("re_tweets") == 0
        assert tweet.get_statistics("dislikes") == 0
        assert tweet.get_statistics("shares") == 0

    def test_tweet_interactions(self, tweet, user):
        other_user = User.objects.create_user(
            email="other@example.com",
            nickname="otheruser",
            first_name="Other",
            password="password123",
        )

        Like.objects.create(user=user, tweet=tweet)
        Like.objects.create(user=other_user, tweet=tweet)
        Re_Tweet.objects.create(user=other_user, tweet=tweet)
        Dislike.objects.create(user=user, tweet=tweet)
        Share.objects.create(user=other_user, tweet=tweet)

        assert tweet.get_statistics("likes") == 2
        assert tweet.get_statistics("re_tweets") == 1
        assert tweet.get_statistics("dislikes") == 1
        assert tweet.get_statistics("shares") == 1

        stats = tweet.get_all_statistics()
        assert stats["likes"] == 2
        assert stats["re_tweets"] == 1
        assert stats["dislikes"] == 1
        assert stats["shares"] == 1
