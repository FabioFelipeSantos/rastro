#!/bin/sh

set -e

echo ">>> Rodando migrações do banco de dados..."
poetry run python manage.py migrate

echo ">>> Rodando o seeder do banco de dados..."
poetry run python manage.py runseed

echo ">>> Migrações e seeding concluídos."

exec "$@"
