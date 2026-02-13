/**
 * Leadership Invitation Service - Members App
 * 
 * Handles receiving and responding to leadership invitations.
 * Members use this to accept or decline callings.
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { getFirebaseDb } from './firebaseApp';
import {
  LeadershipInvitation,
  LeadershipAssignment,
  InvitationResult,
  InvitationStatus,
  isInvitationExpired,
} from '../../types/leadershipInvitation';

const INVITATIONS_COLLECTION = 'leadershipInvitations';
const USERS_COLLECTION = 'users';

/**
 * Get all pending invitations for the current user
 */
export async function getMyPendingInvitations(uid: string): Promise<LeadershipInvitation[]> {
  try {
    const db = getFirebaseDb();
    const q = query(
      collection(db, INVITATIONS_COLLECTION),
      where('inviteeUid', '==', uid),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    const invitations = snapshot.docs.map(doc => doc.data() as LeadershipInvitation);
    
    // Filter out expired ones
    return invitations.filter(inv => !isInvitationExpired(inv));
  } catch (error) {
    console.error('Error getting invitations:', error);
    return [];
  }
}

/**
 * Get all invitations for the current user (including past)
 */
export async function getMyInvitations(uid: string): Promise<LeadershipInvitation[]> {
  try {
    const db = getFirebaseDb();
    const q = query(
      collection(db, INVITATIONS_COLLECTION),
      where('inviteeUid', '==', uid),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as LeadershipInvitation);
  } catch (error) {
    console.error('Error getting invitations:', error);
    return [];
  }
}

/**
 * Get a specific invitation
 */
export async function getInvitation(invitationId: string): Promise<LeadershipInvitation | null> {
  try {
    const db = getFirebaseDb();
    const docRef = doc(db, INVITATIONS_COLLECTION, invitationId);
    const snapshot = await getDoc(docRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return snapshot.data() as LeadershipInvitation;
  } catch (error) {
    console.error('Error getting invitation:', error);
    return null;
  }
}

/**
 * Accept a leadership invitation
 */
export async function acceptInvitation(
  invitationId: string,
  memberUid: string
): Promise<InvitationResult> {
  try {
    // Get the invitation
    const invitation = await getInvitation(invitationId);
    
    if (!invitation) {
      return { success: false, error: 'not_found' };
    }
    
    // Verify it's for this user
    if (invitation.inviteeUid !== memberUid) {
      return { success: false, error: 'unauthorized' };
    }
    
    // Check if still pending
    if (invitation.status !== 'pending') {
      return { success: false, error: 'already_responded' };
    }
    
    // Check if expired
    if (isInvitationExpired(invitation)) {
      return { success: false, error: 'expired' };
    }
    
    const now = Date.now();
    const db = getFirebaseDb();
    
    // Update invitation status
    const invitationRef = doc(db, INVITATIONS_COLLECTION, invitationId);
    await updateDoc(invitationRef, {
      status: 'accepted' as InvitationStatus,
      respondedAt: now,
    });
    
    // Create leadership assignment in user profile
    const assignment: LeadershipAssignment = {
      role: invitation.role,
      roleName: invitation.roleName,
      roleShort: invitation.roleName, // Use full name if short not provided
      organization: invitation.organization,
      permissionLevel: invitation.permissionLevel,
      wardId: invitation.wardId,
      wardName: invitation.wardName,
      stakeId: invitation.stakeId,
      stakeName: invitation.stakeName,
      assignedBy: invitation.invitedBy,
      assignedByName: invitation.invitedByName,
      assignedAt: invitation.createdAt,
      acceptedAt: now,
      requiresTraining: invitation.requiresTraining || false,
      trainingModules: invitation.trainingModules || [],
      trainingCompleted: false,
      capabilities: [],
      dashboardModules: [],
      isActive: true,
    };
    
    // Update user profile with the leadership assignment
    const userRef = doc(db, USERS_COLLECTION, memberUid);
    await updateDoc(userRef, {
      leadershipAssignment: assignment,
      'apps.leader': true,
      updatedAt: now,
    });
    
    return {
      success: true,
      invitation: {
        ...invitation,
        status: 'accepted',
        respondedAt: now,
      },
    };
  } catch (error) {
    console.error('Error accepting invitation:', error);
    return { success: false, error: 'unknown' };
  }
}

/**
 * Decline a leadership invitation
 */
export async function declineInvitation(
  invitationId: string,
  memberUid: string
): Promise<InvitationResult> {
  try {
    // Get the invitation
    const invitation = await getInvitation(invitationId);
    
    if (!invitation) {
      return { success: false, error: 'not_found' };
    }
    
    // Verify it's for this user
    if (invitation.inviteeUid !== memberUid) {
      return { success: false, error: 'unauthorized' };
    }
    
    // Check if still pending
    if (invitation.status !== 'pending') {
      return { success: false, error: 'already_responded' };
    }
    
    const now = Date.now();
    const db = getFirebaseDb();
    
    // Update invitation status
    const invitationRef = doc(db, INVITATIONS_COLLECTION, invitationId);
    await updateDoc(invitationRef, {
      status: 'declined' as InvitationStatus,
      respondedAt: now,
    });
    
    return {
      success: true,
      invitation: {
        ...invitation,
        status: 'declined',
        respondedAt: now,
      },
    };
  } catch (error) {
    console.error('Error declining invitation:', error);
    return { success: false, error: 'unknown' };
  }
}

/**
 * Get count of pending invitations (for notification badge)
 */
export async function getPendingInvitationsCount(uid: string): Promise<number> {
  try {
    const invitations = await getMyPendingInvitations(uid);
    return invitations.length;
  } catch (error) {
    console.error('Error getting invitation count:', error);
    return 0;
  }
}
