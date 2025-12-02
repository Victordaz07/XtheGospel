import React from 'react';

interface PageProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
}

export const XtgPage: React.FC<PageProps> = ({ title, subtitle, badge, children }) => {
  return (
    <div className="xtg-page">
      {(title || subtitle || badge) && (
        <header className="xtg-page-header">
          {badge && <span className="xtg-badge">{badge}</span>}
          {title && <h1 className="xtg-page-title">{title}</h1>}
          {subtitle && <p className="xtg-page-subtitle">{subtitle}</p>}
        </header>
      )}
      {children}
    </div>
  );
};

