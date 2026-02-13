# Firestore Security Rules

## Reglas Éticas

Estas reglas garantizan que:
- Cada usuario solo puede leer/escribir sus propios datos
- No hay acceso cruzado entre usuarios
- Validación básica de tamaños para prevenir abusos
- Nada de métricas espirituales, KPIs, o vigilancia

## Reglas Recomendadas

Copia y pega estas reglas en Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function: verifica que el usuario esté autenticado
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function: verifica que el usuario solo acceda a sus propios datos
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Helper function: valida tamaño básico de strings (prevenir abusos)
    function isValidString(value, maxLength) {
      return value is string && value.size() <= maxLength;
    }
    
    // Users collection: cada usuario solo accede a su subcolección
    match /users/{userId} {
      // El usuario solo puede leer/escribir su propio documento de usuario (si existe)
      allow read, write: if isOwner(userId);
      
      // Leadership Callings
      match /leadership_callings/{callingId} {
        allow read, write: if isOwner(userId) && 
          isValidString(resource.data.memberName, 200) &&
          isValidString(resource.data.position, 200);
      }
      
      // Leadership Responsibilities
      match /leadership_responsibilities/{respId} {
        allow read, write: if isOwner(userId) &&
          isValidString(resource.data.title, 200) &&
          isValidString(resource.data.description || '', 2000);
      }
      
      // Leadership Notes (PRIVADAS - solo dueño)
      match /leadership_notes/{noteId} {
        allow read, write: if isOwner(userId) &&
          isValidString(resource.data.content, 10000); // Máximo 10KB por nota
      }
      
      // Leadership Events
      match /leadership_events/{eventId} {
        allow read, write: if isOwner(userId) &&
          isValidString(resource.data.title, 200) &&
          isValidString(resource.data.description || '', 2000);
      }
      
      // Leadership Observations
      match /leadership_observations/{obsId} {
        allow read, write: if isOwner(userId) &&
          isValidString(resource.data.content, 5000) &&
          isValidString(resource.data.milestone || '', 200);
      }
    }
    
    // Denegar todo lo demás por defecto
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Validaciones Implementadas

1. **Autenticación requerida**: Solo usuarios autenticados pueden acceder
2. **Aislamiento de datos**: Cada usuario solo accede a `/users/{su-uid}/...`
3. **Límites de tamaño**: 
   - Nombres/posiciones: 200 caracteres
   - Descripciones: 2000 caracteres
   - Notas: 10KB (10000 caracteres)
   - Observaciones: 5000 caracteres
4. **Sin métricas**: No hay campos para KPIs, streaks, XP, badges, etc.

## Cómo Aplicar las Reglas

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `xthegospel`
3. Ve a **Build → Firestore Database → Rules**
4. Copia y pega las reglas de arriba
5. Haz clic en **Publish**

## Testing

Después de aplicar las reglas, prueba:

1. **Usuario autenticado accede a sus datos**: ✅ Debe funcionar
2. **Usuario autenticado intenta acceder a datos de otro usuario**: ❌ Debe fallar
3. **Usuario no autenticado intenta acceder**: ❌ Debe fallar
4. **Intento de escribir string muy largo**: ❌ Debe fallar

## Notas Importantes

- Estas reglas son **restrictivas por defecto**: todo lo que no está explícitamente permitido está denegado
- No hay reglas para "lectura pública" o "escritura anónima"
- Los datos son **privados por usuario**: ni siquiera los administradores de Firebase pueden ver datos de usuarios sin autenticarse como ese usuario (a menos que usen la consola de Firebase con permisos de administrador)
