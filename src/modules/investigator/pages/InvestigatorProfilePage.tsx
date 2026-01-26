import React from 'react';
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
  FaUserGear
} from 'react-icons/fa6';
import { OrdinanceDatesSection } from '../../../components/OrdinanceDatesSection';
import DataPrivacySection from '../../../components/DataPrivacySection';
import { useMode, AppMode } from '../../../state/mode';
import '../../../components/DataPrivacySection.css';
import './InvestigatorProfilePage.css';

export default function InvestigatorProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const { mode, setMode } = useMode();

  const handleSettingClick = (setting: string): void => {
    alert(`${setting} settings coming soon!`);
  };

  const handleModeChange = (newMode: AppMode): void => {
    setMode(newMode);
    // Navigate to the appropriate home for each mode
    switch (newMode) {
      case 'leadership':
        navigate('/member/leadership/home');
        break;
      case 'member':
        navigate('/home');
        break;
      case 'investigator':
      default:
        navigate('/home');
        break;
    }
  };

  return (
    <div className="inv-profile">
      {/* Role Card */}
      <div className="inv-profile__role">
        <div className="inv-profile__role-avatar">
          <FaUser />
        </div>
        <h1 className="inv-profile__role-title">Welcome, Friend</h1>
        <p className="inv-profile__role-label">Investigator</p>
      </div>

      {/* My Missionaries */}
      <div className="inv-profile__section">
        <h2 className="inv-profile__section-title">My Missionaries</h2>
        <div className="inv-profile__contact">
          <div className="inv-profile__contact-header">
            <div className="inv-profile__contact-icon">👥</div>
            <div className="inv-profile__contact-info">
              <h3 className="inv-profile__contact-name">Elder Smith & Elder Johnson</h3>
              <p className="inv-profile__contact-role">Your teaching missionaries</p>
            </div>
          </div>
          <div className="inv-profile__contact-actions">
            <button 
              className="inv-profile__contact-btn inv-profile__contact-btn--primary"
              onClick={() => alert('Message feature coming soon!')}
            >
              <FaComments /> Message
            </button>
            <button 
              className="inv-profile__contact-btn inv-profile__contact-btn--secondary"
              onClick={() => alert('Call feature coming soon!')}
            >
              <FaPhone /> Call
            </button>
          </div>
        </div>
      </div>

      {/* Ordinance Dates */}
      <div className="inv-profile__section">
        <h2 className="inv-profile__section-title">Your Journey</h2>
        <OrdinanceDatesSection />
      </div>

      {/* Mode Switcher */}
      <div className="inv-profile__section">
        <h2 className="inv-profile__section-title">Cambiar modo</h2>
        <p className="inv-profile__section-desc">
          Selecciona cómo deseas usar la aplicación
        </p>
        <div className="inv-profile__mode-switcher">
          <button
            className={`inv-profile__mode-btn ${mode === 'investigator' ? 'inv-profile__mode-btn--active' : ''}`}
            onClick={() => handleModeChange('investigator')}
          >
            <FaUser className="inv-profile__mode-icon" />
            <span>Investigador</span>
          </button>
          <button
            className={`inv-profile__mode-btn ${mode === 'member' ? 'inv-profile__mode-btn--active' : ''}`}
            onClick={() => handleModeChange('member')}
          >
            <FaUser className="inv-profile__mode-icon" />
            <span>Miembro</span>
          </button>
          <button
            className={`inv-profile__mode-btn ${mode === 'leadership' ? 'inv-profile__mode-btn--active' : ''}`}
            onClick={() => handleModeChange('leadership')}
          >
            <FaUserGear className="inv-profile__mode-icon" />
            <span>Liderazgo</span>
          </button>
        </div>
      </div>

      {/* Preferences */}
      <div className="inv-profile__section">
        <h2 className="inv-profile__section-title">Preferences</h2>
        <div className="inv-profile__settings">
          <button 
            className="inv-profile__setting"
            onClick={() => handleSettingClick('Notifications')}
          >
            <div className="inv-profile__setting-icon">
              <FaBell />
            </div>
            <div className="inv-profile__setting-content">
              <h3 className="inv-profile__setting-title">Notifications</h3>
              <p className="inv-profile__setting-desc">Manage your alerts</p>
            </div>
            <FaChevronRight className="inv-profile__setting-arrow" />
          </button>
          
          <button 
            className="inv-profile__setting"
            onClick={() => handleSettingClick('Language')}
          >
            <div className="inv-profile__setting-icon">
              <FaGlobe />
            </div>
            <div className="inv-profile__setting-content">
              <h3 className="inv-profile__setting-title">Language</h3>
              <p className="inv-profile__setting-desc">English</p>
            </div>
            <FaChevronRight className="inv-profile__setting-arrow" />
          </button>
          
          <button 
            className="inv-profile__setting"
            onClick={() => handleSettingClick('Appearance')}
          >
            <div className="inv-profile__setting-icon">
              <FaPalette />
            </div>
            <div className="inv-profile__setting-content">
              <h3 className="inv-profile__setting-title">Appearance</h3>
              <p className="inv-profile__setting-desc">Light mode</p>
            </div>
            <FaChevronRight className="inv-profile__setting-arrow" />
          </button>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="inv-profile__section">
        <h2 className="inv-profile__section-title">Data & Privacy</h2>
        <DataPrivacySection classPrefix="inv-profile" />
      </div>

      {/* Support */}
      <div className="inv-profile__section">
        <h2 className="inv-profile__section-title">Support</h2>
        <div className="inv-profile__support">
          <button 
            className="inv-profile__support-btn"
            onClick={() => alert('Help center coming soon!')}
          >
            <FaCircleQuestion className="inv-profile__support-icon" />
            <span className="inv-profile__support-text">Help Center</span>
            <FaChevronRight className="inv-profile__setting-arrow" />
          </button>
          
          <button 
            className="inv-profile__support-btn"
            onClick={() => alert('Contact support coming soon!')}
          >
            <FaEnvelope className="inv-profile__support-icon" />
            <span className="inv-profile__support-text">Contact Support</span>
            <FaChevronRight className="inv-profile__setting-arrow" />
          </button>
        </div>
      </div>

      {/* Version */}
      <div className="inv-profile__version">
        <p className="inv-profile__version-label">xTheGospel v1.0.0 (Investigator MVP)</p>
      </div>
    </div>
  );
}
