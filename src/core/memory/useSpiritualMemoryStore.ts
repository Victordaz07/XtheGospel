/**
 * Spiritual Memory Store
 * Sprint 8 - Local, minimal, privacy-first
 * 
 * Stores gentle continuity data in localStorage.
 * NOT analytics. NOT tracking. Just memory for user convenience.
 * 
 * Resilient: Works even if localStorage is blocked/corrupted.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * BOUNDARY DECLARATION (Sprint 9)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This store manages PASTORAL MEMORY:
 *   - Last lesson visited (for gentle "continue where you left off")
 *   - Journal activity markers (presence only, not content)
 * 
 * This store does NOT:
 *   - Track identity (see /core/identity/)
 *   - Measure time spent or usage frequency
 *   - Score spiritual "progress" or compare users
 *   - Sync to any backend or analytics service
 * 
 * ISOLATION RULES:
 *   - DO NOT import from /core/identity/
 *   - DO NOT import from /core/journey/
 *   - These domains must remain independent
 * 
 * DATA PHILOSOPHY:
 *   Memory exists to serve the user, not to surveil them.
 *   If a feature requires tracking, it doesn't belong here.
 * 
 * @see /docs/ETHICAL_BOUNDARIES.md
 * ═══════════════════════════════════════════════════════════════════════════
 */
import { create } from 'zustand';

const STORAGE_KEY = 'xtg_spiritual_memory_v1';

export interface SpiritualMemory {
  lastLessonId?: string;
  lastLessonTitle?: string;
  lastVisitedAt?: string; // ISO timestamp
  lastJournalEntryAt?: string; // ISO timestamp
  lastSavedToJournalAt?: string; // ISO timestamp
}

interface SpiritualMemoryState extends SpiritualMemory {
  // Actions
  setLastLesson: (lesson: { id: string; title: string }) => void;
  markJournalEntry: () => void;
  markSavedToJournal: () => void;
  clearMemory: () => void;
  // Hydration
  isHydrated: boolean;
  hydrate: () => void;
}

/**
 * Safely read from localStorage with fallback
 */
function readFromStorage(): SpiritualMemory {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return {};
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    // Validate it's an object
    if (typeof parsed !== 'object' || parsed === null) {
      return {};
    }
    return parsed as SpiritualMemory;
  } catch {
    // Corrupted or blocked - return empty
    return {};
  }
}

/**
 * Safely write to localStorage
 */
function writeToStorage(memory: SpiritualMemory): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  } catch {
    // Storage blocked or quota exceeded - fail silently
  }
}

/**
 * Extract only the memory fields (not actions/state)
 */
function extractMemory(state: SpiritualMemoryState): SpiritualMemory {
  return {
    lastLessonId: state.lastLessonId,
    lastLessonTitle: state.lastLessonTitle,
    lastVisitedAt: state.lastVisitedAt,
    lastJournalEntryAt: state.lastJournalEntryAt,
    lastSavedToJournalAt: state.lastSavedToJournalAt,
  };
}

export const useSpiritualMemoryStore = create<SpiritualMemoryState>((set, get) => ({
  // Initial state (empty until hydrated)
  lastLessonId: undefined,
  lastLessonTitle: undefined,
  lastVisitedAt: undefined,
  lastJournalEntryAt: undefined,
  lastSavedToJournalAt: undefined,
  isHydrated: false,

  /**
   * Hydrate state from localStorage
   */
  hydrate: () => {
    const stored = readFromStorage();
    set({
      ...stored,
      isHydrated: true,
    });
  },

  /**
   * Remember the last visited lesson/topic
   */
  setLastLesson: ({ id, title }) => {
    const now = new Date().toISOString();
    set({
      lastLessonId: id,
      lastLessonTitle: title,
      lastVisitedAt: now,
    });
    // Persist
    const memory = extractMemory({
      ...get(),
      lastLessonId: id,
      lastLessonTitle: title,
      lastVisitedAt: now,
    });
    writeToStorage(memory);
  },

  /**
   * Mark that a journal entry was created
   */
  markJournalEntry: () => {
    const now = new Date().toISOString();
    set({ lastJournalEntryAt: now });
    const memory = extractMemory({
      ...get(),
      lastJournalEntryAt: now,
    });
    writeToStorage(memory);
  },

  /**
   * Mark that something was saved to journal (from lesson/topic detail)
   */
  markSavedToJournal: () => {
    const now = new Date().toISOString();
    set({ lastSavedToJournalAt: now });
    const memory = extractMemory({
      ...get(),
      lastSavedToJournalAt: now,
    });
    writeToStorage(memory);
  },

  /**
   * Clear all memory (for future settings/privacy)
   */
  clearMemory: () => {
    set({
      lastLessonId: undefined,
      lastLessonTitle: undefined,
      lastVisitedAt: undefined,
      lastJournalEntryAt: undefined,
      lastSavedToJournalAt: undefined,
    });
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Fail silently
    }
  },
}));

/**
 * Hook to check if user has any journal activity recorded
 * Privacy-first: just checks existence, no time evaluation
 */
export function useHasJournalActivity(): boolean {
  const { lastJournalEntryAt, lastSavedToJournalAt } = useSpiritualMemoryStore();
  return Boolean(lastJournalEntryAt || lastSavedToJournalAt);
}
