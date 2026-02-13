# Firebase Setup Guide

## Paso 1: Crear archivo .env.local

Copia el archivo `.env.example` a `.env.local` en la raíz del proyecto y rellena las variables con las credenciales de tu proyecto Firebase. O crea `.env.local` manualmente con las siguientes variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyBXuuuUdkoTOwx2zCvYC3y4ALfZfyPJOVk
VITE_FIREBASE_AUTH_DOMAIN=diario-misional.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=diario-misional
VITE_FIREBASE_STORAGE_BUCKET=diario-misional.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=111069405449
VITE_FIREBASE_APP_ID=1:111069405449:web:981098a7ba92373ebd33d8

# Feature Flags
# Cloud sync is OFF by default. Set to 'true' to enable.
VITE_CLOUD_SYNC_ENABLED=false
```

**Nota**: El archivo `.env.local` está ignorado por `.gitignore` (`.env.*`) y no se subirá al repositorio. Usa `.env.example` como plantilla.

## Paso 2: Aplicar Reglas de Seguridad

### Firestore Rules

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `diario-misional`
3. Ve a **Build → Firestore Database → Rules**
4. Copia y pega las reglas de `docs/FIREBASE_RULES_FIRESTORE.md`
5. Haz clic en **Publish**

### Storage Rules (Opcional)

Si planeas usar Storage:

1. Ve a **Build → Storage → Rules**
2. Copia y pega las reglas de `docs/FIREBASE_RULES_STORAGE.md`
3. Haz clic en **Publish**

## Paso 3: Verificar Authentication

1. Ve a **Build → Authentication**
2. Asegúrate de que **Email/Password** esté habilitado
3. Si no está habilitado, haz clic en **Get started** y luego habilita **Email/Password**

## Paso 4: Reiniciar Servidor de Desarrollo

Después de crear `.env.local`, reinicia el servidor de desarrollo:

```bash
npm run dev
```

## Paso 5: Probar la Integración

1. Abre la app en el navegador
2. Navega a **Profile → Data & Privacy (Beta)**
3. Deberías ver la sección de Cloud Sync
4. Prueba hacer sign up / sign in
5. Sigue los smoke tests en `docs/SMOKE_TESTS_FIREBASE.md`

## Troubleshooting

### Error: "Firebase configuration incomplete"

- Verifica que `.env.local` exista en la raíz del proyecto
- Verifica que todas las variables empiecen con `VITE_`
- Reinicia el servidor de desarrollo después de crear/modificar `.env.local`

### Error: "Permission denied" en Firestore

- Verifica que las reglas de seguridad estén aplicadas (Paso 2)
- Verifica que estés autenticado
- Verifica que las reglas permitan read/write para tu `uid`

### Cloud Sync no aparece en Profile

- Verifica que estés en modo desarrollo (`npm run dev`)
- El componente solo se muestra en DEV mode por seguridad

### Error: "User not authenticated"

- Asegúrate de haber hecho sign in primero
- Verifica que Authentication esté habilitado en Firebase Console

## Estructura de Datos en Firestore

Los datos se almacenan bajo la siguiente estructura:

```
/users/{uid}/
  /leadership_callings/{callingId}
  /leadership_responsibilities/{respId}
  /leadership_notes/{noteId}
  /leadership_events/{eventId}
  /leadership_observations/{obsId}
```

Cada documento incluye:

- `id`: ID del documento
- `schemaVersion`: Versión del esquema ('v1')
- `createdAt`: Fecha de creación (ISO string)
- `updatedAt`: Fecha de actualización (ISO string)
- Datos específicos del tipo (Calling, Responsibility, etc.)

## Resultado de smoke tests

Cuando el equipo configure Firebase y ejecute los smoke tests de `docs/SMOKE_TESTS_FIREBASE.md`, documentar aquí el resultado (fecha, quién ejecutó, tests pasados/fallidos, incidencias). Ejemplo:

- **Fecha**: _pendiente_
- **Ejecutado por**: \_
- **Tests pasados**: _/8_
- **Incidencias**: _ninguna / descripción_

## Notas Importantes

- **Local-first**: Los datos siempre funcionan localmente, incluso si Firebase falla
- **Sync opcional**: Cloud sync está OFF por defecto y es completamente opcional
- **Privacidad**: Cada usuario solo puede acceder a sus propios datos
- **Sin métricas**: No hay KPIs, streaks, XP, badges, o cualquier forma de gamificación
- **Sin vigilancia**: No hay tracking, analytics, o telemetría
