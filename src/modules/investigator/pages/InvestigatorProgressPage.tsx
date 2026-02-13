import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaPenToSquare, FaCalendarDays, FaGraduationCap, FaFeather } from 'react-icons/fa6';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { useSpiritualMemoryStore, useHasJournalActivity } from '../../../core/memory/useSpiritualMemoryStore';
import { useI18n } from '../../../context/I18nContext';
import './InvestigatorProgressPage.css';

/**
 * Investigator Progress Page
 * Sprint 9 - Enhanced visual design with stats and animations
 * Now with i18n support
 */
export default function InvestigatorProgressPage(): JSX.Element {
  const { t } = useI18n();
  const { journalEntries, lastLessonId } = useInvestigatorStore();
  const { isHydrated, hydrate, lastLessonTitle } = useSpiritualMemoryStore();
  const hasReflectionActivity = useHasJournalActivity();
  
  // Hydrate memory on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrate();
    }
  }, [isHydrated, hydrate]);
  
  // Calculate stats
  const stats = useMemo(() => {
    const uniqueDays = new Set(
      journalEntries.map(e => new Date(e.timestamp).toDateString())
    ).size;
    
    const lessonsExplored = lastLessonId ? 1 : 0; // Simplified for now
    const reflections = journalEntries.length;
    
    return { daysActive: Math.max(uniqueDays, 1), lessonsExplored, reflections };
  }, [journalEntries, lastLessonId]);
  
  const hasJournalEntries = journalEntries.length > 0;
  const hasStartedLearning = lastLessonId !== null || (isHydrated && lastLessonTitle);

  return (
    <div className="inv-progress anim-fade-up">
      {/* Header */}
      <header className="inv-progress__header">
        <h1 className="inv-progress__title">{t('app.progress.title')}</h1>
        <p className="inv-progress__subtitle">
          {t('app.progress.subtitle')}
        </p>
      </header>

      {/* Visual Stats */}
      <section className="inv-progress__stats" aria-label={t('app.progress.subtitle')}>
        <div className="inv-progress__stat anim-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="inv-progress__stat-icon" aria-hidden="true">
            <FaCalendarDays />
          </div>
          <span className="inv-progress__stat-value">{stats.daysActive}</span>
          <span className="inv-progress__stat-label">{t('app.progress.stats.daysActive')}</span>
        </div>
        <div className="inv-progress__stat anim-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="inv-progress__stat-icon" aria-hidden="true">
            <FaGraduationCap />
          </div>
          <span className="inv-progress__stat-value">{stats.lessonsExplored}</span>
          <span className="inv-progress__stat-label">{t('app.progress.stats.lessonsCompleted')}</span>
        </div>
        <div className="inv-progress__stat anim-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="inv-progress__stat-icon" aria-hidden="true">
            <FaFeather />
          </div>
          <span className="inv-progress__stat-value">{stats.reflections}</span>
          <span className="inv-progress__stat-label">{t('app.progress.stats.reflections')}</span>
        </div>
      </section>

      {/* Reflection Card */}
      <section className="inv-progress__reflection">
        <p className="inv-progress__reflection-text">
          {t('app.progress.reflectionText')}
        </p>
      </section>

      {/* Recent Activity */}
      <section className="inv-progress__section">
        <h2 className="inv-progress__section-title">{t('app.progress.recentMoments')}</h2>
        
        {hasJournalEntries || hasStartedLearning || hasReflectionActivity ? (
          <div className="inv-progress__moments">
            {hasStartedLearning && (
              <div className="inv-progress__moment">
                <span className="inv-progress__moment-icon">📖</span>
                <p className="inv-progress__moment-text">
                  {t('app.progress.exploringGospel')}
                </p>
              </div>
            )}
            {hasReflectionActivity && (
              <div className="inv-progress__moment">
                <span className="inv-progress__moment-icon">✍️</span>
                <p className="inv-progress__moment-text">
                  {t('app.progress.timeToReflect')}
                </p>
              </div>
            )}
            {hasJournalEntries && !hasReflectionActivity && (
              <div className="inv-progress__moment">
                <span className="inv-progress__moment-icon">📝</span>
                <p className="inv-progress__moment-text">
                  {t('app.progress.journalReflections')}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="inv-progress__empty">
            <p className="inv-progress__empty-title">{t('app.progress.emptyTitle')}</p>
            <p className="inv-progress__empty-text">
              {t('app.progress.emptyText')}
            </p>
            <Link to="/lessons" className="inv-progress__empty-cta">
              <FaBookOpen aria-hidden="true" />
              {t('app.progress.exploreLesson')}
            </Link>
          </div>
        )}
      </section>

      {/* Gentle Next Steps */}
      <section className="inv-progress__section">
        <h2 className="inv-progress__section-title">{t('app.progress.nextSteps')}</h2>
        <p className="inv-progress__intro-text">
          {t('app.progress.nextStepsIntro')}
        </p>
        <div className="inv-progress__actions">
          <Link to="/lessons" className="inv-progress__action">
            <span className="inv-progress__action-icon">
              <FaBookOpen />
            </span>
            <div className="inv-progress__action-content">
              <h3 className="inv-progress__action-title">{t('app.progress.exploreLesson')}</h3>
              <p className="inv-progress__action-desc">
                {t('app.progress.exploreLessonDesc')}
              </p>
            </div>
          </Link>
          <Link to="/journal" className="inv-progress__action">
            <span className="inv-progress__action-icon">
              <FaPenToSquare />
            </span>
            <div className="inv-progress__action-content">
              <h3 className="inv-progress__action-title">{t('app.progress.writeReflection')}</h3>
              <p className="inv-progress__action-desc">
                {t('app.progress.writeReflectionDesc')}
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Closing */}
      <footer className="inv-progress__footer">
        <p className="inv-progress__footer-text">
          {t('app.progress.footerText')}
        </p>
      </footer>
    </div>
  );
}
