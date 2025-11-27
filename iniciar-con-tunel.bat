@echo off
echo ========================================
echo   Iniciando servidor con tunel publico
echo ========================================
echo.
echo Paso 1: Iniciando servidor Vite...
start "Vite Server" cmd /k "npm run dev"
echo.
echo Esperando 3 segundos para que el servidor inicie...
timeout /t 3 /nobreak >nul
echo.
echo Paso 2: Creando tunel publico con localtunnel...
echo.
echo IMPORTANTE: 
echo - El servidor Vite debe estar corriendo en el puerto que muestra
echo - Copia la URL que aparece abajo (ej: https://xxx.loca.lt)
echo - Abre esa URL en tu telefono desde cualquier lugar
echo.
echo Presiona Ctrl+C para detener el tunel
echo.
lt --port 3001
pause

