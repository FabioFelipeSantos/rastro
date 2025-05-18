from django.db import models
from .base import BaseModel
from .tweet import Tweet


class TweetAssociation(BaseModel):
    """Modelo para associar tweets em retweets e compartilhamentos"""

    parent_tweet = models.ForeignKey(
        Tweet, on_delete=models.CASCADE, related_name="parent_associations"
    )
    associated_tweet = models.ForeignKey(
        Tweet, on_delete=models.CASCADE, related_name="child_associations"
    )
    association_type = models.CharField(
        max_length=20, choices=[("retweet", "Re-Tweet"), ("share", "Share")]
    )

    class Meta:
        unique_together = ("parent_tweet", "associated_tweet", "association_type")

    def __str__(self):
        return f"Tweet {self.parent_tweet.id} {self.association_type} Tweet {self.associated_tweet.id}"
