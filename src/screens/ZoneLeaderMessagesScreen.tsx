// src/screens/ZoneLeaderMessagesScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useLeaderMessageComposer } from '../hooks/useLeaderMessageComposer';
import { useLeaderMessagesForScope } from '../hooks/useLeaderMessagesForScope';

export const ZoneLeaderMessagesScreen: React.FC = () => {
  const { user, loading: loadingUser } = useCurrentUser();

  if (loadingUser || !user) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Cargando usuario…</Text>
      </View>
    );
  }

  if (user.missionRole !== 'zone_leader') {
    return (
      <View style={styles.center}>
        <Text>No tienes permiso para enviar mensajes de zona.</Text>
      </View>
    );
  }

  const {
    title,
    setTitle,
    body,
    setBody,
    scripture,
    setScripture,
    type,
    setType,
    scope,
    setScope,
    publish,
    saving,
    error,
  } = useLeaderMessageComposer({
    missionId: user.missionId,
    zoneId: user.zoneId,
    districtId: undefined,
    senderId: user.id,
    senderName: user.displayName,
    senderRole: 'zone_leader',
    defaultScope: 'zone',
  });

  const { messages, loading } = useLeaderMessagesForScope({
    missionId: user.missionId,
    zoneId: user.zoneId,
    districtId: undefined,
    scope: 'zone',
  });

  const handlePublish = async () => {
    await publish();
    setTitle('');
    setBody('');
    setScripture('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mensajes a la zona</Text>

      {/* Editor */}
      <View style={styles.editorCard}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Mensaje para la zona (ánimo, indicaciones, enfoque espiritual)"
          value={body}
          multiline
          onChangeText={setBody}
        />
        <TextInput
          style={styles.input}
          placeholder="Escritura opcional"
          value={scripture}
          onChangeText={setScripture}
        />

        {/* Scope simple: misión / zona */}
        <View style={styles.scopeRow}>
          <TouchableOpacity
            style={[
              styles.scopeBtn,
              scope === 'zone' && styles.scopeBtnActive,
            ]}
            onPress={() => setScope('zone')}
          >
            <Text
              style={[
                styles.scopeText,
                scope === 'zone' && styles.scopeTextActive,
              ]}
            >
              A la zona
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.scopeBtn,
              scope === 'mission' && styles.scopeBtnActive,
            ]}
            onPress={() => setScope('mission')}
          >
            <Text
              style={[
                styles.scopeText,
                scope === 'mission' && styles.scopeTextActive,
              ]}
            >
              A toda la misión
            </Text>
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={styles.publishBtn}
          onPress={handlePublish}
          disabled={saving}
        >
          <Text style={styles.publishText}>Publicar mensaje</Text>
        </TouchableOpacity>
      </View>

      {/* Historial */}
      <Text style={styles.sectionTitle}>Mensajes recientes</Text>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.empty}>Aún no has enviado mensajes.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {item.scripture ? (
                <Text style={styles.scripture}>{item.scripture}</Text>
              ) : null}
              <Text style={styles.cardBody} numberOfLines={3}>
                {item.body}
              </Text>
              <Text style={styles.meta}>
                Alcance: {item.targetScope} – {item.createdAt?.toDate?.().toLocaleDateString?.() || ''}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  editorCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  scopeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  scopeBtn: {
    flex: 1,
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  scopeBtnActive: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  scopeText: { fontSize: 12, color: '#111827' },
  scopeTextActive: { color: '#fff', fontWeight: '600' },
  publishBtn: {
    marginTop: 6,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
  },
  publishText: { color: '#fff', fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  empty: { marginTop: 8, color: '#777' },
  card: {
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardTitle: { fontWeight: '600', marginBottom: 2 },
  scripture: { fontSize: 12, fontStyle: 'italic', marginBottom: 2 },
  cardBody: { fontSize: 13, color: '#374151' },
  meta: { fontSize: 11, color: '#6b7280', marginTop: 4 },
  error: { color: 'red', marginBottom: 4 },
});

