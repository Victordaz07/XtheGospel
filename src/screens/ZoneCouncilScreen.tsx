// src/screens/ZoneCouncilScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useZoneCouncil } from '../hooks/useZoneCouncil';
import { useCurrentUser } from '../hooks/useCurrentUser';

interface Props {
  route: {
    params?: {
      councilId?: string;
    };
  };
}

export const ZoneCouncilScreen: React.FC<Props> = ({ route }) => {
  const { user, loading: loadingUser } = useCurrentUser();
  const councilId = route.params?.councilId;

  if (loadingUser) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Cargando usuario…</Text>
      </View>
    );
  }

  if (!user || user.missionRole !== 'zone_leader') {
    return (
      <View style={styles.center}>
        <Text>No tienes permiso para ver esta pantalla.</Text>
        <Text style={styles.errorText}>
          Esta funcionalidad está disponible solo para Líderes de Zona.
        </Text>
      </View>
    );
  }

  const {
    form,
    updateField,
    updateNestedField,
    loading,
    saving,
    error,
    saveDraft,
    publishToZone,
    completeCouncil,
    shareAgenda,
  } = useZoneCouncil({
    councilId,
    missionId: user.missionId,
    zoneId: user.zoneId,
    leaderId: user.id,
    leaderName: user.displayName,
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Cargando reunión de zona…</Text>
      </View>
    );
  }

  const isCompleted = form.status === 'completed';

  return (
    <View style={styles.container}>
      {/* Acciones superiores */}
      <View style={styles.actionsRow}>
        <Button title="Guardar borrador" onPress={saveDraft} disabled={saving} />
        <Button
          title="Publicar a la zona"
          onPress={publishToZone}
          disabled={saving}
        />
      </View>
      <View style={styles.actionsRow}>
        <Button
          title="Marcar como completada"
          onPress={completeCouncil}
          disabled={saving || form.status !== 'published'}
        />
        <Button title="Compartir agenda" onPress={shareAgenda} />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* HEADER BÁSICO */}
        <Text style={styles.sectionTitle}>Información general</Text>
        <TextInput
          style={styles.input}
          placeholder="Título (opcional)"
          value={form.title}
          onChangeText={text => updateField('title', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha (YYYY-MM-DD)"
          value={form.date}
          onChangeText={text => updateField('date', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Hora (HH:MM)"
          value={form.time}
          onChangeText={text => updateField('time', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Lugar"
          value={form.location}
          onChangeText={text => updateField('location', text)}
        />

        {/* RESUMEN */}
        <Text style={styles.sectionTitle}>Resumen de la reunión</Text>
        <TextInput
          style={styles.input}
          placeholder="Enfoque espiritual de la zona"
          value={form.summary.spiritualFocus}
          onChangeText={text =>
            updateNestedField('summary', 'spiritualFocus', text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Tema de capacitación principal"
          value={form.summary.trainingTopic}
          onChangeText={text =>
            updateNestedField('summary', 'trainingTopic', text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Meta principal de la zona"
          value={form.summary.mainGoal}
          onChangeText={text =>
            updateNestedField('summary', 'mainGoal', text)
          }
        />

        {/* INICIO ESPIRITUAL */}
        <Text style={styles.sectionTitle}>Inicio espiritual</Text>
        <TextInput
          style={styles.input}
          placeholder="Escritura / cita base"
          value={form.spiritualStart.scripture}
          onChangeText={text =>
            updateNestedField('spiritualStart', 'scripture', text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Idea central"
          value={form.spiritualStart.ideaCentral}
          onChangeText={text =>
            updateNestedField('spiritualStart', 'ideaCentral', text)
          }
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Aplicación práctica para la zona"
          multiline
          value={form.spiritualStart.application}
          onChangeText={text =>
            updateNestedField('spiritualStart', 'application', text)
          }
        />

        {/* PROGRESO POR DISTRITO */}
        <Text style={styles.sectionTitle}>Progreso por distrito</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Resumen por distrito (nombres, tendencias, milagros)"
          multiline
          value={form.progressByDistrict}
          onChangeText={text => updateField('progressByDistrict', text)}
        />

        {/* EXPERIENCIAS */}
        <Text style={styles.sectionTitle}>Experiencias espirituales</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Milagros y testimonios que quieras destacar"
          multiline
          value={form.experiences}
          onChangeText={text => updateField('experiences', text)}
        />

        {/* CAPACITACIÓN */}
        <Text style={styles.sectionTitle}>Capacitación</Text>
        <TextInput
          style={styles.input}
          placeholder="Tema de capacitación"
          value={form.training.tema}
          onChangeText={text => updateNestedField('training', 'tema', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Escritura base"
          value={form.training.escritura}
          onChangeText={text =>
            updateNestedField('training', 'escritura', text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Principio doctrinal"
          value={form.training.principio}
          onChangeText={text =>
            updateNestedField('training', 'principio', text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Habilidad práctica (qué van a practicar)"
          value={form.training.habilidad}
          onChangeText={text =>
            updateNestedField('training', 'habilidad', text)
          }
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Compromiso específico de la zona"
          multiline
          value={form.training.compromiso}
          onChangeText={text =>
            updateNestedField('training', 'compromiso', text)
          }
        />

        {/* METAS Y ACCIONES */}
        <Text style={styles.sectionTitle}>Metas y acciones</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Metas de la zona (con nombres, si aplica)"
          multiline
          value={form.goals.metasZona}
          onChangeText={text =>
            updateNestedField('goals', 'metasZona', text)
          }
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Acciones por distrito"
          multiline
          value={form.goals.accionesPorDistrito}
          onChangeText={text =>
            updateNestedField('goals', 'accionesPorDistrito', text)
          }
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Cómo se dará seguimiento (reportes, intercambios, etc.)"
          multiline
          value={form.goals.seguimiento}
          onChangeText={text =>
            updateNestedField('goals', 'seguimiento', text)
          }
        />

        {/* CIERRE */}
        <Text style={styles.sectionTitle}>Cierre espiritual</Text>
        <TextInput
          style={styles.input}
          placeholder="Enfoque en las personas (investigadores, recientes conversos)"
          value={form.closing.personas}
          onChangeText={text =>
            updateNestedField('closing', 'personas', text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Enfoque en los misioneros (ánimo, cargas, promesas)"
          value={form.closing.misioneros}
          onChangeText={text =>
            updateNestedField('closing', 'misioneros', text)
          }
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Unidad de la zona / llamado final"
          multiline
          value={form.closing.unidad}
          onChangeText={text =>
            updateNestedField('closing', 'unidad', text)
          }
        />

        {isCompleted && (
          <Text style={styles.completedText}>
            Esta reunión está marcada como completada.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { flex: 1, marginTop: 8 },
  scrollContent: { paddingBottom: 48 },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: 6,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  completedText: {
    marginTop: 12,
    fontStyle: 'italic',
    color: '#22c55e',
  },
  errorText: {
    marginTop: 8,
    color: '#dc2626',
    fontSize: 12,
    textAlign: 'center',
  },
});

