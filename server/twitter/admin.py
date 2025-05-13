from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from twitter.models import User, Tweet, Bio, Avatar, Like, Dislike, Re_Tweet, Share


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ("nickname", "email", "first_name", "last_name", "role", "is_active")
    list_filter = ("role", "is_active")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "nickname")}),
        (
            "Permissions",
            {
                "fields": (
                    "role",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                    "managed_by",
                )
            },
        ),
        ("Social", {"fields": ("following",)}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "nickname",
                    "first_name",
                    "last_name",
                    "password1",
                    "password2",
                    "role",
                ),
            },
        ),
    )
    search_fields = ("email", "nickname", "first_name", "last_name")
    ordering = ("email",)
    filter_horizontal = ("following", "groups", "user_permissions")


@admin.register(Tweet)
class TweetAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "text",
        "created_at",
        "likes_count",
        "re_tweets_count",
        "dislikes_count",
        "shares_count",
    )
    search_fields = ("text", "user__email", "user__nickname")
    list_filter = ("created_at",)

    def likes_count(self, obj):
        return obj.get_statistics("likes")

    likes_count.short_description = "Likes"

    def re_tweets_count(self, obj):
        return obj.get_statistics("re_tweets")

    re_tweets_count.short_description = "Re-Tweets"

    def dislikes_count(self, obj):
        return obj.get_statistics("dislikes")

    dislikes_count.short_description = "Dislikes"

    def shares_count(self, obj):
        return obj.get_statistics("shares")

    shares_count.short_description = "Shares"


@admin.register(Bio)
class BioAdmin(admin.ModelAdmin):
    list_display = ("user", "text", "city", "state", "country")
    search_fields = ("user__nickname", "user__email", "city", "state", "country")
    list_filter = ("country", "state")


@admin.register(Avatar)
class AvatarAdmin(admin.ModelAdmin):
    list_display = ("bio", "file_name", "file_saved_name")
    search_fields = ("bio__user__nickname", "file_name")
    readonly_fields = ("file_saved_name",)


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ("user", "tweet", "created_at")
    search_fields = ("user__nickname", "tweet__text")


@admin.register(Re_Tweet)
class ReTweetAdmin(admin.ModelAdmin):
    list_display = ("user", "tweet", "created_at")
    search_fields = ("user__nickname", "tweet__text")


@admin.register(Dislike)
class DislikeAdmin(admin.ModelAdmin):
    list_display = ("user", "tweet", "created_at")
    search_fields = ("user__nickname", "tweet__text")


@admin.register(Share)
class ShareAdmin(admin.ModelAdmin):
    list_display = ("user", "tweet", "created_at")
    search_fields = ("user__nickname", "tweet__text")
