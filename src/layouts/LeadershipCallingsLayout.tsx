/**
 * Leadership Callings Layout
 * 
 * Layout with bottom nav specific for Leadership mode:
 * Dashboard, Callings, Calendar, Profile
 */

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHouse, FaListCheck, FaCalendar, FaUser } from 'react-icons/fa6';
import './LeadershipCallingsLayout.css';

interface NavTab {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const leadershipTabs: NavTab[] = [
  { path: '/member/leadership/home', label: 'Panel', icon: <FaHouse /> },
  { path: '/member/leadership/callings', label: 'Llamamientos', icon: <FaListCheck /> },
  { path: '/member/leadership/calendar', label: 'Calendario', icon: <FaCalendar /> },
  { path: '/profile', label: 'Perfil', icon: <FaUser /> },
];

interface LeadershipCallingsLayoutProps {
  children: React.ReactNode;
}

export default function LeadershipCallingsLayout({ children }: LeadershipCallingsLayoutProps): JSX.Element {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    if (path === '/member/leadership/callings') {
      return location.pathname.startsWith('/member/leadership/callings');
    }
    if (path === '/member/leadership/home') {
      return location.pathname === '/member/leadership/home' || 
             location.pathname === '/member/leadership/' ||
             location.pathname === '/member/leadership';
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="leadership-callings-layout">
      <main className="leadership-callings-content">
        {children}
      </main>

      <nav className="leadership-bottom-nav">
        {leadershipTabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={`leadership-nav-item ${isActive(tab.path) ? 'active' : ''}`}
          >
            <span className="leadership-nav-icon">{tab.icon}</span>
            <span className="leadership-nav-label">{tab.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
