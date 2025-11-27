# Aplicación Web - Misioneros e Investigadores

Esta es la versión web completa de la aplicación, construida con React, TypeScript y Vite.

## 🚀 Inicio Rápido

### Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:3000`

### Build para Producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

### Preview de Producción

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
├── context/         # Contextos de React (Auth, I18n, Progress)
├── pages/           # Páginas principales
├── layouts/         # Layouts con navegación
├── router/          # Configuración de rutas
├── services/        # Servicios (storage, notes, etc.)
├── styles/          # Estilos globales
├── constants/       # Constantes y temas
├── utils/           # Utilidades
└── data/            # Datos estáticos

```

## 🛠️ Tecnologías

- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **CSS** - Estilos

## 📝 Notas

- Los datos de lecciones se importan desde `data/lessonsData.ts`
- Las traducciones están en `i18n/`
- El almacenamiento usa `localStorage` del navegador
- Los assets están en `assets/`

## 🔄 Migración desde React Native

Esta aplicación web mantiene:
- ✅ Toda la lógica de negocio
- ✅ Todos los datos y traducciones
- ✅ La estructura de navegación
- ✅ Los contextos y servicios

Cambios principales:
- React Navigation → React Router
- AsyncStorage → localStorage
- React Native Components → HTML/CSS
- StyleSheet → CSS Modules/Archivos CSS

