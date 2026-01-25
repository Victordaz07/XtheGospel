import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { FaHouse, FaBookOpen, FaBookBookmark, FaChartLine, FaUser } from 'react-icons/fa6';
import './InvestigatorLayout.css';

interface NavTab {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navTabs: NavTab[] = [
  { path: '/investigator/home', label: 'Home', icon: <FaHouse /> },
  { path: '/investigator/lessons', label: 'Lessons', icon: <FaBookOpen /> },
  { path: '/investigator/journal', label: 'Journal', icon: <FaBookBookmark /> },
  { path: '/investigator/progress', label: 'Progress', icon: <FaChartLine /> },
  { path: '/investigator/profile', label: 'Profile', icon: <FaUser /> },
];

export default function InvestigatorLayout(): JSX.Element {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    if (path === '/investigator/lessons') {
      return location.pathname.startsWith('/investigator/lessons');
    }
    return location.pathname === path;
  };

  return (
    <div className="inv-layout">
      <div className="inv-layout-shell">
        <div className="inv-layout-deco inv-layout-deco-top" />
        <div className="inv-layout-deco inv-layout-deco-bottom" />
        
        <main className="inv-layout-content">
          <Outlet />
        </main>

        <nav className="inv-bottom-nav">
          {navTabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`inv-nav-item ${isActive(tab.path) ? 'active' : ''}`}
            >
              <span className="inv-nav-icon">{tab.icon}</span>
              <span className="inv-nav-label">{tab.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
