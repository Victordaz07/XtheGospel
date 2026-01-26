/**
 * PageShell - Full page wrapper with header, content, and bottom nav spacing
 * 
 * Use this as the root wrapper for any page that needs consistent layout.
 */

import React, { ReactNode } from 'react';
import './PageShell.css';

interface PageShellProps {
  children: ReactNode;
  className?: string;
  /** Optional header content (renders at top) */
  header?: ReactNode;
  /** Page title (alternative to custom header) */
  title?: string;
  /** Back button handler - if provided, shows back button */
  onBack?: () => void;
  /** Optional actions for the header right side */
  headerActions?: ReactNode;
  /** Whether to add padding for bottom navigation (default: true) */
  hasBottomNav?: boolean;
  /** Background variant */
  variant?: 'default' | 'gradient' | 'plain';
}

export const PageShell: React.FC<PageShellProps> = ({
  children,
  className = '',
  header,
  title,
  onBack,
  headerActions,
  hasBottomNav = true,
  variant = 'default',
}) => {
  const showDefaultHeader = !header && (title || onBack || headerActions);

  return (
    <div className={`page-shell page-shell--${variant} ${className}`}>
      {/* Custom header */}
      {header && (
        <header className="page-shell-header page-shell-header--custom">
          {header}
        </header>
      )}

      {/* Default header with title/back/actions */}
      {showDefaultHeader && (
        <header className="page-shell-header">
          <div className="page-shell-header-left">
            {onBack && (
              <button 
                className="page-shell-back-btn"
                onClick={onBack}
                aria-label="Volver"
              >
                ←
              </button>
            )}
            {title && <h1 className="page-shell-title">{title}</h1>}
          </div>
          {headerActions && (
            <div className="page-shell-header-right">
              {headerActions}
            </div>
          )}
        </header>
      )}

      {/* Main content */}
      <main 
        className={`page-shell-content ${hasBottomNav ? 'page-shell-content--with-nav' : ''}`}
      >
        {children}
      </main>
    </div>
  );
};
