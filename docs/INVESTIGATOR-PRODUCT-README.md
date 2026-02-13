# Módulo Investigador — xTheGospel

> Guía a los investigadores a través de lecciones del evangelio, progreso visual y diario espiritual hacia el bautismo y la conversión.

---

## Resumen UX

El módulo Investigador es el corazón de xTheGospel. Ofrece:

- **Home**: Escritura del día, acciones rápidas y acceso a lecciones
- **Lecciones**: Progreso visual por lección, contenido estructurado y audio
- **Progreso**: Stats, momentos clave y siguiente paso sugerido
- **Diario**: Registro de reflexiones y experiencias espirituales
- **Perfil**: Rol, configuración y contacto con misioneros

Diseñado para usarse en móvil (320px+) y desktop, con navegación por tabs inferior.

---

## Accesibilidad

- **Contraste AA**: Todos los textos cumplen WCAG 2.1 AA
- **Roles ARIA**: `role="progressbar"`, `aria-label` en controles, `aria-hidden` en decorativos
- **Focus visible**: Estados de foco claros en botones y enlaces
- **Navegación por teclado**: Tab order lógico, sin trampas de foco
- **Screen readers**: Labels en badges, títulos descriptivos en secciones

---

## Design System

- **Tokens como fuente única**: Cero colores hardcoded (`#hex`) en el módulo
- **Variables CSS**: `--color-accent-*`, `--background-*`, `--border-*`, `--primary-rgb`, `--accent-rgb`
- **Cambio de paleta**: Editar tokens en `tokens.ts` o probar con `--accent: hotpink` en `:root`
- **Smoke test**: Cambiar `--accent` cambia toda la UI de forma coherente

---

## Dark mode

- **Contraste real**: Escala accent invertida para legibilidad AA en fondo oscuro
- **Sin grises planos**: Fondos y bordes derivados de tokens
- **Toggle**: Disponible en perfil o preferencias del sistema

---

## Responsive

- **320px**: Sin roturas, grid adaptativo 2→4 columnas
- **Hero**: Sin alturas fijas, se adapta al contenido
- **Progress**: Legible en anchos mínimos
- **Texto de usuario**: `overflow-wrap: break-word` para evitar desbordes
- **Layout**: `overflow-x: hidden` para evitar scroll horizontal

---

## Capturas de referencia

Ver `docs/ui-snapshots/investigator/` para:

- Páginas documentadas: Home, Lessons, Progress, Journal, Profile
- Resoluciones: 375×812 (móvil), 768×1024 (tablet), 1440×900 (desktop)
- Historial de versiones para evitar regresiones visuales

---

## Demo

- **Local**: `npm run dev` → `http://localhost:3000` → modo Investigador
- **Ruta directa**: `/investigator/home`
- **Producción**: [Añadir link tras `firebase deploy --only hosting` — ver `DEPLOY-FIREBASE.md`]

---

## Stack técnico (módulo)

- React 18 + TypeScript
- Vite
- Zustand (estado local)
- CSS con design tokens
- i18n (ES, EN, FR, PT)

---

## What I'd improve next

- **Onboarding en 3 pasos**: Guiar al usuario en su primera visita (qué hacer hoy, dónde ver progreso, cómo registrar reflexiones)
- **Métricas de retención**: Racha, frecuencia de uso, siguiente paso sugerido basado en comportamiento
- **Test E2E de accesibilidad**: Automatizar verificación de contraste, navegación por teclado y roles ARIA con axe-core o similar
