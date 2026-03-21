import React from 'react';

export interface TeachingCanonNotFoundProps {
  title: string;
  message: string;
}

export function TeachingCanonNotFound({ title, message }: TeachingCanonNotFoundProps): JSX.Element {
  return (
    <div className="nm-guide-detail__not-found">
      <div className="nm-guide-detail__not-found-icon" aria-hidden>
        📚
      </div>
      <h2 className="nm-guide-detail__not-found-title">{title}</h2>
      <p className="nm-guide-detail__not-found-text">{message}</p>
    </div>
  );
}
