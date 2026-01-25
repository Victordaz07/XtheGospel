import React from 'react';
import { Scripture } from '../data/scriptures';
import './ScriptureCard.css';

interface ScriptureCardProps {
  scripture: Scripture;
  className?: string;
}

export function ScriptureCard({ scripture, className = '' }: ScriptureCardProps): JSX.Element {
  return (
    <div className={`scripture-card ${className}`}>
      <p className="scripture-card__text">{scripture.text}</p>
      <p className="scripture-card__reference">— {scripture.reference}</p>
      {scripture.context && (
        <p className="scripture-card__context">{scripture.context}</p>
      )}
    </div>
  );
}
