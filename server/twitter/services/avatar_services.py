import os
import uuid
from datetime import datetime
from django.conf import settings
from django.core.files.storage import default_storage

from twitter.models import Avatar


class AvatarService:
    @staticmethod
    def debug_storage_info():
        storage_class = default_storage.__class__
        storage_module = storage_class.__module__
        storage_name = storage_class.__name__

        storage_info = {
            "class": f"{storage_module}.{storage_name}",
            "is_s3": "S3" in storage_name,
            "settings": {
                "AWS_ACCESS_KEY_ID": (
                    settings.AWS_ACCESS_KEY_ID[:5] + "..."
                    if settings.AWS_ACCESS_KEY_ID
                    else None
                ),
                "AWS_STORAGE_BUCKET_NAME": settings.AWS_STORAGE_BUCKET_NAME,
                "AWS_S3_REGION_NAME": settings.AWS_S3_REGION_NAME,
                "AWS_LOCATION": getattr(settings, "AWS_LOCATION", None),
                "AWS_DEFAULT_ACL": getattr(settings, "AWS_DEFAULT_ACL", None),
            },
        }

        return storage_info

    @staticmethod
    def get_upload_path(user):
        """Retorna o caminho da pasta onde o avatar será salvo"""
        nickname_part = user.nickname[:10] if len(user.nickname) > 10 else user.nickname
        folder_name = f"{user.id}_{nickname_part}"

        if "S3Boto3Storage" in settings.DEFAULT_FILE_STORAGE:
            folder_name = f"users/{user.id}_{nickname_part}/avatars"
        else:
            folder_name = f"users/{user.id}_{nickname_part}/avatars"
            base_path = os.path.join(settings.MEDIA_ROOT, folder_name)
            os.makedirs(base_path, exist_ok=True)

        return folder_name

    @staticmethod
    def generate_file_name(original_filename):
        """Gera o nome do arquivo a ser salvo"""
        hash_hex = uuid.uuid4().hex[:12]
        timestamp = datetime.now().strftime("%d%m%Y-%H%M%S")

        _, ext = os.path.splitext(original_filename)

        return f"{hash_hex}_{timestamp}{ext}"

    @staticmethod
    def validate_avatar_file(file):
        """Valida o arquivo de avatar (tamanho e tipo)"""
        max_size = 5 * 1024 * 1024
        if file.size > max_size:
            raise ValueError(
                f"O tamanho da imagem não pode exceder 5MB. Tamanho atual: {file.size / (1024 * 1024):.2f}MB"
            )

        content_type = file.content_type.lower()
        if not content_type in ["image/jpeg", "image/png", "image/jpg", "image/webp"]:
            raise ValueError(
                "Apenas arquivos de imagem (JPEG, JPG, PNG ou WEBP) são permitidos."
            )

        file_name = file.name.lower()
        valid_extensions = [".jpg", ".jpeg", ".png", ".webp"]
        if not any(file_name.endswith(ext) for ext in valid_extensions):
            raise ValueError(
                "O arquivo deve ter uma extensão .jpg, .jpeg, .png, ou .webp"
            )

        return True

    @staticmethod
    def create_avatar(bio, file):
        """Cria um novo avatar para uma bio"""
        try:
            AvatarService.validate_avatar_file(file)

            if hasattr(bio, "avatar"):
                AvatarService.delete_avatar(bio.avatar)

            user = bio.user
            upload_path = AvatarService.get_upload_path(user)
            file_saved_name = AvatarService.generate_file_name(file.name)
            file_path = f"{upload_path}/{file_saved_name}"

            file.seek(0)

            stored_path = default_storage.save(file_path, file)

            if settings.STORAGE_TYPE == "S3":
                path_to_save_in_db = default_storage.url(stored_path)
            else:
                path_to_save_in_db = stored_path

            avatar = Avatar.objects.create(
                bio=bio,
                file_name=file.name,
                file_saved_name=file_saved_name,
                file_path=path_to_save_in_db,
            )

            return avatar

        except Exception as e:
            raise ValueError(f"Erro ao processar o avatar: {str(e)}")

    @staticmethod
    def delete_avatar(avatar):
        """Remove um avatar do sistema"""
        try:
            relative_path = None
            upload_path = AvatarService.get_upload_path(avatar.bio.user)

            if avatar.file_path.startswith(("http://", "https://")):
                if settings.AWS_LOCATION in avatar.file_path:
                    parts = avatar.file_path.split(settings.AWS_LOCATION + "/")
                    if len(parts) > 1:
                        relative_path = f"{settings.AWS_LOCATION}/{parts[1]}"
                else:
                    file_name = avatar.file_saved_name
                    if file_name:
                        parts = avatar.file_path.split("/")
                        if file_name in parts[-1]:
                            relative_path = f"{upload_path}/{file_name}"
            else:
                relative_path = avatar.file_path.replace(settings.MEDIA_URL, "")

            if relative_path and default_storage.exists(relative_path):
                default_storage.delete(relative_path)

            avatar.delete()
            return True

        except Exception as e:
            raise ValueError(f"Erro ao excluir avatar: {str(e)}")
