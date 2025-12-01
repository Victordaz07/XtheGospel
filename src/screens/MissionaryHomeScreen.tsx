// src/screens/MissionaryHomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type RouteParams = {
  fromLeadership?: boolean;
};

export default function MissionaryHomeScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  
  const fromLeadership: boolean = route?.params?.fromLeadership ?? false;

  const goToDashboard = () => {
    // Navegar a dashboard/estadísticas del misionero
    // Ajusta la ruta según tu navegación
    navigation.navigate('Agenda');
  };

  const goToStatistics = () => {
    // Navegar a estadísticas/progreso
    // Ajusta la ruta según tu navegación
    navigation.navigate('Personas');
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner especial si viene desde liderazgo */}
        {fromLeadership && (
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>Sigues siendo un misionero</Text>
            <Text style={styles.bannerText}>
              Aunque hayas servido como líder de distrito, líder de zona o asistente del presidente,
              tu identidad principal sigue siendo la de un misionero consagrado de Jesucristo.
            </Text>
          </View>
        )}

        {/* Botones de acceso rápido */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={goToDashboard}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="view-dashboard" size={24} color="#1e40af" />
            <Text style={styles.quickActionText}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={goToStatistics}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="chart-line" size={24} color="#1e40af" />
            <Text style={styles.quickActionText}>Estadísticas</Text>
          </TouchableOpacity>
        </View>

        {/* Contenido espiritual */}
        <View style={styles.spiritualContent}>
          {/* Icono espiritual */}
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="shield-cross" size={80} color="#1e40af" />
          </View>

          {/* Título principal */}
          <Text style={styles.title}>
            {fromLeadership ? 'Tu propósito eterno' : 'Eres un misionero de Jesucristo'}
          </Text>

          {/* Subtítulo */}
          <Text style={styles.subtitle}>
            {fromLeadership
              ? 'Has sido llamado para invitar a todos a venir a Cristo, predicar Su evangelio y ministrar al uno dondequiera que el Señor te envíe.'
              : 'Aunque tengas asignaciones de liderazgo, sigues siendo un siervo consagrado del Señor.'}
          </Text>

          {/* Card con cita */}
          <View style={styles.card}>
            <View style={styles.quoteIcon}>
              <MaterialCommunityIcons name="format-quote-close" size={32} color="#3b82f6" />
            </View>
            <Text style={styles.cardQuote}>
              "No importa dónde sirvas, sino cómo sirvas."
            </Text>
            <Text style={styles.cardText}>
              {fromLeadership
                ? 'Las asignaciones de liderazgo son temporales; tu llamamiento como discípulo misionero es eterno. Tu poder no viene del título, sino de tu fe, tu obediencia y tu amor por las almas.'
                : 'Tu llamamiento es sagrado. Tu ministerio es eterno. Predica el evangelio, ama a las personas, y busca al uno al estilo del Salvador.'}
            </Text>
          </View>

          {/* Sección de propósito */}
          {!fromLeadership && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="heart" size={20} color="#1e40af" />
                <Text style={styles.sectionTitle}>Tu propósito eterno</Text>
              </View>
              <Text style={styles.sectionText}>
                Eres un misionero de Jesucristo. Un siervo consagrado, enviado a invitar a todos a venir a Él.
              </Text>
              <Text style={styles.sectionText}>
                Aunque tengas asignaciones de liderazgo, sigues siendo un representante del Salvador.
              </Text>
              <Text style={styles.sectionText}>
                Tu poder viene del Espíritu y de tu obediencia. Tu influencia viene de tu ejemplo, no de tu título.
              </Text>
            </View>
          )}

          {/* Sección de misión diaria */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="target" size={20} color="#1e40af" />
              <Text style={styles.sectionTitle}>
                {fromLeadership ? 'Hoy, como misionero regular:' : 'Tu misión diaria'}
              </Text>
            </View>
            <View style={styles.pointsContainer}>
              {fromLeadership ? (
                <>
                  <View style={styles.pointRow}>
                    <MaterialCommunityIcons name="check-circle" size={18} color="#10b981" />
                    <Text style={styles.point}>Proclama el evangelio con sencillez y poder.</Text>
                  </View>
                  <View style={styles.pointRow}>
                    <MaterialCommunityIcons name="check-circle" size={18} color="#10b981" />
                    <Text style={styles.point}>Busca y enseña a las personas una por una.</Text>
                  </View>
                  <View style={styles.pointRow}>
                    <MaterialCommunityIcons name="check-circle" size={18} color="#10b981" />
                    <Text style={styles.point}>Sirve con humildad y buen ánimo.</Text>
                  </View>
                  <View style={styles.pointRow}>
                    <MaterialCommunityIcons name="check-circle" size={18} color="#10b981" />
                    <Text style={styles.point}>Sé un ejemplo para tu compañero y tu distrito.</Text>
                  </View>
                  <View style={styles.pointRow}>
                    <MaterialCommunityIcons name="check-circle" size={18} color="#10b981" />
                    <Text style={styles.point}>Recuerda que cada meta representa almas reales.</Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.pointRow}>
                    <MaterialCommunityIcons name="check-circle" size={18} color="#10b981" />
                    <Text style={styles.point}>Proclamar el evangelio de Jesucristo</Text>
                  </View>
                  <View style={styles.pointRow}>
                    <MaterialCommunityIcons name="check-circle" size={18} color="#10b981" />
                    <Text style={styles.point}>Enseñar con el poder del Espíritu</Text>
                  </View>
                  <View style={styles.pointRow}>
                    <MaterialCommunityIcons name="check-circle" size={18} color="#10b981" />
                    <Text style={styles.point}>Servir con amor y humildad</Text>
                  </View>
                  <View style={styles.pointRow}>
                    <MaterialCommunityIcons name="check-circle" size={18} color="#10b981" />
                    <Text style={styles.point}>Ministrar al uno</Text>
                  </View>
                  <View style={styles.pointRow}>
                    <MaterialCommunityIcons name="check-circle" size={18} color="#10b981" />
                    <Text style={styles.point}>Ser un testigo especial del Salvador</Text>
                  </View>
                </>
              )}
            </View>
          </View>

          {/* Recordatorio diario */}
          <View style={styles.reminderCard}>
            <MaterialCommunityIcons name="lightbulb-on" size={28} color="#f59e0b" />
            <Text style={styles.reminderTitle}>Recordatorio diario</Text>
            <Text style={styles.reminderText}>
              El Señor te llamó. Él te sostiene. Este es Su ministerio y tú eres Su mensajero.
            </Text>
          </View>

          {/* Espaciado final */}
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f9ff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e7ff',
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#1e40af',
  },
  spiritualContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#bfdbfe',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1e3a8a',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  quoteIcon: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardQuote: {
    fontStyle: 'italic',
    fontSize: 16,
    color: '#1e40af',
    marginBottom: 12,
    fontWeight: '500',
    lineHeight: 24,
  },
  cardText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  section: {
    width: '100%',
    marginTop: 16,
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1e40af',
  },
  sectionText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 10,
    lineHeight: 20,
  },
  pointsContainer: {
    marginTop: 4,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 10,
  },
  point: {
    flex: 1,
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  reminderCard: {
    width: '100%',
    backgroundColor: '#fef3c7',
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#fde68a',
    alignItems: 'center',
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400e',
    marginTop: 8,
    marginBottom: 8,
  },
  reminderText: {
    fontSize: 14,
    color: '#78350f',
    textAlign: 'center',
    lineHeight: 20,
  },
  banner: {
    backgroundColor: '#eef2ff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3730a3',
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3730a3',
    marginBottom: 6,
  },
  bannerText: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 18,
  },
});

