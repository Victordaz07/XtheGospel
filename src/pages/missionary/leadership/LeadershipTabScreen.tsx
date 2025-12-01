import React from 'react';
import { useLocation } from 'react-router-dom';
import { getLeadershipRoleEnhanced, getTabById, LeadershipRole } from '../../../data/missionary/leadershipModeEnhanced';
import { SectionCard } from '../../../components/missionary/leadership/SectionCard';
import '../../../pages/Page.css';
import './LeadershipTabScreen.css';

interface LeadershipTabScreenProps {
  roleId: LeadershipRole;
  tabId: string;
}

export const LeadershipTabScreen: React.FC<LeadershipTabScreenProps> = ({ roleId, tabId }) => {
  const location = useLocation();
  const role = getLeadershipRoleEnhanced(roleId);
  const tab = getTabById(roleId, tabId);

  if (!role || !tab) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Tab no encontrado</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header" style={{ borderLeftColor: role.color }}>
        <div className="leadership-header-badge" style={{ backgroundColor: `${role.color}15`, color: role.color }}>
          🛡️
        </div>
        <div>
          <h1>{tab.title}</h1>
          {tab.subtitle && <p className="page-subtitle">{tab.subtitle}</p>}
          {tab.purpose && (
            <p className="page-purpose" style={{ color: role.color }}>
              {tab.purpose}
            </p>
          )}
        </div>
      </div>
      <div className="page-content">
        {tab.sections.map((section, idx) => (
          <SectionCard
            key={section.id}
            section={section}
            roleColor={role.color}
            tabId={tabId}
            roleId={roleId}
            defaultExpanded={idx === 0}
          />
        ))}
      </div>
    </div>
  );
};

