# # Usa Node 20 Alpine como base
# FROM node:20-alpine

# # Diretório de trabalho dentro do container
# WORKDIR /app

# # Copia package.json e yarn.lock para aproveitar cache no build
# COPY package.json yarn.lock ./

# # Instala as dependências com yarn (frozen-lockfile para garantir versão do lockfile)
# RUN yarn install --frozen-lockfile

# # Copia todo o código da aplicação para dentro do container
# COPY . .

# # Build da aplicação (ajuste se seu script de build for diferente)
# RUN yarn build

# # Instala netcat para verificar porta aberta (necessário para o script de espera)
# RUN apk add --no-cache netcat-openbsd

# # Expõe a porta que seu app Nest usa (exemplo 3000)
# EXPOSE 3000

# # Comando para rodar o servidor em background, aguardar ele subir, rodar seed e manter o servidor rodando
# CMD sh -c "\
#   yarn start & \
#   while ! nc -z localhost 3000; do \
#     echo 'Aguardando servidor subir...'; \
#     sleep 1; \
#   done && \
#   yarn seed && \
#   wait"
# FROM node:20-alpine
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile
# COPY . .
# RUN yarn build
# EXPOSE 3000
# CMD ["yarn", "start"]

# Estágio de construção
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependências de build (necessárias para bcrypt, pg, etc.)
RUN apk add --no-cache python3 make g++ git

# Copia arquivos de dependências primeiro para cache
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Copia todo o código fonte
COPY . .

# Executa o build
RUN yarn build

# Remove devDependencies após o build
RUN yarn install --production

# Estágio final (imagem leve)
FROM node:20-alpine

WORKDIR /app

# Instala dependências para verificação do banco e saúde da aplicação
RUN apk add --no-cache netcat-openbsd curl

# Copia apenas o necessário do estágio builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/database/data-source.ts ./src/database/data-source.ts
COPY --from=builder /app/tsconfig*.json ./

# Script de entrada
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Saúde da aplicação
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

CMD ["./entrypoint.sh"]