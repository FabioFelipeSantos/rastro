from rest_framework.routers import DefaultRouter
from twitter.viewsets import UserViewSet, AdminUserViewSet

user_router = DefaultRouter()
user_router.register(r"users", UserViewSet, basename="users")
user_router.register(r"admin", AdminUserViewSet, basename="admin")

urlpatterns = []
urlpatterns.extend(user_router.urls)
