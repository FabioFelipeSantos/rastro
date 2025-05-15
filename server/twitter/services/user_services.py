from django.db.models import Q
from twitter.models import User
from rest_framework.response import Response


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

        model_fields = [field.name for field in User._meta.fields]
        text_fields = ["first_name", "last_name", "nickname", "email"]

        for param, value in query_params.items():
            if param in ["ordering", "limit", "offset"]:
                continue

            if param in model_fields:
                if param in text_fields:
                    queryset = queryset.filter(Q(**{f"{param}__icontains": value}))
                elif param == "is_active":
                    is_active = value.lower() in ("true", "t", "1", "yes")
                    queryset = queryset.filter(is_active=is_active)
                else:
                    queryset = queryset.filter(**{param: value})

        ordering = query_params.get("ordering")
        if ordering:
            ordering_fields = ordering.split(",")
            queryset = queryset.order_by(*ordering_fields)

        try:
            offset = int(query_params.get("offset", 0))
            limit = int(query_params.get("limit", 100))

            if limit > 100:
                limit = 100

            queryset = queryset[offset : offset + limit]
        except (ValueError, TypeError):
            queryset = queryset[:100]

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
