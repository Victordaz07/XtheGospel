#!/bin/bash

echo "========================================"
echo "  Iniciando servidor con tunel publico"
echo "========================================"
echo ""
echo "Paso 1: Iniciando servidor Vite..."
npm run dev &
VITE_PID=$!

echo ""
echo "Esperando 3 segundos para que el servidor inicie..."
sleep 3

echo ""
echo "Paso 2: Creando tunel publico con localtunnel..."
echo ""
echo "IMPORTANTE:"
echo "- El servidor Vite debe estar corriendo en el puerto que muestra"
echo "- Copia la URL que aparece abajo (ej: https://xxx.loca.lt)"
echo "- Abre esa URL en tu telefono desde cualquier lugar"
echo ""
echo "Presiona Ctrl+C para detener el tunel"
echo ""

lt --port 3001

# Limpiar cuando se detenga
kill $VITE_PID 2>/dev/null

