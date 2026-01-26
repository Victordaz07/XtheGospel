import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { FaHouse, FaBook, FaChartLine, FaUser } from 'react-icons/fa6';
import './NewMemberLayout.css';

interface NavTab {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navTabs: NavTab[] = [
  { path: '/new-member/home', label: 'Home', icon: <FaHouse /> },
  { path: '/new-member/guide', label: 'Guide', icon: <FaBook /> },
  { path: '/new-member/progress', label: 'Progress', icon: <FaChartLine /> },
  { path: '/new-member/profile', label: 'Profile', icon: <FaUser /> },
];

export default function NewMemberLayout(): JSX.Element {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="nm-layout">
      <div className="nm-layout-shell">
        <div className="nm-layout-deco nm-layout-deco-top" />
        <div className="nm-layout-deco nm-layout-deco-bottom" />
        
        <main className="nm-layout-content">
          <Outlet />
        </main>

        <nav className="nm-bottom-nav">
          {navTabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`nm-nav-item ${isActive(tab.path) ? 'active' : ''}`}
            >
              <span className="nm-nav-icon">{tab.icon}</span>
              <span className="nm-nav-label">{tab.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
