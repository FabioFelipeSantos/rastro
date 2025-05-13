from django.db import models
from .base import BaseModel
from .user import User
from .tweet import Tweet


class Like(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE, related_name="likes")

    class Meta:
        unique_together = ("user", "tweet")
        verbose_name = "Like"
        verbose_name_plural = "Likes"

    def __str__(self):
        return f"{self.user.nickname} curtiu tweet {self.tweet.id}"


class Re_Tweet(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="re_tweets")
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE, related_name="re_tweets")

    class Meta:
        unique_together = ("user", "tweet")
        verbose_name = "Re-Tweet"
        verbose_name_plural = "Re-Tweets"

    def __str__(self):
        return f"{self.user.nickname} retweetou tweet {self.tweet.id}"


class Dislike(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="dislikes")
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE, related_name="dislikes")

    class Meta:
        unique_together = ("user", "tweet")
        verbose_name = "Dislike"
        verbose_name_plural = "Dislikes"

    def __str__(self):
        return f"{self.user.nickname} não curtiu tweet {self.tweet.id}"


class Share(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="shares")
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE, related_name="shares")

    class Meta:
        unique_together = ("user", "tweet")
        verbose_name = "Share"
        verbose_name_plural = "Shares"

    def __str__(self):
        return f"{self.user.nickname} compartilhou tweet {self.tweet.id}"
