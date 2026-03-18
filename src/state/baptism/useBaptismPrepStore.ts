/**
 * Baptism Prep Store - Cloud sync state
 * EPIC 2.2: Bridges with useBaptismProgressStore for checklist items
 */

import { create } from 'zustand';
import type { BaptismPrep } from '../../types/baptismPrep';
import { useBaptismProgressStore } from '../../modules/investigator/store/useBaptismProgressStore';
import {
  getBaptismPrepDoc,
  upsertBaptismPrepDoc,
} from '../../services/baptismPrepService';
import {
  saveBaptismPrepCache,
  readBaptismPrepCache,
  isCacheStale,
} from './baptismPrepCache';
import { getBaptismPreparation } from '../../modules/investigator/data/baptismPreparationData';
import { StorageService } from '../../utils/storage';

function isSpanishLocale(): boolean {
  const lang = (StorageService.getItem('appLang') ?? 'en').toLowerCase();
  return lang.startsWith('es');
}

export type BaptismPrepStatus = 'idle' | 'loading' | 'success' | 'offline' | 'error';
export type BaptismPrepSource = 'cloud' | 'cache' | null;

function getAllChecklistIds(): string[] {
  const prep = getBaptismPreparation('es');
  const ids: string[] = [];
  prep.sections.forEach((s) => {
    s.checklist?.forEach((c) => ids.push(c.id));
  });
  return [...new Set(ids)];
}

function buildBaptismPrepFromStore(
  wardId: string,
  uid: string,
  completedChecklist: Record<string, boolean>
): BaptismPrep {
  const now = Date.now();
  const items: BaptismPrep['items'] = {};
  const allIds = getAllChecklistIds();
  allIds.forEach((id) => {
    const completed = !!completedChecklist[id];
    items[id] = {
      completed,
      completedAt: completed ? now : null,
    };
  });
  return { wardId, uid, items, updatedAt: now };
}

function applyBaptismPrepToStore(data: BaptismPrep): void {
  const completedChecklist: Record<string, boolean> = {};
  Object.entries(data.items).forEach(([id, item]) => {
    completedChecklist[id] = !!item.completed;
  });
  useBaptismProgressStore.setState({ completedChecklist });
}

interface BaptismPrepState {
  data: BaptismPrep | null;
  status: BaptismPrepStatus;
  source: BaptismPrepSource;
  isDirty: boolean;
  lastSyncedAt: number | null;
  errorMessage: string | null;
  isHydrating: boolean;
  isStale: boolean;
  _lastWardId: string | null;
  _lastUid: string | null;

  hydrate: (wardId: string, uid: string) => Promise<void>;
  toggleItem: (itemId: string) => void;
  setItem: (itemId: string, completed: boolean) => void;
  syncNow: (wardId: string, uid: string) => Promise<void>;
  markDirty: () => void;
  clearDirty: () => void;
  retry: () => Promise<void>;
}

export const useBaptismPrepStore = create<BaptismPrepState>((set, get) => ({
  data: null,
  status: 'idle',
  source: null,
  isDirty: false,
  lastSyncedAt: null,
  errorMessage: null,
  isHydrating: false,
  isStale: false,
  _lastWardId: null,
  _lastUid: null,

  toggleItem: (itemId: string) => {
    useBaptismProgressStore.getState().toggleChecklistItem(itemId);
    set({ isDirty: true });
  },

  setItem: (itemId: string, completed: boolean) => {
    useBaptismProgressStore.getState().setChecklistItem(itemId, completed);
    set({ isDirty: true });
  },

  markDirty: () => set({ isDirty: true }),
  clearDirty: () => set({ isDirty: false }),

  hydrate: async (wardId: string, uid: string) => {
    set({ status: 'loading', isHydrating: true, errorMessage: null, _lastWardId: wardId, _lastUid: uid });

    if (!navigator.onLine) {
      const cached = readBaptismPrepCache(uid, wardId);
      if (cached) {
        const stale = isCacheStale(cached.loadedAt);
        applyBaptismPrepToStore(cached.data);
        set({
          data: cached.data,
          status: 'success',
          source: 'cache',
          isHydrating: false,
          errorMessage: null,
          isStale: stale,
        });
      } else {
        set({ status: 'offline', isHydrating: false });
      }
      return;
    }

    try {
      const cloud = await getBaptismPrepDoc(wardId, uid);
      const cached = readBaptismPrepCache(uid, wardId);

      if (cloud && cached && cached.data.updatedAt > cloud.updatedAt) {
        applyBaptismPrepToStore(cached.data);
        saveBaptismPrepCache(uid, wardId, cached.data);
        set({
          data: cached.data,
          status: 'success',
          source: 'cache',
          isDirty: true,
          isHydrating: false,
        });
      } else if (cloud) {
        applyBaptismPrepToStore(cloud);
        saveBaptismPrepCache(uid, wardId, cloud);
        set({
          data: cloud,
          status: 'success',
          source: 'cloud',
          isHydrating: false,
          isStale: false,
        });
      } else if (cached) {
        const stale = isCacheStale(cached.loadedAt);
        applyBaptismPrepToStore(cached.data);
        set({
          data: cached.data,
          status: 'success',
          source: 'cache',
          isHydrating: false,
          isStale: stale,
        });
      } else {
        set({ status: 'success', source: 'cloud', data: null, isHydrating: false, isStale: false });
      }
    } catch (error: unknown) {
      const isPermissionDenied =
        error &&
        typeof error === 'object' &&
        'code' in error &&
        (error as { code?: string }).code === 'permission-denied';
      const msg = isPermissionDenied
        ? (isSpanishLocale()
          ? 'No tienes acceso al barrio / tu cuenta no está vinculada.'
          : 'You do not have access to this ward / your account is not linked.')
        : (isSpanishLocale()
          ? 'No pudimos cargar tu preparación. Intenta de nuevo.'
          : 'We could not load your preparation. Please try again.');

      const cached = readBaptismPrepCache(uid, wardId);
      if (cached) {
        const stale = isCacheStale(cached.loadedAt);
        applyBaptismPrepToStore(cached.data);
        set({
          data: cached.data,
          status: 'success',
          source: 'cache',
          isHydrating: false,
          isStale: stale,
        });
      } else {
        set({
          status: 'error',
          errorMessage: msg,
          isHydrating: false,
        });
      }
    }
  },

  syncNow: async (wardId: string, uid: string) => {
    if (!navigator.onLine) return;

    const { completedChecklist } = useBaptismProgressStore.getState();
    const data = buildBaptismPrepFromStore(wardId, uid, completedChecklist);

    try {
      await upsertBaptismPrepDoc(wardId, uid, data);
      saveBaptismPrepCache(uid, wardId, data);
      set({
        data,
        status: 'success',
        source: 'cloud',
        isDirty: false,
        lastSyncedAt: Date.now(),
        errorMessage: null,
        isStale: false,
      });
    } catch (error: unknown) {
      const isPermissionDenied =
        error &&
        typeof error === 'object' &&
        'code' in error &&
        (error as { code?: string }).code === 'permission-denied';
      set({
        status: 'error',
        errorMessage: isPermissionDenied
          ? (isSpanishLocale()
            ? 'No tienes acceso al barrio / tu cuenta no está vinculada.'
            : 'You do not have access to this ward / your account is not linked.')
          : (isSpanishLocale()
            ? 'No se pudo sincronizar. Tus cambios están guardados localmente.'
            : 'Could not sync. Your changes are stored locally.'),
      });
    }
  },

  retry: async () => {
    const { _lastWardId, _lastUid } = get();
    if (!_lastWardId || !_lastUid) return;
    set({ errorMessage: null });
    await get().hydrate(_lastWardId, _lastUid);
  },
}));
