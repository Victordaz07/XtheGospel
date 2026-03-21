import React from 'react';
import { ScriptureReferenceCard } from '../components';
import type { Scripture } from '../../modules/investigator/data/scriptures';

export interface TeachingCanonFeaturedScriptureProps {
  label: string;
  scripture: Scripture;
}

export function TeachingCanonFeaturedScripture({
  label,
  scripture,
}: TeachingCanonFeaturedScriptureProps): JSX.Element {
  return (
    <section className="nm-guide-detail__featured-scripture">
      <p className="nm-guide-detail__featured-scripture-label">{label}</p>
      <div className="nm-guide-detail__featured-scripture-card">
        <div className="nm-guide-detail__featured-scripture-body">
          {scripture.verses && scripture.verses.length > 0 ? (
            scripture.verses.map((verse) => (
              <p key={verse.verse} className="nm-guide-detail__featured-scripture-verse">
                <span className="nm-guide-detail__featured-scripture-number">{verse.verse}</span>{' '}
                {verse.text}
              </p>
            ))
          ) : (
            <p className="nm-guide-detail__featured-scripture-verse">{scripture.text}</p>
          )}
        </div>
        <div className="nm-guide-detail__featured-scripture-actions">
          <ScriptureReferenceCard reference={scripture.reference} />
        </div>
      </div>
    </section>
  );
}
