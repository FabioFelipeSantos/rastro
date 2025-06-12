from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from twitter.viewsets import LoginViewSet, UserProfileViewSet

urlpatterns = [
    path("login/", LoginViewSet.as_view(), name="auth-login"),
    path("refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("profile/", UserProfileViewSet.as_view(), name="user-profile"),
]
