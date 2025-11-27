import React, { ReactNode } from 'react';
import { theme } from '../../theme/tokens';
import './IconButton.css';

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'ghost';
  ariaLabel?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className = '',
  disabled = false,
  size = 'md',
  variant = 'default',
  ariaLabel,
}) => {
  const sizeMap = {
    sm: { width: '32px', height: '32px', fontSize: '14px' },
    md: { width: '42px', height: '42px', fontSize: '16px' },
    lg: { width: '52px', height: '52px', fontSize: '20px' },
  };

  return (
    <button
      className={`ui-icon-button ui-icon-button--${size} ui-icon-button--${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={sizeMap[size]}
    >
      {icon}
    </button>
  );
};

