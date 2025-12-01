// src/screens/LeadershipModeScreen.tsx
// Pantalla principal que muestra el modo de liderazgo según el rol del usuario
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { ZoneLeaderTabs } from '../navigation/ZoneLeaderTabs';
import { DistrictLeaderTabs } from '../navigation/DistrictLeaderTabs';
// TODO: Crear ApTabs cuando esté listo
// import { ApTabs } from '../navigation/ApTabs';

export const LeadershipModeScreen: React.FC = () => {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Cargando usuario…</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>No se pudo cargar la información del usuario.</Text>
      </View>
    );
  }

  // Mostrar tabs según el rol de liderazgo
  if (user.missionRole === 'zone_leader') {
    return <ZoneLeaderTabs />;
  }

  if (user.missionRole === 'district_leader') {
    return <DistrictLeaderTabs />;
  }

  // TODO: Cuando esté creado ApTabs con MaterialTopTabs
  // if (user.missionRole === 'assistant_to_president') {
  //   return <ApTabs />;
  // }

  return (
    <View style={styles.center}>
      <Text>No tienes asignación de liderazgo activa.</Text>
      <Text style={styles.hint}>
        Tu rol actual: {user.missionRole || 'No definido'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
});

