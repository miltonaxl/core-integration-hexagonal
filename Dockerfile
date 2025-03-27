
FROM node:20-alpine AS builder

WORKDIR /app


COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN npm run build || true 

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./.env # O copia solo el .env.example y configúralo dentro del contenedor

EXPOSE 3000

CMD [ "node", "dist/main.js" ]