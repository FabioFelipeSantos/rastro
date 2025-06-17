from django.conf import settings
from rest_framework import serializers
from twitter.models import Avatar


class AvatarSerializer(serializers.ModelSerializer):
    file_path = serializers.SerializerMethodField(method_name="get_file_url")

    def get_file_url(self, obj):
        """Retorna a URL do arquivo de avatar"""
        path_from_db = obj.file_path

        if path_from_db.startswith(("http://", "https://")):
            return path_from_db

        if settings.STORAGE_TYPE == "S3":
            return path_from_db
        else:
            request = self.context.get("request")
            relative_path = f"{settings.MEDIA_URL}{path_from_db}"

            if request:
                return request.build_absolute_uri(relative_path)

            return relative_path

    class Meta:
        model = Avatar
        fields = [
            "id",
            "file_name",
            "file_saved_name",
            "file_path",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "file_saved_name",
            "file_path",
            "created_at",
            "updated_at",
        ]


class AvatarUploadSerializer(serializers.Serializer):
    file = serializers.ImageField(
        required=True,
        error_messages={
            "required": "Nenhum arquivo enviado.",
            "invalid": "Arquivo inválido. Envie uma imagem no formato PNG, JPG/JPEG ou WEBP.",
            "empty": "O arquivo enviado está vazio.",
        },
    )

    def validate_file(self, file):
        """Validação básica do arquivo de imagem"""
        max_size = 5 * 1024 * 1024  # 5MB
        if file.size > max_size:
            raise serializers.ValidationError(
                f"O tamanho da imagem não pode exceder 5MB. Atual: {file.size / (1024 * 1024):.2f}MB"
            )

        content_type = file.content_type.lower()
        if content_type not in ["image/jpeg", "image/png", "image/jpg", "image/webp"]:
            raise serializers.ValidationError(
                "Apenas arquivos JPEG, JPG, PNG ou WEBP são permitidos."
            )

        return file
