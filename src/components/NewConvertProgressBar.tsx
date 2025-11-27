import React from 'react';
import '../pages/Page.css';

interface NewConvertProgressBarProps {
  value: number;
  label?: string;
}

export const NewConvertProgressBar: React.FC<NewConvertProgressBarProps> = ({ value, label }) => {
  const pct = Math.round(Math.max(0, Math.min(1, value || 0)) * 100);

  return (
    <div style={{ marginBottom: '24px' }}>
      {label && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)',
          color: 'var(--color-text-secondary)'
        }}>
          <span>{label}</span>
          <span style={{ 
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-secondary)'
          }}>{pct}%</span>
        </div>
      )}
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};


