# Dockerfile

# Etapa de build
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY . .

RUN npm install
RUN npm run build

# Etapa de produção
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

# Remove arquivos padrão do nginx
RUN rm -rf ./*

# Copia o build do Vite
COPY --from=builder /app/dist .

# Copia config personalizada do nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
