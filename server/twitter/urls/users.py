from rest_framework.routers import DefaultRouter
from twitter.viewsets import UserViewSet, PublicUserViewSet

public_router = DefaultRouter()
public_router.register(r"public/users", PublicUserViewSet, basename="public-users")

authenticated_router = DefaultRouter()
authenticated_router.register(r"users", UserViewSet, basename="users")

urlpatterns = public_router.urls + authenticated_router.urls
