import { StorageService } from '../utils/storage';

const STORY_KEY = '@godStory';

import { MyStoryEntry } from '../data/investigatorMyStory';

export interface GodStoryEntry {
  id: string;
  date: string; // ISO string
  content: string;
  createdAt: string;
  title?: string;
  lessonId?: string;
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

  addEntry: (content: string, title?: string, lessonId?: string): GodStoryEntry => {
    const entries = GodStoryService.loadEntries();
    const newEntry: GodStoryEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      date: new Date().toISOString(),
      content,
      title: title || '',
      lessonId,
      createdAt: new Date().toISOString(),
    };
    GodStoryService.saveEntries([...entries, newEntry]);
    return newEntry;
  },

  updateEntry: (id: string, updates: Partial<MyStoryEntry>): void => {
    const entries = GodStoryService.loadEntries();
    const updated = entries.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    );
    GodStoryService.saveEntries(updated);
  },

  deleteEntry: (id: string): void => {
    const entries = GodStoryService.loadEntries();
    const filtered = entries.filter(e => e.id !== id);
    GodStoryService.saveEntries(filtered);
  },
};

