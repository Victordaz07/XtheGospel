# Firebase Storage Security Rules

## Reglas Éticas

Estas reglas garantizan que:
- Cada usuario solo puede leer/escribir archivos en su propia carpeta
- No hay acceso cruzado entre usuarios
- Validación básica de tipos de archivo y tamaños
- Nada de contenido público o compartido sin consentimiento explícito

## Reglas Recomendadas

Copia y pega estas reglas en Firebase Console → Storage → Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Helper function: verifica que el usuario esté autenticado
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function: verifica que el usuario solo acceda a sus propios archivos
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Helper function: valida tipo de archivo (solo imágenes y documentos)
    function isValidFileType() {
      return request.resource.contentType.matches('image/.*') ||
             request.resource.contentType.matches('application/pdf') ||
             request.resource.contentType.matches('application/msword') ||
             request.resource.contentType.matches('application/vnd.openxmlformats-officedocument.*');
    }
    
    // Helper function: valida tamaño (máximo 10MB)
    function isValidSize() {
      return request.resource.size < 10 * 1024 * 1024; // 10MB
    }
    
    // Users collection: cada usuario solo accede a su carpeta
    match /users/{userId}/{allPaths=**} {
      // El usuario solo puede leer/escribir archivos en su propia carpeta
      allow read: if isOwner(userId);
      allow write: if isOwner(userId) && 
                      isValidFileType() && 
                      isValidSize();
    }
    
    // Denegar todo lo demás por defecto
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

## Validaciones Implementadas

1. **Autenticación requerida**: Solo usuarios autenticados pueden subir/descargar
2. **Aislamiento de archivos**: Cada usuario solo accede a `/users/{su-uid}/...`
3. **Tipos de archivo permitidos**:
   - Imágenes: `image/*` (jpg, png, gif, webp, etc.)
   - Documentos: PDF, Word (.doc, .docx), Excel (.xls, .xlsx)
4. **Límite de tamaño**: Máximo 10MB por archivo
5. **Sin contenido público**: No hay reglas para acceso público o compartido

## Cómo Aplicar las Reglas

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `xthegospel`
3. Ve a **Build → Storage → Rules**
4. Copia y pega las reglas de arriba
5. Haz clic en **Publish**

## Estructura de Carpetas Recomendada

```
/users/{uid}/
  /leadership_attachments/
    /calling-{callingId}/
      - foto-miembro.jpg
      - documento.pdf
  /profile/
    - avatar.jpg
  /notes_attachments/
    - {noteId}-attachment.pdf
```

## Testing

Después de aplicar las reglas, prueba:

1. **Usuario autenticado sube archivo a su carpeta**: ✅ Debe funcionar
2. **Usuario autenticado intenta acceder a archivo de otro usuario**: ❌ Debe fallar
3. **Usuario no autenticado intenta subir archivo**: ❌ Debe fallar
4. **Intento de subir archivo muy grande (>10MB)**: ❌ Debe fallar
5. **Intento de subir tipo de archivo no permitido (ej: .exe)**: ❌ Debe fallar

## Notas Importantes

- Estas reglas son **restrictivas por defecto**: todo lo que no está explícitamente permitido está denegado
- No hay reglas para "lectura pública" o "escritura anónima"
- Los archivos son **privados por usuario**: ni siquiera los administradores de Firebase pueden ver archivos de usuarios sin autenticarse como ese usuario (a menos que usen la consola de Firebase con permisos de administrador)
- **Storage es opcional**: Si no planeas usar Storage, puedes dejar las reglas por defecto (todo denegado)
