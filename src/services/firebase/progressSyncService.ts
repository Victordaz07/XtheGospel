/**
 * Progress Sync Service - Firestore
 * EPIC 2.2: Sync training/lesson progress to users/{uid}/trainingProgress
 * EPIC 4: Also sync to wards/{wardId}/lessonProgress/{uid} for leadership visibility
 * Local-first + last-write-wins. Debounce 1000ms.
 */

import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getFirebaseDb } from './firebaseApp';
import { getCurrentUser } from './authService';
import { getUserWardMembership } from './wardService';
import { FLAGS } from '../../config/featureFlags';
import type { CompletedLessonsMap } from '../../modules/training/types/training';

const DOC_ID = 'completed';

export interface TrainingProgressDoc {
  completedLessons: CompletedLessonsMap;
  updatedAt: number;
}

export interface WardLessonProgressDoc extends TrainingProgressDoc {
  uid: string;
}

const CACHE_KEY = 'xtg:trainingProgress:cache';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getDb() {
  return getFirebaseDb();
}

function readCache(uid: string): TrainingProgressDoc | null {
  try {
    const raw = localStorage.getItem(`${CACHE_KEY}:${uid}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { data: TrainingProgressDoc; loadedAt: number };
    if (Date.now() - parsed.loadedAt > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function saveCache(uid: string, data: TrainingProgressDoc): void {
  try {
    localStorage.setItem(
      `${CACHE_KEY}:${uid}`,
      JSON.stringify({ data, loadedAt: Date.now() })
    );
  } catch (e) {
    console.warn('progressSync: cache save failed', e);
  }
}

/**
 * Sync completedLessons to Firestore.
 * Only runs if CLOUD_SYNC_ENABLED and user is authenticated.
 */
export async function syncProgressToCloud(
  completedLessons: CompletedLessonsMap
): Promise<{ success: boolean; error?: string }> {
  if (!FLAGS.CLOUD_SYNC_ENABLED) {
    return { success: false, error: 'Cloud sync disabled' };
  }

  const user = getCurrentUser();
  if (!user) {
    return { success: false, error: 'Not authenticated' };
  }

  if (!navigator.onLine) {
    return { success: false, error: 'Offline' };
  }

  try {
    const data: TrainingProgressDoc = {
      completedLessons,
      updatedAt: Date.now(),
    };

    // EPIC 2.2: users/{uid}/trainingProgress
    const userDocRef = doc(getDb(), 'users', user.uid, 'trainingProgress', DOC_ID);
    await setDoc(userDocRef, data, { merge: true });
    saveCache(user.uid, data);

    // EPIC 4: wards/{wardId}/lessonProgress/{uid} for leadership visibility
    const membership = await getUserWardMembership(user.uid);
    if (membership?.wardId) {
      const wardDocRef = doc(getDb(), 'wards', membership.wardId, 'lessonProgress', user.uid);
      await setDoc(wardDocRef, { ...data, uid: user.uid }, { merge: true });
    }

    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Sync failed';
    console.error('progressSync: sync failed', error);
    return { success: false, error: msg };
  }
}

/**
 * Hydrate local store from cloud (or cache if offline).
 * Only hydrates if local is empty.
 * Returns completedLessons to apply to store if hydrated.
 */
export async function hydrateProgressFromCloud(
  currentCompleted: CompletedLessonsMap
): Promise<{
  success: boolean;
  hydrated: boolean;
  source: 'cloud' | 'cache' | null;
  completedLessons?: CompletedLessonsMap;
}> {
  if (!FLAGS.CLOUD_SYNC_ENABLED) {
    return { success: false, hydrated: false, source: null };
  }

  const user = getCurrentUser();
  if (!user) {
    return { success: false, hydrated: false, source: null };
  }

  // Only hydrate if local is empty
  const hasLocal = Object.keys(currentCompleted).length > 0;
  if (hasLocal) {
    return { success: true, hydrated: false, source: null };
  }

  if (!navigator.onLine) {
    const cached = readCache(user.uid);
    if (cached) {
      return {
        success: true,
        hydrated: true,
        source: 'cache',
        completedLessons: cached.completedLessons,
      };
    }
    return { success: false, hydrated: false, source: null };
  }

  try {
    const docRef = doc(getDb(), 'users', user.uid, 'trainingProgress', DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as TrainingProgressDoc;
      saveCache(user.uid, data);
      return {
        success: true,
        hydrated: true,
        source: 'cloud',
        completedLessons: data.completedLessons,
      };
    }
    return { success: true, hydrated: false, source: null };
  } catch (error) {
    console.error('progressSync: hydrate failed', error);
    const cached = readCache(user.uid);
    if (cached) {
      return {
        success: true,
        hydrated: true,
        source: 'cache',
        completedLessons: cached.completedLessons,
      };
    }
    return { success: false, hydrated: false, source: null };
  }
}
