# Checklist — Listo para Demo Pública / Beta Privada

**Módulo Investigador · xTheGospel**

Este documento es tu guía paso a paso para presentar el módulo Investigador como producto terminado ante reclutadores, socios o testers. Tiempo estimado: **1–2 horas**.

---

## 1. Screenshots "Hero" (5 capturas)

| # | Página | Archivo | Qué capturar | Resolución |
|---|--------|---------|--------------|------------|
| 1 | Home | `hero-home.png` | Hero card + escritura del día + acciones rápidas | 375×812 |
| 2 | Lessons | `hero-lessons.png` | Barra de progreso global + lista de lecciones con estados | 375×812 |
| 3 | Progress | `hero-progress.png` | Stats grid + momentos + next steps | 375×812 |
| 4 | Journal | `hero-journal.png` | Textarea expandido + entradas agrupadas (o empty state) | 375×812 |
| 5 | Profile | `hero-profile.png` | Role card + settings + contacto misionero | 375×812 |

### Pasos exactos

1. Abre la app: `npm run dev` → `http://localhost:3000`
2. Navega a modo Investigador: `/investigator/home` (o selecciona rol Investigator en auth)
3. Abre DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)
4. Selecciona **iPhone X** (375×812) o similar
5. Asegúrate de estar en **modo claro**
6. Navega a cada página y captura con:
   - **Windows**: Win+Shift+S (Snipping) o DevTools → ⋮ → Capture screenshot
   - **Mac**: Cmd+Shift+4
7. Guarda en `docs/ui-snapshots/investigator/` con los nombres de la tabla
8. **Opcional**: Repite en modo oscuro con sufijo `-dark.png` (ej. `hero-home-dark.png`)

### Checklist de capturas

- [ ] `hero-home.png`
- [ ] `hero-lessons.png`
- [ ] `hero-progress.png`
- [ ] `hero-journal.png`
- [ ] `hero-profile.png`
- [ ] (Opcional) 5 variantes `-dark.png`

---

## 2. Video del flujo (45–60 segundos)

### Guion sugerido (por segundo)

| Tiempo | Acción | Qué se ve |
|--------|--------|-----------|
| 0–5s | Intro | Logo/título + pantalla Home |
| 5–15s | Tap "Lecciones" | Lista de lecciones + barra de progreso |
| 15–25s | Tap una lección | Detalle de lección (contenido, audio si hay) |
| 25–35s | Tap "Progreso" | Stats, momentos, siguiente paso |
| 35–45s | Tap "Diario" | Formulario + entradas previas |
| 45–55s | Tap "Perfil" | Role card, settings |
| 55–60s | Outro | Volver a Home o logo |

### Herramientas recomendadas

- **OBS Studio** (gratis): Captura ventana del navegador
- **Loom** (gratis): Graba pantalla + webcam opcional
- **Windows**: Xbox Game Bar (Win+G) → Capturar
- **Mac**: QuickTime → Nueva grabación de pantalla

### Configuración

- Resolución: **375×812** (móvil) o **1440×900** (desktop)
- Sin audio o música suave de fondo
- Transiciones fluidas (no apresurarse entre taps)

### Checklist de video

- [ ] Grabado en 45–60 segundos
- [ ] Flujo: Home → Lessons → Lesson detail → Progress → Journal → Profile
- [ ] Exportado en MP4 o WebM
- [ ] Guardado en `docs/demo/` o subido a YouTube/Vimeo (unlisted)

---

## 3. README de producto

Crea o actualiza un README específico para el módulo Investigador. Ubicación sugerida: `docs/INVESTIGATOR-PRODUCT-README.md` o sección en el README principal.

### Estructura mínima

```markdown
# Módulo Investigador — xTheGospel

## Resumen UX
- [2-3 frases sobre qué hace y para quién]

## Accesibilidad
- Cumplimiento AA (contraste, roles ARIA, focus visible)
- Navegación por teclado
- Screen readers: roles en progressbar, labels en controles

## Design System
- Tokens como fuente única (cero colores hardcoded)
- Cambio de paleta vía `--accent`, `--primary-rgb`
- Smoke test: `--accent: hotpink` cambia toda la UI

## Dark mode
- Contraste real (no grises planos)
- Escala accent invertida para legibilidad AA

## Responsive
- 320px sin romper
- Grid adaptativo 2→4 columnas
- Hero sin alturas fijas
- overflow-wrap en texto de usuario

## Capturas
- [Enlace o referencia a docs/ui-snapshots/investigator/]

## Demo
- [Link si aplica]
```

### Checklist de README

- [ ] Sección UX
- [ ] Sección Accesibilidad
- [ ] Sección Design System / Tokens
- [ ] Sección Dark mode
- [ ] Sección Responsive
- [ ] Referencia a capturas
- [ ] Link de demo (si existe)

---

## 4. Link de demo — Firebase Hosting

Usamos **Firebase Hosting** para el deploy. Ver guía completa en `DEPLOY-FIREBASE.md`.

### Pasos rápidos

1. **Primera vez** (solo una vez por proyecto):
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   ```
   - Public directory: `dist`
   - Single-page app: `y`

2. **Build y deploy**:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```
   La CLI mostrará: `Hosting URL: https://tu-project-id.web.app`

3. **Previsualizar staging** (opcional):
   ```bash
   firebase hosting:channel:deploy staging
   ```
   URL temporal: `https://staging--tu-project-id.web.app`

### Checklist de demo

- [ ] Build sin errores (`npm run build`)
- [ ] URL pública funcionando
- [ ] Modo Investigador accesible (auth o ruta directa `/investigator/home`)
- [ ] Link añadido en `INVESTIGATOR-PRODUCT-README.md`

---

## 5. Resumen final — Material listo

Cuando completes este checklist tendrás:

| Material | Uso |
|----------|-----|
| 5 screenshots hero | Portafolio, presentaciones, documentación |
| Video 45–60s | Demo en vivo, LinkedIn, pitch |
| README de producto | Contexto técnico y UX para evaluadores |
| Link de demo | Pruebas remotas, reclutadores, socios |

---

## Historial

| Fecha | Versión | Notas |
|-------|---------|-------|
| 2026-02-13 | 1.0 | Checklist inicial post-auditoría Sprint 10 |
