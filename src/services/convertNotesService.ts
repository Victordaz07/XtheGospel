// src/services/convertNotesService.ts
// Servicio para guardar y cargar notas de nuevos conversos

import { StorageService } from './storage';

const CONVERT_NOTES_KEY = '@convertNotes';

export interface ConvertNote {
  convertId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string; // Opcional: ID del líder que creó la nota
}

export const ConvertNotesService = {
  saveNote: async (convertId: string, content: string): Promise<void> => {
    try {
      const notes = ConvertNotesService.loadAllNotes();
      const existingIndex = notes.findIndex(n => n.convertId === convertId);
      
      const note: ConvertNote = {
        convertId,
        content,
        createdAt: existingIndex >= 0 ? notes[existingIndex].createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        notes[existingIndex] = note;
      } else {
        notes.push(note);
      }

      // Usar localStorage para web
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(CONVERT_NOTES_KEY, JSON.stringify(notes));
      }
    } catch (e) {
      console.error('Error guardando nota de converso:', e);
      throw e;
    }
  },

  loadNote: (convertId: string): ConvertNote | null => {
    try {
      const notes = ConvertNotesService.loadAllNotes();
      return notes.find(n => n.convertId === convertId) || null;
    } catch (e) {
      console.error('Error cargando nota de converso:', e);
      return null;
    }
  },

  loadAllNotes: (): ConvertNote[] => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const jsonNotes = localStorage.getItem(CONVERT_NOTES_KEY);
        if (jsonNotes) {
          return JSON.parse(jsonNotes);
        }
      }
      return [];
    } catch (e) {
      console.error('Error cargando notas de conversos:', e);
      return [];
    }
  },

  deleteNote: async (convertId: string): Promise<void> => {
    try {
      const notes = ConvertNotesService.loadAllNotes();
      const filtered = notes.filter(n => n.convertId !== convertId);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(CONVERT_NOTES_KEY, JSON.stringify(filtered));
      }
    } catch (e) {
      console.error('Error eliminando nota de converso:', e);
      throw e;
    }
  }
};

