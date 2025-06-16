FROM python:3.13-slim

ENV PYTHONBUFFERED=1
ENV POETRY_HOME="/opt/poetry"
ENV PATH="${POETRY_HOME}/bin:${PATH}"

RUN apt-get update \
  && apt-get install -y curl \
  && curl -sSL https://install.python-poetry.org | python3 - \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ./server/poetry.lock ./server/pyproject.toml ./
RUN poetry install --no-interaction --no-root

COPY ./server .

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 8000

CMD ["poetry", "run", "gunicorn", "--workers", "3", "--bind", "0.0.0.0:8000", "twitter_api.wsgi:application"]
