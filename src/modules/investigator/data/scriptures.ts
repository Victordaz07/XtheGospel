/**
 * Investigator Scriptures Data - Bilingual Wrapper
 * PME+ Support Scriptures included
 */

import { scripturesEs } from './scriptures.es';
import { scripturesEn } from './scriptures.en';

// ===============================
// TYPES
// ===============================

export interface Scripture {
  id: string;
  reference: string;
  text: string;
  context?: string;
}

export type Locale = 'es' | 'en';

// ===============================
// LOCALE-AWARE ACCESS
// ===============================

/**
 * Get all scriptures for a specific locale
 */
export function getScripturesForLocale(locale: Locale = 'es'): Scripture[] {
  return locale === 'en' ? scripturesEn : scripturesEs;
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
 * Get scripture by reference with optional locale
 */
export function getScriptureByReference(reference: string, locale: Locale = 'es'): Scripture | undefined {
  const allScriptures = getScripturesForLocale(locale);
  return allScriptures.find((s) => s.reference.toLowerCase() === reference.toLowerCase());
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
