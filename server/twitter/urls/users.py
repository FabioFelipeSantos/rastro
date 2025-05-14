from rest_framework.routers import DefaultRouter
from twitter.viewsets import UserViewSet

user_router = DefaultRouter()
user_router.register(r"users", UserViewSet, basename="users")

urlpatterns = []
urlpatterns.extend(user_router.urls)
