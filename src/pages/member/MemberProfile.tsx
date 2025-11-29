import React, {
  ChangeEvent,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import {
  FaBell,
  FaCamera,
  FaChevronRight,
  FaCog,
  FaGlobe,
  FaInfoCircle,
  FaMoon,
  FaQuestionCircle,
  FaRetweet,
  FaShieldAlt,
  FaSignOutAlt,
  FaSlidersH,
  FaTrashAlt,
  FaUser,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useI18n, Locale } from '../../context/I18nContext';
import { RoleSettingsCard } from '../../components/RoleSettingsCard';
import { RoleSwitcher } from '../../components/RoleSwitcher';
import { ROLE_DEFINITIONS, UserRoleKey } from '../../config/roles';
import { PageContainer, Card } from '../../ui/components';
import '../Page.css';
import './MemberProfile.css';

declare const window:
  | {
      confirm: (message: string) => boolean;
    }
  | undefined;

type ProfileFieldKey = 'name' | 'email' | 'phone' | 'address';

interface ProfileFormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  memberSince: string;
  avatarUrl: string;
}

const localeLabels: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  pt: 'Português',
};

const languageOptions: { code: Locale; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

const roleHighlights: Record<
  UserRoleKey,
  {
    eyebrowKey: string;
    titleKey: string;
    descriptionKey: string;
    checkpoints: Array<{ titleKey: string; descriptionKey: string }>;
  }
> = {
  investigator: {
    eyebrowKey: 'memberProfile.roleHighlights.investigator.eyebrow',
    titleKey: 'memberProfile.roleHighlights.investigator.title',
    descriptionKey: 'memberProfile.roleHighlights.investigator.description',
    checkpoints: [
      {
        titleKey: 'memberProfile.roleHighlights.investigator.items.firstLesson',
        descriptionKey:
          'memberProfile.roleHighlights.investigator.items.firstLessonDesc',
      },
      {
        titleKey: 'memberProfile.roleHighlights.investigator.items.commitments',
        descriptionKey:
          'memberProfile.roleHighlights.investigator.items.commitmentsDesc',
      },
    ],
  },
  missionary: {
    eyebrowKey: 'memberProfile.roleHighlights.missionary.eyebrow',
    titleKey: 'memberProfile.roleHighlights.missionary.title',
    descriptionKey: 'memberProfile.roleHighlights.missionary.description',
    checkpoints: [
      {
        titleKey: 'memberProfile.roleHighlights.missionary.items.agenda',
        descriptionKey:
          'memberProfile.roleHighlights.missionary.items.agendaDesc',
      },
      {
        titleKey: 'memberProfile.roleHighlights.missionary.items.people',
        descriptionKey:
          'memberProfile.roleHighlights.missionary.items.peopleDesc',
      },
    ],
  },
  member: {
    eyebrowKey: 'memberProfile.roleHighlights.member.eyebrow',
    titleKey: 'memberProfile.roleHighlights.member.title',
    descriptionKey: 'memberProfile.roleHighlights.member.description',
    checkpoints: [
      {
        titleKey: 'memberProfile.roleHighlights.member.items.study',
        descriptionKey:
          'memberProfile.roleHighlights.member.items.studyDesc',
      },
      {
        titleKey: 'memberProfile.roleHighlights.member.items.activities',
        descriptionKey:
          'memberProfile.roleHighlights.member.items.activitiesDesc',
      },
    ],
  },
};

const DEFAULT_AVATAR =
  'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg';

const MemberProfile: React.FC = () => {
  const { logout, userRole } = useAuth();
  const { t, locale, setLocale } = useI18n();
  const navigate = useNavigate();
  const normalizedRole = (userRole ?? 'member') as UserRoleKey;

  const [profileData, setProfileData] = useState<ProfileFormState>({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '221B Baker Street · London, UK',
    memberSince: '2024-01-01',
    avatarUrl: DEFAULT_AVATAR,
  });
  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showRoleSheet, setShowRoleSheet] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement | null>(null);

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

  const formattedMemberSince = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
      }).format(new Date(profileData.memberSince));
    } catch {
      return profileData.memberSince;
    }
  }, [profileData.memberSince, locale]);

  const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfileData((prev) => ({ ...prev, avatarUrl: url }));
  };

  const handleProfileInputChange =
    (field: ProfileFieldKey) => (event: ChangeEvent<HTMLInputElement>) => {
      setProfileData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleProfileSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingProfile(true);
    setShowSavedMessage(false);
    setTimeout(() => {
      setIsSavingProfile(false);
      setShowSavedMessage(true);
      setTimeout(() => setShowSavedMessage(false), 2000);
    }, 600);
  };

  const togglePreference =
    (key: 'notifications' | 'darkMode') =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setPreferences((prev) => ({ ...prev, [key]: event.target.checked }));
    };

  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteAccount = () => {
    if (window?.confirm(t('memberProfile.accountActions.deleteConfirm'))) {
      console.info('Account deletion flow not implemented yet');
    }
  };

  const handleAppSettingNavigation = (route: string) => {
    navigate(route);
  };

  const localeLabel =
    t(`memberProfile.languages.${locale}`) || localeLabels[locale];
  const activeRoleDefinition = ROLE_DEFINITIONS[normalizedRole];
  const currentHighlight = roleHighlights[normalizedRole];

  const currentLanguage = languageOptions.find(opt => opt.code === locale);

  return (
    <PageContainer>
      <div className="member-profile-page">
        <header className="member-profile-header">
          <h1>{t('memberProfile.preferences.title') || 'Preferencias'}</h1>
          <p>{t('memberProfile.preferences.subtitle') || 'Personaliza cómo usas la app.'}</p>
        </header>

        {/* Hero Card con Avatar */}
        <Card className="member-profile-card profile-hero-card">
          <div className="profile-avatar-wrapper">
            <img
              src={profileData.avatarUrl}
              alt={profileData.name}
              className="profile-avatar"
            />
            <button
              type="button"
              className="profile-avatar-upload"
              onClick={() => avatarInputRef.current?.click()}
              aria-label={t('memberProfile.personalInfo.changePhoto') || 'Cambiar foto'}
            >
              <FaCamera />
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="profile-avatar-input"
              onChange={handleAvatarUpload}
            />
          </div>
          <div className="profile-hero-text">
            <h2 className="profile-hero-name">{profileData.name}</h2>
            <span className="profile-role-pill">
              {t(ROLE_DEFINITIONS[normalizedRole].i18nKey)}
            </span>
            <p className="profile-hero-meta">
              {t('memberProfile.personalInfo.memberSince') || 'Member since'} {formattedMemberSince}
            </p>
          </div>
        </Card>

        {/* Preferencias */}
        <Card className="member-profile-card">
          <div className="profile-preference-row">
            <div className="profile-preference-info">
              <div className="profile-preference-icon profile-preference-icon-blue">
                <FaGlobe />
              </div>
              <div>
                <p className="profile-preference-title">
                  {t('memberProfile.preferences.language')}
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
          <div className="profile-preference-row">
            <div className="profile-preference-info">
              <div className="profile-preference-icon profile-preference-icon-violet">
                <FaBell />
              </div>
              <div>
                <p className="profile-preference-title">
                  {t('memberProfile.preferences.notifications')}
                </p>
                <p className="profile-preference-subtitle">
                  {t('memberProfile.preferences.notificationsHint')}
                </p>
              </div>
            </div>
            <label className="profile-switch">
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={togglePreference('notifications')}
              />
              <span className="profile-switch-track" />
            </label>
          </div>
          <div className="profile-preference-row">
            <div className="profile-preference-info">
              <div className="profile-preference-icon profile-preference-icon-green">
                <FaMoon />
              </div>
              <div>
                <p className="profile-preference-title">
                  {t('memberProfile.preferences.darkMode')}
                </p>
                <p className="profile-preference-subtitle">
                  {t('memberProfile.preferences.darkModeHint')}
                </p>
              </div>
            </div>
            <label className="profile-switch">
              <input
                type="checkbox"
                checked={preferences.darkMode}
                onChange={togglePreference('darkMode')}
              />
              <span className="profile-switch-track" />
            </label>
          </div>
        </Card>

        {/* Cambiar de rol */}
        <Card className="member-profile-card">
          <div className="profile-section-heading profile-section-heading--plain">
            <div>
              <h2 className="profile-section-title">
                {t('memberProfile.roleSwitcher.title')}
              </h2>
              <p className="profile-section-subtitle">
                {t('memberProfile.roleSwitcher.subtitle')}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="profile-role-button"
            onClick={openRoleSheet}
          >
            <div className="profile-role-button-content">
              <span className="profile-role-button-icon">
                {ROLE_DEFINITIONS[normalizedRole].icon}
              </span>
              <div>
                <p className="profile-role-button-title">
                  {t(ROLE_DEFINITIONS[normalizedRole].i18nKey)}
                </p>
                <p className="profile-role-button-subtitle">
                  {t('memberProfile.roleSwitcher.subtitle')}
                </p>
              </div>
            </div>
            <FaChevronRight />
          </button>
        </Card>

        {/* Role Switcher - Solo para miembros */}
        {normalizedRole === 'member' && (
          <Card className="member-profile-card">
            <RoleSwitcher />
          </Card>
        )}

        {/* Info personal */}
        <Card className="member-profile-card">
          <div className="profile-section-heading">
            <div className="profile-section-icon profile-section-icon-primary">
              <FaUser />
            </div>
            <div>
              <h2 className="profile-section-title">
                {t('memberProfile.personalInfo.title')}
              </h2>
              <p className="profile-section-subtitle">
                {t('memberProfile.personalInfo.subtitle')}
              </p>
            </div>
          </div>
          <form className="profile-form-card" onSubmit={handleProfileSave}>
            <div className="profile-field">
              <label className="profile-label" htmlFor="profile-full-name">
                {t('memberProfile.personalInfo.fullName')}
              </label>
              <input
                id="profile-full-name"
                type="text"
                className="profile-input"
                value={profileData.name}
                onChange={handleProfileInputChange('name')}
                required
              />
            </div>
            <div className="profile-field">
              <label className="profile-label" htmlFor="profile-email">
                {t('memberProfile.personalInfo.email')}
              </label>
              <input
                id="profile-email"
                type="email"
                className="profile-input"
                value={profileData.email}
                onChange={handleProfileInputChange('email')}
                required
              />
            </div>
            <div className="profile-field">
              <label className="profile-label" htmlFor="profile-phone">
                {t('memberProfile.personalInfo.phone')}
              </label>
              <input
                id="profile-phone"
                type="tel"
                className="profile-input"
                value={profileData.phone}
                onChange={handleProfileInputChange('phone')}
              />
            </div>
            <div className="profile-field">
              <label className="profile-label" htmlFor="profile-address">
                {t('memberProfile.personalInfo.address')}
              </label>
              <input
                id="profile-address"
                type="text"
                className="profile-input"
                value={profileData.address}
                onChange={handleProfileInputChange('address')}
              />
            </div>
            <div className="profile-actions">
              <button
                type="submit"
                className="profile-save-button"
                disabled={isSavingProfile}
              >
                {isSavingProfile
                  ? t('memberProfile.personalInfo.saving')
                  : t('memberProfile.personalInfo.save')}
              </button>
              {showSavedMessage && (
                <span className="profile-save-message">
                  {t('memberProfile.personalInfo.saved')}
                </span>
              )}
            </div>
          </form>
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
              <h3 className="sheet-title">{t('memberProfile.roleSwitcher.title')}</h3>
              <p className="sheet-subtitle">{t('memberProfile.roleSwitcher.subtitle')}</p>
              <div className="sheet-content">
                <RoleSettingsCard currentRole={normalizedRole} />
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

        {/* Cerrar sesión */}
        <Card className="member-profile-card">
          <button
            type="button"
            className="profile-logout-button"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>{t('profile.logout') || 'Cerrar sesión'}</span>
          </button>
        </Card>
      </div>
    </PageContainer>
  );
};

export default MemberProfile;
