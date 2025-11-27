import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { StorageService } from '../utils/storage';
import { UserRoleKey, ROLE_DEFINITIONS, getRoleDefaultRoute } from '../config/roles';
import './RoleSettingsCard.css';

export type { UserRoleKey };
export type MemberMode = 'regular' | 'leader';

interface RoleSettingsCardProps {
  currentRole: UserRoleKey;
  onRoleChanged?: (newRole: UserRoleKey) => void;
}

interface BaptismModalData {
  date: string;
  wardBranch: string;
}

export const RoleSettingsCard: React.FC<RoleSettingsCardProps> = ({
  currentRole,
  onRoleChanged,
}) => {
  const { login } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [showBaptismModal, setShowBaptismModal] = useState(false);
  const [baptismData, setBaptismData] = useState<BaptismModalData>({ date: '', wardBranch: '' });
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoTargetRole, setDemoTargetRole] = useState<UserRoleKey | null>(null);
  const [showLeaderModal, setShowLeaderModal] = useState(false);
  const [memberMode, setMemberMode] = useState<MemberMode>(
    (StorageService.getItem('memberMode') as MemberMode) || 'regular'
  );

  // Use centralized role definitions
  const roles: Array<{ id: UserRoleKey; icon: string; labelKey: string }> = [
    {
      id: 'investigator',
      icon: ROLE_DEFINITIONS.investigator.icon,
      labelKey: ROLE_DEFINITIONS.investigator.i18nKey,
    },
    {
      id: 'missionary',
      icon: ROLE_DEFINITIONS.missionary.icon,
      labelKey: ROLE_DEFINITIONS.missionary.i18nKey,
    },
    {
      id: 'member',
      icon: ROLE_DEFINITIONS.member.icon,
      labelKey: ROLE_DEFINITIONS.member.i18nKey,
    },
  ];

  const handleInvestigatorToMember = () => {
    setShowBaptismModal(true);
  };

  const handleBaptismConfirm = async () => {
    if (!baptismData.date) {
      alert(t('roleSettings.baptism.dateRequired'));
      return;
    }

    try {
      // Save baptism date
      StorageService.setItem('baptismDate', baptismData.date);
      if (baptismData.wardBranch) {
        StorageService.setItem('baptismWardBranch', baptismData.wardBranch);
      }

      // Update role
      await login('member');
      if (onRoleChanged) {
        onRoleChanged('member');
      }

      // Navigate to member home using centralized route
      navigate(getRoleDefaultRoute('member'), { replace: true });
      window.location.reload(); // Force reload to update all contexts
    } catch (error) {
      console.error('Error changing role:', error);
      alert(t('roleSettings.errorChangingRole'));
    }
  };

  const handleMissionaryDemo = (targetRole: UserRoleKey) => {
    setDemoTargetRole(targetRole);
    setShowDemoModal(true);
  };

  const handleDemoConfirm = async () => {
    if (!demoTargetRole) return;

    try {
      await login(demoTargetRole);
      if (onRoleChanged) {
        onRoleChanged(demoTargetRole);
      }

      // Navigate to appropriate home using centralized routes
      navigate(getRoleDefaultRoute(demoTargetRole), { replace: true });
      window.location.reload();
    } catch (error) {
      console.error('Error changing role:', error);
      alert(t('roleSettings.errorChangingRole'));
    }
  };

  const handleMemberModeToggle = (mode: MemberMode) => {
    if (mode === 'leader') {
      setShowLeaderModal(true);
    } else {
      // Switch back to regular
      StorageService.setItem('memberMode', 'regular');
      setMemberMode('regular');
    }
  };

  const handleLeaderConfirm = () => {
    StorageService.setItem('memberMode', 'leader');
    setMemberMode('leader');
    setShowLeaderModal(false);
    // Stay in member area, just update UI based on memberMode
  };

  // INVESTIGATOR ROLE: Show baptism flow
  if (currentRole === 'investigator') {
    return (
      <>
        <div className="role-settings-card">
          <div className="role-settings-header">
            <h3 className="role-settings-title">{t('roleSettings.investigator.title')}</h3>
            <p className="role-settings-description">
              {t('roleSettings.investigator.description')}
            </p>
          </div>
          <div className="role-settings-section">
            <h4 className="role-settings-section-title">
              {t('roleSettings.investigator.baptismSectionTitle')}
            </h4>
            <button
              className="role-settings-primary-button"
              onClick={handleInvestigatorToMember}
            >
              {t('roleSettings.investigator.baptismButton')}
            </button>
          </div>
        </div>

        {/* Baptism Modal */}
        {showBaptismModal && (
          <div className="modal-overlay" onClick={() => setShowBaptismModal(false)}>
            <div className="modal-content role-settings-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">{t('roleSettings.baptism.modalTitle')}</h3>
              <div className="role-settings-form">
                <label className="role-settings-label">
                  {t('roleSettings.baptism.dateLabel')} *
                  <input
                    type="date"
                    value={baptismData.date}
                    onChange={(e) => setBaptismData({ ...baptismData, date: e.target.value })}
                    className="role-settings-input"
                    required
                  />
                </label>
                <label className="role-settings-label">
                  {t('roleSettings.baptism.wardBranchLabel')}
                  <input
                    type="text"
                    value={baptismData.wardBranch}
                    onChange={(e) =>
                      setBaptismData({ ...baptismData, wardBranch: e.target.value })
                    }
                    className="role-settings-input"
                    placeholder={t('roleSettings.baptism.wardBranchPlaceholder')}
                  />
                </label>
                <p className="role-settings-confirmation-text">
                  {t('roleSettings.baptism.confirmationText')}
                </p>
              </div>
              <div className="role-settings-modal-actions">
                <button
                  className="role-settings-button-secondary"
                  onClick={() => setShowBaptismModal(false)}
                >
                  {t('common.cancel')}
                </button>
                <button
                  className="role-settings-button-primary"
                  onClick={handleBaptismConfirm}
                >
                  {t('roleSettings.baptism.confirmButton')}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // MISSIONARY ROLE: Show demo mode options
  if (currentRole === 'missionary') {
    return (
      <>
        <div className="role-settings-card">
          <div className="role-settings-header">
            <h3 className="role-settings-title">{t('roleSettings.missionary.title')}</h3>
            <p className="role-settings-description">
              {t('roleSettings.missionary.description')}
            </p>
          </div>
          <div className="role-settings-buttons">
            {roles.map((role) => (
              <button
                key={role.id}
                className={`role-settings-role-button ${
                  currentRole === role.id ? 'active' : ''
                } ${role.id === 'missionary' ? 'disabled' : ''}`}
                onClick={() => {
                  if (role.id !== 'missionary') {
                    handleMissionaryDemo(role.id);
                  }
                }}
                disabled={role.id === 'missionary'}
                title={
                  role.id === 'missionary'
                    ? t('roleSettings.missionary.currentRoleTooltip')
                    : t('roleSettings.missionary.demoTooltip')
                }
              >
                <span className="role-settings-icon">{role.icon}</span>
                <span className="role-settings-text">{t(role.labelKey)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Demo Confirmation Modal */}
        {showDemoModal && demoTargetRole && (
          <div className="modal-overlay" onClick={() => setShowDemoModal(false)}>
            <div className="modal-content role-settings-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">{t('roleSettings.missionary.demoModalTitle')}</h3>
              <p className="role-settings-confirmation-text">
                {demoTargetRole === 'investigator'
                  ? t('roleSettings.missionary.demoInvestigatorText')
                  : t('roleSettings.missionary.demoMemberText')}
              </p>
              <p className="role-settings-note">
                {t('roleSettings.missionary.demoNote')}
              </p>
              <div className="role-settings-modal-actions">
                <button
                  className="role-settings-button-secondary"
                  onClick={() => setShowDemoModal(false)}
                >
                  {t('common.cancel')}
                </button>
                <button
                  className="role-settings-button-primary"
                  onClick={handleDemoConfirm}
                >
                  {t('roleSettings.missionary.demoConfirmButton')}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // MEMBER ROLE: Show mode toggle
  if (currentRole === 'member') {
    return (
      <>
        <div className="role-settings-card">
          <div className="role-settings-header">
            <h3 className="role-settings-title">{t('roleSettings.member.title')}</h3>
            <p className="role-settings-description">
              {t('roleSettings.member.description')}
            </p>
          </div>
          <div className="role-settings-mode-toggle">
            <button
              className={`role-settings-mode-button ${
                memberMode === 'regular' ? 'active' : ''
              }`}
              onClick={() => handleMemberModeToggle('regular')}
            >
              <span className="role-settings-icon">👤</span>
              <div className="role-settings-mode-content">
                <span className="role-settings-mode-title">
                  {t('roleSettings.member.modeRegularTitle')}
                </span>
                <span className="role-settings-mode-subtitle">
                  {t('roleSettings.member.modeRegularSubtitle')}
                </span>
              </div>
            </button>
            <button
              className={`role-settings-mode-button ${
                memberMode === 'leader' ? 'active' : ''
              }`}
              onClick={() => handleMemberModeToggle('leader')}
            >
              <span className="role-settings-icon">👔</span>
              <div className="role-settings-mode-content">
                <span className="role-settings-mode-title">
                  {t('roleSettings.member.modeLeaderTitle')}
                </span>
                <span className="role-settings-mode-subtitle">
                  {t('roleSettings.member.modeLeaderSubtitle')}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Leader Mode Confirmation Modal */}
        {showLeaderModal && (
          <div className="modal-overlay" onClick={() => setShowLeaderModal(false)}>
            <div className="modal-content role-settings-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">{t('roleSettings.member.leaderModalTitle')}</h3>
              <p className="role-settings-confirmation-text">
                {t('roleSettings.member.leaderModalText')}
              </p>
              <div className="role-settings-modal-actions">
                <button
                  className="role-settings-button-secondary"
                  onClick={() => setShowLeaderModal(false)}
                >
                  {t('common.cancel')}
                </button>
                <button
                  className="role-settings-button-primary"
                  onClick={handleLeaderConfirm}
                >
                  {t('roleSettings.member.leaderConfirmButton')}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

