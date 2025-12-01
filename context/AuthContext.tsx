import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  userRole: string | null;
  availableRoles: string[];
  login: (role: string) => Promise<void>;
  switchRole: (role: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Definir roles disponibles en la aplicación
const AVAILABLE_ROLES = [
  { key: 'investigator', label: '👤 Investigador', description: 'Estoy aprendiendo sobre el evangelio' },
  { key: 'missionary', label: '🙌 Misionero', description: 'Estoy enseñando el evangelio' },
  { key: 'district_leader', label: '🟦 Líder de Distrito', description: 'Dirijo y cuido un distrito de la misión' },
  { key: 'zone_leader', label: '🟧 Líder de Zona', description: 'Dirijo y cuido una zona de la misión' },
  { key: 'assistant_to_president', label: '🟩 Asistente del Presidente', description: 'Apoyo al presidente en el liderazgo de la misión' },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadStoredRole();
  }, []);

  const loadStoredRole = async () => {
    try {
      setIsLoading(true);
      const storedRole = await AsyncStorage.getItem('userRole');
      const storedAvailableRoles = await AsyncStorage.getItem('availableRoles');
      
      if (storedRole) {
        setUserRole(storedRole);
      }
      
      if (storedAvailableRoles) {
        setAvailableRoles(JSON.parse(storedAvailableRoles));
      } else {
        // Por defecto, todos los roles están disponibles
        const defaultRoles = AVAILABLE_ROLES.map(r => r.key);
        setAvailableRoles(defaultRoles);
        await AsyncStorage.setItem('availableRoles', JSON.stringify(defaultRoles));
      }
    } catch (error) {
      console.error('Error loading stored role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (role: string) => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem('userRole', role);
      setUserRole(role);
      
      // Si es el primer login, guardar todos los roles como disponibles
      const storedAvailableRoles = await AsyncStorage.getItem('availableRoles');
      if (!storedAvailableRoles) {
        const defaultRoles = AVAILABLE_ROLES.map(r => r.key);
        setAvailableRoles(defaultRoles);
        await AsyncStorage.setItem('availableRoles', JSON.stringify(defaultRoles));
      }
    } catch (error) {
      console.error('Error saving role:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const switchRole = async (role: string) => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem('userRole', role);
      setUserRole(role);
    } catch (error) {
      console.error('Error switching role:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('availableRoles');
      setUserRole(null);
      setAvailableRoles([]);
    } catch (error) {
      console.error('Error removing role:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ userRole, availableRoles, login, switchRole, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};