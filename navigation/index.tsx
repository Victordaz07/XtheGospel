import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import AuthScreen from '../app/(auth)/AuthScreen';

// Importar pantallas del investigador
import InvestigatorHome from '../app/(tabs)/investigator/index';
import InvestigatorLessons from '../app/(tabs)/investigator/lessons';
import InvestigatorProgress from '../app/(tabs)/investigator/progress';
import InvestigatorBaptism from '../app/(tabs)/investigator/baptism';
import InvestigatorProfile from '../app/(tabs)/investigator/profile';

// Importar pantallas del misionero
import MissionaryHome from '../app/(tabs)/missionary/index';
import MissionaryAgenda from '../app/(tabs)/missionary/agenda';
import MissionaryLessons from '../app/(tabs)/missionary/lessons';
import MissionaryPeople from '../app/(tabs)/missionary/people';
import MissionaryProfile from '../app/(tabs)/missionary/profile';

// Importar la nueva estructura de lecciones
import LessonsNavigator from './LessonsNavigator';

// Importar la nueva pantalla de Tareas
import TasksScreen from '../screens/TasksScreen';

// Quiz y Reflexiones ahora están dentro del módulo de Lecciones

// QR Scanner removido temporalmente

// Importación segura de LessonDetail - RUTA CORREGIDA
let LessonDetail: React.ComponentType<any>;

try {
  const lessonDetailModule = require('../screens/LessonDetail');
  LessonDetail = lessonDetailModule.default || lessonDetailModule;
} catch (error) {
  console.warn('LessonDetail not found, using fallback component');
  LessonDetail = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla de lección no disponible</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tipos para la navegación
export type RootStackParamList = {
  InvestigatorApp: undefined;
  MissionaryApp: undefined;
  Auth: undefined;
  LessonDetail: { lessonId: string };
  LessonsNavigator: undefined;
};

// Navigator para investigador
const InvestigatorTabs = () => {
  const { t } = useI18n();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5, paddingTop: 5 },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={InvestigatorHome}
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Lecciones"
        component={LessonsNavigator}
        options={{
          title: t('tabs.lessons'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tareas"
        component={TasksScreen}
        options={{
          title: t('tabs.tasks'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-checks" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Progreso"
        component={InvestigatorProgress}
        options={{
          title: t('tabs.progress'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-line" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Bautismo"
        component={InvestigatorBaptism}
        options={{
          title: t('tabs.baptism'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="water" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={InvestigatorProfile}
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Navigator para misionero
const MissionaryTabs = () => {
  const { t } = useI18n();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5, paddingTop: 5 },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={MissionaryHome}
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Agenda"
        component={MissionaryAgenda}
        options={{
          title: t('tabs.agenda'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Personas"
        component={MissionaryPeople}
        options={{
          title: t('tabs.people'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tareas"
        component={TasksScreen}
        options={{
          title: t('tabs.tasks'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-checks" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Lecciones"
        component={LessonsNavigator}
        options={{
          title: t('tabs.lessons'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={MissionaryProfile}
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Componente de carga
const LoadingScreen = () => (
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={{ marginTop: 10, color: '#007AFF', fontSize: 16 }}>Cargando aplicación...</Text>
  </View>
);

// Stack navigator principal
const MainStack = () => {
  const { userRole, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userRole ? (
        userRole === 'investigator' ? (
          <>
            <Stack.Screen name="InvestigatorApp" component={InvestigatorTabs} />
            <Stack.Screen
              name="LessonDetail"
              component={LessonDetail}
              options={{
                headerShown: true,
                title: 'Detalle de Lección',
                headerStyle: {
                  backgroundColor: '#007AFF',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            {/* QR Scanner removido temporalmente */}
          </>
        ) : (
          <>
            <Stack.Screen name="MissionaryApp" component={MissionaryTabs} />
            <Stack.Screen
              name="LessonDetail"
              component={LessonDetail}
              options={{
                headerShown: true,
                title: 'Detalle de Lección',
                headerStyle: {
                  backgroundColor: '#007AFF',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            {/* QR Scanner removido temporalmente */}
          </>
        )
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ animationEnabled: false }}
        />
      )}
    </Stack.Navigator>
  );
};

// Navigator principal
const AppNavigator: React.FC = () => {
  return <MainStack />;
};

export default AppNavigator;