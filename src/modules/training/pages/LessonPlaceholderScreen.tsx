/**
 * LessonPlaceholderScreen - Placeholder for lesson content
 * TODO: Replace placeholder with real lesson components (e.g., LessonRestoration.tsx).
 * Keep layout and navigation; only swap internal content.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { useJourneyStage } from '../../../core/journey/useJourneyStore';
import { useTrainingStore } from '../store/useTrainingStore';
import { isLessonUnlocked } from '../utils/unlockLogic';
import type { UnlockContext } from '../utils/unlockLogic';
import { scrollToTop } from '../utils/scrollToTop';
import { paths, tracksById, lessonsById, getLessonsForNode } from '../data/trainingPaths';
import { LessonRestoration } from '../lessons/LessonRestoration';
import { LessonPlanOfSalvation } from '../lessons/LessonPlanOfSalvation';
import { LessonPriesthood } from '../lessons/LessonPriesthood';
import { LessonOrdinancesPreparation } from '../lessons/LessonOrdinancesPreparation';
import { LessonDeaconDuties } from '../lessons/LessonDeaconDuties';
import { LessonDeaconService } from '../lessons/LessonDeaconService';
import { LessonTeacherDuties } from '../lessons/LessonTeacherDuties';
import { LessonTeacherReverenceService } from '../lessons/LessonTeacherReverenceService';
import { LessonPriestDuties } from '../lessons/LessonPriestDuties';
import { LessonPriestPastoral } from '../lessons/LessonPriestPastoral';
import { LessonElderMinistration } from '../lessons/LessonElderMinistration';
import { LessonElderLeadership } from '../lessons/LessonElderLeadership';
import { LessonHighPriestKeysPresidency } from '../lessons/LessonHighPriestKeysPresidency';
import { LessonHighPriestShepherding } from '../lessons/LessonHighPriestShepherding';
import './LessonPlaceholderScreen.css';

const LESSONS_WITH_HINT = ['core-1', 'core-2', 'core-3', 'core-4', 'deacon-1', 'deacon-2', 'teacher-1', 'teacher-2', 'priest-1', 'priest-2', 'elder-1', 'elder-2', 'high-priest-1', 'high-priest-2'];

const ORDERED_NODES = [
  'core-foundations',
  'aaronic-deacon',
  'aaronic-teacher',
  'aaronic-priest',
  'melchizedek-elder',
  'melchizedek-high-priest',
];

function getNextUnlockedLesson(
  nodeId: string,
  lessonId: string,
  ctx: UnlockContext
): { nodeId: string; lessonId: string } | null {
  const lessons = getLessonsForNode(nodeId);
  const currentIdx = lessons.findIndex((l) => l.id === lessonId);
  for (let i = currentIdx + 1; i < lessons.length; i++) {
    if (isLessonUnlocked(lessons[i].id, ctx)) {
      return { nodeId, lessonId: lessons[i].id };
    }
  }
  const nodeIdx = ORDERED_NODES.indexOf(nodeId);
  for (let n = nodeIdx + 1; n < ORDERED_NODES.length; n++) {
    const nextLessons = getLessonsForNode(ORDERED_NODES[n]);
    for (const l of nextLessons) {
      if (isLessonUnlocked(l.id, ctx)) {
        return { nodeId: ORDERED_NODES[n], lessonId: l.id };
      }
    }
  }
  return null;
}

export default function LessonPlaceholderScreen(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const parts = location.pathname.replace(/^\/training\/?/, '').split('/').filter(Boolean);
  const nodeId = parts[0] || null;
  const lessonId = parts[1] || null;
  const stage = useJourneyStage();
  const completedLessons = useTrainingStore((s) => s.completedLessons);
  const markLessonCompleted = useTrainingStore((s) => s.markLessonCompleted);
  const setLastVisited = useTrainingStore((s) => s.setLastVisited);

  const ctx: UnlockContext = {
    stage,
    completedLessons,
    paths,
    tracksById,
    lessonsById,
  };

  useEffect(() => {
    if (nodeId && lessonId) {
      setLastVisited(nodeId, lessonId);
    }
  }, [nodeId, lessonId, setLastVisited]);

  useEffect(() => {
    if (lessonId && !LESSONS_WITH_HINT.includes(lessonId)) {
      setPracticeProgress(null);
    }
  }, [lessonId]);

  useEffect(() => {
    if (!lessonId) return;
    scrollToTop('.unified-layout-content');
  }, [lessonId]);

  const [practiceProgress, setPracticeProgress] = useState<{ checked: number; total: number } | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const handlePracticeProgress = useCallback((checked: number, total: number) => {
    setPracticeProgress({ checked, total });
  }, []);

  const lesson = lessonId ? lessonsById[lessonId] : null;
  const nextLesson = nodeId && lessonId
    ? getNextUnlockedLesson(nodeId, lessonId, ctx)
    : null;

  if (!nodeId || !lessonId || !lesson) {
    return (
      <div className="tr-lesson">
        <Link to="/training" className="tr-lesson__back">
          <FaArrowLeft /> Volver a Capacitación
        </Link>
        <div className="tr-lesson__not-found">
          <p>Lección no encontrada</p>
        </div>
      </div>
    );
  }

  const canCompleteByPractice =
    (practiceProgress?.total ?? 0) > 0 && practiceProgress?.checked === practiceProgress?.total;
  const isHintLesson = LESSONS_WITH_HINT.includes(lessonId ?? '');
  const isCompleteBlocked = isHintLesson && !canCompleteByPractice;
  const shouldGateNext = isCompleteBlocked;

  const primaryButtonLabel = isCompleting
    ? 'Finalizando…'
    : isHintLesson && canCompleteByPractice
      ? 'Finalizar lección'
      : 'Marcar como completada';

  const completeHintText = isCompleteBlocked
    ? practiceProgress
      ? (() => {
          const n = practiceProgress.total - practiceProgress.checked;
          return `Te faltan ${n} ${n === 1 ? 'práctica' : 'prácticas'} para finalizar.`;
        })()
      : 'Completa las prácticas para finalizar.'
    : null;

  const nextHintText = shouldGateNext && nextLesson
    ? practiceProgress
      ? `Completa las prácticas para desbloquear la siguiente lección. Te faltan ${practiceProgress.total - practiceProgress.checked} ${practiceProgress.total - practiceProgress.checked === 1 ? 'práctica' : 'prácticas'}.`
      : 'Completa las prácticas para desbloquear la siguiente lección.'
    : null;

  const handleNextLesson = () => {
    if (nextLesson && !shouldGateNext) {
      navigate(`/training/${nextLesson.nodeId}/${nextLesson.lessonId}`);
    }
  };

  const handleMarkCompleted = () => {
    if (!lesson || isCompleting) return;
    setIsCompleting(true);
    markLessonCompleted(lesson.nodeId, lesson.id, 100);
    // Recalcular siguiente lección con el estado actualizado (tras marcar como completada).
    // Importante: la siguiente lección (ej. deacon-1) puede desbloquearse solo al completar la actual (core-4).
    const updatedCompleted = useTrainingStore.getState().completedLessons;
    const updatedCtx: UnlockContext = { ...ctx, completedLessons: updatedCompleted };
    const nextAfterComplete = getNextUnlockedLesson(lesson.nodeId, lesson.id, updatedCtx);
    if (nextAfterComplete) {
      navigate(`/training/${nextAfterComplete.nodeId}/${nextAfterComplete.lessonId}`);
    } else {
      // Sin siguiente lección (ej. stage 'seeking' o última lección): ir al dashboard
      navigate('/training');
    }
  };

  return (
    <div className="tr-lesson">
      <Link to={`/training/${nodeId}`} className="tr-lesson__back">
        <FaArrowLeft /> Volver
      </Link>

      <header className="tr-lesson__header">
        <h1 className="tr-lesson__title">{lesson.title}</h1>
      </header>

      <div className="tr-lesson__body">
        {lessonId === 'core-1' ? (
          <LessonRestoration onPracticeProgress={handlePracticeProgress} />
        ) : lessonId === 'core-2' ? (
          <LessonPlanOfSalvation onPracticeProgress={handlePracticeProgress} />
        ) : lessonId === 'core-3' ? (
          <LessonPriesthood onPracticeProgress={handlePracticeProgress} />
        ) : lessonId === 'core-4' ? (
          <LessonOrdinancesPreparation onPracticeProgress={handlePracticeProgress} />
        ) : lessonId === 'deacon-1' ? (
          <LessonDeaconDuties onPracticeProgress={handlePracticeProgress} />
        ) : lessonId === 'deacon-2' ? (
          <LessonDeaconService onPracticeProgress={handlePracticeProgress} />
        ) : lessonId === 'teacher-1' ? (
          <LessonTeacherDuties onPracticeProgress={handlePracticeProgress} />
        ) : lessonId === 'teacher-2' ? (
          <LessonTeacherReverenceService onPracticeProgress={handlePracticeProgress} />
        ) : lessonId === 'priest-1' ? (
          <LessonPriestDuties onPracticeProgress={handlePracticeProgress} />
        ) : lessonId === 'priest-2' ? (
          <LessonPriestPastoral onPracticeProgress={handlePracticeProgress} />
        ) : lessonId === 'elder-1' ? (
          <LessonElderMinistration onPracticeProgress={handlePracticeProgress} />
        ) : lessonId === 'elder-2' ? (
          <LessonElderLeadership onPracticeProgress={handlePracticeProgress} />
        ) : lessonId === 'high-priest-1' ? (
          <LessonHighPriestKeysPresidency onPracticeProgress={handlePracticeProgress} />
        ) : lessonId === 'high-priest-2' ? (
          <LessonHighPriestShepherding onPracticeProgress={handlePracticeProgress} />
        ) : (
          <p className="tr-lesson__placeholder">
            Contenido en preparación. Próximamente: {lesson.title}
          </p>
        )}
      </div>

      {isHintLesson && practiceProgress && practiceProgress.total > 0 && (
        <p className="tr-lesson__practice-hint" role="status" aria-live="polite">
          {practiceProgress.checked === practiceProgress.total ? (
            <>Listo para finalizar ✓</>
          ) : (
            <>{practiceProgress.checked}/{practiceProgress.total} actividades completadas</>
          )}
        </p>
      )}
      <div className="tr-lesson__actions">
        <button
          type="button"
          className="tr-lesson__btn tr-lesson__btn--primary"
          onClick={handleMarkCompleted}
          disabled={isCompleting || isCompleteBlocked}
          aria-disabled={isCompleting || isCompleteBlocked}
          aria-busy={isCompleting}
        >
          {primaryButtonLabel}
        </button>
        {completeHintText && (
          <p className="tr-lesson__complete-hint" role="status">
            {completeHintText}
          </p>
        )}
        {nextLesson && (
          <>
            <button
              type="button"
              className="tr-lesson__btn tr-lesson__btn--secondary"
              onClick={handleNextLesson}
              disabled={shouldGateNext}
              aria-disabled={shouldGateNext}
            >
              Siguiente lección
            </button>
            {nextHintText && (
              <p className="tr-lesson__next-hint" role="status" aria-live="polite">
                {nextHintText}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Gating rules (Fase 2 + Fase 3 + Fase 4):
 * - "Marcar como completada" / "Finalizar lección": enabled when practiceProgress.checked === total (LESSONS_WITH_HINT).
 * - "Siguiente lección": disabled when !canCompleteByPractice for same lessons.
 * - Fase 4: "Finalizar lección" label when ready; auto-navigate to next lesson after completion.
 * Lessons not in LESSONS_WITH_HINT keep both CTAs enabled (Soft Gate).
 */
