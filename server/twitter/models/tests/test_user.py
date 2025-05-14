import pytest
from twitter.models import User


@pytest.mark.django_db
class TestUserModel:
    def test_create_user(self, user_data):
        user = User.objects.create_user(
            email=user_data["email"],
            nickname=user_data["nickname"],
            first_name=user_data["first_name"],
            password=user_data["password"],
        )

        assert user.pk is not None
        assert user.email == user_data["email"]
        assert user.nickname == user_data["nickname"]
        assert user.is_active == True
        assert user.role == "user"
        assert user.is_admin == False

    def test_create_admin(self, admin_data):
        admin = User.objects.create_superuser(
            email=admin_data["email"],
            nickname=admin_data["nickname"],
            first_name=admin_data["first_name"],
            password=admin_data["password"],
        )

        assert admin.pk is not None
        assert admin.email == admin_data["email"]
        assert admin.role == "admin"
        assert admin.is_admin == True
        assert admin.is_staff == True
        assert admin.is_superuser == True

    def test_full_name_property(self, user_data):
        user = User.objects.create_user(
            email=user_data["email"],
            nickname=user_data["nickname"],
            first_name=user_data["first_name"],
            last_name=user_data["last_name"],
            password=user_data["password"],
        )

        expected_full_name = (
            f"{user_data['first_name'].title()} {user_data['last_name'].title()}"
        )
        assert user.full_name == expected_full_name

    def test_follow_user(self, user_data):
        user1 = User.objects.create_user(
            email=user_data["email"],
            nickname=user_data["nickname"],
            first_name=user_data["first_name"],
            password=user_data["password"],
        )

        user2 = User.objects.create_user(
            email="user2@example.com",
            nickname="user2",
            first_name="User",
            password="password123",
        )

        user1.following.add(user2)

        assert user2 in user1.following.all()
        assert user1 in user2.followers.all()
        assert user1.following.count() == 1
        assert user2.followers.count() == 1
