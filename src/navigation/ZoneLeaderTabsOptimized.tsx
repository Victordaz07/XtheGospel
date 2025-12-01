// src/navigation/ZoneLeaderTabsOptimized.tsx
// Versión optimizada con menos tabs (agrupa Notas y Mensajes en "Comunicación")
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ZoneCouncilScreen } from '../screens/ZoneCouncilScreen';
import { ZoneLeaderDashboardScreen } from '../screens/ZoneLeaderDashboardScreen';
import { ZoneExchangesScreen } from '../screens/ZoneExchangesScreen';
import { ZoneBaptismalInterviewsScreen } from '../screens/ZoneBaptismalInterviewsScreen';
import { ZoneLeaderCommunicationScreen } from '../screens/ZoneLeaderCommunicationScreen';
import { ZoneLeaderProfileScreen } from '../screens/ZoneLeaderProfileScreen';

const Tab = createMaterialTopTabNavigator();

export function ZoneLeaderTabsOptimized() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: '#F59E0B' },
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        tabBarActiveTintColor: '#F59E0B',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          textTransform: 'none',
        },
      }}
    >
      <Tab.Screen
        name="ZoneLeaderDashboard"
        component={ZoneLeaderDashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name="ZoneCouncil"
        component={ZoneCouncilScreen}
        options={{ title: 'Reunión de zona' }}
      />
      <Tab.Screen
        name="ZoneExchanges"
        component={ZoneExchangesScreen}
        options={{ title: 'Intercambios' }}
      />
      <Tab.Screen
        name="ZoneBaptismalInterviews"
        component={ZoneBaptismalInterviewsScreen}
        options={{ title: 'Entrevistas' }}
      />
      <Tab.Screen
        name="ZoneLeaderCommunication"
        component={ZoneLeaderCommunicationScreen}
        options={{ title: 'Comunicación' }}
      />
      <Tab.Screen
        name="ZoneLeaderProfile"
        component={ZoneLeaderProfileScreen}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}

