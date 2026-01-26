import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHouse, FaBookOpen, FaBookBookmark, FaChartLine, FaUser } from 'react-icons/fa6';
import { useJourneyStage } from '../core/journey/useJourneyStore';
import './UnifiedLayout.css';

interface NavTab {
  path: string;
  label: string;
  icon: React.ReactNode;
}

// Same 5 tabs always - using unified paths
const navTabs: NavTab[] = [
  { path: '/home', label: 'Home', icon: <FaHouse /> },
  { path: '/lessons', label: 'Lessons', icon: <FaBookOpen /> },
  { path: '/journal', label: 'Journal', icon: <FaBookBookmark /> },
  { path: '/progress', label: 'Progress', icon: <FaChartLine /> },
  { path: '/profile', label: 'Profile', icon: <FaUser /> },
];

interface UnifiedLayoutProps {
  children: React.ReactNode;
}

export default function UnifiedLayout({ children }: UnifiedLayoutProps): JSX.Element {
  const location = useLocation();
  const stage = useJourneyStage();

  const isActive = (path: string): boolean => {
    if (path === '/lessons') {
      return location.pathname.startsWith('/lessons');
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className={`unified-layout unified-layout--${stage}`}>
      <div className="unified-layout-shell">
        <div className="unified-layout-deco unified-layout-deco-top" />
        <div className="unified-layout-deco unified-layout-deco-bottom" />
        
        <main className="unified-layout-content">
          {children}
        </main>

        <nav className="unified-bottom-nav">
          {navTabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`unified-nav-item ${isActive(tab.path) ? 'active' : ''}`}
            >
              <span className="unified-nav-icon">{tab.icon}</span>
              <span className="unified-nav-label">{tab.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
