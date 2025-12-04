import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { CommitmentType } from '../../data/investigatorCommitments';
import { Card, ButtonPrimary } from '../../ui/components';
import './NewCommitmentCard.css';

interface NewCommitmentCardProps {
  onAdd: (payload: { text: string; type: CommitmentType }) => void;
}

export const NewCommitmentCard: React.FC<NewCommitmentCardProps> = ({ onAdd }) => {
  const { t } = useI18n();
  const [text, setText] = useState('');
  const [type, setType] = useState<CommitmentType>('spiritual');

  const canSave = text.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    onAdd({ text: text.trim(), type });
    setText('');
    setType('spiritual');
  };

  const typeOptions: Array<{ key: CommitmentType; labelKey: string }> = [
    { key: 'study', labelKey: 'typeStudy' },
    { key: 'spiritual', labelKey: 'typeSpiritual' },
    { key: 'attendance', labelKey: 'typeAttendance' },
    { key: 'service', labelKey: 'typeService' },
  ];

  return (
    <Card variant="default" className="new-commitment-card">
      <div className="new-commitment-form">
        <div className="new-commitment-field">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            placeholder={t('investigatorCommitments.new.placeholder')}
            className="new-commitment-input"
          />
        </div>

        <div className="new-commitment-field">
          <label className="new-commitment-label">
            {t('investigatorCommitments.new.typeLabel')}
          </label>
          <div className="new-commitment-type-selector">
            {typeOptions.map((option) => {
              const isActive = type === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setType(option.key)}
                  className={`new-commitment-type-option ${isActive ? 'new-commitment-type-option--active' : ''}`}
                >
                  {t(`investigatorCommitments.new.${option.labelKey}`)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="new-commitment-helper">
          {t('investigatorCommitments.new.helper')}
        </div>

        <ButtonPrimary
          onClick={handleSave}
          disabled={!canSave}
          className="new-commitment-save-button"
        >
          {t('investigatorCommitments.new.buttonSave')}
        </ButtonPrimary>
      </div>
    </Card>
  );
};

