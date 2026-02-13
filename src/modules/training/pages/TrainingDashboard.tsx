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
    ? (getNodeById(lastCompletedNodeId)?.title ?? 'Track completado')
    : 'Track completado';

  return (
    <div className="tr-dashboard">
      {showToast && (
        <div
          className="tr-dashboard__toast"
          role="status"
          aria-live="polite"
          aria-label={`Track completado. Completaste: ${completedNodeTitle}`}
        >
          <p className="tr-dashboard__toast-title">Track completado ✓</p>
          <p className="tr-dashboard__toast-body">Completaste: {completedNodeTitle}</p>
        </div>
      )}

      <header className="tr-dashboard__header">
        <h1 className="tr-dashboard__title">Capacitación</h1>
        <p className="tr-dashboard__subtitle">
          Prepara tu progreso en el sacerdocio
        </p>
      </header>

      {stage === 'covenanted' && isCoreDone && (
        <div className="tr-dashboard__core-done">
          <h2 className="tr-dashboard__core-done-title">Fundamentos Básicos completados ✓</h2>
          <p className="tr-dashboard__core-done-subtitle">
            Ya tienes la base: Restauración, Plan, Sacerdocio y Ordenanzas.
          </p>
          <ul className="tr-dashboard__core-done-bullets">
            <li>Entendiste el &quot;por qué&quot; de la Restauración y el papel del Libro de Mormón.</li>
            <li>Ubicaste el Plan de Salvación y cómo la Expiación te sostiene.</li>
            <li>Aprendiste cómo prepararte con reverencia para convenios y ordenanzas.</li>
          </ul>
          <div className="tr-dashboard__core-done-actions">
            <Link to="/training/aaronic-deacon" className="tr-dashboard__core-done-btn">
              Iniciar Sacerdocio
            </Link>
            <Link to="/training/core-foundations" className="tr-dashboard__core-done-link">
              Ver resumen de Fundamentos
            </Link>
          </div>
        </div>
      )}

      {lastCompletedPriesthoodTrack && (
        <div className="tr-dashboard__next-track">
          <h2 className="tr-dashboard__next-track-title">Listo para avanzar</h2>
          {isPriesthoodComplete ? (
            <p className="tr-dashboard__next-track-body">Sacerdocio completado ✓</p>
          ) : (
            <>
              <p className="tr-dashboard__next-track-body">
                Completaste: {lastTrack?.title ?? ''}
              </p>
              <p className="tr-dashboard__next-track-body">
                Siguiente:{' '}
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
                  Siguiente track
                </Link>
              ) : (
                <p className="tr-dashboard__next-track-locked">
                  <FaLock aria-hidden />
                  Completa {lastTrack?.title ?? 'el track anterior'} al 100% para desbloquearlo.
                </p>
              )}
            </>
          )}
        </div>
      )}

      <div className="tr-dashboard__cta">
        {next ? (
          <>
            <p className="tr-dashboard__cta-label">Continuar donde dejaste</p>
            <Link
              to={`/training/${next.nodeId}/${next.lessonId}`}
              className="tr-dashboard__cta-card"
            >
              <span className="tr-dashboard__cta-text">Continuar</span>
              <span className="tr-dashboard__cta-arrow">→</span>
            </Link>
          </>
        ) : (
          <>
            <p className="tr-dashboard__cta-label">Comenzar tu capacitación</p>
            <Link to="/training/core-foundations" className="tr-dashboard__cta-card">
              <span className="tr-dashboard__cta-text">Comenzar Fundamentos Básicos</span>
              <span className="tr-dashboard__cta-arrow">→</span>
            </Link>
          </>
        )}
      </div>

      <section className="tr-dashboard__section">
        <h2 className="tr-dashboard__section-title">Fundamentos Básicos</h2>
        <div className="tr-dashboard__cards">
          <TrainingCard
            nodeId="core-foundations"
            title="Fundamentos Básicos"
            description="Preparación esencial para el sacerdocio"
            status={isPathUnlocked('core-foundations', ctx) ? 'in_progress' : 'locked'}
            progress={getProgressForNode('core-foundations')}
            to="/training/core-foundations"
            badge={
              (() => {
                const p = getProgressForNode('core-foundations');
                return p.total > 0 && p.completed === p.total
                  ? { label: 'Completado ✓', variant: 'success' as const }
                  : undefined;
              })()
            }
          />
        </div>
      </section>

      <section className="tr-dashboard__section">
        <h2 className="tr-dashboard__section-title">Capacitación del Sacerdocio</h2>
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
                  badge={isTrackDone ? { label: 'Completado ✓', variant: 'success' } : undefined}
                />
              );
            })}
        </div>
      </section>

      <section className="tr-dashboard__section">
        <h2 className="tr-dashboard__section-title">Capacitación por llamamiento</h2>
        <div className="tr-dashboard__teaser">
          <div className="tr-dashboard__teaser-card">
            <h3 className="tr-dashboard__teaser-title">Capacitación por llamamiento</h3>
            <p className="tr-dashboard__teaser-desc">
              Disponible en la App de Líderes
            </p>
            <p className="tr-dashboard__teaser-note">
              La capacitación para presidencias, secretarios, maestros, etc. se
              gestiona en la app de Líderes (según tu llamamiento).
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
              {hasLeaderUrl ? 'Abrir App de Líderes' : 'URL de Líderes no configurada'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
