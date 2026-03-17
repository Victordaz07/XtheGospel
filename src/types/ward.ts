/**
 * Ward (Barrio) Types
 * 
 * Defines the structure for wards/branches and their join codes.
 * Shared between members and leaders apps.
 */

// ============================================================================
// WARD / BARRIO
// ============================================================================

export interface Ward {
  id: string;
  name: string;
  type: 'ward' | 'branch'; // Barrio o Rama
  
  // Stake / District info
  stakeId?: string;
  stakeName?: string;
  stakeType?: 'stake' | 'district'; // Estaca o Distrito
  
  // Location
  country?: string;
  city?: string;
  
  // Join code
  joinCode: string;
  joinCodeCreatedAt: number; // timestamp
  joinCodeCreatedBy: string; // uid del creador
  
  // Metadata
  createdAt: number;
  createdBy: string;
  updatedAt: number;
  
  // Stats (optional, updated periodically)
  memberCount?: number;
  leaderCount?: number;

  /** UIDs de miembros (para reglas Firestore v2). Incluye líderes. */
  memberIds?: string[];
  /** UIDs de líderes (obispado, etc.) con permisos de escritura en ward. */
  leaderIds?: string[];
}

// ============================================================================
// JOIN CODE
// ============================================================================

export interface WardJoinCode {
  code: string;
  wardId: string;
  wardName: string;
  stakeId?: string;
  stakeName?: string;
  
  // Security
  createdAt: number;
  createdBy: string;
  expiresAt?: number; // Optional expiration
  isActive: boolean;
  
  // Usage tracking
  maxUses?: number;
  currentUses: number;
}

// ============================================================================
// USER WARD MEMBERSHIP
// ============================================================================

export interface UserWardMembership {
  wardId: string;
  wardName: string;
  stakeId?: string;
  stakeName?: string;
  joinedAt: number;
  joinedVia: 'code' | 'created' | 'invited';
}

// ============================================================================
// JOIN WARD REQUEST
// ============================================================================

export interface JoinWardRequest {
  code: string;
}

// ============================================================================
// JOIN WARD RESULT
// ============================================================================

export interface JoinWardResult {
  success: boolean;
  error?: 'invalid_code' | 'code_expired' | 'code_inactive' | 'max_uses_reached' | 'already_member';
  ward?: Ward;
}

// ============================================================================
// HELPERS
// ============================================================================

export function normalizeWardCode(code: string): string {
  // Remove spaces, dashes, and convert to uppercase
  return code.replace(/[\s-]/g, '').toUpperCase();
}

export function formatWardCode(code: string): string {
  // Format code as XXX-XXX
  const normalized = normalizeWardCode(code);
  if (normalized.length !== 6) return code;
  return `${normalized.slice(0, 3)}-${normalized.slice(3, 6)}`;
}
