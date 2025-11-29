import React from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
  FaBolt,
  FaPeopleGroup,
  FaBookOpen,
  FaCalendar,
  FaTimeline,
  FaShieldAlt,
  FaHome,
} from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import { FloatingMenu } from '../../ui/components';
import { LeaderTodayPanelScreen } from '../../pages/member/LeaderTodayPanelScreen';
import { LeaderNewConvertsScreen } from '../../pages/member/LeaderNewConvertsScreen';
import { LeaderFriendsTeachingScreen } from '../../pages/member/LeaderFriendsTeachingScreen';
import { LeaderMeetingsResourcesScreen } from '../../pages/member/LeaderMeetingsResourcesScreen';
import { LeaderIntegrationMapScreen } from '../../pages/member/LeaderIntegrationMapScreen';
import { LeaderGuidelinesScreen } from '../../pages/member/LeaderGuidelinesScreen';
import { MemberLeaderView } from '../../components/member/MemberLeaderView';
import '../../layouts/Layout.css';

export const LeaderLayout: React.FC = () => {
  const { t } = useI18n();
  const location = useLocation();

  const bottomNavTabs = [
    { path: '/leader/home', label: 'Hoy', icon: <FaBolt /> },
    { path: '/leader/converts', label: 'Conversos', icon: <FaPeopleGroup /> },
    { path: '/leader/friends', label: 'Amigos', icon: <FaBookOpen /> },
    { path: '/leader/meetings', label: 'Reuniones', icon: <FaCalendar /> },
    { path: '/leader/map', label: 'Mapa 12m', icon: <FaTimeline /> },
    { path: '/leader/guidelines', label: 'Guía', icon: <FaShieldAlt /> },
  ];

  return (
    <div className="layout">
      <div className="layout-shell">
        <div className="layout-deco layout-deco-top" />
        <div className="layout-deco layout-deco-bottom" />
        <FloatingMenu tabs={bottomNavTabs} />
        <main className="layout-content">
          <Routes>
            <Route path="/leader" element={<Navigate to="/leader/home" replace />} />
            <Route path="/leader/home" element={<LeaderTodayPanelScreen />} />
            <Route path="/leader/converts" element={<LeaderNewConvertsScreen />} />
            <Route path="/leader/friends" element={<LeaderFriendsTeachingScreen />} />
            <Route path="/leader/meetings" element={<LeaderMeetingsResourcesScreen />} />
            <Route path="/leader/map" element={<LeaderIntegrationMapScreen />} />
            <Route path="/leader/guidelines" element={<LeaderGuidelinesScreen />} />
            <Route path="*" element={<Navigate to="/leader/home" replace />} />
          </Routes>
        </main>
        <nav className="bottom-nav">
          {bottomNavTabs.map((tab) => {
            const isActive = location.pathname === tab.path || 
                           (tab.path === '/leader/home' && location.pathname === '/leader');
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">{tab.icon}</span>
                <span className="nav-label">{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

