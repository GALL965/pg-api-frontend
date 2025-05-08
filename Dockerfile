# Etapa de construcción
FROM node:20 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa de producción con nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
