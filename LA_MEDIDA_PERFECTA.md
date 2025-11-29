# LA MEDIDA PERFECTA - Estándar Universal de Espaciado

Este documento define el estándar de espaciado que se aplicará a TODA la aplicación.

## Variables CSS Globales

```css
--perfect-padding-horizontal: 16px;  /* Padding lateral único */
--perfect-padding-vertical: 12px;     /* Padding vertical en tarjetas */
--perfect-margin-bottom: 10px;       /* Margin entre elementos */
--perfect-gap: 10px;                 /* Gap en grids y flex */
--perfect-header-padding: 16px;      /* Padding en headers */
```

## Reglas de Aplicación

1. **Un solo nivel de padding lateral**: 16px en el contenedor principal
2. **Tarjetas usan 100% del ancho**: `width: 100%`, `box-sizing: border-box`
3. **Padding vertical moderado**: 12px (no 24px o 32px)
4. **Margin entre elementos**: 10px (no 24px o 32px)
5. **Sin max-width restrictivos**: Usar 100% excepto donde sea necesario para legibilidad
6. **Headers**: Padding de 16px (no 24px o 32px)

## Conversiones Estándar

- `padding: 24px` → `padding: var(--perfect-padding-vertical, 12px) var(--perfect-padding-horizontal, 16px)`
- `padding: 32px` → `padding: var(--perfect-header-padding, 16px)`
- `margin-bottom: 24px` → `margin-bottom: var(--perfect-margin-bottom, 10px)`
- `margin-bottom: 32px` → `margin-bottom: var(--perfect-margin-bottom, 10px)`
- `gap: 24px` → `gap: var(--perfect-gap, 10px)`
- `max-width: 460px` → `max-width: 100%` (en contenedores principales)
- Agregar `width: 100%` y `box-sizing: border-box` a todas las tarjetas

## Archivos Actualizados

### Variables y Base
✅ `src/styles/global.css` - Variables definidas
✅ `src/pages/Page.css` - Estándar aplicado
✅ `src/layouts/Layout.css` - Estándar aplicado

### Componentes UI
✅ `src/ui/components/Layout/Card.css` - Estándar aplicado
✅ `src/ui/components/Layout/Section.css` - Estándar aplicado
✅ `src/ui/components/Content/LessonCard.css` - Estándar aplicado
✅ `src/ui/components/Content/CommitCard.css` - Estándar aplicado
✅ `src/ui/components/Content/ActivityCard.css` - Estándar aplicado

### Páginas Serving
✅ `src/pages/serving/Page.css` - Estándar aplicado
✅ `src/pages/serving/MissionaryLessons.css` - Estándar aplicado
✅ `src/pages/serving/MissionaryLessonDetail.css` - Estándar aplicado
✅ `src/pages/serving/MissionaryHome.css` - Estándar aplicado
✅ `src/pages/serving/MissionaryAgenda.css` - Estándar aplicado
✅ `src/pages/serving/MissionaryPeople.css` - Estándar aplicado
✅ `src/pages/serving/EventModal.css` - Estándar aplicado

### Páginas Learning
✅ `src/pages/learning/HomePage.css` - Estándar aplicado
✅ `src/pages/learning/ProgressPage.css` - Estándar aplicado
✅ `src/pages/learning/ProfilePage.css` - Estándar aplicado

### Páginas Generales
✅ `src/pages/CommitmentsPage.css` - Estándar aplicado

### Componentes Member
✅ `src/components/member/MemberComponents.css` - Estándar aplicado
✅ `src/components/member/MemberLeaderView.css` - Estándar aplicado
✅ `src/components/member/MemberRoleToggle.css` - Estándar aplicado

### Componentes Vineyard
✅ `src/vineyard/components/StudyModuleCard.css` - Estándar aplicado
✅ `src/vineyard/components/SpiritualProgressCard.css` - Estándar aplicado
✅ `src/vineyard/components/NotificationsModal.css` - Estándar aplicado
✅ `src/vineyard/components/MemberActivityCard.css` - Estándar aplicado
✅ `src/vineyard/components/StudySectionView.css` - Estándar aplicado

### Páginas Vineyard
✅ `src/vineyard/pages/StudyModulesPage.css` - Estándar aplicado
✅ `src/vineyard/pages/MemberHome.css` - Estándar aplicado
✅ `src/vineyard/pages/ProgressPage.css` - Estándar aplicado
✅ `src/vineyard/pages/ActivitiesPage.css` - Estándar aplicado

## Estado: ✅ COMPLETADO

Todos los archivos CSS principales han sido actualizados con "la medida perfecta". El estándar está ahora aplicado consistentemente en toda la aplicación.

