// src/navigation/DistrictLeaderTabs.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DistrictCouncilScreen } from '../screens/DistrictCouncilScreen';
import { DistrictLeaderDashboardScreen } from '../screens/DistrictLeaderDashboardScreen';
import { DistrictExchangesScreen } from '../screens/DistrictExchangesScreen';
import { DistrictBaptismalInterviewsScreen } from '../screens/DistrictBaptismalInterviewsScreen';
import { DistrictLeaderNotesScreen } from '../screens/DistrictLeaderNotesScreen';
import { DistrictLeaderMessagesScreen } from '../screens/DistrictLeaderMessagesScreen';
import { DistrictLeaderProfileScreen } from '../screens/DistrictLeaderProfileScreen';

const Tab = createMaterialTopTabNavigator();

export function DistrictLeaderTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: '#3B82F6' },
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          textTransform: 'none',
        },
      }}
    >
      <Tab.Screen
        name="DistrictLeaderDashboard"
        component={DistrictLeaderDashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name="DistrictCouncil"
        component={DistrictCouncilScreen}
        options={{ title: 'Reunión de distrito' }}
      />
      <Tab.Screen
        name="DistrictExchanges"
        component={DistrictExchangesScreen}
        options={{ title: 'Intercambios' }}
      />
      <Tab.Screen
        name="DistrictBaptismalInterviews"
        component={DistrictBaptismalInterviewsScreen}
        options={{ title: 'Entrevistas' }}
      />
      <Tab.Screen
        name="DistrictLeaderNotes"
        component={DistrictLeaderNotesScreen}
        options={{ title: 'Notas' }}
      />
      <Tab.Screen
        name="DistrictLeaderMessages"
        component={DistrictLeaderMessagesScreen}
        options={{ title: 'Mensajes' }}
      />
      <Tab.Screen
        name="DistrictLeaderProfile"
        component={DistrictLeaderProfileScreen}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}

