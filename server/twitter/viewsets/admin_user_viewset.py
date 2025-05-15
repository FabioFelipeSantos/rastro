from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action

from twitter.models import User
from twitter.services import AdminUserServices
from twitter.serializers import UserSerializer
from twitter.permissions import IsAdmin
from twitter.response import ApiResponse, standard_response


class AdminUserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all().filter(role="admin")

    def get_permissions(self):
        """
        Permite acesso público ao endpoint de teste
        """
        if self.action == "test_create_admin":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated, IsAdmin]

        return [permission() for permission in permission_classes]

    # @action(detail=False, methods=["post"], url_path="create-admin")
    @standard_response
    def create(self, request):
        try:
            email = request.data.get("email", "")
            nickname = request.data.get("nickname", "")

            if not AdminUserServices.is_valid_email(email):
                return ApiResponse(
                    message="Este email já está em uso",
                    status_code=400,
                )

            if not AdminUserServices.is_valid_nickname(nickname):
                return ApiResponse(
                    data={"nickname": "Nickname está em uso"},  # Adicione dados
                    message="Nickname está em uso",
                    status_code=400,
                )

            serializer = self.get_serializer(data=request.data)
            if not serializer.is_valid():
                return ApiResponse(
                    data=serializer.errors,
                    message="Dados inválidos",
                    status_code=400,
                )

            validated_data = serializer.validated_data
            admin_user = AdminUserServices.create_admin_user(validated_data)

            return ApiResponse(
                data=self.get_serializer(admin_user).data,
                message="Usuário administrador criado com sucesso",
                status_code=201,
            )
        except Exception as error:
            return ApiResponse(
                data={"error": str(error)},
                message="Erro ao criar usuário administrador",
                status_code=500,
            )

    # @standard_response
    # def update(self, request, *args, **kwargs):
    #     instance = self.get_object()

    #     if str(instance.id) != str(request.user.id):
    #         return ApiResponse(
    #             status_code=403,
    #             message="Permissão negada. Você tem que ser o administrador dono desse perfil.",
    #         )

    #     serializer = self.get_serializer(
    #         instance, data=request.data, partial=kwargs.get("partial", False)
    #     )
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)

    #     return ApiResponse(
    #         data=serializer.data,
    #         message="Usuário atualizado com sucesso",
    #     )
