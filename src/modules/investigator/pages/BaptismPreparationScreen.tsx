import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FLAGS } from '../../../config/featureFlags';
import BaptismPrepSyncBridge from '../components/BaptismPrepSyncBridge';
import { useBaptismPrepStore } from '../../../state/baptism/useBaptismPrepStore';
import {
  FaArrowLeft,
  FaCheck,
  FaCircle,
  FaCalendarDays,
  FaFileExport,
  FaLocationDot,
  FaMusic,
  FaUser,
  FaUsers,
} from 'react-icons/fa6';
import { getBaptismPreparation } from '../data/baptismPreparationData';
import {
  useBaptismProgressStore,
  isReadyForBaptism,
} from '../store/useBaptismProgressStore';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { INVESTIGATOR_CORE_TOPIC_IDS } from '../data/lessons';
import { useI18n } from '../../../context/I18nContext';
import { ScriptureReferenceCard } from '../../../ui/components';
import { exportBaptismAgenda } from '../../../core/export/exportLocalData';
import './BaptismPreparationScreen.css';

/** Map lesson IDs to milestone keys */
const LESSON_TO_MILESTONE: Record<string, keyof ReturnType<typeof useBaptismProgressStore.getState>['milestones']> = {
  'restoration-overview': 'restoration',
  'plan-of-salvation': 'planOfSalvation',
  'gospel-of-jesus-christ': 'gospelOfJesusChrist',
  'commandments': 'commandments',
  'laws-and-ordinances': 'commandments', // Mandamientos incluye leyes y ordenanzas
};

const MILESTONE_LABELS: Record<string, string> = {
  restoration: 'Restauración',
  planOfSalvation: 'Plan de Salvación',
  gospelOfJesusChrist: 'Evangelio de Jesucristo',
  commandments: 'Mandamientos',
  churchAttendance: 'Asistir a la Iglesia',
  interview: 'Entrevista',
  dateScheduled: 'Fecha Programada',
};

function formatLastSynced(ts: number | null): string {
  if (!ts) return '';
  const diff = Math.floor((Date.now() - ts) / 60000);
  if (diff < 1) return 'Hace un momento';
  if (diff < 60) return `Hace ${diff} min`;
  return new Date(ts).toLocaleDateString();
}

export default function BaptismPreparationScreen(): JSX.Element {
  const { t, locale } = useI18n();
  const baptismPreparation = getBaptismPreparation(locale);
  const { pathname } = useLocation();
  const isStandaloneRoute = pathname === '/progress/baptism-preparation';
  const { status, lastSyncedAt, errorMessage, retry } = useBaptismPrepStore();
  const {
    completedChecklist,
    baptismDate,
    location,
    performedBy,
    guests,
    personalTestimony,
    milestones,
    toggleChecklistItem,
    setBaptismDetails,
    setPersonalTestimony,
    setMilestone,
    agendaProgram,
    setAgendaProgram,
  } = useBaptismProgressStore();

  const { getLessonStatus, lessonStatuses } = useInvestigatorStore();

  // Sync lesson completion to milestones (multiple lessons can map to one milestone)
  useEffect(() => {
    const keysToLessons: Record<string, string[]> = {};
    (Object.entries(LESSON_TO_MILESTONE) as [string, keyof typeof milestones][]).forEach(
      ([lessonId, key]) => {
        if (!keysToLessons[key]) keysToLessons[key] = [];
        keysToLessons[key].push(lessonId);
      }
    );
    Object.entries(keysToLessons).forEach(([key, lessonIds]) => {
      const completed = lessonIds.some((id) => {
        const status = getLessonStatus(id);
        return status === 'completed' || status === 'exploring';
      });
      setMilestone(key as keyof typeof milestones, completed);
    });
  }, [getLessonStatus, setMilestone, lessonStatuses]);

  const milestoneList = [
    'restoration',
    'planOfSalvation',
    'gospelOfJesusChrist',
    'commandments',
    'churchAttendance',
    'interview',
    'dateScheduled',
  ] as const;

  const milestoneCompleted = (key: (typeof milestoneList)[number]) => {
    if (key === 'interview') {
      const interviewIds = baptismPreparation.sections
        .find((s) => s.id === 'interview')
        ?.checklist?.map((c) => c.id) ?? [];
      return interviewIds.every((id) => completedChecklist[id]);
    }
    if (key === 'dateScheduled') return !!baptismDate;
    return milestones[key];
  };

  const milestoneProgress = milestoneList.filter((k) => milestoneCompleted(k)).length;
  const milestoneTotal = milestoneList.length;
  const milestonePercent =
    milestoneTotal > 0 ? (milestoneProgress / milestoneTotal) * 100 : 0;

  const ready = isReadyForBaptism({
    completedChecklist,
    milestones,
    personalTestimony,
  });

  return (
    <div className="baptism-prep anim-fade-up">
      {FLAGS.CLOUD_SYNC_ENABLED && <BaptismPrepSyncBridge />}

      {FLAGS.CLOUD_SYNC_ENABLED && status === 'loading' && (
        <div className="baptism-prep__sync-status baptism-prep__sync-status--loading" role="status">
          Cargando preparación…
        </div>
      )}
      {FLAGS.CLOUD_SYNC_ENABLED && status === 'offline' && (
        <div className="baptism-prep__sync-status baptism-prep__sync-status--offline" role="status">
          Sin conexión. Conéctate para ver tu preparación.
        </div>
      )}
      {FLAGS.CLOUD_SYNC_ENABLED && status === 'error' && (
        <div className="baptism-prep__sync-status baptism-prep__sync-status--error" role="alert">
          <span>{errorMessage}</span>
          <button
            type="button"
            className="baptism-prep__retry-btn"
            onClick={() => retry()}
          >
            Reintentar
          </button>
        </div>
      )}
      {FLAGS.CLOUD_SYNC_ENABLED && useBaptismPrepStore((s) => s.isStale) && (
        <div className="baptism-prep__sync-status baptism-prep__sync-status--stale" role="status">
          Puede estar desactualizado
        </div>
      )}
      {FLAGS.CLOUD_SYNC_ENABLED && lastSyncedAt && status !== 'loading' && (
        <div className="baptism-prep__sync-meta">
          Última sincronización: {formatLastSynced(lastSyncedAt)}
        </div>
      )}

      <header className="baptism-prep__header">
        {isStandaloneRoute && (
          <Link to="/progress" className="baptism-prep__back">
            <FaArrowLeft aria-hidden="true" />
            {t('app.common.back')}
          </Link>
        )}
        <h1 className="baptism-prep__title">{baptismPreparation.title}</h1>
        <p className="baptism-prep__subtitle">{baptismPreparation.subtitle}</p>
      </header>

      {/* Progress Bar */}
      <section className="baptism-prep__progress-section">
        <h2 className="baptism-prep__progress-title">
          {t('app.baptism.progressTitle')}
        </h2>
        <div className="baptism-prep__progress-bar-wrap">
          <div
            className="baptism-prep__progress-bar-fill"
            style={{ width: `${milestonePercent}%` }}
          />
        </div>
        <div className="baptism-prep__milestones">
          {milestoneList.map((key) => (
            <div
              key={key}
              className={`baptism-prep__milestone ${milestoneCompleted(key) ? 'baptism-prep__milestone--done' : ''}`}
            >
              {key === 'churchAttendance' ? (
                <label className="baptism-prep__milestone-check">
                  <input
                    type="checkbox"
                    checked={milestones.churchAttendance}
                    onChange={(e) => setMilestone('churchAttendance', e.target.checked)}
                    className="baptism-prep__milestone-input"
                  />
                  <span className="baptism-prep__milestone-icon">
                    {milestones.churchAttendance ? (
                      <FaCheck aria-hidden="true" />
                    ) : (
                      <FaCircle className="baptism-prep__milestone-icon--pending" aria-hidden="true" />
                    )}
                  </span>
                  <span>{MILESTONE_LABELS[key]}</span>
                </label>
              ) : (
                <>
                  {milestoneCompleted(key) ? (
                    <FaCheck className="baptism-prep__milestone-icon" aria-hidden="true" />
                  ) : (
                    <FaCircle className="baptism-prep__milestone-icon baptism-prep__milestone-icon--pending" aria-hidden="true" />
                  )}
                  <span>{MILESTONE_LABELS[key]}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sections */}
      <div className="baptism-prep__sections">
        {baptismPreparation.sections.map((section) => (
          <section key={section.id} className="baptism-prep__section">
            <h2 className="baptism-prep__section-title">{section.title}</h2>

            {section.content?.map((paragraph, idx) => (
              <p key={idx} className="baptism-prep__section-text">
                {paragraph}
              </p>
            ))}

            {section.scriptures && section.scriptures.length > 0 && (
              <div className="baptism-prep__scriptures">
                {section.scriptures.map((scripture, idx) => (
                  <ScriptureReferenceCard
                    key={idx}
                    reference={scripture.reference}
                  />
                ))}
              </div>
            )}

            {section.checklist?.map((item) => (
              <label key={item.id} className="baptism-prep__check">
                <input
                  type="checkbox"
                  checked={!!completedChecklist[item.id]}
                  onChange={() => toggleChecklistItem(item.id)}
                  className="baptism-prep__check-input"
                />
                <span className="baptism-prep__check-text">{item.text}</span>
              </label>
            ))}
          </section>
        ))}
      </div>

      {/* Mi Fecha de Bautismo */}
      <section className="baptism-prep__section baptism-prep__section--highlight">
        <h2 className="baptism-prep__section-title">
          {t('app.baptism.myBaptismDate')}
        </h2>
        <div className="baptism-prep__form">
          <label className="baptism-prep__field">
            <FaCalendarDays className="baptism-prep__field-icon" />
            <input
              type="date"
              value={baptismDate ?? ''}
              onChange={(e) =>
                setBaptismDetails({ baptismDate: e.target.value || undefined })
              }
              className="baptism-prep__input"
            />
          </label>
          <label className="baptism-prep__field">
            <FaLocationDot className="baptism-prep__field-icon" />
            <input
              type="text"
              placeholder={t('app.baptism.placeholder')}
              value={location ?? ''}
              onChange={(e) =>
                setBaptismDetails({ location: e.target.value || undefined })
              }
              className="baptism-prep__input"
            />
          </label>
          <label className="baptism-prep__field">
            <FaUser className="baptism-prep__field-icon" />
            <input
              type="text"
              placeholder={t('app.baptism.whoBaptizes')}
              value={performedBy ?? ''}
              onChange={(e) =>
                setBaptismDetails({ performedBy: e.target.value || undefined })
              }
              className="baptism-prep__input"
            />
          </label>
          <label className="baptism-prep__field">
            <FaUsers className="baptism-prep__field-icon" />
            <input
              type="text"
              placeholder={t('app.baptism.guests')}
              value={guests ?? ''}
              onChange={(e) =>
                setBaptismDetails({ guests: e.target.value || undefined })
              }
              className="baptism-prep__input"
            />
          </label>
        </div>
      </section>

      {/* Preparación para la agenda bautismal - visible cuando hay fecha */}
      {baptismDate && (
        <section className="baptism-prep__section baptism-prep__section--agenda">
          <h2 className="baptism-prep__section-title">
            {t('app.baptism.agenda.agendaTitle')}
          </h2>
          <p className="baptism-prep__agenda-subtitle">
            {t('app.baptism.agenda.agendaSubtitle')}
          </p>
          <div className="baptism-prep__form">
            <label className="baptism-prep__field baptism-prep__field--checkbox">
              <input
                type="checkbox"
                checked={agendaProgram?.confirmImmediately ?? false}
                onChange={(e) =>
                  setAgendaProgram({ confirmImmediately: e.target.checked })
                }
                className="baptism-prep__check-input"
              />
              <span className="baptism-prep__check-text">
                {t('app.baptism.agenda.confirmImmediately')}
              </span>
            </label>
            <label className="baptism-prep__field">
              <FaUser className="baptism-prep__field-icon" />
              <input
                type="text"
                placeholder={t('app.baptism.agenda.speakerLabel')}
                value={agendaProgram?.speakerName ?? ''}
                onChange={(e) =>
                  setAgendaProgram({ speakerName: e.target.value || undefined })
                }
                className="baptism-prep__input"
              />
            </label>
            <label className="baptism-prep__field">
              <span className="baptism-prep__field-icon baptism-prep__field-icon--text">🙏</span>
              <input
                type="text"
                placeholder={t('app.baptism.agenda.openingPrayerLabel')}
                value={agendaProgram?.openingPrayerBy ?? ''}
                onChange={(e) =>
                  setAgendaProgram({ openingPrayerBy: e.target.value || undefined })
                }
                className="baptism-prep__input"
              />
            </label>
            <label className="baptism-prep__field">
              <span className="baptism-prep__field-icon baptism-prep__field-icon--text">🙏</span>
              <input
                type="text"
                placeholder={t('app.baptism.agenda.closingPrayerLabel')}
                value={agendaProgram?.closingPrayerBy ?? ''}
                onChange={(e) =>
                  setAgendaProgram({ closingPrayerBy: e.target.value || undefined })
                }
                className="baptism-prep__input"
              />
            </label>
            <label className="baptism-prep__field">
              <FaMusic className="baptism-prep__field-icon" />
              <input
                type="text"
                placeholder={t('app.baptism.agenda.hymn1Label')}
                value={agendaProgram?.hymn1 ?? ''}
                onChange={(e) =>
                  setAgendaProgram({ hymn1: e.target.value || undefined })
                }
                className="baptism-prep__input"
              />
            </label>
            <label className="baptism-prep__field">
              <FaMusic className="baptism-prep__field-icon" />
              <input
                type="text"
                placeholder={t('app.baptism.agenda.hymn2Label')}
                value={agendaProgram?.hymn2 ?? ''}
                onChange={(e) =>
                  setAgendaProgram({ hymn2: e.target.value || undefined })
                }
                className="baptism-prep__input"
              />
            </label>
            <label className="baptism-prep__field">
              <FaMusic className="baptism-prep__field-icon" />
              <input
                type="text"
                placeholder={t('app.baptism.agenda.hymn3Label')}
                value={agendaProgram?.hymn3 ?? ''}
                onChange={(e) =>
                  setAgendaProgram({ hymn3: e.target.value || undefined })
                }
                className="baptism-prep__input"
              />
            </label>
            {/* Validación suave: sugerencias sin bloquear */}
            {(!agendaProgram?.hymn1?.trim() || !agendaProgram?.speakerName?.trim() || !agendaProgram?.openingPrayerBy?.trim() || !agendaProgram?.closingPrayerBy?.trim()) && (
              <div className="baptism-prep__agenda-hints">
                {!agendaProgram?.hymn1?.trim() && (
                  <p className="baptism-prep__hint">{t('app.baptism.agenda.suggestHymn1')}</p>
                )}
                {!agendaProgram?.speakerName?.trim() && (
                  <p className="baptism-prep__hint">{t('app.baptism.agenda.suggestSpeaker')}</p>
                )}
                {!agendaProgram?.openingPrayerBy?.trim() && (
                  <p className="baptism-prep__hint">{t('app.baptism.agenda.suggestOpeningPrayer')}</p>
                )}
                {!agendaProgram?.closingPrayerBy?.trim() && (
                  <p className="baptism-prep__hint">{t('app.baptism.agenda.suggestClosingPrayer')}</p>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={exportBaptismAgenda}
              className="baptism-prep__export-btn"
              title={t('app.baptism.agenda.exportAgendaDesc')}
            >
              <FaFileExport className="baptism-prep__export-icon" />
              {t('app.baptism.agenda.exportAgenda')}
            </button>
          </div>
        </section>
      )}

      {/* Mi Compromiso Personal */}
      <section className="baptism-prep__section">
        <h2 className="baptism-prep__section-title">
          {t('app.baptism.myCommitment')}
        </h2>
        <p className="baptism-prep__commitment-prompt">
          {t('app.baptism.commitmentPrompt')}
        </p>
        <textarea
          className="baptism-prep__textarea"
          placeholder={t('app.baptism.commitmentPlaceholder')}
          value={personalTestimony ?? ''}
          onChange={(e) => setPersonalTestimony(e.target.value)}
          rows={4}
        />
      </section>

      {/* Ready CTA */}
      <footer className="baptism-prep__footer">
        <div
          className={`baptism-prep__ready ${ready ? 'baptism-prep__ready--active' : ''}`}
        >
          {ready ? (
            <>
              <span className="baptism-prep__ready-icon">✅</span>
              <p className="baptism-prep__ready-text">
                {t('app.baptism.readyForBaptism')}
              </p>
            </>
          ) : (
            <p className="baptism-prep__ready-text baptism-prep__ready-text--muted">
              {t('app.baptism.keepPreparing')}
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}
