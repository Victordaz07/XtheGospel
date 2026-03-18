/**
 * TrainingDashboard - Main training hub for Member app
 * Core Foundations + Priesthood Training only.
 * Teaser card for Calling-Based (lives in Leaders app).
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa6';
import { useJourneyStage } from '../../../core/journey/useJourneyStore';
import { useTrainingStore } from '../store/useTrainingStore';
import { paths, tracksById, lessonsById, getNodeById } from '../data/trainingPaths';
import { isPathUnlocked, isTrackUnlocked } from '../utils/unlockLogic';
import type { UnlockContext } from '../utils/unlockLogic';
import { openLeadersApp, APP_URLS } from '../../../utils/appBridge';
import { TrainingCard } from '../components';
import { useI18n } from '../../../context/I18nContext';
import './TrainingDashboard.css';

const PRIESTHOOD_TRACK_ORDER = [
  'aaronic-deacon',
  'aaronic-teacher',
  'aaronic-priest',
  'melchizedek-elder',
  'melchizedek-high-priest',
] as const;

function getNextTrackAfter(trackId: string): string | null {
  const idx = PRIESTHOOD_TRACK_ORDER.findIndex((id) => id === trackId);
  if (idx < 0 || idx >= PRIESTHOOD_TRACK_ORDER.length - 1) return null;
  return PRIESTHOOD_TRACK_ORDER[idx + 1];
}

const TOAST_DURATION_MS = 4000;

export default function TrainingDashboard(): JSX.Element {
  const { locale } = useI18n();
  const navigate = useNavigate();
  const stage = useJourneyStage();
  const completedLessons = useTrainingStore((s) => s.completedLessons);
  const getProgressForNode = useTrainingStore((s) => s.getProgressForNode);
  const getNextLessonToContinue = useTrainingStore((s) => s.getNextLessonToContinue);
  const lastCompletedEventId = useTrainingStore((s) => s.lastCompletedEventId);
  const lastAckedCompletedEventId = useTrainingStore((s) => s.lastAckedCompletedEventId);
  const lastCompletedNodeId = useTrainingStore((s) => s.lastCompletedNodeId);
  const ackLastCompletedEvent = useTrainingStore((s) => s.ackLastCompletedEvent);

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (
      stage === 'covenanted' &&
      lastCompletedEventId > lastAckedCompletedEventId &&
      lastCompletedNodeId
    ) {
      setShowToast(true);
      ackLastCompletedEvent(lastCompletedEventId);
    }
  }, [stage, lastCompletedEventId, lastAckedCompletedEventId, lastCompletedNodeId, ackLastCompletedEvent]);

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), TOAST_DURATION_MS);
    return () => clearTimeout(t);
  }, [showToast]);

  const ctx: UnlockContext = {
    stage,
    completedLessons,
    paths,
    tracksById,
    lessonsById,
  };

  if (stage !== 'covenanted') {
    navigate('/home', { replace: true });
    return <div className="tr-dashboard" />;
  }

  const next = getNextLessonToContinue(ctx);
  const hasLeaderUrl = Boolean(APP_URLS?.leader);
  const coreProgress = getProgressForNode('core-foundations');
  const isCoreDone = coreProgress.total > 0 && coreProgress.completed === coreProgress.total;

  const isNodeDone = (nodeId: string) => {
    const p = getProgressForNode(nodeId);
    return p.total > 0 && p.completed === p.total;
  };

  const lastCompletedPriesthoodTrack = [...PRIESTHOOD_TRACK_ORDER]
    .reverse()
    .find((id) => isNodeDone(id));
  const nextTrackId = lastCompletedPriesthoodTrack
    ? getNextTrackAfter(lastCompletedPriesthoodTrack)
    : null;
  const lastTrack = lastCompletedPriesthoodTrack ? tracksById[lastCompletedPriesthoodTrack] : null;
  const nextTrack = nextTrackId ? tracksById[nextTrackId] : null;
  const isNextUnlocked = nextTrackId ? isTrackUnlocked(nextTrackId, ctx) : false;
  const isPriesthoodComplete = lastCompletedPriesthoodTrack === 'melchizedek-high-priest';

  const completedNodeTitle = lastCompletedNodeId
    ? (getNodeById(lastCompletedNodeId)?.title ?? (locale === 'es' ? 'Track completado' : 'Track completed'))
    : (locale === 'es' ? 'Track completado' : 'Track completed');

  const ui = locale === 'es'
    ? {
        toastTitle: 'Track completado ✓',
        toastAria: `Track completado. Completaste: ${completedNodeTitle}`,
        toastBodyPrefix: 'Completaste:',
        title: 'Capacitación',
        subtitle: 'Prepara tu progreso en el sacerdocio',
        coreDoneTitle: 'Fundamentos Básicos completados ✓',
        coreDoneSubtitle: 'Ya tienes la base: Restauración, Plan, Sacerdocio y Ordenanzas.',
        coreBullets: [
          'Entendiste el "por qué" de la Restauración y el papel del Libro de Mormón.',
          'Ubicaste el Plan de Salvación y cómo la Expiación te sostiene.',
          'Aprendiste cómo prepararte con reverencia para convenios y ordenanzas.',
        ],
        startPriesthood: 'Iniciar Sacerdocio',
        coreSummary: 'Ver resumen de Fundamentos',
        readyToAdvance: 'Listo para avanzar',
        priesthoodCompleted: 'Sacerdocio completado ✓',
        completedPrefix: 'Completaste:',
        nextPrefix: 'Siguiente:',
        nextTrack: 'Siguiente track',
        unlockHintPrefix: 'Completa',
        unlockHintSuffix: 'al 100% para desbloquearlo.',
        continueWhereLeft: 'Continuar donde dejaste',
        continue: 'Continuar',
        startTraining: 'Comenzar tu capacitación',
        startCore: 'Comenzar Fundamentos Básicos',
        coreSection: 'Fundamentos Básicos',
        coreCardTitle: 'Fundamentos Básicos',
        coreCardDesc: 'Preparación esencial para el sacerdocio',
        completedBadge: 'Completado ✓',
        priesthoodSection: 'Capacitación del Sacerdocio',
        callingSection: 'Capacitación por llamamiento',
        callingTitle: 'Capacitación por llamamiento',
        callingDesc: 'Disponible en la App de Líderes',
        callingNote: 'La capacitación para presidencias, secretarios, maestros, etc. se gestiona en la app de Líderes (según tu llamamiento).',
        openLeadersApp: 'Abrir App de Líderes',
        leaderUrlMissing: 'URL de Líderes no configurada',
        previousTrack: 'el track anterior',
      }
    : {
        toastTitle: 'Track completed ✓',
        toastAria: `Track completed. You completed: ${completedNodeTitle}`,
        toastBodyPrefix: 'You completed:',
        title: 'Training',
        subtitle: 'Prepare your priesthood growth',
        coreDoneTitle: 'Core Foundations completed ✓',
        coreDoneSubtitle: 'You now have the base: Restoration, Plan, Priesthood, and Ordinances.',
        coreBullets: [
          'You understood the "why" of the Restoration and the role of the Book of Mormon.',
          'You mapped the Plan of Salvation and how the Atonement sustains you.',
          'You learned how to prepare reverently for covenants and ordinances.',
        ],
        startPriesthood: 'Start Priesthood',
        coreSummary: 'View Core summary',
        readyToAdvance: 'Ready to move forward',
        priesthoodCompleted: 'Priesthood completed ✓',
        completedPrefix: 'Completed:',
        nextPrefix: 'Next:',
        nextTrack: 'Next track',
        unlockHintPrefix: 'Complete',
        unlockHintSuffix: '100% to unlock it.',
        continueWhereLeft: 'Continue where you left off',
        continue: 'Continue',
        startTraining: 'Start your training',
        startCore: 'Start Core Foundations',
        coreSection: 'Core Foundations',
        coreCardTitle: 'Core Foundations',
        coreCardDesc: 'Essential preparation for priesthood growth',
        completedBadge: 'Completed ✓',
        priesthoodSection: 'Priesthood Training',
        callingSection: 'Calling-based training',
        callingTitle: 'Calling-based training',
        callingDesc: 'Available in the Leaders App',
        callingNote: 'Training for presidencies, clerks, teachers, etc. is managed in the Leaders app (according to your calling).',
        openLeadersApp: 'Open Leaders App',
        leaderUrlMissing: 'Leaders URL is not configured',
        previousTrack: 'the previous track',
      };

  return (
    <div className="tr-dashboard">
      {showToast && (
        <div
          className="tr-dashboard__toast"
          role="status"
          aria-live="polite"
          aria-label={ui.toastAria}
        >
          <p className="tr-dashboard__toast-title">{ui.toastTitle}</p>
          <p className="tr-dashboard__toast-body">{ui.toastBodyPrefix} {completedNodeTitle}</p>
        </div>
      )}

      <header className="tr-dashboard__header">
        <h1 className="tr-dashboard__title">{ui.title}</h1>
        <p className="tr-dashboard__subtitle">
          {ui.subtitle}
        </p>
      </header>

      {stage === 'covenanted' && isCoreDone && (
        <div className="tr-dashboard__core-done">
          <h2 className="tr-dashboard__core-done-title">{ui.coreDoneTitle}</h2>
          <p className="tr-dashboard__core-done-subtitle">
            {ui.coreDoneSubtitle}
          </p>
          <ul className="tr-dashboard__core-done-bullets">
            {ui.coreBullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
          <div className="tr-dashboard__core-done-actions">
            <Link to="/training/aaronic-deacon" className="tr-dashboard__core-done-btn">
              {ui.startPriesthood}
            </Link>
            <Link to="/training/core-foundations" className="tr-dashboard__core-done-link">
              {ui.coreSummary}
            </Link>
          </div>
        </div>
      )}

      {lastCompletedPriesthoodTrack && (
        <div className="tr-dashboard__next-track">
          <h2 className="tr-dashboard__next-track-title">{ui.readyToAdvance}</h2>
          {isPriesthoodComplete ? (
            <p className="tr-dashboard__next-track-body">{ui.priesthoodCompleted}</p>
          ) : (
            <>
              <p className="tr-dashboard__next-track-body">
                {ui.completedPrefix} {lastTrack?.title ?? ''}
              </p>
              <p className="tr-dashboard__next-track-body">
                {ui.nextPrefix}{' '}
                {isNextUnlocked && nextTrackId ? (
                  <Link
                    to={`/training/${nextTrackId}`}
                    className="tr-dashboard__next-track-link"
                  >
                    {nextTrack?.title ?? ''}
                  </Link>
                ) : (
                  nextTrack?.title ?? ''
                )}
              </p>
              {isNextUnlocked && nextTrackId ? (
                <Link
                  to={`/training/${nextTrackId}`}
                  className="tr-dashboard__next-track-btn"
                >
                  {ui.nextTrack}
                </Link>
              ) : (
                <p className="tr-dashboard__next-track-locked">
                  <FaLock aria-hidden />
                  {ui.unlockHintPrefix} {lastTrack?.title ?? ui.previousTrack} {ui.unlockHintSuffix}
                </p>
              )}
            </>
          )}
        </div>
      )}

      <div className="tr-dashboard__cta">
        {next ? (
          <>
            <p className="tr-dashboard__cta-label">{ui.continueWhereLeft}</p>
            <Link
              to={`/training/${next.nodeId}/${next.lessonId}`}
              className="tr-dashboard__cta-card"
            >
              <span className="tr-dashboard__cta-text">{ui.continue}</span>
              <span className="tr-dashboard__cta-arrow">→</span>
            </Link>
          </>
        ) : (
          <>
            <p className="tr-dashboard__cta-label">{ui.startTraining}</p>
            <Link to="/training/core-foundations" className="tr-dashboard__cta-card">
              <span className="tr-dashboard__cta-text">{ui.startCore}</span>
              <span className="tr-dashboard__cta-arrow">→</span>
            </Link>
          </>
        )}
      </div>

      <section className="tr-dashboard__section">
        <h2 className="tr-dashboard__section-title">{ui.coreSection}</h2>
        <div className="tr-dashboard__cards">
          <TrainingCard
            nodeId="core-foundations"
            title={ui.coreCardTitle}
            description={ui.coreCardDesc}
            status={isPathUnlocked('core-foundations', ctx) ? 'in_progress' : 'locked'}
            progress={getProgressForNode('core-foundations')}
            to="/training/core-foundations"
            badge={
              (() => {
                const p = getProgressForNode('core-foundations');
                return p.total > 0 && p.completed === p.total
                  ? { label: ui.completedBadge, variant: 'success' as const }
                  : undefined;
              })()
            }
          />
        </div>
      </section>

      <section className="tr-dashboard__section">
        <h2 className="tr-dashboard__section-title">{ui.priesthoodSection}</h2>
        <div className="tr-dashboard__cards">
          {paths
            .find((p) => p.id === 'priesthood')
            ?.trackIds.map((trackId) => {
              const track = tracksById[trackId];
              if (!track) return null;
              const unlocked = isTrackUnlocked(trackId, ctx);
              const trackProgress = getProgressForNode(trackId);
              const isTrackDone = trackProgress.total > 0 && trackProgress.completed === trackProgress.total;
              return (
                <TrainingCard
                  key={trackId}
                  nodeId={trackId}
                  title={track.title}
                  description={track.description}
                  status={unlocked ? 'in_progress' : 'locked'}
                  progress={trackProgress}
                  to={`/training/${trackId}`}
                  badge={isTrackDone ? { label: ui.completedBadge, variant: 'success' } : undefined}
                />
              );
            })}
        </div>
      </section>

      <section className="tr-dashboard__section">
        <h2 className="tr-dashboard__section-title">{ui.callingSection}</h2>
        <div className="tr-dashboard__teaser">
          <div className="tr-dashboard__teaser-card">
            <h3 className="tr-dashboard__teaser-title">{ui.callingTitle}</h3>
            <p className="tr-dashboard__teaser-desc">
              {ui.callingDesc}
            </p>
            <p className="tr-dashboard__teaser-note">
              {ui.callingNote}
            </p>
            <button
              type="button"
              className="tr-dashboard__teaser-btn"
              disabled={!hasLeaderUrl}
              onClick={() =>
                openLeadersApp({
                  path: '/training',
                  target: '_blank',
                  context: { from: 'member-training', intent: 'calling-based' },
                })
              }
            >
              {hasLeaderUrl ? ui.openLeadersApp : ui.leaderUrlMissing}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
