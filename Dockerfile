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
COPY apache-vhost.conf /etc/apache2/sites-available/000-default.conf

# Adicionar ServerName global para remover o aviso
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Criar arquivo de configuração do supervisor
COPY supervisor-app.conf /etc/supervisor/conf.d/app.conf

# Script de inicialização
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expor a porta
EXPOSE 80

# Comando para iniciar o container
CMD ["/app/start.sh"]
