import React from 'react';
import { theme } from '../constants/theme';
import './RoleButton.css';

interface RoleButtonProps {
  title: string;
  onClick: () => void;
}

const RoleButton: React.FC<RoleButtonProps> = ({ title, onClick }) => {
  return (
    <button className="role-button" onClick={onClick}>
      {title}
    </button>
  );
};

export default RoleButton;

