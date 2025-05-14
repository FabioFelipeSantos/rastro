from django.db.models import Q
from twitter.models import User


class UserService:
    @staticmethod
    def get_user_by_id(user_id):
        """Busca um usuário pelo ID"""
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

    @staticmethod
    def filter_users(query_params):
        """
        Filtra usuários com base nos parâmetros da query
        Suporta filtros por qualquer campo do modelo User
        """
        queryset = User.objects.all()

        for param, value in query_params.items():
            if param in ["ordering", "limit", "offset"]:
                continue

            if param in ["first_name", "last_name", "nickname", "email"]:
                queryset = queryset.filter(Q(**{f"{param}__icontains": value}))
            elif param == "role":
                queryset = queryset.filter(role=value)
            elif param == "is_active":
                is_active = value.lower() in ("true", "t", "1", "yes")
                queryset = queryset.filter(is_active=is_active)

        ordering = query_params.get("ordering")
        if ordering:
            ordering_fields = ordering.split(",")
            queryset = queryset.order_by(*ordering_fields)

        return queryset

    @staticmethod
    def is_valid_email(email):
        return not User.objects.filter(email=email).exists()

    @staticmethod
    def is_valid_nickname(nickname):
        return not User.objects.filter(nickname=nickname).exists()

    @staticmethod
    def deactivate_user(user):
        user.is_active = False
        user.save()
        return user
