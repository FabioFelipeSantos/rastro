#!/bin/bash
set -e

# Criar diretórios para logs se não existirem
mkdir -p /var/log/apache2 /var/log/supervisor
touch /var/log/django_all.log /var/log/django_all_error.log
chmod 666 /var/log/django_all.log /var/log/django_all_error.log

cd /app/server

# Verificar variáveis de ambiente
if [ ! -f .env ]; then
    echo "Arquivo .env não encontrado. Você precisa criar um arquivo de variáveis de ambiente configurando seu ambiente"
    exit 1
fi

# Esperar pelo PostgreSQL
echo "Aguardando PostgreSQL inicializar..."
until PGPASSWORD=${POSTGRES_PASSWORD} psql -h ${POSTGRES_HOST} -U ${POSTGRES_USER} -d ${POSTGRES_DB} -c '\q'; do
  echo "PostgreSQL ainda não está disponível - esperando..."
  sleep 2
done
echo "PostgreSQL disponível!"

# Iniciar o supervisor para gerenciar processos
echo "Iniciando serviços com supervisor..."
exec /usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf
