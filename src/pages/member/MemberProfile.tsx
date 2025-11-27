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
import { LanguagePicker } from '../../components/LanguagePicker';
import { RoleSettingsCard } from '../../components/RoleSettingsCard';
import { ROLE_DEFINITIONS, UserRoleKey } from '../../config/roles';
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
  const { t, locale } = useI18n();
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

  const avatarInputRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <div className="page profile-page">
      <button
        className="profile-back-button"
        onClick={() => navigate(-1)}
        aria-label={t('common.back') || 'Volver'}
      >
        <FaArrowLeft />
        <span>{t('common.back') || 'Volver'}</span>
      </button>

      <div className="page-content profile-page-content">
        <header className="profile-hero-card">
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
            >
              <FaCamera />
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="profile-avatar-input"
            />
          </div>
          <div className="profile-hero-text">
            <h1 className="profile-hero-name">{profileData.name}</h1>
            <span className="profile-role-pill">
              {t(activeRoleDefinition.i18nKey)}
            </span>
            <p className="profile-hero-meta">
              {t('memberProfile.hero.memberSince', {
                date: formattedMemberSince,
              })}
            </p>
          </div>
        </header>

        <section className="profile-section">
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
          <form className="profile-card profile-form-card profile-form-card-stack" onSubmit={handleProfileSave}>
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
        </section>

        <section className="profile-section">
          <div className="profile-section-heading">
            <div className="profile-section-icon profile-section-icon-secondary">
              <FaSlidersH />
            </div>
            <div>
              <h2 className="profile-section-title">
                {t('memberProfile.preferences.title')}
              </h2>
              <p className="profile-section-subtitle">
                {t('memberProfile.preferences.subtitle')}
              </p>
            </div>
          </div>
          <div className="profile-card profile-preferences-card">
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
              <div className="profile-language-picker-wrapper">
                <LanguagePicker />
              </div>
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
          </div>
        </section>

        <section className="profile-section">
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
          <div className="profile-card profile-role-switcher-card">
            <RoleSettingsCard currentRole={normalizedRole} />
          </div>
        </section>

        <section className="profile-section">
          <div className="profile-section-heading">
            <div className="profile-section-icon profile-section-icon-gold">
              <FaUser />
            </div>
            <div>
              <h2 className="profile-section-title">
                {t('memberProfile.roleHighlights.title')}
              </h2>
              <p className="profile-section-subtitle">
                {t(currentHighlight.eyebrowKey)}
              </p>
            </div>
          </div>
          <div className="profile-card profile-role-highlight-card">
            <span className="profile-role-eyebrow">
              {t(activeRoleDefinition.i18nKey)}
            </span>
            <h3 className="profile-role-title">{t(currentHighlight.titleKey)}</h3>
            <p className="profile-role-description">
              {t(currentHighlight.descriptionKey)}
            </p>
            <div className="profile-role-checkpoints">
              {currentHighlight.checkpoints.map((item) => (
                <div key={item.titleKey} className="profile-role-checkpoint">
                  <p className="profile-role-checkpoint-title">
                    {t(item.titleKey)}
                  </p>
                  <p className="profile-role-checkpoint-text">
                    {t(item.descriptionKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="profile-section">
          <div className="profile-section-heading">
            <div className="profile-section-icon profile-section-icon-primary">
              <FaCog />
            </div>
            <div>
              <h2 className="profile-section-title">
                {t('memberProfile.appSettings.title')}
              </h2>
              <p className="profile-section-subtitle">
                {t('memberProfile.appSettings.subtitle')}
              </p>
            </div>
          </div>
          <div className="profile-card profile-app-settings-card">
            <button
              className="profile-setting-row"
              type="button"
              onClick={() => handleAppSettingNavigation('/member/support')}
            >
              <div className="profile-setting-icon">
                <FaShieldAlt />
              </div>
              <div className="profile-setting-copy">
                <p>{t('memberProfile.appSettings.privacy')}</p>
                <span>{t('memberProfile.appSettings.privacyHint')}</span>
              </div>
              <FaChevronRight className="profile-setting-arrow" />
            </button>
            <button
              className="profile-setting-row"
              type="button"
              onClick={() => handleAppSettingNavigation('/member/support')}
            >
              <div className="profile-setting-icon">
                <FaQuestionCircle />
              </div>
              <div className="profile-setting-copy">
                <p>{t('memberProfile.appSettings.help')}</p>
                <span>{t('memberProfile.appSettings.helpHint')}</span>
              </div>
              <FaChevronRight className="profile-setting-arrow" />
            </button>
            <button
              className="profile-setting-row"
              type="button"
              onClick={() => handleAppSettingNavigation('/member/about')}
            >
              <div className="profile-setting-icon">
                <FaInfoCircle />
              </div>
              <div className="profile-setting-copy">
                <p>{t('memberProfile.appSettings.about')}</p>
                <span>{t('memberProfile.appSettings.aboutHint')}</span>
              </div>
              <FaChevronRight className="profile-setting-arrow" />
            </button>
          </div>
        </section>

        <section className="profile-section">
          <div className="profile-card profile-account-actions">
            <button
              type="button"
              className="profile-secondary-btn"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              {t('profile.logout')}
            </button>
            <button
              type="button"
              className="profile-danger-btn"
              onClick={handleDeleteAccount}
            >
              <FaTrashAlt />
              {t('memberProfile.accountActions.delete')}
            </button>
          </div>
          <div className="profile-footer">
            <p>{t('memberProfile.footer.version', { version: '1.0.0' })}</p>
            <p>{t('memberProfile.footer.tagline')}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MemberProfile;
