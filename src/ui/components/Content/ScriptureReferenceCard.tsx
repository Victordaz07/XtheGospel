import React, { useState } from 'react';
import { FaBookOpen } from 'react-icons/fa6';
import { useI18n } from '../../../context/I18nContext';
import { getScriptureByReference } from '../../../modules/investigator/data/scriptures';
import type { Scripture } from '../../../modules/investigator/data/scriptures';
import { ScriptureModal } from '../../../modules/investigator/components/ScriptureModal';
import './ScriptureReferenceCard.css';

export interface ScriptureReferenceCardProps {
  reference: string;
  className?: string;
}

/**
 * Reusable scripture reference card with baptism-style design.
 * Clicking opens the ScriptureModal with full text.
 */
export function ScriptureReferenceCard({
  reference,
  className = '',
}: ScriptureReferenceCardProps): JSX.Element {
  const { locale } = useI18n();
  const [modalOpen, setModalOpen] = useState(false);

  const scripture = getScriptureByReference(reference, locale);

  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <button
        type="button"
        className={`scripture-ref-card ${className}`.trim()}
        onClick={handleClick}
      >
        <FaBookOpen className="scripture-ref-card__icon" aria-hidden="true" />
        <span className="scripture-ref-card__ref">{reference}</span>
      </button>
      <ScriptureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        scripture={scripture ?? null}
      />
    </>
  );
}
