import React from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../../theme/tokens';
import './PersonCard.css';

interface PersonCardProps {
  id: string;
  name: string;
  avatar?: string;
  status?: 'active' | 'inactive' | 'new';
  lastContact?: Date | string;
  nextLesson?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  id,
  name,
  avatar,
  status,
  lastContact,
  nextLesson,
  to,
  onClick,
  className = '',
}) => {
  const content = (
    <div
      className={`ui-person-card ${className}`}
      onClick={onClick}
    >
      {avatar ? (
        <img src={avatar} alt={name} className="ui-person-card__avatar" />
      ) : (
        <div className="ui-person-card__avatar-placeholder">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="ui-person-card__content">
        <div className="ui-person-card__header">
          <h3 className="ui-person-card__name">{name}</h3>
          {status && (
            <span className={`ui-person-card__status ui-person-card__status--${status}`}>
              {status === 'active' ? '●' : status === 'new' ? 'NEW' : '○'}
            </span>
          )}
        </div>
        {lastContact && (
          <p className="ui-person-card__meta">
            Último contacto: {new Date(lastContact).toLocaleDateString('es-ES')}
          </p>
        )}
        {nextLesson && (
          <p className="ui-person-card__meta">
            Próxima lección: {nextLesson}
          </p>
        )}
      </div>
      {to && (
        <div className="ui-person-card__arrow">→</div>
      )}
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
};

