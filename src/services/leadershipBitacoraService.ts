// src/services/leadershipBitacoraService.ts
// Servicio para bitácora privada de líderes

const BITACORA_KEY = '@leadershipBitacora';

export interface BitacoraEntry {
  id: string;
  date: string;
  content: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export const LeadershipBitacoraService = {
  saveEntry: (entry: Omit<BitacoraEntry, 'id' | 'createdAt' | 'updatedAt'>): BitacoraEntry => {
    try {
      const entries = LeadershipBitacoraService.loadAllEntries();
      const newEntry: BitacoraEntry = {
        ...entry,
        id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      entries.push(newEntry);
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(BITACORA_KEY, JSON.stringify(entries));
      }
      return newEntry;
    } catch (e) {
      console.error('Error guardando entrada de bitácora:', e);
      throw e;
    }
  },

  loadAllEntries: (): BitacoraEntry[] => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const jsonEntries = localStorage.getItem(BITACORA_KEY);
        if (jsonEntries) {
          return JSON.parse(jsonEntries);
        }
      }
      return [];
    } catch (e) {
      console.error('Error cargando bitácora:', e);
      return [];
    }
  },

  deleteEntry: (id: string): void => {
    try {
      const entries = LeadershipBitacoraService.loadAllEntries();
      const filtered = entries.filter(e => e.id !== id);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(BITACORA_KEY, JSON.stringify(filtered));
      }
    } catch (e) {
      console.error('Error eliminando entrada de bitácora:', e);
      throw e;
    }
  },

  updateEntry: (id: string, updates: Partial<BitacoraEntry>): BitacoraEntry | null => {
    try {
      const entries = LeadershipBitacoraService.loadAllEntries();
      const index = entries.findIndex(e => e.id === id);
      if (index === -1) return null;

      entries[index] = {
        ...entries[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(BITACORA_KEY, JSON.stringify(entries));
      }
      return entries[index];
    } catch (e) {
      console.error('Error actualizando entrada de bitácora:', e);
      throw e;
    }
  }
};

