/**
 * Training Module Types (Member App)
 * Core Foundations + Priesthood Training only.
 * Calling-based training lives in Leaders app.
 */

export type TrainingPathCategory = 'core' | 'priesthood';

export type PriesthoodOffice =
  | 'deacon'
  | 'teacher'
  | 'priest'
  | 'elder'
  | 'high_priest';

export interface TrainingPath {
  id: string;
  title: string;
  description?: string;
  category: TrainingPathCategory;
  trackIds: string[];
}

export interface TrainingTrack {
  id: string;
  pathId: string;
  title: string;
  description?: string;
  priesthoodOffice: PriesthoodOffice;
  lessonIds: string[];
}

export interface TrainingLesson {
  id: string;
  title: string;
  nodeId: string;
  order: number;
  estimatedMinutes?: number;
  tags?: string[];
}

export type LessonStatus = 'locked' | 'in_progress' | 'completed';

export interface UserProgressEntry {
  completedAt: string;
  percent: number;
}

export type CompletedLessonsMap = Record<string, UserProgressEntry>;
