# 📱 Cómo ver la aplicación en tu móvil (sin WiFi)

Esta guía te muestra cómo acceder a la aplicación desde tu móvil, incluso si no estás en la misma red WiFi.

## 🚀 Opción 1: Usar LocalTunnel (Recomendado - Gratis y fácil)

### Paso 1: Instalar LocalTunnel

Abre una terminal y ejecuta:

```bash
npm install -g localtunnel
```

### Paso 2: Iniciar el servidor de desarrollo

En una terminal, ejecuta:

```bash
npm run dev
```

Espera a que veas un mensaje como:
```
  ➜  Local:   http://localhost:3001/
  ➜  Network: http://192.168.x.x:3001/
```

### Paso 3: Crear el túnel público

En una **nueva terminal** (mantén la anterior corriendo), ejecuta:

```bash
lt --port 3001
```

Verás algo como:
```
your url is: https://xxxx-xx-xxx-xxx-xxx.loca.lt
```

### Paso 4: Abrir en tu móvil

1. Copia la URL que aparece (ejemplo: `https://xxxx-xx-xxx-xxx-xxx.loca.lt`)
2. Ábrela en el navegador de tu móvil desde **cualquier lugar** (no necesitas WiFi)
3. La primera vez te pedirá permisos - acepta para continuar

---

## 🎯 Opción 2: Script automático (Windows)

Si estás en Windows, puedes usar el script automatizado:

1. Ejecuta el archivo `iniciar-con-tunel.bat`
2. Espera a que se inicien ambos servicios
3. Copia la URL que aparece
4. Ábrela en tu móvil

---

## 🔧 Opción 3: Usar ngrok (Alternativa más estable)

### Paso 1: Instalar ngrok

1. Descarga ngrok desde: https://ngrok.com/download
2. Extrae el archivo y añádelo a tu PATH

O instálalo con npm:
```bash
npm install -g ngrok
```

### Paso 2: Crear cuenta gratuita

1. Ve a https://ngrok.com/
2. Crea una cuenta gratuita
3. Obtén tu token de autenticación

### Paso 3: Autenticar ngrok

```bash
ngrok config add-authtoken TU_TOKEN_AQUI
```

### Paso 4: Iniciar servidor y túnel

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
ngrok http 3001
```

Verás una URL pública como: `https://xxxx-xxxx-xxxx.ngrok-free.app`

---

## 📝 Notas importantes

- ⚠️ **LocalTunnel**: La primera vez que accedes, te pedirá permiso. Solo acepta si es tu túnel.
- ⚠️ **URLs temporales**: Las URLs de túneles cambian cada vez que reinicias (a menos que uses un dominio personalizado)
- ⚠️ **Rendimiento**: Puede ser un poco más lento que la red local, pero funciona desde cualquier lugar
- ✅ **Seguridad**: Solo tú tienes acceso a esa URL única
- 🔄 **Reinicio**: Si reinicias el túnel, tendrás una nueva URL

---

## 🐛 Solución de problemas

### Error: "lt: command not found"
**Solución**: Instala localtunnel globalmente:
```bash
npm install -g localtunnel
```

### Error: "Port 3001 is already in use"
**Solución**: 
1. Verifica que no tengas otro servidor corriendo
2. O cambia el puerto en `vite.config.ts` y en el comando del túnel

### La URL no carga en el móvil
**Soluciones**:
1. Verifica que el servidor Vite esté corriendo (`npm run dev`)
2. Asegúrate de que el puerto sea el correcto (3001)
3. Prueba con una conexión de datos móviles
4. Revisa si hay un firewall bloqueando

### LocalTunnel pide permisos cada vez
**Solución**: Esto es normal, es una medida de seguridad. Solo acepta si reconoces la URL.

---

## 🎨 Para desarrollo frecuente

Si vas a usar esto frecuentemente, puedes crear un alias en tu terminal:

**Windows (PowerShell):**
```powershell
function Start-Tunnel { npm run dev &; Start-Sleep -Seconds 3; lt --port 3001 }
```

**Mac/Linux (Bash/Zsh):**
```bash
alias dev-tunnel='npm run dev & sleep 3 && lt --port 3001'
```

Luego solo ejecuta `Start-Tunnel` o `dev-tunnel` según tu sistema.

