import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import {
  FaHouse,
  FaCalendarDays,
  FaUsers,
  FaHandshake,
  FaBookOpen,
  FaUser,
} from 'react-icons/fa6';
import { useI18n } from '../context/I18nContext';
import { useAuth } from '../context/AuthContext';
import MissionaryHome from '../pages/serving/MissionaryHome';
import MissionaryAgenda from '../pages/serving/MissionaryAgenda';
import MissionaryPeople from '../pages/serving/MissionaryPeople';
import MissionaryLessons from '../pages/serving/MissionaryLessons';
import MissionaryProfile from '../pages/missionary/MissionaryProfile';
import CommitmentsPage from '../pages/CommitmentsPage';
import './Layout.css';

const MissionaryLayout: React.FC = () => {
  const { t } = useI18n();
  const { userRole } = useAuth();
  const location = useLocation();

  const tabs = [
    { path: '/home', label: t('tabs.home'), icon: <FaHouse /> },
    { path: '/agenda', label: t('tabs.agenda'), icon: <FaCalendarDays /> },
    { path: '/people', label: t('tabs.people'), icon: <FaUsers /> },
    { path: '/tasks', label: t('tabs.tasks'), icon: <FaHandshake /> },
    { path: '/lessons', label: t('missionary.header') || 'Mis Lecciones', icon: <FaBookOpen /> },
    { path: '/profile', label: t('tabs.profile'), icon: <FaUser /> },
  ];

  return (
    <div className="layout">
      <div className="layout-shell">
        <div className="layout-deco layout-deco-top" />
        <div className="layout-deco layout-deco-bottom" />
        <main className="layout-content">
          <Routes>
            <Route path="/home" element={<MissionaryHome />} />
            <Route path="/agenda" element={<MissionaryAgenda />} />
            <Route path="/people" element={<MissionaryPeople />} />
            <Route path="/tasks" element={<CommitmentsPage />} />
            <Route path="/lessons/*" element={<MissionaryLessons />} />
            <Route path="/missionary/lessons/*" element={<MissionaryLessons />} />
            <Route path="/profile" element={<MissionaryProfile />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>
      </div>
      <nav className="bottom-nav">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`nav-item ${location.pathname.startsWith(tab.path) ? 'active' : ''}`}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MissionaryLayout;

