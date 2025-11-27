import React, { ReactNode } from 'react';
import { theme } from '../../theme/tokens';
import './TwoColumnLayout.css';

interface TwoColumnLayoutProps {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  gap?: keyof typeof theme.spacing;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  left,
  right,
  className = '',
  gap = 'md',
}) => {
  return (
    <div
      className={`ui-two-column-layout ${className}`}
      style={{
        gap: `${theme.spacing[gap]}px`,
      }}
    >
      <div className="ui-two-column-layout__left">{left}</div>
      <div className="ui-two-column-layout__right">{right}</div>
    </div>
  );
};

