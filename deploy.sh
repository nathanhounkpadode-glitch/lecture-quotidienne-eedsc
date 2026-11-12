#!/bin/bash
cd "$(dirname "$0")"

echo "=========================================="
echo "🚀 Déploiement Cloud - Lecture Quotidienne EEDSC"
echo "=========================================="

echo "1. Vérification de l'authentification GitHub..."
ssh -T git@github.com 2>&1 | grep "Hi schalom14"

echo "2. Envoi du code vers GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "=========================================="
    echo "✅ Succès ! Votre code est sur GitHub."
    echo "👉 Ouverture de Vercel pour le déploiement en 1 clic..."
    echo "=========================================="
    xdg-open "https://vercel.com/new" 2>/dev/null &
else
    echo "=========================================="
    echo "⚠️ Le dépôt GitHub n'est pas encore créé."
    echo "Créez-le sur : https://github.com/new?name=lecture-quotidienne-eedsc"
    echo "Puis relancez ce script : ./deploy.sh"
    echo "=========================================="
fi
