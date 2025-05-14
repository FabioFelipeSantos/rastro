from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from twitter.models import User
from twitter.serializers import UserSerializer
from twitter.services import UserService
from twitter.response import ApiResponse, standard_response


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
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
            permission_classes = [permissions.AllowAny]
        elif self.action == "list":
            permission_classes = [permissions.AllowAny]
        elif self.action in ["update", "partial_update", "destroy"]:
            permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
        else:
            permission_classes = [permissions.IsAuthenticated]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Retorna queryset filtrado com base nos query params
        Suporta filtragem e ordenação
        """
        return UserService.filter_users(self.request.query_params)

    @standard_response
    def list(self, request, *args, **kwargs):
        """
        Lista usuários com mensagem personalizada
        """
        queryset = self.filter_queryset(self.get_queryset())

        num_users = queryset.count()
        if num_users == 0:
            message = "Nenhum usuário encontrado"
        elif num_users == 1:
            message = "Um usuário encontrado"
        else:
            message = f"{num_users} usuários encontrados"

        serializer = self.get_serializer(queryset, many=True)
        return ApiResponse(data=serializer.data, message=message, status_code=200)

    @action(detail=False, methods=["get"])
    @standard_response
    def me(self, request):
        """Endpoint para obter o próprio usuário"""
        serializer = self.get_serializer(request.user)
        return ApiResponse(
            data=serializer.data, message="Usuário logado encontrado", status_code=200
        )

    @standard_response
    def retrieve(self, request, *args, **kwargs):
        """
        Busca um usuário pelo ID
        """
        user = UserService.get_user_by_id(kwargs.get("pk"))
        if not user:
            return ApiResponse(
                message="Usuário não encontrado.",
                status_code=404,
            )

        serializer = self.get_serializer(user)
        return ApiResponse(
            data=serializer.data, message="Usuário encontrado", status_code=200
        )

    @action(detail=False, methods=["get"])
    @standard_response
    def followers(self, request):
        """Endpoint para listar seguidores do usuário logado"""
        user = request.user
        followers = user.followers.all()

        serializer = self.get_serializer(followers, many=True)
        return ApiResponse(
            data=serializer.data,
            message="Usuários seguindo encontrados com sucesso",
            status_code=200,
        )

    @action(detail=False, methods=["get"])
    @standard_response
    def following(self, request):
        """Endpoint para listar usuários que o usuário logado segue"""
        user = request.user
        following = user.following.all()
        # page = self.paginate_queryset(following)

        # if page is not None:
        #     serializer = self.get_serializer(page, many=True)
        #     paginated_data = self.paginator.get_paginated_response(serializer.data).data
        #     return ApiResponse(
        #         data=paginated_data, message="Usuários seguidos encontrados com sucesso"
        #     )

        serializer = self.get_serializer(following, many=True)
        return ApiResponse(
            data=serializer.data,
            message="Usuários seguidos encontrados com sucesso",
            status_code=200,
        )

    @standard_response
    def create(self, request, *args, **kwargs):
        """
        Cria um novo usuário com validações adicionais
        """
        try:
            email = request.data.get("email", "")
            nickname = request.data.get("nickname", "")

            if not UserService.is_valid_email(email):
                error_data = {
                    "status": 400,
                    "message": "Este email já está em uso.",
                    "data": {"email": "Email já cadastrado"},
                }
                return Response(error_data, status=400)

            if not UserService.is_valid_nickname(nickname):
                error_data = {
                    "status": 400,
                    "message": "Este nickname já está em uso.",
                    "data": {"nickname": "Nickname já cadastrado"},
                }
                return Response(error_data, status=400)

            serializer = self.get_serializer(data=request.data)
            if not serializer.is_valid():
                error_data = {
                    "status": 400,
                    "message": "Dados inválidos",
                    "data": serializer.errors,
                }
                return Response(error_data, status=400)

            serializer.save()

            return ApiResponse(
                data=serializer.data,
                status_code=201,
                message="Usuário criado com sucesso",
            )

        except Exception as e:
            import traceback

            print(f"ERRO AO CRIAR USUÁRIO: {str(e)}")
            print(traceback.format_exc())

            error_data = {
                "status": 500,
                "message": "Erro ao criar usuário",
                "data": {"error": str(e)},
            }
            return Response(error_data, status=500)

    @standard_response
    def update(self, request, *args, **kwargs):
        """Permite ao usuário atualizar seus próprios dados"""
        instance = self.get_object()

        if str(instance.id) != str(request.user.id) and request.user.role != "admin":
            return ApiResponse(
                data="Você não tem permissão para editar este usuário.",
                status_code=403,
                message="Permissão negada",
            )

        serializer = self.get_serializer(
            instance, data=request.data, partial=kwargs.get("partial", False)
        )
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return ApiResponse(
            data=serializer.data,
            message="Usuário atualizado com sucesso",
            status_code=200,
        )

    @action(detail=True, methods=["post"])
    @standard_response
    def deactivate(self, request, pk=None):
        """
        Endpoint adicional para desativar usuário
        """
        user = self.get_object()
        UserService.deactivate_user(user)
        return ApiResponse(
            data=None, message="Usuário desativado com sucesso.", status_code=200
        )

    @standard_response
    def destroy(self, request, *args, **kwargs):
        """Permite ao usuário excluir sua própria conta ou admins excluem qualquer conta"""
        instance = self.get_object()

        if str(instance.id) != str(request.user.id) and request.user.role != "admin":
            return ApiResponse(
                data="Você não tem permissão para excluir este usuário.",
                status_code=403,
                message="Permissão negada",
            )

        self.perform_destroy(instance)

        return ApiResponse(
            data=None,
            message="Usuário deletado com sucesso",
            status_code=200,
        )
