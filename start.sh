#!/bin/bash

set -e

echo "Começando a instalação..."

echo "Instalando configuração do Apache..."
sudo cp apache-vhost.conf /etc/apache2/sites-available/000-default.conf

echo "Rodando build do client..."
cd client/
pnpm install
pnpm build
cd ..

echo "Removendo arquivos antigos do servidor e copiando os novos..."
sudo rm -rf /var/www/html/*
sudo cp -r client/dist/* /var/www/html/

echo "Instalando dependências da API..."
cd ../server/
poetry install --no-root
poetry run python manage.py collectstatic --noinput

gunicorn twitter_api.wsgi
