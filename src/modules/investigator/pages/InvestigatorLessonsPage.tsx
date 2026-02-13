import React from 'react';
import {
  getInvestigatorCoreLessons,
  type Locale,
  INVESTIGATOR_CORE_TOPIC_IDS,
} from '../data/lessons';
import { LessonListCard } from '../components/LessonListCard';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { useI18n } from '../../../context/I18nContext';
import './InvestigatorLessonsPage.css';

/**
 * Investigator Lessons Page
 * Sprint 10 - Added global progress indicator and visual states
 * Now with i18n support and bilingual content
 */
export default function InvestigatorLessonsPage(): JSX.Element {
  const { t, locale } = useI18n();
  const { getLessonStatus } = useInvestigatorStore();

  // Map i18n locale to lessons locale (only es/en supported)
  const lessonsLocale: Locale = locale === 'en' ? 'en' : 'es';
  const coreLessons = getInvestigatorCoreLessons(lessonsLocale);

  // Calculate progress
  const totalLessons = INVESTIGATOR_CORE_TOPIC_IDS.length;
  const completedCount = coreLessons.filter(
    lesson => getLessonStatus(lesson.id) === 'completed',
  ).length;
  const exploringCount = coreLessons.filter(
    lesson => getLessonStatus(lesson.id) === 'exploring',
  ).length;
  const progressPercentage = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="inv-lessons anim-fade-up">
      {/* Header */}
      <header className="inv-lessons__header">
        <h1 className="inv-lessons__title">{t('app.lessons.title')}</h1>
        <p className="inv-lessons__subtitle">{t('app.lessons.subtitle')}</p>
      </header>

      {/* Progress Indicator */}
      <div className="inv-lessons__progress">
        <div className="inv-lessons__progress-header">
          <span className="inv-lessons__progress-label">
            {t('app.lessons.progressLabel')}
          </span>
          <span className="inv-lessons__progress-count">
            {completedCount} / {totalLessons}
          </span>
        </div>
        <div
          className="inv-lessons__progress-bar"
          role="progressbar"
          aria-valuenow={completedCount}
          aria-valuemin={0}
          aria-valuemax={totalLessons}
          aria-label={`${t('app.lessons.progressLabel')}: ${completedCount} ${t('app.lessons.completed').toLowerCase()} / ${totalLessons}`}
        >
          <div
            className="inv-lessons__progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
          {exploringCount > 0 && (
            <div
              className="inv-lessons__progress-exploring"
              style={{
                left: `${progressPercentage}%`,
                width: `${(exploringCount / totalLessons) * 100}%`,
              }}
            />
          )}
        </div>
        <div className="inv-lessons__progress-legend">
          {completedCount > 0 && (
            <span className="inv-lessons__legend-item inv-lessons__legend-item--completed">
              ✓ {completedCount} {t('app.lessons.completed').toLowerCase()}
            </span>
          )}
          {exploringCount > 0 && (
            <span className="inv-lessons__legend-item inv-lessons__legend-item--exploring">
              ○ {exploringCount} {t('app.lessons.inProgress').toLowerCase()}
            </span>
          )}
        </div>
      </div>

      {/* Introduction */}
      <div className="inv-lessons__intro">
        <p className="inv-lessons__intro-text">{t('app.lessons.introText')}</p>
      </div>

      {/* Lessons List */}
      <div className="inv-lessons__list">
        {coreLessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className="anim-fade-up"
            style={{ animationDelay: `${0.1 + index * 0.08}s` }}
          >
            <LessonListCard
              lesson={lesson}
              status={getLessonStatus(lesson.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
