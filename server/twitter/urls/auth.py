from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from twitter.viewsets import LoginViewSet, UserProfileViewSet

urlpatterns = [
    path("auth/login/", LoginViewSet.as_view(), name="auth-login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("auth/profile/", UserProfileViewSet.as_view(), name="user-profile"),
]
