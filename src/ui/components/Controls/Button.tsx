/**
 * Button - Unified button component with variants
 * 
 * Variants:
 * - primary: Main action (gradient background)
 * - secondary: Secondary action (soft background)
 * - ghost: Minimal (outlined)
 * - destructive: Dangerous actions (calm, not alarming)
 */

import React, { ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  fullWidth = false,
  size = 'md',
  variant = 'primary',
  type = 'button',
  icon,
}) => {
  const classes = [
    'ui-button',
    `ui-button--${variant}`,
    `ui-button--${size}`,
    fullWidth ? 'ui-button--full-width' : '',
    disabled ? 'ui-button--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="ui-button-icon">{icon}</span>}
      <span className="ui-button-label">{children}</span>
    </button>
  );
};
