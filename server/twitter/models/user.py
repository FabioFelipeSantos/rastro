import uuid
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)

from .base import BaseModel


class UserManager(BaseUserManager):
    def create_user(self, email, nickname, first_name, password=None, **extra_fields):
        if not email:
            raise ValueError("O endereço de e-mail é obrigatório")
        if not nickname:
            raise ValueError("O nickname é obrigatório")
        if not first_name:
            raise ValueError("O nome é obrigatório")

        email = self.normalize_email(email)
        user = self.model(
            email=email, nickname=nickname, first_name=first_name, **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, email, nickname, first_name, password=None, **extra_fields
    ):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "admin")

        return self.create_user(email, nickname, first_name, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    ROLE_CHOICES = (
        ("user", "User"),
        ("admin", "Admin"),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    nickname = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=5, choices=ROLE_CHOICES, default="user")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    disabled_at = models.DateTimeField(null=True)

    following = models.ManyToManyField(
        "self", symmetrical=False, related_name="followers", blank=True
    )

    managed_by = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="managed_users",
        limit_choices_to={"role": "admin"},
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nickname", "first_name", "password"]

    def __str__(self):
        return f"{self.nickname} ({self.email})"

    @property
    def full_name(self):
        if self.last_name != None and isinstance(self.last_name, str):
            return f"{self.first_name.title()} {self.last_name.title()}"
        else:
            return {self.first_name.title()}

    @property
    def is_admin(self):
        return self.role == "admin"
