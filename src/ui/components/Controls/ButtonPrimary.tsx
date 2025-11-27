import React, { ReactNode } from 'react';
import { theme } from '../../theme/tokens';
import './ButtonPrimary.css';

interface ButtonPrimaryProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
}

export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  fullWidth = false,
  size = 'md',
  type = 'button',
}) => {
  const sizeMap = {
    sm: { padding: `${theme.spacing.sm}px ${theme.spacing.md}px`, fontSize: theme.typography.fontSize.sm },
    md: { padding: `${theme.spacing.md}px ${theme.spacing.lg}px`, fontSize: theme.typography.fontSize.md },
    lg: { padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`, fontSize: theme.typography.fontSize.lg },
  };

  return (
    <button
      type={type}
      className={`ui-button-primary ui-button-primary--${size} ${fullWidth ? 'ui-button-primary--full-width' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={sizeMap[size]}
    >
      {children}
    </button>
  );
};

