# Dockerfile para frontend estático
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
