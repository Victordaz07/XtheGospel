# EPIC 3: Chat v1 — QA Checklist

## Alcance verificado

- [ ] Solo texto (sin imágenes, sin audio)
- [ ] Near-real-time con `onSnapshot`
- [ ] 1 conversación por investigador + companionship (hasta 2 misioneros)
- [ ] Sin presencia, typing ni "seen"
- [ ] Solo participantes pueden leer/escribir

---

## 1. Realtime entre participantes

| # | Caso | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 1.1 | Mensajes en tiempo real | Usuario A (participant) envía mensaje. Usuario B (participant) tiene la conversación abierta. | Usuario B ve el mensaje nuevo sin recargar. |
| 1.2 | Orden correcto | Enviar varios mensajes en secuencia. | Mensajes aparecen ordenados por `createdAt` ascendente. |
| 1.3 | Límite de mensajes | Conversación con >50 mensajes. | Se muestran los últimos 50 (o 100 según implementación). |

---

## 2. Seguridad: usuario NO participant

| # | Caso | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 2.1 | Read permission-denied | Usuario C (NO participant) navega a `/chat/{conversationId}` de una conversación donde no está. | UI muestra "No tienes acceso a este chat" (o equivalente). No se cargan mensajes. |
| 2.2 | Write bloqueado | Usuario C intenta enviar mensaje (si llegara a tener input). | Firestore rechaza el create; no se persiste. |

---

## 3. Validaciones de input

| # | Caso | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 3.1 | Mensaje vacío | Escribir solo espacios o vacío y pulsar Enviar. | No se envía; input no permite enviar vacío. |
| 3.2 | Trim | Escribir "  hola  " y enviar. | Se guarda "hola" (trim aplicado). |
| 3.3 | Max 2000 chars | Escribir >2000 caracteres. | Input limita a 2000; no permite enviar más. |

---

## 4. Offline

| # | Caso | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 4.1 | Offline no revienta | Con conversación abierta, activar modo avión / desconectar. | UI no crashea; se muestra banner offline (si existe). |
| 4.2 | Vuelta online | Volver a conectar. | Listener se reestablece; mensajes se actualizan. |

---

## 5. Navegación y flujo

| # | Caso | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 5.1 | Sin misioneros | Investigador sin missionaries asignados pulsa "Chatear con misioneros". | Toast/banner: "Aún no tienes misioneros asignados". |
| 5.2 | Con misioneros | Investigador con missionaries asignados pulsa el botón. | Se crea/obtiene conversación y navega a `/chat/:conversationId`. |
| 5.3 | Ruta protegida | Usuario no autenticado intenta acceder a `/chat/xxx`. | Redirige a login (ProtectedRoute). |

---

## 6. Reglas Firestore (manual / emulator)

| # | Caso | Resultado esperado |
|---|------|--------------------|
| 6.1 | `conversations`: create sin uid en participantIds | Denegado. |
| 6.2 | `conversations`: read por non-participant | Denegado. |
| 6.3 | `messages`: create con senderId != uid() | Denegado. |
| 6.4 | `messages`: create con text > 2000 chars | Denegado. |

---

## Notas

- Ejecutar en emulador Firestore cuando sea posible.
- Verificar índices compuestos si el query de mensajes falla (orderBy createdAt).
