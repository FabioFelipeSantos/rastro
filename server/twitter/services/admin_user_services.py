from twitter.models import User
from .user_services import UserService


class AdminUserServices(UserService):
    @staticmethod
    def create_admin_user(data):
        admin_data = dict(data)
        admin_data["role"] = "admin"

        if "password_confirmation" in admin_data:
            admin_data.pop("password_confirmation")

        user = User.objects.create_user(**admin_data)
        return user
