import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { StorageService } from '../utils/storage';
import { UserRoleKey, normalizeStoredRole, isValidRole } from '../config/roles';
import { signUp, signIn, signOut as firebaseSignOut, SignUpOptions } from '../services/firebase/authService';
import { getOrCreateProfile } from '../services/firebase/userService';
import { UniversalUserProfile, XtgAppKey } from '../types/user';

// Try to get Firebase auth, but don't crash if not available
let firebaseAuth: any = null;
try {
  const { getFirebaseAuth } = require('../services/firebase/firebaseApp');
  firebaseAuth = getFirebaseAuth();
} catch (error) {
  console.warn('Firebase not initialized, running in offline mode');
}

interface AuthContextType {
  // Legacy role-based auth
  userRole: UserRoleKey | null;
  login: (role: UserRoleKey) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  
  // Firebase auth
  user: User | null;
  profile: UniversalUserProfile | null;
  
  // New auth methods with Firebase
  signUpWithEmail: (email: string, password: string, displayName?: string, isMember?: boolean) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRoleKey | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UniversalUserProfile | null>(null);

  // Listen for Firebase auth state changes
  useEffect(() => {
    if (!firebaseAuth) {
      loadStoredRole();
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Get or create the user's universal profile
          const userProfile = await getOrCreateProfile(firebaseUser, mapRoleToApp(userRole));
          setProfile(userProfile);
          console.log('✅ Profile loaded:', userProfile.xthegospelId);
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      } else {
        setProfile(null);
      }
      
      // Also load stored role
      loadStoredRole();
    });

    return () => unsubscribe();
  }, []);

  // Map role to app key
  const mapRoleToApp = (role: UserRoleKey | null): XtgAppKey => {
    switch (role) {
      case 'investigator': return 'investigator';
      case 'missionary': return 'missionary';
      case 'member': return 'member';
      default: return 'member';
    }
  };

  const loadStoredRole = async () => {
    try {
      setIsLoading(true);
      console.log('🔐 AuthContext: Cargando rol almacenado...');
      const storedRoleRaw = StorageService.getItem('userRole');
      
      const normalizedRole = normalizeStoredRole(storedRoleRaw);
      
      if (normalizedRole) {
        if (normalizedRole !== storedRoleRaw) {
          console.log(`🔐 AuthContext: Migrando rol "${storedRoleRaw}" → "${normalizedRole}"`);
          StorageService.setItem('userRole', normalizedRole);
        }
        setUserRole(normalizedRole);
      }
    } catch (error) {
      console.error('❌ Error loading stored role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Legacy login (role selection only)
  const login = async (role: UserRoleKey) => {
    try {
      setIsLoading(true);
      if (!isValidRole(role)) {
        throw new Error(`Invalid role: ${role}`);
      }
      StorageService.setItem('userRole', role);
      setUserRole(role);
      
      // If user is logged in, update their profile with this app
      if (user && profile) {
        try {
          const { enableApp } = await import('../services/firebase/userService');
          await enableApp(user.uid, mapRoleToApp(role));
        } catch (error) {
          console.warn('Could not update user apps:', error);
        }
      }
    } catch (error) {
      console.error('Error saving role:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with email - creates Firebase account AND xTheGospel profile
  const signUpWithEmail = async (email: string, password: string, displayName?: string, isMember?: boolean) => {
    try {
      setIsLoading(true);
      
      // Determine member status based on isMember flag
      // isMember = true -> 'active' (but unverified)
      // isMember = false/undefined -> 'investigator'
      const memberStatus = isMember ? 'active' : 'investigator';
      const initialApp = isMember ? 'member' : 'investigator';
      
      const options: SignUpOptions = {
        email,
        password,
        displayName,
        initialApp,
        memberStatus,
      };
      
      const result = await signUp(options);
      setUser(result.user);
      setProfile(result.profile);
      
      console.log('🎉 Registro exitoso! xTheGospel ID:', result.profile.xthegospelId);
      console.log(`📋 Status: ${memberStatus}, App: ${initialApp}`);
    } catch (error: any) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with email
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const result = await signIn(email, password);
      setUser(result.user);
      if (result.profile) {
        setProfile(result.profile);
      }
      
      console.log('👋 Login exitoso!');
    } catch (error: any) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout - clears both Firebase and role
  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Firebase sign out
      if (firebaseAuth) {
        await firebaseSignOut();
      }
      
      // Clear local storage
      StorageService.removeItem('userRole');
      setUserRole(null);
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      userRole, 
      login, 
      logout, 
      isLoading,
      user,
      profile,
      signUpWithEmail,
      signInWithEmail,
    }}>
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
