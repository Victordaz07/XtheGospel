import React from 'react';
import { FaChevronRight, FaUser, FaBell, FaGlobe, FaCircleQuestion } from 'react-icons/fa6';
import { OrdinanceDatesSection } from '../../../components/OrdinanceDatesSection';
import './NewMemberProfilePage.css';

export default function NewMemberProfilePage(): JSX.Element {
  const handleSettingClick = (setting: string): void => {
    alert(`${setting} coming soon!`);
  };

  return (
    <div className="nm-profile">
      {/* Role Card */}
      <div className="nm-profile__role">
        <div className="nm-profile__role-avatar">
          <FaUser />
        </div>
        <h1 className="nm-profile__role-title">Welcome, New Member</h1>
        <p className="nm-profile__role-label">Vineyard Member</p>
      </div>

      {/* Ward Family */}
      <div className="nm-profile__section">
        <h2 className="nm-profile__section-title">My Ward Family</h2>
        <div className="nm-profile__placeholder">
          <div className="nm-profile__placeholder-icon">👥</div>
          <h3 className="nm-profile__placeholder-title">Ward Connections</h3>
          <p className="nm-profile__placeholder-text">
            Connect with your bishop, ministering brothers/sisters, and ward friends.
          </p>
          <span className="nm-profile__placeholder-badge">Coming Soon</span>
        </div>
      </div>

      {/* Ordinance Dates */}
      <div className="nm-profile__section">
        <h2 className="nm-profile__section-title">Your Journey</h2>
        <OrdinanceDatesSection />
      </div>

      {/* Settings */}
      <div className="nm-profile__section">
        <h2 className="nm-profile__section-title">Settings</h2>
        <div className="nm-profile__settings">
          <button 
            className="nm-profile__setting"
            onClick={() => handleSettingClick('Notifications')}
          >
            <div className="nm-profile__setting-icon">
              <FaBell />
            </div>
            <div className="nm-profile__setting-content">
              <h3 className="nm-profile__setting-title">Notifications</h3>
              <p className="nm-profile__setting-desc">Manage your alerts</p>
            </div>
            <FaChevronRight className="nm-profile__setting-arrow" />
          </button>
          
          <button 
            className="nm-profile__setting"
            onClick={() => handleSettingClick('Language')}
          >
            <div className="nm-profile__setting-icon">
              <FaGlobe />
            </div>
            <div className="nm-profile__setting-content">
              <h3 className="nm-profile__setting-title">Language</h3>
              <p className="nm-profile__setting-desc">English</p>
            </div>
            <FaChevronRight className="nm-profile__setting-arrow" />
          </button>
          
          <button 
            className="nm-profile__setting"
            onClick={() => handleSettingClick('Help')}
          >
            <div className="nm-profile__setting-icon">
              <FaCircleQuestion />
            </div>
            <div className="nm-profile__setting-content">
              <h3 className="nm-profile__setting-title">Help & Support</h3>
              <p className="nm-profile__setting-desc">Get assistance</p>
            </div>
            <FaChevronRight className="nm-profile__setting-arrow" />
          </button>
        </div>
      </div>

      {/* Version */}
      <div className="nm-profile__version">
        <p className="nm-profile__version-label">xTheGospel v1.0.0 (New Member MVP)</p>
      </div>
    </div>
  );
}
