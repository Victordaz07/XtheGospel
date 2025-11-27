import React, { ReactNode } from 'react';
import { theme } from '../../theme/tokens';
import { Card } from '../Layout/Card';
import './DevotionalCard.css';

interface DevotionalCardProps {
  scripture: {
    ref: string;
    text: string;
  };
  application?: string;
  action?: string;
  feedback?: ReactNode;
  className?: string;
}

export const DevotionalCard: React.FC<DevotionalCardProps> = ({
  scripture,
  application,
  action,
  feedback,
  className = '',
}) => {
  return (
    <Card variant="gradient" className={`ui-devotional-card ${className}`}>
      <div className="ui-devotional-card__header">
        <h3 className="ui-devotional-card__title">✨ Mensaje Diario</h3>
      </div>
      <div className="ui-devotional-card__content">
        <div className="ui-devotional-card__scripture">
          <div className="ui-devotional-card__scripture-ref">{scripture.ref}</div>
          <div className="ui-devotional-card__scripture-text">{scripture.text}</div>
        </div>
        {application && (
          <div className="ui-devotional-card__application">
            <p>{application}</p>
          </div>
        )}
        {action && (
          <div className="ui-devotional-card__action">
            <strong>Acción de hoy:</strong> {action}
          </div>
        )}
        {feedback && (
          <div className="ui-devotional-card__feedback">{feedback}</div>
        )}
      </div>
    </Card>
  );
};

