import React, { useState } from 'react';
import { FaChevronRight, FaGlobe, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useI18n, Locale } from '../../context/I18nContext';
import { RoleSettingsCard } from '../../components/RoleSettingsCard';
import { PageContainer, Card } from '../../ui/components';
import '../Page.css';
import './MissionaryProfile.css';

const languageOptions: { code: Locale; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

const localeLabels: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  pt: 'Português',
};

const MissionaryProfile: React.FC = () => {
  const { logout } = useAuth();
  const { t, locale, setLocale } = useI18n();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showRoleSheet, setShowRoleSheet] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const openLanguageModal = () => {
    setShowLanguageModal(true);
    setShowRoleSheet(false);
  };

  const openRoleSheet = () => {
    setShowRoleSheet(true);
    setShowLanguageModal(false);
  };

  const closeAllOverlays = () => {
    setShowLanguageModal(false);
    setShowRoleSheet(false);
  };

  const handleLanguageSelect = async (code: Locale) => {
    await setLocale(code);
    setShowLanguageModal(false);
  };

  const localeLabel = t(`memberProfile.languages.${locale}`) || localeLabels[locale];
  const currentLanguage = languageOptions.find(opt => opt.code === locale);

  return (
    <PageContainer>
      <div className="missionary-profile-page">
        <header className="missionary-profile-header">
          <h1>{t('tabs.profile') || 'Perfil'}</h1>
          <p>{t('profile.settings') || 'Configuración'}</p>
        </header>

        {/* Configuración de Rol */}
        <Card className="missionary-profile-card">
          <div className="profile-section-heading profile-section-heading--plain">
            <div>
              <h2 className="profile-section-title">
                {t('profile.settings') || 'Configuración de Rol'}
              </h2>
              <p className="profile-section-subtitle">
                {t('profile.roleDescription') || 'Estás usando la app como: Misionero'}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="profile-role-button"
            onClick={openRoleSheet}
          >
            <div className="profile-role-button-content">
              <span className="profile-role-button-icon">📖</span>
              <div>
                <p className="profile-role-button-title">
                  {t('auth.missionary') || 'Misionero'}
                </p>
                <p className="profile-role-button-subtitle">
                  {t('profile.roleDescription') || 'Predicando el Evangelio'}
                </p>
              </div>
            </div>
            <FaChevronRight />
          </button>
        </Card>

        {/* Preferencias - Idioma */}
        <Card className="missionary-profile-card">
          <div className="profile-preference-row">
            <div className="profile-preference-info">
              <div className="profile-preference-icon profile-preference-icon-blue">
                <FaGlobe />
              </div>
              <div>
                <p className="profile-preference-title">
                  {t('memberProfile.preferences.language') || 'Idioma'}
                </p>
                <p className="profile-preference-subtitle">{localeLabel}</p>
              </div>
            </div>
            <button
              type="button"
              className="profile-language-button"
              onClick={openLanguageModal}
            >
              {currentLanguage?.flag} {currentLanguage?.name}
              <FaChevronRight />
            </button>
          </div>
        </Card>

        {/* Cerrar sesión */}
        <Card className="missionary-profile-card">
          <button
            type="button"
            className="profile-logout-button"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>{t('profile.logout') || 'Cerrar sesión'}</span>
          </button>
        </Card>

        {/* Modal de idioma */}
        {showLanguageModal && (
          <div className="modal-backdrop" onClick={closeAllOverlays}>
            <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">{t('memberProfile.preferences.language') || 'Idioma'}</h3>
              <div className="modal-language-list">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    className={`modal-language-option ${locale === option.code ? 'selected' : ''}`}
                    onClick={() => handleLanguageSelect(option.code)}
                  >
                    <span>{option.flag} {option.name}</span>
                    {locale === option.code && <span className="checkmark">✓</span>}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="modal-cancel-button"
                onClick={closeAllOverlays}
              >
                {t('common.cancel') || 'Cancelar'}
              </button>
            </div>
          </div>
        )}

        {/* Hoja inferior de rol */}
        {showRoleSheet && (
          <div className="sheet-backdrop" onClick={closeAllOverlays}>
            <div className="sheet-panel" onClick={(e) => e.stopPropagation()}>
              <h3 className="sheet-title">{t('profile.settings') || 'Configuración de Rol'}</h3>
              <p className="sheet-subtitle">{t('profile.roleDescription') || 'Estás usando la app como: Misionero'}</p>
              <div className="sheet-content">
                <RoleSettingsCard currentRole="missionary" />
              </div>
              <button
                type="button"
                className="sheet-close-button"
                onClick={closeAllOverlays}
              >
                {t('common.close') || 'Cerrar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default MissionaryProfile;

