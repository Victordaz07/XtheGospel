import React from 'react';

interface XtgCardProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export const XtgCard: React.FC<XtgCardProps> = ({ title, className = '', children }) => {
  return (
    <section className={`xtg-card xtg-stack-md ${className}`}>
      {title && <h2 className="xtg-card-title">{title}</h2>}
      {children}
    </section>
  );
};

