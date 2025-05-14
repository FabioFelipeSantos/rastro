from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from django.utils.translation import gettext_lazy as _

from twitter.models import User
from twitter.serializers import UserSerializer
from twitter.services import UserService


class CustomUserPagination(LimitOffsetPagination):
    """Paginação customizada que aceita limit e offset nos query params"""

    default_limit = 10
    max_limit = 100


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet para operações CRUD de usuários
    Suporta filtros, ordenação e paginação customizada
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = CustomUserPagination

    def get_queryset(self):
        """
        Retorna queryset filtrado com base nos query params
        Suporta filtragem e ordenação
        """
        return UserService.filter_users(self.request.query_params)

    def retrieve(self, request, *args, **kwargs):
        """
        Busca um usuário pelo ID
        """
        user = UserService.get_user_by_id(kwargs.get("pk"))
        if not user:
            return Response(
                {"detail": _("Usuário não encontrado.")},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.get_serializer(user)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Cria um novo usuário com validações adicionais
        """
        email = request.data.get("email", "")
        nickname = request.data.get("nickname", "")

        if not UserService.is_valid_email(email):
            return Response(
                {"email": _("Este email já está em uso.")},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not UserService.is_valid_nickname(nickname):
            return Response(
                {"nickname": _("Este nickname já está em uso.")},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().create(request, *args, **kwargs)

    @action(detail=True, methods=["post"])
    def deactivate(self, request, pk=None):
        """
        Endpoint adicional para desativar usuário
        """
        user = self.get_object()
        UserService.deactivate_user(user)
        return Response(
            {"detail": _("Usuário desativado com sucesso.")}, status=status.HTTP_200_OK
        )
