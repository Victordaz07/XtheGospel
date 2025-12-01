// src/screens/DistrictCouncilScreen.tsx
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
import { useDistrictCouncil } from '../hooks/useDistrictCouncil';
import { useCurrentUser } from '../hooks/useCurrentUser';

interface Props {
  route: {
    params?: {
      councilId?: string;
    };
  };
}

export const DistrictCouncilScreen: React.FC<Props> = ({ route }) => {
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

  if (!user || user.missionRole !== 'district_leader') {
    return (
      <View style={styles.center}>
        <Text>No tienes permiso para ver esta pantalla.</Text>
        <Text style={styles.errorText}>
          Esta funcionalidad está disponible solo para Líderes de Distrito.
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
    publishToDistrict,
    completeCouncil,
    shareAgenda,
  } = useDistrictCouncil({
    councilId,
    missionId: user.missionId,
    zoneId: user.zoneId,
    districtId: user.districtId || 'MI-DISTRITO',
    leaderId: user.id,
    leaderName: user.displayName,
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Cargando reunión de distrito…</Text>
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
          title="Publicar al distrito"
          onPress={publishToDistrict}
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
          placeholder="Enfoque espiritual del distrito"
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
          placeholder="Meta principal del distrito"
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
          placeholder="Aplicación práctica para el distrito"
          multiline
          value={form.spiritualStart.application}
          onChangeText={text =>
            updateNestedField('spiritualStart', 'application', text)
          }
        />

        {/* PROGRESO */}
        <Text style={styles.sectionTitle}>Progreso del distrito</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Personas con fecha bautismal (nombres)"
          multiline
          value={form.progress.personasConFecha}
          onChangeText={text =>
            updateNestedField('progress', 'personasConFecha', text)
          }
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Personas en riesgo (nombres + motivo)"
          multiline
          value={form.progress.personasEnRiesgo}
          onChangeText={text =>
            updateNestedField('progress', 'personasEnRiesgo', text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Investigadores nuevos"
          value={form.progress.investigadoresNuevos}
          onChangeText={text =>
            updateNestedField('progress', 'investigadoresNuevos', text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Investigadores que asistieron a la Iglesia"
          value={form.progress.investigadoresEnIglesia}
          onChangeText={text =>
            updateNestedField('progress', 'investigadoresEnIglesia', text)
          }
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Comentarios pastorales generales"
          multiline
          value={form.progress.comentarios}
          onChangeText={text =>
            updateNestedField('progress', 'comentarios', text)
          }
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
          placeholder="Compromiso específico del distrito"
          multiline
          value={form.training.compromiso}
          onChangeText={text =>
            updateNestedField('training', 'compromiso', text)
          }
        />

        {/* ROLE PLAYS */}
        <Text style={styles.sectionTitle}>Prácticas (role plays)</Text>
        <TextInput
          style={styles.input}
          placeholder="Escenario a practicar"
          value={form.roleplays.escenario}
          onChangeText={text =>
            updateNestedField('roleplays', 'escenario', text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Objetivo espiritual"
          value={form.roleplays.objetivo}
          onChangeText={text =>
            updateNestedField('roleplays', 'objetivo', text)
          }
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Puntos fuertes observados"
          multiline
          value={form.roleplays.puntosFuertes}
          onChangeText={text =>
            updateNestedField('roleplays', 'puntosFuertes', text)
          }
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Aspectos a mejorar"
          multiline
          value={form.roleplays.aspectosMejorar}
          onChangeText={text =>
            updateNestedField('roleplays', 'aspectosMejorar', text)
          }
        />

        {/* METAS Y ACCIONES */}
        <Text style={styles.sectionTitle}>Metas y acciones</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Personas a enseñar esta semana (nombres)"
          multiline
          value={form.goals.personas}
          onChangeText={text =>
            updateNestedField('goals', 'personas', text)
          }
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Compromisos que se invitarán"
          multiline
          value={form.goals.compromisos}
          onChangeText={text =>
            updateNestedField('goals', 'compromisos', text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Fechas a fijar o confirmar"
          value={form.goals.fechas}
          onChangeText={text =>
            updateNestedField('goals', 'fechas', text)
          }
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Acciones específicas por área"
          multiline
          value={form.goals.acciones}
          onChangeText={text =>
            updateNestedField('goals', 'acciones', text)
          }
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Seguimiento planificado para la próxima reunión"
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
          placeholder="Unidad del distrito / llamado final"
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
  errorText: {
    marginTop: 8,
    color: '#dc2626',
    fontSize: 12,
    textAlign: 'center',
  },
  completedText: {
    marginTop: 12,
    fontStyle: 'italic',
    color: '#22c55e',
  },
});

