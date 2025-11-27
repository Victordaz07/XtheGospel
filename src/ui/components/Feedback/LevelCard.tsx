import React from 'react';
import { theme } from '../../theme/tokens';
import { ProgressBar } from './ProgressBar';
import './LevelCard.css';

interface LevelCardProps {
  level: number;
  levelLabel: string;
  currentXp: number;
  nextLevelXp: number;
  totalXp: number;
  className?: string;
}

export const LevelCard: React.FC<LevelCardProps> = ({
  level,
  levelLabel,
  currentXp,
  nextLevelXp,
  totalXp,
  className = '',
}) => {
  const progressPercent = (currentXp / nextLevelXp) * 100;

  return (
    <div className={`ui-level-card ${className}`}>
      <div className="ui-level-card__header">
        <div className="ui-level-card__icon">
          <span>📊</span>
        </div>
        <div className="ui-level-card__info">
          <p className="ui-level-card__label">Nivel {level}</p>
          <h3 className="ui-level-card__title">{levelLabel}</h3>
        </div>
        <div className="ui-level-card__xp">
          <span className="ui-level-card__xp-value">{totalXp}</span>
          <span className="ui-level-card__xp-label">XP</span>
        </div>
      </div>
      <div className="ui-level-card__progress">
        <ProgressBar value={progressPercent} variant="primary" size="md" />
        <div className="ui-level-card__progress-text">
          <span>{currentXp} / {nextLevelXp} XP</span>
        </div>
      </div>
    </div>
  );
};

