import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CommitmentType = 'study' | 'spiritual' | 'attendance' | 'service';
export type CommitmentStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';

export interface Commitment {
  id: string;
  title: string;
  type: CommitmentType;
  status: CommitmentStatus;
  /** Relación opcional con persona */
  personId?: string;
  personName?: string;
  /** Relación opcional con lección */
  lessonId?: string;
  lessonTitle?: string;

  dueDate?: string;      // ISO string (ej: '2025-12-31')
  createdAt: string;     // ISO
  notes?: string;
}

export interface CommitmentStats {
  total: number;
  active: number;
  completed: number;
  overdue: number;
}

export interface AddCommitmentInput {
  title: string;
  type: CommitmentType;
  personId?: string;
  personName?: string;
  lessonId?: string;
  lessonTitle?: string;
  dueDate?: string;
  notes?: string;
}

interface CommitmentsState {
  items: Commitment[];

  addCommitment: (input: AddCommitmentInput) => Commitment;
  markCompleted: (id: string) => void;
  updateStatus: (id: string, status: CommitmentStatus) => void;
  deleteCommitment: (id: string) => void;

  /** Selectores derivados */
  getStats: () => CommitmentStats;
  getByPersonId: (personId: string) => Commitment[];
  getByLessonId: (lessonId: string) => Commitment[];
}

export const useCommitmentsStore = create<CommitmentsState>()(
  persist(
    (set, get) => ({
      items: [],

      addCommitment: (input) => {
        const nowIso = new Date().toISOString();
        const newItem: Commitment = {
          id: crypto.randomUUID(),
          title: input.title,
          type: input.type,
          status: 'pending',
          personId: input.personId,
          personName: input.personName,
          lessonId: input.lessonId,
          lessonTitle: input.lessonTitle,
          dueDate: input.dueDate,
          createdAt: nowIso,
          notes: input.notes,
        };

        set((state) => ({ items: [newItem, ...state.items] }));
        return newItem;
      },

      markCompleted: (id) => {
        set((state) => {
          // Evitar actualizaciones innecesarias si el item ya está completado
          const item = state.items.find((c) => c.id === id);
          if (item?.status === 'completed') {
            return state; // No cambiar nada si ya está completado
          }
          
          return {
            items: state.items.map((c) =>
              c.id === id
                ? { ...c, status: 'completed' as CommitmentStatus }
                : c,
            ),
          };
        });
      },

      updateStatus: (id, status) => {
        set((state) => ({
          items: state.items.map((c) =>
            c.id === id ? { ...c, status } : c,
          ),
        }));
      },

      deleteCommitment: (id) => {
        set((state) => ({
          items: state.items.filter((c) => c.id !== id),
        }));
      },

      getStats: () => {
        const items = get().items;
        return {
          total: items.length,
          active: items.filter(
            (c) => c.status === 'pending' || c.status === 'in-progress',
          ).length,
          completed: items.filter((c) => c.status === 'completed').length,
          overdue: items.filter((c) => c.status === 'overdue').length,
        };
      },

      getByPersonId: (personId: string) => {
        return get().items.filter((c) => c.personId === personId);
      },

      getByLessonId: (lessonId: string) => {
        return get().items.filter((c) => c.lessonId === lessonId);
      },
    }),
    {
      name: 'xtg-commitments-v1',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/** Hooks de conveniencia */

// Hooks de conveniencia - los componentes deben usar useMemo para evitar loops
export const useCommitments = () =>
  useCommitmentsStore((state) => state.items);

// Este hook está deprecado - usar cálculo directo con useMemo en componentes
export const useCommitmentStats = () => {
  const items = useCommitmentsStore((state) => state.items);
  // Retornar función para que los componentes puedan usar useMemo
  return () => {
    return {
      total: items.length,
      active: items.filter(
        (c) => c.status === 'pending' || c.status === 'in-progress',
      ).length,
      completed: items.filter((c) => c.status === 'completed').length,
      overdue: items.filter((c) => c.status === 'overdue').length,
    };
  };
};

// Estos hooks retornan arrays nuevos cada vez - los componentes deben usar useMemo
export const useCommitmentsForPerson = (personId: string | undefined) =>
  useCommitmentsStore((state) =>
    personId ? state.getByPersonId(personId) : [],
  );

export const useCommitmentsForLesson = (lessonId: string | undefined) =>
  useCommitmentsStore((state) =>
    lessonId ? state.getByLessonId(lessonId) : [],
  );

