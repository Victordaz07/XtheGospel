import React from 'react';
import { ScriptureReferenceCard } from '../components';

export interface TeachingCanonSectionScriptureProps {
  sectionScripturesLabel: string;
  openScriptureNote: string;
  references: string[];
}

export function TeachingCanonSectionScripture({
  sectionScripturesLabel,
  openScriptureNote,
  references,
}: TeachingCanonSectionScriptureProps): JSX.Element {
  if (references.length === 0) {
    return <></>;
  }
  return (
    <div className="nm-guide-detail__section-scripture">
      <p className="nm-guide-detail__section-scripture-label">{sectionScripturesLabel}</p>
      <p className="nm-guide-detail__section-scripture-note">{openScriptureNote}</p>
      <div className="nm-guide-detail__section-scripture-list">
        {references.map((reference) => (
          <ScriptureReferenceCard
            key={reference}
            reference={reference}
            className="nm-guide-detail__scripture-ref"
          />
        ))}
      </div>
    </div>
  );
}
