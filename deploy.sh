#!/bin/bash

set -e

echo ">>> Iniciando deploy automático do projeto"

cd "$(dirname "$0")"
source ./env.sh

echo ">>> Baixando atualizações do repositório remoto ..."

git checkout main
git fetch origin main
git reset --hard origin/main

echo ">>> Instalando dependências do projeto ..."
sudo APP_HOME=$APP_HOME ./start.sh

echo ">>> Deploy automático concluído com sucesso!"
