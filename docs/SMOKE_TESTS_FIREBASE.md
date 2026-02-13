# Firebase Smoke Tests

## Objetivo

Verificar que la integración de Firebase funciona correctamente:
- Autenticación (sign up/sign in)
- Firestore (guardar/leer datos)
- Sincronización local ↔ cloud
- Local-first intacto (funciona sin Firebase)

## Prerequisitos

1. ✅ Firebase proyecto creado (`diario-misional`)
2. ✅ Authentication activado (Email/Password)
3. ✅ Firestore creado (Production mode)
4. ✅ Storage creado (Production mode)
5. ✅ Reglas de seguridad aplicadas (ver `FIREBASE_RULES_FIRESTORE.md` y `FIREBASE_RULES_STORAGE.md`)
6. ✅ `.env.local` configurado con las credenciales

## Test 1: Sign Up (Registro de Usuario)

**Objetivo**: Verificar que un usuario puede registrarse.

**Pasos**:
1. Abre la app en modo desarrollo
2. Navega a Profile → Data & Privacy
3. Si hay un botón "Sign Up" o similar, haz clic
4. Ingresa un email de prueba (ej: `test@example.com`)
5. Ingresa una contraseña (mínimo 6 caracteres)
6. Haz clic en "Sign Up"

**Resultado esperado**:
- ✅ Usuario creado exitosamente
- ✅ Mensaje de éxito o redirección
- ✅ En Firebase Console → Authentication → Users, aparece el nuevo usuario

**Si falla**:
- Verifica que Authentication esté activado en Firebase Console
- Verifica que Email/Password esté habilitado
- Revisa la consola del navegador para errores

---

## Test 2: Sign In (Inicio de Sesión)

**Objetivo**: Verificar que un usuario puede iniciar sesión.

**Pasos**:
1. Si no estás autenticado, haz sign out primero
2. Navega a Profile → Data & Privacy
3. Haz clic en "Sign In"
4. Ingresa el email y contraseña del Test 1
5. Haz clic en "Sign In"

**Resultado esperado**:
- ✅ Inicio de sesión exitoso
- ✅ Estado de autenticación actualizado en la app
- ✅ `useAuthStore` muestra `user` no null

**Si falla**:
- Verifica que el usuario exista en Firebase Console
- Revisa la consola del navegador para errores de autenticación

---

## Test 3: Crear Calling Local (Sin Sync)

**Objetivo**: Verificar que el módulo leadershipCallings funciona localmente sin Firebase.

**Pasos**:
1. Asegúrate de que `VITE_CLOUD_SYNC_ENABLED=false` en `.env.local`
2. Reinicia el servidor de desarrollo
3. Navega a Leadership → Callings
4. Crea un nuevo calling:
   - Member: "Juan Pérez"
   - Organization: "Elders Quorum"
   - Position: "Secretary"
5. Guarda el calling

**Resultado esperado**:
- ✅ Calling creado y visible en la lista
- ✅ Datos guardados en localStorage (ver DevTools → Application → Local Storage)
- ✅ No hay errores de Firebase en la consola
- ✅ App funciona completamente offline

**Si falla**:
- Verifica que los stores de Zustand funcionen correctamente
- Revisa localStorage en DevTools

---

## Test 4: Habilitar Cloud Sync

**Objetivo**: Verificar que el toggle de Cloud Sync funciona.

**Pasos**:
1. Navega a Profile → Data & Privacy
2. Busca el toggle "Cloud Sync (Beta)"
3. Actívalo (debe cambiar a ON)
4. Verifica en DevTools → Application → Local Storage que hay una clave relacionada con el flag

**Resultado esperado**:
- ✅ Toggle visible (solo en modo DEV o si está habilitado)
- ✅ Toggle cambia de estado correctamente
- ✅ `FLAGS.CLOUD_SYNC_ENABLED` se actualiza

**Si falla**:
- Verifica que el componente Profile tenga acceso a `featureFlags`
- Revisa la consola para errores

---

## Test 5: Sync Local → Cloud

**Objetivo**: Verificar que los datos locales se sincronizan a Firestore.

**Pasos**:
1. Asegúrate de estar autenticado (Test 2)
2. Asegúrate de tener Cloud Sync habilitado (Test 4)
3. Asegúrate de tener al menos 1 calling local (Test 3)
4. En Profile → Data & Privacy, haz clic en "Sync to Cloud" o similar
5. Espera a que termine la sincronización

**Resultado esperado**:
- ✅ Sincronización exitosa
- ✅ Mensaje de éxito con cantidad de items sincronizados
- ✅ En Firebase Console → Firestore Database, navega a `users/{tu-uid}/leadership_callings`
- ✅ Debe aparecer el calling creado en Test 3

**Si falla**:
- Verifica que estés autenticado
- Verifica que Cloud Sync esté habilitado
- Verifica las reglas de Firestore (deben permitir write para tu uid)
- Revisa la consola para errores específicos

---

## Test 6: Clear Local y Re-hydrate desde Cloud

**Objetivo**: Verificar que los datos se pueden restaurar desde cloud.

**Pasos**:
1. Asegúrate de tener datos en cloud (Test 5)
2. En DevTools → Application → Local Storage, elimina la clave `xtg_leadership_callings_v1`
3. Recarga la página
4. En Profile → Data & Privacy, haz clic en "Restore from Cloud" o "Hydrate from Cloud"
5. Espera a que termine la restauración

**Resultado esperado**:
- ✅ Restauración exitosa
- ✅ Calling del Test 3 vuelve a aparecer en la lista
- ✅ Datos idénticos a los que estaban en cloud

**Si falla**:
- Verifica que los datos existan en Firestore
- Verifica que estés autenticado con el mismo usuario
- Revisa la consola para errores

---

## Test 7: Export JSON (Local + Cloud)

**Objetivo**: Verificar que el export incluye datos locales y cloud (si sync está ON).

**Pasos**:
1. Asegúrate de tener datos locales y en cloud
2. Navega a Profile → Data & Privacy
3. Haz clic en "Export Data" o similar
4. Descarga el JSON

**Resultado esperado**:
- ✅ JSON descargado
- ✅ JSON contiene:
  - `callings`: array con los callings locales
  - `cloudSyncEnabled`: boolean
  - Si `cloudSyncEnabled: true`, debe indicar que hay datos en cloud también

**Si falla**:
- Verifica que la función de export exista
- Revisa la estructura del JSON

---

## Test 8: Clear Local NO borra Cloud

**Objetivo**: Verificar que limpiar datos locales no afecta cloud.

**Pasos**:
1. Asegúrate de tener datos en cloud (Test 5)
2. En Profile → Data & Privacy, haz clic en "Clear Local Data" o similar
3. Confirma la acción
4. Verifica en Firebase Console → Firestore que los datos siguen ahí

**Resultado esperado**:
- ✅ Datos locales eliminados
- ✅ Datos en cloud intactos
- ✅ Puedes re-hydrate desde cloud (Test 6)

**Si falla**:
- Verifica que la función de clear solo afecte localStorage
- No debe llamar a `deleteCalling` en cloud

---

## Checklist Final

Antes de considerar los smoke tests completos:

- [ ] Test 1: Sign Up funciona
- [ ] Test 2: Sign In funciona
- [ ] Test 3: Crear calling local funciona (sin Firebase)
- [ ] Test 4: Toggle Cloud Sync funciona
- [ ] Test 5: Sync local → cloud funciona
- [ ] Test 6: Re-hydrate desde cloud funciona
- [ ] Test 7: Export JSON funciona
- [ ] Test 8: Clear local no borra cloud

## Notas

- Todos los tests deben pasar sin errores en la consola
- Los datos deben persistir entre recargas de página
- La app debe funcionar completamente offline (local-first)
- Cloud sync es opcional y no debe romper la funcionalidad local

## Troubleshooting

### Error: "Firebase configuration incomplete"
- Verifica que `.env.local` exista y tenga todas las variables
- Reinicia el servidor de desarrollo después de crear `.env.local`

### Error: "User not authenticated"
- Asegúrate de haber hecho sign in (Test 2)
- Verifica que `useAuthStore` tenga `user` no null

### Error: "Permission denied" en Firestore
- Verifica que las reglas de seguridad estén aplicadas
- Verifica que estés autenticado con el usuario correcto
- Verifica que las reglas permitan read/write para tu uid

### Cloud Sync no aparece en Profile
- Verifica que el componente Profile tenga el toggle implementado
- Verifica que estés en modo desarrollo o que el flag esté visible
