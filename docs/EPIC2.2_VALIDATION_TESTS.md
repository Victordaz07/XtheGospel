# EPIC 2.2 — Validación final (4 pruebas)

## 1. Hydrate no dispara sync

**Pasos:** Entra con store vacío → hidrata → espera 2s.

**Esperado:** No debe escribir a Firestore si no hiciste cambios.

**Implementación:** `isHydrating` bloquea `scheduleSync` durante hydrate. Subscribe retorna early cuando `isHydrating`.

---

## 2. Login → cambio de ward

**Pasos:** Si la app lo permite, cambia a otro ward.

**Esperado:** Debe cambiar key de cache (`xtg:baptismPrep:{uid}:{wardId}`) y doc path sin mezclar datos.

**Implementación:** Cache y doc usan `wardId` en la key/path. Ward distinto = datos separados.

---

## 3. Logout en medio del debounce

**Pasos:** Marca item → logout antes del 1s.

**Esperado:** No debe intentar sync sin user.

**Implementación:** 
- Cleanup del bridge cancela el timeout al desmontar.
- Dentro del callback: `getAuth().currentUser` verifica auth actual antes de sync.

---

## 4. Doc inexistente

**Pasos:** Usuario nuevo sin baptismPrep doc → hydrate.

**Esperado:** Hydrate crea estado local sin reventar. Al primer cambio, se crea el doc.

**Implementación:**
- `getBaptismPrepDoc` retorna `null` si no existe.
- Hydrate: `cloud === null && !cached` → `set({ status: 'success', data: null })` (sin crash).
- Primer cambio → subscribe → markDirty → scheduleSync → `upsertBaptismPrepDoc` con `merge: true` crea el doc.

---

## Fix aplicado (Bridge)

- Subscribe ya no exige `wardIdRef.current` (se asigna async en init). `scheduleSync` valida wardId cuando corre.
- Callback del debounce usa `getAuth().currentUser` en lugar del closure para evitar sync tras logout.
