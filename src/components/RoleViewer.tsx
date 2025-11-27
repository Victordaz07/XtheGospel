import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { UserRoleKey, ALL_ROLES, ROLE_DEFINITIONS, getRoleDefaultRoute } from '../config/roles';
import './RoleViewer.css';

interface RoleViewerProps {
  currentRole: UserRoleKey;
}

export const RoleViewer: React.FC<RoleViewerProps> = ({ currentRole }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useI18n();

  const handleRoleChange = async (role: UserRoleKey) => {
    try {
      await login(role);
      
      // Navigate using centralized route configuration
      navigate(getRoleDefaultRoute(role), { replace: true });
      
      // Force reload to update all contexts and layouts
      window.location.reload();
    } catch (error) {
      console.error('Error changing role:', error);
    }
  };

  // Use centralized role definitions with i18n labels
  const roles = ALL_ROLES.map((roleId) => ({
    id: roleId,
    label: t(ROLE_DEFINITIONS[roleId].i18nKey),
    icon: ROLE_DEFINITIONS[roleId].icon,
  }));

  return (
    <div className="role-viewer">
      <div className="role-viewer-header">
        <span className="role-viewer-label">Vista de roles</span>
        <span className="role-viewer-help" title="Cambia de rol para ver cómo otros usuarios ven la aplicación">
          ℹ️
        </span>
      </div>
      <div className="role-viewer-buttons">
        {roles.map((role) => (
          <button
            key={role.id}
            className={`role-viewer-btn ${currentRole === role.id ? 'active' : ''}`}
            onClick={() => handleRoleChange(role.id)}
            title={`Ver como ${role.label}`}
          >
            <span className="role-viewer-icon">{role.icon}</span>
            <span className="role-viewer-text">{role.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

