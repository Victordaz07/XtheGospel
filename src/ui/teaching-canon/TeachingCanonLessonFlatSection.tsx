import React from 'react';

export interface TeachingCanonLessonFlatSectionProps {
  title: string;
  paragraphs: string[];
}

/** Sección sin acordeón (p. ej. lecciones investigator sin modelo GuideTopic). */
export function TeachingCanonLessonFlatSection({
  title,
  paragraphs,
}: TeachingCanonLessonFlatSectionProps): JSX.Element {
  return (
    <article className="nm-guide-detail__section">
      <h2 className="nm-guide-detail__section-title">{title}</h2>
      <div className="nm-guide-detail__section-content">
        {paragraphs.map((para, i) => (
          <p key={i}>{para.trim()}</p>
        ))}
      </div>
    </article>
  );
}
