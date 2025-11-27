import React from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
  FaHouse,
  FaBookOpen,
  FaHandshake,
  FaChartLine,
  FaUser,
  FaUsers,
  FaGamepad,
  FaBook,
  FaSeedling,
} from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import { MemberHome } from '../pages/MemberHome';
import { StudyModulesPage } from '../pages/StudyModulesPage';
import { ActivitiesPage } from '../pages/ActivitiesPage';
import { ProgressPage } from '../pages/ProgressPage';
import { StudySectionView } from '../components/StudySectionView';
import { MemberConvertidosPage } from '../pages/MemberConvertidosPage';
import { MemberConvertidosDetailPage } from '../pages/MemberConvertidosDetailPage';
import MemberFriends from '../../pages/member/MemberFriends';
import MemberMissionarySupport from '../../pages/member/MemberMissionarySupport';
import MemberProfile from '../../pages/member/MemberProfile';
import { FeaturedContentPage } from '../../pages/member/FeaturedContentPage';
import '../../layouts/Layout.css';

export const MemberLayout: React.FC = () => {
  const { t } = useI18n();
  const location = useLocation();

  // Determine which bottom nav tabs to show based on current page
  const getBottomNavTabs = () => {
    if (location.pathname.startsWith('/member/study')) {
      return [
        { path: '/member/home', label: t('tabs.home'), icon: <FaHouse /> },
        { path: '/member/study', label: t('tabs.lessons'), icon: <FaBookOpen /> },
        { path: '/member/friends', label: t('tabs.tasks'), icon: <FaHandshake /> },
        { path: '/member/progress', label: t('tabs.progress'), icon: <FaChartLine /> },
        { path: '/member/profile', label: t('tabs.profile'), icon: <FaUser /> },
      ];
    }
    if (location.pathname === '/member/activities') {
      return [
        { path: '/member/home', label: t('tabs.home'), icon: <FaHouse /> },
        { path: '/member/friends', label: t('tabs.memberFriends'), icon: <FaUsers /> },
        { path: '/member/activities', label: t('tabs.memberSkills'), icon: <FaGamepad /> },
        { path: '/member/support', label: t('tabs.memberResources'), icon: <FaBook /> },
        { path: '/member/progress', label: t('tabs.progress'), icon: <FaChartLine /> },
      ];
    }
    if (location.pathname === '/member/convertidos') {
      return [
        { path: '/member/home', label: t('tabs.home'), icon: <FaHouse /> },
        { path: '/member/friends', label: t('tabs.memberFriends'), icon: <FaUsers /> },
        { path: '/member/activities', label: t('tabs.memberSkills'), icon: <FaGamepad /> },
        { path: '/member/convertidos', label: t('tabs.memberConversion'), icon: <FaSeedling /> },
        { path: '/member/profile', label: t('tabs.profile'), icon: <FaUser /> },
      ];
    }
    if (location.pathname === '/member/support') {
      return [
        { path: '/member/home', label: t('tabs.home'), icon: <FaHouse /> },
        { path: '/member/friends', label: t('tabs.memberFriends'), icon: <FaUsers /> },
        { path: '/member/activities', label: t('tabs.memberSkills'), icon: <FaGamepad /> },
        { path: '/member/support', label: t('tabs.memberResources'), icon: <FaBook /> },
        { path: '/member/profile', label: t('tabs.profile'), icon: <FaUser /> },
      ];
    }
    if (location.pathname === '/member/friends') {
      return [
        { path: '/member/home', label: t('tabs.home'), icon: <FaHouse /> },
        { path: '/member/friends', label: t('tabs.memberFriends'), icon: <FaUsers /> },
        { path: '/member/activities', label: t('tabs.memberSkills'), icon: <FaGamepad /> },
        { path: '/member/progress', label: t('tabs.progress'), icon: <FaChartLine /> },
        { path: '/member/profile', label: t('tabs.profile'), icon: <FaUser /> },
      ];
    }
    if (location.pathname === '/member/progress') {
      return [
        { path: '/member/home', label: t('tabs.home'), icon: <FaHouse /> },
        { path: '/member/study', label: t('tabs.lessons'), icon: <FaBookOpen /> },
        { path: '/member/friends', label: t('tabs.tasks'), icon: <FaHandshake /> },
        { path: '/member/progress', label: t('tabs.progress'), icon: <FaChartLine /> },
        { path: '/member/profile', label: t('tabs.profile'), icon: <FaUser /> },
      ];
    }
    if (location.pathname === '/member/profile') {
      return [
        { path: '/member/home', label: t('tabs.home'), icon: <FaHouse /> },
        { path: '/member/study', label: t('tabs.lessons'), icon: <FaBookOpen /> },
        { path: '/member/friends', label: t('tabs.tasks'), icon: <FaHandshake /> },
        { path: '/member/progress', label: t('tabs.progress'), icon: <FaChartLine /> },
        { path: '/member/profile', label: t('tabs.profile'), icon: <FaUser /> },
      ];
    }
    // Default for home
    return [
      { path: '/member/home', label: t('tabs.home'), icon: <FaHouse /> },
      { path: '/member/study', label: t('tabs.lessons'), icon: <FaBookOpen /> },
      { path: '/member/friends', label: t('tabs.memberFriends'), icon: <FaUsers /> },
      { path: '/member/progress', label: t('tabs.progress'), icon: <FaChartLine /> },
      { path: '/member/profile', label: t('tabs.profile'), icon: <FaUser /> },
    ];
  };

  const bottomNavTabs = getBottomNavTabs();

  return (
    <div className="layout">
      <div className="layout-shell">
        <div className="layout-deco layout-deco-top" />
        <div className="layout-deco layout-deco-bottom" />
        <main className="layout-content">
          <Routes>
            <Route path="/member" element={<MemberHome />} />
            <Route path="/member/home" element={<MemberHome />} />
            <Route path="/member/study" element={<StudyModulesPage />} />
            <Route path="/member/study/:moduleId" element={<StudySectionView />} />
            <Route path="/member/study/:moduleId/:sectionId" element={<StudySectionView />} />
            <Route path="/member/convertidos" element={<MemberConvertidosPage />} />
            <Route path="/member/convertidos/:sectionId" element={<MemberConvertidosDetailPage />} />
            <Route path="/member/activities" element={<ActivitiesPage />} />
            <Route path="/member/progress" element={<ProgressPage />} />
            <Route path="/member/friends" element={<MemberFriends />} />
            <Route path="/member/support" element={<MemberMissionarySupport />} />
            <Route path="/member/profile" element={<MemberProfile />} />
            <Route path="/member/featured" element={<FeaturedContentPage />} />
            <Route path="*" element={<Navigate to="/member/home" replace />} />
          </Routes>
        </main>
      </div>
      <nav className="bottom-nav">
        {bottomNavTabs.map((tab) => {
          const isActive = location.pathname === tab.path || 
                         (tab.path === '/member/home' && location.pathname === '/member');
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
  );
};

