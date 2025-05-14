import pytest
from django.apps import apps
from django.db.migrations.executor import MigrationExecutor
from django.db import connections


@pytest.mark.django_db
def test_server_initialization():
    """Teste para verificar se o servidor Django inicia corretamente."""
    assert apps.is_installed("twitter")

    assert apps.get_model("twitter", "User")
    assert apps.get_model("twitter", "Tweet")
    assert apps.get_model("twitter", "Bio")
    assert apps.get_model("twitter", "Avatar")

    connection = connections["default"]
    executor = MigrationExecutor(connection)
    plan = executor.migration_plan(executor.loader.graph.leaf_nodes())

    assert len(plan) == 0, "Há migrações pendentes"
