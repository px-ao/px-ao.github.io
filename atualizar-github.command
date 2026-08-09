#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "==============================="
echo "Atualizando repositório GitHub"
echo "==============================="
echo

echo "[1/4] Verificando status..."
git status
echo

echo "[2/4] Adicionando arquivos modificados..."
git add .
echo

echo "[3/4] Fazendo commit..."

if git diff --cached --quiet; then
    echo "Nenhuma alteração nova para commitar."
    COMMIT_MESSAGE="" 
else
    echo "Digite a mensagem do commit (ou pressione Enter para usar data-hora):"
    read -r -t 20 COMMIT_MESSAGE || true

    if [ -z "$COMMIT_MESSAGE" ]; then
        DATA=$(date +%Y%m%d)
        HORA=$(date +%H%M)
        COMMIT_MESSAGE="${DATA}_${HORA}"
        echo "Timeout - usando mensagem automática: $COMMIT_MESSAGE"
    else
        echo "Usando: $COMMIT_MESSAGE"
    fi

    git commit -m "$COMMIT_MESSAGE"
fi

echo

echo "[4/4] Enviando para o GitHub..."
git push origin main
echo

echo "==============================="
echo "Verificando resultado..."
echo "==============================="
echo

echo "Último commit:"
git log -1 --oneline
echo

echo "Arquivos modificados neste commit:"
git show --name-only --pretty=format: HEAD
echo

echo "==============================="
echo "Concluído com sucesso!"
echo "==============================="
echo
read -r -p "Pressione Enter para sair..." _
