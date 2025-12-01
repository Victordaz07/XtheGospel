import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../../context/AuthContext';
import { useI18n } from '../../../context/I18nContext';
import { useCurrentUser } from '../../../src/hooks/useCurrentUser';
import { LanguagePicker } from '../../../components/LanguagePicker';
import { theme } from '../../../constants/theme';
import RoleSelector from '../../../components/RoleSelector';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function APProfile() {
  const insets = useSafeAreaInsets();
  const { userRole, availableRoles, switchRole, logout } = useAuth();
  const { t } = useI18n();
  const { user, loading: loadingUser } = useCurrentUser();
  
  if (loadingUser) {
    return (
      <View style={styles.center}>
        <Text>Cargando usuario…</Text>
      </View>
    );
  }

  const handleRoleSwitch = async (newRole: string) => {
    try {
      await switchRole(newRole);
      Alert.alert('Rol cambiado', 'Tu rol ha sido actualizado correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cambiar de rol. Intenta nuevamente.');
      console.error('Error switching role:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="star" size={60} color="#10B981" />
          </View>
          <Text style={styles.username}>{user?.displayName || 'Asistente del Presidente'}</Text>
          <Text style={styles.role}>Asistente del Presidente</Text>
          {user?.missionId && (
            <Text style={styles.missionName}>Misión: {user.missionId}</Text>
          )}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="account-tie" size={30} color="#10B981" />
            <Text style={styles.statNumber}>Rol</Text>
            <Text style={styles.statLabel}>Asistente del Presidente</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialCommunityIcons name="map-marker" size={30} color="#10B981" />
            <Text style={styles.statNumber}>Misión</Text>
            <Text style={styles.statLabel}>{user?.missionId || 'Mi misión'}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cambiar de rol</Text>
          <RoleSelector
            currentRole={userRole}
            availableRoles={availableRoles.length > 0 ? availableRoles : ['investigator', 'missionary', 'district_leader', 'zone_leader', 'assistant_to_president']}
            onRoleSelect={handleRoleSwitch}
            title=""
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          <View style={styles.settingItem}>
            <MaterialCommunityIcons name="translate" size={24} color="#007AFF" />
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>{t('profile.language')}</Text>
              <LanguagePicker />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones</Text>
          <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={24} color="#FF9500" />
            <Text style={[styles.actionButtonText, { color: '#FF9500' }]}>
              {t('profile.logout')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>Versión 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#D1FAE5',
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
    color: '#10B981',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  missionName: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingContent: {
    flex: 1,
    marginLeft: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 8,
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

