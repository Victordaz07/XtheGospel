/**
 * Baptism Prep Service - Firestore
 * EPIC 2.2: wards/{wardId}/baptismPreparation/{uid}
 */

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFirebaseDb } from './firebase/firebaseApp';
import type { BaptismPrep } from '../types/baptismPrep';

function getDb() {
  return getFirebaseDb();
}

export async function getBaptismPrepDoc(
  wardId: string,
  uid: string
): Promise<BaptismPrep | null> {
  try {
    const docRef = doc(getDb(), 'wards', wardId, 'baptismPreparation', uid);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    const data = snap.data() as BaptismPrep;
    return { ...data, wardId, uid };
  } catch (error) {
    console.error('getBaptismPrepDoc error:', error);
    throw error;
  }
}

export async function upsertBaptismPrepDoc(
  wardId: string,
  uid: string,
  data: BaptismPrep
): Promise<void> {
  const docRef = doc(getDb(), 'wards', wardId, 'baptismPreparation', uid);
  await setDoc(docRef, data, { merge: true });
}
