// src/screens/LeadershipCenterFeedScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useLeadershipFeed } from '../hooks/useLeadershipFeed';

export const LeadershipCenterFeedScreen: React.FC = () => {
  const { user, loading: loadingUser } = useCurrentUser();

  if (loadingUser || !user) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Cargando usuario…</Text>
      </View>
    );
  }

  const { events, messages, loading } = useLeadershipFeed({
    missionId: user.missionId,
    zoneId: user.zoneId,
    districtId: user.districtId,
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Cargando información de liderazgo…</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Centro de Liderazgo</Text>
      <Text style={styles.subtitle}>
        Aquí verás anuncios, reuniones y mensajes de tus líderes misionales.
      </Text>

      {/* Eventos / Reuniones */}
      <Text style={styles.sectionTitle}>Reuniones y eventos próximos</Text>
      {events.length === 0 ? (
        <Text style={styles.empty}>No hay reuniones próximas registradas.</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardLine}>
                {item.date} {item.time ? `• ${item.time}` : ''}
              </Text>
              {item.location ? (
                <Text style={styles.cardLine}>Lugar: {item.location}</Text>
              ) : null}
              {(item.leaderName || item.leaderRole) && (
                <Text style={styles.cardMeta}>
                  Dirigido por: {item.leaderName || 'Líder'}{' '}
                  {item.leaderRole ? `(${formatearRol(item.leaderRole)})` : ''}
                </Text>
              )}
              {item.description ? (
                <Text style={styles.cardBody} numberOfLines={3}>
                  {item.description}
                </Text>
              ) : null}
            </View>
          )}
        />
      )}

      {/* Mensajes */}
      <Text style={styles.sectionTitle}>Mensajes de tus líderes</Text>
      {messages.length === 0 ? (
        <Text style={styles.empty}>No hay mensajes recientes.</Text>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardMeta}>
                {item.senderName} – {formatearRol(item.senderRole)}
              </Text>
              {item.scripture ? (
                <Text style={styles.scripture}>{item.scripture}</Text>
              ) : null}
              <Text style={styles.cardBody}>{item.body}</Text>
            </View>
          )}
        />
      )}

      <View style={{ height: 24 }} />
    </ScrollView>
  );
};

function formatearRol(role?: string): string {
  if (!role) return '';

  switch (role) {
    case 'district_leader':
      return 'Líder de distrito';
    case 'zone_leader':
      return 'Líder de zona';
    case 'assistant_to_president':
      return 'Asistente del presidente';
    case 'mission_president':
      return 'Presidente de misión';
    default:
      return role;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#555', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 12, marginBottom: 4 },
  empty: { fontSize: 13, color: '#777', marginVertical: 4 },
  card: {
    marginTop: 6,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  cardTitle: { fontWeight: '600', fontSize: 14, marginBottom: 2 },
  cardLine: { fontSize: 12, color: '#374151' },
  cardMeta: { fontSize: 11, color: '#6b7280', marginTop: 2 },
  cardBody: { fontSize: 13, color: '#111827', marginTop: 4 },
  scripture: { fontSize: 12, fontStyle: 'italic', color: '#4b5563', marginTop: 2 },
});

