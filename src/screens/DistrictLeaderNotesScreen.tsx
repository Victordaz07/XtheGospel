// src/screens/DistrictLeaderNotesScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { usePersonalNote } from '../hooks/usePersonalNote';
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const DistrictLeaderNotesScreen: React.FC = () => {
  const { user, loading: loadingUser } = useCurrentUser();
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState<any[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);

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
        <Text>No tienes permiso para ver estas notas.</Text>
      </View>
    );
  }

  // hook para la nota que estamos editando / creando
  const {
    form,
    updateField,
    saveNote,
    promoteToZoneMessage,
    saving,
    error,
  } = usePersonalNote({
    noteId: editingId,
    missionId: user.missionId,
    zoneId: user.zoneId,
    districtId: user.districtId || 'MI-DISTRITO',
    leaderId: user.id,
    leaderName: user.displayName,
    leaderRole: 'district_leader',
  });

  // listar notas personales de este líder
  useEffect(() => {
    const col = collection(db, 'personalNotes');
    const q = query(
      col,
      where('missionId', '==', user.missionId),
      where('zoneId', '==', user.zoneId),
      where('districtId', '==', user.districtId || 'MI-DISTRITO'),
      where('leaderId', '==', user.id),
      orderBy('createdAt', 'desc'),
    );

    const unsub = onSnapshot(q, snap => {
      const rows: any[] = [];
      snap.forEach(d => rows.push({ id: d.id, ...(d.data() as any) }));
      setNotes(rows);
      setLoadingNotes(false);
    }, (error) => {
      console.error('Error loading notes:', error);
      setLoadingNotes(false);
    });

    return unsub;
  }, [user.missionId, user.zoneId, user.districtId, user.id]);

  const startNew = () => {
    setEditingId(undefined);
    updateField('title', '');
    updateField('body', '');
  };

  const startEdit = (noteId: string) => {
    setEditingId(noteId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas personales del distrito</Text>

      {/* Editor simple */}
      <View style={styles.editorCard}>
        <TextInput
          style={styles.input}
          placeholder="Título de la nota"
          value={form.title}
          onChangeText={text => updateField('title', text)}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Impresiones espirituales, ideas para el distrito, notas sobre misioneros, etc."
          multiline
          value={form.body}
          onChangeText={text => updateField('body', text)}
        />
        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={saveNote}
            disabled={saving}
          >
            <Text style={styles.btnText}>
              {editingId ? 'Guardar cambios' : 'Guardar nota'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={startNew}
          >
            <Text style={styles.secondaryText}>Nueva</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.shareBtn}
          onPress={promoteToZoneMessage}
        >
          <Text style={styles.shareText}>
            Compartir como mensaje al distrito
          </Text>
        </TouchableOpacity>
      </View>

      {/* Historial */}
      <Text style={styles.sectionTitle}>Historial de notas</Text>
      {loadingNotes ? (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.empty}>No tienes notas aún.</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => startEdit(item.id)}
              style={styles.card}
            >
              <Text style={styles.cardTitle}>{item.title || 'Sin título'}</Text>
              <Text
                style={styles.cardLine}
                numberOfLines={2}
              >
                {item.body}
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
  row: { flexDirection: 'row', gap: 8, marginTop: 4 },
  primaryBtn: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
  },
  secondaryBtn: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  btnText: { color: '#fff', fontWeight: '600' },
  secondaryText: { color: '#111827', fontWeight: '500' },
  shareBtn: {
    marginTop: 6,
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
  },
  shareText: { fontSize: 12, color: '#4b5563' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 8 },
  empty: { marginTop: 8, color: '#777' },
  card: {
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardTitle: { fontWeight: '600', marginBottom: 4 },
  cardLine: { fontSize: 13, color: '#374151' },
  error: { color: 'red', marginBottom: 4 },
});

