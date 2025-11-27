import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../context/I18nContext';
import { LanguagePicker } from '../../components/LanguagePicker';
import { Button } from '../../components/Button';
import { RoleSettingsCard } from '../../components/RoleSettingsCard';
import './Page.css';

const MissionaryProfile: React.FC = () => {
  const { logout, userRole, login } = useAuth();
  const { t } = useI18n();

  const handleLogout = async () => {
    await logout();
  };

  const handleRoleChange = async (newRole: string) => {
    if (window.confirm(t('profile.changeRoleConfirm') || '¿Cambiar tu rol? Esto cambiará las funciones disponibles.')) {
      await login(newRole);
      if (newRole === 'member') {
        window.location.href = '/member/home';
      } else {
        window.location.href = '/home';
      }
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('tabs.profile')}</h1>
      </div>
      <div className="page-content">
        <div className="profile-section">
          <h2>{t('profile.currentRole') || 'Tu Rol Actual'}</h2>
          <p>{t('profile.roleDescription') || 'Estás usando la app como: Misionero'}</p>
          <div className="profile-role-actions">
            <Button 
              title={t('profile.switchToInvestigator') || 'Cambiar a modo Investigador'} 
              onClick={() => handleRoleChange('investigator')} 
              variant="outline" 
            />
            <Button 
              title={t('profile.switchToMember') || 'Cambiar a modo Miembro'} 
              onClick={() => handleRoleChange('member')} 
              variant="outline" 
            />
          </div>
        </div>
        <div className="profile-section">
          <LanguagePicker />
        </div>
        <div className="profile-section">
          <Button title={t('profile.logout')} onClick={handleLogout} variant="outline" />
        </div>
      </div>
    </div>
  );
};

export default MissionaryProfile;

