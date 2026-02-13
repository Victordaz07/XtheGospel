# 🎨 Plan de Refactorización Completa del UI

## Objetivo

Refactorizar completamente el sistema de UI para crear un **Design System unificado, escalable y mantenible** que elimine duplicaciones y establezca mejores prácticas.

## Problemas Identificados

### 1. **Múltiples Sistemas de Tokens Duplicados**

- `src/ui/theme/` - Tokens TypeScript
- `src/styles/global.css` - Variables CSS
- `src/constants/theme.ts` - Otro objeto theme
- `app-misional-theme.css` - Sistema separado
- **Resultado**: Inconsistencias y mantenimiento difícil

### 2. **Inconsistencias en Nomenclatura**

- Mezcla de `--color-primary` y `--am-color-primary`
- CamelCase vs kebab-case inconsistente
- Variables CSS no sincronizadas con tokens TypeScript

### 3. **Componentes con Estilos Mezclados**

- Algunos usan tokens TypeScript en `style` props
- Otros usan variables CSS directamente
- CSS modules y archivos CSS separados sin patrón claro

### 4. **Falta de Sistema de Componentes Base**

- No hay componentes primitivos claros
- Estilos duplicados en múltiples lugares
- No hay documentación clara de uso

## Solución Propuesta

### Fase 1: Sistema de Tokens Unificado ✅

**Archivos Creados:**

- `src/ui/design-system/tokens.ts` - Tokens TypeScript únicos
- `src/ui/design-system/generate-css-variables.ts` - Generador de CSS
- `src/ui/design-system/index.ts` - Exportaciones
- `src/styles/design-system.css` - Variables CSS generadas

**Características:**

- ✅ Single source of truth para todos los tokens
- ✅ Generación automática de variables CSS
- ✅ Tipado completo con TypeScript
- ✅ Compatibilidad hacia atrás con variables legacy

### Fase 2: Refactorizar Variables CSS Globales

**Tareas:**

1. Actualizar `src/styles/global.css` para importar `design-system.css`
2. Eliminar variables duplicadas
3. Mantener solo variables legacy necesarias para compatibilidad
4. Documentar variables deprecadas

### Fase 3: Crear Componentes Base Mejorados

**Componentes a Crear/Mejorar:**

#### Layout Components

- `Box` - Componente base para contenedores
- `Flex` - Layout flexbox
- `Grid` - Layout grid
- `Stack` - Stack vertical/horizontal
- `Container` - Contenedor con max-width
- `Card` - Mejorar componente existente
- `Section` - Mejorar componente existente

#### Typography Components

- `Text` - Componente de texto con variantes
- `Heading` - Títulos (h1-h6)
- `Label` - Etiquetas de formulario
- `Caption` - Texto pequeño

#### Form Components

- `Input` - Input unificado
- `Textarea` - Textarea unificado
- `Select` - Select unificado
- `Checkbox` - Checkbox
- `Radio` - Radio button
- `Switch` - Toggle switch

#### Feedback Components

- `Badge` - Badge/etiqueta
- `Alert` - Mensajes de alerta
- `Toast` - Notificaciones toast
- `Loading` - Estados de carga
- `EmptyState` - Mejorar existente
- `ProgressBar` - Mejorar existente

#### Navigation Components

- `Button` - Unificar ButtonPrimary/ButtonSecondary
- `IconButton` - Mejorar existente
- `Link` - Enlaces estilizados
- `Tabs` - Sistema de pestañas
- `Breadcrumbs` - Migas de pan

### Fase 4: Refactorizar Componentes Existentes

**Estrategia:**

1. Migrar componentes uno por uno
2. Usar nuevos tokens del design system
3. Eliminar estilos duplicados
4. Usar componentes base cuando sea posible

**Orden de Migración:**

1. Layout components (Card, Section, PageContainer)
2. Controls components (Button, IconButton)
3. Feedback components (ProgressBar, EmptyState)
4. Content components (LessonCard, ActivityCard)
5. Navigation components (TopBar, BottomNav)

### Fase 5: Eliminar Archivos Duplicados

**Archivos a Eliminar/Consolidar:**

- `src/constants/theme.ts` → Usar `design-system/tokens.ts`
- `app-misional-theme.css` → Consolidar en `design-system.css`
- Variables duplicadas en `global.css`

### Fase 6: Documentación y Guías

**Documentos a Crear:**

1. `docs/DESIGN-SYSTEM.md` - Guía completa del design system
2. `docs/COMPONENT-GUIDE.md` - Guía de uso de componentes
3. `docs/MIGRATION-GUIDE.md` - Guía de migración
4. Storybook o similar para documentación visual

## Estructura Final Propuesta

```
src/
├── ui/
│   ├── design-system/
│   │   ├── tokens.ts              # Tokens TypeScript
│   │   ├── generate-css-variables.ts
│   │   └── index.ts
│   ├── components/
│   │   ├── primitives/            # Componentes base
│   │   │   ├── Box.tsx
│   │   │   ├── Flex.tsx
│   │   │   ├── Grid.tsx
│   │   │   ├── Stack.tsx
│   │   │   ├── Text.tsx
│   │   │   └── Heading.tsx
│   │   ├── layout/               # Componentes de layout
│   │   ├── forms/                 # Componentes de formulario
│   │   ├── feedback/              # Componentes de feedback
│   │   └── navigation/            # Componentes de navegación
│   └── hooks/                     # Hooks relacionados con UI
│       ├── useTheme.ts
│       └── useBreakpoint.ts
├── styles/
│   ├── design-system.css          # Variables CSS generadas
│   ├── global.css                 # Estilos globales básicos
│   └── reset.css                  # CSS reset
└── docs/
    ├── DESIGN-SYSTEM.md
    ├── COMPONENT-GUIDE.md
    └── MIGRATION-GUIDE.md
```

## Principios del Nuevo Sistema

### 1. **Single Source of Truth**

- Todos los tokens vienen de `design-system/tokens.ts`
- Las variables CSS se generan automáticamente
- No hay duplicación de valores

### 2. **Composición sobre Configuración**

- Componentes base simples y composables
- Variantes claras y predefinidas
- Props tipados con TypeScript

### 3. **Consistencia Visual**

- Mismo sistema de espaciado en toda la app
- Colores semánticos claros
- Tipografía consistente

### 4. **Accesibilidad Primero**

- Contraste adecuado en todos los colores
- Estados de focus visibles
- ARIA labels donde sea necesario

### 5. **Performance**

- CSS variables para temas dinámicos
- Componentes optimizados
- Lazy loading cuando sea posible

## Métricas de Éxito

- ✅ 0 duplicaciones de tokens
- ✅ 100% de componentes usando design system
- ✅ Tiempo de desarrollo reducido en 30%
- ✅ Consistencia visual del 100%
- ✅ Documentación completa

## Próximos Pasos

1. ✅ Crear sistema de tokens unificado
2. ⏳ Actualizar `global.css` para usar nuevo sistema
3. ⏳ Crear componentes primitivos base
4. ⏳ Refactorizar componentes existentes
5. ⏳ Eliminar archivos duplicados
6. ⏳ Crear documentación

## Notas

- Mantener compatibilidad hacia atrás durante la migración
- Migrar gradualmente, no todo de una vez
- Probar cada componente después de migrar
- Documentar cambios importantes
