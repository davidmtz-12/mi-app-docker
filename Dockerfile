FROM node:20

# Habilitar Corepack para Yarn
RUN corepack enable

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de configuración primero
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Instalar dependencias con Yarn
RUN yarn install --immutable

# Copiar el resto del código
COPY . .

# Exponer puerto (Render usa $PORT automáticamente)
EXPOSE 3000

# Comando de inicio
CMD ["yarn", "start"]
