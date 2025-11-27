import { StorageService } from '../utils/storage';

const STORY_KEY = '@godStory';

export interface GodStoryEntry {
  id: string;
  date: string; // ISO string
  content: string;
  createdAt: string;
}

export const GodStoryService = {
  loadEntries: (): GodStoryEntry[] => {
    try {
      const stored = StorageService.getItem(STORY_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    } catch (e) {
      console.error('Error cargando entradas:', e);
      return [];
    }
  },

  saveEntries: (entries: GodStoryEntry[]): void => {
    try {
      StorageService.setItem(STORY_KEY, JSON.stringify(entries));
    } catch (e) {
      console.error('Error guardando entradas:', e);
    }
  },

  addEntry: (content: string): GodStoryEntry => {
    const entries = GodStoryService.loadEntries();
    const newEntry: GodStoryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content,
      createdAt: new Date().toISOString(),
    };
    GodStoryService.saveEntries([...entries, newEntry]);
    return newEntry;
  },

  deleteEntry: (id: string): void => {
    const entries = GodStoryService.loadEntries();
    const filtered = entries.filter(e => e.id !== id);
    GodStoryService.saveEntries(filtered);
  },
};

