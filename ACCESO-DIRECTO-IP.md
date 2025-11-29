# 📱 Acceso Directo por IP (Sin Túnel)

## ✅ Método Más Simple

Si tu móvil está en la **misma red WiFi** que tu computadora, puedes acceder directamente sin necesidad de túnel ni contraseñas.

### Paso 1: Verifica tu IP
Tu IP local es: **192.168.12.103**

### Paso 2: Abre en tu móvil
1. Asegúrate de que tu móvil esté en la **misma WiFi**
2. Abre el navegador en tu móvil
3. Escribe en la barra de direcciones:

```
http://192.168.12.103:3001
```

**Importante:**
- Usa `http://` (NO `https://`)
- Incluye el puerto `:3001`
- No necesitas contraseña

---

## 🔧 Si el Campo Solo Acepta IP (Sin Puerto)

Si estás llenando un formulario que solo acepta dirección IP:

1. **IP:** `192.168.12.103`
2. **Puerto:** `3001` (en otro campo si existe)

O si el campo solo acepta IP sin puerto, es posible que necesites:
- Configurar el servidor para usar el puerto 80 (requiere permisos de administrador)
- O usar un proxy/reverso

---

## 🚨 Solución de Problemas

### Error: "Cannot connect"
- ✅ Verifica que ambos dispositivos estén en la misma WiFi
- ✅ Verifica que el servidor esté corriendo (`npm run dev`)
- ✅ Verifica que el firewall no esté bloqueando el puerto 3001

### Error: "Connection refused"
- El servidor no está escuchando en esa IP
- Verifica en `vite.config.ts` que `host: true` esté configurado

### No carga la página
- Intenta reiniciar el servidor
- Verifica que el puerto 3001 esté disponible

---

## 📋 URLs para Copiar y Pegar

### Para el navegador completo:
```
http://192.168.12.103:3001
```

### Solo la IP (si el campo lo requiere):
```
192.168.12.103
```

### Con puerto separado:
```
IP: 192.168.12.103
Puerto: 3001
```

