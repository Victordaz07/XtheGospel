/**
 * Investigator Zustand Store
 * Persisted to localStorage (no Firebase yet)
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { LessonStatus } from '../data/lessons';

export interface JournalEntry {
  id: string;
  type: 'text' | 'voice';
  content: string;
  createdAt: string;
  lessonId?: string;
}

export type MilestoneKey = 'first_lesson_started' | 'first_journal_entry' | 'week_of_learning';

export interface Milestone {
  key: MilestoneKey;
  title: string;
  description: string;
  unlockedAt: string | null;
  icon: string;
}

interface InvestigatorState {
  // Lesson progress
  lessonStatuses: Record<string, LessonStatus>;
  lastLessonId: string | null;
  
  // Journal
  journalEntries: JournalEntry[];
  
  // Milestones
  milestones: Milestone[];
  
  // Actions
  setLessonStatus: (lessonId: string, status: LessonStatus) => void;
  setLastLessonId: (lessonId: string) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
  deleteJournalEntry: (id: string) => void;
  unlockMilestone: (key: MilestoneKey) => void;
  getLessonStatus: (lessonId: string) => LessonStatus;
  getCompletedLessonsCount: () => number;
  getExploringLessonsCount: () => number;
}

const initialMilestones: Milestone[] = [
  {
    key: 'first_lesson_started',
    title: 'First Step',
    description: 'Started your first lesson',
    unlockedAt: null,
    icon: '🌱',
  },
  {
    key: 'first_journal_entry',
    title: 'Reflective Heart',
    description: 'Wrote your first journal entry',
    unlockedAt: null,
    icon: '📝',
  },
  {
    key: 'week_of_learning',
    title: 'Dedicated Learner',
    description: 'Learned for a full week',
    unlockedAt: null,
    icon: '⭐',
  },
];

export const useInvestigatorStore = create<InvestigatorState>()(
  persist(
    (set, get) => ({
      lessonStatuses: {},
      lastLessonId: null,
      journalEntries: [],
      milestones: initialMilestones,

      setLessonStatus: (lessonId: string, status: LessonStatus) => {
        set((state) => {
          const newStatuses = { ...state.lessonStatuses, [lessonId]: status };
          
          // Auto-unlock first lesson milestone
          if (status === 'exploring' || status === 'completed') {
            const milestone = state.milestones.find((m) => m.key === 'first_lesson_started');
            if (milestone && !milestone.unlockedAt) {
              const updatedMilestones = state.milestones.map((m) =>
                m.key === 'first_lesson_started'
                  ? { ...m, unlockedAt: new Date().toISOString() }
                  : m
              );
              return { lessonStatuses: newStatuses, milestones: updatedMilestones };
            }
          }
          
          return { lessonStatuses: newStatuses };
        });
      },

      setLastLessonId: (lessonId: string) => {
        set({ lastLessonId: lessonId });
      },

      addJournalEntry: (entry) => {
        const newEntry: JournalEntry = {
          ...entry,
          id: `journal-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => {
          // Auto-unlock first journal milestone
          const milestone = state.milestones.find((m) => m.key === 'first_journal_entry');
          if (milestone && !milestone.unlockedAt && state.journalEntries.length === 0) {
            const updatedMilestones = state.milestones.map((m) =>
              m.key === 'first_journal_entry'
                ? { ...m, unlockedAt: new Date().toISOString() }
                : m
            );
            return {
              journalEntries: [newEntry, ...state.journalEntries],
              milestones: updatedMilestones,
            };
          }
          
          return { journalEntries: [newEntry, ...state.journalEntries] };
        });
      },

      deleteJournalEntry: (id: string) => {
        set((state) => ({
          journalEntries: state.journalEntries.filter((e) => e.id !== id),
        }));
      },

      unlockMilestone: (key: MilestoneKey) => {
        set((state) => ({
          milestones: state.milestones.map((m) =>
            m.key === key && !m.unlockedAt
              ? { ...m, unlockedAt: new Date().toISOString() }
              : m
          ),
        }));
      },

      getLessonStatus: (lessonId: string): LessonStatus => {
        return get().lessonStatuses[lessonId] || 'not_started';
      },

      getCompletedLessonsCount: (): number => {
        return Object.values(get().lessonStatuses).filter((s) => s === 'completed').length;
      },

      getExploringLessonsCount: (): number => {
        return Object.values(get().lessonStatuses).filter((s) => s === 'exploring').length;
      },
    }),
    {
      name: 'investigator-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
