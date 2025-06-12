# Dockerfile para o projeto Twitter Clone EBAC
FROM ubuntu:latest

# Evitar prompts interativos durante a instalação
ENV DEBIAN_FRONTEND=noninteractive

# Definir variáveis de ambiente
ENV PYTHONUNBUFFERED=1
ENV NODE_VERSION=20.x
ENV POETRY_VERSION=2.1.2
ENV PNPM_VERSION=latest
ENV PYTHON_VERSION=3.13

# Instalar dependências básicas
RUN apt-get update && apt-get install -y \
    software-properties-common \
    curl \
    git \
    && add-apt-repository ppa:deadsnakes/ppa \
    && apt-get update \
    && apt-get install -y \
    python${PYTHON_VERSION} \
    python${PYTHON_VERSION}-dev \
    python${PYTHON_VERSION}-venv \
    python3-pip \
    postgresql-client \
    apache2 \
    apache2-utils \
    libapache2-mod-wsgi-py3 \
    build-essential \
    libssl-dev \
    gnupg \
    lsb-release \
    pkg-config \
    jq \
    supervisor \
    libffi-dev \
    python3-cffi \
    python3-cryptography \
    rustc \
    cargo \
    && rm -rf /var/lib/apt/lists/*

# Configurar Node.js e pnpm
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION} | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm@${PNPM_VERSION}

# Verificar versões instaladas
RUN echo "Node.js version: $(node --version)" \
    && echo "npm version: $(npm --version)" \
    && echo "pnpm version: $(pnpm --version)" \
    && echo "Python version: $(python${PYTHON_VERSION} --version)"

# Instalar cffi, cryptography e Gunicorn explicitamente antes do Poetry
RUN python${PYTHON_VERSION} -m pip install --ignore-installed --upgrade pip setuptools wheel \
    && python${PYTHON_VERSION} -m pip install --ignore-installed cffi cryptography \
    && python${PYTHON_VERSION} -m pip install --ignore-installed --upgrade gunicorn

# Instalar Poetry
RUN curl -sSL https://install.python-poetry.org | python${PYTHON_VERSION} - --version ${POETRY_VERSION} \
    && ln -s /root/.local/bin/poetry /usr/local/bin/poetry \
    && poetry config virtualenvs.create false

# Configurar o Apache
RUN a2enmod rewrite headers wsgi proxy proxy_http

# Preparar diretório de trabalho
WORKDIR /app
COPY . /app/

# Configurar o frontend (client)
WORKDIR /app/client

# Instalar dependências e construir o frontend
RUN pnpm install \
    && pnpm build

# Configurar o backend (server)
WORKDIR /app/server

# Instalar dependências do backend
RUN poetry install --no-interaction --no-root

# Configurar o Apache para servir o frontend e o backend
RUN rm -rf /var/www/html/* \
    && cp -r /app/client/dist/* /var/www/html/ \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Criar arquivo de configuração do Apache
RUN cat > /etc/apache2/sites-available/000-default.conf << 'APACHE_CONFIG'
<VirtualHost *:80>
    ServerName localhost
    
    # Frontend configuration (React)
    DocumentRoot /var/www/html
    
    # Headers CORS
    Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
    
    # API proxy com preservação de headers
    ProxyPreserveHost On
    ProxyRequests Off

    # API proxy direto para o Django - todas as rotas principais
    ProxyPass /auth http://localhost:8000/auth
    ProxyPassReverse /auth http://localhost:8000/auth
    
    ProxyPass /users http://localhost:8000/users
    ProxyPassReverse /users http://localhost:8000/users
    
    ProxyPass /admin http://localhost:8000/admin
    ProxyPassReverse /admin http://localhost:8000/admin
    
    ProxyPass /tweets http://localhost:8000/tweets
    ProxyPassReverse /tweets http://localhost:8000/tweets
    
    ProxyPass /bio http://localhost:8000/bio
    ProxyPassReverse /bio http://localhost:8000/bio
    
    ProxyPass /avatar http://localhost:8000/avatar
    ProxyPassReverse /avatar http://localhost:8000/avatar
    
    # Logs
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    LogLevel debug
    
    # Frontend directory settings
    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        # SPA React routing - excluir rotas API do roteamento frontend
        RewriteEngine On
        RewriteBase /
        
        # Não aplicar redirecionamento SPA em rotas da API
        RewriteCond %{REQUEST_URI} !^/auth
        RewriteCond %{REQUEST_URI} !^/users
        RewriteCond %{REQUEST_URI} !^/admin
        RewriteCond %{REQUEST_URI} !^/tweets
        RewriteCond %{REQUEST_URI} !^/bio
        RewriteCond %{REQUEST_URI} !^/avatar
        
        # Se não for API e o arquivo não existir, redirecionar para index.html
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
        
        # Cache headers for static assets
        <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico)$">
            Header set Cache-Control "max-age=31536000, public"
        </FilesMatch>
    </Directory>
    
    # Static files for Django admin
    Alias /static/ /app/server/static/
    <Directory /app/server/static>
        Require all granted
    </Directory>
    
    # Media files
    Alias /media/ /app/server/media/
    <Directory /app/server/media>
        Require all granted
    </Directory>
</VirtualHost>
APACHE_CONFIG

# Adicionar ServerName global para remover o aviso
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Configurar supervisor para gerenciar processos - versão simplificada
RUN cat > /etc/supervisor/conf.d/app.conf << 'SUPERVISOR_CONFIG'
[supervisord]
nodaemon=true
user=root
logfile=/var/log/supervisor/supervisord.log
logfile_maxbytes=50MB
logfile_backups=10

[program:setup_services]
command=/bin/bash -c "cd /app/server && python3.13 manage.py migrate && python3.13 manage.py collectstatic --noinput && python3.13 manage.py runseed && sleep 3 && echo 'Inicializando servidor Django' && gunicorn twitter_api.wsgi"
autostart=true
autorestart=true
stdout_logfile=/var/log/django_all.log
stderr_logfile=/var/log/django_all_error.log
priority=10
stopasgroup=true
killasgroup=true

[program:apache]
command=/usr/sbin/apache2ctl -D FOREGROUND
autostart=true
autorestart=true
stdout_logfile=/var/log/apache2/access.log
stderr_logfile=/var/log/apache2/error.log
priority=20
SUPERVISOR_CONFIG

# Script de inicialização
RUN cat > /app/start.sh << 'STARTUP_SCRIPT'
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
STARTUP_SCRIPT

RUN chmod +x /app/start.sh

# Expor a porta
EXPOSE 80

# Comando para iniciar o container
CMD ["/app/start.sh"]
