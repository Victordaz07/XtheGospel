import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaCheck, FaCircle } from 'react-icons/fa6';
import { Lesson, LessonStatus } from '../data/lessons';
import { useI18n } from '../../../context/I18nContext';
import './LessonListCard.css';

interface LessonListCardProps {
  lesson: Lesson;
  status?: LessonStatus;
}

/**
 * Lesson List Card
 * Sprint 10 - Added visual status indicators
 */
export function LessonListCard({
  lesson,
  status = 'not_started',
}: LessonListCardProps): JSX.Element {
  const { t } = useI18n();

  const statusClass =
    status !== 'not_started' ? `lesson-list-card--${status}` : '';

  return (
    <Link
      to={`/lessons/${lesson.id}`}
      className={`lesson-list-card ${statusClass}`.trim()}
    >
      <div
        className={`lesson-list-card__icon lesson-list-card__icon--${status}`}
      >
        {lesson.icon}
      </div>
      <div className="lesson-list-card__content">
        <h3 className="lesson-list-card__title">{lesson.title}</h3>
        <p className="lesson-list-card__subtitle">{lesson.subtitle}</p>
      </div>
      <div className="lesson-list-card__status">
        {status === 'completed' && (
          <span
            className="lesson-list-card__status-badge lesson-list-card__status-badge--completed"
            title={t('app.lessons.completed')}
            aria-label={t('app.lessons.completed')}
          >
            <FaCheck aria-hidden="true" />
          </span>
        )}
        {status === 'exploring' && (
          <span
            className="lesson-list-card__status-badge lesson-list-card__status-badge--exploring"
            title={t('app.lessons.inProgress')}
            aria-label={t('app.lessons.inProgress')}
          >
            <FaCircle aria-hidden="true" />
          </span>
        )}
        <FaChevronRight className="lesson-list-card__arrow" aria-hidden="true" />
      </div>
    </Link>
  );
}
