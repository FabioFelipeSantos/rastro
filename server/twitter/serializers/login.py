from rest_framework import serializers
from twitter.models import User


class LoginSerializer(serializers.Serializer):
    username_or_email = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    class Meta:
        fields = ["username_or_email", "password"]
