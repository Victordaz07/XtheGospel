import { StorageService } from '../utils/storage';

const COMMITMENTS_KEY = '@commitments';

export type CommitmentCategory = 'study' | 'spiritual' | 'attendance';

export interface Commitment {
  id: string;
  title: string;
  description?: string;
  category: CommitmentCategory;
  dueDate?: string; // ISO string
  completed: boolean;
  createdAt: string;
  source?: 'lesson' | 'manual';
  lessonId?: string;
  topicId?: string;
}

export const CommitmentsService = {
  saveCommitments: async (commitments: Commitment[]): Promise<void> => {
    try {
      StorageService.setItem(COMMITMENTS_KEY, JSON.stringify(commitments));
    } catch (e) {
      console.error('Error guardando compromisos:', e);
      throw e;
    }
  },

  loadCommitments: async (): Promise<Commitment[]> => {
    try {
      const json = StorageService.getItem(COMMITMENTS_KEY);
      if (json) {
        return JSON.parse(json);
      }
      return [];
    } catch (e) {
      console.error('Error cargando compromisos:', e);
      return [];
    }
  },

  addCommitment: async (commitment: Omit<Commitment, 'id' | 'createdAt'>): Promise<Commitment> => {
    try {
      const commitments = await CommitmentsService.loadCommitments();
      const newCommitment: Commitment = {
        ...commitment,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      await CommitmentsService.saveCommitments([...commitments, newCommitment]);
      return newCommitment;
    } catch (e) {
      console.error('Error agregando compromiso:', e);
      throw e;
    }
  },

  updateCommitment: async (id: string, updates: Partial<Commitment>): Promise<void> => {
    try {
      const commitments = await CommitmentsService.loadCommitments();
      const updated = commitments.map(c => 
        c.id === id ? { ...c, ...updates } : c
      );
      await CommitmentsService.saveCommitments(updated);
    } catch (e) {
      console.error('Error actualizando compromiso:', e);
      throw e;
    }
  },

  deleteCommitment: async (id: string): Promise<void> => {
    try {
      const commitments = await CommitmentsService.loadCommitments();
      const filtered = commitments.filter(c => c.id !== id);
      await CommitmentsService.saveCommitments(filtered);
    } catch (e) {
      console.error('Error eliminando compromiso:', e);
      throw e;
    }
  },

  clearCommitments: async (): Promise<void> => {
    try {
      StorageService.removeItem(COMMITMENTS_KEY);
    } catch (e) {
      console.error('Error limpiando compromisos:', e);
      throw e;
    }
  }
};

