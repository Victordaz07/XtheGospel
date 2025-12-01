import React from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
  FaBolt,
  FaPeopleGroup,
  FaBookOpen,
  FaCalendar,
  FaTimeline,
  FaShield,
  FaHome,
  FaUser,
} from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import { FloatingMenu } from '../../ui/components';
import { LeaderTodayPanelScreen } from '../../pages/member/LeaderTodayPanelScreen';
import { LeaderNewConvertsScreen } from '../../pages/member/LeaderNewConvertsScreen';
import { LeaderFriendsTeachingScreen } from '../../pages/member/LeaderFriendsTeachingScreen';
import { LeaderMeetingsResourcesScreen } from '../../pages/member/LeaderMeetingsResourcesScreen';
import { LeaderIntegrationMapScreen } from '../../pages/member/LeaderIntegrationMapScreen';
import { LeaderGuidelinesScreen } from '../../pages/member/LeaderGuidelinesScreen';
import { ConvertPath12WeeksScreen } from '../../pages/member/ConvertPath12WeeksScreen';
import { LeaderNewConvertsExtendedScreen } from '../../pages/member/LeaderNewConvertsExtendedScreen';
import { LeaderFriendsExtendedScreen } from '../../pages/member/LeaderFriendsExtendedScreen';
import { LeaderGuideExtendedScreen } from '../../pages/member/LeaderGuideExtendedScreen';
import { MemberLeaderView } from '../../components/member/MemberLeaderView';
import MemberProfile from '../../pages/member/MemberProfile';
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
    { path: '/leader/guidelines', label: 'Guía', icon: <FaShield /> },
    { path: '/leader/profile', label: t('tabs.profile'), icon: <FaUser /> },
  ];

  return (
    <div className="layout">
      <div className="layout-shell">
        <div className="layout-deco layout-deco-top" />
        <div className="layout-deco layout-deco-bottom" />
        <FloatingMenu tabs={bottomNavTabs} />
        <main className="layout-content">
          <Routes>
            <Route
              path="/leader"
              element={<Navigate to="/leader/home" replace />}
            />
            <Route path="/leader/home" element={<LeaderTodayPanelScreen />} />
            <Route
              path="/leader/converts"
              element={<LeaderNewConvertsScreen />}
            />
            <Route
              path="/leader/converts/extended"
              element={<LeaderNewConvertsExtendedScreen />}
            />
            <Route
              path="/leader/friends"
              element={<LeaderFriendsTeachingScreen />}
            />
            <Route
              path="/leader/friends/extended"
              element={<LeaderFriendsExtendedScreen />}
            />
            <Route
              path="/leader/meetings"
              element={<LeaderMeetingsResourcesScreen />}
            />
            <Route
              path="/leader/meetings/convert-path"
              element={<ConvertPath12WeeksScreen />}
            />
            <Route
              path="/leader/map"
              element={<LeaderIntegrationMapScreen />}
            />
            <Route
              path="/leader/guidelines"
              element={<LeaderGuidelinesScreen />}
            />
            <Route
              path="/leader/guidelines/extended"
              element={<LeaderGuideExtendedScreen />}
            />
            <Route path="/leader/profile" element={<MemberProfile />} />
            <Route path="*" element={<Navigate to="/leader/home" replace />} />
          </Routes>
        </main>
        <nav className="bottom-nav">
          {bottomNavTabs.map(tab => {
            // Mejorar la detección de tab activo para incluir rutas hijas
            let isActive = false;
            if (tab.path === '/leader/home') {
              isActive =
                location.pathname === '/leader' ||
                location.pathname === '/leader/home';
            } else if (tab.path === '/leader/converts') {
              isActive =
                location.pathname === '/leader/converts' ||
                location.pathname.startsWith('/leader/converts/');
            } else if (tab.path === '/leader/friends') {
              isActive =
                location.pathname === '/leader/friends' ||
                location.pathname.startsWith('/leader/friends/');
            } else if (tab.path === '/leader/meetings') {
              isActive =
                location.pathname === '/leader/meetings' ||
                location.pathname.startsWith('/leader/meetings/');
            } else if (tab.path === '/leader/map') {
              isActive =
                location.pathname === '/leader/map' ||
                location.pathname.startsWith('/leader/map/');
            } else if (tab.path === '/leader/guidelines') {
              isActive =
                location.pathname === '/leader/guidelines' ||
                location.pathname.startsWith('/leader/guidelines/');
            } else if (tab.path === '/leader/profile') {
              isActive = location.pathname === '/leader/profile';
            } else {
              isActive = location.pathname === tab.path;
            }

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
