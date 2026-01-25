import React from 'react';
import { 
  FaChevronRight, 
  FaUser, 
  FaBell, 
  FaGlobe, 
  FaPalette,
  FaCircleQuestion,
  FaEnvelope,
  FaPhone,
  FaComments
} from 'react-icons/fa6';
import './InvestigatorProfilePage.css';

export default function InvestigatorProfilePage(): JSX.Element {
  const handleSettingClick = (setting: string): void => {
    alert(`${setting} settings coming soon!`);
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
