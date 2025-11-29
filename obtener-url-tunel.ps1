# Script para obtener la URL del túnel
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Creando túnel público..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Espera un momento mientras se crea el túnel..." -ForegroundColor Yellow
Write-Host ""

# Ejecutar localtunnel y capturar la salida
$output = & lt --port 3001 2>&1

# Buscar la URL en la salida
$url = $output | Select-String -Pattern "https://.*\.loca\.lt"

if ($url) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ TÚNEL CREADO" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 URL pública:" -ForegroundColor Cyan
    Write-Host $url.Line -ForegroundColor White -BackgroundColor DarkGreen
    Write-Host ""
    Write-Host "📱 Abre esta URL en tu móvil desde cualquier lugar" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Presiona Ctrl+C para detener el túnel" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "Error: No se pudo obtener la URL del túnel" -ForegroundColor Red
    Write-Host "Asegúrate de que el servidor esté corriendo en el puerto 3001" -ForegroundColor Yellow
}

