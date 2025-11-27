import React, { useState, useEffect } from 'react';
import { FaChevronRight, FaGlobe, FaSignOutAlt, FaBullseye, FaStickyNote, FaCog } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useI18n, Locale } from '../../context/I18nContext';
import { ProfileService, MainGoal } from '../../services/profileService';
import { RoleSettingsCard } from '../../components/RoleSettingsCard';
import { PageContainer, Card } from '../../ui/components';
import './Page.css';
import './ProfilePage.css';
import './InvestigatorProfile.css';

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

const InvestigatorProfile: React.FC = () => {
  const { logout, login } = useAuth();
  const { t, locale, setLocale } = useI18n();
  const [mainGoal, setMainGoal] = useState<MainGoal | ''>('');
  const [customGoal, setCustomGoal] = useState('');
  const [notesForMissionaries, setNotesForMissionaries] = useState('');
  const [saving, setSaving] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showRoleSheet, setShowRoleSheet] = useState(false);

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
                {t('profile.roleDescription') || 'Estás usando la app como: Investigador'}
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
                  {t('auth.investigator') || 'Investigador'}
                </p>
                <p className="profile-role-button-subtitle">
                  {t('profile.roleDescription') || 'Aprendiendo el Evangelio'}
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
              <p className="sheet-subtitle">{t('profile.roleDescription') || 'Estás usando la app como: Investigador'}</p>
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
