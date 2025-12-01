// src/navigation/ZoneLeaderTabs.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ZoneCouncilScreen } from '../screens/ZoneCouncilScreen';
import { ZoneLeaderDashboardScreen } from '../screens/ZoneLeaderDashboardScreen';
import { ZoneExchangesScreen } from '../screens/ZoneExchangesScreen';
import { ZoneBaptismalInterviewsScreen } from '../screens/ZoneBaptismalInterviewsScreen';
import { ZoneLeaderNotesScreen } from '../screens/ZoneLeaderNotesScreen';
import { ZoneLeaderMessagesScreen } from '../screens/ZoneLeaderMessagesScreen';
import { ZoneLeaderProfileScreen } from '../screens/ZoneLeaderProfileScreen';

const Tab = createMaterialTopTabNavigator();

export function ZoneLeaderTabs() {
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
        name="ZoneLeaderNotes"
        component={ZoneLeaderNotesScreen}
        options={{ title: 'Notas' }}
      />
      <Tab.Screen
        name="ZoneLeaderMessages"
        component={ZoneLeaderMessagesScreen}
        options={{ title: 'Mensajes' }}
      />
      <Tab.Screen
        name="ZoneLeaderProfile"
        component={ZoneLeaderProfileScreen}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}

