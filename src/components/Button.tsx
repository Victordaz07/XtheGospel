import React from 'react';
import './Button.css';

interface ButtonProps {
  title: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
}) => {
  const variantClass = `btn-${variant}`;
  const disabledClass = disabled || loading ? 'btn-disabled' : '';

  return (
    <button
      className={`btn ${variantClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <span className="btn-spinner">⏳</span> : <span>{title}</span>}
    </button>
  );
};
