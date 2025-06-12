# Executando a Aplicação com Docker

Este projeto utiliza Docker para facilitar a execução da aplicação completa, incluindo o frontend React, a API Django e o banco de dados PostgreSQL.

## Requisitos

-   Docker
-   Docker Compose

## Instruções de Uso

### 1. Configuração de Variáveis de Ambiente

Certifique-se de que existe um arquivo `.env` na pasta `server/` com as seguintes variáveis:

```
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=twitter
POSTGRES_USER=postgres
POSTGRES_PASSWORD=suasenha
POSTGRES_DB_TEST=twitter_test
```

### 2. Iniciando a Aplicação Completa

Execute o comando abaixo para iniciar toda a aplicação (frontend, backend e banco de dados):

```bash
docker-compose -f docker-compose-full.yml up -d
```

A aplicação estará disponível em:

-   Frontend: http://localhost
-   API: http://localhost/api

### 3. Iniciando Apenas o Banco de Dados

Se você preferir executar apenas o banco de dados PostgreSQL e rodar o frontend e backend localmente:

```bash
docker-compose up -d
```

### 4. Construindo a Imagem do Docker Manualmente

Se você quiser construir apenas a imagem da aplicação sem executá-la:

```bash
docker build -t twitter-clone-ebac .
```

### 5. Executando a Imagem da Aplicação Individualmente

```bash
docker run -p 80:80 -e POSTGRES_HOST=seu_host -e POSTGRES_PORT=5432 -e POSTGRES_DB=twitter -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=suasenha twitter-clone-ebac
```

## Estrutura do Projeto

-   `client/`: Frontend React/Vite
-   `server/`: Backend Django
-   `Dockerfile`: Configuração para criar a imagem da aplicação
-   `docker-compose.yml`: Configuração para executar apenas o PostgreSQL
-   `docker-compose-full.yml`: Configuração para executar a aplicação completa

## Observações

-   O Apache é utilizado para servir tanto o frontend quanto o backend
-   As alterações no código exigem reconstrução da imagem Docker
-   O banco de dados persiste dados mesmo após a reinicialização dos containers
