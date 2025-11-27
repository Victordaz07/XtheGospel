import React from 'react';
import type { NewConvertSection } from '../member/data/memberTypes';
import './NewConvertSectionCard.css';

interface BadgeLabels {
  bullets: string;
  scriptures: string;
  tips: string;
}

interface NewConvertSectionCardProps {
  section: NewConvertSection;
  completed: boolean;
  onOpen: () => void;
  badges: BadgeLabels;
  completedLabel: string;
  detailsLabel: string;
}

const truncateContent = (content: string, maxLength = 200) => {
  const plain = content.replace(/\s+/g, ' ').trim();
  if (plain.length <= maxLength) {
    return plain;
  }
  return `${plain.slice(0, maxLength)}…`;
};

export const NewConvertSectionCard: React.FC<NewConvertSectionCardProps> = ({
  section,
  completed,
  onOpen,
  badges,
  completedLabel,
  detailsLabel,
}) => {
  return (
    <article
      className={`new-convert-section-card ${completed ? 'completed' : ''}`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="new-convert-section-card-header">
        <div>
          <h3 className="new-convert-section-card-title">{section.title}</h3>
          {completed && (
            <p className="new-convert-section-card-status" aria-live="polite">
              {completedLabel}
            </p>
          )}
        </div>
      </div>

      <p className="new-convert-section-card-content">{truncateContent(section.content)}</p>

      <div className="new-convert-section-card-badges">
        <span className="new-convert-section-card-badge">{badges.bullets}</span>
        <span className="new-convert-section-card-badge">{badges.scriptures}</span>
        <span className="new-convert-section-card-badge">{badges.tips}</span>
      </div>

      <div className="new-convert-section-card-actions">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="new-convert-section-card-button"
        >
          {detailsLabel}
        </button>
      </div>
    </article>
  );
};


