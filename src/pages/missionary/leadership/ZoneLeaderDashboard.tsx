import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getLeadershipRoleEnhanced } from '../../../data/missionary/leadershipModeEnhanced';
import { ZoneCouncilService } from '../../../services/zoneCouncilService';
import { LeaderMessageService } from '../../../services/leaderMessageService';
import '../../../pages/Page.css';
import './LeadershipDashboard.css';

export const ZoneLeaderDashboard: React.FC = () => {
  const location = useLocation();
  const role = getLeadershipRoleEnhanced('zoneLeader');
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Cargar próximos eventos de la zona
    const events = ZoneCouncilService.getEventsForZone('current_zone');
    const upcoming = events
      .filter(e => e.status === 'upcoming')
      .slice(0, 5);
    setUpcomingEvents(upcoming);

    // Cargar mensajes recientes
    const messages = LeaderMessageService.getMessagesForZone('current_zone');
    setRecentMessages(messages.slice(0, 3));
  };

  if (!role) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Error</h1>
          <p className="page-subtitle">No se pudo cargar la configuración del rol</p>
        </div>
      </div>
    );
  }

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

        {/* Próximos eventos */}
        <div className="leadership-events-card">
          <h3>Próximos eventos de la zona</h3>
          {upcomingEvents.length === 0 ? (
            <p className="dashboard-empty">No hay eventos programados</p>
          ) : (
            <div className="dashboard-events-list">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="dashboard-event-item">
                  <div className="dashboard-event-icon" style={{ backgroundColor: `${role.color}15`, color: role.color }}>
                    {event.type === 'zone_council' ? '📋' : event.type === 'exchange' ? '🔄' : event.type === 'baptismal_interview' ? '💧' : '📨'}
                  </div>
                  <div className="dashboard-event-content">
                    <strong>{event.title}</strong>
                    <p>{event.date} {event.time && `– ${event.time}`}</p>
                    {event.location && <p className="dashboard-event-location">{event.location}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mensajes recientes */}
        <div className="leadership-messages-card">
          <h3>Mensajes recientes</h3>
          {recentMessages.length === 0 ? (
            <p className="dashboard-empty">No hay mensajes recientes</p>
          ) : (
            <div className="dashboard-messages-list">
              {recentMessages.map((message) => (
                <div key={message.id} className="dashboard-message-item">
                  <div className="dashboard-message-header">
                    <strong>{message.title}</strong>
                    <span className="dashboard-message-date">
                      {new Date(message.publishedAt || message.createdAt).toLocaleDateString('es-ES', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="dashboard-message-preview">
                    {message.body.substring(0, 100)}
                    {message.body.length > 100 && '...'}
                  </p>
                  <p className="dashboard-message-sender">
                    De: {message.senderName}
                  </p>
                </div>
              ))}
            </div>
          )}
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

