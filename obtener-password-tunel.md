# 🔑 Cómo obtener la contraseña del túnel

Cuando ejecutas `lt --port 3001`, LocalTunnel muestra en la terminal:

```
your url is: https://puny-gifts-play.loca.lt
```

Y normalmente también muestra algo como:
- Una contraseña de 6 caracteres
- O un mensaje con el password

## 📋 Pasos para encontrar la contraseña:

1. **Ve a la terminal donde ejecutaste `lt --port 3001`**
2. **Busca en la salida** algo como:
   ```
   Tunnel password: ABC123
   ```
   o simplemente verás una contraseña de 6 caracteres

3. **Si no aparece automáticamente**, detén el túnel (Ctrl+C) y ejecuta:
   ```bash
   lt --port 3001 --print-requests
   ```

## ✅ Solución alternativa:

Si no encuentras la contraseña, puedes:
1. Detener el túnel actual (Ctrl+C)
2. Ejecutar de nuevo: `lt --port 3001`
3. Esta vez copia TANTO la URL como la contraseña que aparezca

---

**Nota:** La contraseña normalmente es un código de 6 caracteres que aparece justo después de la URL en la terminal.



