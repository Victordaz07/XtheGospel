/**
 * Leadership Invitation Types
 * 
 * Types for receiving and responding to leadership calling invitations.
 * Members receive invitations here and accept/decline them.
 * 
 * Updated to support 65+ roles from the template-based role system.
 */

/** 
 * Leadership role ID 
 * Uses string type to support 65+ roles defined in the leaders app.
 * Examples: 'bishop', 'eq_president', 'rs_first_counselor', 'valiant_8_teacher'
 */
export type LeadershipRole = string;

/** Invitation status */
export type InvitationStatus = 
  | 'pending'    // Sent, waiting for response
  | 'accepted'   // Member accepted the calling
  | 'declined'   // Member declined
  | 'expired'    // Invitation expired (not responded in time)
  | 'revoked';   // Bishopric cancelled the invitation

/** Permission level for roles */
export type PermissionLevel = 'bishopric' | 'presidency' | 'auxiliary' | 'teacher' | 'support';

/** Leadership invitation received by member */
export interface LeadershipInvitation {
  id: string;
  
  // Who is being invited (this member)
  inviteeUid: string;
  inviteeXtgId: string;
  inviteeName: string;
  
  // What role is being offered
  role: LeadershipRole;
  roleName: string;
  organization: string;
  permissionLevel?: PermissionLevel;
  
  // Ward information
  wardId: string;
  wardName: string;
  stakeId?: string;
  stakeName?: string;
  
  // Who sent the invitation
  invitedBy: string;
  invitedByName: string;
  invitedByRole: LeadershipRole;
  
  // Status
  status: InvitationStatus;
  
  // Timestamps
  createdAt: number;
  expiresAt: number;
  respondedAt?: number;
  
  // Optional message from bishopric
  message?: string;
  
  // Training requirements
  requiresTraining?: boolean;
  trainingModules?: string[];
}

/** Leadership role assignment (stored in user profile) */
export interface LeadershipAssignment {
  role: LeadershipRole;
  roleName: string;
  roleShort?: string;
  organization: string;
  permissionLevel?: PermissionLevel;
  wardId: string;
  wardName: string;
  stakeId?: string;
  stakeName?: string;
  
  // Assignment info
  assignedBy: string;
  assignedByName: string;
  assignedAt: number;
  acceptedAt: number;
  
  // Training status
  requiresTraining: boolean;
  trainingModules: string[];
  trainingCompleted: boolean;
  trainingCompletedAt?: number;
  
  // Capabilities granted (for reference)
  capabilities?: string[];
  dashboardModules?: string[];
  
  // Status
  isActive: boolean;
  releasedAt?: number;
  releasedBy?: string;
}

/** Response to an invitation */
export interface InvitationResponse {
  accepted: boolean;
  message?: string;
}

/** Result of invitation operations */
export interface InvitationResult {
  success: boolean;
  error?: 'not_found' | 'expired' | 'already_responded' | 'unauthorized' | 'unknown';
  invitation?: LeadershipInvitation;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/** Invitation expiry time: 30 days */
export const INVITATION_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000;

// ============================================================================
// HELPERS
// ============================================================================

/** Check if an invitation is expired */
export function isInvitationExpired(invitation: LeadershipInvitation): boolean {
  return Date.now() > invitation.expiresAt;
}

/** Check if an invitation can be responded to */
export function canRespondToInvitation(invitation: LeadershipInvitation): boolean {
  return invitation.status === 'pending' && !isInvitationExpired(invitation);
}

/** Get human-readable status */
export function getInvitationStatusLabel(status: InvitationStatus): string {
  const labels: Record<InvitationStatus, string> = {
    pending: 'Pendiente',
    accepted: 'Aceptado',
    declined: 'Declinado',
    expired: 'Expirado',
    revoked: 'Cancelado',
  };
  return labels[status] || status;
}

/** Get days remaining until expiry */
export function getDaysUntilExpiry(invitation: LeadershipInvitation): number {
  const msRemaining = invitation.expiresAt - Date.now();
  return Math.max(0, Math.ceil(msRemaining / (24 * 60 * 60 * 1000)));
}

/** Get permission level label */
export function getPermissionLevelLabel(level: PermissionLevel): string {
  const labels: Record<PermissionLevel, string> = {
    bishopric: 'Obispado',
    presidency: 'Presidencia',
    auxiliary: 'Auxiliar',
    teacher: 'Maestro',
    support: 'Apoyo',
  };
  return labels[level] || level;
}
