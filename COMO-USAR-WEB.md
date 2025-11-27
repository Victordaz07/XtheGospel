# 🚀 Cómo Usar la Aplicación Web

## Opción 1: Configuración Rápida (Recomendada)

### Paso 1: Instalar dependencias web

```bash
# Renombrar el package.json actual para mantenerlo como respaldo
mv package.json package-native.json

# Usar el package.json de la aplicación web
mv package-web.json package.json

# Instalar todas las dependencias
npm install
```

### Paso 2: Configurar el HTML principal

```bash
# Renombrar el HTML de la app web
mv index-web.html index.html
```

### Paso 3: Ejecutar la aplicación

```bash
# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

---

## Opción 2: Mantener ambas versiones (Native + Web)

Si quieres mantener ambas versiones funcionando:

### Crear un proyecto separado para web

```bash
# Crear una carpeta nueva para la app web
mkdir app-web
cd app-web

# Copiar los archivos necesarios
cp -r ../src .
cp ../package-web.json ./package.json
cp ../vite.config.ts .
cp ../tsconfig-web.json ./tsconfig.json
cp ../tsconfig.node.json .
cp ../index-web.html ./index.html
cp -r ../i18n .
cp -r ../data .
cp -r ../assets ./public

# Instalar dependencias
npm install

# Ejecutar
npm run dev
```

---

## 📋 Comandos Disponibles

Una vez configurado, puedes usar:

```bash
# Desarrollo (con hot reload)
npm run dev

# Build para producción
npm run build

# Preview de la versión de producción
npm run preview

# Linting (si está configurado)
npm run lint
```

---

## 🎯 Uso de la Aplicación

1. **Abrir en el navegador**: `http://localhost:3000`

2. **Seleccionar rol**:
   - 👤 **Investigador**: Para aprender sobre el evangelio
   - 🙌 **Misionero**: Para enseñar el evangelio

3. **Navegación**:
   - Usa la barra de navegación inferior para cambiar entre secciones
   - Cada rol tiene sus propias pestañas

4. **Funcionalidades**:
   - 📖 **Lecciones**: Ver y completar lecciones
   - ✅ **Tareas**: Gestionar tareas
   - 📊 **Progreso**: Ver tu progreso en las lecciones
   - 👤 **Perfil**: Cambiar idioma y cerrar sesión

---

## 🔧 Solución de Problemas

### Error: "Cannot find module"
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 already in use"
```bash
# Cambiar el puerto en vite.config.ts
# O matar el proceso que usa el puerto 3000
```

### Los assets no cargan
```bash
# Mover assets a la carpeta public/
mkdir public
cp -r assets/* public/
```

### Error de TypeScript
```bash
# Verificar que tsconfig-web.json esté correcto
# Asegurarse de que todos los paths sean correctos
```

---

## 📁 Estructura Importante

```
proyecto/
├── src/                    # Código fuente de la app web
│   ├── components/         # Componentes reutilizables
│   ├── pages/             # Páginas principales
│   ├── layouts/           # Layouts con navegación
│   ├── context/           # Contextos de React
│   ├── services/          # Servicios (storage, etc.)
│   └── styles/            # Estilos globales
├── i18n/                   # Traducciones (compartido)
├── data/                   # Datos de lecciones (compartido)
├── assets/                 # Assets (imágenes, etc.)
├── index.html              # HTML principal
├── vite.config.ts          # Configuración de Vite
└── package.json            # Dependencias
```

---

## ✅ Verificación Rápida

Antes de ejecutar, verifica que tengas:

- ✅ `package.json` con las dependencias de Vite
- ✅ `index.html` en la raíz
- ✅ Carpeta `src/` con todo el código
- ✅ Carpetas `i18n/` y `data/` accesibles
- ✅ `vite.config.ts` configurado

---

## 🎉 ¡Listo!

Una vez que ejecutes `npm run dev`, deberías ver:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

¡Abre esa URL en tu navegador y disfruta de la aplicación! 🚀

