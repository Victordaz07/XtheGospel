import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import {
  FaHouse,
  FaBookOpen,
  FaHandshake,
  FaChartLine,
  FaDroplet,
  FaUser,
} from 'react-icons/fa6';
import { useI18n } from '../context/I18nContext';
import InvestigatorHome from '../pages/learning/InvestigatorHome';
import InvestigatorLessons from '../pages/learning/InvestigatorLessons';
import InvestigatorProgress from '../pages/learning/InvestigatorProgress';
import InvestigatorBaptism from '../pages/learning/InvestigatorBaptism';
import InvestigatorProfile from '../pages/learning/InvestigatorProfile';
import CommitmentsPage from '../pages/CommitmentsPage';
import GodStoryPage from '../pages/learning/GodStoryPage';
import DifficultQuestionsPage from '../pages/learning/DifficultQuestionsPage';
import './Layout.css';

const InvestigatorLayout: React.FC = () => {
  const { t } = useI18n();
  const location = useLocation();

  const tabs = [
    { path: '/home', label: t('tabs.home'), icon: <FaHouse /> },
    { path: '/lessons', label: t('tabs.lessons'), icon: <FaBookOpen /> },
    { path: '/tasks', label: t('tabs.tasks'), icon: <FaHandshake /> },
    { path: '/progress', label: t('tabs.progress'), icon: <FaChartLine /> },
    { path: '/baptism', label: t('tabs.baptism'), icon: <FaDroplet /> },
    { path: '/profile', label: t('tabs.profile'), icon: <FaUser /> },
  ];

  return (
    <div className="layout">
      <div className="layout-shell">
        <div className="layout-deco layout-deco-top" />
        <div className="layout-deco layout-deco-bottom" />
        <main className="layout-content">
          <Routes>
            <Route path="/home" element={<InvestigatorHome />} />
            <Route path="/lessons/*" element={<InvestigatorLessons />} />
            <Route path="/tasks" element={<CommitmentsPage />} />
            <Route path="/progress" element={<InvestigatorProgress />} />
            <Route path="/baptism" element={<InvestigatorBaptism />} />
            <Route path="/profile" element={<InvestigatorProfile />} />
            <Route path="/god-story" element={<GodStoryPage />} />
            <Route path="/difficult-questions" element={<DifficultQuestionsPage />} />
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

export default InvestigatorLayout;

