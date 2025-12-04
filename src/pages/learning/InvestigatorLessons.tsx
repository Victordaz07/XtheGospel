import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { useProgress } from '../../context/ProgressContext';
import { INVESTIGATOR_LESSONS, InvestigatorLesson, LessonState, getRealLessonId } from '../../data/investigatorLessons';
import {
  PageContainer,
  TopBar,
  RoleBadge,
  Card,
  Section,
  ProgressBar,
  ButtonPrimary,
  IconButton,
} from '../../ui/components';
import { FaBell } from 'react-icons/fa6';
import './Page.css';
import './InvestigatorLessons.css';

const InvestigatorLessons: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { getLessonProgress, getOverallProgress } = useProgress();
  const [selectedLessonId, setSelectedLessonId] = useState<string>(INVESTIGATOR_LESSONS[0].id);

  const overallProgress = getOverallProgress();
  const completed = overallProgress.completedLessons;
  const total = overallProgress.totalLessons;
  const percent = overallProgress.percentage;

  // Mapear progreso a estados de lección
  const getLessonState = (investigatorLessonId: string): LessonState => {
    // Intentar primero con el ID real (L1, L2, etc.)
    const realLessonId = getRealLessonId(investigatorLessonId);
    let progress = getLessonProgress(realLessonId);
    
    // Si no se encuentra, intentar con el ID del investigador directamente
    if (!progress) {
      progress = getLessonProgress(investigatorLessonId);
    }
    
    if (!progress) return 'notStarted';
    if (progress.completed) return 'completed';
    if (progress.progress > 0) return 'inProgress';
    return 'notStarted';
  };

  const progressMap: Record<string, LessonState> = useMemo(() => {
    const map: Record<string, LessonState> = {};
    INVESTIGATOR_LESSONS.forEach(lesson => {
      map[lesson.id] = getLessonState(lesson.id);
    });
    return map;
  }, [getLessonProgress, getOverallProgress]);

  const selectedLesson: InvestigatorLesson | undefined = useMemo(
    () => INVESTIGATOR_LESSONS.find(l => l.id === selectedLessonId),
    [selectedLessonId]
  );

  // Encontrar lección recomendada (primera no completada)
  const recommendedLesson = useMemo(() => {
    return INVESTIGATOR_LESSONS.find(l => progressMap[l.id] !== 'completed') ?? INVESTIGATOR_LESSONS[0];
  }, [progressMap]);

  const getStateLabel = (state: LessonState | undefined): string => {
    switch (state) {
      case 'inProgress':
        return t('investigatorLessons.states.inProgress');
      case 'completed':
        return t('investigatorLessons.states.completed');
      default:
        return t('investigatorLessons.states.notStarted');
    }
  };

  const getPrimaryButtonLabel = (state: LessonState | undefined): string => {
    switch (state) {
      case 'inProgress':
        return t('investigatorLessons.detail.buttonContinue');
      case 'completed':
        return t('investigatorLessons.detail.buttonReview');
      default:
        return t('investigatorLessons.detail.buttonStart');
    }
  };

  const handleOpenLesson = (lesson: InvestigatorLesson) => {
    // Usar el ID real de la lección si está disponible, sino usar el ID del investigador
    const realLessonId = lesson.lessonId || getRealLessonId(lesson.id);
    navigate(`/lessons/${realLessonId}`);
  };

  return (
    <PageContainer>
      <TopBar
        title={t('investigatorLessons.header.title')}
        subtitle={t('investigatorLessons.header.subtitle')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        {/* Resumen de Progreso */}
        <Card variant="gradient" className="il-summary-card">
          <div className="il-summary-content">
            <h2 className="il-summary-title">
              {t('investigatorLessons.summary.completedStats', { completed, total })}
            </h2>
            <p className="il-summary-recommended">
              {t('investigatorLessons.summary.recommended', {
                lessonTitle: t(`${recommendedLesson.translationKey}.title`)
              })}
            </p>
            <div className="il-progress-wrapper">
              <ProgressBar value={percent} variant="primary" size="md" showLabel={false} />
              <span className="il-progress-percent">{percent}%</span>
            </div>
          </div>
        </Card>

        {/* Layout de dos columnas */}
        <div className="il-layout">
          {/* Columna izquierda: Lista de lecciones */}
          <div className="il-list-column">
            <Section title={t('investigatorLessons.list.title')}>
              <div className="il-lessons-list">
                {INVESTIGATOR_LESSONS.map(lesson => {
                  const state = progressMap[lesson.id];
                  const isSelected = lesson.id === selectedLessonId;
                  const stateLabel = getStateLabel(state);

                  return (
                    <Card
                      key={lesson.id}
                      variant="default"
                      className={`il-lesson-card ${isSelected ? 'il-lesson-card--selected' : ''} il-lesson-card--${state}`}
                      onClick={() => setSelectedLessonId(lesson.id)}
                    >
                      <div className="il-lesson-card-header">
                        <h3 className="il-lesson-card-title">
                          {t(`${lesson.translationKey}.title`)}
                        </h3>
                        {state === 'completed' && (
                          <span className="il-completed-badge">✓</span>
                        )}
                      </div>
                      <p className="il-lesson-card-tagline">
                        {t(`${lesson.translationKey}.tagline`)}
                      </p>
                      <div className="il-lesson-card-state">
                        <span className={`il-state-chip il-state-chip--${state}`}>
                          {stateLabel}
                        </span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Section>
          </div>

          {/* Columna derecha: Detalle de lección */}
          {selectedLesson && (
            <div className="il-detail-column">
              <Card variant="default" className="il-detail-card">
                <h2 className="il-detail-title">
                  {t(`${selectedLesson.translationKey}.title`)}
                </h2>
                <p className="il-detail-tagline">
                  {t(`${selectedLesson.translationKey}.tagline`)}
                </p>

                <div className="il-detail-section">
                  <h3 className="il-detail-section-title">
                    {t('investigatorLessons.detail.whatYouWillLearn')}
                  </h3>
                  <p className="il-detail-encouragement">
                    {t('investigatorLessons.footer.encouragement')}
                  </p>
                </div>

                <ButtonPrimary
                  onClick={() => handleOpenLesson(selectedLesson)}
                  className="il-detail-button"
                >
                  {getPrimaryButtonLabel(progressMap[selectedLesson.id])}
                </ButtonPrimary>
              </Card>
            </div>
          )}
        </div>

        {/* Footer doctrinal */}
        <Card variant="outlined" className="il-footer-card">
          <p className="il-footer-text">
            {t('investigatorLessons.footer.encouragement')}
          </p>
        </Card>
      </div>
    </PageContainer>
  );
};

export default InvestigatorLessons;
