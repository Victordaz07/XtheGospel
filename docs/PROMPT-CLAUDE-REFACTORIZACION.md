# 🎨 PROMPT PARA CLAUDE: Refactorización Completa del Sistema UI

Copia y pega este prompt completo en Claude:

---

## TAREA: Refactorización Completa del Sistema de Diseño UI

Eres un experto en React, TypeScript y Design Systems. Tu tarea es refactorizar COMPLETAMENTE el sistema de UI de esta aplicación React para crear un Design System unificado, escalable y profesional.

### CONTEXTO

Aplicación: **xTheGospel** - React 18 + TypeScript + CSS Variables + Vite
Problema: Múltiples sistemas de tokens duplicados, componentes inconsistentes, estilos hardcodeados.

### SISTEMA BASE (YA EXISTE - ÚSALO)

**Tokens TypeScript:** `src/ui/design-system/tokens.ts` - ÚNICA fuente de verdad
**Variables CSS:** `src/styles/design-system.css` - Generadas desde tokens
**Formato variables:** `--color-primary-default`, `--spacing-4`, `--radius-lg`, `--shadow-md`

### TAREAS ESPECÍFICAS

#### FASE 1: Crear Componentes Primitivos Base

Crear en `src/ui/components/primitives/`:

- `Box.tsx` - Contenedor base con props: padding, margin, width, height, bg, border, radius, shadow
- `Flex.tsx` - Layout flexbox: direction, align, justify, gap, wrap
- `Grid.tsx` - Layout grid: cols, gap, align, justify
- `Stack.tsx` - Stack vertical/horizontal con spacing
- `Text.tsx` - Texto con variantes: variant, size, weight, color
- `Heading.tsx` - Títulos h1-h6: as, size, weight, color
- `Container.tsx` - Contenedor con max-width y padding

**REQUISITOS:**

- ✅ Usar SOLO tokens de `designTokens` (importar de `src/ui/design-system`)
- ✅ Usar SOLO variables CSS de `design-system.css` (formato `var(--color-primary-default)`)
- ✅ Tipado completo TypeScript
- ✅ CSS usando variables CSS, NO valores hardcodeados
- ✅ Documentación JSDoc

#### FASE 2: Refactorizar Componentes Layout

Refactorizar en `src/ui/components/Layout/`:

- `Card.tsx` - Usar Box como base, variables CSS, mantener variantes
- `PageContainer.tsx` - Usar Container primitivo
- `Section.tsx` - Usar Stack primitivo
- `SectionTitle.tsx` - Usar Heading primitivo
- `TwoColumnLayout.tsx` - Usar Grid primitivo

**REQUISITOS:**

- ✅ Eliminar valores hardcodeados (#4F46E5, 16px, etc.)
- ✅ Usar variables CSS exclusivamente
- ✅ Mantener APIs existentes (compatibilidad)
- ✅ Usar componentes primitivos cuando sea posible

#### FASE 3: Refactorizar Componentes Controls

Refactorizar en `src/ui/components/Controls/`:

- Crear `Button.tsx` unificado con variantes: primary, secondary, tertiary, ghost, danger
- Refactorizar `ButtonPrimary.tsx` para usar Button
- Refactorizar `ButtonSecondary.tsx` para usar Button
- Refactorizar `IconButton.tsx` para usar Button

**REQUISITOS:**

- ✅ Unificar en componente Button base
- ✅ Variantes y tamaños consistentes
- ✅ Estados: default, hover, active, disabled, loading
- ✅ Variables CSS del design system

#### FASE 4: Refactorizar Componentes Feedback

Refactorizar en `src/ui/components/Feedback/`:

- `ProgressBar.tsx` - Variables CSS, colores semánticos
- `EmptyState.tsx` - Usar Stack y Text primitivos
- `LevelCard.tsx` - Usar Card como base
- `StatPill.tsx` - Usar Box y Text primitivos

#### FASE 5: Refactorizar Componentes Content

Refactorizar en `src/ui/components/Content/`:

- `LessonCard.tsx` - Usar Card como base
- `ActivityCard.tsx` - Usar Card como base
- `CommitCard.tsx` - Usar Card como base
- `PersonCard.tsx` - Usar Card como base
- `DevotionalCard.tsx` - Usar Card como base

#### FASE 6: Refactorizar Componentes Navigation

Refactorizar en `src/ui/components/Navigation/`:

- `TopBar.tsx` - Usar Flex primitivo
- `BottomNav.tsx` - Variables CSS
- `FloatingMenu.tsx` - Variables CSS
- `TabBar.tsx` - Variables CSS
- `RoleBadge.tsx` - Usar Box y Text primitivos

#### FASE 7: Limpieza

- ❌ ELIMINAR `src/constants/theme.ts` completamente
- ⚠️ Buscar y reemplazar TODOS los imports de `src/constants/theme.ts` → `src/ui/design-system`
- ⚠️ Buscar y reemplazar TODOS los imports de `src/ui/theme/` → `src/ui/design-system`
- ✅ Actualizar `src/ui/components/index.ts` con todos los nuevos exports

#### FASE 8: Documentación

Crear:

- `src/ui/DESIGN-SYSTEM.md` - Guía completa del sistema de tokens
- `src/ui/COMPONENT-GUIDE.md` - Guía de uso de componentes
- `src/ui/MIGRATION-GUIDE.md` - Guía de migración

### REGLAS ESTRICTAS

✅ **DEBES:**

1. Usar EXCLUSIVAMENTE `src/ui/design-system/tokens.ts` para tokens
2. Usar EXCLUSIVAMENTE variables CSS de `design-system.css`
3. NO crear valores hardcodeados (#4F46E5, 16px, etc.)
4. Mantener compatibilidad hacia atrás (APIs existentes)
5. Tipar todo con TypeScript
6. Documentar con JSDoc

❌ **NO DEBES:**

1. Crear nuevos archivos de tokens
2. Usar valores hardcodeados
3. Duplicar estilos
4. Romper APIs existentes
5. Eliminar archivos sin verificar imports

### EJEMPLO DE CÓDIGO CORRECTO

```typescript
// ✅ CORRECTO - Usa variables CSS del design system
import { Box } from '../primitives/Box';

export const Card: React.FC<CardProps> = ({ children, variant = 'default' }) => {
  return (
    <Box
      className="ui-card"
      style={{
        backgroundColor: 'var(--color-background-card)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        padding: 'var(--spacing-4)',
      }}
    >
      {children}
    </Box>
  );
};
```

```typescript
// ❌ INCORRECTO - Valores hardcodeados
export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',  // ❌ Hardcodeado
      borderRadius: '16px',        // ❌ Hardcodeado
      padding: '16px',            // ❌ Hardcodeado
    }}>
      {children}
    </div>
  );
};
```

### PROCESO DE EJECUCIÓN

1. **Leer primero:** `src/ui/design-system/tokens.ts` y `src/styles/design-system.css`
2. **Crear primitivos:** Box, Flex, Grid, Stack, Text, Heading, Container
3. **Refactorizar por categoría:** Layout → Controls → Feedback → Content → Navigation
4. **Limpieza:** Eliminar duplicados, actualizar imports
5. **Documentación:** Crear guías completas
6. **Verificación:** Asegurar que todo compila y funciona

### CRITERIOS DE ÉXITO

- ✅ 0 duplicaciones de tokens
- ✅ 100% componentes usando design system
- ✅ 0 valores hardcodeados
- ✅ Compatibilidad mantenida
- ✅ Documentación completa
- ✅ Tipado completo

### INSTRUCCIONES FINALES

Trabaja sistemáticamente, una fase a la vez. Verifica que cada componente funciona después de refactorizar. Mantén compatibilidad hacia atrás. Usa el sistema de tokens exclusivamente. Sé consistente en todos los componentes.

**EMPIEZA AHORA:** Comienza con FASE 1 (Componentes Primitivos) y trabaja secuencialmente.

---

**IMPORTANTE:** Este es un refactor COMPLETO. Debes refactorizar TODOS los componentes mencionados, crear TODOS los primitivos, eliminar TODAS las duplicaciones, y crear TODA la documentación. No dejes nada sin hacer.
