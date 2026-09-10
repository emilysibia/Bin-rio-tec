#!/bin/bash

echo "=========================================="
echo " RESET DE AMBIENTE - BINARIO TECH"
echo "=========================================="

# Encontra o PID do processo Node.js rodando ocorrencias_api.js
PID=$(ps aux | grep '[o]correncias_api.js' | awk '{print $2}')

if [ -n "$PID" ]; then
    echo "[1] Encerrando processo Node.js (PID: $PID)..."
    kill -9 $PID
    echo "Processo encerrado."
else
    echo "[1] Nenhum processo Node.js (ocorrencias_api.js) em execucao."
fi

# Remove o arquivo de dados, se existir
if [ -f "ocorrencias.json" ]; then
    echo "[2] Removendo arquivo ocorrencias.json..."
    rm ocorrencias.json
    echo "Arquivo removido."
else
    echo "[2] Arquivo ocorrencias.json nao encontrado."
fi

echo "=========================================="
echo " Ambiente resetado com sucesso."
echo "=========================================="
