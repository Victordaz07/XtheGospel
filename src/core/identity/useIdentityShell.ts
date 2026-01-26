/**
 * Identity Shell
 * Sprint 9 - Identity Readiness (without auth)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * BOUNDARY DECLARATION
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This module defines the IDENTITY BOUNDARY for xTheGospel.
 * 
 * CRITICAL PRINCIPLES:
 *   Identity ≠ Spiritual State
 *   Identity ≠ Worthiness
 *   Identity ≠ Activity
 *   Identity = Technical continuity, nothing more.
 * 
 * This shell exists to:
 *   1. Establish a clear separation between identity and spiritual data
 *   2. Prepare for future auth without mixing concerns
 *   3. Codify ethical boundaries in architecture
 * 
 * This shell does NOT:
 *   - Track usage frequency
 *   - Measure "spiritual activity"
 *   - Score or compare users
 *   - Connect to journeyStore or spiritualMemoryStore
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * @see /docs/ETHICAL_BOUNDARIES.md for full ethical guidelines
 */

const STORAGE_KEY = 'xtg_identity_shell_v1';

/**
 * User consent for data persistence.
 * Explicit consent is required for any future sync capabilities.
 */
export interface IdentityConsent {
  /** User explicitly consents to local persistence */
  localPersistence: boolean;
  /** User explicitly consents to future cloud sync (when/if implemented) */
  futureSync: boolean;
}

/**
 * Identity Shell - Technical identity placeholder.
 * 
 * This is NOT:
 *   - Spiritual worth
 *   - Progress measurement
 *   - Activity tracking
 *   - Behavioral analytics
 * 
 * This IS:
 *   - A technical boundary for future auth
 *   - Consent tracking for privacy
 *   - Device-local continuity marker
 */
export interface IdentityShell {
  /** Future UID when auth is implemented. Currently always undefined. */
  userId?: string;
  /** Local creation timestamp. Never synced. */
  createdAt?: string;
  /** Explicit user consent */
  consent?: IdentityConsent;
}

/**
 * Actions available for identity management.
 * Intentionally minimal - identity is not a feature.
 */
export interface IdentityActions {
  /** Initialize identity shell with local timestamp */
  initializeIdentity: () => void;
  /** Update consent preferences */
  updateConsent: (consent: IdentityConsent) => void;
  /** Clear all identity data (privacy control) */
  clearIdentity: () => void;
  /** Get current identity shell state */
  getIdentity: () => IdentityShell;
}

/**
 * Safely read identity shell from localStorage.
 * Returns empty object on any error (resilient by design).
 */
function readFromStorage(): IdentityShell {
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
    return parsed as IdentityShell;
  } catch {
    // Corrupted or blocked - return empty, fail silently
    return {};
  }
}

/**
 * Safely write identity shell to localStorage.
 * Fails silently if storage is blocked or quota exceeded.
 */
function writeToStorage(shell: IdentityShell): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shell));
  } catch {
    // Storage blocked or quota exceeded - fail silently
  }
}

/**
 * Remove identity shell from localStorage.
 */
function removeFromStorage(): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Fail silently
  }
}

/**
 * Identity Shell Actions
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ARCHITECTURAL NOTE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This is NOT a Zustand store intentionally.
 * Identity shell is meant to be:
 *   - Checked rarely (not reactive)
 *   - Updated only on explicit user action
 *   - Completely independent from UI state
 * 
 * Using simple functions keeps this layer separate from the reactive
 * stores used for journey and spiritual memory.
 * 
 * DO NOT import journeyStore or spiritualMemoryStore here.
 * DO NOT import this in journeyStore or spiritualMemoryStore.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */
export const identityShell: IdentityActions = {
  /**
   * Initialize identity shell.
   * Creates a local timestamp marker.
   * Does NOT create a userId (that requires future auth).
   */
  initializeIdentity: (): void => {
    const existing = readFromStorage();
    if (existing.createdAt) {
      // Already initialized - preserve existing data
      return;
    }
    const shell: IdentityShell = {
      createdAt: new Date().toISOString(),
      consent: {
        localPersistence: true, // Default: allow local
        futureSync: false,      // Default: no sync until explicit consent
      },
    };
    writeToStorage(shell);
  },

  /**
   * Update user consent preferences.
   * Consent is explicit and user-controlled.
   */
  updateConsent: (consent: IdentityConsent): void => {
    const existing = readFromStorage();
    const updated: IdentityShell = {
      ...existing,
      consent,
    };
    writeToStorage(updated);
  },

  /**
   * Clear all identity data.
   * Complete privacy control for the user.
   */
  clearIdentity: (): void => {
    removeFromStorage();
  },

  /**
   * Get current identity shell state.
   * Returns empty object if not initialized.
   */
  getIdentity: (): IdentityShell => {
    return readFromStorage();
  },
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * EXPORT BOUNDARY MARKER
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This module exports:
 *   - IdentityShell (type) - for typing only
 *   - IdentityConsent (type) - for typing only
 *   - identityShell (actions) - for rare, explicit identity operations
 * 
 * This module does NOT export:
 *   - React hooks (identity is not reactive UI state)
 *   - Zustand stores (identity is not app state)
 *   - Any analytics or tracking utilities
 * 
 * If you're tempted to add more exports, ask:
 *   "Does this respect the identity boundary?"
 *   "Could this enable spiritual surveillance?"
 *   "Is this needed, or just convenient?"
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */
