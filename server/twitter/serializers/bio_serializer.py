from rest_framework import serializers
from twitter.models import Bio, User
from .avatar_serializer import AvatarSerializer


class UserBasicSerializer(serializers.ModelSerializer):
    following_count = User.following_count
    follower_count = User.follower_count
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "nickname",
            "following_count",
            "follower_count",
            "avatar_url",
        ]
        read_only_fields = [
            "id",
            "first_name",
            "last_name",
            "nickname",
            "following_count",
            "follower_count",
            "avatar_url",
        ]

    def get_avatar_url(self, obj):
        if hasattr(obj, "bio") and hasattr(obj.bio, "avatar") and obj.bio.avatar:
            return obj.bio.avatar.file_path


class BioSerializer(serializers.ModelSerializer):
    avatar = AvatarSerializer(read_only=True)
    user = UserBasicSerializer(read_only=True)

    class Meta:
        model = Bio
        fields = [
            "id",
            "text",
            "city",
            "state",
            "country",
            "avatar",
            "user",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "user", "avatar", "created_at", "updated_at"]

    def validate_text(self, value):
        """Valida que o texto da bio não está vazio"""
        if not self.context.get("allow_empty_text", False) and not value.strip():
            raise serializers.ValidationError("O texto da bio não pode estar vazio.")
        return value.strip() if value else ""

    def to_representation(self, instance):
        """
        Garante que o avatar seja incluído mesmo se não existir
        """
        data = super().to_representation(instance)
        if data.get("avatar") is None:
            data["avatar"] = None
        return data
