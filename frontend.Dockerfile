FROM node:20-alpine AS builder

WORKDIR /app/client

COPY ./client/package.json ./client/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY ./client .

ARG VITE_API_URL=/api/

RUN VITE_API_URL=$VITE_API_URL pnpm build

FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/client/dist /usr/share/nginx/html

EXPOSE 80
