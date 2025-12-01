import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Role {
  key: string;
  label: string;
  description: string;
}

interface RoleSelectorProps {
  currentRole: string | null;
  availableRoles: string[];
  onRoleSelect: (role: string) => void;
  title?: string;
  showAsModal?: boolean;
}

const ROLE_DEFINITIONS: Role[] = [
  { key: 'investigator', label: '👤 Investigador', description: 'Estoy aprendiendo sobre el evangelio' },
  { key: 'missionary', label: '🙌 Misionero', description: 'Estoy enseñando el evangelio' },
  { key: 'district_leader', label: '🟦 Líder de Distrito', description: 'Dirijo y cuido un distrito de la misión' },
  { key: 'zone_leader', label: '🟧 Líder de Zona', description: 'Dirijo y cuido una zona de la misión' },
  { key: 'assistant_to_president', label: '🟩 Asistente del Presidente', description: 'Apoyo al presidente en el liderazgo de la misión' },
];

export default function RoleSelector({ 
  currentRole, 
  availableRoles, 
  onRoleSelect,
  title = 'Cambiar de rol',
  showAsModal = true
}: RoleSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const availableRoleDefinitions = ROLE_DEFINITIONS.filter(role => 
    availableRoles.includes(role.key)
  );

  const handleRoleSelect = (role: string) => {
    if (currentRole !== role) {
      onRoleSelect(role);
      setModalVisible(false);
    }
  };

  const RoleContent = () => (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Configuración</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <MaterialCommunityIcons name="close" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <Text style={styles.currentRoleText}>
        Estás usando la app como: <Text style={styles.currentRoleBold}>
          {ROLE_DEFINITIONS.find(r => r.key === currentRole)?.label || currentRole}
        </Text>
      </Text>

      <Text style={styles.sectionTitle}>Configuración de Rol</Text>
      <Text style={styles.sectionDescription}>
        Estás usando las herramientas misioneras. Puedes ver la aplicación como investigador o miembro solo para pruebas/demos.
      </Text>
      
      <ScrollView 
        style={styles.rolesContainer}
        showsVerticalScrollIndicator={false}
      >
        {availableRoleDefinitions.map((role) => {
          const isCurrentRole = currentRole === role.key;
          return (
            <TouchableOpacity
              key={role.key}
              style={[
                styles.roleButton,
                isCurrentRole && styles.roleButtonActive
              ]}
              onPress={() => handleRoleSelect(role.key)}
              disabled={isCurrentRole}
            >
              <View style={styles.roleIconContainer}>
                {role.key === 'investigator' && (
                  <MaterialCommunityIcons name="account-search" size={32} color={isCurrentRole ? '#007AFF' : '#6b7280'} />
                )}
                {role.key === 'missionary' && (
                  <MaterialCommunityIcons name="book-open-variant" size={32} color={isCurrentRole ? '#007AFF' : '#6b7280'} />
                )}
                {role.key === 'district_leader' && (
                  <MaterialCommunityIcons name="account-group" size={32} color={isCurrentRole ? '#007AFF' : '#6b7280'} />
                )}
                {role.key === 'zone_leader' && (
                  <MaterialCommunityIcons name="account-group" size={32} color={isCurrentRole ? '#007AFF' : '#6b7280'} />
                )}
                {role.key === 'assistant_to_president' && (
                  <MaterialCommunityIcons name="account-tie" size={32} color={isCurrentRole ? '#007AFF' : '#6b7280'} />
                )}
              </View>
              <View style={styles.roleTextContainer}>
                <Text style={[
                  styles.roleLabel,
                  isCurrentRole && styles.roleLabelActive
                ]}>
                  {role.label}
                </Text>
                <Text style={[
                  styles.roleDescription,
                  isCurrentRole && styles.roleDescriptionActive
                ]}>
                  {role.description}
                </Text>
              </View>
              {isCurrentRole && (
                <View style={styles.currentBadge}>
                  <Text style={styles.currentBadgeText}>Actual</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  if (showAsModal) {
    return (
      <>
        <TouchableOpacity
          style={styles.openButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.openButtonText}>Cambiar de rol</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#007AFF" />
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
          statusBarTranslucent={true}
        >
          <SafeAreaView style={styles.modalOverlay} edges={['top', 'bottom']}>
            <Pressable 
              style={StyleSheet.absoluteFillObject}
              onPress={() => setModalVisible(false)}
            />
            <View style={styles.modalContentWrapper} pointerEvents="box-none">
              <Pressable onPress={(e) => e.stopPropagation()}>
                <RoleContent />
              </Pressable>
            </View>
          </SafeAreaView>
        </Modal>
      </>
    );
  }

  // Versión sin modal (para compatibilidad)
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <Text style={styles.subtitle}>Selecciona un rol para cambiar</Text>
      
      <ScrollView style={styles.rolesContainer}>
        {availableRoleDefinitions.map((role) => {
          const isCurrentRole = currentRole === role.key;
          return (
            <TouchableOpacity
              key={role.key}
              style={[
                styles.roleButton,
                isCurrentRole && styles.roleButtonActive
              ]}
              onPress={() => !isCurrentRole && onRoleSelect(role.key)}
              disabled={isCurrentRole}
            >
              <Text style={[
                styles.roleLabel,
                isCurrentRole && styles.roleLabelActive
              ]}>
                {role.label}
              </Text>
              <Text style={[
                styles.roleDescription,
                isCurrentRole && styles.roleDescriptionActive
              ]}>
                {role.description}
              </Text>
              {isCurrentRole && (
                <View style={styles.currentBadge}>
                  <Text style={styles.currentBadgeText}>Rol actual</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilos para versión sin modal (compatibilidad)
  container: {
    width: '100%',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 16,
  },
  rolesContainer: {
    maxHeight: 400,
  },
  roleButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#eff6ff',
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  roleLabelActive: {
    color: '#007AFF',
  },
  roleDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  roleDescriptionActive: {
    color: '#007AFF',
  },
  currentBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  // Estilos para modal
  openButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  openButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 100, // Espacio extra para evitar la barra de tabs
  },
  modalContentWrapper: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeButton: {
    padding: 4,
  },
  currentRoleText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
    lineHeight: 20,
  },
  currentRoleBold: {
    fontWeight: '600',
    color: '#1f2937',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
    lineHeight: 20,
  },
  roleIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  roleTextContainer: {
    flex: 1,
  },
});

