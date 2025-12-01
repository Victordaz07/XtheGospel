// src/services/personalNoteService.ts
// Servicio para gestionar notas personales de líderes

export interface PersonalNote {
  id: string;
  missionId: string;
  zoneId?: string;
  districtId?: string;
  leaderId: string;
  leaderName: string;
  leaderRole: 'district_leader' | 'zone_leader' | 'assistant_to_president';
  title: string;
  body: string;
  scope?: 'missionary' | 'district' | 'zone' | 'mission' | 'general';
  missionaryName?: string;
  createdAt: string;
  updatedAt: string;
}

const PERSONAL_NOTES_KEY = '@personalNotes';

export const PersonalNoteService = {
  // Guardar/actualizar nota
  saveNote: (note: Omit<PersonalNote, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): PersonalNote => {
    try {
      const notes = PersonalNoteService.getAllNotes();
      const now = new Date().toISOString();
      
      const newNote: PersonalNote = {
        ...note,
        id: note.id || `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: note.id ? notes.find(n => n.id === note.id)?.createdAt || now : now,
        updatedAt: now
      };
      
      const index = notes.findIndex(n => n.id === newNote.id);
      if (index >= 0) {
        notes[index] = newNote;
      } else {
        notes.push(newNote);
      }
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(PERSONAL_NOTES_KEY, JSON.stringify(notes));
      }
      
      return newNote;
    } catch (e) {
      console.error('Error guardando nota:', e);
      throw e;
    }
  },

  // Obtener todas las notas
  getAllNotes: (): PersonalNote[] => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const json = localStorage.getItem(PERSONAL_NOTES_KEY);
        if (json) {
          return JSON.parse(json);
        }
      }
      return [];
    } catch (e) {
      console.error('Error cargando notas:', e);
      return [];
    }
  },

  // Obtener nota por ID
  getNoteById: (noteId: string): PersonalNote | null => {
    const notes = PersonalNoteService.getAllNotes();
    return notes.find(n => n.id === noteId) || null;
  },

  // Obtener notas por líder
  getNotesByLeader: (leaderId: string, leaderRole?: PersonalNote['leaderRole']): PersonalNote[] => {
    let notes = PersonalNoteService.getAllNotes()
      .filter(n => n.leaderId === leaderId);
    
    if (leaderRole) {
      notes = notes.filter(n => n.leaderRole === leaderRole);
    }
    
    return notes.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateB - dateA; // Más recientes primero
    });
  },

  // Obtener notas por misión
  getNotesByMission: (missionId: string): PersonalNote[] => {
    return PersonalNoteService.getAllNotes()
      .filter(n => n.missionId === missionId)
      .sort((a, b) => {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        return dateB - dateA;
      });
  },

  // Eliminar nota
  deleteNote: (noteId: string): boolean => {
    try {
      const notes = PersonalNoteService.getAllNotes();
      const filtered = notes.filter(n => n.id !== noteId);
      
      if (filtered.length === notes.length) {
        return false; // No se encontró la nota
      }
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(PERSONAL_NOTES_KEY, JSON.stringify(filtered));
      }
      
      return true;
    } catch (e) {
      console.error('Error eliminando nota:', e);
      return false;
    }
  }
};

