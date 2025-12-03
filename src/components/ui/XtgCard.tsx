import React from 'react';

interface XtgCardProps {
  title?: string;
  className?: string;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
}

export const XtgCard: React.FC<XtgCardProps> = ({ 
  title, 
  className = '', 
  actionLabel,
  onAction,
  children 
}) => {
  return (
    <section className={`xtg-card xtg-stack-md ${className}`}>
      {(title || actionLabel) && (
        <div className="xtg-card-header">
          {title && <h2 className="xtg-card-title">{title}</h2>}
          {actionLabel && onAction && (
            <button 
              type="button"
              className="xtg-card-action"
              onClick={onAction}
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
      {children}
    </section>
  );
};

