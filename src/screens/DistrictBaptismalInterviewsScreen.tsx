// src/screens/DistrictBaptismalInterviewsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useDistrictBaptismalInterviewsList } from '../hooks/useDistrictBaptismalInterviewsList';

export const DistrictBaptismalInterviewsScreen: React.FC = () => {
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
        <Text>No tienes permiso para ver las entrevistas de distrito.</Text>
      </View>
    );
  }

  const { items, loading } = useDistrictBaptismalInterviewsList(
    user.missionId,
    user.zoneId,
    user.districtId || 'MI-DISTRITO',
  );

  const openInterview = (id?: string) => {
    navigation.navigate('DistrictBaptismalInterviewDetail', { interviewId: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Entrevistas bautismales</Text>
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => openInterview(undefined)}
        >
          <Text style={styles.newText}>+ Nueva</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text>Cargando entrevistas…</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.empty}>
              Aún no hay entrevistas registradas para el distrito.
            </Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => openInterview(item.id)}
              style={styles.card}
            >
              <Text style={styles.cardTitle}>
                {item.personName || 'Sin nombre'} – {item.date || 'Fecha ?'}
              </Text>
              <Text style={styles.cardLine}>
                Área: {item.teachingArea || '—'}
              </Text>
              <Text style={styles.cardLineSmall}>
                Estado: {item.status || 'draft'} – Entrevistador: {item.interviewLeaderName || '—'}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: '700' },
  newButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#3B82F6',
  },
  newText: { color: '#fff', fontWeight: '600' },
  empty: { marginTop: 8, color: '#777' },
  card: {
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardTitle: { fontWeight: '600', marginBottom: 2 },
  cardLine: { fontSize: 13 },
  cardLineSmall: { fontSize: 11, color: '#777' },
});

