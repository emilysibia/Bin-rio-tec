#!/bin/bash

BASE_URL="http://localhost:3000/api/v1/veiculos"
LOG_FILE="crud_result.log"

echo "=== Início do teste CRUD - $(date) ===" > "$LOG_FILE"

echo ""
echo "Iniciando testes CRUD... os resultados serão salvos em $LOG_FILE"
echo ""

echo "--- 1) Cadastrando veículo 1 ---" | tee -a "$LOG_FILE"

RESPONSE_1=$(curl -s -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"montadora": "Volvo", "modelo": "FH 540", "placa": "KLL-9090"}')

echo "$RESPONSE_1" | jq . | tee -a "$LOG_FILE"

ID_VEICULO_1=$(echo "$RESPONSE_1" | jq -r '.id // .veiculo.id')

echo "ID do veículo 1: $ID_VEICULO_1" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

echo "--- 2) Cadastrando veículo 2 ---" | tee -a "$LOG_FILE"

RESPONSE_2=$(curl -s -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"montadora": "Scania", "modelo": "R450", "placa": "XYZ-1234"}')

echo "$RESPONSE_2" | jq . | tee -a "$LOG_FILE"

ID_VEICULO_2=$(echo "$RESPONSE_2" | jq -r '.id // .veiculo.id')

echo "ID do veículo 2: $ID_VEICULO_2" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

echo "--- 3) Atualizando status do veículo $ID_VEICULO_1 para 'EM_ROTA' ---" | tee -a "$LOG_FILE"

RESPONSE_UPDATE=$(curl -s -X PATCH "$BASE_URL/$ID_VEICULO_1/status" \
  -H "Content-Type: application/json" \
  -d '{"status": "EM_ROTA"}')

echo "$RESPONSE_UPDATE" | jq . | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

echo "--- 4) Deletando veículo $ID_VEICULO_2 ---" | tee -a "$LOG_FILE"

RESPONSE_DELETE=$(curl -s -i -X DELETE "$BASE_URL/$ID_VEICULO_2")

echo "$RESPONSE_DELETE" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

echo "=== Fim do teste CRUD - $(date) ===" | tee -a "$LOG_FILE"
echo ""
echo "Testes concluídos! Veja o resultado completo em: $LOG_FILE"
