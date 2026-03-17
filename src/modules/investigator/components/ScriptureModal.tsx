import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import { useI18n } from '../../../context/I18nContext';
import type { Scripture } from '../data/scriptures';
import './ScriptureModal.css';

export interface ScriptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  scripture: Scripture | null;
}

export function ScriptureModal({
  isOpen,
  onClose,
  scripture,
}: ScriptureModalProps): React.ReactPortal | null {
  const { t } = useI18n();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="scripture-modal__overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="scripture-modal-title"
    >
      <div
        className="scripture-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="scripture-modal__header">
          <h2 id="scripture-modal-title" className="scripture-modal__title">
            {scripture?.reference ?? t('app.scripture.modalTitle')}
          </h2>
          <button
            type="button"
            className="scripture-modal__close"
            onClick={onClose}
            aria-label={t('app.scripture.close')}
          >
            <FaXmark aria-hidden="true" />
          </button>
        </div>
        <div className="scripture-modal__body">
          {scripture ? (
            <>
              {scripture.verses && scripture.verses.length > 0 ? (
                <div className="scripture-modal__verses">
                  {scripture.verses.map((v) => (
                    <p key={v.verse} className="scripture-modal__verse">
                      <span className="scripture-modal__verse-num">{v.verse}</span>{' '}
                      {v.text}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="scripture-modal__text">{scripture.text}</div>
              )}
              {scripture.context && (
                <p className="scripture-modal__context">{scripture.context}</p>
              )}
            </>
          ) : (
            <p className="scripture-modal__empty">
              {t('app.scripture.notFound')}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
