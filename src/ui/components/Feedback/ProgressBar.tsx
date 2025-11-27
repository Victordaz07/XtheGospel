import React from 'react';
import { theme } from '../../theme/tokens';
import './ProgressBar.css';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'info';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeMap = {
    sm: { height: '6px' },
    md: { height: '14px' },
    lg: { height: '20px' },
  };

  return (
    <div className={`ui-progress-bar ${className}`}>
      <div
        className={`ui-progress-bar__container ui-progress-bar__container--${size}`}
        style={sizeMap[size]}
      >
        <div
          className={`ui-progress-bar__fill ui-progress-bar__fill--${variant}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="ui-progress-bar__label">{Math.round(percentage)}%</span>
      )}
    </div>
  );
};

