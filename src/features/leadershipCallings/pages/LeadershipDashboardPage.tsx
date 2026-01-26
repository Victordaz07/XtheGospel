/**
 * Leadership Dashboard Page
 * 
 * Main dashboard for ward/stake leadership.
 * Shows callings summary with SOFT alerts (no urgency).
 * NO KPIs, NO metrics, NO surveillance.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallingsStore } from '../state';
import { STATUS_LABELS, ORGANIZATION_LABELS } from '../types';
import './LeadershipPages.css';

const LeadershipDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const callings = useCallingsStore((s) => s.callings);
  
  // Simple counts (not metrics)
  const activeCallings = callings.filter(c => 
    c.status === 'active' || c.status === 'set_apart'
  );
  const inTraining = callings.filter(c => 
    c.status === 'sustained' || c.status === 'called'
  );
  const pending = callings.filter(c => c.status === 'proposed');
  
  // Soft reminders (not alerts)
  const callingsWithoutRecentFollowup = activeCallings.slice(0, 2); // Mock for now
  
  return (
    <div className="leadership-page">
      <header className="leadership-header">
        <h1>Liderazgo</h1>
        <p className="leadership-subtitle">Gestión de llamamientos del barrio</p>
      </header>
      
      <main className="leadership-content">
        {/* Summary Cards */}
        <section className="dashboard-summary">
          <div className="summary-card" onClick={() => navigate('/member/leadership/callings?status=active')}>
            <span className="summary-value">{activeCallings.length}</span>
            <span className="summary-label">Activos</span>
          </div>
          <div className="summary-card" onClick={() => navigate('/member/leadership/callings?status=training')}>
            <span className="summary-value">{inTraining.length}</span>
            <span className="summary-label">En capacitación</span>
          </div>
          <div className="summary-card" onClick={() => navigate('/member/leadership/callings?status=proposed')}>
            <span className="summary-value">{pending.length}</span>
            <span className="summary-label">Pendientes</span>
          </div>
        </section>
        
        {/* Soft Reminders */}
        {callingsWithoutRecentFollowup.length > 0 && (
          <section className="soft-reminders">
            <h2>💡 Recordatorios</h2>
            <div className="reminder-card">
              <p>
                {callingsWithoutRecentFollowup.length} llamamiento(s) sin seguimiento reciente.
              </p>
              <span className="reminder-note">No urgente — solo un recordatorio amable.</span>
            </div>
          </section>
        )}
        
        {/* Quick Actions */}
        <section className="quick-actions">
          <h2>Acciones rápidas</h2>
          <button 
            className="action-button primary"
            onClick={() => navigate('/member/leadership/callings/new')}
          >
            ➕ Nuevo llamamiento
          </button>
          <button 
            className="action-button secondary"
            onClick={() => navigate('/member/leadership/callings')}
          >
            📋 Ver todos los llamamientos
          </button>
          <button 
            className="action-button secondary"
            onClick={() => navigate('/member/leadership/members')}
          >
            👥 Ver miembros
          </button>
        </section>
        
        {/* Recent Activity */}
        <section className="recent-callings">
          <h2>Llamamientos recientes</h2>
          {callings.slice(0, 3).map(calling => (
            <div 
              key={calling.id} 
              className="calling-preview-card"
              onClick={() => navigate(`/member/leadership/callings/${calling.id}`)}
            >
              <div className="calling-preview-header">
                <span className="calling-member-name">{calling.memberName}</span>
                <span className={`status-badge status-${calling.status}`}>
                  {STATUS_LABELS[calling.status]}
                </span>
              </div>
              <div className="calling-preview-details">
                <span className="calling-position">{calling.position}</span>
                <span className="calling-org">{ORGANIZATION_LABELS[calling.organization]}</span>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default LeadershipDashboardPage;
