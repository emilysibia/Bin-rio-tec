#!/bin/bash

BASE_URL="http://localhost:3000"
ROTAS=("/status" "/scania/info" "/vw/info")

for ROTA in "${ROTAS[@]}"; do
  echo "===================================="
  echo "Rota: $ROTA"
  echo "Horario do teste: $(date '+%Y-%m-%d %H:%M:%S')"
  echo "------------------------------------"
  curl -s "$BASE_URL$ROTA"
  echo ""
  echo ""
done
