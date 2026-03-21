import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';

export interface TeachingCanonAccordionSectionProps {
  sectionId: string;
  isOpen: boolean;
  onToggle: () => void;
  kicker: string;
  title: string;
  children: React.ReactNode;
}

export function TeachingCanonAccordionSection({
  sectionId,
  isOpen,
  onToggle,
  kicker,
  title,
  children,
}: TeachingCanonAccordionSectionProps): JSX.Element {
  return (
    <article
      className={
        isOpen ? 'nm-guide-detail__section nm-guide-detail__section--open' : 'nm-guide-detail__section'
      }
    >
      <button
        type="button"
        className="nm-guide-detail__section-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${sectionId}-panel`}
        id={`${sectionId}-trigger`}
      >
        <span className="nm-guide-detail__section-heading">
          <span className="nm-guide-detail__section-kicker">{kicker}</span>
          <span className="nm-guide-detail__section-title">{title}</span>
        </span>
        <FaChevronRight
          className={
            isOpen
              ? 'nm-guide-detail__section-chevron nm-guide-detail__section-chevron--open'
              : 'nm-guide-detail__section-chevron'
          }
        />
      </button>
      {isOpen ? (
        <div
          className="nm-guide-detail__section-body"
          id={`${sectionId}-panel`}
          role="region"
          aria-labelledby={`${sectionId}-trigger`}
        >
          {children}
        </div>
      ) : null}
    </article>
  );
}
