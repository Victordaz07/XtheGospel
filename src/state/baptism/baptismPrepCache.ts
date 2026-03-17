/**
 * Baptism Prep Cache - localStorage
 * Key: xtg:baptismPrep:${uid}:${wardId}
 * TTL: 7 days
 * EPIC 2.2
 */

import type { BaptismPrep } from '../../types/baptismPrep';

const CACHE_KEY_PREFIX = 'xtg:baptismPrep:';
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getCacheKey(uid: string, wardId: string): string {
  return `${CACHE_KEY_PREFIX}${uid}:${wardId}`;
}

export interface BaptismPrepCacheEntry {
  data: BaptismPrep;
  loadedAt: number;
}

export function saveBaptismPrepCache(uid: string, wardId: string, data: BaptismPrep): void {
  try {
    const entry: BaptismPrepCacheEntry = { data, loadedAt: Date.now() };
    localStorage.setItem(getCacheKey(uid, wardId), JSON.stringify(entry));
  } catch (e) {
    console.warn('Could not save baptism prep cache:', e);
  }
}

export function readBaptismPrepCache(
  uid: string,
  wardId: string
): BaptismPrepCacheEntry | null {
  try {
    const raw = localStorage.getItem(getCacheKey(uid, wardId));
    if (!raw) return null;
    const entry = JSON.parse(raw) as BaptismPrepCacheEntry;
    if (!entry?.data || !entry?.loadedAt) return null;
    return entry;
  } catch {
    return null;
  }
}

export function isCacheStale(loadedAt: number): boolean {
  return Date.now() - loadedAt > TTL_MS;
}
