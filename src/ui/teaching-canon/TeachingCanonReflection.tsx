import React from 'react';

export interface TeachingCanonReflectionProps {
  reflectionLabel: string;
  reflectionPrompt: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  saveLabel: string;
  savedLabel: string;
  savedMessage: string;
  saved: boolean;
  disableSave?: boolean;
}

export function TeachingCanonReflection({
  reflectionLabel,
  reflectionPrompt,
  placeholder,
  value,
  onChange,
  onSave,
  saveLabel,
  savedLabel,
  savedMessage,
  saved,
  disableSave,
}: TeachingCanonReflectionProps): JSX.Element {
  return (
    <div className="nm-guide-detail__reflection">
      <h3 className="nm-guide-detail__reflection-label">{reflectionLabel}</h3>
      <p className="nm-guide-detail__reflection-prompt">{reflectionPrompt}</p>
      <textarea
        className="nm-guide-detail__reflection-textarea"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="nm-guide-detail__reflection-actions">
        <button
          type="button"
          className="nm-guide-detail__btn nm-guide-detail__btn--primary"
          onClick={onSave}
          disabled={disableSave ?? !value.trim()}
        >
          {saved ? savedLabel : saveLabel}
        </button>
      </div>
      {saved ? <p className="nm-guide-detail__saved-message">{savedMessage}</p> : null}
    </div>
  );
}
