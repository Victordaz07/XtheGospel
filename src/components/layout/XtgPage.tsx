import React from 'react';

interface PageProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  rightIcon?: string;
  children: React.ReactNode;
}

export const XtgPage: React.FC<PageProps> = ({ title, subtitle, badge, rightIcon, children }) => {
  return (
    <div className="xtg-page">
      {(title || subtitle || badge || rightIcon) && (
        <header className="xtg-page-header">
          <div className="xtg-page-header-content">
            <div>
              {badge && <span className="xtg-badge">{badge}</span>}
              {title && <h1 className="xtg-page-title">{title}</h1>}
              {subtitle && <p className="xtg-page-subtitle">{subtitle}</p>}
            </div>
            {rightIcon && (
              <div className="xtg-page-right-icon">
                {rightIcon === 'bell' && '🔔'}
              </div>
            )}
          </div>
        </header>
      )}
      {children}
    </div>
  );
};

