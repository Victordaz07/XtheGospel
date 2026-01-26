/**
 * Data Export Utility
 * Sprint 10 - Data Ownership & Export
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * PURPOSE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * "Everything you write here belongs to you.
 *  You can take it with you, anytime."
 * 
 * This utility enables users to:
 *   - Export their local data as a JSON file
 *   - Clear all local data safely
 *   - See exactly what exists (transparency)
 * 
 * PRINCIPLES:
 *   - Data ownership > features
 *   - No tracking
 *   - No hidden persistence
 *   - Privacy-first
 * 
 * @see /docs/ETHICAL_BOUNDARIES.md
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { GodStoryEntry } from '../../services/godStoryService';

// ============================================================================
// TYPES
// ============================================================================

/** Journey state from useJourneyStore */
export interface JourneyExport {
  ordinanceDates: {
    baptismDate?: string;
    confirmationDate?: string;
  };
}

/** Spiritual memory from useSpiritualMemoryStore */
export interface SpiritualMemoryExport {
  lastLessonId?: string;
  lastLessonTitle?: string;
  lastVisitedAt?: string;
  lastJournalEntryAt?: string;
  lastSavedToJournalAt?: string;
}

/** Leadership data exports */
export interface LeadershipExport {
  callings?: unknown;
  responsibilities?: unknown;
  notes?: unknown;
  events?: unknown;
  observations?: unknown;
  mode?: string;
  role?: string;
}

/** Complete export payload */
export interface ExportPayload {
  journey: JourneyExport;
  journal: GodStoryEntry[];
  spiritualMemory: SpiritualMemoryExport;
  leadership?: LeadershipExport;
  exportedAt: string;
  appVersion: string;
}

// ============================================================================
// STORAGE KEYS (User-facing data only)
// ============================================================================

/**
 * These are the localStorage keys that contain USER data.
 * We intentionally DO NOT export system/config keys.
 */
const USER_DATA_KEYS = {
  journey: 'journey-storage',           // Zustand persist
  spiritualMemory: 'xtg_spiritual_memory_v1',
  identityShell: 'xtg_identity_shell_v1',
  journal: '@godStory',
  lessonNotes: '@lessonNotes',
  commitments: '@investigatorCommitments',
  // Leadership data
  leadershipCallings: 'xtg_leadership_callings_v1',
  leadershipResponsibilities: 'xtg_leadership_responsibilities_v1',
  leadershipNotes: 'xtg_leadership_notes_v1',
  leadershipEvents: 'xtg_leadership_events_v1',
  leadershipObservations: 'xtg_leadership_observations_v1',
  mode: 'xtg_mode_v1',
  role: 'app.currentRole',
} as const;

// ============================================================================
// SAFE READ HELPERS
// ============================================================================

/**
 * Safely read and parse JSON from localStorage
 */
function safeReadJSON<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback;
    }
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

// ============================================================================
// EXPORT FUNCTION
// ============================================================================

/**
 * Gather all user data for export.
 * Returns a clean, structured payload.
 */
export function gatherExportData(): ExportPayload {
  // Journey state (Zustand persist format)
  const journeyRaw = safeReadJSON<{ state?: { ordinanceDates?: object } }>(
    USER_DATA_KEYS.journey,
    {}
  );
  const journey: JourneyExport = {
    ordinanceDates: journeyRaw?.state?.ordinanceDates || {},
  };

  // Journal entries
  const journal = safeReadJSON<GodStoryEntry[]>(USER_DATA_KEYS.journal, []);

  // Spiritual memory
  const spiritualMemory = safeReadJSON<SpiritualMemoryExport>(
    USER_DATA_KEYS.spiritualMemory,
    {}
  );

  // Leadership data
  const leadership: LeadershipExport = {
    callings: safeReadJSON(USER_DATA_KEYS.leadershipCallings, null),
    responsibilities: safeReadJSON(USER_DATA_KEYS.leadershipResponsibilities, null),
    notes: safeReadJSON(USER_DATA_KEYS.leadershipNotes, null),
    events: safeReadJSON(USER_DATA_KEYS.leadershipEvents, null),
    observations: safeReadJSON(USER_DATA_KEYS.leadershipObservations, null),
    mode: safeReadJSON<string>(USER_DATA_KEYS.mode, null),
    role: safeReadJSON<string>(USER_DATA_KEYS.role, null),
  };

  // Only include leadership if it has any data
  const hasLeadershipData = Object.values(leadership).some(v => v !== null && v !== undefined);

  return {
    journey,
    journal,
    spiritualMemory,
    ...(hasLeadershipData && { leadership }),
    exportedAt: new Date().toISOString(),
    appVersion: '1.0.0', // From package.json
  };
}

/**
 * Download data as a JSON file.
 * Creates a blob and triggers browser download.
 */
export function downloadExportFile(payload: ExportPayload): void {
  try {
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Generate filename with date
    const date = new Date().toISOString().split('T')[0];
    const filename = `xthegospel-export-${date}.json`;
    
    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error('Failed to export data. Please try again.');
  }
}

/**
 * Export user data - main entry point.
 * Gathers data and triggers download.
 */
export function exportLocalData(): void {
  const payload = gatherExportData();
  downloadExportFile(payload);
}

// ============================================================================
// CLEAR FUNCTION
// ============================================================================

/**
 * Get all localStorage keys that belong to the app (prefixed with xtg_ or in allowed list).
 * Used for comprehensive cleanup.
 */
export function getAllLocalKeys(): string[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }
  
  const keys: string[] = [];
  const knownKeys = Object.values(USER_DATA_KEYS) as string[];
  
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        // Include keys that start with xtg_ or are in our known list
        if (key.startsWith('xtg_') || knownKeys.includes(key)) {
          keys.push(key);
        }
      }
    }
  } catch (error) {
    console.warn('Error reading localStorage keys:', error);
  }
  
  return keys;
}

/**
 * Clear all user data from localStorage.
 * App will return to initial state.
 */
export function clearAllLocalData(): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    
    // Remove each known user data key
    Object.values(USER_DATA_KEYS).forEach((key) => {
      try {
        localStorage.removeItem(key);
      } catch {
        // Individual key removal failure - continue with others
      }
    });
    
    // Also remove any other xtg_ prefixed keys (catch-all for safety)
    const allKeys = getAllLocalKeys();
    allKeys.forEach((key) => {
      try {
        localStorage.removeItem(key);
      } catch {
        // Continue with others
      }
    });
    
    // Force page reload to reset app state
    window.location.reload();
  } catch (error) {
    console.error('Clear data failed:', error);
    throw new Error('Failed to clear data. Please try again.');
  }
}

// ============================================================================
// DATA INFO (for UI transparency)
// ============================================================================

export interface DataInfo {
  hasJourneyData: boolean;
  hasJournalEntries: boolean;
  hasSpiritualMemory: boolean;
  hasLeadershipData: boolean;
  journalEntryCount: number;
}

/**
 * Get information about what data exists.
 * Used to show users what they have stored.
 */
export function getDataInfo(): DataInfo {
  const journey = safeReadJSON<{ state?: { ordinanceDates?: object } }>(
    USER_DATA_KEYS.journey,
    {}
  );
  const journal = safeReadJSON<GodStoryEntry[]>(USER_DATA_KEYS.journal, []);
  const memory = safeReadJSON<SpiritualMemoryExport>(
    USER_DATA_KEYS.spiritualMemory,
    {}
  );

  // Check if any leadership data exists
  const hasLeadershipData = [
    USER_DATA_KEYS.leadershipCallings,
    USER_DATA_KEYS.leadershipResponsibilities,
    USER_DATA_KEYS.leadershipNotes,
    USER_DATA_KEYS.leadershipEvents,
    USER_DATA_KEYS.leadershipObservations,
    USER_DATA_KEYS.mode,
    USER_DATA_KEYS.role,
  ].some(key => {
    try {
      const value = localStorage.getItem(key);
      return value !== null && value !== undefined && value !== 'null';
    } catch {
      return false;
    }
  });

  return {
    hasJourneyData: Boolean(
      journey?.state?.ordinanceDates &&
      Object.keys(journey.state.ordinanceDates).length > 0
    ),
    hasJournalEntries: journal.length > 0,
    hasSpiritualMemory: Boolean(memory.lastLessonId || memory.lastVisitedAt),
    hasLeadershipData,
    journalEntryCount: journal.length,
  };
}

// ============================================================================
// EXPORT BOUNDARY MARKER
// ============================================================================

/**
 * This module exports ONLY:
 *   - exportLocalData() - trigger download
 *   - clearAllLocalData() - wipe and reset
 *   - gatherExportData() - get payload without download
 *   - getDataInfo() - transparency about what exists
 * 
 * This module does NOT:
 *   - Track exports
 *   - Send data anywhere
 *   - Log user actions
 *   - Connect to any backend
 */
