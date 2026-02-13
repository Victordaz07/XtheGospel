/**
 * ProgressRing - Circular progress indicator
 * Uses design system tokens
 */

import React from 'react';
import './ProgressRing.css';

export interface ProgressRingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'secondary';
  className?: string;
  ariaLabel?: string;
}

export function ProgressRing({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  className = '',
  ariaLabel,
}: ProgressRingProps): JSX.Element {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = size === 'sm' ? 32 : size === 'lg' ? 56 : 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={`tr-progress-ring tr-progress-ring--${size} tr-progress-ring--${variant} ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel || `Progreso: ${Math.round(percentage)}%`}
    >
      <svg viewBox={`0 0 ${radius * 2 + 8} ${radius * 2 + 8}`} className="tr-progress-ring__svg">
        <circle
          className="tr-progress-ring__bg"
          cx={radius + 4}
          cy={radius + 4}
          r={radius}
        />
        <circle
          className="tr-progress-ring__fill"
          cx={radius + 4}
          cy={radius + 4}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className="tr-progress-ring__label">{Math.round(percentage)}%</span>
    </div>
  );
}
