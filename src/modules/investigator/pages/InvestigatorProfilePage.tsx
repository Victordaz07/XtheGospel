import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaChevronRight, 
  FaUser, 
  FaBell, 
  FaGlobe, 
  FaPalette,
  FaCircleQuestion,
  FaEnvelope,
  FaPhone,
  FaComments,
  FaSpinner,
  FaRightFromBracket,
  FaIdCard,
  FaQrcode,
  FaUserGroup,
  FaCheck,
  FaXmark,
  FaSun,
  FaMoon,
  FaCircleHalfStroke
} from 'react-icons/fa6';
import { OrdinanceDatesSection } from '../../../components/OrdinanceDatesSection';
import DataPrivacySection from '../../../components/DataPrivacySection';
import { XtgProfileCard } from '../../../components/profile/XtgProfileCard';
import { ProfileQRCode } from '../../../components/profile/ProfileQRCode';
import { LeadershipInvitations } from '../../../components/leadership';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { useAuth } from '../../../context/AuthContext';
import { useI18n, type Locale } from '../../../context/I18nContext';
import { useTheme } from '../../../context/ThemeContext';
import { LANGUAGE_OPTIONS } from '../../../i18n/locales';
import '../../../components/DataPrivacySection.css';
import './InvestigatorProfilePage.css';

type IdTab = 'card' | 'qr';

const LANGUAGES: { code: Locale; label: string; flag: string }[] = LANGUAGE_OPTIONS;

type Theme = 'light' | 'dark' | 'system';
type SettingAction = 'notifications' | 'language' | 'appearance';

const THEME_OPTIONS: { value: Theme; icon: React.ReactNode; labelKey: string }[] = [
  { value: 'light', icon: <FaSun />, labelKey: 'app.settings.themeLight' },
  { value: 'dark', icon: <FaMoon />, labelKey: 'app.settings.themeDark' },
  { value: 'system', icon: <FaCircleHalfStroke />, labelKey: 'app.settings.themeSystem' },
];

export default function InvestigatorProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const { profile, loading: profileLoading } = useUserProfile('investigator');
  const { logout } = useAuth();
  const { locale, setLocale, t } = useI18n();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [idTab, setIdTab] = useState<IdTab>('card');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/register', { replace: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleLanguageSelect = async (langCode: Locale) => {
    await setLocale(langCode);
    setShowLanguageModal(false);
  };

  const handleThemeSelect = (newTheme: Theme) => {
    setTheme(newTheme);
    setShowThemeModal(false);
  };

  const currentLanguage = LANGUAGES.find(l => l.code === locale) || LANGUAGES[0];
  const currentThemeOption = THEME_OPTIONS.find(o => o.value === theme) || THEME_OPTIONS[0];

  const handleSettingClick = (setting: SettingAction): void => {
    if (setting === 'language') {
      setShowLanguageModal(true);
    } else if (setting === 'appearance') {
      setShowThemeModal(true);
    } else {
      alert(`${setting} settings coming soon!`);
    }
  };

  return (
    <div className="inv-profile">
      {/* xTheGospel ID Section */}
      {profileLoading ? (
        <div className="inv-profile__loading">
          <FaSpinner className="inv-profile__spinner" />
          <span>{t('app.common.loading')}</span>
        </div>
      ) : profile ? (
        <div className="inv-profile__id-section">
          {/* Tab Navigation */}
          <div className="inv-profile__id-tabs">
            <button 
              className={`inv-profile__id-tab ${idTab === 'card' ? 'inv-profile__id-tab--active' : ''}`}
              onClick={() => setIdTab('card')}
            >
              <FaIdCard />
              <span>{t('app.profile.myId')}</span>
            </button>
            <button 
              className={`inv-profile__id-tab ${idTab === 'qr' ? 'inv-profile__id-tab--active' : ''}`}
              onClick={() => setIdTab('qr')}
            >
              <FaQrcode />
              <span>{t('app.profile.myQr')}</span>
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="inv-profile__id-content">
            {idTab === 'card' ? (
              <XtgProfileCard profile={profile} compact />
            ) : (
              <ProfileQRCode profile={profile} compact />
            )}
          </div>
        </div>
      ) : (
        /* Fallback Role Card (user not logged in) */
        <div className="inv-profile__role">
          <div className="inv-profile__role-avatar">
            <FaUser />
          </div>
          <h1 className="inv-profile__role-title">{t('app.profile.welcome')}</h1>
          <p className="inv-profile__role-label">{t('app.profile.friend')}</p>
        </div>
      )}

      {/* Leadership Invitations */}
      <LeadershipInvitations 
        onInvitationAccepted={() => {
          // Could refresh profile or show notification
          console.log('Llamamiento aceptado!');
        }}
      />

      {/* My Missionaries */}
      <div className="inv-profile__section">
        <h2 className="inv-profile__section-title">{t('app.profile.myMissionaries')}</h2>
        <div className="inv-profile__contact">
          <div className="inv-profile__contact-header">
            <div className="inv-profile__contact-icon">
              <FaUserGroup />
            </div>
            <div className="inv-profile__contact-info">
              <h3 className="inv-profile__contact-name">Elder Smith & Elder Johnson</h3>
              <p className="inv-profile__contact-role">{t('app.profile.missionariesAssigned')}</p>
            </div>
          </div>
          <div className="inv-profile__contact-actions">
            <button 
              className="inv-profile__contact-btn inv-profile__contact-btn--primary"
              onClick={() => alert('Coming soon!')}
            >
              <FaComments /> {t('app.profile.message')}
            </button>
            <button 
              className="inv-profile__contact-btn inv-profile__contact-btn--secondary"
              onClick={() => alert('Coming soon!')}
            >
              <FaPhone /> {t('app.profile.call')}
            </button>
          </div>
        </div>
      </div>

      {/* Ordinance Dates */}
      <div className="inv-profile__section">
        <h2 className="inv-profile__section-title">{t('app.profile.myJourney')}</h2>
        <OrdinanceDatesSection />
      </div>

      {/* Preferences */}
      <div className="inv-profile__section">
        <h2 className="inv-profile__section-title">{t('app.profile.preferences')}</h2>
        <div className="inv-profile__settings">
          <button 
            className="inv-profile__setting"
            onClick={() => handleSettingClick('notifications')}
          >
            <div className="inv-profile__setting-icon">
              <FaBell />
            </div>
            <div className="inv-profile__setting-content">
              <h3 className="inv-profile__setting-title">{t('app.profile.notifications')}</h3>
              <p className="inv-profile__setting-desc">{t('app.profile.notificationsDesc')}</p>
            </div>
            <FaChevronRight className="inv-profile__setting-arrow" />
          </button>
          
          <button 
            className="inv-profile__setting"
            onClick={() => handleSettingClick('language')}
          >
            <div className="inv-profile__setting-icon">
              <FaGlobe />
            </div>
            <div className="inv-profile__setting-content">
              <h3 className="inv-profile__setting-title">{t('app.profile.language')}</h3>
              <p className="inv-profile__setting-desc">{currentLanguage.flag} {currentLanguage.label}</p>
            </div>
            <FaChevronRight className="inv-profile__setting-arrow" />
          </button>
          
          <button 
            className="inv-profile__setting"
            onClick={() => handleSettingClick('appearance')}
          >
            <div className="inv-profile__setting-icon">
              <FaPalette />
            </div>
            <div className="inv-profile__setting-content">
              <h3 className="inv-profile__setting-title">{t('app.profile.appearance')}</h3>
              <p className="inv-profile__setting-desc">
                {resolvedTheme === 'dark' ? <FaMoon style={{ marginRight: 6 }} /> : <FaSun style={{ marginRight: 6 }} />}
                {t(currentThemeOption.labelKey)}
              </p>
            </div>
            <FaChevronRight className="inv-profile__setting-arrow" />
          </button>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="inv-profile__section">
        <h2 className="inv-profile__section-title">{t('app.profile.dataPrivacy')}</h2>
        <DataPrivacySection classPrefix="inv-profile" />
      </div>

      {/* Support */}
      <div className="inv-profile__section">
        <h2 className="inv-profile__section-title">{t('app.profile.support')}</h2>
        <div className="inv-profile__support">
          <button 
            className="inv-profile__support-btn"
            onClick={() => alert('Coming soon!')}
          >
            <FaCircleQuestion className="inv-profile__support-icon" />
            <span className="inv-profile__support-text">{t('app.profile.help')}</span>
            <FaChevronRight className="inv-profile__setting-arrow" />
          </button>
          
          <button 
            className="inv-profile__support-btn"
            onClick={() => alert('Coming soon!')}
          >
            <FaEnvelope className="inv-profile__support-icon" />
            <span className="inv-profile__support-text">{t('app.profile.contact')}</span>
            <FaChevronRight className="inv-profile__setting-arrow" />
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="inv-profile__section">
        <button 
          className="inv-profile__logout-btn"
          onClick={handleLogout}
        >
          <FaRightFromBracket />
          {t('app.profile.logout')}
        </button>
      </div>

      {/* Version */}
      <div className="inv-profile__version">
        <p className="inv-profile__version-label">xTheGospel v1.0.0</p>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="inv-profile__modal-overlay" onClick={() => setShowLanguageModal(false)}>
          <div className="inv-profile__modal" onClick={e => e.stopPropagation()}>
            <div className="inv-profile__modal-header">
              <h3 className="inv-profile__modal-title">{t('app.profile.language')}</h3>
              <button 
                className="inv-profile__modal-close"
                onClick={() => setShowLanguageModal(false)}
              >
                <FaXmark />
              </button>
            </div>
            <div className="inv-profile__modal-content">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  className={`inv-profile__lang-option ${locale === lang.code ? 'inv-profile__lang-option--active' : ''}`}
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  <span className="inv-profile__lang-flag">{lang.flag}</span>
                  <span className="inv-profile__lang-label">{lang.label}</span>
                  {locale === lang.code && (
                    <FaCheck className="inv-profile__lang-check" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Theme Modal */}
      {showThemeModal && (
        <div className="inv-profile__modal-overlay" onClick={() => setShowThemeModal(false)}>
          <div className="inv-profile__modal" onClick={e => e.stopPropagation()}>
            <div className="inv-profile__modal-header">
              <h3 className="inv-profile__modal-title">{t('app.settings.theme')}</h3>
              <button 
                className="inv-profile__modal-close"
                onClick={() => setShowThemeModal(false)}
              >
                <FaXmark />
              </button>
            </div>
            <div className="inv-profile__modal-content">
              {THEME_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`inv-profile__lang-option ${theme === opt.value ? 'inv-profile__lang-option--active' : ''}`}
                  onClick={() => handleThemeSelect(opt.value)}
                >
                  <span className="inv-profile__lang-flag">{opt.icon}</span>
                  <span className="inv-profile__lang-label">{t(opt.labelKey)}</span>
                  {theme === opt.value && (
                    <FaCheck className="inv-profile__lang-check" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
