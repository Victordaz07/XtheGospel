import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../context/I18nContext';
import { LanguagePicker } from '../../components/LanguagePicker';
import { Button } from '../../components/Button';
import { ProfileService, MainGoal } from '../../services/profileService';
import { RoleSettingsCard } from '../../components/RoleSettingsCard';
import '../learning/Page.css';
import '../learning/ProfilePage.css';

const InvestigatorProfile: React.FC = () => {
  const { logout, login } = useAuth();
  const { t } = useI18n();
  const [mainGoal, setMainGoal] = useState<MainGoal | ''>('');
  const [customGoal, setCustomGoal] = useState('');
  const [notesForMissionaries, setNotesForMissionaries] = useState('');
  const [saving, setSaving] = useState(false);

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

  const goalOptions: Array<{ value: MainGoal; key: string }> = [
    { value: 'knowBookOfMormon', key: 'profile.goal.knowBookOfMormon' },
    { value: 'prepareForBaptism', key: 'profile.goal.prepareForBaptism' },
    { value: 'knowJesusChrist', key: 'profile.goal.knowJesusChrist' },
    { value: 'other', key: 'profile.goal.other' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('tabs.profile')}</h1>
      </div>
      <div className="page-content">
        {/* Meta actual */}
        <div className="profile-card">
          <h2>{t('profile.currentGoal') || 'Tu Meta Actual'}</h2>
          <p className="profile-card-description">
            {t('profile.goalDescription') || 'Selecciona tu meta principal en este momento'}
          </p>
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
        </div>

        {/* Notas para misioneros */}
        <div className="profile-card">
          <h2>{t('profile.notesForMissionaries') || 'Notas para los Misioneros'}</h2>
          <p className="profile-card-description">
            {t('profile.notesDescription') || 'Escribe aquí lo que quieres hablar con los misioneros'}
          </p>
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
        </div>

        {/* Settings / Account Section */}
        <div className="profile-card">
          <h2>{t('profile.settings') || 'Configuración'}</h2>
          <RoleSettingsCard currentRole="investigator" />
        </div>

        {/* Idioma */}
        <div className="profile-card">
          <h2>{t('profile.language')}</h2>
          <LanguagePicker />
        </div>

        {/* Acciones */}
        <div className="profile-card">
          <h2>{t('profile.actions')}</h2>
          <Button
            title={t('profile.logout')}
            onClick={handleLogout}
            variant="outline"
          />
        </div>
      </div>
    </div>
  );
};

export default InvestigatorProfile;
