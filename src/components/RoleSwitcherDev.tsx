import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { ALL_ROLES, UserRoleKey, ROLE_DEFINITIONS, getRoleDefaultRoute } from '../config/roles';
import './RoleSwitcherDev.css';

const IS_DEV = import.meta.env.DEV || import.meta.env.MODE === 'development';

export const RoleSwitcherDev: React.FC = () => {
  const navigate = useNavigate();
  const { userRole, login } = useAuth();
  const { t } = useI18n();

  if (!IS_DEV) {
    return null;
  }

  const handleRoleChange = async (role: UserRoleKey) => {
    try {
      // Use centralized login function which validates and stores the role
      await login(role);
      
      // Navigate using centralized route configuration
      navigate(getRoleDefaultRoute(role), { replace: true });
      
      // Force reload to update all contexts
      window.location.reload();
    } catch (error) {
      console.error('Error changing role in dev switcher:', error);
    }
  };

  return (
    <div className="role-switcher-dev">
      <span className="role-switcher-label">DEV:</span>
      {ALL_ROLES.map((role) => (
        <button
          key={role}
          className={`role-switcher-btn ${userRole === role ? 'active' : ''}`}
          onClick={() => handleRoleChange(role)}
          title={`Switch to ${t(ROLE_DEFINITIONS[role].i18nKey)} role`}
        >
          {t(ROLE_DEFINITIONS[role].i18nKey)}
        </button>
      ))}
    </div>
  );
};

