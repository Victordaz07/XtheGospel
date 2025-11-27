import { StorageService } from '../utils/storage';

const CHECKLIST_KEY = '@baptismChecklist';

export interface BaptismChecklistItem {
  id: string;
  completed: boolean;
  completedAt?: string;
}

export interface BaptismChecklist {
  items: Record<string, BaptismChecklistItem>;
}

const DEFAULT_CHECKLIST_ITEMS = [
  'learnedAboutChrist',
  'prayedToKnow',
  'keepingCommandments',
  'talkedAboutInterview',
  'readyForCovenants',
];

export const BaptismChecklistService = {
  loadChecklist: (): BaptismChecklist => {
    try {
      const stored = StorageService.getItem(CHECKLIST_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Inicializar con items por defecto
      const initial: BaptismChecklist = {
        items: {}
      };
      DEFAULT_CHECKLIST_ITEMS.forEach(id => {
        initial.items[id] = { id, completed: false };
      });
      return initial;
    } catch (e) {
      console.error('Error cargando checklist:', e);
      const initial: BaptismChecklist = { items: {} };
      DEFAULT_CHECKLIST_ITEMS.forEach(id => {
        initial.items[id] = { id, completed: false };
      });
      return initial;
    }
  },

  saveChecklist: (checklist: BaptismChecklist): void => {
    try {
      StorageService.setItem(CHECKLIST_KEY, JSON.stringify(checklist));
    } catch (e) {
      console.error('Error guardando checklist:', e);
    }
  },

  toggleItem: (itemId: string): void => {
    const checklist = BaptismChecklistService.loadChecklist();
    if (!checklist.items[itemId]) {
      checklist.items[itemId] = { id: itemId, completed: false };
    }
    checklist.items[itemId].completed = !checklist.items[itemId].completed;
    if (checklist.items[itemId].completed) {
      checklist.items[itemId].completedAt = new Date().toISOString();
    } else {
      delete checklist.items[itemId].completedAt;
    }
    BaptismChecklistService.saveChecklist(checklist);
  },

  getCompletedCount: (): number => {
    const checklist = BaptismChecklistService.loadChecklist();
    return Object.values(checklist.items).filter(item => item.completed).length;
  }
};

