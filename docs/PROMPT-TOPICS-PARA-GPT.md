# Prompt para GPT: listar todos los topics del proyecto (sin omitir ninguno)

Copia y pega el siguiente bloque en GPT. El objetivo es que GPT genere una lista exhaustiva de **topics** (temas / áreas de contenido) del proyecto xTheGospel App Avanzada Misional, sin dejar ninguno fuera.

---

## Bloque para copiar a GPT

```
Eres un analista de producto y documentación. Necesito que generes una lista COMPLETA de TOPICS (temas/áreas de contenido) del proyecto "xTheGospel - App Avanzada Misional", sin omitir ninguno.

CONTEXTO DEL PROYECTO
- App de acompañamiento espiritual y gestión eclesiástica para investigadores, miembros y líderes (barrio/rama).
- Tres modos de uso: Investigador, Miembro, Liderazgo (ward/stake).
- Rutas unificadas: /home, /lessons, /journal, /progress, /profile.
- Módulo Leadership Callings completo bajo /member/leadership/* (dashboard, llamamientos, calendario, miembros, responsabilidades, notas).
- Integración Firebase (código listo, config pendiente). Local-first con export/clear de datos.
- Design system: Golden UI, tokens, componentes en src/ui.

INSTRUCCIONES
1. Recorre MENTALMENTE cada una de las categorías abajo y extrae todos los topics que correspondan.
2. Un "topic" puede ser: un área de funcionalidad, un documento, un módulo, un flujo de usuario, un concepto técnico o de producto, una pantalla/ruta, o un tema de contenido (ej. "Llamamientos", "Notas de liderazgo", "Firebase Setup").
3. No des por sentado que algo es "obvio" y lo omitas: incluye todo lo que un nuevo desarrollador, documentador o product manager necesitaría encontrar.
4. Al final, entrega la lista en formato estructurado (por ejemplo: por dominio, por tipo, o por módulo) y añade una sección "Topics que podrían faltar" donde sugieras 3–5 temas que a veces se olvidan en proyectos similares, para que yo los cruce con el proyecto.

CATEGORÍAS QUE DEBES CUBRIR (revisa cada una y extrae topics):

A) DOCUMENTACIÓN (carpeta docs/)
- Estado del proyecto, roadmap, known issues.
- QA: checklist, resultados, reportes, tester guide, smoke tests.
- Firebase: setup, reglas Firestore/Storage, implementación, smoke tests Firebase.
- UX: UX-MASTER, UX-WIREFRAMES, wireframes, diseño, principios.
- Rutas: ROUTES_MAP, integración, legacy.
- Datos: DATA_KEYS, localStorage, export/clear.
- Legal/ética: privacy, terms, support, ETHICAL_BOUNDARIES, AUDIT_HANDOFF.
- Refactorización/prompts: PROMPT-REFACTORIZACION, PROMPT-CLAUDE, UI-REFACTORING-PLAN.
- Otros: INTEGRATION_NOTES, RELEASE_NOTES_MVP, FEEDBACK_NOTES_TEMPLATE, BUG_FIXES.

B) MODOS Y ROLES
- Modo Investigador (lecciones, diario, progreso, perfil).
- Modo Miembro (estudio, diario, progreso, perfil).
- Modo Liderazgo (dashboard, llamamientos, calendario, miembros, responsabilidades, notas, perfil).
- Cambio de modo (Perfil > Cambiar modo).
- Journey stage (seeking vs covenanted) y su impacto en contenido.

C) MÓDULO LEADERSHIP CALLINGS (detalle)
- Dashboard, resúmenes, acciones rápidas, recordatorios suaves.
- Llamamientos: lista, filtros, nuevo llamamiento, detalle (pestañas: resumen, responsabilidades, notas, agenda, progreso).
- Miembros: lista, overview por miembro.
- Calendario: vista, eventos, conflictos.
- Hub responsabilidades, hub notas (filtros, contexto).
- Tipos: calling, responsibility, leadershipNote, callingEvent, observation.
- Stores: callings, events, notes, responsibilities, observations.
- Sync Firebase (leadershipSync), privacidad de datos.

D) RUTAS Y NAVEGACIÓN
- Rutas unificadas (/home, /lessons, /journal, /progress, /profile).
- Rutas Leadership (/member/leadership/*).
- Rutas legacy (/legacy/auth, /investigator/*, /new-member/*).
- Páginas legales (/privacy, /terms, /support).
- BottomNav por modo, Layouts (UnifiedLayout, LeadershipCallingsLayout).

E) CONTENIDO Y DATOS
- Lecciones (lessons, quiz, reflections).
- Diario (journal).
- Progreso (progress, journey).
- Datos líder (leaderMode, leaderScreensConfig, friendsInTeaching, newConverts, etc.).
- Datos missionary (leadershipMode, districtLeader, zoneLeader, assistantToPresident).
- Member types, vineyard, new convert guide.
- i18n: claves, locale (es, en, fr, pt), member.*, missionary.*, leaders.*.

F) TECNOLOGÍA Y ARQUITECTURA
- UI: design system, tokens, PageShell, Card, Button, EmptyState, TopBar, BottomNav.
- State: ModeProvider, useMode, Zustand stores, useRoleStore, useJourneyStore.
- Router: AppRouter, UnifiedRoutes, LeadershipCallingsRoutes.
- Firebase: config, auth, Firestore, Storage, reglas.
- Export/import de datos, localStorage, DATA_KEYS.

G) PENDIENTES Y ROADMAP
- Configuración Firebase (opcional para MVP).
- Dictado de voz real, export PDF, notificaciones, modo offline, sync multi-dispositivo.
- Completar módulos Investigator, Member, Missionary; integración entre módulos.

H) CUALQUIER OTRO ÁREA
- Tests, CI, despliegue, accesibilidad, performance, seguridad, privacidad.
- Onboarding, ayuda al usuario, feedback, analytics éticos.

SALIDA ESPERADA
1. Lista de topics agrupada (por dominio o por tipo, tú eliges el criterio más útil).
2. Cada topic con nombre corto y, si aplica, una línea de descripción.
3. Sección final "Topics que podrían faltar" con 3–5 sugerencias para cruzar con el proyecto.
4. Número total de topics al final.

No inventes topics que no existan en el proyecto; si no tienes acceso al código ni a los docs, indica qué categorías necesitarías revisar en el repo para no omitir nada.
```

---

## Uso

1. Copia todo el contenido entre las líneas que empiezan con ``` (incluidas).
2. Pégalo en ChatGPT o en el modelo que uses.
3. Si tienes la posibilidad, adjunta o pega después el índice de `docs/` y de `src/` (nombres de carpetas y archivos clave) para que GPT pueda afinar la lista.
4. Revisa la sección "Topics que podrían faltar" y compárala con tu proyecto para completar lo que falte.

## Ajustes opcionales

- Si quieres **solo topics de documentación**, añade: "Restringe la lista solo a topics que correspondan a documentos o secciones de documentación (docs/ y README)."
- Si quieres **solo topics de producto/funcionalidad**, añade: "Excluye temas puramente técnicos o de implementación; céntrate en funcionalidad, pantallas y flujos de usuario."
- Si quieres **formato para una base de conocimiento**, añade: "Formato cada topic como entrada de FAQ o artículo: título, 1–2 frases de descripción, y etiquetas sugeridas."
