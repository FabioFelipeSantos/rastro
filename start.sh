#!/bin/bash

set -e

export PATH="$APP_HOME/.local/bin:$PATH"
export NVM_DIR="$APP_HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # Para rodar o NVM
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # Para habilitar o autocompletar do NVM

echo "Começando a instalação..."

echo "Instalando configuração do Apache..."
cp apache-vhost.conf /etc/apache2/sites-available/000-default.conf

echo "Rodando build do client..."
cd client/
pnpm install
pnpm build
cd ..

echo "Removendo arquivos antigos do servidor e copiando os novos..."
rm -rf /var/www/html/*
cp -r client/dist/* /var/www/html/

echo "Instalando dependências da API..."
cd server/

# Forçar o poetry usar a versão do Python instalada por ele mesmo
poetry env use $APP_HOME/.local/share/pypoetry/python/cpython@3.13.5/bin/python
poetry install --no-root
poetry run python manage.py collectstatic --noinput

echo "Deploy finalizado com sucesso! Reiniciando o serviço da API"
systemctl daemon-reload
systemctl restart gunicorn.service
