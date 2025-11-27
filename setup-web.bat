@echo off
echo ========================================
echo Configuracion de Aplicacion Web
echo ========================================
echo.

echo [1/3] Respaldando package.json original...
if exist package.json (
    move package.json package-native.json
    echo ✓ package.json respaldado como package-native.json
) else (
    echo ! package.json no encontrado
)

echo.
echo [2/3] Configurando package.json para web...
if exist package-web.json (
    move package-web.json package.json
    echo ✓ package-web.json renombrado a package.json
) else (
    echo ! package-web.json no encontrado
    pause
    exit /b 1
)

echo.
echo [3/3] Configurando index.html...
if exist index-web.html (
    if exist index.html (
        move index.html index-native.html
        echo ✓ index.html original respaldado
    )
    move index-web.html index.html
    echo ✓ index-web.html renombrado a index.html
) else (
    echo ! index-web.html no encontrado
)

echo.
echo ========================================
echo Instalando dependencias...
echo ========================================
echo.

call npm install

echo.
echo ========================================
echo ¡Configuracion completada!
echo ========================================
echo.
echo Para ejecutar la aplicacion web:
echo   npm run dev
echo.
echo Para volver a la version native:
echo   - Renombra package.json a package-web.json
echo   - Renombra package-native.json a package.json
echo.
pause

