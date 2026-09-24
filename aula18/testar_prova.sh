#!/bin/bash

# ==========================================================
# Script de teste automatizado - Avaliação Prática Binário Tech
# Requer: curl e jq instalados
# ==========================================================

BASE_URL="http://localhost:3008/api/v1/prova"
EMAIL="usuario_teste_$RANDOM@binariotech.com"
SENHA="senha123"

echo "=================================================="
echo "1) Cadastrando usuário: $EMAIL"
echo "=================================================="

curl -s -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"senha\": \"$SENHA\"}" | jq

echo ""
echo "=================================================="
echo "2) Realizando login..."
echo "=================================================="

RESPOSTA_LOGIN=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"senha\": \"$SENHA\"}")

echo "$RESPOSTA_LOGIN" | jq

TOKEN=$(echo "$RESPOSTA_LOGIN" | jq -r '.token')

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
  echo ""
  echo "Não foi possível obter o token. Abortando teste da rota protegida."
  exit 1
fi

echo ""
echo "Token obtido com sucesso:"
echo "$TOKEN"

echo ""
echo "=================================================="
echo "3) Acessando rota protegida /relatorio com o token"
echo "=================================================="

curl -s -X GET "$BASE_URL/relatorio" \
  -H "Authorization: Bearer $TOKEN" | jq

echo ""
echo "=================================================="
echo "4) Testando rota protegida SEM token (esperado: 401)"
echo "=================================================="

curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" -X GET "$BASE_URL/relatorio"

echo ""
echo "=================================================="
echo "5) Testando rota protegida com token INVÁLIDO (esperado: 403)"
echo "=================================================="

curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" -X GET "$BASE_URL/relatorio" \
  -H "Authorization: Bearer token_invalido_qualquer"

echo ""
echo "Testes finalizados."
