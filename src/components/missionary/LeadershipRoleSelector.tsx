import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShield, FaChevronRight, FaCheck } from 'react-icons/fa6';
import { 
  missionaryLeadershipMaster, 
  LeadershipRole, 
  getLeadershipRoleConfig 
} from '../../data/missionary/leadershipMode';
import { LeadershipRoleService } from '../../services/leadershipRoleService';
import './LeadershipRoleSelector.css';

interface LeadershipRoleSelectorProps {
  onRoleChange?: (role: LeadershipRole) => void;
}

export const LeadershipRoleSelector: React.FC<LeadershipRoleSelectorProps> = ({ onRoleChange }) => {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState<LeadershipRole>('none');
  const [showSelector, setShowSelector] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingRole, setPendingRole] = useState<LeadershipRole | null>(null);

  useEffect(() => {
    const role = LeadershipRoleService.getCurrentRole();
    setCurrentRole(role);
  }, []);

  const handleRoleSelect = (role: LeadershipRole) => {
    if (role === currentRole) {
      setShowSelector(false);
      return;
    }

    const canChangeInfo = LeadershipRoleService.canChangeRole(
      missionaryLeadershipMaster.activation.testingOverride
    );

    if (!canChangeInfo.canChange && !missionaryLeadershipMaster.activation.testingOverride) {
      setPendingRole(role);
      setShowConfirmDialog(true);
      return;
    }

    confirmRoleChange(role);
  };

  const confirmRoleChange = (role: LeadershipRole) => {
    LeadershipRoleService.setCurrentRole(role);
    setCurrentRole(role);
    setShowSelector(false);
    setShowConfirmDialog(false);
    setPendingRole(null);
    if (onRoleChange) {
      onRoleChange(role);
    }
    
    // Navigate to appropriate layout based on role
    if (role !== 'none') {
      // Redirect to leadership dashboard
      navigate(`/missionary/leadership/${role}/dashboard`);
    } else {
      // Redirect to regular missionary home
      navigate('/missionary/home');
    }
  };

  const handleConfirmChange = () => {
    if (pendingRole) {
      confirmRoleChange(pendingRole);
    }
  };

  const currentRoleConfig = getLeadershipRoleConfig(currentRole);
  const allRoles = [
    { id: 'none' as LeadershipRole, title: 'Misionero regular', icon: '👤', color: '#6B7280' },
    ...Object.values(missionaryLeadershipMaster.roles).map(role => ({
      id: role.id as LeadershipRole,
      title: role.title,
      icon: role.icon,
      color: role.color
    }))
  ];

  return (
    <>
      <div className="leadership-role-selector-card">
        <div className="leadership-role-header">
          <div className="leadership-role-icon-wrapper" style={{ 
            backgroundColor: currentRoleConfig ? `${currentRoleConfig.color}15` : '#F3F4F615',
            color: currentRoleConfig?.color || '#6B7280'
          }}>
            {currentRoleConfig ? (
              <span className="leadership-role-icon-emoji">🛡️</span>
            ) : (
              <FaShield />
            )}
          </div>
          <div className="leadership-role-info">
            <h3 className="leadership-role-title">
              {missionaryLeadershipMaster.profileIntegration.label}
            </h3>
            <p className="leadership-role-subtitle">
              {currentRoleConfig 
                ? currentRoleConfig.title 
                : 'Misionero regular (sin rol de liderazgo)'}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="leadership-role-button"
          onClick={() => setShowSelector(true)}
        >
          <span className="leadership-role-button-text">
            {currentRoleConfig ? 'Cambiar llamamiento' : 'Activar modo liderazgo'}
          </span>
          <FaChevronRight />
        </button>
      </div>

      {/* Selector Modal */}
      {showSelector && (
        <div className="leadership-selector-overlay" onClick={() => setShowSelector(false)}>
          <div className="leadership-selector-modal" onClick={(e) => e.stopPropagation()}>
            <div className="leadership-selector-header">
              <h3>Mi Llamamiento Actual</h3>
              <button
                className="leadership-selector-close"
                onClick={() => setShowSelector(false)}
              >
                ×
              </button>
            </div>
            <div className="leadership-selector-content">
              <p className="leadership-selector-description">
                Selecciona tu llamamiento actual. Este modo te dará acceso a herramientas y recursos específicos para tu responsabilidad.
              </p>
              <div className="leadership-role-list">
                {allRoles.map((role) => {
                  const roleConfig = getLeadershipRoleConfig(role.id);
                  const isSelected = currentRole === role.id;
                  
                  return (
                    <button
                      key={role.id}
                      type="button"
                      className={`leadership-role-option ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleRoleSelect(role.id)}
                      style={{
                        borderLeftColor: roleConfig?.color || role.color
                      }}
                    >
                      <div className="leadership-role-option-content">
                        <div className="leadership-role-option-icon" style={{
                          backgroundColor: `${roleConfig?.color || role.color}15`,
                          color: roleConfig?.color || role.color
                        }}>
                          {roleConfig ? '🛡️' : '👤'}
                        </div>
                        <div className="leadership-role-option-text">
                          <h4>{role.title}</h4>
                          {roleConfig && (
                            <p>{roleConfig.content.substring(0, 80)}...</p>
                          )}
                        </div>
                      </div>
                      {isSelected && (
                        <FaCheck className="leadership-role-check" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {showConfirmDialog && (
        <div className="leadership-confirm-overlay" onClick={() => setShowConfirmDialog(false)}>
          <div className="leadership-confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="leadership-confirm-icon">⚠️</div>
            <h3>Confirmar cambio de llamamiento</h3>
            <p>{missionaryLeadershipMaster.activation.alertMessage}</p>
            <div className="leadership-confirm-actions">
              <button
                className="leadership-confirm-button secondary"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancelar
              </button>
              <button
                className="leadership-confirm-button primary"
                onClick={handleConfirmChange}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

