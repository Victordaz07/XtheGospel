import React, { useState, useEffect, ChangeEvent, FormEvent, useMemo, useRef } from 'react';
import { FaChevronRight, FaGlobe, FaSignOutAlt, FaBullseye, FaStickyNote, FaCog, FaCamera, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useI18n, Locale } from '../../context/I18nContext';
import { LANGUAGE_OPTIONS } from '../../i18n/locales';
import { ProfileService, MainGoal } from '../../services/profileService';
import { RoleSettingsCard } from '../../components/RoleSettingsCard';
import { PageContainer, Card } from '../../ui/components';
import './Page.css';
import './ProfilePage.css';
import './InvestigatorProfile.css';

const DEFAULT_AVATAR =
  'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg';

type ProfileFieldKey = 'name' | 'email' | 'phone' | 'address';

interface ProfileFormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  memberSince: string;
  avatarUrl: string;
}

const languageOptions: { code: Locale; name: string; flag: string }[] = [
  ...LANGUAGE_OPTIONS.map((option) => ({ code: option.code, name: option.label, flag: option.flag })),
];

const localeLabels: Record<Locale, string> = {
  es: LANGUAGE_OPTIONS.find((option) => option.code === 'es')?.label ?? 'Español',
  en: LANGUAGE_OPTIONS.find((option) => option.code === 'en')?.label ?? 'English',
  fr: LANGUAGE_OPTIONS.find((option) => option.code === 'fr')?.label ?? 'Français',
  pt: LANGUAGE_OPTIONS.find((option) => option.code === 'pt')?.label ?? 'Português',
};

const InvestigatorProfile: React.FC = () => {
  const { logout, login } = useAuth();
  const { t, locale, setLocale } = useI18n();
  const [mainGoal, setMainGoal] = useState<MainGoal | ''>('');
  const [customGoal, setCustomGoal] = useState('');
  const [notesForMissionaries, setNotesForMissionaries] = useState('');
  const [saving, setSaving] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showRoleSheet, setShowRoleSheet] = useState(false);
  const [profileData, setProfileData] = useState<ProfileFormState>({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '221B Baker Street · London, UK',
    memberSince: '2024-01-01',
    avatarUrl: DEFAULT_AVATAR,
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const profile = ProfileService.loadProfile();
    setMainGoal(profile.mainGoal || '');
    setCustomGoal(profile.customGoal || '');
    setNotesForMissionaries(profile.notesForMissionaries || '');
  };

  const handleGoalChange = (goal: MainGoal) => {
    setMainGoal(goal);
    ProfileService.updateGoal(goal, customGoal);
  };

  const handleSaveNotes = async () => {
    setSaving(true);
    try {
      ProfileService.updateNotesForMissionaries(notesForMissionaries);
      alert(t('profile.notesSaved') || 'Notas guardadas');
    } catch (error) {
      console.error('Error guardando notas:', error);
    } finally {
      setSaving(false);
    }
  };

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

  const handleProfileSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingProfile(true);
    setShowSavedMessage(false);
    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSavingProfile(false);
    setShowSavedMessage(true);
    setTimeout(() => setShowSavedMessage(false), 3000);
  };

  const goalOptions: Array<{ value: MainGoal; key: string }> = [
    { value: 'knowBookOfMormon', key: 'profile.goal.knowBookOfMormon' },
    { value: 'prepareForBaptism', key: 'profile.goal.prepareForBaptism' },
    { value: 'knowJesusChrist', key: 'profile.goal.knowJesusChrist' },
    { value: 'other', key: 'profile.goal.other' },
  ];

  return (
    <PageContainer>
      <div className="investigator-profile-page">
        <header className="investigator-profile-header">
          <h1>{t('tabs.profile') || 'Perfil'}</h1>
          <p>{t('profile.settings') || 'Configuración'}</p>
        </header>

        {/* Hero Card con Avatar */}
        <Card className="investigator-profile-card profile-hero-card">
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
              {t('auth.friend') || 'Amigo'}
            </span>
            <p className="profile-hero-meta">
              {t('memberProfile.personalInfo.memberSince') || 'Member since'} {formattedMemberSince}
            </p>
          </div>
        </Card>

        {/* Info personal */}
        <Card className="investigator-profile-card">
          <div className="profile-section-heading">
            <div className="profile-section-icon profile-section-icon-primary">
              <FaUser />
            </div>
            <div>
              <h2 className="profile-section-title">
                {t('memberProfile.personalInfo.title') || 'Información Personal'}
              </h2>
              <p className="profile-section-subtitle">
                {t('memberProfile.personalInfo.subtitle') || 'Actualiza tu información de contacto'}
              </p>
            </div>
          </div>
          <form className="profile-form-card" onSubmit={handleProfileSave}>
            <div className="profile-field">
              <label className="profile-label" htmlFor="profile-full-name">
                {t('memberProfile.personalInfo.fullName') || 'Nombre Completo'}
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
                {t('memberProfile.personalInfo.email') || 'Correo Electrónico'}
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
                {t('memberProfile.personalInfo.phone') || 'Teléfono'}
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
                {t('memberProfile.personalInfo.address') || 'Dirección'}
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
                  ? t('memberProfile.personalInfo.saving') || 'Guardando...'
                  : t('memberProfile.personalInfo.save') || 'Guardar'}
              </button>
              {showSavedMessage && (
                <span className="profile-save-message">
                  {t('memberProfile.personalInfo.saved') || 'Guardado'}
                </span>
              )}
            </div>
          </form>
        </Card>

        {/* Meta actual */}
        <Card className="investigator-profile-card">
          <div className="profile-section-heading">
            <div className="profile-section-icon profile-section-icon-primary">
              <FaBullseye />
            </div>
            <div>
              <h2 className="profile-section-title">{t('profile.currentGoal') || 'Tu Meta Actual'}</h2>
              <p className="profile-section-subtitle">
                {t('profile.goalDescription') || 'Selecciona tu meta principal en este momento'}
              </p>
            </div>
          </div>
          <div className="goal-options">
            {goalOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleGoalChange(option.value)}
                className={`goal-option ${mainGoal === option.value ? 'active' : ''}`}
              >
                {t(option.key)}
              </button>
            ))}
          </div>
          {mainGoal === 'other' && (
            <div className="custom-goal-input">
              <input
                type="text"
                value={customGoal}
                onChange={(e) => {
                  setCustomGoal(e.target.value);
                  ProfileService.updateGoal('other', e.target.value);
                }}
                placeholder={t('profile.customGoalPlaceholder') || 'Describe tu meta...'}
                className="custom-goal-field"
              />
            </div>
          )}
          {mainGoal && (
            <div className="current-goal-display">
              <strong>{t('profile.yourGoal')}:</strong> {t(goalOptions.find(o => o.value === mainGoal)?.key || '')}
            </div>
          )}
        </Card>

        {/* Notas para misioneros */}
        <Card className="investigator-profile-card">
          <div className="profile-section-heading">
            <div className="profile-section-icon profile-section-icon-secondary">
              <FaStickyNote />
            </div>
            <div>
              <h2 className="profile-section-title">{t('profile.notesForMissionaries') || 'Notas para los Misioneros'}</h2>
              <p className="profile-section-subtitle">
                {t('profile.notesDescription') || 'Escribe aquí lo que quieres hablar con los misioneros'}
              </p>
            </div>
          </div>
          <textarea
            value={notesForMissionaries}
            onChange={(e) => setNotesForMissionaries(e.target.value)}
            placeholder={t('profile.notesPlaceholder') || 'Escribe tus preguntas, dudas o temas que quieres tratar...'}
            className="missionary-notes-textarea"
            rows={6}
          />
          <button
            onClick={handleSaveNotes}
            disabled={saving}
            className="save-notes-button"
          >
            {saving ? t('common.saving') : t('profile.saveNotes') || 'Guardar notas'}
          </button>
        </Card>

        {/* Configuración de Rol */}
        <Card className="investigator-profile-card">
          <div className="profile-section-heading profile-section-heading--plain">
            <div>
              <h2 className="profile-section-title">{t('profile.settings') || 'Configuración de Rol'}</h2>
              <p className="profile-section-subtitle">
                {t('profile.roleDescription') || 'Estás conociendo la iglesia'}
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
                  {t('auth.friend') || 'Amigo'}
                </p>
                <p className="profile-role-button-subtitle">
                  {t('profile.roleDescription') || 'Conociendo la iglesia'}
                </p>
              </div>
            </div>
            <FaChevronRight />
          </button>
        </Card>

        {/* Idioma */}
        <Card className="investigator-profile-card">
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
        <Card className="investigator-profile-card">
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
              <p className="sheet-subtitle">{t('profile.roleDescription') || 'Estás conociendo la iglesia'}</p>
              <div className="sheet-content">
                <RoleSettingsCard currentRole="investigator" />
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

export default InvestigatorProfile;
