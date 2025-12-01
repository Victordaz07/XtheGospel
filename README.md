# 📘 Mi Diario Misional

**Aplicación Web Integral para Apoyar a Investigadores, Misioneros, Miembros y Líderes de La Iglesia de Jesucristo de los Santos de los Últimos Días**

---

## 🌟 Visión General

Esta aplicación nació con un propósito principal: **ayudar a los investigadores en su camino hacia el bautismo y la conversión**. Es una herramienta diseñada para acompañar a quienes están aprendiendo sobre el Evangelio, proporcionándoles recursos espirituales, lecciones interactivas y un seguimiento personalizado de su progreso.

Además, la aplicación ofrece herramientas complementarias para:
- **Misioneros** que enseñan y acompañan a los investigadores
- **Miembros** que apoyan la obra misional
- **Líderes misionales** que coordinan y capacitan

**El enfoque principal siempre será el investigador y su crecimiento espiritual.**

---

## 📋 Tabla de Contenidos

- [Enfoque Principal: Investigadores](#-enfoque-principal-investigadores)
- [Módulos Adicionales](#-módulos-adicionales)
  - [Misioneros](#-misioneros)
  - [Miembros](#-miembros)
  - [Líderes Misionales](#-líderes-misionales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Inicio Rápido](#-inicio-rápido)

---

## 👤 Enfoque Principal: Investigadores

### Propósito

Ayudar a los investigadores a:
- Comprender las doctrinas del Evangelio
- Prepararse espiritualmente para el bautismo
- Desarrollar un testimonio personal
- Integrarse a la comunidad de la Iglesia
- Mantener compromisos y progresar en su conversión

### Características Principales

#### 📖 Lecciones Interactivas
- Contenido doctrinal organizado y progresivo
- Materiales de estudio adaptados a su nivel
- Seguimiento de progreso personalizado

#### 💬 Mensajes Devocionales Diarios
- Reflexiones espirituales diarias
- Escrituras y citas inspiradoras
- Aplicación práctica en la vida diaria

#### 📝 Diario Espiritual
- "La Historia con Dios": Registro personal de experiencias espirituales
- Reflexiones sobre el progreso
- Momentos de revelación y crecimiento

#### 🎯 Preparación para el Bautismo
- Guía paso a paso hacia el bautismo
- Compromisos y tareas personales
- Seguimiento de preparación espiritual

#### ❓ Preguntas Difíciles
- FAQ con respuestas doctrinales
- Recursos para resolver dudas comunes
- Apoyo en el proceso de aprendizaje

#### 📊 Seguimiento de Progreso
- Visualización del crecimiento espiritual
- Logros y metas alcanzadas
- Recordatorios de compromisos

---

## 🛠 Módulos Adicionales

### 👔 Misioneros

**Herramientas para apoyar a los investigadores:**

- **Agenda Misional**: Planificación y seguimiento de citas con investigadores
- **Gestión de Personas**: Base de datos de investigadores, contactos y miembros
- **Planificación de Lecciones**: Recursos y materiales para enseñar
- **Seguimiento de Compromisos**: Recordatorios y seguimiento de compromisos de investigadores
- **Centro de Liderazgo**: Acceso a agendas, mensajes y eventos de sus líderes

### 👥 Miembros

**Recursos para apoyar la obra misional:**

- **Módulos de Estudio**: Contenido doctrinal profundo para fortalecer el testimonio
- **Actividades Interactivas**: Aprendizaje gamificado con quizzes, escenarios y ejercicios
- **Cuidado de Conversos**: Guía completa para apoyar a nuevos miembros (7 secciones, 4 idiomas)
- **Gestión de Amigos**: Rastrear y orar por amigos interesados en el evangelio
- **Apoyo Misionero**: Formas prácticas de ayudar a los misioneros
- **Seguimiento de Progreso**: Sistema de XP, niveles, rachas e insignias

### 🛡️ Líderes Misionales

**Herramientas de coordinación y capacitación** (funcionalidad adicional):

Este módulo ayuda a los líderes (Líderes de Distrito, Líderes de Zona y Asistentes del Presidente) a coordinar y capacitar a los misioneros, pero **siempre con el objetivo final de servir mejor a los investigadores**.

#### Funcionalidades:

- **Reuniones de Distrito/Zona**: Planificar y registrar reuniones de capacitación
- **Intercambios**: Organizar intercambios para entrenar misioneros
- **Entrevistas Bautismales**: Coordinar entrevistas para investigadores
- **Mensajes de Liderazgo**: Comunicar énfasis y visión a los misioneros
- **Dashboard**: Visión general del progreso del distrito/zona/misión

#### Arquitectura del Módulo de Liderazgo

```mermaid
flowchart TD
    %% Roles
    A1[<b>Misionero Regular</b><br/>• Recibe mensajes<br/>• Recibe agendas<br/>• Ve eventos<br/>• No edita]:::role
    A2[<b>Líder de Distrito</b><br/>• Reunión de distrito<br/>• Intercambios<br/>• Entrevistas<br/>• Mensajes a distrito<br/>• Notas]:::role
    A3[<b>Líder de Zona</b><br/>• Reunión de zona<br/>• Intercambios<br/>• Entrevistas LZ<br/>• Mensajes a zona<br/>• Notas]:::role
    A4[<b>Asistente del Presidente (AP)</b><br/>• Giras<br/>• Transfers<br/>• Mensajes misión<br/>• Dashboard misión<br/>• Notas AP]:::role

    %% Principal collections
    B1[(leadershipEvents)]:::db
    B2[(leaderMessages)]:::db
    B3[(districtCouncils)]:::db
    B4[(zoneCouncils)]:::db
    B5[(exchanges)]:::db
    B6[(baptismalInterviews)]:::db
    B7[(transferPlans)]:::db
    B8[(personalNotes)]:::db

    %% Centro de liderazgo
    C1[[<b>Centro de Liderazgo</b><br/>Feed único para todos<br/>LeadershipCenterScreen]]:::center

    %% Connections
    A2 --> B3
    A3 --> B4
    A4 --> B7

    A2 --> B1
    A3 --> B1
    A4 --> B1

    A2 --> B2
    A3 --> B2
    A4 --> B2

    A2 --> B5
    A3 --> B5
    A4 --> B5

    A2 --> B6
    A3 --> B6

    A2 --> B8
    A3 --> B8
    A4 --> B8

    %% Feed
    B1 --> C1
    B2 --> C1

    A1 --> C1
    A2 --> C1
    A3 --> C1
    A4 --> C1

    classDef role fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0c4a6e
    classDef db fill:#ede9fe,stroke:#6d28d9,stroke-width:2px,color:#4c1d95
    classDef center fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#92400e
```

**Nota**: Este módulo es una funcionalidad adicional diseñada para mejorar la coordinación entre líderes y misioneros, con el objetivo final de servir mejor a los investigadores.

---

## 🛠 Stack Tecnológico

- **Frontend**: React 18.3.1, TypeScript
- **Routing**: React Router DOM 6.20.0
- **State Management**: Zustand 5.0.8, React Context API
- **Build Tool**: Vite 5.0.0
- **Styling**: CSS con sistema de diseño personalizado
- **Internationalization**: Sistema i18n personalizado (ES, EN, FR, PT)
- **Storage**: localStorage (preparado para migración a Firestore)

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ y npm

### Instalación

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
├── components/                    # Componentes UI reutilizables
├── context/                      # Contextos de React (Auth, I18n, Progress)
├── data/                         # Datos estáticos y lecciones
│   ├── missionary/               # Configuración de roles de liderazgo
│   └── member/                   # Módulos de estudio y actividades
├── hooks/                        # Hooks personalizados de React
├── i18n/                         # Archivos de traducción (ES, EN, FR, PT)
├── layouts/                      # Layouts de navegación
│   └── MissionaryLeadershipLayout.tsx
├── pages/                        # Componentes de página
│   ├── investigator/            # Páginas de investigador (ENFOQUE PRINCIPAL)
│   ├── missionary/              # Páginas de misionero
│   │   └── leadership/          # Pantallas de liderazgo (funcionalidad adicional)
│   └── member/                  # Páginas de miembro
├── services/                    # Servicios de lógica de negocio
│   ├── districtCouncilService.ts
│   ├── zoneCouncilService.ts
│   ├── exchangeService.ts
│   ├── baptismalInterviewService.ts
│   ├── leaderMessageService.ts
│   ├── transferPlanService.ts
│   └── personalNoteService.ts
├── router/                      # Configuración de routing
└── utils/                       # Funciones de utilidad
```

---

## 📊 Estado del Proyecto

### ✅ Implementado

#### Módulo Principal: Investigadores
- ✅ Lecciones interactivas y materiales de estudio
- ✅ Mensajes devocionales diarios
- ✅ Diario espiritual "La Historia con Dios"
- ✅ Guía de preparación para el bautismo
- ✅ Sistema de compromisos y tareas
- ✅ FAQ de preguntas difíciles
- ✅ Seguimiento de progreso personalizado

#### Módulo: Misioneros
- ✅ Agenda misional y programación
- ✅ Gestión de personas (investigadores, contactos)
- ✅ Planificación de lecciones y recursos
- ✅ Seguimiento de compromisos
- ✅ Centro de liderazgo (acceso a información de líderes)

#### Módulo: Miembros
- ✅ Dashboard visual
- ✅ Módulos de estudio con contenido doctrinal profundo
- ✅ Actividades interactivas con gamificación
- ✅ Guía de cuidado de nuevos conversos (7 secciones, 4 idiomas)
- ✅ Seguimiento de progreso (XP, niveles, rachas, insignias)
- ✅ Gestión de amigos
- ✅ Recursos de apoyo misionero
- ✅ Soporte completo i18n (ES, EN, FR, PT)

#### Módulo Adicional: Líderes Misionales
- ✅ Estructura completa de roles (DL, LZ, AP)
- ✅ Servicios con localStorage (listos para migrar a Firestore)
- ✅ Hooks funcionales para todos los roles
- ✅ Pantallas totalmente operativas
- ✅ Centro de liderazgo para misioneros
- ✅ Publicación y distribución en tiempo real
- ✅ Sistema de compartir (WhatsApp, Email, Clipboard)
- ✅ Historial completo de todas las actividades

### ⏳ Próximas Mejoras

- 🔄 Migración a Firestore para sincronización en tiempo real
- 📄 Exportación a PDF de reportes y materiales
- 🔔 Notificaciones push para recordatorios importantes
- 📊 Analytics y métricas de progreso de investigadores
- 🌐 Sincronización offline
- 🎨 Mejoras de UI/UX y animaciones
- 🔐 Privacidad avanzada y permisos granulares
- 📱 Versión móvil nativa (React Native)

---

## 💡 Filosofía del Proyecto

Esta aplicación fue creada con el propósito de **ayudar a los investigadores** en su camino hacia el bautismo y la conversión. Todos los módulos y funcionalidades adicionales están diseñados para apoyar este objetivo principal:

- **Para Investigadores**: Herramientas directas para su crecimiento espiritual
- **Para Misioneros**: Recursos para enseñar y acompañar mejor a los investigadores
- **Para Miembros**: Guías para apoyar a nuevos conversos e investigadores
- **Para Líderes**: Herramientas de coordinación para capacitar misioneros que a su vez sirven mejor a los investigadores

**El enfoque siempre será: ¿Cómo podemos ayudar mejor a los investigadores a acercarse a Cristo?**

---

## 📄 Licencia

Este proyecto es de uso interno para misiones de La Iglesia de Jesucristo de los Santos de los Últimos Días.

---

**Designed & Architected by:** Víctor Ruiz Bello

*"Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres"* — Colosenses 3:23
