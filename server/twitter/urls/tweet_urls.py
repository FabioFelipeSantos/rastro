from django.urls import path, include
from rest_framework.routers import DefaultRouter
from twitter.viewsets.tweet_viewset import TweetViewSet

router = DefaultRouter()
router.register(r"tweets", TweetViewSet, basename="tweet")

urlpatterns = []
urlpatterns.extend(router.urls)
