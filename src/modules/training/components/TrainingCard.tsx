/**
 * TrainingCard - Card for path/track with progress and status
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaLock } from 'react-icons/fa6';
import { Card } from '../../../ui/components';
import { ProgressRing } from './ProgressRing';
import type { LessonStatus } from '../types/training';
import './TrainingCard.css';

export interface TrainingCardBadge {
  label: string;
  variant?: 'success' | 'neutral';
}

export interface TrainingCardProps {
  nodeId: string;
  title: string;
  description?: string;
  status: LessonStatus;
  progress: { completed: number; total: number; percent: number };
  to: string;
  badge?: TrainingCardBadge;
}

export function TrainingCard({
  nodeId,
  title,
  description,
  status,
  progress,
  to,
  badge,
}: TrainingCardProps): JSX.Element {
  const isLocked = status === 'locked';
  const variant = badge?.variant ?? 'success';

  const content = (
      <Card variant="default" padding="md" className="tr-training-card__inner">
        <div className="tr-training-card__content">
          <div className="tr-training-card__main">
            <div className="tr-training-card__header">
              <div className="tr-training-card__title-wrap">
                {isLocked && (
                  <span className="tr-training-card__lock">
                    <FaLock />
                  </span>
                )}
                <h3 className="tr-training-card__title">{title}</h3>
              </div>
              {badge && (
                <span
                  className={`tr-training-card__badge tr-training-card__badge--${variant}`}
                  aria-label={badge.label}
                  title={badge.label}
                >
                  {badge.label}
                </span>
              )}
            </div>
            {description && (
              <p className="tr-training-card__desc">{description}</p>
            )}
          </div>
          <div className="tr-training-card__progress">
            <ProgressRing
              value={progress.percent}
              max={100}
              size="sm"
              variant={progress.percent === 100 ? 'success' : 'primary'}
            />
          </div>
        </div>
        {!isLocked && (
          <FaChevronRight className="tr-training-card__arrow" />
        )}
      </Card>
  );

  if (isLocked) {
    return <div className={`tr-training-card tr-training-card--${status}`}>{content}</div>;
  }
  return (
    <Link to={to} className={`tr-training-card tr-training-card--${status}`}>
      {content}
    </Link>
  );
}
