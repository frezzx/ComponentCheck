# Usa Node 20 Alpine como base
FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e yarn.lock para aproveitar cache no build
COPY package.json yarn.lock ./

# Instala as dependências com yarn (frozen-lockfile para garantir versão do lockfile)
RUN yarn install --frozen-lockfile

# Copia todo o código da aplicação para dentro do container
COPY . .

# Build da aplicação (ajuste se seu script de build for diferente)
RUN yarn build

# Instala netcat para verificar porta aberta (necessário para o script de espera)
RUN apk add --no-cache netcat-openbsd

# Expõe a porta que seu app Nest usa (exemplo 3000)
EXPOSE 3000

# Comando para rodar o servidor em background, aguardar ele subir, rodar seed e manter o servidor rodando
CMD sh -c "\
  yarn start & \
  while ! nc -z localhost 3000; do \
    echo 'Aguardando servidor subir...'; \
    sleep 1; \
  done && \
  yarn seed && \
  wait"
FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]


