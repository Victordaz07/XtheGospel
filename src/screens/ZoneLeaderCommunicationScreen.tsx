// src/screens/ZoneLeaderCommunicationScreen.tsx
// Pantalla combinada de Notas y Mensajes para optimizar el número de tabs
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ZoneLeaderNotesScreen } from './ZoneLeaderNotesScreen';
import { ZoneLeaderMessagesScreen } from './ZoneLeaderMessagesScreen';

export const ZoneLeaderCommunicationScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notes' | 'messages'>('notes');

  return (
    <View style={styles.container}>
      {/* Tabs internas */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'notes' && styles.tabActive]}
          onPress={() => setActiveTab('notes')}
        >
          <Text style={[styles.tabText, activeTab === 'notes' && styles.tabTextActive]}>
            Notas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'messages' && styles.tabActive]}
          onPress={() => setActiveTab('messages')}
        >
          <Text style={[styles.tabText, activeTab === 'messages' && styles.tabTextActive]}>
            Mensajes
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        {activeTab === 'notes' ? (
          <ZoneLeaderNotesScreen />
        ) : (
          <ZoneLeaderMessagesScreen />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#F59E0B',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },
  tabTextActive: {
    color: '#F59E0B',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});

