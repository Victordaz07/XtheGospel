# 🎨 PROMPT: Refactorización Completa del Sistema UI

## CONTEXTO DEL PROYECTO

Estás trabajando en **xTheGospel**, una aplicación web React + TypeScript para misioneros, investigadores y miembros de la Iglesia. La aplicación tiene múltiples roles (investigator, missionary, member, leader) y necesita un sistema de diseño completamente unificado y profesional.

**Stack Tecnológico:**

- React 18 + TypeScript
- React Router para navegación
- CSS Modules + CSS Variables
- Vite como build tool

## ESTADO ACTUAL DEL SISTEMA (PROBLEMAS)

### 1. **Múltiples Sistemas de Tokens Duplicados**

- `src/ui/theme/` - Tokens TypeScript antiguos
- `src/styles/global.css` - Variables CSS manuales
- `src/constants/theme.ts` - Otro objeto theme duplicado
- `app-misional-theme.css` - Sistema separado con prefijo `--am-`
- Variables CSS inconsistentes (`--color-primary` vs `--am-color-primary`)

### 2. **Componentes con Estilos Inconsistentes**

- Algunos componentes usan tokens TypeScript en `style` props
- Otros usan variables CSS directamente
- Mezcla de CSS modules y archivos CSS separados
- Estilos duplicados en múltiples lugares
- No hay componentes primitivos base (Box, Flex, Text, etc.)

### 3. **Estructura Desorganizada**

- Componentes UI mezclados sin categorización clara
- Falta de componentes base reutilizables
- No hay sistema de variantes consistente
- Documentación incompleta

### 4. **Archivos a Revisar**

```
src/
├── ui/
│   ├── theme/              # Tokens antiguos (MANTENER SOLO COMO REFERENCIA)
│   ├── components/         # Componentes existentes (REFACTORIZAR)
│   └── design-system/     # Nuevo sistema (YA CREADO - USAR COMO BASE)
├── styles/
│   ├── global.css         # Ya actualizado para usar design-system.css
│   └── design-system.css  # Variables CSS generadas (YA CREADO)
└── constants/
    └── theme.ts           # ELIMINAR (duplicado)
```

## OBJETIVO DE LA REFACTORIZACIÓN

Crear un **Design System completamente unificado, escalable y mantenible** que:

1. ✅ Use **ÚNICAMENTE** `src/ui/design-system/tokens.ts` como fuente de verdad
2. ✅ Genere automáticamente todas las variables CSS desde los tokens
3. ✅ Proporcione componentes primitivos base (Box, Flex, Text, etc.)
4. ✅ Refactorice TODOS los componentes existentes para usar el nuevo sistema
5. ✅ Elimine TODAS las duplicaciones
6. ✅ Mantenga compatibilidad hacia atrás durante la migración
7. ✅ Documente todo el sistema

## SISTEMA DE TOKENS BASE (YA CREADO)

El sistema base ya existe en `src/ui/design-system/tokens.ts`. **DEBES USAR ESTE SISTEMA EXCLUSIVAMENTE**.

**Estructura de tokens:**

```typescript
designTokens = {
  colors: { primary, secondary, accent, neutral, semantic, background, text, border },
  typography: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing },
  spacing: { 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24 },
  radius: { none, sm, md, lg, xl, 2xl, 3xl, full },
  shadows: { none, xs, sm, md, lg, xl, 2xl, inner },
  transitions: { fast, base, slow, slower },
  zIndex: { base, dropdown, sticky, fixed, modalBackdrop, modal, popover, tooltip },
  breakpoints: { xs, sm, md, lg, xl, 2xl }
}
```

**Variables CSS generadas:**

- Todas las variables están en `src/styles/design-system.css`
- Formato: `--color-primary-default`, `--spacing-4`, `--radius-lg`, etc.
- Aliases legacy disponibles para compatibilidad

## TAREAS ESPECÍFICAS A REALIZAR

### FASE 1: Crear Componentes Primitivos Base

Crear componentes fundamentales en `src/ui/components/primitives/`:

#### 1.1 Box Component

```typescript
// src/ui/components/primitives/Box.tsx
// Componente base para contenedores
// Props: padding, margin, width, height, bg, border, radius, shadow
// Debe usar tokens del design system exclusivamente
```

#### 1.2 Flex Component

```typescript
// src/ui/components/primitives/Flex.tsx
// Layout flexbox con props: direction, align, justify, gap, wrap
// Usar spacing tokens para gap
```

#### 1.3 Grid Component

```typescript
// src/ui/components/primitives/Grid.tsx
// Layout grid con props: cols, gap, align, justify
// Usar spacing tokens
```

#### 1.4 Stack Component

```typescript
// src/ui/components/primitives/Stack.tsx
// Stack vertical/horizontal con spacing consistente
// Props: direction, spacing, align
```

#### 1.5 Text Component

```typescript
// src/ui/components/primitives/Text.tsx
// Componente de texto con variantes
// Props: variant (body, caption, label), size, weight, color
// Usar typography tokens
```

#### 1.6 Heading Component

```typescript
// src/ui/components/primitives/Heading.tsx
// Títulos h1-h6 con estilos consistentes
// Props: as (h1-h6), size, weight, color
```

#### 1.7 Container Component

```typescript
// src/ui/components/primitives/Container.tsx
// Contenedor con max-width y padding
// Props: maxWidth, padding, center
```

**REQUISITOS para todos los componentes primitivos:**

- ✅ Usar SOLO tokens de `designTokens`
- ✅ Tipado completo con TypeScript
- ✅ Props con valores por defecto sensatos
- ✅ Soporte para `className` y `style` para casos especiales
- ✅ CSS usando variables CSS del design system
- ✅ Documentación JSDoc completa

### FASE 2: Refactorizar Componentes Layout Existentes

Refactorizar componentes en `src/ui/components/Layout/`:

#### 2.1 Card Component

**Archivo:** `src/ui/components/Layout/Card.tsx` y `Card.css`

**Cambios requeridos:**

- Eliminar estilos hardcodeados
- Usar variables CSS del design system exclusivamente
- Usar componente `Box` como base si es posible
- Mantener variantes: default, elevated, outlined, gradient
- Usar `--shadow-sm`, `--shadow-md` para sombras
- Usar `--radius-lg` para border-radius
- Usar `--spacing-*` para padding

#### 2.2 PageContainer Component

**Archivo:** `src/ui/components/Layout/PageContainer.tsx` y `PageContainer.css`

**Cambios requeridos:**

- Usar `Container` primitivo como base
- Variables CSS del design system
- Padding consistente con spacing tokens

#### 2.3 Section Component

**Archivo:** `src/ui/components/Layout/Section.tsx` y `Section.css`

**Cambios requeridos:**

- Usar `Stack` primitivo para layout
- Variables CSS del design system
- Spacing consistente

#### 2.4 SectionTitle Component

**Archivo:** `src/ui/components/Layout/SectionTitle.tsx` y `SectionTitle.css`

**Cambios requeridos:**

- Usar `Heading` primitivo como base
- Variables CSS del design system

#### 2.5 TwoColumnLayout Component

**Archivo:** `src/ui/components/Layout/TwoColumnLayout.tsx` y `TwoColumnLayout.css`

**Cambios requeridos:**

- Usar `Grid` primitivo como base
- Variables CSS del design system

### FASE 3: Refactorizar Componentes Controls

Refactorizar componentes en `src/ui/components/Controls/`:

#### 3.1 Button Component (Unificar ButtonPrimary y ButtonSecondary)

**Archivos:**

- `src/ui/components/Controls/Button.tsx` (nuevo, unificado)
- `src/ui/components/Controls/ButtonPrimary.tsx` (refactorizar para usar Button)
- `src/ui/components/Controls/ButtonSecondary.tsx` (refactorizar para usar Button)

**Cambios requeridos:**

- Crear componente `Button` base con variantes
- Variantes: primary, secondary, tertiary, ghost, danger
- Tamaños: sm, md, lg
- Estados: default, hover, active, disabled, loading
- Usar tokens de color, spacing, radius, shadows
- Iconos opcionales (left/right)
- Full width opcional

#### 3.2 IconButton Component

**Archivo:** `src/ui/components/Controls/IconButton.tsx` y `IconButton.css`

**Cambios requeridos:**

- Usar `Button` como base
- Variantes de tamaño
- Variables CSS del design system

### FASE 4: Refactorizar Componentes Feedback

Refactorizar componentes en `src/ui/components/Feedback/`:

#### 4.1 ProgressBar Component

**Archivo:** `src/ui/components/Feedback/ProgressBar.tsx` y `ProgressBar.css`

**Cambios requeridos:**

- Variables CSS del design system
- Colores semánticos (success, warning, error, info)
- Alturas consistentes con spacing tokens

#### 4.2 EmptyState Component

**Archivo:** `src/ui/components/Feedback/EmptyState.tsx` y `EmptyState.css`

**Cambios requeridos:**

- Usar `Stack` y `Text` primitivos
- Variables CSS del design system
- Spacing consistente

#### 4.3 LevelCard Component

**Archivo:** `src/ui/components/Feedback/LevelCard.tsx` y `LevelCard.css`

**Cambios requeridos:**

- Usar `Card` como base
- Variables CSS del design system

#### 4.4 StatPill Component

**Archivo:** `src/ui/components/Feedback/StatPill.tsx` y `StatPill.css`

**Cambios requeridos:**

- Usar `Box` y `Text` primitivos
- Variables CSS del design system

### FASE 5: Refactorizar Componentes Content

Refactorizar componentes en `src/ui/components/Content/`:

#### 5.1 LessonCard Component

**Archivo:** `src/ui/components/Content/LessonCard.tsx` y `LessonCard.css`

**Cambios requeridos:**

- Usar `Card` como base
- Variables CSS del design system
- Spacing consistente

#### 5.2 ActivityCard Component

**Archivo:** `src/ui/components/Content/ActivityCard.tsx` y `ActivityCard.css`

**Cambios requeridos:**

- Usar `Card` como base
- Variables CSS del design system

#### 5.3 CommitCard Component

**Archivo:** `src/ui/components/Content/CommitCard.tsx` y `CommitCard.css`

**Cambios requeridos:**

- Usar `Card` como base
- Variables CSS del design system

#### 5.4 PersonCard Component

**Archivo:** `src/ui/components/Content/PersonCard.tsx` y `PersonCard.css`

**Cambios requeridos:**

- Usar `Card` como base
- Variables CSS del design system

#### 5.5 DevotionalCard Component

**Archivo:** `src/ui/components/Content/DevotionalCard.tsx` y `DevotionalCard.css`

**Cambios requeridos:**

- Usar `Card` como base
- Variables CSS del design system

### FASE 6: Refactorizar Componentes Navigation

Refactorizar componentes en `src/ui/components/Navigation/`:

#### 6.1 TopBar Component

**Archivo:** `src/ui/components/Navigation/TopBar.tsx` y `TopBar.css`

**Cambios requeridos:**

- Usar `Flex` primitivo para layout
- Variables CSS del design system
- Spacing y padding consistentes

#### 6.2 BottomNav Component

**Archivo:** `src/ui/components/Navigation/BottomNav.tsx` y `BottomNav.css`

**Cambios requeridos:**

- Variables CSS del design system
- Colores y estados consistentes

#### 6.3 FloatingMenu Component

**Archivo:** `src/ui/components/Navigation/FloatingMenu.tsx` y `FloatingMenu.css`

**Cambios requeridos:**

- Variables CSS del design system
- Shadows y radius consistentes

#### 6.4 TabBar Component

**Archivo:** `src/ui/components/Navigation/TabBar.tsx` y `TabBar.css`

**Cambios requeridos:**

- Variables CSS del design system
- Estados activos/inactivos consistentes

#### 6.5 RoleBadge Component

**Archivo:** `src/ui/components/Navigation/RoleBadge.tsx` y `RoleBadge.css`

**Cambios requeridos:**

- Usar `Box` y `Text` primitivos
- Variables CSS del design system

### FASE 7: Eliminar Duplicaciones

#### 7.1 Eliminar archivos duplicados

- ❌ `src/constants/theme.ts` - ELIMINAR completamente
- ❌ `app-misional-theme.css` - ELIMINAR o consolidar si tiene valores únicos
- ⚠️ `src/ui/theme/` - MANTENER temporalmente como referencia, pero marcar como DEPRECATED

#### 7.2 Actualizar imports

- Buscar TODOS los imports de `src/constants/theme.ts` y reemplazar con `src/ui/design-system`
- Buscar TODOS los imports de `src/ui/theme/` y reemplazar con `src/ui/design-system`
- Actualizar TODOS los componentes que usen tokens antiguos

#### 7.3 Consolidar estilos

- Buscar estilos duplicados en archivos CSS
- Consolidar en componentes base cuando sea posible
- Eliminar CSS hardcodeado que pueda usar variables

### FASE 8: Actualizar Archivo de Exportaciones

**Archivo:** `src/ui/components/index.ts`

**Actualizar para exportar:**

- Todos los componentes primitivos nuevos
- Todos los componentes refactorizados
- Mantener exports existentes para compatibilidad

### FASE 9: Crear Documentación

#### 9.1 Documentación del Design System

**Archivo:** `src/ui/DESIGN-SYSTEM.md`

**Contenido:**

- Explicación del sistema de tokens
- Cómo usar tokens en TypeScript
- Cómo usar variables CSS
- Guía de colores, tipografía, espaciado
- Ejemplos de uso

#### 9.2 Guía de Componentes

**Archivo:** `src/ui/COMPONENT-GUIDE.md`

**Contenido:**

- Lista de todos los componentes disponibles
- Props de cada componente
- Ejemplos de uso
- Mejores prácticas

#### 9.3 Guía de Migración

**Archivo:** `src/ui/MIGRATION-GUIDE.md`

**Contenido:**

- Cómo migrar componentes antiguos
- Mapeo de tokens antiguos a nuevos
- Checklist de migración

## REGLAS ESTRICTAS A SEGUIR

### ✅ DEBES HACER:

1. **Usar EXCLUSIVAMENTE tokens de `src/ui/design-system/tokens.ts`**
   - No crear nuevos valores hardcodeados
   - No usar valores de otros archivos de theme

2. **Usar EXCLUSIVAMENTE variables CSS de `src/styles/design-system.css`**
   - Formato: `var(--color-primary-default)`, `var(--spacing-4)`, etc.
   - No crear nuevas variables CSS manualmente

3. **Mantener compatibilidad hacia atrás**
   - Los componentes existentes deben seguir funcionando
   - Crear aliases cuando sea necesario
   - No romper APIs existentes

4. **Tipado completo con TypeScript**
   - Todos los props deben estar tipados
   - Usar tipos del design system cuando sea posible
   - Exportar tipos para uso externo

5. **CSS consistente**
   - Usar variables CSS siempre que sea posible
   - Mantener estructura BEM o similar cuando sea necesario
   - No usar valores mágicos (números sin contexto)

6. **Documentación JSDoc**
   - Documentar todos los componentes
   - Documentar props importantes
   - Incluir ejemplos cuando sea útil

### ❌ NO DEBES HACER:

1. **NO crear nuevos archivos de tokens**
   - Usar solo `src/ui/design-system/tokens.ts`

2. **NO usar valores hardcodeados**
   - No usar `#4F46E5` directamente, usar `var(--color-primary-default)`
   - No usar `16px` directamente, usar `var(--spacing-4)`

3. **NO duplicar estilos**
   - Reutilizar componentes base
   - Consolidar estilos similares

4. **NO romper APIs existentes**
   - Mantener props existentes
   - Mantener comportamiento existente
   - Agregar nuevas funcionalidades sin romper las antiguas

5. **NO eliminar archivos sin verificar**
   - Verificar TODOS los imports antes de eliminar
   - Mantener archivos deprecated temporalmente con warnings

## ESTRUCTURA FINAL ESPERADA

```
src/
├── ui/
│   ├── design-system/
│   │   ├── tokens.ts              # ✅ ÚNICA fuente de verdad
│   │   ├── generate-css-variables.ts
│   │   └── index.ts
│   ├── components/
│   │   ├── primitives/            # ✅ NUEVOS componentes base
│   │   │   ├── Box.tsx
│   │   │   ├── Box.css
│   │   │   ├── Flex.tsx
│   │   │   ├── Flex.css
│   │   │   ├── Grid.tsx
│   │   │   ├── Grid.css
│   │   │   ├── Stack.tsx
│   │   │   ├── Stack.css
│   │   │   ├── Text.tsx
│   │   │   ├── Text.css
│   │   │   ├── Heading.tsx
│   │   │   ├── Heading.css
│   │   │   ├── Container.tsx
│   │   │   └── Container.css
│   │   ├── Layout/                # ✅ REFACTORIZADOS
│   │   │   ├── Card.tsx           # Usa Box, variables CSS
│   │   │   ├── Card.css
│   │   │   ├── PageContainer.tsx  # Usa Container
│   │   │   ├── PageContainer.css
│   │   │   ├── Section.tsx        # Usa Stack
│   │   │   ├── Section.css
│   │   │   ├── SectionTitle.tsx   # Usa Heading
│   │   │   ├── SectionTitle.css
│   │   │   ├── TwoColumnLayout.tsx # Usa Grid
│   │   │   └── TwoColumnLayout.css
│   │   ├── Controls/              # ✅ REFACTORIZADOS
│   │   │   ├── Button.tsx         # NUEVO componente unificado
│   │   │   ├── Button.css
│   │   │   ├── ButtonPrimary.tsx  # Wrapper de Button
│   │   │   ├── ButtonSecondary.tsx # Wrapper de Button
│   │   │   ├── IconButton.tsx     # Usa Button
│   │   │   └── IconButton.css
│   │   ├── Feedback/              # ✅ REFACTORIZADOS
│   │   │   ├── ProgressBar.tsx    # Variables CSS
│   │   │   ├── ProgressBar.css
│   │   │   ├── EmptyState.tsx     # Usa Stack, Text
│   │   │   ├── EmptyState.css
│   │   │   ├── LevelCard.tsx      # Usa Card
│   │   │   ├── LevelCard.css
│   │   │   ├── StatPill.tsx       # Usa Box, Text
│   │   │   └── StatPill.css
│   │   ├── Content/               # ✅ REFACTORIZADOS
│   │   │   ├── LessonCard.tsx     # Usa Card
│   │   │   ├── LessonCard.css
│   │   │   ├── ActivityCard.tsx   # Usa Card
│   │   │   ├── ActivityCard.css
│   │   │   ├── CommitCard.tsx     # Usa Card
│   │   │   ├── CommitCard.css
│   │   │   ├── PersonCard.tsx    # Usa Card
│   │   │   ├── PersonCard.css
│   │   │   ├── DevotionalCard.tsx # Usa Card
│   │   │   └── DevotionalCard.css
│   │   ├── Navigation/            # ✅ REFACTORIZADOS
│   │   │   ├── TopBar.tsx         # Usa Flex
│   │   │   ├── TopBar.css
│   │   │   ├── BottomNav.tsx      # Variables CSS
│   │   │   ├── BottomNav.css
│   │   │   ├── FloatingMenu.tsx   # Variables CSS
│   │   │   ├── FloatingMenu.css
│   │   │   ├── TabBar.tsx         # Variables CSS
│   │   │   ├── TabBar.css
│   │   │   ├── RoleBadge.tsx      # Usa Box, Text
│   │   │   └── RoleBadge.css
│   │   └── index.ts               # ✅ ACTUALIZADO con todos los exports
│   ├── DESIGN-SYSTEM.md           # ✅ NUEVA documentación
│   ├── COMPONENT-GUIDE.md         # ✅ NUEVA documentación
│   └── MIGRATION-GUIDE.md         # ✅ NUEVA documentación
├── styles/
│   ├── design-system.css          # ✅ Variables CSS generadas
│   └── global.css                  # ✅ Actualizado para usar design-system.css
└── constants/
    └── theme.ts                   # ❌ ELIMINADO
```

## CRITERIOS DE ÉXITO

La refactorización será exitosa cuando:

1. ✅ **0 duplicaciones de tokens** - Solo `design-system/tokens.ts` existe
2. ✅ **100% de componentes usando design system** - Todos usan variables CSS o tokens TypeScript
3. ✅ **0 valores hardcodeados** - Todos los valores vienen de tokens
4. ✅ **Compatibilidad mantenida** - Todos los componentes existentes siguen funcionando
5. ✅ **Documentación completa** - Todos los componentes están documentados
6. ✅ **Tipado completo** - Todos los componentes tienen tipos TypeScript
7. ✅ **Tests pasando** - Si hay tests, todos deben pasar
8. ✅ **Sin errores de lint** - El código debe pasar el linter

## PROCESO DE EJECUCIÓN

### Paso 1: Preparación

1. Leer `src/ui/design-system/tokens.ts` completamente
2. Leer `src/styles/design-system.css` para entender variables disponibles
3. Revisar estructura actual de componentes

### Paso 2: Crear Componentes Primitivos

1. Crear `Box` component
2. Crear `Flex` component
3. Crear `Grid` component
4. Crear `Stack` component
5. Crear `Text` component
6. Crear `Heading` component
7. Crear `Container` component
8. Exportar todos en `index.ts`

### Paso 3: Refactorizar por Categoría

1. Layout components (Card, PageContainer, Section, etc.)
2. Controls components (Button, IconButton)
3. Feedback components (ProgressBar, EmptyState, etc.)
4. Content components (LessonCard, ActivityCard, etc.)
5. Navigation components (TopBar, BottomNav, etc.)

### Paso 4: Limpieza

1. Buscar y reemplazar imports antiguos
2. Eliminar archivos duplicados
3. Actualizar exports en `index.ts`
4. Verificar que todo compile

### Paso 5: Documentación

1. Crear `DESIGN-SYSTEM.md`
2. Crear `COMPONENT-GUIDE.md`
3. Crear `MIGRATION-GUIDE.md`
4. Actualizar `README.md` si existe

### Paso 6: Verificación Final

1. Verificar que no hay valores hardcodeados
2. Verificar que todos usan design system
3. Verificar compatibilidad hacia atrás
4. Verificar documentación completa

## EJEMPLOS DE CÓDIGO

### Ejemplo 1: Componente Primitivo (Box)

```typescript
// src/ui/components/primitives/Box.tsx
import React, { CSSProperties, ReactNode } from 'react';
import { designTokens } from '../../design-system';
import './Box.css';

interface BoxProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  padding?: keyof typeof designTokens.spacing | number;
  margin?: keyof typeof designTokens.spacing | number;
  width?: string | number;
  height?: string | number;
  bg?: string; // CSS variable name like '--color-background-card'
  border?: string;
  radius?: keyof typeof designTokens.radius;
  shadow?: keyof typeof designTokens.shadows;
  onClick?: () => void;
}

export const Box: React.FC<BoxProps> = ({
  children,
  className = '',
  style = {},
  padding,
  margin,
  width,
  height,
  bg,
  border,
  radius,
  shadow,
  onClick,
}) => {
  const computedStyle: CSSProperties = {
    ...style,
    ...(padding && {
      padding: typeof padding === 'number'
        ? `${padding}px`
        : `var(--spacing-${padding})`,
    }),
    ...(margin && {
      margin: typeof margin === 'number'
        ? `${margin}px`
        : `var(--spacing-${margin})`,
    }),
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    ...(bg && { backgroundColor: `var(${bg})` }),
    ...(border && { border }),
    ...(radius && { borderRadius: `var(--radius-${radius})` }),
    ...(shadow && { boxShadow: `var(--shadow-${shadow})` }),
  };

  return (
    <div
      className={`ui-box ${className}`}
      style={computedStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
```

```css
/* src/ui/components/primitives/Box.css */
.ui-box {
  box-sizing: border-box;
}
```

### Ejemplo 2: Refactorizar Card Component

```typescript
// src/ui/components/Layout/Card.tsx (REFACTORIZADO)
import React, { ReactNode } from 'react';
import { Box } from '../primitives/Box';
import './Card.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingMap = {
  none: 0,
  sm: 'var(--spacing-2)',
  md: 'var(--spacing-4)',
  lg: 'var(--spacing-6)',
};

const shadowMap = {
  default: 'var(--shadow-sm)',
  elevated: 'var(--shadow-md)',
  outlined: 'none',
  gradient: 'none',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  variant = 'default',
  padding = 'md',
}) => {
  const isGradient = variant === 'gradient';

  return (
    <Box
      className={`ui-card ui-card--${variant} ${onClick ? 'ui-card--clickable' : ''} ${className}`}
      onClick={onClick}
      style={{
        padding: paddingMap[padding],
        backgroundColor: isGradient
          ? 'linear-gradient(135deg, var(--color-primary-default) 0%, var(--color-primary-light) 100%)'
          : 'var(--color-background-card)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: shadowMap[variant],
        border: variant === 'outlined'
          ? '1px solid var(--color-border-default)'
          : '1px solid rgba(0, 0, 0, 0.05)',
        color: isGradient ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
        transition: 'var(--transition-base)',
      }}
    >
      {children}
    </Box>
  );
};
```

```css
/* src/ui/components/Layout/Card.css */
.ui-card {
  width: 100%;
  box-sizing: border-box;
}

.ui-card--clickable {
  cursor: pointer;
}

.ui-card--clickable:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-light);
}

.ui-card--clickable:active {
  transform: translateY(0);
}
```

## INSTRUCCIONES FINALES

1. **Trabaja sistemáticamente** - Una categoría a la vez
2. **Prueba cada componente** - Verifica que funciona después de refactorizar
3. **Mantén compatibilidad** - No rompas APIs existentes
4. **Documenta mientras avanzas** - No dejes documentación para el final
5. **Usa el sistema de tokens** - No inventes nuevos valores
6. **Sé consistente** - Mismo patrón en todos los componentes
7. **Verifica imports** - Asegúrate de que todos los imports son correctos

## PREGUNTAS FRECUENTES

**P: ¿Qué hago si un componente necesita un valor que no está en los tokens?**
R: Agrega el valor a `designTokens` primero, luego úsalo. No agregues valores hardcodeados.

**P: ¿Puedo mantener componentes antiguos mientras migro?**
R: Sí, pero marca los antiguos como deprecated y crea wrappers que usen los nuevos.

**P: ¿Qué hago con componentes que tienen lógica compleja?**
R: Mantén la lógica, solo refactoriza los estilos para usar el design system.

**P: ¿Debo crear tests para los componentes?**
R: Si hay tests existentes, actualízalos. Si no hay, considera agregarlos pero no es obligatorio para esta refactorización.

---

**¡EMPIEZA AHORA!** Trabaja sistemáticamente, una fase a la vez, y asegúrate de que cada componente refactorizado funciona correctamente antes de continuar.
