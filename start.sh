#!/bin/bash
echo "Começando a instalação..."

echo "Instalando configuração do Apache..."
cp apache-vhost.conf /etc/apache2/sites-available/000-default.conf

echo "Rodando build do client..."
cd client/
pnpm install
pnpm build

echo "Removendo arquivos antigos do servidor e copiando os novos..."
rm -rf /var/www/html/*
cp -r dist/* /var/www/html/

echo "Instalando dependências da API..."
cd ../server/
$(poetry env activate)
poetry install --no-root
poetry run python manage.py collectstatic --noinput

deactivate
gunicorn twitter_api.wsgi
