import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../constants/theme';

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
  title = 'Cambiar de rol' 
}: RoleSelectorProps) {
  const availableRoleDefinitions = ROLE_DEFINITIONS.filter(role => 
    availableRoles.includes(role.key)
  );

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
  },
  roleButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
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
});

