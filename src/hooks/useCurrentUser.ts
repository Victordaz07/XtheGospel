// src/hooks/useCurrentUser.ts
// Hook para obtener el usuario actual con toda su información de misión
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CurrentUser {
  id: string;
  displayName: string;
  missionRole: 'zone_leader' | 'district_leader' | 'assistant_to_president' | 'missionary' | 'investigator';
  missionId: string;
  zoneId: string;
  districtId?: string;
  zoneName?: string;
  districtName?: string;
  email?: string;
}

export function useCurrentUser() {
  const { userRole, isLoading: authLoading } = useAuth();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (authLoading) return;

      try {
        // TODO: En producción, esto vendría de Firebase Auth + Firestore
        // Por ahora, simulamos datos desde AsyncStorage o contexto
        const storedUser = await AsyncStorage.getItem('currentUser');
        
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
        } else if (userRole) {
          // Si no hay usuario guardado pero hay rol, crear uno básico
          // Esto es temporal hasta que tengas Firebase Auth completo
          const mockUser: CurrentUser = {
            id: 'temp-user-id',
            displayName: 'Líder de Zona',
            missionRole: userRole as CurrentUser['missionRole'],
            missionId: await AsyncStorage.getItem('missionId') || 'MI-MISION',
            zoneId: await AsyncStorage.getItem('zoneId') || 'MI-ZONA',
            districtId: await AsyncStorage.getItem('districtId') || undefined,
            zoneName: await AsyncStorage.getItem('zoneName') || undefined,
            districtName: await AsyncStorage.getItem('districtName') || undefined,
          };
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userRole, authLoading]);

  return { user, loading: loading || authLoading };
}

