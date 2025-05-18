from rest_framework import serializers
from twitter.models import Tweet


class TweetSerializer(serializers.ModelSerializer):
    user_nickname = serializers.CharField(source="user.nickname", read_only=True)
    statistics = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = [
            "id",
            "text",
            "user",
            "user_nickname",
            "created_at",
            "updated_at",
            "statistics",
        ]
        read_only_fields = ["user", "created_at", "updated_at"]

    def get_statistics(self, obj):
        return obj.get_all_statistics()


class TweetInteractionSerializer(serializers.Serializer):
    tweet_id = serializers.UUIDField(required=True)


class ReTweetSerializer(TweetInteractionSerializer):
    associated_tweets = serializers.ListField(
        child=serializers.UUIDField(), required=False
    )


class ShareSerializer(TweetInteractionSerializer):
    associated_tweets = serializers.ListField(
        child=serializers.UUIDField(), required=False
    )
