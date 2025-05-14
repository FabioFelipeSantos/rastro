from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from twitter.models import User
from twitter.serializers import UserSerializer
from twitter.services import UserService


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Verifica se o usuário é o dono do recurso ou um administrador
        return str(obj.id) == str(request.user.id) or request.user.role == "admin"


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet para operações CRUD de usuários
    Suporta filtros, ordenação e paginação customizada
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        """Define permissões específicas para cada método"""
        if self.action == "create":
            # Qualquer um pode criar um usuário
            permission_classes = [permissions.AllowAny]
        elif self.action == "list":
            # Qualquer um pode ver a lista de usuários
            permission_classes = [permissions.AllowAny]
        elif self.action in ["update", "partial_update", "destroy"]:
            # Apenas o próprio usuário ou admin pode editar/excluir
            permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
        else:
            # Para outras ações, requer autenticação
            permission_classes = [permissions.IsAuthenticated]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Retorna queryset filtrado com base nos query params
        Suporta filtragem e ordenação
        """
        return UserService.filter_users(self.request.query_params)

    @action(detail=False, methods=["get"])
    def me(self, request):
        """Endpoint para obter o próprio usuário"""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        """
        Busca um usuário pelo ID
        """
        user = UserService.get_user_by_id(kwargs.get("pk"))
        if not user:
            return Response(
                {"detail": "Usuário não encontrado."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.get_serializer(user)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def followers(self, request):
        """Endpoint para listar seguidores do usuário logado"""
        user = request.user
        followers = user.followers.all()
        page = self.paginate_queryset(followers)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(followers, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def following(self, request):
        """Endpoint para listar usuários que o usuário logado segue"""
        user = request.user
        following = user.following.all()
        page = self.paginate_queryset(following)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(following, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Cria um novo usuário com validações adicionais
        """
        email = request.data.get("email", "")
        nickname = request.data.get("nickname", "")

        if not UserService.is_valid_email(email):
            return Response(
                {"email": "Este email já está em uso."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not UserService.is_valid_nickname(nickname):
            return Response(
                {"nickname": "Este nickname já está em uso."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """Permite ao usuário atualizar seus próprios dados"""
        instance = self.get_object()

        if str(instance.id) != str(request.user.id) and request.user.role != "admin":
            return Response(
                {"detail": "Você não tem permissão para editar este usuário."},
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().update(request, *args, **kwargs)

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

    def destroy(self, request, *args, **kwargs):
        """Permite ao usuário excluir sua própria conta ou admins excluem qualquer conta"""
        instance = self.get_object()

        if str(instance.id) != str(request.user.id) and request.user.role != "admin":
            return Response(
                {"detail": "Você não tem permissão para excluir este usuário."},
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().destroy(request, *args, **kwargs)
