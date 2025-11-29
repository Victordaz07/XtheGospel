# Guía rápida: publicar en Firebase Hosting

Esta app ya genera una versión web estática con `vite build` dentro de `dist/`.
Firebase Hosting puede servir directamente esa carpeta y darte una URL pública
sin depender de túneles. Sigue estos pasos (solo necesitas hacerlo una vez por
máquina/proyecto):

## 1. Preparar el entorno

1. Instala la CLI global de Firebase (requiere Node 18+):  
   `npm install -g firebase-tools`
2. Inicia sesión con tu cuenta de Google:  
   `firebase login`
3. (Solo si aún no tienes proyecto) crea uno desde la consola web:
   https://console.firebase.google.com/ → "Agregar proyecto".

## 2. Inicializar Hosting en este repositorio

En la raíz del proyecto (`App Misional/`):

```
firebase init hosting
```

- **Use an existing project / Create a new project** → selecciona el ID correcto.
- **Public directory** → escribe `dist`.
- **Configure as a single-page app** → responde `y` para que todas las rutas
  se redirijan a `index.html`.
- **GitHub deploys** → responde `n` (podemos automatizarlo más adelante).

El comando crea `firebase.json` y `.firebaserc`. Súbelos al repositorio.

## 3. Construir y desplegar

1. Genera la versión web optimizada:
   ```
   npm install        # solo la primera vez
   npm run build      # produce dist/
   ```
2. Sube el contenido al hosting:
   ```
   firebase deploy --only hosting
   ```

La CLI mostrará algo como `Hosting URL: https://tu-project-id.web.app`.
Comparte esa URL con tu equipo para que pruebe la app sin túneles.

## 4. Opcional: dominio propio y previas

- Desde la consola de Firebase, sección **Hosting**, agrega un dominio custom y
  sigue el asistente de DNS.
- Si quieres previsualizar antes de publicar, usa:
  ```
  firebase hosting:channel:deploy staging
  ```
  Obtendrás una URL temporal (`https://staging--tu-project-id.web.app`).

---

¿Listo para automatizar despliegues o integrar otra plataforma? Avísame y lo
preparamos.

