import React, { ReactNode } from 'react';
import { theme } from '../../theme/tokens';
import './Section.css';

interface SectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  title,
  subtitle,
}) => {
  return (
    <section className={`ui-section ${className}`}>
      {(title || subtitle) && (
        <div className="ui-section-header">
          {title && <h2 className="ui-section-title">{title}</h2>}
          {subtitle && <p className="ui-section-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="ui-section-content">{children}</div>
    </section>
  );
};

