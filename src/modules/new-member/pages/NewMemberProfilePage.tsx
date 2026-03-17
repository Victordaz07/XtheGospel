import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaChevronRight,
  FaUser,
  FaBell,
  FaGlobe,
  FaCircleQuestion,
  FaUserGear,
} from 'react-icons/fa6';
import { OrdinanceDatesSection } from '../../../components/OrdinanceDatesSection';
import DataPrivacySection from '../../../components/DataPrivacySection';
import { useMode, type AppMode } from '../../../state/mode';
import { useI18n } from '../../../context/I18nContext';
import '../../../components/DataPrivacySection.css';
import './NewMemberProfilePage.css';

/**
 * New Member Profile Page
 * Sprint 7 - Pastoral tone, no placeholders
 * Includes mode switcher (Investigador / Miembro / Liderazgo) to switch from Leadership back to Member.
 */
export default function NewMemberProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const { mode, setMode } = useMode();
  const { t, locale } = useI18n();

  const handleSettingClick = (setting: string): void => {
    alert(`${setting} ${t('app.common.comingSoon')}`);
  };

  const handleModeChange = (newMode: AppMode): void => {
    setMode(newMode);
    switch (newMode) {
      case 'leadership':
        navigate('/member/leadership/home');
        break;
      case 'member':
      case 'investigator':
      default:
        navigate('/home');
        break;
    }
  };

  return (
    <div className="nm-profile">
      {/* Role Card */}
      <div className="nm-profile__role">
        <div className="nm-profile__role-avatar">
          <FaUser />
        </div>
        <h1 className="nm-profile__role-title">{t('app.profileNewMember.welcomeFriend')}</h1>
        <p className="nm-profile__role-label">{t('app.profile.member')}</p>
      </div>

      {/* Ward Family */}
      <section className="nm-profile__section">
        <h2 className="nm-profile__section-title">{t('app.profileNewMember.myWardFamily')}</h2>
        <div className="nm-profile__ward-info">
          <p className="nm-profile__ward-text">
            {t('app.profileNewMember.wardInfo')}
          </p>
        </div>
      </section>

      {/* Ordinance Dates */}
      <section className="nm-profile__section">
        <h2 className="nm-profile__section-title">{t('app.profile.myJourney')}</h2>
        <OrdinanceDatesSection />
      </section>

      {/* Mode Switcher - switch between Investigator / Member / Leadership */}
      <section className="nm-profile__section">
        <h2 className="nm-profile__section-title">{t('app.profile.switchModeTitle')}</h2>
        <p className="nm-profile__section-desc">
          {t('app.profile.switchModeDesc')}
        </p>
        <div className="nm-profile__mode-switcher">
          <button
            type="button"
            className={`nm-profile__mode-btn ${mode === 'investigator' ? 'nm-profile__mode-btn--active' : ''}`}
            onClick={() => handleModeChange('investigator')}
          >
            <FaUser className="nm-profile__mode-icon" />
            <span>{t('app.profile.friend')}</span>
          </button>
          <button
            type="button"
            className={`nm-profile__mode-btn ${mode === 'member' ? 'nm-profile__mode-btn--active' : ''}`}
            onClick={() => handleModeChange('member')}
          >
            <FaUser className="nm-profile__mode-icon" />
            <span>{t('app.profile.member')}</span>
          </button>
          <button
            type="button"
            className={`nm-profile__mode-btn ${mode === 'leadership' ? 'nm-profile__mode-btn--active' : ''}`}
            onClick={() => handleModeChange('leadership')}
          >
            <FaUserGear className="nm-profile__mode-icon" />
            <span>{t('app.profile.leadership')}</span>
          </button>
        </div>
      </section>

      {/* Settings */}
      <section className="nm-profile__section">
        <h2 className="nm-profile__section-title">{t('app.profileNewMember.settings')}</h2>
        <div className="nm-profile__settings">
          <button
            className="nm-profile__setting"
            onClick={() => handleSettingClick(t('app.profile.notifications'))}
          >
            <div className="nm-profile__setting-icon">
              <FaBell />
            </div>
            <div className="nm-profile__setting-content">
              <h3 className="nm-profile__setting-title">{t('app.profile.notifications')}</h3>
              <p className="nm-profile__setting-desc">{t('app.profile.notificationsDesc')}</p>
            </div>
            <FaChevronRight className="nm-profile__setting-arrow" />
          </button>

          <button
            className="nm-profile__setting"
            onClick={() => handleSettingClick(t('app.profile.language'))}
          >
            <div className="nm-profile__setting-icon">
              <FaGlobe />
            </div>
            <div className="nm-profile__setting-content">
              <h3 className="nm-profile__setting-title">{t('app.profile.language')}</h3>
              <p className="nm-profile__setting-desc">{locale.toUpperCase()}</p>
            </div>
            <FaChevronRight className="nm-profile__setting-arrow" />
          </button>

          <button
            className="nm-profile__setting"
            onClick={() => handleSettingClick(t('app.profile.help'))}
          >
            <div className="nm-profile__setting-icon">
              <FaCircleQuestion />
            </div>
            <div className="nm-profile__setting-content">
              <h3 className="nm-profile__setting-title">{t('app.profileNewMember.helpSupport')}</h3>
              <p className="nm-profile__setting-desc">{t('app.profileNewMember.getAssistance')}</p>
            </div>
            <FaChevronRight className="nm-profile__setting-arrow" />
          </button>
        </div>
      </section>

      {/* Data & Privacy */}
      <section className="nm-profile__section">
        <h2 className="nm-profile__section-title">{t('app.profile.dataPrivacy')}</h2>
        <DataPrivacySection classPrefix="nm-profile" />
      </section>

      {/* Version */}
      <footer className="nm-profile__version">
        <p className="nm-profile__version-label">{t('app.profile.version', { version: '1.0.0' })}</p>
      </footer>
    </div>
  );
}
