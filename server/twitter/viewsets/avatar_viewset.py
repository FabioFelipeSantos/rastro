from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from twitter.models import Avatar
from twitter.serializers import (
    AvatarSerializer,
    UserBasicSerializer,
    BioSerializer,
    AvatarUploadSerializer,
)
from twitter.services import BioService, AvatarService
from twitter.response import ApiResponse, standard_response


class AvatarViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @standard_response
    def create(self, request):
        """Cria ou atualiza o avatar para o usuário autenticado"""
        try:
            user = request.user

            # Verificar se o usuário tem uma bio
            bio = BioService.get_bio_by_user(user)
            if not bio:
                return ApiResponse(
                    data={
                        "error": "Você precisa criar uma bio antes de adicionar um avatar."
                    },
                    message="Você precisa criar uma bio antes de adicionar um avatar.",
                    status_code=400,
                )

            # Validar o arquivo usando serializer
            serializer = AvatarUploadSerializer(data=request.data)
            if not serializer.is_valid():
                return ApiResponse(
                    data=serializer.errors,
                    message="Arquivo de avatar inválido.",
                    status_code=400,
                )

            # Obter arquivo validado e criar avatar
            avatar_file = serializer.validated_data["file"]
            avatar = AvatarService.create_avatar(bio, avatar_file)

            # Recarregar bio para ter dados atualizados
            bio = BioService.get_bio_by_user(user)

            return ApiResponse(
                data={
                    "bio": BioSerializer(bio).data,
                    "avatar": AvatarSerializer(avatar).data,
                    "user": UserBasicSerializer(user).data,
                },
                message="Avatar criado com sucesso.",
                status_code=201,
            )

        except ValueError as e:
            return ApiResponse(data={"error": str(e)}, message=str(e), status_code=400)
        except Exception as e:
            return ApiResponse(
                data={"detail": str(e)},
                message="Erro ao processar avatar.",
                status_code=500,
            )

    @standard_response
    def destroy(self, request, pk=None):
        """Remove o avatar do usuário"""
        try:
            user = request.user
            bio = BioService.get_bio_by_user(user)

            if not bio or not hasattr(bio, "avatar"):
                return ApiResponse(
                    data={"error": "Você não possui um avatar para remover."},
                    message="Você não possui um avatar para remover.",
                    status_code=404,
                )

            avatar = get_object_or_404(Avatar, id=pk)
            if avatar.bio.user != user:
                return ApiResponse(
                    data={"error": "Você não tem permissão para remover este avatar."},
                    message="Você não tem permissão para remover este avatar.",
                    status_code=403,
                )

            AvatarService.delete_avatar(avatar)

            # Recarregar bio para ter dados atualizados
            bio = BioService.get_bio_by_user(user)

            return ApiResponse(
                data={
                    "bio": BioSerializer(bio).data,
                    "user": UserBasicSerializer(user).data,
                },
                message="Avatar removido com sucesso.",
                status_code=200,
            )

        except Exception as e:
            return ApiResponse(
                data={"detail": str(e)},
                message="Erro ao remover avatar.",
                status_code=500,
            )
