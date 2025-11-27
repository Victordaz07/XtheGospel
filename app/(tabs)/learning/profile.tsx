import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../../context/AuthContext';
import { useProgress } from '../../../context/ProgressContext';
import { useI18n } from '../../../context/I18nContext';
import { LanguagePicker } from '../../../components/LanguagePicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function InvestigatorProfile() {
  const { logout, userRole } = useAuth();
  const { progress, getOverallProgress, clearProgress } = useProgress();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    Alert.alert(
      t('profile.logout'),
      t('profile.logoutConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('profile.logout'),
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert(t('common.error'), t('profile.logoutError'));
            }
          }
        }
      ]
    );
  };

  const handleClearProgress = () => {
    Alert.alert(
      t('profile.clearProgress'),
      t('profile.clearProgressConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('profile.clearProgress'),
          style: 'destructive',
          onPress: () => {
            clearProgress();
            Alert.alert(t('common.success'), t('profile.clearProgressSuccess'));
          }
        }
      ]
    );
  };

  const completedLessons = progress.filter(lesson => lesson.completed).length;
  const overallProgress = getOverallProgress();

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
      >
        <View style={styles.header}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={60} color="#007AFF" />
          </View>
          <Text style={styles.username}>Investigador</Text>
          <Text style={styles.role}>{userRole}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="book-check" size={30} color="#007AFF" />
            <Text style={styles.statNumber}>{completedLessons}</Text>
            <Text style={styles.statLabel}>Lecciones completadas</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialCommunityIcons name="progress-check" size={30} color="#34C759" />
            <Text style={styles.statNumber}>{overallProgress}%</Text>
            <Text style={styles.statLabel}>{t('profile.progressTotal')}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones</Text>

          <TouchableOpacity style={styles.actionButton} onPress={handleClearProgress}>
            <MaterialCommunityIcons name="trash-can-outline" size={24} color="#FF3B30" />
            <Text style={[styles.actionButtonText, { color: '#FF3B30' }]}>
              Limpiar progreso
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={24} color="#FF9500" />
            <Text style={[styles.actionButtonText, { color: '#FF9500' }]}>
              {t('profile.logout')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.language')}</Text>
          <LanguagePicker />
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>Versión 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: '#7f8c8d',
    textTransform: 'capitalize',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  statCard: {
    alignItems: 'center',
    padding: 15,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 15,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  version: {
    fontSize: 12,
    color: '#7f8c8d',
  },
});