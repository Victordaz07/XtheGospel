# QA Runbook — W01–W04 + EPIC 3 Chat

## Preparación (1 minuto)

- **Sesión A:** navegador normal (Usuario A)
- **Sesión B:** incógnito/otro navegador (Usuario B)
- **Usuario C:** NO miembro del ward / NO participant del chat

---

## A) WARDS — W01–W04 (reglas v2 siguen vivas)

### W01 — Miembro puede leer su ward

- **Acción:** Usuario A entra al dashboard/área que cargue wardMembership y haga get `wards/{wardId}`.
- **Esperado:** ✅ Carga normal, sin permission-denied.
- **✅/❌:** ___

### W02 — No-miembro NO puede leer ese ward

- **Acción:** Usuario C intenta cargar el mismo wardId (por UI si se puede, o pegando una ruta que lo fuerce).
- **Esperado:** ✅ permission-denied (o UI "No tienes acceso / no vinculado").
- **✅/❌:** ___

### W03 — Líder crea teaching session

- **Precondición:** Usuario A está en leaderIds del ward.
- **Acción:** desde leadership, crea una sesión (o dispara el flujo que haga setDoc/addDoc en `wards/{wardId}/teachingSessions`).
- **Esperado:** ✅ Se crea el doc sin error.
- **✅/❌:** ___

### W04 — Miembro escribe su baptismPreparation/{uid}

- **Acción:** Usuario A → Baptism Preparation → marca 1 item.
- **Esperado:** ✅ No crashea. Online: sync OK. Offline: queda dirty y luego sync.
- **✅/❌:** ___

> Si W04 falla con permission-denied, 99% es: memberIds no incluye el UID o el wardId usado no es el correcto.

---

## B) EPIC 3 — CHAT (participants / non-participant)

### C01 — Participant entra/crea conversación

- **Acción:** Usuario A → InvestigatorHome → "Chatear con los misioneros".
- **Esperado:** ✅ Navega a `/chat/:conversationId` y carga (aunque esté vacío).
- **✅/❌:** ___

### C02 — Realtime A ↔ B

- **Acción:**
  1. Usuario A manda "hola"
  2. Usuario B lo ve en tiempo real
  3. Usuario B responde "recibido"
  4. Usuario A lo ve en tiempo real
- **Esperado:** ✅ Realtime estable (sin duplicados).
- **✅/❌:** ___

### C03 — Non-participant bloqueado

- **Acción:** Usuario C pega la URL `/chat/:conversationId`.
- **Esperado:** ✅ permission-denied / UI "No tienes acceso a este chat".
- **✅/❌:** ___

### C04 — Validaciones de input

- **Acción:** intenta enviar:
  - vacío
  - solo espacios
  - 2000 caracteres
- **Esperado:** ✅ No envía; muestra feedback.
- **✅/❌:** ___

### C05 — Offline recovery

- **Acción:** en ChatScreen:
  1. DevTools → Offline 10–15s
  2. vuelve Online
- **Esperado:** ✅ no crashea; listener se recupera.
- **✅/❌:** ___

---

## Si algo falla

Pásame estos 3 datos (y lo arreglamos rápido):

1. **Error exacto** (texto completo)
2. **Ruta Firestore** que intentó tocar (ej: `wards/{wardId}/...` o `conversations/{id}/messages`)
3. **UID + wardId** del usuario en esa prueba (A/B/C)

---

**Listo.** Ejecuta el runbook y reporta qué casos quedaron en ❌.
