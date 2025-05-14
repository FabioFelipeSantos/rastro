from rest_framework import status, views, permissions
from rest_framework.response import Response

from twitter.serializers import LoginSerializer
from twitter.services import AuthService


class LoginViewSet(views.APIView):
    """Endpoint para login de usuários"""

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username_or_email = serializer.validated_data["username_or_email"]
            password = serializer.validated_data["password"]

            tokens = AuthService.login(username_or_email, password)

            if tokens:
                return Response(tokens, status=status.HTTP_200_OK)

            return Response(
                {"detail": "Credenciais inválidas ou usuário inativo"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
