#!/bin/sh

set -e

echo "🔋 Verificando conexão com PostgreSQL..."

# Espera até que o banco esteja acessível
while ! nc -z $DB_HOST $DB_PORT; do
  echo "🕒 Aguardando PostgreSQL..."
  sleep 2
done

echo "⚡ Banco de dados pronto!"

# Executa migrations
echo "🔄 Executando migrations..."
yarn migration:run

# Executa seed se necessário (apenas em desenvolvimento)
if [ "$NODE_ENV" = "development" ]; then
  echo "🌱 Executando seeds..."
  yarn seed
fi

echo "🚀 Iniciando aplicação NestJS..."
exec yarn start:prod