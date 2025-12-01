# Reunión de Zona - Implementación Completa

## 📦 Dependencias necesarias

Para que funcione esta funcionalidad, necesitas instalar Firebase:

```bash
npm install firebase
# o
yarn add firebase
```

## 🔧 Configuración

1. **Configura Firebase** en `src/config/firebaseConfig.ts`:
   - Obtén tus credenciales desde Firebase Console
   - Reemplaza los valores en `firebaseConfig`
   - O usa variables de entorno (recomendado para producción)

2. **Ajusta los parámetros** en `ZoneCouncilScreen.tsx`:
   - `missionId`: ID de la misión (desde contexto/auth)
   - `zoneId`: ID de la zona (desde contexto/auth)
   - `leaderId`: UID del líder de zona (desde contexto/auth)
   - `leaderName`: Nombre del líder de zona (desde contexto/auth)

## 📁 Archivos creados

- `src/types/zoneCouncil.ts` - Tipos TypeScript
- `src/hooks/useZoneCouncil.ts` - Hook personalizado con lógica de Firebase
- `src/screens/ZoneCouncilScreen.tsx` - Pantalla React Native lista para usar
- `src/config/firebaseConfig.ts` - Configuración de Firebase

## 🚀 Uso

```tsx
import { ZoneCouncilScreen } from '../screens/ZoneCouncilScreen';

// En tu navegador:
<ZoneCouncilScreen 
  route={{ 
    params: { 
      councilId: 'optional-existing-council-id' 
    } 
  }} 
/>
```

## ✨ Funcionalidades

- ✅ Guardar borrador
- ✅ Publicar a la zona (crea evento en `leadershipEvents`)
- ✅ Marcar como completada
- ✅ Compartir agenda (WhatsApp/correo)
- ✅ Carga automática si hay `councilId`
- ✅ Persistencia en Firestore (`zoneCouncils` collection)

## 📝 Notas

- Los datos se guardan en la colección `zoneCouncils` de Firestore
- Al publicar, se crea un evento en `leadershipEvents` para el Centro de Liderazgo
- La función `shareAgenda` usa `react-native` Share API

