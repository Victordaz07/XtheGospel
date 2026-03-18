/**
 * TrainingPathScreen - Lists lessons for a path or track
 * Includes Track Summary card at top when stage === 'covenanted'.
 */

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaArrowLeft, FaLock } from 'react-icons/fa6';
import { useJourneyStage } from '../../../core/journey/useJourneyStore';
import { useTrainingStore } from '../store/useTrainingStore';
import { getNodeById, getLessonsForNode } from '../data/trainingPaths';
import { getLessonStatus, isLessonUnlocked, isTrackUnlocked } from '../utils/unlockLogic';
import type { UnlockContext } from '../utils/unlockLogic';
import { paths, tracksById, lessonsById } from '../data/trainingPaths';
import { LessonListItem } from '../components';
import { useI18n } from '../../../context/I18nContext';
import './TrainingPathScreen.css';

const PRIESTHOOD_TRACK_ORDER = [
  'aaronic-deacon',
  'aaronic-teacher',
  'aaronic-priest',
  'melchizedek-elder',
  'melchizedek-high-priest',
];

const SUMMARY_COPY: Record<string, { bullets: string[] }> = {
  'core-foundations': {
    bullets: [
      'Entendiste el "por qué" de la Restauración y el papel del Libro de Mormón.',
      'Ubicaste el Plan de Salvación y cómo la Expiación te sostiene.',
      'Aprendiste cómo prepararte con reverencia para convenios y ordenanzas.',
    ],
  },
  'priesthood': {
    bullets: [
      'Avanza paso a paso por cada oficio del sacerdocio.',
      'Completa las prácticas y reflexiones de cada lección.',
      'Reflexiona y aplica esta semana lo que aprendas.',
    ],
  },
  'aaronic-deacon': {
    bullets: [
      'Servir con humildad y orden.',
      'Prepararte con reverencia (especialmente domingo).',
      'Ser confiable en tareas pequeñas.',
    ],
  },
  'aaronic-teacher': {
    bullets: [
      'Fortalecer y velar por los miembros.',
      'Corregir con amor y respeto.',
      'Preparar un plan simple de cuidado.',
    ],
  },
  'aaronic-priest': {
    bullets: [
      'Prepararte para ordenanzas (Santa Cena, bautismo).',
      'Ser digno y puntual.',
      'Acompañar y edificar a otros.',
    ],
  },
  'melchizedek-elder': {
    bullets: [
      'Ministración real (no "checklist").',
      'Bendecir con fe y dignidad.',
      'Coordinar con líderes, no improvisar.',
    ],
  },
  'melchizedek-high-priest': {
    bullets: [
      'Llaves vs autoridad vs poder.',
      'Presidir sirviendo, no controlando.',
      'Pastorear: unidad, mansedumbre y motivos puros.',
    ],
  },
};

const DEFAULT_BULLETS = [
  'Avanza paso a paso.',
  'Completa las prácticas.',
  'Reflexiona y aplica esta semana.',
];

export default function TrainingPathScreen(): JSX.Element {
  const { locale } = useI18n();
  const location = useLocation();
  const nodeId = location.pathname.replace(/^\/training\/?/, '').split('/')[0] || null;
  const stage = useJourneyStage();
  const completedLessons = useTrainingStore((s) => s.completedLessons);
  const getProgressForNode = useTrainingStore((s) => s.getProgressForNode);

  const ctx: UnlockContext = {
    stage,
    completedLessons,
    paths,
    tracksById,
    lessonsById,
  };

  const node = nodeId ? getNodeById(nodeId) : null;
  const lessons = nodeId ? getLessonsForNode(nodeId) : [];
  const ui = locale === 'es'
    ? {
        back: 'Volver a Capacitación',
        routeNotFound: 'Ruta no encontrada',
        summaryTitle: 'Resumen del Track',
        trackCompleted: 'Track completado ✓',
        missingLessons: 'Te faltan',
        continue: 'Continuar',
        reviewLessons: 'Revisar lecciones',
        nextRecommended: 'Siguiente recomendado',
        unlockPrevious: 'Se desbloquea al completar el track anterior',
      }
    : {
        back: 'Back to Training',
        routeNotFound: 'Route not found',
        summaryTitle: 'Track Summary',
        trackCompleted: 'Track completed ✓',
        missingLessons: 'You have',
        continue: 'Continue',
        reviewLessons: 'Review lessons',
        nextRecommended: 'Next recommended',
        unlockPrevious: 'Unlocks after completing the previous track',
      };

  if (!node || !nodeId) {
    return (
      <div className="tr-path">
        <Link to="/training" className="tr-path__back">
          <FaArrowLeft /> {ui.back}
        </Link>
        <div className="tr-path__not-found">
          <p>{ui.routeNotFound}</p>
        </div>
      </div>
    );
  }

  const title = 'title' in node ? node.title : '';
  const description = 'description' in node ? node.description : undefined;

  const progress = getProgressForNode(nodeId);
  const isComplete = progress.total > 0 && progress.completed === progress.total;
  const remaining = progress.total - progress.completed;

  const nextLesson = lessons.find(
    (l) => isLessonUnlocked(l.id, ctx) && (completedLessons[l.id]?.percent ?? 0) < 100
  ) ?? null;

  const firstLesson = lessons[0] ?? null;

  const copy = SUMMARY_COPY[nodeId] ?? { bullets: DEFAULT_BULLETS };
  const bullets = copy.bullets;

  const trackIdx = PRIESTHOOD_TRACK_ORDER.indexOf(nodeId);
  const nextTrackId = trackIdx >= 0 && trackIdx < PRIESTHOOD_TRACK_ORDER.length - 1
    ? PRIESTHOOD_TRACK_ORDER[trackIdx + 1]
    : null;
  const nextTrack = nextTrackId ? tracksById[nextTrackId] : null;
  const nextTrackUnlocked = nextTrackId ? isTrackUnlocked(nextTrackId, ctx) : false;

  const showSummary = stage === 'covenanted' && progress.total > 0;

  return (
    <div className="tr-path">
      <Link to="/training" className="tr-path__back">
        <FaArrowLeft /> {ui.back}
      </Link>

      <header className="tr-path__header">
        <h1 className="tr-path__title">{title}</h1>
        {description && (
          <p className="tr-path__subtitle">{description}</p>
        )}
      </header>

      {showSummary && (
        <div className="tr-path__summary">
          <h2 className="tr-path__summary-title">{ui.summaryTitle}</h2>
          <div className="tr-path__summary-progress">
            <span className="tr-path__summary-count">{progress.completed}/{progress.total}</span>
            <span className="tr-path__summary-percent">({progress.percent}%)</span>
          </div>
          <p className="tr-path__summary-status">
            {isComplete ? ui.trackCompleted : `${ui.missingLessons} ${remaining} ${locale === 'es' ? `lección${remaining !== 1 ? 'es' : ''}` : `lesson${remaining !== 1 ? 's' : ''}`}`}
          </p>
          <ul className="tr-path__summary-bullets">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="tr-path__summary-actions">
            {nextLesson ? (
              <Link
                to={`/training/${nodeId}/${nextLesson.id}`}
                className="tr-path__summary-btn"
              >
                {ui.continue}
              </Link>
            ) : firstLesson ? (
              <Link
                to={`/training/${nodeId}/${firstLesson.id}`}
                className="tr-path__summary-btn tr-path__summary-btn--secondary"
              >
                {ui.reviewLessons}
              </Link>
            ) : null}
          </div>
          {isComplete && nextTrack && (
            <div className="tr-path__summary-next">
              <p className="tr-path__summary-next-label">{ui.nextRecommended}</p>
              {nextTrackUnlocked ? (
                <Link
                  to={`/training/${nextTrackId}`}
                  className="tr-path__summary-next-link"
                >
                  {nextTrack.title} →
                </Link>
              ) : (
                <span className="tr-path__summary-next-locked">
                  <FaLock aria-hidden /> {nextTrack.title} — {ui.unlockPrevious}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      <div className="tr-path__lessons">
        {lessons.map((lesson) => (
          <LessonListItem
            key={lesson.id}
            lessonId={lesson.id}
            title={lesson.title}
            status={getLessonStatus(lesson.id, ctx)}
            to={`/training/${nodeId}/${lesson.id}`}
          />
        ))}
      </div>
    </div>
  );
}
