from rest_framework import serializers

from twitter.models import User
from twitter.utils import password_validation


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
    is_admin = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "nickname",
            "email",
            "password",
            "password_confirmation",
            "role",
            "is_active",
            "is_admin",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_password(self, value: str):
        confirmation = password_validation(value)
        if not confirmation["is_valid"]:
            raise serializers.ValidationError(confirmation["message"])

        return value

    def validate(self, data):
        """
        Validação que envolve múltiplos campos (password e confirmation)
        """
        if "password" in data:
            if data.get("password") != data.get("password_confirmation"):
                raise serializers.ValidationError(
                    {"password_confirmation": "As senhas não conferem."}
                )

            if "password_confirmation" in data:
                data.pop("password_confirmation")

        return data

    def create(self, validated_data):
        return User.objects.create_user(
            first_name=validated_data["first_name"],
            last_name=validated_data.get("last_name"),
            nickname=validated_data["nickname"],
            email=validated_data["email"],
            password=validated_data["password"],
            role=validated_data.get("role", "user"),
        )

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance
