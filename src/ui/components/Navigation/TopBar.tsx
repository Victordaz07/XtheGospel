import React, { ReactNode } from 'react';
import { theme } from '../../theme/tokens';
import './TopBar.css';

interface TopBarProps {
  title?: string;
  subtitle?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  subtitle,
  leftAction,
  rightAction,
  className = '',
}) => {
  return (
    <header className={`ui-top-bar ${className}`}>
      {leftAction && <div className="ui-top-bar__left">{leftAction}</div>}
      {(title || subtitle) && (
        <div className="ui-top-bar__center">
          {title && <h1 className="ui-top-bar__title">{title}</h1>}
          {subtitle && <p className="ui-top-bar__subtitle">{subtitle}</p>}
        </div>
      )}
      {rightAction && <div className="ui-top-bar__right">{rightAction}</div>}
    </header>
  );
};

