# Desglose completo: sistema de lecciones del investigador

Documento para consultar con GPT (u otro modelo) y mejorar el flujo. Hoy el sistema es **muy simple** a propósito (MVP); aquí se describe cómo funciona de punta a punta para que se pueda enriquecer sin romper nada.

---

## 1. Propósito y alcance

- **Qué es:** La pestaña "Lecciones" (o "Topics") para usuarios en etapa **investigador** (seeking): listado de temas y detalle de cada tema con secciones, escritura destacada y reflexión guardada en diario.
- **Qué no es (aún):** Sin progreso visible en la lista, sin gamificación, sin audio real (solo botón simulado), sin i18n en los textos de lecciones, sin orden sugerido ni prerequisitos.
- **Principio de diseño:** Tono pastoral, sin plazos ni métricas; el usuario explora a su ritmo.

---

## 2. Flujo de rutas (de URL a pantalla)

```
AppRouter (path="/lessons/*")
    → UnifiedRoutes (lee location.pathname)
        → Si path === "/lessons"           → LessonsEntryPage
        → Si path === "/lessons/:id"      → LessonDetailEntryPage (con key=lessonId)

LessonsEntryPage (entry)
    → useJourneyStage()
    → Si stage === 'covenanted'  → NewMemberGuidePage (otro flujo, no investigador)
    → Si stage === 'seeking'    → InvestigatorLessonsPage

LessonDetailEntryPage (entry)
    → useJourneyStage()
    → Si stage === 'covenanted'  → NewMemberGuideDetailPage
    → Si stage === 'seeking'    → InvestigatorLessonDetailPage
```

- **Importante:** En `UnifiedRoutes` **no** hay `<Route path=":lessonId">`; la ruta padre es `/lessons/*`. Por eso en `InvestigatorLessonDetailPage` el `lessonId` se obtiene de:
  1. `params.lessonId` (por si en el futuro se añade ruta anidada),
  2. `params['*']` (splat),
  3. o parseando `location.pathname` (ej. `/lessons/jesus-christ` → `jesus-christ`).

---

## 3. Capa de datos

### 3.1 Lecciones

**Archivo:** `src/modules/investigator/data/lessons.ts`

- **Tipos:**
  - `Lesson`: id, title, subtitle, description, icon (emoji), estimatedMinutes, sections[], reflectionPrompt.
  - `LessonSection`: id, title, content, hasAudio?, scriptureRef?.
  - `LessonStatus`: 'not_started' | 'exploring' | 'completed' (usado en store, no se muestra en UI actual).

- **Contenido actual:** Array `lessons` con 4 temas en inglés:
  - `jesus-christ` — Jesus Christ / Our Savior and Redeemer
  - `plan-of-salvation` — Plan of Salvation / God's Plan for You
  - `restoration` — The Restoration / Truth Restored
  - `commandments` — Living the Gospel / Commandments and Blessings

- **API:**
  - `getLessonById(id: string): Lesson | undefined`
  - `getStatusLabel(status)`, `getStatusColor(status)` (para futuro uso de progreso).

- **IDs:** Son slugs (ej. `jesus-christ`). Las URLs son `/lessons/jesus-christ`, etc.

### 3.2 Escrituras

**Archivo:** `src/modules/investigator/data/scriptures.ts`

- **Tipo:** `Scripture`: id, reference, text, context?.
- **Uso en detalle:** En la página de detalle de lección se muestra **una sola** escritura fija: `getLessonDetailScripture()` devuelve siempre John 3:16 (o la primera disponible). No hay relación lección ↔ escritura (no hay “escritura por lección”).
- **Otras funciones:** getDailyScripture(), getHomeScripture(), getScriptureById(), getScriptureByReference().

---

## 4. Páginas y componentes

### 4.1 Lista de temas (Topics)

**Página:** `InvestigatorLessonsPage.tsx`  
**Ruta efectiva:** `/lessons` (con stage seeking).

- Importa `lessons` desde `../data/lessons`.
- Renderiza:
  - Header: título "Topics", subtítulo "Explore the gospel at your own pace".
  - Intro: texto corto (sin orden ni plazo).
  - Lista: `lessons.map(lesson => <LessonListCard lesson={lesson} />)`.

**Componente:** `LessonListCard.tsx`

- Recibe `lesson: Lesson`.
- Enlace: `<Link to={`/lessons/${lesson.id}`}>`.
- Muestra: icon (emoji), title, subtitle, flecha.

- No muestra: progreso, tiempo estimado, descripción larga, estado (not_started/exploring/completed).

### 4.2 Detalle de un tema

**Página:** `InvestigatorLessonDetailPage.tsx`  
**Ruta efectiva:** `/lessons/:lessonId` (ej. `/lessons/jesus-christ`).

- **Obtención de lessonId:** `useParams()` + `useLocation()` (splat o parse del path), ver sección 2.
- **Datos:** `lesson = getLessonById(lessonId)`, `scripture = getLessonDetailScripture()` (siempre la misma).
- Si `!lesson` → pantalla "Topic Not Found" con enlace "Back to Topics" → `/lessons`.

**Estructura cuando hay lesson:**

1. **Botón atrás:** Link "Back to Topics" → `/lessons`.
2. **Header:** icon (emoji), title, subtitle.
3. **Secciones:** `lesson.sections.map` → por cada sección:
   - title, content (párrafo),
   - si `section.hasAudio` → `<AudioPlayer label={...} />`,
   - si `section.scriptureRef` → texto "📖 {scriptureRef}" (solo referencia, no componente ScriptureCard).
4. **Featured Scripture:** bloque con "Featured Scripture" y `<ScriptureCard scripture={scripture} />` (siempre la misma escritura).
5. **Reflexión:**
   - Título "Reflection", `lesson.reflectionPrompt`,
   - textarea, botón "Save to Journal",
   - al guardar: `addJournalEntry({ type: 'text', content, lessonId })`, `markSavedToJournal()`, mensaje "Saved to Journal ✓".
6. **Footer:** texto "Take your time. Return whenever you'd like."

**Componentes usados:**

- **AudioPlayer:** Botón play/pause y barra de progreso **simulada** (no reproduce audio real). Props: label, duration (por defecto "2:30").
- **ScriptureCard:** Muestra scripture.text, reference, context. Solo lectura.

---

## 5. Estado (stores)

### 5.1 useInvestigatorStore (Zustand + persist en localStorage)

**Archivo:** `src/modules/investigator/store/useInvestigatorStore.ts`  
**Clave persist:** `investigator-storage`.

- **lessonStatuses:** Record<lessonId, LessonStatus> — no se actualiza desde la UI actual (no hay “marcar como completado” en pantalla).
- **lastLessonId:** string | null — se actualiza en detalle al montar/effect cuando hay `lesson`; sirve para "Continue exploring" en Home.
- **journalEntries:** array de entradas (id, type, content, createdAt, lessonId); se añaden al guardar reflexión.
- **milestones:** first_lesson_started, first_journal_entry, week_of_learning; se desbloquean por uso (no se muestran en el flujo de lecciones actualmente).

Acciones usadas en lecciones: `setLastLessonId`, `addJournalEntry`.

### 5.2 useSpiritualMemoryStore

**Uso en detalle:** `markSavedToJournal()` al guardar reflexión. No se usa para listar ni para mostrar progreso de lecciones.

### 5.3 useJourneyStore

**Archivo:** `src/core/journey/useJourneyStore.ts`.

- **useJourneyStage():** 'seeking' | 'covenanted' | 'member'.
- **Lógica:** Si hay `ordinanceDates.confirmationDate` → 'covenanted'; si no → 'seeking'.
- **Efecto en lecciones:** Con 'seeking' se muestran InvestigatorLessonsPage e InvestigatorLessonDetailPage; con 'covenanted' se muestran NewMemberGuidePage y NewMemberGuideDetailPage (contenido distinto, no cubierto en este doc).

---

## 6. Inicio (Home) y enlaces a lecciones

**Página:** `InvestigatorHomePage.tsx`

- Lee `lastLessonId` del store; si existe, `currentLesson = getLessonById(lastLessonId)`, si no, primera lección.
- "Continue exploring" / "Start your journey" → Link a `/lessons/${currentLesson.id}`.
- "More to explore" → hasta 2 lecciones más (excluyendo la actual) con Link a `/lessons/${lesson.id}`.

Todos los enlaces a detalle son `/lessons/${lesson.id}` (slug).

---

## 7. Qué está “simple” o faltante (para mejorar con GPT)

- **Textos:** Solo inglés; nada de i18n en títulos, secciones, reflexión ni escrituras.
- **Progreso en lista:** lessonStatuses existe pero no se pinta en InvestigatorLessonsPage (no “completado”, “en progreso”, etc.).
- **Audio:** hasAudio y AudioPlayer son simulación; no hay archivos ni streaming real.
- **Escrituras:** Una sola escritura fija en detalle; no hay mapeo lección → escrituras ni uso de `section.scriptureRef` con ScriptureCard.
- **Orden / sugerencia:** Lista en orden del array; no hay “siguiente tema recomendado” ni prerequisitos.
- **Reflexión:** Solo texto; no voz ni plantillas; se guarda en journal sin edición posterior desde esta pantalla.
- **UX detalle:** Sin tiempo estimado visible, sin indicador de sección actual, sin navegación entre secciones (prev/next).
- **Accesibilidad / SEO:** Sin meta por lección, sin estructura de headings más clara para lectores de pantalla.
- **Datos:** Contenido fijo en código; no hay CMS ni carga remota; agregar temas = editar `lessons.ts`.

---

## 8. Mapa de archivos relevante

```
src/
├── router/
│   └── UnifiedRoutes.tsx              # Decide LessonsEntryPage vs LessonDetailEntryPage por path
├── pages/
│   └── entry/
│       ├── LessonsEntryPage.tsx       # Stage → InvestigatorLessonsPage | NewMemberGuidePage
│       └── LessonDetailEntryPage.tsx  # Stage → InvestigatorLessonDetailPage | NewMemberGuideDetailPage
├── modules/
│   └── investigator/
│       ├── data/
│       │   ├── lessons.ts             # Array lessons, getLessonById, tipos Lesson / LessonSection
│       │   └── scriptures.ts          # Array scriptures, getLessonDetailScripture, etc.
│       ├── store/
│       │   └── useInvestigatorStore.ts
│       ├── pages/
│       │   ├── InvestigatorLessonsPage.tsx      # Lista de topics
│       │   ├── InvestigatorLessonDetailPage.tsx # Detalle + reflexión + not found
│       │   └── InvestigatorHomePage.tsx         # Continue / More to explore
│       └── components/
│           ├── LessonListCard.tsx
│           ├── AudioPlayer.tsx
│           └── ScriptureCard.tsx
└── core/
    ├── journey/
    │   └── useJourneyStore.ts          # useJourneyStage()
    └── memory/
        └── useSpiritualMemoryStore.ts  # markSavedToJournal()
```

---

## 9. Cómo usar este doc con GPT

Copia el siguiente bloque y pégalo en GPT junto con este documento (o con las secciones que te interesen):

```
Contexto: Tengo una app (React + TypeScript) con un sistema de "lecciones del investigador"
descrito en el documento INVESTIGATOR_LESSONS_SYSTEM.md que te adjunto.

El flujo actual es muy simple: lista de 4 temas en inglés, detalle con secciones,
una escritura fija, reflexión que se guarda en diario, y audio simulado.

Necesito que me propongas mejoras concretas (priorizadas) en:

1. Contenido y datos: más temas, i18n, escrituras por lección, posible orden o prerequisitos.
2. UX: progreso visible en la lista, tiempo estimado, navegación entre secciones,
   "siguiente tema" recomendado, mejor empty/error state.
3. Reflexión: plantillas opcionales, o cómo enlazar mejor con el diario.
4. Audio: opciones para integrar audio real (sin romper el MVP).
5. Arquitectura: si conviene separar datos (JSON/remote) del código, o mantener todo en lessons.ts.

Indica para cada propuesta: archivos a tocar, cambios de tipos/interfaces si aplica,
y qué mantener igual para no romper el flujo actual (rutas, stage seeking/covenanted,
guardado de reflexión en useInvestigatorStore).
```

Con eso GPT puede sugerir mejoras alineadas con la arquitectura real y sin asumir cosas que no existen.
