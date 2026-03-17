import React from 'react';
import { Scripture } from '../data/scriptures';
import { ScriptureReferenceCard } from '../../../ui/components';
import './ScriptureCard.css';

interface ScriptureCardProps {
  scripture: Scripture;
  className?: string;
}

export function ScriptureCard({ scripture, className = '' }: ScriptureCardProps): JSX.Element {
  return (
    <div className={`scripture-card ${className}`}>
      <p className="scripture-card__text">{scripture.text}</p>
      <div className="scripture-card__reference"><ScriptureReferenceCard reference={scripture.reference} /></div>
      {scripture.context && (
        <p className="scripture-card__context">{scripture.context}</p>
      )}
    </div>
  );
}
