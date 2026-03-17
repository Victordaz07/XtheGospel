# EPIC 2.2 — Baptism Prep Cloud Sync v1 — QA Checklist

## Archivos tocados

| Archivo | Cambios |
|---------|---------|
| `src/types/baptismPrep.ts` | **Nuevo** — Tipo BaptismPrep |
| `src/services/baptismPrepService.ts` | **Nuevo** — getBaptismPrepDoc, upsertBaptismPrepDoc |
| `src/state/baptism/baptismPrepCache.ts` | **Nuevo** — Caché localStorage, TTL 7 días |
| `src/state/baptism/useBaptismPrepStore.ts` | **Nuevo** — Store + bridge con useBaptismProgressStore |
| `src/modules/investigator/components/BaptismPrepSyncBridge.tsx` | **Nuevo** — Hydrate + autosync |
| `src/modules/investigator/pages/BaptismPreparationScreen.tsx` | Banners UX, monta bridge |
| `src/modules/investigator/pages/BaptismPreparationScreen.css` | Estilos sync status |

## Ruta Firestore

`wards/{wardId}/baptismPreparation/{uid}`

## 3 pruebas obligatorias

### 1. Online + cloud ok
- **Pasos:** Usuario con ward membership, FLAGS.CLOUD_SYNC_ENABLED=true, login → /progress/baptism-preparation → marca 2 items → espera 1s
- **Esperado:** Doc en Firestore actualizado con items
- **Verificar:** Firestore Console → wards/{wardId}/baptismPreparation/{uid}

### 2. Offline con cache
- **Pasos:** Cargar preparación una vez (online). Offline en DevTools. Cambiar un item.
- **Esperado:** Cambio guardado local (dirty). Al volver online, autosync sube cambios.
- **Verificar:** Cache en xtg:baptismPrep:{uid}:{wardId}

### 3. Permission denied
- **Pasos:** Usuario sin ward membership (o reglas que denieguen)
- **Esperado:** Mensaje "No tienes acceso al barrio / tu cuenta no está vinculada" + botón Reintentar
- **Verificar:** No crash, UX clara

## Pruebas adicionales

- **Stale:** Cache > 7 días → banner "Puede estar desactualizado"
- **Última sincronización:** Se muestra cuando lastSyncedAt existe
- **Hydrate no triggea sync:** Entrar con store vacío → hidrata → no sync innecesario (isHydrating)
