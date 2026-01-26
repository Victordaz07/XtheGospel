/**
 * Journey Store
 * Tracks ordinance dates and derives journey stage
 * No gamification - just quiet stage transitions
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * BOUNDARY DECLARATION (Sprint 9)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This store manages SPIRITUAL JOURNEY STATE:
 *   - Ordinance dates (baptism, confirmation)
 *   - Journey stage derivation (seeking → covenanted)
 * 
 * This store does NOT:
 *   - Track identity (see /core/identity/)
 *   - Store usage patterns or frequency
 *   - Evaluate spiritual "progress" or "worthiness"
 *   - Connect to identity or auth systems
 * 
 * ISOLATION RULES:
 *   - DO NOT import from /core/identity/
 *   - DO NOT import from /core/memory/
 *   - These domains must remain independent
 * 
 * @see /docs/ETHICAL_BOUNDARIES.md
 * ═══════════════════════════════════════════════════════════════════════════
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type JourneyStage = 'seeking' | 'covenanted' | 'member';

export interface OrdinanceDates {
  baptismDate?: string; // ISO yyyy-mm-dd
  confirmationDate?: string; // ISO yyyy-mm-dd
}

interface JourneyState {
  ordinanceDates: OrdinanceDates;
  
  // Actions
  setBaptismDate: (dateISO: string) => void;
  setConfirmationDate: (dateISO: string) => void;
  clearDates: () => void;
  
  // Derived (computed via selector)
  getStage: () => JourneyStage;
}

export const useJourneyStore = create<JourneyState>()(
  persist(
    (set, get) => ({
      ordinanceDates: {},

      setBaptismDate: (dateISO: string) => {
        set((state) => ({
          ordinanceDates: { ...state.ordinanceDates, baptismDate: dateISO },
        }));
      },

      setConfirmationDate: (dateISO: string) => {
        set((state) => ({
          ordinanceDates: { ...state.ordinanceDates, confirmationDate: dateISO },
        }));
      },

      clearDates: () => {
        set({ ordinanceDates: {} });
      },

      getStage: (): JourneyStage => {
        const { confirmationDate } = get().ordinanceDates;
        if (confirmationDate) {
          return 'covenanted';
        }
        return 'seeking';
      },
    }),
    {
      name: 'journey-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Convenience hook for stage
export function useJourneyStage(): JourneyStage {
  const getStage = useJourneyStore((s) => s.getStage);
  const ordinanceDates = useJourneyStore((s) => s.ordinanceDates);
  // Re-compute when ordinanceDates changes
  return ordinanceDates.confirmationDate ? 'covenanted' : 'seeking';
}

// Stage display labels (no gamification language)
export function getStageLabel(stage: JourneyStage): string {
  const labels: Record<JourneyStage, string> = {
    seeking: 'Learning and preparing',
    covenanted: 'Continuing as a new member',
    member: 'Growing in the gospel',
  };
  return labels[stage];
}
