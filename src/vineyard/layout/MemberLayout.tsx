import React, { useMemo } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
  FaHouse,
  FaBookOpen,
  FaChartLine,
  FaUser,
  FaUsers,
  FaCircleQuestion,
} from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import { FloatingMenu } from '../../ui/components';
import { MemberHome } from '../pages/MemberHome';
import { StudyModulesPage } from '../pages/StudyModulesPage';
import { ActivitiesPage } from '../pages/ActivitiesPage';
import { ProgressPage } from '../pages/ProgressPage';
import { StudySectionView } from '../components/StudySectionView';
import { MemberConvertidosPage } from '../pages/MemberConvertidosPage';
import { MemberConvertidosDetailPage } from '../pages/MemberConvertidosDetailPage';
import MemberFriends from '../../pages/member/MemberFriends';
import MemberMissionarySupport from '../../pages/member/MemberMissionarySupport';
// Member Mode 2.0 screens
import MemberHomeScreen from '../../pages/member/MemberHomeScreen';
import MemberFriendsScreen from '../../pages/member/MemberFriendsScreen';
import MemberTrainingCenterScreen from '../../pages/member/MemberTrainingCenterScreen';
import MemberHelpPanelScreen from '../../pages/member/MemberHelpPanelScreen';
import NewConvertCareScreen from '../../pages/member/NewConvertCareScreen';
import { MissionaryProfileScreen } from '../../pages/profile/MissionaryProfileScreen';
import { FeaturedContentPage } from '../../pages/member/FeaturedContentPage';
// Member Mode - Diary, Transfers, Photos, Resources, Missionary Guide
import MemberDiary from '../../pages/member/MemberDiary';
import MemberTransfers from '../../pages/member/MemberTransfers';
import MemberPhotos from '../../pages/member/MemberPhotos';
import MemberResources from '../../pages/member/MemberResources';
import MemberMissionaryGuide from '../../pages/member/MemberMissionaryGuide';
import '../../layouts/Layout.css';

/**
 * Single source of truth for MEMBER role bottom navigation tabs.
 * This configuration is ALWAYS used regardless of the current route.
 *
 * Tabs are displayed in this exact order:
 * 1. Inicio (Home) - Member Mode 2.0
 * 2. Mis Amigos (Friends) - Member Mode 2.0
 * 3. Entrenamiento (Training) - Member Mode 2.0
 * 4. Ayuda (Help Panel) - Member Mode 2.0
 * 5. Perfil (Profile)
 */
export const MEMBER_TABS_CONFIG = [
  {
    path: '/member/home',
    translationKey: 'tabs.home',
    icon: FaHouse,
  },
  {
    path: '/member/friends',
    translationKey: 'tabs.memberFriends',
    icon: FaUsers,
  },
  {
    path: '/member/training',
    translationKey: 'tabs.memberTraining',
    icon: FaBookOpen,
  },
  {
    path: '/member/help-panel',
    translationKey: 'tabs.memberHelpPanel',
    icon: FaCircleQuestion,
  },
  {
    path: '/member/profile',
    translationKey: 'tabs.profile',
    icon: FaUser,
  },
] as const;

export const MemberLayout: React.FC = () => {
  const { t } = useI18n();
  const location = useLocation();

  // Create stable tab configuration - NEVER changes based on route
  const bottomNavTabs = useMemo(() => {
    return MEMBER_TABS_CONFIG.map(tab => ({
      path: tab.path,
      label: t(tab.translationKey),
      icon: React.createElement(tab.icon),
    }));
  }, [t]);

  const isProfilePage = location.pathname === '/member/profile';

  return (
    <div className="layout">
      <div
        className={`layout-shell ${isProfilePage ? 'layout-shell-profile' : ''}`}
      >
        <div className="layout-deco layout-deco-top" />
        <div className="layout-deco layout-deco-bottom" />
        <FloatingMenu tabs={bottomNavTabs} />
        <main className="layout-content">
          <Routes>
            {/* Member Mode 2.0 - New screens */}
            <Route path="/member" element={<MemberHomeScreen />} />
            <Route path="/member/home" element={<MemberHomeScreen />} />
            <Route path="/member/friends" element={<MemberFriendsScreen />} />
            <Route
              path="/member/training"
              element={<MemberTrainingCenterScreen />}
            />
            <Route
              path="/member/help-panel"
              element={<MemberHelpPanelScreen />}
            />
            <Route
              path="/member/new-converts"
              element={<NewConvertCareScreen />}
            />

            {/* Member Mode - Diary, Transfers, Photos, Resources, Missionary Guide */}
            <Route path="/member/diary" element={<MemberDiary />} />
            <Route path="/member/transfers" element={<MemberTransfers />} />
            <Route path="/member/photos" element={<MemberPhotos />} />
            <Route path="/member/resources" element={<MemberResources />} />
            <Route
              path="/member/missionary-guide"
              element={<MemberMissionaryGuide />}
            />

            {/* Legacy routes - keeping for backward compatibility */}
            <Route path="/member/study" element={<StudyModulesPage />} />
            <Route
              path="/member/study/:moduleId"
              element={<StudySectionView />}
            />
            <Route
              path="/member/study/:moduleId/:sectionId"
              element={<StudySectionView />}
            />
            <Route
              path="/member/convertidos"
              element={<MemberConvertidosPage />}
            />
            <Route
              path="/member/convertidos/:sectionId"
              element={<MemberConvertidosDetailPage />}
            />
            <Route path="/member/activities" element={<ActivitiesPage />} />
            <Route path="/member/progress" element={<ProgressPage />} />
            <Route
              path="/member/support"
              element={<MemberMissionarySupport />}
            />
            <Route
              path="/member/profile"
              element={<MissionaryProfileScreen />}
            />
            <Route path="/member/featured" element={<FeaturedContentPage />} />
            <Route path="*" element={<Navigate to="/member/home" replace />} />
          </Routes>
        </main>
        <nav className="bottom-nav">
          {bottomNavTabs.map(tab => {
            // Determine if this tab is active
            // Handle exact matches and nested routes (e.g., /member/study/:moduleId)
            const isActive =
              location.pathname === tab.path ||
              (tab.path === '/member/home' &&
                location.pathname === '/member') ||
              (tab.path !== '/member/home' &&
                location.pathname.startsWith(tab.path));
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
