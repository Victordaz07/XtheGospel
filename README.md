# Missionary & Investigator App / App Misional

A comprehensive web application designed to support missionaries, investigators, and members of The Church of Jesus Christ of Latter-day Saints in their spiritual journey and missionary work.

## 📋 Table of Contents / Tabla de Contenidos

- [English](#english)
- [Español](#español)

---

## English

### Overview

This application provides three distinct user roles, each with tailored features and content:

1. **Investigator** - For those learning about the Church
2. **Missionary** - For full-time missionaries
3. **Member** - For members supporting missionary work

### Features

#### Investigator Role
- Daily devotional messages
- Interactive lessons and study materials
- Progress tracking
- Baptism preparation guide
- Personal commitments and tasks
- God's story journal
- Difficult questions FAQ

#### Missionary Role
- Mission agenda and scheduling
- People management (investigators, contacts)
- Lesson planning and resources
- Commitment tracking
- Progress monitoring

#### Member Role
- **Study Modules**: Deep doctrinal content organized by topics
  - Doctrine of Christ in daily life
  - Working with missionaries
  - Sharing the gospel naturally
  - Caring for new converts
  - Temple preparation
- **Interactive Activities**: Gamified learning experiences
  - Doctrinal quizzes
  - Real-world scenarios
  - Scripture matching exercises
  - Character guessing games
  - Real-world mission assignments
  - Reading blocks with reflection
- **New Convert Care**: Comprehensive guide for supporting new members
  - Welcome to the Kingdom
  - Ward integration
  - Aaronic and Melchizedek Priesthood preparation
  - First temple visit guidance
  - Temple recommend preparation
  - 90-day spiritual growth path
- **Friends Management**: Track and pray for friends interested in the gospel
- **Missionary Support**: Ways to help full-time missionaries
- **Progress Tracking**: XP system, levels, streaks, and badges

### Technology Stack

- **Frontend**: React 18.3.1, TypeScript
- **Routing**: React Router DOM 6.20.0
- **State Management**: Zustand 5.0.8
- **Build Tool**: Vite 5.0.0
- **Styling**: CSS with custom design system
- **Internationalization**: Custom i18n system supporting ES, EN, FR, PT

### Getting Started

#### Prerequisites

- Node.js 18+ and npm

#### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:3000`

### Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React contexts (Auth, I18n, Progress)
├── data/              # Static data and lessons
├── hooks/             # Custom React hooks
├── i18n/              # Translation files (ES, EN, FR, PT)
├── layouts/           # Layout components for each role
├── member/            # Member role specific code
│   ├── components/   # Member-specific components
│   ├── data/         # Member study modules and activities
│   ├── pages/        # Member pages
│   └── state/        # Member state management
├── pages/             # Page components
│   ├── investigator/ # Investigator pages
│   ├── missionary/   # Missionary pages
│   └── member/       # Member pages (legacy)
├── router/           # Routing configuration
├── services/         # Business logic services
├── utils/            # Utility functions
└── styles/           # Global styles
```

### Member Module Routes

- `/member` or `/member/home` - Dashboard with quick access to all features
- `/member/study` - Study modules overview
- `/member/study/:moduleId` - Module detail
- `/member/study/:moduleId/:sectionId` - Section detail
- `/member/convertidos` - New convert care guide
- `/member/activities` - Interactive activities
- `/member/progress` - Progress tracking (XP, levels, badges)
- `/member/friends` - Friends management
- `/member/support` - Missionary support resources

### Internationalization

The app supports 4 languages:
- **Spanish (ES)** - Default
- **English (EN)**
- **French (FR)**
- **Portuguese (PT)**

Language can be changed via the language picker in the UI. All member content (study modules, activities, convert care guide) is fully translated.

### Development Features

- **Role Switcher**: In development mode, a role switcher appears in the top-right corner for easy testing between roles
- **Hot Module Replacement**: Fast development with Vite HMR
- **TypeScript**: Full type safety throughout the codebase

### Data Sources

#### Member Study Modules
Located in `src/member/data/memberStudyModules.*.ts`:
- Doctrinal content organized by modules and sections
- Available in ES, EN, FR, PT

#### Member Activities
Located in `src/member/data/memberActivities.ts`:
- Interactive activities with XP rewards
- Types: QUIZ_SINGLE, SCENARIO, QUIZ_SCRIPTURE_MATCH, CHARACTER_GUESS, REAL_WORLD_MISSION, READING_BLOCK

#### New Convert Guide
Located in `src/member/data/newConvertGuide.*.ts`:
- Comprehensive guide for new member care
- 7 main sections covering the first 90 days and beyond
- Available in ES, EN, FR, PT

### State Management

- **AuthContext**: User role and authentication state
- **I18nContext**: Language and translation management
- **ProgressContext**: Lesson progress tracking
- **useMemberProgressStore** (Zustand): Member-specific progress (XP, levels, badges, completed sections)

### Storage

The app uses `localStorage` for:
- User role persistence
- Language preference
- Progress tracking
- Member friends list
- Completed activities and study sections

### Building and Deployment

```bash
# Production build
npm run build

# Output will be in dist/
```

The `dist/` folder contains static files ready for deployment to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

### Contributing

This is a private project. For questions or contributions, please contact the project maintainer.

### License

Private - All rights reserved

---

## Español

### Resumen

Esta aplicación web proporciona tres roles de usuario distintos, cada uno con características y contenido personalizado:

1. **Investigador** - Para quienes están aprendiendo sobre la Iglesia
2. **Misionero** - Para misioneros de tiempo completo
3. **Miembro** - Para miembros que apoyan la obra misional

### Características

#### Rol Investigador
- Mensajes devocionales diarios
- Lecciones interactivas y materiales de estudio
- Seguimiento de progreso
- Guía de preparación para el bautismo
- Compromisos y tareas personales
- Diario de la historia con Dios
- Preguntas difíciles FAQ

#### Rol Misionero
- Agenda misional y programación
- Gestión de personas (investigadores, contactos)
- Planificación de lecciones y recursos
- Seguimiento de compromisos
- Monitoreo de progreso

#### Rol Miembro
- **Módulos de Estudio**: Contenido doctrinal profundo organizado por temas
  - Doctrina de Cristo en la vida diaria
  - Trabajar con los misioneros
  - Compartir el evangelio naturalmente
  - Cuidado de nuevos conversos
  - Preparación para el templo
- **Actividades Interactivas**: Experiencias de aprendizaje gamificadas
  - Quizzes doctrinales
  - Escenarios del mundo real
  - Ejercicios de emparejamiento de escrituras
  - Juegos de adivinanza de personajes
  - Asignaciones misionales del mundo real
  - Bloques de lectura con reflexión
- **Cuidado de Conversos**: Guía completa para apoyar a nuevos miembros
  - Bienvenida al Reino
  - Integración al barrio
  - Preparación para el Sacerdocio Aarónico y de Melquisedec
  - Guía para la primera visita al templo
  - Preparación para la recomendación del templo
  - Ruta de crecimiento espiritual de 90 días
- **Gestión de Amigos**: Rastrear y orar por amigos interesados en el evangelio
- **Apoyo Misionero**: Formas de ayudar a los misioneros de tiempo completo
- **Seguimiento de Progreso**: Sistema de XP, niveles, rachas e insignias

### Stack Tecnológico

- **Frontend**: React 18.3.1, TypeScript
- **Routing**: React Router DOM 6.20.0
- **Gestión de Estado**: Zustand 5.0.8
- **Herramienta de Build**: Vite 5.0.0
- **Estilos**: CSS con sistema de diseño personalizado
- **Internacionalización**: Sistema i18n personalizado que soporta ES, EN, FR, PT

### Comenzar

#### Prerrequisitos

- Node.js 18+ y npm

#### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview
```

La aplicación estará disponible en `http://localhost:3000`

### Estructura del Proyecto

```
src/
├── components/          # Componentes UI reutilizables
├── context/            # Contextos de React (Auth, I18n, Progress)
├── data/              # Datos estáticos y lecciones
├── hooks/             # Hooks personalizados de React
├── i18n/              # Archivos de traducción (ES, EN, FR, PT)
├── layouts/           # Componentes de layout para cada rol
├── member/            # Código específico del rol miembro
│   ├── components/   # Componentes específicos de miembro
│   ├── data/         # Módulos de estudio y actividades de miembro
│   ├── pages/        # Páginas de miembro
│   └── state/        # Gestión de estado de miembro
├── pages/             # Componentes de página
│   ├── investigator/ # Páginas de investigador
│   ├── missionary/   # Páginas de misionero
│   └── member/       # Páginas de miembro (legacy)
├── router/           # Configuración de routing
├── services/         # Servicios de lógica de negocio
├── utils/            # Funciones de utilidad
└── styles/           # Estilos globales
```

### Rutas del Módulo Miembro

- `/member` o `/member/home` - Dashboard con acceso rápido a todas las características
- `/member/study` - Resumen de módulos de estudio
- `/member/study/:moduleId` - Detalle del módulo
- `/member/study/:moduleId/:sectionId` - Detalle de la sección
- `/member/convertidos` - Guía de cuidado de nuevos conversos
- `/member/activities` - Actividades interactivas
- `/member/progress` - Seguimiento de progreso (XP, niveles, insignias)
- `/member/friends` - Gestión de amigos
- `/member/support` - Recursos de apoyo misionero

### Internacionalización

La aplicación soporta 4 idiomas:
- **Español (ES)** - Por defecto
- **Inglés (EN)**
- **Francés (FR)**
- **Portugués (PT)**

El idioma se puede cambiar mediante el selector de idioma en la UI. Todo el contenido de miembro (módulos de estudio, actividades, guía de cuidado de conversos) está completamente traducido.

### Características de Desarrollo

- **Cambiador de Rol**: En modo desarrollo, aparece un cambiador de rol en la esquina superior derecha para facilitar las pruebas entre roles
- **Hot Module Replacement**: Desarrollo rápido con Vite HMR
- **TypeScript**: Seguridad de tipos completa en todo el código

### Fuentes de Datos

#### Módulos de Estudio de Miembro
Ubicados en `src/member/data/memberStudyModules.*.ts`:
- Contenido doctrinal organizado por módulos y secciones
- Disponible en ES, EN, FR, PT

#### Actividades de Miembro
Ubicadas en `src/member/data/memberActivities.ts`:
- Actividades interactivas con recompensas de XP
- Tipos: QUIZ_SINGLE, SCENARIO, QUIZ_SCRIPTURE_MATCH, CHARACTER_GUESS, REAL_WORLD_MISSION, READING_BLOCK

#### Guía de Nuevos Conversos
Ubicada en `src/member/data/newConvertGuide.*.ts`:
- Guía completa para el cuidado de nuevos miembros
- 7 secciones principales que cubren los primeros 90 días y más allá
- Disponible en ES, EN, FR, PT

### Gestión de Estado

- **AuthContext**: Estado de rol de usuario y autenticación
- **I18nContext**: Gestión de idioma y traducción
- **ProgressContext**: Seguimiento de progreso de lecciones
- **useMemberProgressStore** (Zustand): Progreso específico de miembro (XP, niveles, insignias, secciones completadas)

### Almacenamiento

La aplicación usa `localStorage` para:
- Persistencia del rol de usuario
- Preferencia de idioma
- Seguimiento de progreso
- Lista de amigos de miembro
- Actividades y secciones de estudio completadas

### Construcción y Despliegue

```bash
# Build de producción
npm run build

# La salida estará en dist/
```

La carpeta `dist/` contiene archivos estáticos listos para desplegar en cualquier servicio de hosting estático (Netlify, Vercel, GitHub Pages, etc.).

### Contribuir

Este es un proyecto privado. Para preguntas o contribuciones, por favor contacta al mantenedor del proyecto.

### Licencia

Privado - Todos los derechos reservados

---

## 📝 Recent Updates / Actualizaciones Recientes

### Member Role Complete Implementation / Implementación Completa del Rol Miembro

- ✅ Complete visual dashboard for member role
- ✅ Study modules with deep doctrinal content
- ✅ Interactive activities with gamification
- ✅ New convert care guide (7 sections, 4 languages)
- ✅ Progress tracking (XP, levels, streaks, badges)
- ✅ Friends management
- ✅ Missionary support resources
- ✅ Role switcher for development testing
- ✅ Full i18n support (ES, EN, FR, PT)
- ✅ Responsive design consistent with investigator/missionary roles

---

## 🚀 Quick Start / Inicio Rápido

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and select a role to begin.

Abre `http://localhost:3000` y selecciona un rol para comenzar.
