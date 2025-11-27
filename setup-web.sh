#!/bin/bash

echo "========================================"
echo "Configuración de Aplicación Web"
echo "========================================"
echo ""

echo "[1/3] Respaldando package.json original..."
if [ -f package.json ]; then
    mv package.json package-native.json
    echo "✓ package.json respaldado como package-native.json"
else
    echo "! package.json no encontrado"
fi

echo ""
echo "[2/3] Configurando package.json para web..."
if [ -f package-web.json ]; then
    mv package-web.json package.json
    echo "✓ package-web.json renombrado a package.json"
else
    echo "! package-web.json no encontrado"
    exit 1
fi

echo ""
echo "[3/3] Configurando index.html..."
if [ -f index-web.html ]; then
    if [ -f index.html ]; then
        mv index.html index-native.html
        echo "✓ index.html original respaldado"
    fi
    mv index-web.html index.html
    echo "✓ index-web.html renombrado a index.html"
else
    echo "! index-web.html no encontrado"
fi

echo ""
echo "========================================"
echo "Instalando dependencias..."
echo "========================================"
echo ""

npm install

echo ""
echo "========================================"
echo "¡Configuración completada!"
echo "========================================"
echo ""
echo "Para ejecutar la aplicación web:"
echo "  npm run dev"
echo ""
echo "Para volver a la versión native:"
echo "  - Renombra package.json a package-web.json"
echo "  - Renombra package-native.json a package.json"
echo ""

