# Rastro - A Full-Stack Twitter Clone

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

## Project Overview

Rastro is a full-stack web application developed as a clone of X (formerly Twitter), demonstrating proficiency in both frontend and backend technologies. The project was built as the capstone project for the EBAC Python Developer course.

The application follows a modern architecture with a **React (Vite) frontend** consuming a **Django REST Framework backend** via a RESTful API. The entire application is containerized using **Docker** and **Docker Compose** for streamlined development, testing, and deployment.

### Core Features

**User Functionality:**

  - Secure account creation and JWT-based authentication.
  - Personalized user profile pages.
  - Ability to edit personal data and upload a custom bio.
  - Avatar image upload and management (with support for local storage or AWS S3).
  - Social graph implementation (following/follower system).
  - Persistent login sessions using token refresh.

**Tweet Functionality:**

  - Creation of new tweets and retweets.
  - Interactive elements: Like, Dislike, Retweet, and Share actions.
  - Visualization of the original tweet within a retweet thread.
  - Comprehensive display of all user tweets on their profile page.

### Scope and Limitations

While the core functionality is robust, the current scope does not include features such as tweet editing/deletion, a fully functional search engine, advanced hashtag algorithms, or infinite scroll. These have been identified as potential areas for future enhancement.

**Disclaimer:** This project is intended for educational and portfolio purposes only. It is not designed for production use, as it lacks the robust security measures required for handling sensitive or financial data. Please use it responsibly as an open-source learning tool.

## Technology Stack

This project leverages a wide range of modern technologies and libraries:

  - **Client (Frontend):**

      - Vite `v6.3.5`
      - React `v19.1.0` with Typescript `v5.8.3`
      - Redux Toolkit & RTK Query `v2.8.2` for state management.
      - React Hook Form `v7.56.4` for form handling.
      - React Router DOM `v7.6.0` for client-side routing.
      - Styled Components `v6.1.18` for styling.
      - Material UI (Icons) `v7.1.0`
      - Zod `v3.25.56` for schema validation.

  - **API (Backend):**

      - Python `v3.13`
      - Poetry `v2.1.0` for dependency management.
      - Django `v5.2.1`
      - Django Rest Framework `v3.16`
      - DRF Simple JWT `v5.5.0` for token-based authentication.
      - Boto3 `v1.38.17` for AWS S3 integration.
      - Gunicorn `v23.0.0` as the WSGI server.

  - **Database:**

      - Postgres `v17.0.0`

  - **Containerization:**

      - Docker `v28.2.2`
      - Docker Compose `v2.36.2`
      - Docker Desktop `v4.0.0`

  - **Development & CI/CD:**

      - OS: Ubuntu 24.04 on WSL 2.0
      - Editor: Visual Studio Code `v1.101.0`
      - CI/CD: Github Actions
      - Code Coverage: Codecov

## Getting Started

You can run this project in two ways: locally without full containerization or fully containerized using Docker Compose.

### Method 1: Local Installation (without Dockerizing the Apps)

First, clone the repository to your local machine.

#### **Client (Frontend)**

The client is a Vite application using `pnpm` as the package manager.

1.  Navigate to the `./client` directory.
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  For production builds, you can set the `VITE_API_URL` environment variable in a `.env.production` file. This prefixes all API requests (e.g., `VITE_API_URL=/api/`). If unset, requests are made to the same origin (`/`).
4.  Run the development server:
    ```bash
    pnpm dev
    ```

#### **API (Backend)**

##### **Database Setup**

The API requires a running Postgres instance. You can use the provided `docker-compose.yml` file in the `./server` directory to quickly spin one up.

1.  Create a `.env` file in the `./server` directory with the following variables for the database container:
      - `POSTGRES_USER`: your\_db\_user
      - `POSTGRES_PASSWORD`: your\_db\_password
      - `POSTGRES_DB`: your\_db\_name
      - `POSTGRES_HOST`: localhost
      - `POSTGRES_PORT`: 5432
2.  From the `./server` directory, run:
    ```bash
    docker-compose up --build -d
    ```

##### **Python Environment (Poetry)**

This project uses Poetry for dependency and environment management with Python 3.13.

1.  Ensure you have Poetry installed. If needed, you can use Poetry to install the correct Python version in an isolated environment:

    ```bash
    poetry env use python3.13
    ```

2.  From the `./server` directory, install the project dependencies:

    ```bash
    poetry install --no-root
    ```

3.  Add the following required variables to your `./server/.env` file for Django:

      - `DEBUG`: `True` for development.
      - `DJANGO_ALLOWED_HOSTS`: `localhost,127.0.0.1`
      - `DJANGO_CSRF_TRUSTED_ORIGINS`: `http://localhost,http://127.0.0.1`
      - `DATABASE_URL`: **(Required)** The connection string for Postgres, e.g., `postgres://USER:PASSWORD@HOST:PORT/DATA_BASE`.
      - `DJANGO_SECRET_KEY`: **(Required)** A strong, randomly generated key.

4.  **(Optional) AWS S3 Setup:** For S3 avatar uploads, add the following to the `.env` file: `AWS_S3_REGION_NAME`, `AWS_STORAGE_BUCKET_NAME`, `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY`. If omitted, uploads will be stored locally in `./server/uploads`.

5.  Run the backend server:

    ```bash
    # Apply database migrations
    poetry run python manage.py migrate

    # (Optional) Seed the database with sample data (this will wipe existing data)
    poetry run python manage.py runseed

    # Start the development server
    poetry run python manage.py runserver
    ```

### Method 2: Fully Dockerized Installation

This is the simplest way to get the entire application running, as it orchestrates the frontend, backend, and database containers.

1.  Ensure the `./server/.env` file is fully configured as described in the previous section. The `docker-compose.yml` file at the root level depends on it.
2.  From the **root directory** of the project, run the following command:
    ```bash
    docker-compose up --build -d
    ```
3.  The frontend will be accessible at `http://localhost`.

**Note:** In this configuration, the frontend communicates with the backend via the Nginx reverse proxy. The API is not exposed directly to the host machine. Ensure the `VITE_API_URL` `ARG` in `frontend.Dockerfile` matches the Nginx `location` block in `nginx.conf` (e.g., `/api/`).

## Deployment

This repository includes a sample CI/CD pipeline (`deploy.yml`) and configuration files to facilitate deployment to a Linux-based virtual machine.

  - `apache-vhost.conf`: Sample Apache configuration to serve the API.
  - `gunicorn.service`: A `systemd` service file to run the Gunicorn server persistently. You must customize the `nome_user` and `$HOME` variables within the file.
  - `deploy.sh`: A deployment script used by the GitHub Actions workflow. It requires an `APP_HOME` environment variable to be set in your runner's environment, pointing to the user's home directory (e.g., `/home/your_user`).
  - `start.sh`: An automation script executed by `deploy.sh` to install dependencies and start services on the VM. It requires the `APP_HOME` path as an argument.
