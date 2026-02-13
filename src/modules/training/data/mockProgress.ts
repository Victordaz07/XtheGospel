/**
 * Mock progress for testing Training module states
 * Replace with real user progress from store when hydrated
 */

import type { CompletedLessonsMap } from '../types/training';

export const mockProgress: CompletedLessonsMap = {
  'core-1': {
    completedAt: new Date().toISOString(),
    percent: 100,
  },
  'core-2': {
    completedAt: new Date().toISOString(),
    percent: 100,
  },
};
