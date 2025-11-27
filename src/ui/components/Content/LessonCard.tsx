import React from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../../theme/tokens';
import { ProgressBar } from '../Feedback/ProgressBar';
import './LessonCard.css';

interface LessonCardProps {
  id: string;
  title: string;
  description?: string;
  progress?: number; // 0-100
  completed?: boolean;
  to: string;
  className?: string;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  id,
  title,
  description,
  progress = 0,
  completed = false,
  to,
  className = '',
}) => {
  return (
    <Link
      to={to}
      className={`ui-lesson-card ${completed ? 'ui-lesson-card--completed' : ''} ${className}`}
    >
      <div className="ui-lesson-card__header">
        <div className="ui-lesson-card__number">
          <span>{id}</span>
        </div>
        <div className="ui-lesson-card__content">
          <h3 className="ui-lesson-card__title">{title}</h3>
          {description && (
            <p className="ui-lesson-card__description">{description}</p>
          )}
        </div>
        {completed && (
          <span className="ui-lesson-card__badge">✓</span>
        )}
      </div>
      {progress > 0 && (
        <div className="ui-lesson-card__progress">
          <ProgressBar value={progress} size="sm" variant="primary" />
          <span className="ui-lesson-card__progress-text">{progress}%</span>
        </div>
      )}
      <div className="ui-lesson-card__arrow">→</div>
    </Link>
  );
};

