# Firestore Indexes

Documenta aquí los índices creados cuando Firebase los solicite.

## Cómo crear un índice

1. Ejecuta el query que falla en la app.
2. Firebase devuelve un error con un **enlace directo** para crear el índice.
3. Haz clic, crea el índice y documenta abajo.

**No adivines índices.** Usa siempre el enlace que proporciona Firebase.

---

## Índices documentados

| collection | fields | reason |
|------------|--------|--------|
| *(pendiente)* | | |

### Ejemplo (EPIC 3 chat)

Si Firebase pide un índice para el query de mensajes:

| collection | fields | reason |
|------------|--------|--------|
| `conversations/{id}/messages` | `createdAt` (asc) | EPIC 3 chat query – orderBy createdAt |
