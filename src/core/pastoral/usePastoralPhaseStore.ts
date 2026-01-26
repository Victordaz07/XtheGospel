/**
 * Pastoral Phase Store
 * Sprint 12 - Internal contextual state for new member accompaniment
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * IMPORTANT: THIS IS CONTEXTUAL, NOT PROGRESS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Pastoral phase is NOT:
 *   - A level or achievement
 *   - Something the user sees or "unlocks"
 *   - A measure of spiritual worthiness
 *   - A gamification mechanic
 * 
 * Pastoral phase IS:
 *   - Internal context for adapting tone and UX
 *   - A way to reduce anxiety, not increase it
 *   - Invisible to the user — they never see "Phase 1" or "Phase 2"
 * 
 * The phase affects only:
 *   - Language/copy shown (more reassuring in 'stabilizing')
 *   - Visual density (more white space in 'stabilizing')
 *   - Tone of messages (permission, not instruction)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ETHICAL BOUNDARIES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This store does NOT:
 *   - Track usage patterns or frequency
 *   - Measure "engagement" or "retention"
 *   - Auto-advance based on metrics
 *   - Connect to analytics or backend
 * 
 * Phase transitions are:
 *   - Manual and intentional (for future development)
 *   - Never automatic based on usage tracking
 *   - Designed to be controlled by pastoral judgment, not algorithms
 * 
 * ISOLATION RULES:
 *   - DO NOT import from /core/identity/
 *   - DO NOT import from /core/memory/
 *   - DO NOT import from /core/journey/
 *   - This domain must remain independent
 * 
 * @see /docs/ETHICAL_BOUNDARIES.md
 * ═══════════════════════════════════════════════════════════════════════════
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Pastoral phases for new member accompaniment.
 * 
 * 'stabilizing' — First weeks/months after baptism
 *   - User may feel overwhelmed or anxious
 *   - UX should be calming, reassuring
 *   - Message: "There's no rush. Breathe."
 * 
 * 'rhythm' — After initial stabilization
 *   - User is finding their sustainable pace
 *   - UX can introduce gentle consistency themes
 *   - Message: "Consistency matters more than intensity."
 * 
 * Future phases (Sprint 13-14):
 *   - 'understanding' — Connecting doctrine to life
 *   - 'belonging' — Feeling part of community
 *   - 'integration' — Faith as identity
 *   - 'abiding' — Mature, quiet faith
 */
export type PastoralPhase = 'stabilizing' | 'rhythm';

interface PastoralPhaseState {
  /**
   * Current pastoral phase.
   * Default: 'stabilizing' for new members.
   */
  phase: PastoralPhase;
  
  /**
   * Advance to the next pastoral phase.
   * 
   * IMPORTANT: This is NOT exposed in UI.
   * Reserved for future pastoral/ethical activation:
   *   - Manual decision by development team
   *   - Future feedback mechanism
   *   - Never automatic based on usage metrics
   * 
   * @future Sprint 13+ may introduce ethical activation paths
   */
  advancePastoralPhase: () => void;
  
  /**
   * Set phase directly (for development/testing only).
   * In production, prefer advancePastoralPhase().
   */
  setPhase: (phase: PastoralPhase) => void;
  
  /**
   * Reset to default state.
   * Used when clearing user data.
   */
  resetPhase: () => void;
}

/**
 * Phase progression order.
 * Simple linear for now; future sprints may add more phases.
 */
const PHASE_ORDER: PastoralPhase[] = ['stabilizing', 'rhythm'];

export const usePastoralPhaseStore = create<PastoralPhaseState>()(
  persist(
    (set, get) => ({
      // Default: new members start in 'stabilizing'
      phase: 'stabilizing',

      advancePastoralPhase: () => {
        const currentPhase = get().phase;
        const currentIndex = PHASE_ORDER.indexOf(currentPhase);
        const nextIndex = currentIndex + 1;
        
        // Only advance if there's a next phase
        if (nextIndex < PHASE_ORDER.length) {
          set({ phase: PHASE_ORDER[nextIndex] });
        }
        // If already at last phase, do nothing (no regression)
      },

      setPhase: (phase: PastoralPhase) => {
        set({ phase });
      },

      resetPhase: () => {
        set({ phase: 'stabilizing' });
      },
    }),
    {
      name: 'pastoral-phase-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Convenience hook for current phase.
 * Use this in components to adapt UX based on pastoral context.
 */
export function usePastoralPhase(): PastoralPhase {
  return usePastoralPhaseStore((s) => s.phase);
}

/**
 * Phase-aware copy/messaging helpers.
 * These return different text based on current phase.
 * 
 * Philosophy: The user never knows they're in a "phase".
 * They just experience different tones over time.
 */
export const PASTORAL_MESSAGES = {
  /**
   * Welcome/home screen primary message
   */
  homeWelcome: {
    stabilizing: "There's no rush here.\nFaith grows at its own pace.",
    rhythm: "You're finding your way.\nSmall steps matter most.",
  },
  
  /**
   * Encouragement message (footer)
   */
  encouragement: {
    stabilizing: "Some weeks are quieter. That's okay.\nThe Savior walks with you.",
    rhythm: "When you feel ready, you might return.\nThere's grace in the rhythm.",
  },
  
  /**
   * Continue/resume study message
   */
  continueStudy: {
    stabilizing: "When you're ready",
    rhythm: "Continue when you'd like",
  },
  
  /**
   * Progress page header
   */
  progressHeader: {
    stabilizing: "Your journey is unfolding",
    rhythm: "Walking your path",
  },
  
  /**
   * Progress empty state
   */
  progressEmpty: {
    stabilizing: "Your new beginning is sacred.\nEvery quiet moment of faith matters.",
    rhythm: "The path is yours to walk.\nThere's no schedule to keep.",
  },
} as const;

/**
 * Get message for current phase.
 * Usage: getPastoralMessage('homeWelcome', phase)
 */
export function getPastoralMessage(
  key: keyof typeof PASTORAL_MESSAGES,
  phase: PastoralPhase
): string {
  return PASTORAL_MESSAGES[key][phase];
}
