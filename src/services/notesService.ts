import { StorageService } from '../utils/storage';

const NOTES_KEY = '@lessonNotes';

export interface LessonNote {
  lessonId: string;
  topicId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const NotesService = {
  saveNote: async (lessonId: string, topicId: string, content: string): Promise<void> => {
    try {
      const notes = NotesService.loadAllNotes();
      const noteKey = `${lessonId}-${topicId}`;
      const existingIndex = notes.findIndex(n => n.lessonId === lessonId && n.topicId === topicId);
      
      const note: LessonNote = {
        lessonId,
        topicId,
        content,
        createdAt: existingIndex >= 0 ? notes[existingIndex].createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        notes[existingIndex] = note;
      } else {
        notes.push(note);
      }

      StorageService.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Error guardando nota:', e);
      throw e;
    }
  },

  loadNote: (lessonId: string, topicId: string): LessonNote | null => {
    try {
      const notes = NotesService.loadAllNotes();
      return notes.find(n => n.lessonId === lessonId && n.topicId === topicId) || null;
    } catch (e) {
      console.error('Error cargando nota:', e);
      return null;
    }
  },

  loadAllNotes: (): LessonNote[] => {
    try {
      const jsonNotes = StorageService.getItem(NOTES_KEY);
      if (jsonNotes) {
        return JSON.parse(jsonNotes);
      }
      return [];
    } catch (e) {
      console.error('Error cargando notas:', e);
      return [];
    }
  },

  deleteNote: async (lessonId: string, topicId: string): Promise<void> => {
    try {
      const notes = NotesService.loadAllNotes();
      const filtered = notes.filter(n => !(n.lessonId === lessonId && n.topicId === topicId));
      StorageService.setItem(NOTES_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error('Error eliminando nota:', e);
      throw e;
    }
  }
};
