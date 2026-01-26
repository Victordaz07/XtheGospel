/**
 * SectionTitle - Standalone section header
 * 
 * Use when you need just the title without the Section wrapper.
 */

import React, { ReactNode } from 'react';
import './SectionTitle.css';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  subtitle?: string;
  /** Optional action button/link on the right */
  action?: ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = '',
  subtitle,
  action,
}) => {
  return (
    <div className={`section-title-wrapper ${className}`}>
      <div className="section-title-left">
        <h2 className="section-title">{children}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {action && (
        <div className="section-title-action">
          {action}
        </div>
      )}
    </div>
  );
};
