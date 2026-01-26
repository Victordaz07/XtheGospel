/**
 * Pastoral Phase Store
 * Sprint 12 - Initial stabilization and rhythm phases
 * Sprint 13 - Understanding and belonging phases
 * Sprint 14 - Integration and abiding phases (FINAL)
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
 *   - Sprint 13: Questions instead of statements in deeper phases
 *   - Sprint 14: Intentional withdrawal — the app steps back
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
 * Pastoral phases for member accompaniment.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * PHASE DESCRIPTIONS (COMPLETE)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 'stabilizing' — First weeks/months after baptism (Sprint 12)
 *   - User may feel overwhelmed or anxious
 *   - UX should be calming, reassuring
 *   - Message: "There's no rush. Breathe."
 *   - Tone: Permission, not instruction
 * 
 * 'rhythm' — After initial stabilization (Sprint 12)
 *   - User is finding their sustainable pace
 *   - UX can introduce gentle consistency themes
 *   - Message: "Consistency matters more than intensity."
 *   - Tone: Encouragement without pressure
 * 
 * 'understanding' — Connecting doctrine to life (Sprint 13)
 *   - User starts asking "why" questions
 *   - UX shifts from messages to questions
 *   - Question: "What has helped you stay close to the Savior?"
 *   - Tone: Reflection over instruction
 *   - Journal becomes central
 * 
 * 'belonging' — Feeling part of community (Sprint 13)
 *   - User seeks connection without performance
 *   - UX emphasizes presence over doing
 *   - Question: "Where do you feel most at home in your faith?"
 *   - Tone: Belonging without evaluation
 *   - More silence, fewer prompts
 * 
 * 'integration' — Faith as identity (Sprint 14)
 *   - User's faith is woven into daily life
 *   - UX becomes minimal — the app steps back
 *   - Message: "Your faith is already part of your life."
 *   - Tone: Affirmation of integration
 *   - The app no longer tries to guide
 * 
 * 'abiding' — Mature, quiet faith (Sprint 14)
 *   - User has internalized their spiritual practice
 *   - UX is almost invisible — maximum silence
 *   - Message: "Remain." (or nothing at all)
 *   - Tone: Presence without words
 *   - The app exists only when sought
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * SPRINT 14: INTENTIONAL WITHDRAWAL
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * In 'integration' and 'abiding' phases, the app INTENTIONALLY reduces
 * its presence. This is not missing content — it is a design decision.
 * 
 * Philosophy:
 *   "The app should not compete with lived faith."
 * 
 * The goal is for the user to feel:
 *   "I don't need this app... but I know it's here."
 * 
 * This is the highest form of pastoral accompaniment:
 * being present without being intrusive.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */
export type PastoralPhase = 
  | 'stabilizing' 
  | 'rhythm' 
  | 'understanding' 
  | 'belonging'
  | 'integration'
  | 'abiding';

interface PastoralPhaseState {
  /**
   * Current pastoral phase.
   * Default: 'stabilizing' for new members.
   */
  phase: PastoralPhase;
  
  /**
   * Advance to the next pastoral phase.
   * 
   * ═══════════════════════════════════════════════════════════════════════
   * ETHICAL TRANSITION POLICY
   * ═══════════════════════════════════════════════════════════════════════
   * 
   * This function is NOT exposed in UI.
   * It exists ONLY for future pastoral/ethical activation.
   * 
   * VALID activation paths (future):
   *   - Manual decision by pastoral leadership
   *   - User-initiated "I feel ready" (never prompted)
   *   - Time-based suggestion (never automatic)
   * 
   * INVALID activation paths (never):
   *   - Automatic based on usage metrics
   *   - Triggered by "engagement" data
   *   - Forced by algorithm
   * 
   * The transition should feel like:
   *   "The app noticed I've been here a while and gently adjusted"
   * NOT like:
   *   "I unlocked level 3!"
   * 
   * For 'integration' and 'abiding' phases:
   *   The app becomes quieter, not more rewarding.
   *   Reaching 'abiding' is not an achievement — it's a natural state.
   * 
   * ═══════════════════════════════════════════════════════════════════════
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
 * Phase progression order (COMPLETE).
 * Linear progression reflects natural spiritual development.
 * 
 * Note: Users may not progress linearly in real life,
 * but the app's default path is designed for gentle accompaniment.
 * 
 * The final phases ('integration', 'abiding') represent the app
 * stepping back — not the user "completing" something.
 */
const PHASE_ORDER: PastoralPhase[] = [
  'stabilizing',
  'rhythm',
  'understanding',
  'belonging',
  'integration',
  'abiding',
];

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
        // If already at 'abiding', do nothing
        // This is the final resting state — not an endpoint to celebrate
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
 * Check if current phase uses questions instead of statements.
 * Understanding and belonging phases use reflective questions.
 */
export function useIsReflectivePhase(): boolean {
  const phase = usePastoralPhase();
  return phase === 'understanding' || phase === 'belonging';
}

/**
 * Check if current phase is in withdrawal mode.
 * Integration and abiding phases intentionally reduce app presence.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * SPRINT 14: WITHDRAWAL PHASES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * When this returns true:
 *   - UI should be minimal (fewer cards, less text)
 *   - Messages should be brief or absent
 *   - No prompts, no CTAs, no guidance
 *   - The app exists only as a quiet presence
 * 
 * This is intentional design, not missing content.
 * ═══════════════════════════════════════════════════════════════════════════
 */
export function useIsWithdrawalPhase(): boolean {
  const phase = usePastoralPhase();
  return phase === 'integration' || phase === 'abiding';
}

/**
 * Check if current phase is the final 'abiding' state.
 * In this phase, the app is almost silent.
 */
export function useIsAbidingPhase(): boolean {
  const phase = usePastoralPhase();
  return phase === 'abiding';
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PASTORAL MESSAGES & QUESTIONS (COMPLETE)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Philosophy: The user never knows they're in a "phase".
 * They just experience different tones over time.
 * 
 * Sprint 12 phases (stabilizing, rhythm):
 *   - Use declarative messages of reassurance
 *   - "There's no rush" / "Small steps matter"
 * 
 * Sprint 13 phases (understanding, belonging):
 *   - Use open-ended questions
 *   - Questions invite reflection, not response
 *   - No CTA, no expected action
 * 
 * Sprint 14 phases (integration, abiding):
 *   - Minimal or no text
 *   - One short line or intentional silence
 *   - The app withdraws, not instructs
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */
export const PASTORAL_MESSAGES = {
  /**
   * Welcome/home screen primary content.
   * 
   * stabilizing/rhythm: Declarative reassurance
   * understanding/belonging: Open-ended question
   * integration/abiding: Minimal presence or silence
   */
  homeWelcome: {
    stabilizing: "There's no rush here.\nFaith grows at its own pace.",
    rhythm: "You're finding your way.\nSmall steps matter most.",
    understanding: "What has helped you stay close to the Savior lately?",
    belonging: "Where do you feel most at home in your faith right now?",
    integration: "Your faith is already part of your life.",
    abiding: "Remain.",
  },
  
  /**
   * Encouragement message (footer).
   * 
   * Earlier phases: More words, more reassurance
   * Later phases: Fewer words, more silence
   * Final phases: Almost nothing
   */
  encouragement: {
    stabilizing: "Some weeks are quieter. That's okay.\nThe Savior walks with you.",
    rhythm: "When you feel ready, you might return.\nThere's grace in the rhythm.",
    understanding: "Faith grows in questions, not just answers.",
    belonging: "You belong here, even on quiet weeks.",
    integration: "", // Intentional silence
    abiding: "", // Intentional silence
  },
  
  /**
   * Continue/resume study prompt.
   * 
   * Permission-based in all phases, but tone shifts:
   * Earlier: "When you're ready" (permission)
   * Later: More implicit, less directive
   * Final: Removed entirely
   */
  continueStudy: {
    stabilizing: "When you're ready",
    rhythm: "Continue when you'd like",
    understanding: "If you'd like to explore",
    belonging: "A quiet place to return",
    integration: "", // No prompt needed
    abiding: "", // No prompt needed
  },
  
  /**
   * Progress page header.
   * 
   * Earlier: "Journey" language
   * Later: "Presence" language
   * Final: Affirmation of life, not app activity
   */
  progressHeader: {
    stabilizing: "Your journey is unfolding",
    rhythm: "Walking your path",
    understanding: "Moments of presence",
    belonging: "You've been here",
    integration: "Faith lived",
    abiding: "", // Intentional silence — the header speaks for itself
  },
  
  /**
   * Progress empty state.
   * 
   * Earlier: Reassurance about beginning
   * Later: Affirmation of being, not doing
   * Final: Complete acceptance of non-activity
   */
  progressEmpty: {
    stabilizing: "Your new beginning is sacred.\nEvery quiet moment of faith matters.",
    rhythm: "The path is yours to walk.\nThere's no schedule to keep.",
    understanding: "Reflection doesn't need evidence.\nYour thoughts are enough.",
    belonging: "Presence matters more than activity.\nYou're here. That's enough.",
    integration: "Faith isn't something you finish.\nIt's something you live.",
    abiding: "You're living it.", // Brief, complete
  },

  /**
   * Journal invitation copy.
   * 
   * Sprint 13: Removes pressure to "write well"
   * Sprint 14: Normalizes long absence
   */
  journalInvite: {
    stabilizing: "A space for your thoughts",
    rhythm: "Write when you feel like it",
    understanding: "You don't need the right words.\nWrite what's true, not what sounds right.",
    belonging: "Your words are for you.\nNo one else needs to see them.",
    integration: "This space is here when you need it.",
    abiding: "You don't have to return often.",
  },

  /**
   * Community/belonging affirmation.
   * 
   * Sprint 13: Reinforces belonging without performance
   * Sprint 14: Affirms integration into life
   */
  belongingAffirmation: {
    stabilizing: "Your ward family is here to support you.",
    rhythm: "You're part of something bigger.",
    understanding: "Faith grows in community, not performance.",
    belonging: "You belong here.\nNot because of what you do, but because you're here.",
    integration: "Your faith is woven into your days.",
    abiding: "", // Silence is the affirmation
  },

  /**
   * Progress permanence message.
   * Sprint 14: Single message for integration/abiding that affirms
   * faith as life, not as app activity.
   */
  progressPermanence: {
    stabilizing: "",
    rhythm: "",
    understanding: "",
    belonging: "",
    integration: "Faith isn't something you finish.\nIt's something you live.",
    abiding: "You're living it.",
  },
} as const;

/**
 * Get message for current phase.
 * Usage: getPastoralMessage('homeWelcome', phase)
 * 
 * Note: In integration/abiding phases, many messages return empty strings.
 * This is intentional — silence is part of the design.
 */
export function getPastoralMessage(
  key: keyof typeof PASTORAL_MESSAGES,
  phase: PastoralPhase
): string {
  return PASTORAL_MESSAGES[key][phase];
}

/**
 * Check if the home content is a question (understanding/belonging).
 * Used to adjust typography and layout.
 */
export function isHomeContentQuestion(phase: PastoralPhase): boolean {
  return phase === 'understanding' || phase === 'belonging';
}

/**
 * Check if home should show minimal content (integration/abiding).
 * In these phases, home is deliberately sparse.
 */
export function isHomeMinimal(phase: PastoralPhase): boolean {
  return phase === 'integration' || phase === 'abiding';
}
