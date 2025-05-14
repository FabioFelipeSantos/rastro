from rest_framework import status, views, permissions
from rest_framework.response import Response

from twitter.services import AuthService


class UserProfileViewSet(views.APIView):
    """Endpoint para obter perfil do usuário autenticado"""

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """Retorna detalhes do usuário logado"""
        user = AuthService.get_user_from_token(request)
        user_details = AuthService.get_user_details(user)

        return Response(user_details, status=status.HTTP_200_OK)
