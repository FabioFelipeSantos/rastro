from django.urls import path, include
from rest_framework.routers import DefaultRouter
from twitter.viewsets import PublicUserViewSet, PrivateUserViewSet

# Router para rotas públicas (sem autenticação)
public_router = DefaultRouter()
public_router.register(r"public/users", PublicUserViewSet, basename="public-users")

# Router para rotas privadas (com autenticação)
private_router = DefaultRouter()
private_router.register(r"users", PrivateUserViewSet, basename="private-users")

# Combina as rotas dos dois routers
urlpatterns = []
urlpatterns.extend(public_router.urls)
urlpatterns.extend(private_router.urls)
