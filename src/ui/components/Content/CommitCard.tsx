import React from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../../theme/tokens';
import './CommitCard.css';

interface CommitCardProps {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date | string;
  completed?: boolean;
  to?: string;
  className?: string;
}

export const CommitCard: React.FC<CommitCardProps> = ({
  id,
  title,
  description,
  dueDate,
  completed = false,
  to,
  className = '',
}) => {
  const formattedDate = dueDate
    ? new Date(dueDate).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  const content = (
    <div className={`ui-commit-card ${completed ? 'ui-commit-card--completed' : ''} ${className}`}>
      <div className="ui-commit-card__header">
        <h3 className="ui-commit-card__title">{title}</h3>
        {completed && <span className="ui-commit-card__badge">✓</span>}
      </div>
      {description && (
        <p className="ui-commit-card__description">{description}</p>
      )}
      {formattedDate && (
        <div className="ui-commit-card__date">
          📅 {formattedDate}
        </div>
      )}
      {to && (
        <Link to={to} className="ui-commit-card__link">
          Ver detalles →
        </Link>
      )}
    </div>
  );

  return content;
};

