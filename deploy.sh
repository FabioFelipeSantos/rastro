#!/bin/bash

set -e

echo ">>> Iniciando deploy automático do projeto"

cd $HOME/app/

echo ">>> Baixando atualizações do repositório remoto ..."

git checkout main
git fetch origin main
git reset --hard origin/main

echo ">>> Instalando dependências do projeto ..."
sudo ./start.sh

echo ">>> Deploy automático concluído com sucesso!"
