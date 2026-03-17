/**
 * Baptism Progress Store
 * Persisted preparation state for baptism
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { baptismPreparation } from '../data/baptismPreparationData';

export interface AgendaProgram {
  confirmImmediately: boolean;
  speakerName?: string;
  openingPrayerBy?: string;
  closingPrayerBy?: string;
  hymn1?: string;
  hymn2?: string;
  hymn3?: string;
}

export interface BaptismProgressState {
  completedChecklist: Record<string, boolean>;
  baptismDate?: string;
  location?: string;
  performedBy?: string;
  guests?: string;
  personalTestimony?: string;
  /** High-level milestones for progress bar */
  milestones: {
    restoration: boolean;
    planOfSalvation: boolean;
    gospelOfJesusChrist: boolean;
    commandments: boolean;
    churchAttendance: boolean;
    interview: boolean;
    dateScheduled: boolean;
  };
  /** Baptismal program preferences (visible to leader) */
  agendaProgram?: AgendaProgram;
}

interface BaptismProgressActions {
  toggleChecklistItem: (id: string) => void;
  setChecklistItem: (id: string, checked: boolean) => void;
  setBaptismDetails: (details: {
    baptismDate?: string;
    location?: string;
    performedBy?: string;
    guests?: string;
  }) => void;
  setPersonalTestimony: (text: string) => void;
  setMilestone: (key: keyof BaptismProgressState['milestones'], value: boolean) => void;
  setAgendaProgram: (partial: Partial<AgendaProgram>) => void;
  getCompletedChecklistCount: () => number;
  getTotalChecklistCount: () => number;
}

const initialMilestones: BaptismProgressState['milestones'] = {
  restoration: false,
  planOfSalvation: false,
  gospelOfJesusChrist: false,
  commandments: false,
  churchAttendance: false,
  interview: false,
  dateScheduled: false,
};

export const useBaptismProgressStore = create<
  BaptismProgressState & BaptismProgressActions
>()(
  persist(
    (set, get) => ({
      completedChecklist: {},
      milestones: initialMilestones,

      toggleChecklistItem: (id: string) => {
        set((state) => ({
          completedChecklist: {
            ...state.completedChecklist,
            [id]: !state.completedChecklist[id],
          },
        }));
      },

      setChecklistItem: (id: string, checked: boolean) => {
        set((state) => ({
          completedChecklist: {
            ...state.completedChecklist,
            [id]: checked,
          },
        }));
      },

      setBaptismDetails: (details) => {
        set((state) => {
          const updates: Partial<BaptismProgressState> = {};
          if (details.baptismDate !== undefined) updates.baptismDate = details.baptismDate;
          if (details.location !== undefined) updates.location = details.location;
          if (details.performedBy !== undefined) updates.performedBy = details.performedBy;
          if (details.guests !== undefined) updates.guests = details.guests;
          const nextBaptismDate = details.baptismDate ?? state.baptismDate;
          return {
            ...state,
            ...updates,
            milestones: {
              ...state.milestones,
              dateScheduled: !!nextBaptismDate,
            },
          };
        });
      },

      setPersonalTestimony: (text: string) => {
        set({ personalTestimony: text });
      },

      setMilestone: (key, value) => {
        set((state) => ({
          milestones: { ...state.milestones, [key]: value },
        }));
      },

      setAgendaProgram: (partial) => {
        set((state) => ({
          agendaProgram: {
            confirmImmediately: state.agendaProgram?.confirmImmediately ?? false,
            speakerName: state.agendaProgram?.speakerName,
            openingPrayerBy: state.agendaProgram?.openingPrayerBy,
            closingPrayerBy: state.agendaProgram?.closingPrayerBy,
            hymn1: state.agendaProgram?.hymn1,
            hymn2: state.agendaProgram?.hymn2,
            hymn3: state.agendaProgram?.hymn3,
            ...partial,
          },
        }));
      },

      getCompletedChecklistCount: () => {
        return Object.values(get().completedChecklist).filter(Boolean).length;
      },

      getTotalChecklistCount: () => {
        return Object.keys(get().completedChecklist).length;
      },
    }),
    {
      name: 'baptism-preparation-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        completedChecklist: state.completedChecklist,
        baptismDate: state.baptismDate,
        location: state.location,
        performedBy: state.performedBy,
        guests: state.guests,
        personalTestimony: state.personalTestimony,
        milestones: state.milestones,
        agendaProgram: state.agendaProgram,
      }),
    }
  )
);

/** Check if user is ready for baptism (4 lessons + church + interview + testimony >= 40 chars; date optional) */
export function isReadyForBaptism(state: BaptismProgressState): boolean {
  const { milestones, completedChecklist, personalTestimony } = state;

  const interviewIds =
    baptismPreparation.sections
      .find((s) => s.id === 'interview')
      ?.checklist?.map((c) => c.id) ?? [];

  const interviewDone =
    interviewIds.length > 0 &&
    interviewIds.every((id) => Boolean(completedChecklist[id]));

  const testimonyOk = (personalTestimony?.trim().length ?? 0) >= 40;

  return (
    Boolean(milestones.restoration) &&
    Boolean(milestones.planOfSalvation) &&
    Boolean(milestones.gospelOfJesusChrist) &&
    Boolean(milestones.commandments) &&
    Boolean(milestones.churchAttendance) &&
    interviewDone &&
    testimonyOk
  );
}
