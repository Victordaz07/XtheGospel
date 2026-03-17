/**
 * Ward Service - Firebase Firestore
 * 
 * For the members app: validates and joins ward codes.
 * Ward creation is done in the leaders app.
 */

import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  arrayUnion,
} from 'firebase/firestore';
import { getFirebaseDb } from './firebaseApp';
import {
  Ward,
  WardJoinCode,
  UserWardMembership,
  JoinWardResult,
  normalizeWardCode,
} from '../../types/ward';

// Get db instance lazily
const getDb = () => getFirebaseDb();

// Collections
const WARDS_COLLECTION = 'wards';
const WARD_CODES_COLLECTION = 'wardCodes';
const USERS_COLLECTION = 'users';

// ============================================================================
// VALIDATE WARD CODE (Check if code is valid without joining)
// ============================================================================

export interface ValidateCodeResult {
  valid: boolean;
  error?: 'invalid_code' | 'code_expired' | 'code_inactive' | 'max_uses_reached';
  wardName?: string;
  stakeName?: string;
}

export async function validateWardCode(code: string): Promise<ValidateCodeResult> {
  try {
    const normalizedCode = normalizeWardCode(code);
    
    // Look up the code
    const codeDoc = await getDoc(doc(getDb(), WARD_CODES_COLLECTION, normalizedCode));
    
    if (!codeDoc.exists()) {
      return { valid: false, error: 'invalid_code' };
    }

    const codeData = codeDoc.data() as WardJoinCode;

    // Check if code is active
    if (!codeData.isActive) {
      return { valid: false, error: 'code_inactive' };
    }

    // Check expiration
    if (codeData.expiresAt && codeData.expiresAt < Date.now()) {
      return { valid: false, error: 'code_expired' };
    }

    // Check max uses
    if (codeData.maxUses && codeData.currentUses >= codeData.maxUses) {
      return { valid: false, error: 'max_uses_reached' };
    }

    return {
      valid: true,
      wardName: codeData.wardName,
      stakeName: codeData.stakeName,
    };
  } catch (error) {
    console.error('Error validating ward code:', error);
    return { valid: false, error: 'invalid_code' };
  }
}

// ============================================================================
// GET WARD
// ============================================================================

export async function getWard(wardId: string): Promise<Ward | null> {
  const wardDoc = await getDoc(doc(getDb(), WARDS_COLLECTION, wardId));
  if (!wardDoc.exists()) return null;
  return wardDoc.data() as Ward;
}

// ============================================================================
// JOIN WARD BY CODE
// ============================================================================

export async function joinWardByCode(
  code: string,
  uid: string
): Promise<JoinWardResult> {
  try {
    const normalizedCode = normalizeWardCode(code);
    
    // Look up the code
    const codeDoc = await getDoc(doc(getDb(), WARD_CODES_COLLECTION, normalizedCode));
    
    if (!codeDoc.exists()) {
      return { success: false, error: 'invalid_code' };
    }

    const codeData = codeDoc.data() as WardJoinCode;

    // Check if code is active
    if (!codeData.isActive) {
      return { success: false, error: 'code_inactive' };
    }

    // Check expiration
    if (codeData.expiresAt && codeData.expiresAt < Date.now()) {
      return { success: false, error: 'code_expired' };
    }

    // Check max uses
    if (codeData.maxUses && codeData.currentUses >= codeData.maxUses) {
      return { success: false, error: 'max_uses_reached' };
    }

    // Check if user is already a member
    const userDoc = await getDoc(doc(getDb(), USERS_COLLECTION, uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.wardMembership?.wardId === codeData.wardId) {
        return { success: false, error: 'already_member' };
      }
    }

    // Get ward details
    const ward = await getWard(codeData.wardId);
    if (!ward) {
      return { success: false, error: 'invalid_code' };
    }

    // Join the ward
    const now = Date.now();
    await updateUserWardMembership(uid, {
      wardId: codeData.wardId,
      wardName: codeData.wardName,
      stakeId: codeData.stakeId,
      stakeName: codeData.stakeName,
      joinedAt: now,
      joinedVia: 'code',
    });

    // Increment usage counter
    await updateDoc(doc(getDb(), WARD_CODES_COLLECTION, normalizedCode), {
      currentUses: codeData.currentUses + 1,
    });

    // Update ward: add uid to memberIds (para reglas Firestore v2) y memberCount
    await updateDoc(doc(getDb(), WARDS_COLLECTION, codeData.wardId), {
      memberIds: arrayUnion(uid),
      memberCount: (ward.memberCount || 0) + 1,
      updatedAt: now,
    });

    return { success: true, ward };
  } catch (error) {
    console.error('Error joining ward:', error);
    return { success: false, error: 'invalid_code' };
  }
}

// ============================================================================
// UPDATE USER WARD MEMBERSHIP
// ============================================================================

async function updateUserWardMembership(
  uid: string,
  membership: UserWardMembership
): Promise<void> {
  const userRef = doc(getDb(), USERS_COLLECTION, uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    await updateDoc(userRef, {
      wardMembership: membership,
      updatedAt: Date.now(),
    });
  } else {
    await setDoc(userRef, {
      wardMembership: membership,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }
}

// ============================================================================
// GET USER WARD MEMBERSHIP
// ============================================================================

export async function getUserWardMembership(
  uid: string
): Promise<UserWardMembership | null> {
  const userDoc = await getDoc(doc(getDb(), USERS_COLLECTION, uid));
  if (!userDoc.exists()) return null;
  
  const data = userDoc.data();
  return data.wardMembership || null;
}
