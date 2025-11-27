import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../../theme/tokens';
import './ActivityCard.css';

interface ActivityCardProps {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  xp?: number;
  completed?: boolean;
  to?: string;
  onClick?: () => void;
  className?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  id,
  title,
  description,
  icon,
  xp,
  completed = false,
  to,
  onClick,
  className = '',
}) => {
  const content = (
    <div className={`ui-activity-card ${completed ? 'ui-activity-card--completed' : ''} ${className}`}>
      {icon && <div className="ui-activity-card__icon">{icon}</div>}
      <div className="ui-activity-card__content">
        <h3 className="ui-activity-card__title">{title}</h3>
        {description && (
          <p className="ui-activity-card__description">{description}</p>
        )}
      </div>
      {xp !== undefined && (
        <div className="ui-activity-card__xp">
          <span>+{xp} XP</span>
        </div>
      )}
      {completed && (
        <span className="ui-activity-card__badge">✓</span>
      )}
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  if (onClick) {
    return <div onClick={onClick} style={{ cursor: 'pointer' }}>{content}</div>;
  }

  return content;
};

