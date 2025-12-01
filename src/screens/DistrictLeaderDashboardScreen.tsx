// src/screens/DistrictLeaderDashboardScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useDistrictLeaderDashboard } from '../hooks/useDistrictLeaderDashboard';

export const DistrictLeaderDashboardScreen: React.FC = () => {
  const { user, loading: loadingUser } = useCurrentUser();
  const navigation = useNavigation<any>();

  if (loadingUser || !user) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Cargando usuario…</Text>
      </View>
    );
  }

  if (user.missionRole !== 'district_leader') {
    return (
      <View style={styles.center}>
        <Text>No tienes permiso para ver este dashboard.</Text>
      </View>
    );
  }

  const { data, loading } = useDistrictLeaderDashboard({
    missionId: user.missionId,
    zoneId: user.zoneId,
    districtId: user.districtId || 'MI-DISTRITO',
  });

  const goTo = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Distrito – {user.districtName || 'Mi distrito'}</Text>
      <Text style={styles.subtitle}>Líder: {user.displayName}</Text>

      {/* Acciones rápidas */}
      <View style={styles.quickRow}>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => goTo('DistrictCouncil')}
        >
          <Text style={styles.quickTitle}>Reunión de distrito</Text>
          <Text style={styles.quickHint}>Planear o editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => goTo('DistrictExchanges')}
        >
          <Text style={styles.quickTitle}>Intercambios</Text>
          <Text style={styles.quickHint}>Ver y programar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickRow}>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => goTo('DistrictBaptismalInterviews')}
        >
          <Text style={styles.quickTitle}>Entrevistas</Text>
          <Text style={styles.quickHint}>Revisar agenda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => goTo('DistrictLeaderMessages')}
        >
          <Text style={styles.quickTitle}>Mensajes</Text>
          <Text style={styles.quickHint}>Enviar al distrito</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text>Cargando eventos del distrito…</Text>
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Próximos eventos</Text>
          <FlatList
            data={data.upcomingEvents}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              <Text style={styles.empty}>No hay eventos próximos.</Text>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardLine}>
                  {item.date} – {item.time || 'Horario por confirmar'}
                </Text>
                <Text style={styles.cardLine}>{item.location}</Text>
                <Text style={styles.cardLineSmall}>
                  Tipo: {item.type} – Lider: {item.leaderName}
                </Text>
              </View>
            )}
          />

          <Text style={styles.sectionTitle}>Mensajes recientes</Text>
          <FlatList
            data={data.recentMessages}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              <Text style={styles.empty}>No hay mensajes recientes.</Text>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardLineSmall}>
                  {item.senderName} – {item.senderRole}
                </Text>
                <Text numberOfLines={2} style={styles.cardLine}>
                  {item.body}
                </Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { fontSize: 14, marginBottom: 12, color: '#555' },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  quickButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eef2ff',
  },
  quickTitle: { fontWeight: '600', marginBottom: 2 },
  quickHint: { fontSize: 12, color: '#555' },
  sectionTitle: { marginTop: 16, fontSize: 16, fontWeight: '600' },
  empty: { marginTop: 4, color: '#777' },
  card: {
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardTitle: { fontWeight: '600', marginBottom: 4 },
  cardLine: { fontSize: 13 },
  cardLineSmall: { fontSize: 11, color: '#777' },
});

