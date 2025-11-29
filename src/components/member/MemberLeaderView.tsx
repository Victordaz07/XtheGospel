import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { leaderSections } from '../../data/memberLeaderMode';
import './MemberLeaderView.css';

export const MemberLeaderView: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="member-leader-view">
      <div className="page-header">
        <h1>{t('memberLeader.headerTitle')}</h1>
        <p className="page-subtitle">{t('memberLeader.headerSubtitle')}</p>
      </div>

      <div className="page-content">
        {/* Header card */}
        <div className="leader-header-card">
          <h2>Modo Líder de Barrio / Rama</h2>
          <p>Herramientas rápidas para cuidar amigos y nuevos conversos</p>
        </div>

        {/* 4 Main Sections */}
        <div className="leader-sections-grid">
          {leaderSections.map((section) => (
            <Link
              key={section.id}
              to={section.routePath}
              className="leader-section-card"
            >
              <div className="leader-section-icon">{section.icon}</div>
              <div className="leader-section-content">
                <h3>{t(section.titleKey)}</h3>
                <p>{t(section.subtitleKey)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
