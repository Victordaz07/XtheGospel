import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';

export interface TeachingCanonExtraProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  note: string;
  items: string[];
}

export function TeachingCanonExtra({
  title,
  isOpen,
  onToggle,
  note,
  items,
}: TeachingCanonExtraProps): JSX.Element {
  return (
    <div className="nm-guide-detail__extra">
      <button
        type="button"
        className="nm-guide-detail__extra-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <FaChevronRight
          className={
            isOpen
              ? 'nm-guide-detail__section-chevron nm-guide-detail__section-chevron--open'
              : 'nm-guide-detail__section-chevron'
          }
        />
      </button>
      {isOpen ? (
        <div className="nm-guide-detail__extra-body">
          <p className="nm-guide-detail__extra-note">{note}</p>
          <ul className="nm-guide-detail__extra-list">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
