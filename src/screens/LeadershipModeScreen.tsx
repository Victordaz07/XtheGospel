// src/screens/LeadershipModeScreen.tsx
// Pantalla principal que muestra el modo de liderazgo según el rol del usuario
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { ZoneLeaderTabs } from '../navigation/ZoneLeaderTabs';
import { DistrictLeaderTabs } from '../navigation/DistrictLeaderTabs';
// TODO: Crear ApTabs cuando esté listo
// import { ApTabs } from '../navigation/ApTabs';

export const LeadershipModeScreen: React.FC = () => {
  const { user, loading } = useCurrentUser();
  const navigation = useNavigation<any>();

  // 🔁 SI EL USUARIO CAMBIÓ A "MISSIONARY", LO SACAMOS DE AQUÍ
  React.useEffect(() => {
    if (!loading && user && user.missionRole === 'missionary') {
      // Redirigir al stack principal de misionero
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'MissionaryApp',
            params: {
              screen: 'Inicio',
              params: { fromLeadership: true },
            },
          },
        ],
      });
    }
  }, [loading, user?.missionRole, navigation]);

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

  // Si el usuario es missionary, no mostrar nada (el useEffect lo redirigirá)
  if (user.missionRole === 'missionary') {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Redirigiendo...</Text>
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

