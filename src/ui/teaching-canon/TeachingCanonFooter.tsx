import React from 'react';

export interface TeachingCanonFooterProps {
  children: React.ReactNode;
}

export function TeachingCanonFooter({ children }: TeachingCanonFooterProps): JSX.Element {
  return (
    <footer className="nm-guide-detail__footer">
      <p className="nm-guide-detail__footer-text">{children}</p>
    </footer>
  );
}
