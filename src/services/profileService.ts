import { StorageService } from '../utils/storage';

const PROFILE_KEY = '@investigatorProfile';

export type MainGoal = 
  | 'knowBookOfMormon'
  | 'prepareForBaptism'
  | 'knowJesusChrist'
  | 'other';

export interface InvestigatorProfile {
  mainGoal?: MainGoal;
  customGoal?: string;
  notesForMissionaries?: string;
  updatedAt: string;
}

export const ProfileService = {
  loadProfile: (): InvestigatorProfile => {
    try {
      const stored = StorageService.getItem(PROFILE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return {
        updatedAt: new Date().toISOString(),
      };
    } catch (e) {
      console.error('Error cargando perfil:', e);
      return {
        updatedAt: new Date().toISOString(),
      };
    }
  },

  saveProfile: (profile: Partial<InvestigatorProfile>): void => {
    try {
      const current = ProfileService.loadProfile();
      const updated: InvestigatorProfile = {
        ...current,
        ...profile,
        updatedAt: new Date().toISOString(),
      };
      StorageService.setItem(PROFILE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error guardando perfil:', e);
    }
  },

  updateGoal: (goal: MainGoal, customGoal?: string): void => {
    ProfileService.saveProfile({ mainGoal: goal, customGoal });
  },

  updateNotesForMissionaries: (notes: string): void => {
    ProfileService.saveProfile({ notesForMissionaries: notes });
  },
};

