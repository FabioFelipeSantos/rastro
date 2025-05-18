from rest_framework import serializers
from twitter.models import Tweet
from .bio_serializer import UserBasicSerializer


class TweetSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer(read_only=True)
    statistics = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = [
            "id",
            "text",
            "user",
            "created_at",
            "updated_at",
            "statistics",
        ]
        read_only_fields = ["user", "created_at", "updated_at"]

    def get_statistics(self, obj):
        return obj.get_all_statistics()


class ReTweetSerializer(serializers.ModelSerializer):
    text = serializers.CharField(required=True)

    class Meta:
        model = Tweet
        fields = ["text"]


class ShareSerializer(serializers.ModelSerializer):
    text = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Tweet
        fields = ["text"]
