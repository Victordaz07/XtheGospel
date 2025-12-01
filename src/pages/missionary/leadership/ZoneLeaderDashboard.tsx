import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getLeadershipRoleEnhanced } from '../../../data/missionary/leadershipModeEnhanced';
import '../../../pages/Page.css';
import './LeadershipDashboard.css';

export const ZoneLeaderDashboard: React.FC = () => {
  const location = useLocation();
  const role = getLeadershipRoleEnhanced('zoneLeader');

  if (!role) return null;

  const getTabRoute = (tabId: string) => {
    const basePath = location.pathname.includes('/member/') 
      ? '/member/missionary/leadership/zoneLeader'
      : '/missionary/leadership/zoneLeader';
    return `${basePath}/${tabId}`;
  };

  return (
    <div className="page">
      <div className="page-header" style={{ borderLeftColor: role.color }}>
        <div className="leadership-header-badge" style={{ backgroundColor: `${role.color}15`, color: role.color }}>
          🛡️
        </div>
        <div>
          <h1>{role.name}</h1>
          <p className="page-subtitle">{role.summary}</p>
        </div>
      </div>
      <div className="page-content">
        {/* Hero Text */}
        <div className="leadership-hero-card" style={{ borderLeftColor: role.color }}>
          <p className="leadership-hero-text">{role.dashboard.heroText}</p>
          <p className="leadership-spiritual-motto">"{role.spiritualMotto}"</p>
        </div>

        {/* Core Scriptures */}
        <div className="leadership-scriptures-card">
          <h3>Escrituras clave</h3>
          <div className="leadership-scriptures-list">
            {role.coreScriptures.map((scripture, idx) => (
              <div key={idx} className="leadership-scripture-item">
                <span className="leadership-scripture-ref">{scripture.ref}</span>
                <p className="leadership-scripture-focus">{scripture.focus}</p>
              </div>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className="leadership-kpis-grid">
          {role.dashboard.kpis.map((kpi) => (
            <div key={kpi.id} className="leadership-kpi-card">
              <div className="leadership-kpi-icon" style={{ backgroundColor: `${role.color}15`, color: role.color }}>
                {kpi.type === 'number' ? '📊' : kpi.type === 'percentage' ? '📈' : kpi.type === 'score' ? '⭐' : '📉'}
              </div>
              <div className="leadership-kpi-content">
                <p className="leadership-kpi-label">{kpi.label}</p>
                <p className="leadership-kpi-value">--</p>
                <p className="leadership-kpi-description">{kpi.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="leadership-quick-actions">
          <h3>Acciones rápidas</h3>
          <div className="leadership-quick-actions-grid">
            {role.dashboard.quickActions.map((action) => (
              <Link
                key={action.id}
                to={getTabRoute(action.targetTabId)}
                className="leadership-quick-action-button"
                style={{ 
                  backgroundColor: `${role.color}15`,
                  color: role.color,
                  borderColor: `${role.color}40`
                }}
              >
                <span className="leadership-quick-action-icon">⚡</span>
                <span>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recommended Habits */}
        <div className="leadership-habits-card">
          <h3>Hábitos recomendados</h3>
          <ul className="leadership-habits-list">
            {role.recommendedHabits.map((habit, idx) => (
              <li key={idx} className="leadership-habit-item">
                <span className="leadership-habit-icon">✓</span>
                <span>{habit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

