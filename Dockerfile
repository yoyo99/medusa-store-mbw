# Dockerfile pour Medusa Storefront
FROM node:22-alpine

# Crée le répertoire de travail
WORKDIR /app

# Installe les dépendances
COPY package.json yarn.lock* ./
RUN npm install

# Copie les fichiers de configuration
COPY .env ./
COPY medusa-config.js ./

# Copie le reste des fichiers
COPY . .

# Construit l'application
RUN npm run build

# Expose le port
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]