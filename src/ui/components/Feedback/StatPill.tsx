import React, { ReactNode } from 'react';
import { theme } from '../../theme/tokens';
import './StatPill.css';

interface StatPillProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info';
  className?: string;
}

export const StatPill: React.FC<StatPillProps> = ({
  label,
  value,
  icon,
  variant = 'default',
  className = '',
}) => {
  return (
    <div className={`ui-stat-pill ui-stat-pill--${variant} ${className}`}>
      {icon && <div className="ui-stat-pill__icon">{icon}</div>}
      <div className="ui-stat-pill__content">
        <span className="ui-stat-pill__label">{label}</span>
        <span className="ui-stat-pill__value">{value}</span>
      </div>
    </div>
  );
};

