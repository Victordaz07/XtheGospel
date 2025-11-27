import React from 'react';
import { theme } from '../../theme/tokens';
import './RoleBadge.css';

interface RoleBadgeProps {
  role: string;
  className?: string;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className = '' }) => {
  return (
    <span className={`ui-role-badge ${className}`}>
      {role.toUpperCase()}
    </span>
  );
};

