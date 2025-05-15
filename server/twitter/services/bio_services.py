from twitter.models import Bio
from .avatar_services import AvatarService


class BioService:
    @staticmethod
    def get_bio_by_user(user):
        """Retorna a bio de um usuário, ou None se não existir"""
        try:
            return Bio.objects.get(user=user)
        except Bio.DoesNotExist:
            return None

    @staticmethod
    def create_bio(user, data):
        """Cria uma nova bio para o usuário"""
        if BioService.get_bio_by_user(user):
            raise ValueError("Este usuário já possui uma bio.")

        bio_data = {
            "user": user,
            "text": data.get("text", ""),
            "city": data.get("city", ""),
            "state": data.get("state", ""),
            "country": data.get("country", "Brasil"),
        }

        bio = Bio.objects.create(**bio_data)
        return bio

    @staticmethod
    def update_bio(bio, data):
        """Atualiza o conteúdo de uma bio existente"""

        if "text" in data and data["text"]:
            bio.text = data["text"]
        if "city" in data:
            bio.city = data["city"]
        if "state" in data:
            bio.state = data["state"]
        if "country" in data:
            bio.country = data["country"]

        bio.save()
        return bio

    @staticmethod
    def delete_bio(bio):
        """Remove uma bio e seu avatar (se existir)"""
        if hasattr(bio, "avatar"):
            AvatarService.delete_avatar(bio.avatar)

        bio.delete()
        return True
