/**
 * Investigator Lessons Data - Bilingual Wrapper
 * Exports types, constants, and locale-aware helper functions
 * PME+ Core Lessons v2.0
 */

import { coreLessonsEs, libraryLessonsEs } from './lessons.es';
import { coreLessonsEn, libraryLessonsEn } from './lessons.en';

// ===============================
// TYPES & INTERFACES
// ===============================

export type LessonStatus = 'not_started' | 'exploring' | 'completed';

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  hasAudio?: boolean;
  scriptureRef?: string;
}

export interface LessonFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Lesson {
  id: string;
  /** Si existe, esta lección es un sub-topic y no aparece en la lista principal. */
  parentId?: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  estimatedMinutes: number;
  /** Párrafo introductorio (opcional). Estándar: Lección 1. */
  introParagraph?: string;
  /** FAQ expand/collapse (opcional). Ideal para "Antes de decidir". */
  faqItems?: LessonFaqItem[];
  sections: LessonSection[];
  /** Escritura destacada por ID (opcional). Si no hay, se usa una por defecto. */
  featuredScriptureId?: string;
  /** Preguntas doctrinales para reflexionar (opcional). */
  reflectionQuestions?: string[];
  reflectionPrompt: string;
  /** Mensaje final de cierre (opcional). */
  finalMessage?: string;
  /** ID del siguiente tema recomendado (opcional). */
  recommendedNext?: string;
}

export type Locale = 'es' | 'en' | 'fr' | 'pt';
type LessonsContentLocale = 'es' | 'en';

function normalizeLessonsLocale(locale: Locale): LessonsContentLocale {
  return locale === 'es' ? 'es' : 'en';
}

// ===============================
// CONSTANTS
// ===============================

/**
 * Camino Misional (Investigador): 5 lecciones fundamentales (PME - estructura oficial).
 * Todo lo demás se considera biblioteca/"profundizar" (Miembro Nuevo).
 */
export const INVESTIGATOR_CORE_TOPIC_IDS = [
  'restoration-overview',
  'plan-of-salvation',
  'gospel-of-jesus-christ',
  'commandments',
  'laws-and-ordinances',
] as const;

export type InvestigatorCoreTopicId = (typeof INVESTIGATOR_CORE_TOPIC_IDS)[number];

export function isInvestigatorCoreTopicId(id: string): id is InvestigatorCoreTopicId {
  return (INVESTIGATOR_CORE_TOPIC_IDS as readonly string[]).includes(id);
}

// ===============================
// LOCALE-AWARE LESSON ACCESS
// ===============================

/**
 * Get core lessons for a specific locale
 */
export function getCoreLessonsForLocale(locale: Locale = 'es'): Lesson[] {
  const normalizedLocale = normalizeLessonsLocale(locale);
  return normalizedLocale === 'en' ? coreLessonsEn : coreLessonsEs;
}

/**
 * Get library lessons for a specific locale
 * Note: English library lessons are still being translated, falls back to Spanish
 */
export function getLibraryLessonsForLocale(locale: Locale = 'es'): Lesson[] {
  const normalizedLocale = normalizeLessonsLocale(locale);
  if (normalizedLocale === 'en' && libraryLessonsEn.length > 0) {
    return libraryLessonsEn;
  }
  return libraryLessonsEs;
}

/**
 * Get all lessons for a specific locale
 */
export function getLessonsForLocale(locale: Locale = 'es'): Lesson[] {
  const coreLessons = getCoreLessonsForLocale(locale);
  const libraryLessons = getLibraryLessonsForLocale(locale);
  return [...coreLessons, ...libraryLessons];
}

// ===============================
// BACKWARD-COMPATIBLE EXPORTS
// ===============================

// Default to Spanish for backward compatibility
export const lessons: Lesson[] = getLessonsForLocale('es');

/**
 * Get a lesson by ID with optional locale
 */
export function getLessonById(id: string, locale: Locale = 'es'): Lesson | undefined {
  const allLessons = getLessonsForLocale(locale);
  return allLessons.find((lesson) => lesson.id === id);
}

/**
 * Get investigator core lessons (PME path)
 */
export function getInvestigatorCoreLessons(locale: Locale = 'es'): Lesson[] {
  return INVESTIGATOR_CORE_TOPIC_IDS
    .map((id) => getLessonById(id, locale))
    .filter((l): l is Lesson => Boolean(l));
}

/**
 * Biblioteca para Miembro Nuevo: todo lo que no sea "Camino Misional".
 * Nota: devolvemos solo topics raíz (sin parentId) para no saturar la UI.
 */
export function getNewMemberLibraryLessons(locale: Locale = 'es'): Lesson[] {
  const allLessons = getLessonsForLocale(locale);
  return allLessons.filter((lesson) => !lesson.parentId && !isInvestigatorCoreTopicId(lesson.id));
}

/**
 * Get child lessons by parent ID
 */
export function getChildLessonsByParentId(parentId: string, locale: Locale = 'es'): Lesson[] {
  const allLessons = getLessonsForLocale(locale);
  return allLessons.filter((lesson) => lesson.parentId === parentId);
}

// ===============================
// STATUS HELPERS (Language-independent)
// ===============================

export function getStatusLabel(status: LessonStatus, locale: Locale = 'es'): string {
  const labels: Record<Locale, Record<LessonStatus, string>> = {
    es: {
      not_started: 'Sin comenzar',
      exploring: 'Explorando',
      completed: 'Completada',
    },
    en: {
      not_started: 'Not started',
      exploring: 'Exploring',
      completed: 'Completed',
    },
    fr: {
      not_started: 'Not started',
      exploring: 'Exploring',
      completed: 'Completed',
    },
    pt: {
      not_started: 'Not started',
      exploring: 'Exploring',
      completed: 'Completed',
    },
  };
  return labels[locale][status];
}

export function getStatusColor(status: LessonStatus): string {
  const colors: Record<LessonStatus, string> = {
    not_started: '#94A3B8',
    exploring: '#F59E0B',
    completed: '#10B981',
  };
  return colors[status];
}
