#!/bin/bash

set -e

if [ -z "$APP_HOME" ]; then
  echo "Variável de ambiente APP_HOME não definida nas actions do GitHub. Essa variável é necessária para o deploy automático. Ela não deve apontar para o diretório do projeto em si, mas sim do usuário que está rodando o deploy automático."
  exit 1
fi

echo ">>> Iniciando deploy automático do projeto"

cd "$APP_HOME/app"

echo ">>> Baixando atualizações do repositório remoto ..."

git checkout main
git fetch origin main
git reset --hard origin/main

echo ">>> Instalando dependências do projeto ..."
sudo APP_HOME=$APP_HOME ./start.sh

echo ">>> Deploy automático concluído com sucesso!"
