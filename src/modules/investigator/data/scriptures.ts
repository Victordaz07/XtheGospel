/**
 * Investigator Scriptures Data - Bilingual Wrapper
 * PME+ Support Scriptures included
 */

import { scripturesEs } from './scriptures.es';
import { scripturesEn } from './scriptures.en';

// ===============================
// TYPES
// ===============================

export interface ScriptureVerse {
  verse: number;
  text: string;
}

export interface Scripture {
  id: string;
  reference: string;
  text: string;
  /** Verses for multi-verse passages; when present, modal shows verse-by-verse */
  verses?: ScriptureVerse[];
  context?: string;
}

export type Locale = 'es' | 'en' | 'fr' | 'pt';
type ScripturesContentLocale = 'es' | 'en';

function normalizeScripturesLocale(locale: Locale): ScripturesContentLocale {
  return locale === 'es' ? 'es' : 'en';
}

// ===============================
// LOCALE-AWARE ACCESS
// ===============================

/**
 * Get all scriptures for a specific locale
 */
export function getScripturesForLocale(locale: Locale = 'es'): Scripture[] {
  const normalizedLocale = normalizeScripturesLocale(locale);
  return normalizedLocale === 'en' ? scripturesEn : scripturesEs;
}

// Backward compatible default export (Spanish)
export const scriptures: Scripture[] = scripturesEs;

/**
 * Get scripture by ID with optional locale
 */
export function getScriptureById(id: string, locale: Locale = 'es'): Scripture | undefined {
  const allScriptures = getScripturesForLocale(locale);
  return allScriptures.find((s) => s.id === id);
}

/**
 * Normalize reference for matching (handles en-dash vs hyphen, extra spaces)
 */
function normalizeReference(ref: string): string {
  return ref
    .toLowerCase()
    .replace(/\u2013|\u2014/g, '-') // en-dash, em-dash → hyphen
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Maps normalized references to scripture IDs for cross-locale lookup.
 * When baptism data shows "Mateo 3:13–17" and locale is 'en', we find by ID.
 */
const REF_TO_ID: Record<string, string> = {
  'mateo 3:13-17': 'matthew-3-13-17',
  'matthew 3:13-17': 'matthew-3-13-17',
  'hechos 2:38': 'acts-2-38',
  'acts 2:38': 'acts-2-38',
  'hechos 3:19-21': 'acts-3-19-21',
  'acts 3:19-21': 'acts-3-19-21',
  '2 nefi 31:5-12': '2-nephi-31-5-12',
  '2 nephi 31:5-12': '2-nephi-31-5-12',
  'juan 3:5': 'john-3-5',
  'john 3:5': 'john-3-5',
  'mosíah 18:8-10': 'mosiah-18-8-10',
  'mosiah 18:8-10': 'mosiah-18-8-10',
  'doctrina y convenios 20:37': 'dc-20-37',
  'doctrine and covenants 20:37': 'dc-20-37',
  'moroni 10:4-5': 'moroni-10-4-5',
  'moroni 10:3-5': 'moroni-10-3-5',
  'morôni 10:3-5': 'moroni-10-3-5',
  'jeremiah 1:5': 'jeremiah-1-5',
  'jeremías 1:5': 'jeremiah-1-5',
  'genesis 3:6-7': 'genesis-3-6-7',
  'génesis 3:6-7': 'genesis-3-6-7',
  'exodus 20:8-11': 'exodus-20-8-11',
  'éxodo 20:8-11': 'exodus-20-8-11',
};

/**
 * Get scripture by reference with optional locale.
 * Handles cross-locale: e.g. "Mateo 3:13–17" + locale 'en' → finds by ID in scriptures.en.
 */
export function getScriptureByReference(reference: string, locale: Locale = 'es'): Scripture | undefined {
  const norm = normalizeReference(reference);
  const id = REF_TO_ID[norm];
  if (id) {
    const byId = getScriptureById(id, locale);
    if (byId) return byId;
  }
  const allScriptures = getScripturesForLocale(locale);
  let found = allScriptures.find((s) => normalizeReference(s.reference) === norm);
  if (found) return found;
  // Fallback: try first verse of range (e.g. "moroni 10:4-5" → try "moroni 10:4")
  const rangeMatch = norm.match(/^(.+:\d+)-(\d+)$/);
  if (rangeMatch) {
    const firstVerseRef = rangeMatch[1];
    found = allScriptures.find((s) => normalizeReference(s.reference) === firstVerseRef);
  }
  return found;
}

/**
 * Get daily scripture (rotates based on day of year)
 */
export function getDailyScripture(locale: Locale = 'es'): Scripture {
  const allScriptures = getScripturesForLocale(locale);
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return allScriptures[dayOfYear % allScriptures.length];
}

/**
 * Get home page scripture
 */
export function getHomeScripture(locale: Locale = 'es'): Scripture {
  const allScriptures = getScripturesForLocale(locale);
  return (
    getScriptureById('matthew-7-7', locale) ||
    allScriptures[0]
  );
}

/**
 * Get lesson detail scripture
 */
export function getLessonDetailScripture(locale: Locale = 'es'): Scripture {
  return (
    getScriptureById('john-3-16', locale) ||
    getScripturesForLocale(locale)[1]
  );
}

/**
 * Search scriptures by text content
 */
export function searchScriptures(query: string, locale: Locale = 'es'): Scripture[] {
  const allScriptures = getScripturesForLocale(locale);
  const lowerQuery = query.toLowerCase();
  return allScriptures.filter(
    (s) =>
      s.text.toLowerCase().includes(lowerQuery) ||
      s.reference.toLowerCase().includes(lowerQuery) ||
      (s.context && s.context.toLowerCase().includes(lowerQuery))
  );
}
