/**
 * ModeProvider - App mode context (investigator/member/leadership)
 * 
 * Persists to localStorage key: xtg_mode_v1
 * Default mode: 'investigator'
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export type AppMode = 'investigator' | 'member' | 'leadership';

const MODE_STORAGE_KEY = 'xtg_mode_v1';
const DEFAULT_MODE: AppMode = 'investigator';

interface ModeContextValue {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  isInvestigator: boolean;
  isMember: boolean;
  isLeadership: boolean;
}

const ModeContext = createContext<ModeContextValue | null>(null);

function getStoredMode(): AppMode {
  try {
    const stored = localStorage.getItem(MODE_STORAGE_KEY);
    if (stored === 'investigator' || stored === 'member' || stored === 'leadership') {
      return stored;
    }
  } catch (e) {
    console.warn('[ModeProvider] Error reading mode from localStorage:', e);
  }
  return DEFAULT_MODE;
}

function persistMode(mode: AppMode): void {
  try {
    localStorage.setItem(MODE_STORAGE_KEY, mode);
  } catch (e) {
    console.warn('[ModeProvider] Error persisting mode to localStorage:', e);
  }
}

interface ModeProviderProps {
  children: ReactNode;
}

export const ModeProvider: React.FC<ModeProviderProps> = ({ children }) => {
  const [mode, setModeState] = useState<AppMode>(getStoredMode);

  const setMode = useCallback((newMode: AppMode) => {
    setModeState(newMode);
    persistMode(newMode);
  }, []);

  // Sync with localStorage on mount (in case another tab changed it)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === MODE_STORAGE_KEY && e.newValue) {
        const newMode = e.newValue as AppMode;
        if (newMode === 'investigator' || newMode === 'member' || newMode === 'leadership') {
          setModeState(newMode);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const value: ModeContextValue = {
    mode,
    setMode,
    isInvestigator: mode === 'investigator',
    isMember: mode === 'member',
    isLeadership: mode === 'leadership',
  };

  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  );
};

export function useMode(): ModeContextValue {
  const context = useContext(ModeContext);
  if (!context) {
    // Safe fallback if used outside provider (shouldn't happen but prevents crash)
    console.warn('[useMode] Used outside ModeProvider, returning defaults');
    return {
      mode: DEFAULT_MODE,
      setMode: () => {},
      isInvestigator: true,
      isMember: false,
      isLeadership: false,
    };
  }
  return context;
}

export default ModeProvider;
