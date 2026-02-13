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
 *   - Ordinance performers (who baptized, who confirmed)
 *   - Verification status (pending, verified, rejected)
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

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'none';

export interface OrdinanceDates {
  // Baptism
  baptismDate?: string; // ISO yyyy-mm-dd
  baptizedBy?: string;  // Name of who performed the baptism
  baptismWard?: string; // Ward where baptism occurred
  
  // Confirmation
  confirmationDate?: string; // ISO yyyy-mm-dd
  confirmedBy?: string;      // Name of who confirmed
  confirmationWard?: string; // Ward where confirmation occurred
  
  // Verification
  verificationStatus: VerificationStatus;
  verifiedBy?: string;       // Name of leader who verified
  verifiedByUid?: string;    // UID of leader who verified
  verifiedByRole?: string;   // Role of verifier (bishop, clerk, etc.)
  verifiedAt?: number;       // Timestamp of verification
  rejectionReason?: string;  // If rejected, why
}

interface JourneyState {
  ordinanceDates: OrdinanceDates;
  
  // Actions for dates
  setBaptismDate: (dateISO: string) => void;
  setBaptizedBy: (name: string) => void;
  setBaptismWard: (ward: string) => void;
  setConfirmationDate: (dateISO: string) => void;
  setConfirmedBy: (name: string) => void;
  setConfirmationWard: (ward: string) => void;
  
  // Bulk update
  updateOrdinanceInfo: (info: Partial<OrdinanceDates>) => void;
  
  // Verification actions (called by leaders)
  submitForVerification: () => void;
  verifyOrdinances: (verifierInfo: {
    name: string;
    uid: string;
    role: string;
  }) => void;
  rejectOrdinances: (verifierInfo: {
    name: string;
    uid: string;
    role: string;
  }, reason: string) => void;
  
  // Clear
  clearDates: () => void;
  
  // Derived (computed via selector)
  getStage: () => JourneyStage;
  isVerified: () => boolean;
  isPending: () => boolean;
}

const DEFAULT_ORDINANCE_DATES: OrdinanceDates = {
  verificationStatus: 'none',
};

export const useJourneyStore = create<JourneyState>()(
  persist(
    (set, get) => ({
      ordinanceDates: DEFAULT_ORDINANCE_DATES,

      setBaptismDate: (dateISO: string) => {
        set((state) => ({
          ordinanceDates: { 
            ...state.ordinanceDates, 
            baptismDate: dateISO,
            // Reset verification when dates change
            verificationStatus: state.ordinanceDates.verificationStatus === 'verified' 
              ? 'pending' 
              : state.ordinanceDates.verificationStatus,
          },
        }));
      },

      setBaptizedBy: (name: string) => {
        set((state) => ({
          ordinanceDates: { ...state.ordinanceDates, baptizedBy: name },
        }));
      },

      setBaptismWard: (ward: string) => {
        set((state) => ({
          ordinanceDates: { ...state.ordinanceDates, baptismWard: ward },
        }));
      },

      setConfirmationDate: (dateISO: string) => {
        set((state) => ({
          ordinanceDates: { 
            ...state.ordinanceDates, 
            confirmationDate: dateISO,
            verificationStatus: state.ordinanceDates.verificationStatus === 'verified' 
              ? 'pending' 
              : state.ordinanceDates.verificationStatus,
          },
        }));
      },

      setConfirmedBy: (name: string) => {
        set((state) => ({
          ordinanceDates: { ...state.ordinanceDates, confirmedBy: name },
        }));
      },

      setConfirmationWard: (ward: string) => {
        set((state) => ({
          ordinanceDates: { ...state.ordinanceDates, confirmationWard: ward },
        }));
      },

      updateOrdinanceInfo: (info: Partial<OrdinanceDates>) => {
        set((state) => ({
          ordinanceDates: { ...state.ordinanceDates, ...info },
        }));
      },

      submitForVerification: () => {
        const { ordinanceDates } = get();
        // Only submit if we have at least baptism info
        if (ordinanceDates.baptismDate && ordinanceDates.baptizedBy) {
          set((state) => ({
            ordinanceDates: { 
              ...state.ordinanceDates, 
              verificationStatus: 'pending',
            },
          }));
        }
      },

      verifyOrdinances: (verifierInfo) => {
        set((state) => ({
          ordinanceDates: {
            ...state.ordinanceDates,
            verificationStatus: 'verified',
            verifiedBy: verifierInfo.name,
            verifiedByUid: verifierInfo.uid,
            verifiedByRole: verifierInfo.role,
            verifiedAt: Date.now(),
            rejectionReason: undefined,
          },
        }));
      },

      rejectOrdinances: (verifierInfo, reason) => {
        set((state) => ({
          ordinanceDates: {
            ...state.ordinanceDates,
            verificationStatus: 'rejected',
            verifiedBy: verifierInfo.name,
            verifiedByUid: verifierInfo.uid,
            verifiedByRole: verifierInfo.role,
            verifiedAt: Date.now(),
            rejectionReason: reason,
          },
        }));
      },

      clearDates: () => {
        set({ ordinanceDates: DEFAULT_ORDINANCE_DATES });
      },

      getStage: (): JourneyStage => {
        const { confirmationDate, verificationStatus } = get().ordinanceDates;
        // Only count as covenanted if verified
        if (confirmationDate && verificationStatus === 'verified') {
          return 'covenanted';
        }
        return 'seeking';
      },

      isVerified: (): boolean => {
        return get().ordinanceDates.verificationStatus === 'verified';
      },

      isPending: (): boolean => {
        return get().ordinanceDates.verificationStatus === 'pending';
      },
    }),
    {
      name: 'journey-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/** Dev bypass: set localStorage.devBypassVerification = 'true' to skip verification for testing */
const DEV_BYPASS_KEY = 'devBypassVerification';

export function isDevBypassActive(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(DEV_BYPASS_KEY) === 'true';
}

export function setDevBypass(active: boolean): void {
  if (typeof window === 'undefined') return;
  if (active) {
    localStorage.setItem(DEV_BYPASS_KEY, 'true');
  } else {
    localStorage.removeItem(DEV_BYPASS_KEY);
  }
}

// Convenience hook for stage
export function useJourneyStage(): JourneyStage {
  const ordinanceDates = useJourneyStore((s) => s.ordinanceDates);
  // Dev bypass: skip verification for testing
  if (isDevBypassActive()) {
    return 'covenanted';
  }
  // Only covenanted if verified
  if (ordinanceDates.confirmationDate && ordinanceDates.verificationStatus === 'verified') {
    return 'covenanted';
  }
  return 'seeking';
}

// Stage display labels (no gamification language)
export function getStageLabel(stage: JourneyStage): string {
  const labels: Record<JourneyStage, string> = {
    seeking: 'Aprendiendo y preparándose',
    covenanted: 'Creciendo como nuevo miembro',
    member: 'Creciendo en el evangelio',
  };
  return labels[stage];
}

// Verification status labels
export function getVerificationLabel(status: VerificationStatus): string {
  const labels: Record<VerificationStatus, string> = {
    none: 'Sin enviar',
    pending: 'Pendiente de verificación',
    verified: 'Verificado',
    rejected: 'Rechazado - revisar datos',
  };
  return labels[status];
}
