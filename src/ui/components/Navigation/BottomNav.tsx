/**
 * BottomNav - Mode-aware bottom navigation
 * 
 * Shows different tabs based on current app mode:
 * - investigator: Home, Lessons, Journal, Progress, Profile
 * - member: Home, Study, Journal, Progress, Profile
 * - leadership: Panel, Llamamientos, Calendario, Perfil
 */

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHouse, FaBookOpen, FaBookBookmark, FaChartLine, FaUser, FaListCheck, FaCalendar } from 'react-icons/fa6';
import { useMode, AppMode } from '../../../state/mode';
import './BottomNav.css';

interface NavTab {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const INVESTIGATOR_TABS: NavTab[] = [
  { path: '/home', label: 'Inicio', icon: <FaHouse /> },
  { path: '/lessons', label: 'Lecciones', icon: <FaBookOpen /> },
  { path: '/journal', label: 'Diario', icon: <FaBookBookmark /> },
  { path: '/progress', label: 'Progreso', icon: <FaChartLine /> },
  { path: '/profile', label: 'Perfil', icon: <FaUser /> },
];

const MEMBER_TABS: NavTab[] = [
  { path: '/home', label: 'Inicio', icon: <FaHouse /> },
  { path: '/lessons', label: 'Estudio', icon: <FaBookOpen /> },
  { path: '/journal', label: 'Diario', icon: <FaBookBookmark /> },
  { path: '/progress', label: 'Progreso', icon: <FaChartLine /> },
  { path: '/profile', label: 'Perfil', icon: <FaUser /> },
];

const LEADERSHIP_TABS: NavTab[] = [
  { path: '/member/leadership/home', label: 'Panel', icon: <FaHouse /> },
  { path: '/member/leadership/callings', label: 'Llamamientos', icon: <FaListCheck /> },
  { path: '/member/leadership/calendar', label: 'Calendario', icon: <FaCalendar /> },
  { path: '/profile', label: 'Perfil', icon: <FaUser /> },
];

const TABS_BY_MODE: Record<AppMode, NavTab[]> = {
  investigator: INVESTIGATOR_TABS,
  member: MEMBER_TABS,
  leadership: LEADERSHIP_TABS,
};

interface BottomNavProps {
  className?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ className = '' }) => {
  const { mode } = useMode();
  const location = useLocation();
  const tabs = TABS_BY_MODE[mode];

  const isActive = (path: string): boolean => {
    // Special handling for nested routes
    if (path === '/lessons') {
      return location.pathname.startsWith('/lessons');
    }
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
    <nav className={`bottom-nav ${className}`}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={`bottom-nav-item ${isActive(tab.path) ? 'active' : ''}`}
        >
          <span className="bottom-nav-icon">{tab.icon}</span>
          <span className="bottom-nav-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
