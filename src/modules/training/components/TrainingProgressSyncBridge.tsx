/**
 * Training Progress Sync Bridge
 * EPIC 2.2: Hydrate + autosync for training/lesson progress
 */

import React, { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { FLAGS } from '../../../config/featureFlags';
import { syncProgressToCloud, hydrateProgressFromCloud } from '../../../services/firebase/progressSyncService';
import { useTrainingStore } from '../store/useTrainingStore';

const DEBOUNCE_MS = 1000;

export default function TrainingProgressSyncBridge(): React.ReactElement | null {
  const { user } = useAuth();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleSync = useCallback(() => {
    if (!FLAGS.CLOUD_SYNC_ENABLED || !navigator.onLine || !user?.uid) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      const { completedLessons } = useTrainingStore.getState();
      syncProgressToCloud(completedLessons);
    }, DEBOUNCE_MS);
  }, [user?.uid]);

  useEffect(() => {
    if (!FLAGS.CLOUD_SYNC_ENABLED || !user) return;

    let mounted = true;

    const init = async () => {
      const { completedLessons } = useTrainingStore.getState();
      const result = await hydrateProgressFromCloud(completedLessons);
      if (!mounted) return;
      if (result.hydrated && result.completedLessons) {
        useTrainingStore.setState({ completedLessons: result.completedLessons });
      }
    };

    init();
    return () => {
      mounted = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [user?.uid]);

  useEffect(() => {
    if (!FLAGS.CLOUD_SYNC_ENABLED || !user) return;

    const unsub = useTrainingStore.subscribe(() => {
      scheduleSync();
    });

    return unsub;
  }, [user?.uid, scheduleSync]);

  return null;
}
