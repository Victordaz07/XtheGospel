/**
 * Leadership Members Page
 * 
 * Shows members with their callings.
 * Simple list, no surveillance metrics.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallingsStore } from '../state';

// Mock members for development
const MOCK_MEMBERS = [
  { id: 'member-1', name: 'María García', since: '2018' },
  { id: 'member-2', name: 'Juan Pérez', since: '2020' },
  { id: 'member-3', name: 'Ana López', since: '2019' },
  { id: 'member-4', name: 'Pedro Martínez', since: '2016' },
  { id: 'member-5', name: 'Roberto Sánchez', since: '2021' },
  { id: 'member-10', name: 'Carlos Rodríguez', since: '2022' },
  { id: 'member-11', name: 'Laura Fernández', since: '2023' },
];

const LeadershipMembersPage: React.FC = () => {
  const navigate = useNavigate();
  const callings = useCallingsStore((s) => s.callings);
  
  const getMemberCallings = (memberId: string) => {
    return callings.filter(c => c.memberId === memberId && c.status !== 'released');
  };
  
  return (
    <div className="leadership-page">
      <header className="leadership-header">
        <button className="back-button" onClick={() => navigate('/member/leadership/home')}>
          ← Volver
        </button>
        <h1>Miembros</h1>
      </header>
      
      <main className="leadership-content">
        <div className="members-list">
          {MOCK_MEMBERS.map(member => {
            const memberCallings = getMemberCallings(member.id);
            
            return (
              <div 
                key={member.id}
                className="member-card"
                onClick={() => navigate(`/member/leadership/members/${member.id}`)}
              >
                <div className="member-avatar">👤</div>
                <div className="member-info">
                  <span className="member-name">{member.name}</span>
                  <span className="member-since">Miembro desde {member.since}</span>
                  {memberCallings.length > 0 && (
                    <div className="member-callings">
                      {memberCallings.map(c => (
                        <span key={c.id} className="calling-badge">
                          {c.position}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="arrow">→</span>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default LeadershipMembersPage;
