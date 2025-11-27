import React, { ReactNode } from 'react';
import { theme } from '../../theme/tokens';
import './PageContainer.css';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  maxWidth = '100%',
}) => {
  return (
    <div
      className={`ui-page-container ${className}`}
      style={{
        maxWidth,
        padding: `${theme.spacing.lg}px ${theme.spacing.md}px ${theme.spacing.xxxl}px`,
      }}
    >
      {children}
    </div>
  );
};

