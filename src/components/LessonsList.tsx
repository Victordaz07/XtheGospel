import React from 'react';
import { Link } from 'react-router-dom';
import { LESSONS } from '../data/lessonsData';
import { useI18n } from '../context/I18nContext';
import { useProgress } from '../context/ProgressContext';
import './LessonsList.css';

const LessonsList: React.FC = () => {
  const { locale, t } = useI18n();
  const { getLessonProgress } = useProgress();

  return (
    <div className="lessons-list-page">
      <div className="page-header">
        <h1>{t('tabs.lessons')}</h1>
      </div>
      <div className="lessons-grid">
        {LESSONS.map((lesson) => {
          const progress = getLessonProgress(lesson.id);
          const progressPercent = progress?.progress || 0;
          const isCompleted = progress?.completed || false;

          return (
            <Link
              key={lesson.id}
              to={`/lessons/${lesson.id}`}
              className={`lesson-card ${isCompleted ? 'completed' : ''}`}
            >
              <div className="lesson-card-header">
                <h3>{lesson.title[locale]}</h3>
                {isCompleted && <span className="completed-badge">✓</span>}
              </div>
              <p className="lesson-description">{lesson.description[locale]}</p>
              <div className="lesson-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="progress-text">{progressPercent}%</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LessonsList;

