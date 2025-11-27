# 📱 Cómo Compartir la App desde tu Teléfono

## Opción 1: ngrok (Recomendada - Más Estable)

### Pasos:

1. **Instalar ngrok:**
   ```bash
   # Opción A: Descargar desde https://ngrok.com/download
   # Opción B: Con npm
   npm install -g ngrok
   ```

2. **Crear cuenta gratuita:**
   - Ve a https://ngrok.com
   - Crea una cuenta (es gratis)
   - Copia tu authtoken del dashboard

3. **Configurar ngrok:**
   ```bash
   ngrok config add-authtoken TU_TOKEN_AQUI
   ```

4. **Iniciar el servidor y el túnel:**
   ```bash
   # Terminal 1: Inicia Vite
   npm run dev
   
   # Terminal 2: Inicia ngrok (usa el puerto que muestra Vite, ej: 3001)
   ngrok http 3001
   ```

5. **Usar la URL pública:**
   - ngrok te dará una URL como: `https://abc123.ngrok.io`
   - Abre esa URL en tu teléfono (debe estar en la misma red WiFi o usar datos móviles)
   - ✅ Funciona desde cualquier lugar del mundo

---

## Opción 2: localtunnel (Gratis, Sin Cuenta)

### Pasos:

1. **Instalar localtunnel:**
   ```bash
   npm install -g localtunnel
   ```

2. **Iniciar el servidor y el túnel:**
   ```bash
   # Terminal 1: Inicia Vite
   npm run dev
   
   # Terminal 2: Crea el túnel (usa el puerto que muestra Vite)
   lt --port 3001
   ```

3. **Usar la URL pública:**
   - localtunnel te dará una URL como: `https://random-name.loca.lt`
   - Abre esa URL en tu teléfono
   - ⚠️ Nota: La primera vez puede pedirte que visites la URL en el navegador para "desbloquear" el túnel

---

## Opción 3: Red Local (Solo si están en la misma WiFi)

Si tu teléfono está en la misma red WiFi que tu computadora:

1. **Inicia Vite con host:**
   ```bash
   npm run dev
   ```

2. **Encuentra tu IP local:**
   ```bash
   # Windows
   ipconfig
   # Busca "IPv4 Address" (ej: 192.168.1.100)
   
   # Mac/Linux
   ifconfig
   # Busca "inet" (ej: 192.168.1.100)
   ```

3. **Abre en tu teléfono:**
   - URL: `http://TU_IP_LOCAL:3001`
   - Ejemplo: `http://192.168.1.100:3001`

---

## Recomendación

**Para compartir desde cualquier lugar:** Usa **ngrok** (Opción 1)
- Es la más estable
- URLs más cortas y fáciles de compartir
- Funciona perfectamente desde datos móviles

**Para pruebas rápidas:** Usa **localtunnel** (Opción 2)
- No requiere cuenta
- Más rápido de configurar
- Puede ser menos estable que ngrok

---

## Notas Importantes

- ⚠️ Las URLs de ngrok y localtunnel son **públicas** - cualquiera con la URL puede acceder
- 🔒 Para producción, usa Firebase Hosting o similar
- 📱 Asegúrate de que el servidor Vite esté corriendo antes de crear el túnel
- 🔄 Si reinicias el túnel, la URL cambiará (ngrok tiene opción de URL fija en plan de pago)

