import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useI18n, Locale } from '../../../context/I18nContext';
import { LeadershipRoleService } from '../../../services/leadershipRoleService';
import {
  getLeadershipRoleEnhanced,
  LeadershipRole,
} from '../../../data/missionary/leadershipModeEnhanced';
import { FaSignOutAlt, FaGlobe, FaUser, FaChevronRight } from 'react-icons/fa';
import '../../../pages/Page.css';
import './LeadershipProfileScreen.css';

// Browser globals for web environment
declare const confirm: (message?: string) => boolean;
declare const alert: (message?: string) => void;

const languageOptions: { code: Locale; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

export const LeadershipProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { logout, userRole } = useAuth();
  const { t, locale, setLocale } = useI18n();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const currentLeadershipRole = LeadershipRoleService.getCurrentRole();
  const roleConfig = getLeadershipRoleEnhanced(currentLeadershipRole);

  const handleLogout = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      await logout();
      navigate('/');
    }
  };

  const handleLanguageSelect = async (code: Locale) => {
    await setLocale(code);
    setShowLanguageModal(false);
  };

  const handleRoleChange = (newRole: LeadershipRole) => {
    if (newRole === currentLeadershipRole) return;

    if (newRole === 'none') {
      // Volver al modo misionero normal
      const previousRole = currentLeadershipRole;
      LeadershipRoleService.setCurrentRole('none');

      // Map leadership role to abbreviation
      const roleAbbreviation =
        previousRole === 'districtLeader'
          ? 'DL'
          : previousRole === 'zoneLeader'
          ? 'ZL'
          : previousRole === 'assistantToPresident'
          ? 'AP'
          : undefined;

      // Show identity reminder screen first
      // Navigate to identity reminder - router will switch to MissionaryLayout
      navigate('/identity-reminder', {
        replace: true,
        state: { previousLeadershipRole: roleAbbreviation },
      });
    } else {
      // Cambiar a otro rol de liderazgo
      const canChange = LeadershipRoleService.canChangeRole();
      if (!canChange) {
        // eslint-disable-next-line no-restricted-globals
        alert(
          'No puedes cambiar de rol en este momento. Debes esperar 6 semanas desde el último cambio.',
        );
        return;
      }

      LeadershipRoleService.setCurrentRole(newRole);
      navigate(`/missionary/leadership/${newRole}/dashboard`, {
        replace: true,
      });
    }
  };

  const getRoleLabel = (role: LeadershipRole): string => {
    switch (role) {
      case 'districtLeader':
        return 'Líder de Distrito';
      case 'zoneLeader':
        return 'Líder de Zona';
      case 'assistantToPresident':
        return 'Asistente del Presidente';
      case 'none':
        return 'Misionero Regular';
      default:
        return 'Sin rol';
    }
  };

  const getRoleIcon = (role: LeadershipRole): string => {
    switch (role) {
      case 'districtLeader':
        return '👥';
      case 'zoneLeader':
        return '📊';
      case 'assistantToPresident':
        return '⭐';
      case 'none':
        return '🙌';
      default:
        return '👤';
    }
  };

  const availableRoles: LeadershipRole[] = [
    'districtLeader',
    'zoneLeader',
    'assistantToPresident',
    'none',
  ];

  return (
    <div className="page">
      <div
        className="page-header"
        style={{ borderLeftColor: roleConfig?.color || '#3B82F6' }}
      >
        <div
          className="leadership-header-badge"
          style={{
            backgroundColor: `${roleConfig?.color || '#3B82F6'}15`,
            color: roleConfig?.color || '#3B82F6',
          }}
        >
          👤
        </div>
        <div style={{ flex: 1 }}>
          <h1>Perfil</h1>
          <p className="page-subtitle">{roleConfig?.name || 'Líder'}</p>
        </div>
      </div>

      <div className="page-content">
        {/* Información del usuario */}
        <div className="profile-section">
          <div className="profile-avatar-section">
            <div
              className="profile-avatar"
              style={{ backgroundColor: `${roleConfig?.color || '#3B82F6'}20` }}
            >
              <FaUser
                style={{
                  fontSize: '48px',
                  color: roleConfig?.color || '#3B82F6',
                }}
              />
            </div>
            <div className="profile-info">
              <h2>Misionero</h2>
              <p style={{ color: '#6B7280', marginTop: '4px' }}>
                {roleConfig?.name || 'Líder'}
              </p>
            </div>
          </div>
        </div>

        {/* Cambiar rol de liderazgo */}
        <div className="profile-section">
          <h3 className="profile-section-title">Mi Llamamiento Actual</h3>
          <div className="role-selector-container">
            {availableRoles.map(role => {
              const isActive = role === currentLeadershipRole;
              const roleLabel = getRoleLabel(role);
              const roleIcon = getRoleIcon(role);
              const roleColor =
                role === 'none'
                  ? '#6B7280'
                  : getLeadershipRoleEnhanced(role)?.color || '#3B82F6';

              return (
                <button
                  key={role}
                  className={`role-option ${isActive ? 'active' : ''}`}
                  onClick={() => handleRoleChange(role)}
                  style={{
                    borderColor: isActive ? roleColor : '#E5E7EB',
                    backgroundColor: isActive ? `${roleColor}10` : '#FFFFFF',
                  }}
                >
                  <span className="role-icon" style={{ color: roleColor }}>
                    {roleIcon}
                  </span>
                  <div className="role-info">
                    <strong style={{ color: isActive ? roleColor : '#111827' }}>
                      {roleLabel}
                    </strong>
                    {isActive && (
                      <span
                        className="role-active-badge"
                        style={{ backgroundColor: roleColor }}
                      >
                        Activo
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <p className="profile-section-hint">
            Puedes cambiar entre roles de liderazgo según tu asignación actual.
          </p>
        </div>

        {/* Idioma */}
        <div className="profile-section">
          <h3 className="profile-section-title">Idioma</h3>
          <button
            className="profile-action-button"
            onClick={() => setShowLanguageModal(true)}
          >
            <FaGlobe style={{ fontSize: '20px', color: '#6B7280' }} />
            <span>
              {languageOptions.find(opt => opt.code === locale)?.flag || '🌐'}{' '}
              {languageOptions.find(opt => opt.code === locale)?.name ||
                'Español'}
            </span>
            <FaChevronRight style={{ fontSize: '14px', color: '#9CA3AF' }} />
          </button>
        </div>

        {/* Cerrar sesión */}
        <div className="profile-section">
          <button className="profile-logout-button" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Cerrar sesión</span>
          </button>
        </div>

        {/* Modal de idioma */}
        {showLanguageModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowLanguageModal(false)}
          >
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Seleccionar idioma</h3>
                <button
                  className="modal-close"
                  onClick={() => setShowLanguageModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                {languageOptions.map(option => (
                  <button
                    key={option.code}
                    className={`language-option ${
                      locale === option.code ? 'active' : ''
                    }`}
                    onClick={() => handleLanguageSelect(option.code)}
                  >
                    <span className="language-flag">{option.flag}</span>
                    <span className="language-name">{option.name}</span>
                    {locale === option.code && (
                      <span className="language-check">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
