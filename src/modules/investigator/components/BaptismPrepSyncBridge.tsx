/**
 * Baptism Prep Sync Bridge
 * EPIC 2.2: Hydrate + autosync for baptism preparation
 */

import React, { useEffect, useRef, useCallback } from 'react';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../../context/AuthContext';
import { FLAGS } from '../../../config/featureFlags';
import { getFirebaseApp } from '../../../services/firebase/firebaseApp';
import { getUserWardMembership } from '../../../services/firebase/wardService';
import { useBaptismPrepStore } from '../../../state/baptism/useBaptismPrepStore';
import { useBaptismProgressStore } from '../store/useBaptismProgressStore';

const DEBOUNCE_MS = 1000;

export default function BaptismPrepSyncBridge(): React.ReactElement | null {
  const { user } = useAuth();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wardIdRef = useRef<string | null>(null);

  const scheduleSync = useCallback(() => {
    if (!FLAGS.CLOUD_SYNC_ENABLED || !navigator.onLine) return;
    if (useBaptismPrepStore.getState().isHydrating) return;
    if (!wardIdRef.current || !user?.uid) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      // Logout en medio del debounce: verificar auth actual, no sync sin user
      const currentUser = getAuth(getFirebaseApp()).currentUser;
      if (!currentUser?.uid || !wardIdRef.current) return;
      if (useBaptismPrepStore.getState().isDirty) {
        useBaptismPrepStore.getState().syncNow(wardIdRef.current, currentUser.uid);
      }
    }, DEBOUNCE_MS);
  }, [user?.uid]);

  useEffect(() => {
    if (!FLAGS.CLOUD_SYNC_ENABLED || !user) return;

    let mounted = true;

    const init = async () => {
      try {
        const membership = await getUserWardMembership(user.uid);
        if (!mounted) return;
        if (!membership?.wardId) return;

        wardIdRef.current = membership.wardId;
        await useBaptismPrepStore.getState().hydrate(membership.wardId, user.uid);
      } catch {
        // hydrate handles errors
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
    // Subscribe siempre; scheduleSync verifica wardIdRef cuando corre
    const unsub = useBaptismProgressStore.subscribe(() => {
      if (useBaptismPrepStore.getState().isHydrating) return;
      useBaptismPrepStore.getState().markDirty();
      scheduleSync();
    });

    return unsub;
  }, [user?.uid, scheduleSync]);

  return null;
}
