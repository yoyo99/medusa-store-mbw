# 1. Build stage
FROM node:20 AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# Installer les dépendances
COPY package*.json ./
RUN npm ci

# Copier tout le projet
COPY . .

# Compiler l'application en mode standalone
RUN npm run build

# 2. Run stage
FROM node:20 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copier la build standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
