# Rastro - Um clone para o Twitter

![GitHub commit activity](https://img.shields.io/github/commit-activity/t/FabioFelipeSantos/twitter-clone-ebac?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/FabioFelipeSantos/twitter-clone-ebac)
![GitHub Created At](https://img.shields.io/github/created-at/FabioFelipeSantos/twitter-clone-ebac?style=plastic)
![GitHub language count](https://img.shields.io/github/languages/count/FabioFelipeSantos/twitter-clone-ebac?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/FabioFelipeSantos/twitter-clone-ebac?style=plastic)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/FabioFelipeSantos/twitter-clone-ebac/deploy.yml)
![GitHub repo size](https://img.shields.io/github/repo-size/FabioFelipeSantos/twitter-clone-ebac)

![Static Badge](https://img.shields.io/badge/Typescript-%230008?logo=typescript)
![Static Badge](https://img.shields.io/badge/React-%230008?logo=react)
![Static Badge](https://img.shields.io/badge/Python-%230008?logo=python)
![Static Badge](https://img.shields.io/badge/Django-%230008?logo=django)

Sejam bem vindos ao Rastro. Este é um projeto de final de curso, para o curso de Desenvolvedor Python da EBAC.

O Rastro é um site que tem a função de ser um clone de algumas funcionalidades do X (antigo Twitter). Entre as funcionalidades do X, aqui temos implementados:

-   Para usuários:
    -   Criação da conta
    -   Página de profile personalizada
    -   Alteração de dados pessoais
    -   Criação de uma bio para descrever melhor o usuário
    -   Edição e upload de fotos
    -   Permite interação entre usuários (de seguir e ser seguido por outro usuário)
    -   Login permanente
-   Para tweets:
    -   Criação de tweets
    -   Criação de retweets
    -   Iterações de Like, Dislike, Retweet e Share para cada tweet
    -   Visualização da primeira camada de Retweet (ou seja, o tweet original e os retweets à ele)
    -   Apresentação de todos os tweets realizados na página de profile

O que este projeto não implementa:

-   edição de tweets
-   exclusão de tweets
-   função do campo buscar no Rastro
-   algorítmo específico para funcionalização de hashtags
-   dados de se é ou não é um retweet na página de profile
-   possibilidade de compartilhamento (share) apresentando um novo tweet ao compartilhar, e nem apresenta o compartilhado na página de profile
-   não existe algorítmo de tweets infinitos (scroll infinito) na página main (nem o algoritmo de busca de tweets por preferências do usuário)

**Obs: Este projeto se trata de estudo, portando, não darei suporte à criação de novas funcionalidades e nem a issues muito discrepantes do fundamento deste projeto. É claro que para o devido funcionamento do mesmo, posso sim fazer pequenos ajustes. Portanto, use-o com muita moderação, não o use em produção, nem de alguma forma use-o com fins lucrativos, já que o mesmo não tem segurança suficiente para proteção de dados, principalmente financeiros, já que se trataria de uso indevido de propriedade intelectual. Use-o de modo open source.**

## Tecnologias utilizadas

Diversas bibliotecas e tecnologias são utilizadas para o projeto como todo. Entre as mais importantes temos:

-   Client:
    -   Vite v6.3.5
    -   React v19.1.0 com Typescript v5.8.3
    -   Redux Toolkit e Redux Toolkit Query v2.8.2
    -   React Hook Form v7.56.4
    -   React Router DOM v7.6.0
    -   Styled Components v6.1.18
    -   Material UI (apenas ícones) v7.1.0
    -   Zod v3.25.56 (porém usando o pacote de v4)
-   API:
    -   Python v3.13
    -   Poetry v2.1.0
    -   Django v5.2.1
    -   Django Rest Framework v3.16
    -   DRF Simple JWT v5.5.0
    -   Boto 3 v1.38.17
    -   Gunicorn v23.0.0
-   Banco de dados
    -   Postgres v17.0.0
-   Containers
    -   Docker v28.2.2
    -   Docker Compose v2.36.2
    -   Docker Desktop v4.0.0
-   Sistema Operacional e ambiente de desenvolvimento
    -   SO - Ubuntu 24.04 no WSL 2.0
    -   Visual Studio Code v1.101.0
-   CI / CD
    -   Github Actions
    -   Codecov

## Formas de instalação

Existem duas abordagens possíveis somente com os arquivos deste repo: instalação local sem Docker, ou instalação local com o Docker.

### Instalação sem Docker

Aqui o processo mais rápido será fazer um clone do repo para sua máquina, configurar os arquivos de variáveis de ambiente, e executar os scripts de start.

#### Client

O client é construído com o Vite, usando como gerenciador de pacotes o PNPM. A maneira mais fácil seria de posse do Node e do PNPM instalados, navegar até a pasta `./client` e rodar

```bash
pnpm install
```

O client só tem a possibilidade de uso de uma variável de ambiente para produção que seria `VITE_API_URL`. Essa variável tem o intuito de permitir a adição de algum endpoint intermediário para comunicação entre o frontend e o backend.

Por exemplo, se não usarmos a variável, todas as requisições serão feitas a partir do endpoint `/`. Agora, com `VITE_API_URL=/api/`, toda requisição começará com `/api/`.

Este uso é útil para produção, portanto, o seu uso deverá ser no arquivo `.env.production` e deve ser definida antes do build, caso você decida realizar algum build.

Para desenvolvimento use

```bash
pnpm dev
```

Para o build use

```bash
pnpm build
```

#### API

##### Banco de Dados

Para executar a API, antes você deve ter algum serviço Postgres rodando em sua máquina (seja Docker, ou outro que permita comunicações). Se você desejar usar o Docker (com o docker compose) para criar uma instância do Postgres, pode usar o arquivo `./server/docker-compose.yml` para criá-la. Somente garanta que exista um arquivo `.env` no diretório `./server` com as seguintes variáveis:

-   `POSTGRES_USER`: usuário para sua conexão.
-   `POSTGRES_PASSWORD`: senha para o usuário.
-   `POSTGRES_DB`: nome do banco de dados que deseja criar.
-   `POSTGRES_HOST`: endereço para conexão.
-   `POSTGRES_PORT`: porta para conexão.

Após, basta executar

```bash
docker-compose up --build -d
```

##### Ambiente Python e Poetry

_A partir daqui, eu vou garantir que você desejará usar o Poetry para gerenciamento de pacotes. Caso decida por não usar, só garanta instalar todos as dependências em `./server/pyproject.toml` da forma que preferir._

Para prosseguir, garanta ter em seu ambiente qualquer versão do Python que permita o uso do Poetry, e que já tenha o Poetry instalado. Nesse projeto uso o Python 3.13, portanto você deve garantir a mesma versão para não ocorrer inconsistências. Se desejar, utilize o Poetry para instalar o Python 3.13 em um abiente isolado do seu sistema. Use o comando

```bash
poetry python install 3.13
```

Dessa forma, use o comando `poetry run python` para executar o Python 3.13. Se você tiver outras versões do Python gerenciadas pelo Poetry terá que fazer o ajuste necessário para execução do comando anterior.

Com o Poetry, não é necessário criar o ambiente virtual, já que ele mesmo o criará. Portanto, para instalar as dependências necessárias, use

```bash
poetry install --no-root
```

A flag `--no-root` garante que as depdências sejam instaladas sem ser como um único pacote, o que seria necessário outras configurações no `pyproject.toml`.

Após instalar as dependências, garanta que as seguintes variáveis de ambiente estejam presentes no `./server/.env`:

-   `DEBUG`: boolean, default = False; defina se o Django deve ou não apresentar Debugs.
-   `DJANGO_ALLOWED_HOSTS`: default = localhost; lista de IPs separadas por "," e sem espaços entre os valores, com os IPs que o Django deve permitir.
-   `DJANGO_CSRF_TRUSTED_ORIGINS`: default = localhost; lista de IPs para validação de CSRF. Em produção, use pelo menos o link de comunicação do servidor de forma obrigatória.
-   `DATABASE_URL`: **obrigratório**; link para conexão com o postgres utilizando o formato `postgres://USER:PASSWORD@HOST:PORT/DATA_BASE`. As definições anteriores do Postgres são para o Docker, não para o Django. Para o Django, use somente esta.
-   `DJANGO_SECRET_KEY`: **obrigatório**; uma chave segura e aleatória para criação dos tokens JWT.

Existe a solução implementada de fazer upload do avatar do usuário tanto localmente quanto na S3. Se você quiser utilizar os serviços da S3, preencha às seguintes variáveis de ambiente: `AWS_S3_REGION_NAME`, `AWS_STORAGE_BUCKET_NAME`, `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY`.

Caso contrário, nada precisa ser feito, e os uploads irão para a pasta `uploads` dentro de `./server`.

Após tudo configurado, basta ir para o diretório `./server` junto ao arquivo `manage.py` e rodar na ordem os seguintes comandos:

1. Teste de conexão com o banco e criação das tabelas no banco

```bash
poetry run python manage.py migrate
```

2. (Opcional) Se você quiser fazer um seed de usuários e tweets para o banco de dados, pode usar o comando customizado

```bash
poetry run python manage.py runseed
```

Somente garanta de rodar o seed depois do migrate e antes de colocar qualquer dado no banco, já que o seed irá apagar todas os dados previamente salvos.

3. Execução do servidor: Para desenvolvimento opte por usar o próprio Django ou algum WSGI. Em produção, use somente o WSGI. Aqui eu coloco o uso do Django ou uma opção com o Gunicorn:

```bash
poetry run python manage.py runserver
```

ou

```bash
poetry run gunicorn twitter_api.wsgi
```

Se tudo for como esperado, agora é possível se comunicar com a API, seja pelo client ou por alguma interface que execute protocolos HTTP (como o Postman ou Insomnia REST)

### Instalação com o Docker

O Docker facilita muito a instalação, já que com apenas um comando, teremos tudo setado e organizado para execução. Porém, algumas desvantagens são claras:

-   A comunicação com a API é somente interna com o uso do Nginx, não será possível comunicação externa direta com a API. Essa característica foi para estudo, já que no mundo real será assim a comunicação, somente internamente.
-   A cada modificação no projeto, as imagens precisarão serem refeitas e executadas.
-   Mínimo conhecimento a respeito do Docker para usar Logs e Exec em caso de algum erro.
-   Conhecimento sobre a criação das imagens e como os volumes funcionam para controlar a persistência de dados.

Para executar o projeto usando o docker compose, garanta antes que as variáveis de ambiente tanto para conexão com o banco de dados quanto para o Django foram criadas conforme apresentado nas seções anteriores e na mesma pasta `./server`. Isto é crucial, pois o arquivo do docker compose irá procurar nesse diretório o arquivo `.env`. Após configurar, basta ir no diretório raiz deste repo (no mesmo nível que `./client` e `./server`, e não dentro de algum desses diretórios), e utilizar o comando

```bash
docker-compose up --build -d
```

O arquivo `docker-compose.yml` configura três serviços diferentes: o Postgres, o Backend e o Frontend.

O container do Backend é criado a partir da imagem do arquivo `backend.Dockerfile`. Para a criação do backend leve em conta a criação do `.env` discutido na seção anterior.

O container do Frontend é criado com a imagem a partir do arquivo `frontend.Dockerfile`. Para que não haja problemas na comunicação do Nginx, defina corretamente a variável de ambiente `VITE_API_URL` como ARG no `frontend.Dockerfile`.

Para o Frontend ser exposto, usamos a porta 80, que abrirá a comunicação pelo Nginx e configurado de acordo com o arquivo `nginx.conf`. E aqui, cuidado com o campo `location` no arquivo de configuração que se comunica com a API (linha 12). Nesse caso, deverá expor a mesma URL que `VITE_API_URL`, como o caso já configurado.

Após todos os containers serem criados, os serviços serão automaticamente executados, bastando ir ao browser no link `http://localhost`.

## Deploy

Se você quiser explorar o Deploy do projeto, garanta que o ambiente Node + PNPM e Python + Poetry esteja corretamente funcional. A partir disso, alguns arquivos aqui podem lhe auxiliar, se desejar. São eles:

-   `apache-vhost.conf` - Configuração básica para executar o Apache e expor a API em alguma máquina virtual. Basta instalar o apache antes.
-   `gunicorn.service` - Configuração de um serviço Unix para executar a API de forma contínua. Nesse arquivo você precisa configurar os valores `nome_user` e `$HOME`. O primeiro é o nome do usuário que executa os processos a nível de administrador da máquina virtual. O segundo é o endereço da home deste usuário, normalmente `/home/nome_user`. Este arquivo deve ser enviado manualmente para a máquina virtual e colocado no caminho de serviços do seu servidor, usualmente `/etc/systemd/system/`. Deve-se instalar o Gunicorn na máquina local antes.
-   `deploy.sh` - Script principal para integração com o Github actions que execute algum runner automático para deploy. Só cuidado com a confgiração do deploy automático que é necessário a definição da variável de ambiente `APP_HOME` no arquivo `.env` do Github actions na máquina virtual. Essa variável deve apontar para o caminho do usuário que irá executar a máquina virtual, tal como `/home/nome_user`. Outra observação, é quanto ao caminho na linha 12 deste arquivo, `$APP_HOME/app`. Se você desejar, pode trocar o `/app` pelo valor que preferir. Só garanta que o Github actions e o restante dos arquivos de configuração conversem entre si para garantir a correta localização do projeto.
-   `start.sh` - Script de execução automática da instalação do Client e da API, após o repo ter sido copiado para a sua máquina virtual, basta navegar até o diretório do projeto e digitar:

    ```bash
    sudo ./start.sh "$APP_HOME"
    ```

    Este arquivo também é executado de forma automática pelo `deploy.sh`. Possui um argumento obrigatório, o valor de `APP_HOME`, portanto execute-o com
