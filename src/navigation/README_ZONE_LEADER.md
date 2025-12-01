# Líder de Zona - Implementación Completa

## ✅ Lo que está implementado

### 🔐 Protección por Rol
- **ZoneCouncilScreen** y todas las pantallas tienen guard de permisos
- Solo usuarios con `missionRole === 'zone_leader'` pueden acceder
- Todas las pantallas verifican el rol antes de mostrar contenido

### 📱 Pantallas Creadas
1. **ZoneLeaderDashboardScreen** - Dashboard con eventos y mensajes
2. **ZoneCouncilScreen** - Reunión de zona completa (ya existía, ahora protegida)
3. **ZoneExchangesScreen** - Listado de intercambios
4. **ZoneBaptismalInterviewsScreen** - Listado de entrevistas
5. **ZoneLeaderNotesScreen** - Notas personales
6. **ZoneLeaderMessagesScreen** - Mensajes a la zona/misión

### 🎣 Hooks Creados
1. **useCurrentUser** - Obtiene usuario con `missionId`, `zoneId`, `missionRole`, etc.
2. **useZoneLeaderDashboard** - Datos del dashboard (eventos, mensajes)
3. **useZoneExchangesList** - Lista intercambios de la zona
4. **useZoneBaptismalInterviewsList** - Lista entrevistas de la zona
5. **usePersonalNote** - Gestión de notas personales
6. **useLeaderMessageComposer** - Crear mensajes
7. **useLeaderMessagesForScope** - Listar mensajes por alcance

### 🧭 Navegación
- **ZoneLeaderTabs** - Navigator con todas las pantallas del Líder de Zona
- **LeadershipModeScreen** - Pantalla principal que muestra tabs según rol

## 🔧 Integración en tu App

### 1. Agregar a tu navegador principal

```tsx
// navigation/index.tsx o donde tengas tu Stack Navigator
import { LeadershipModeScreen } from '../screens/LeadershipModeScreen';

// En tu Stack Navigator:
<Stack.Screen
  name="LeadershipMode"
  component={LeadershipModeScreen}
  options={{ title: 'Modo Liderazgo' }}
/>
```

### 2. Configurar useCurrentUser

El hook `useCurrentUser` actualmente:
- Lee de `AsyncStorage` si hay un usuario guardado
- Si no, crea uno temporal basado en `userRole` del `AuthContext`
- **TODO**: En producción, debe leer de Firebase Auth + Firestore

Para producción, actualiza `useCurrentUser` para:
```tsx
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

// Obtener usuario de Firebase Auth
const [firebaseUser, loadingAuth] = useAuthState(auth);

// Obtener datos de Firestore
const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
const userData = userDoc.data();
```

### 3. Configurar datos del usuario

Cuando un usuario inicia sesión, guarda en AsyncStorage (temporal) o Firestore:

```tsx
await AsyncStorage.setItem('currentUser', JSON.stringify({
  id: user.uid,
  displayName: user.displayName,
  missionRole: 'zone_leader',
  missionId: 'MI-MISION',
  zoneId: 'MI-ZONA',
  zoneName: 'Zona Norte',
}));
```

### 4. Agregar dependencias (si faltan)

```bash
npm install @react-navigation/material-top-tabs react-native-tab-view
# o
yarn add @react-navigation/material-top-tabs react-native-tab-view
```

## 📋 Estructura de Datos en Firestore

### Colecciones necesarias:
- `zoneCouncils` - Reuniones de zona
- `leadershipEvents` - Eventos de liderazgo
- `leaderMessages` - Mensajes de líderes
- `exchanges` - Intercambios
- `baptismalInterviews` - Entrevistas bautismales
- `personalNotes` - Notas personales

### Índices necesarios en Firestore:
```
leadershipEvents:
  - missionId (asc) + zoneId (asc) + status (asc) + date (asc)

leaderMessages:
  - missionId (asc) + zoneId (asc) + status (asc) + createdAt (desc)

exchanges:
  - missionId (asc) + zoneId (asc) + date (desc)

baptismalInterviews:
  - missionId (asc) + zoneId (asc) + date (desc)

personalNotes:
  - missionId (asc) + zoneId (asc) + leaderId (asc) + createdAt (desc)
```

## 🚀 Uso

Una vez integrado, cuando un usuario con `missionRole === 'zone_leader'` acceda a `LeadershipModeScreen`, automáticamente verá las tabs del Líder de Zona.

## 🔒 Seguridad

- Todas las pantallas verifican el rol antes de mostrar contenido
- Los hooks filtran datos por `missionId` y `zoneId` del usuario
- Firestore Security Rules deben validar que:
  - Solo ZL pueden escribir en `zoneCouncils` de su zona
  - Solo pueden leer datos de su `missionId` y `zoneId`

## 📝 Próximos Pasos

1. ✅ Líder de Zona - COMPLETO
2. ⏳ Líder de Distrito - Pendiente
3. ⏳ Asistente del Presidente - Pendiente

