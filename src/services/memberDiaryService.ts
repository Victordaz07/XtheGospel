// src/services/memberDiaryService.ts
// Servicio para gestionar el diario misional de miembros

import { StorageService } from '../utils/storage';

const MEMBER_DIARY_KEY = '@memberDiary';

export interface MemberDiaryEntry {
  id: string;
  date: string; // ISO string
  content: string;
  title?: string;
  tags?: string[];
  area?: string;
  companion?: string;
  createdAt: string;
  updatedAt?: string;
}

export const MemberDiaryService = {
  loadEntries: (): MemberDiaryEntry[] => {
    try {
      const stored = StorageService.getItem(MEMBER_DIARY_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    } catch (e) {
      console.error('Error cargando entradas del diario:', e);
      return [];
    }
  },

  saveEntries: (entries: MemberDiaryEntry[]): void => {
    try {
      StorageService.setItem(MEMBER_DIARY_KEY, JSON.stringify(entries));
    } catch (e) {
      console.error('Error guardando entradas del diario:', e);
    }
  },

  addEntry: (
    content: string,
    title?: string,
    tags?: string[],
    area?: string,
    companion?: string
  ): MemberDiaryEntry => {
    const entries = MemberDiaryService.loadEntries();
    const now = new Date().toISOString();
    const newEntry: MemberDiaryEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : `diary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: now,
      content,
      title: title || '',
      tags: tags || [],
      area,
      companion,
      createdAt: now,
      updatedAt: now,
    };
    MemberDiaryService.saveEntries([...entries, newEntry]);
    return newEntry;
  },

  updateEntry: (id: string, updates: Partial<MemberDiaryEntry>): void => {
    const entries = MemberDiaryService.loadEntries();
    const updated = entries.map(entry =>
      entry.id === id
        ? { ...entry, ...updates, updatedAt: new Date().toISOString() }
        : entry
    );
    MemberDiaryService.saveEntries(updated);
  },

  deleteEntry: (id: string): void => {
    const entries = MemberDiaryService.loadEntries();
    const filtered = entries.filter(e => e.id !== id);
    MemberDiaryService.saveEntries(filtered);
  },

  getEntriesByDateRange: (startDate: string, endDate: string): MemberDiaryEntry[] => {
    const entries = MemberDiaryService.loadEntries();
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return entryDate >= start && entryDate <= end;
    });
  },

  getEntriesByArea: (area: string): MemberDiaryEntry[] => {
    const entries = MemberDiaryService.loadEntries();
    return entries.filter(entry => entry.area === area);
  },

  getEntriesByTag: (tag: string): MemberDiaryEntry[] => {
    const entries = MemberDiaryService.loadEntries();
    return entries.filter(entry => entry.tags?.includes(tag));
  },
};
