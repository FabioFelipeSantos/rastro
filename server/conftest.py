import pytest
from django.core.management import call_command


@pytest.fixture(scope="session")
def django_db_setup(django_db_setup, django_db_blocker):
    with django_db_blocker.unblock():
        call_command("flush", "--no-input")


@pytest.fixture
def user_data():
    return {
        "first_name": "Test",
        "last_name": "User",
        "nickname": "testuser",
        "email": "test@example.com",
        "password": "securepassword123",
        "role": "user",
    }


@pytest.fixture
def admin_data():
    return {
        "first_name": "Admin",
        "last_name": "User",
        "nickname": "adminuser",
        "email": "admin@example.com",
        "password": "adminpassword123",
        "role": "admin",
    }
