# UI Snapshots - Modulo Investigador

## Proposito

Capturas de referencia para evitar regresiones visuales en refactors futuros.
Tambien sirven como documentacion de producto para demos y portafolio.

## Paginas a capturar

| Pagina   | Archivo         | Estado esperado                              |
| -------- | --------------- | -------------------------------------------- |
| Home     | `home.png`      | Hero card + escritura del dia + acciones     |
| Lessons  | `lessons.png`   | Barra de progreso + lista con estados        |
| Progress | `progress.png`  | Stats grid + momentos + next steps           |
| Journal  | `journal.png`   | Textarea expandido + entradas agrupadas      |
| Profile  | `profile.png`   | Role card + settings + contacto misionero    |

## Como actualizar

1. Abre la app en el navegador (modo claro)
2. Navega a cada pagina
3. Captura con DevTools (375x812 - iPhone X) o similar
4. Guarda en este directorio con el nombre correspondiente
5. Opcional: repetir en modo oscuro con sufijo `-dark.png`

## Resolucion recomendada

- **Movil**: 375 x 812 (iPhone X)
- **Tablet**: 768 x 1024 (iPad)
- **Desktop**: 1440 x 900

## Historial

| Fecha      | Version | Notas                                                      |
| ---------- | ------- | ---------------------------------------------------------- |
| 2026-02-13 | Sprint 10 | Migracion completa a design-system tokens + a11y AA    |

## Design System verificado

- Todos los colores via `--color-accent-*`, `--background-*`, `--border-*`
- Cero colores hardcoded en CSS del modulo
- Dark mode: escala accent invertida para contraste AA
- Transiciones: solo `transform`, `opacity`, `box-shadow`, `background`, `border-color`
- Accesibilidad: `role="progressbar"`, `aria-label`, `aria-hidden`, `title` en badges
