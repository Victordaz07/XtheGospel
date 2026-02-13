/**
 * Training Store (Member App)
 * Zustand + persist (localStorage)
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CompletedLessonsMap } from '../types/training';
import { getLessonsForNode } from '../data/trainingPaths';
import {
  isLessonUnlocked,
  type UnlockContext,
} from '../utils/unlockLogic';

interface TrainingState {
  completedLessons: CompletedLessonsMap;
  lastVisitedNodeId: string | null;
  lastVisitedLessonId: string | null;
  lastCompletedNodeId: string | null;
  lastCompletedAt: string | null;
  lastCompletedEventId: number;
  lastAckedCompletedEventId: number;

  markLessonCompleted: (nodeId: string, lessonId: string, percent?: number) => void;
  ackLastCompletedEvent: (eventId: number) => void;
  setLastVisited: (nodeId: string, lessonId: string) => void;
  getProgressForNode: (nodeId: string) => { completed: number; total: number; percent: number };
  getNextLessonToContinue: (ctx: UnlockContext) => { nodeId: string; lessonId: string } | null;
}

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      lastVisitedNodeId: null,
      lastVisitedLessonId: null,
      lastCompletedNodeId: null,
      lastCompletedAt: null,
      lastCompletedEventId: 0,
      lastAckedCompletedEventId: 0,

      markLessonCompleted: (nodeId: string, lessonId: string, percent = 100) => {
        set((state) => {
          const newCompletedLessons = {
            ...state.completedLessons,
            [lessonId]: {
              completedAt: new Date().toISOString(),
              percent,
            },
          };
          const lessons = getLessonsForNode(nodeId);
          const prevCompleted = lessons.filter(
            (l) => state.completedLessons[l.id]?.percent >= 100
          ).length;
          const nextCompleted = lessons.filter(
            (l) => newCompletedLessons[l.id]?.percent >= 100
          ).length;
          const total = lessons.length;
          const wasDone = total > 0 && prevCompleted === total;
          const isDone = total > 0 && nextCompleted === total;
          const isNewCompletion = !wasDone && isDone;

          const updates: Partial<TrainingState> = {
            completedLessons: newCompletedLessons,
          };

          if (isNewCompletion) {
            const now = new Date().toISOString();
            updates.lastCompletedNodeId = nodeId;
            updates.lastCompletedAt = now;
            updates.lastCompletedEventId = state.lastCompletedEventId + 1;
          }

          return updates;
        });
      },

      ackLastCompletedEvent: (eventId: number) => {
        set((state) => ({
          lastAckedCompletedEventId: Math.max(state.lastAckedCompletedEventId, eventId),
        }));
      },

      setLastVisited: (nodeId: string, lessonId: string) => {
        set({ lastVisitedNodeId: nodeId, lastVisitedLessonId: lessonId });
      },

      getProgressForNode: (nodeId: string) => {
        const lessons = getLessonsForNode(nodeId);
        const { completedLessons } = get();
        const completed = lessons.filter(
          (l) => completedLessons[l.id]?.percent >= 100
        ).length;
        const total = lessons.length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { completed, total, percent };
      },

      getNextLessonToContinue: (ctx: UnlockContext) => {
        const { completedLessons } = get();
        const orderedNodes = [
          'core-foundations',
          'aaronic-deacon',
          'aaronic-teacher',
          'aaronic-priest',
          'melchizedek-elder',
          'melchizedek-high-priest',
        ];
        for (const nodeId of orderedNodes) {
          const lessons = getLessonsForNode(nodeId);
          for (const lesson of lessons) {
            if (isLessonUnlocked(lesson.id, ctx) && (completedLessons[lesson.id]?.percent ?? 0) < 100) {
              return { nodeId: lesson.nodeId, lessonId: lesson.id };
            }
          }
        }
        return null;
      },
    }),
    {
      name: 'training-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
