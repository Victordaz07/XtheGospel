/**
 * Leadership Callings List Page
 * 
 * Shows all callings with filters by organization and status.
 * Clean, non-judgmental UI.
 */

import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCallingsStore } from '../state';
import { 
  CallingStatus, 
  OrganizationType,
  STATUS_LABELS, 
  ORGANIZATION_LABELS 
} from '../types';
import './LeadershipPages.css';

const LeadershipCallingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callings = useCallingsStore((s) => s.callings);
  
  const [selectedOrg, setSelectedOrg] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>(
    searchParams.get('status') || 'all'
  );
  
  const filteredCallings = useMemo(() => {
    return callings.filter(c => {
      if (selectedOrg !== 'all' && c.organization !== selectedOrg) return false;
      if (selectedStatus === 'all') return true;
      if (selectedStatus === 'active') return c.status === 'active' || c.status === 'set_apart';
      if (selectedStatus === 'training') return c.status === 'sustained' || c.status === 'called';
      return c.status === selectedStatus;
    });
  }, [callings, selectedOrg, selectedStatus]);
  
  const organizations: (OrganizationType | 'all')[] = [
    'all', 'bishopric', 'elders_quorum', 'relief_society', 
    'young_women', 'young_men', 'primary', 'sunday_school', 
    'ward_mission', 'other'
  ];
  
  return (
    <div className="leadership-page">
      <header className="leadership-header">
        <button className="back-button" onClick={() => navigate('/member/leadership/home')}>
          ← Volver
        </button>
        <h1>Llamamientos</h1>
      </header>
      
      <main className="leadership-content">
        {/* Organization Filter */}
        <div className="filter-tabs">
          {organizations.map(org => (
            <button
              key={org}
              className={`filter-tab ${selectedOrg === org ? 'active' : ''}`}
              onClick={() => setSelectedOrg(org)}
            >
              {org === 'all' ? 'Todos' : ORGANIZATION_LABELS[org as OrganizationType]}
            </button>
          ))}
        </div>
        
        {/* Status Filter */}
        <div className="status-filter">
          <label>Estado:</label>
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus((e.target as any).value)}
        >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="training">En capacitación</option>
            <option value="proposed">Propuestos</option>
            <option value="released">Relevados</option>
          </select>
        </div>
        
        {/* Callings List */}
        <div className="callings-list">
          {filteredCallings.length === 0 ? (
            <div className="empty-state">
              <p>No hay llamamientos que coincidan con los filtros.</p>
            </div>
          ) : (
            filteredCallings.map(calling => (
              <div 
                key={calling.id}
                className="calling-card"
                onClick={() => navigate(`/member/leadership/callings/${calling.id}`)}
              >
                <div className="calling-card-header">
                  <span className="calling-member-name">{calling.memberName}</span>
                  <span className={`status-badge status-${calling.status}`}>
                    {STATUS_LABELS[calling.status]}
                  </span>
                </div>
                <div className="calling-card-body">
                  <p className="calling-position">{calling.position}</p>
                  <p className="calling-org">{ORGANIZATION_LABELS[calling.organization]}</p>
                </div>
                {calling.timeline.proposedAt && (
                  <div className="calling-card-footer">
                    <span className="calling-date">
                      Desde: {new Date(calling.timeline.proposedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        {/* FAB */}
        <button 
          className="fab"
          onClick={() => navigate('/member/leadership/callings/new')}
        >
          ➕
        </button>
      </main>
    </div>
  );
};

export default LeadershipCallingsPage;
