# Usa una imagen base ligera con Node y el paquete "serve"
FROM node:20-alpine

# Crea y define el directorio de trabajo
WORKDIR /app

# Copia los archivos del frontend al contenedor
COPY . .

# Instala "serve" para servir el index.html
RUN npm install -g serve

# Expón el puerto que Render detectará (por defecto 3000)
EXPOSE 3000

# Comando para servir la app
CMD ["serve", "-s", ".", "-l", "3000"]
