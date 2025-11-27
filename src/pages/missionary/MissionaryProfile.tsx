import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../context/I18nContext';
import { LanguagePicker } from '../../components/LanguagePicker';
import { Button } from '../../components/Button';
import { RoleSettingsCard } from '../../components/RoleSettingsCard';
import '../Page.css';

const MissionaryProfile: React.FC = () => {
  const { logout } = useAuth();
  const { t } = useI18n();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('tabs.profile')}</h1>
      </div>
      <div className="page-content">
        <div className="profile-section">
          <h2>{t('profile.settings') || 'Configuración'}</h2>
          <RoleSettingsCard currentRole="missionary" />
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

