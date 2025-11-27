# 🚀 Guía de Configuración - Aplicación Web

## Pasos para convertir este proyecto a una aplicación web completa

### 1. Instalar dependencias web

```bash
# Renombrar el package.json actual (opcional, para mantener ambos)
mv package.json package-native.json

# Usar el nuevo package.json para web
mv package-web.json package.json

# Instalar dependencias
npm install
```

### 2. Configurar Vite

El archivo `vite.config.ts` ya está configurado. Solo necesitas asegurarte de que `index-web.html` esté en la raíz del proyecto.

### 3. Actualizar el HTML de entrada

Renombra `index-web.html` a `index.html` o actualiza `vite.config.ts` para usar `index-web.html`:

```typescript
// En vite.config.ts, agregar:
export default defineConfig({
  // ... otras configuraciones
  root: '.',
  // Si quieres usar index-web.html:
  // build: {
  //   rollupOptions: {
  //     input: 'index-web.html'
  //   }
  // }
})
```

O simplemente renombra:
```bash
mv index-web.html index.html
```

### 4. Copiar assets

Asegúrate de que los assets estén accesibles. Puedes:
- Moverlos a `public/` (recomendado para Vite)
- O mantenerlos en `assets/` y configurar `publicDir` en `vite.config.ts`

### 5. Ejecutar la aplicación

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 📁 Estructura creada

```
src/
├── components/          # Componentes reutilizables (Button, LanguagePicker, etc.)
├── context/            # Contextos (Auth, I18n, Progress) - adaptados para web
├── pages/              # Páginas principales
│   ├── investigator/   # Páginas del investigador
│   ├── missionary/     # Páginas del misionero
│   └── AuthPage.tsx   # Página de autenticación
├── layouts/           # Layouts con navegación
├── router/             # Configuración de rutas
├── services/           # Servicios (storage, notes, tasks, qr)
├── styles/             # Estilos globales
├── constants/          # Constantes y temas
├── utils/              # Utilidades (storage web)
├── data/               # Re-exporta lessonsData.ts
├── App.tsx             # Componente principal
└── main.tsx            # Punto de entrada
```

## ✅ Lo que está migrado

- ✅ Todos los contextos (Auth, I18n, Progress)
- ✅ Todos los servicios (storage, notes, tasks, qr)
- ✅ Componentes base (Button, LanguagePicker, RoleButton)
- ✅ Navegación con React Router
- ✅ Layouts para investigador y misionero
- ✅ Páginas principales (Home, Lessons, Progress, Profile, Tasks)
- ✅ Sistema de autenticación
- ✅ Sistema de progreso de lecciones
- ✅ Sistema de tareas
- ✅ Traducciones (i18n)

## 🔄 Cambios principales desde React Native

1. **Navegación**: React Navigation → React Router
2. **Storage**: AsyncStorage → localStorage
3. **Componentes**: React Native → HTML/CSS
4. **Estilos**: StyleSheet → CSS files
5. **Iconos**: react-native-vector-icons → Emojis/Unicode (puedes cambiar a una librería de iconos web)

## 🎨 Personalización

- Los estilos están en archivos `.css` junto a cada componente
- El tema está en `src/constants/theme.ts`
- Los estilos globales están en `src/styles/global.css`

## 📝 Próximos pasos (opcionales)

1. Agregar más páginas específicas (detalles de lecciones, quiz interactivo, etc.)
2. Mejorar el diseño con animaciones
3. Agregar iconos web (Font Awesome, Material Icons, etc.)
4. Implementar PWA (Progressive Web App)
5. Agregar tests

## 🐛 Solución de problemas

Si hay errores de importación:
- Verifica que los paths en `tsconfig-web.json` sean correctos
- Asegúrate de que `data/lessonsData.ts` exista y sea accesible
- Verifica que los archivos JSON de i18n estén en `i18n/`

Si los assets no cargan:
- Mueve los assets a `public/` o configura `publicDir` en `vite.config.ts`

