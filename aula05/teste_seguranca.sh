#!/bin/bash

LOG="audit_seguranca.log"
URL="http://localhost:3000/api/v1/manutencoes"
CHAVE_VALIDA="binario-tech-secret-2026"

echo "=== Teste de Seguranca - $(date) ===" > "$LOG"

for i in 1 2 3; do
  echo ">> Tentativa $i SEM chave de API" | tee -a "$LOG"
  curl -s -i "$URL" | tee -a "$LOG"
  echo -e "\n---" | tee -a "$LOG"
done

echo ">> Tentativa COM chave de API valida" | tee -a "$LOG"
curl -s -i -H "x-api-key: $CHAVE_VALIDA" "$URL" | tee -a "$LOG"
echo -e "\n---" | tee -a "$LOG"

echo "=== Fim do teste ===" >> "$LOG"
