import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRoleStore } from '../store/useRoleStore';
import { RoleSelectionScreen } from '../pages/auth/RoleSelectionScreen';
import AuthPage from '../pages/AuthPage';
import RegisterPage from '../pages/RegisterPage';
import InvestigatorLayout from '../layouts/LearningLayout';
import MissionaryLayout from '../layouts/MissionaryLayout';
import MemberLayout from '../layouts/MemberLayout';
import { MissionaryLeadershipLayout } from '../layouts/MissionaryLeadershipLayout';
import LoadingScreen from '../components/LoadingScreen';
import { getRoleDefaultRoute, UserRoleKey } from '../config/roles';
import { LeadershipRoleService } from '../services/leadershipRoleService';
import { PrivacyPage } from '../pages/legal/PrivacyPage';
import { TermsPage } from '../pages/legal/TermsPage';
import { SupportPage } from '../pages/support/SupportPage';

// Strangler Fig: New Investigator module (MVP)
import InvestigatorRoutes from './InvestigatorRoutes';

// Strangler Fig: New Member (Vineyard) module (MVP)
import NewMemberRoutes from './NewMemberRoutes';

// Unified Routes: Journey-aware routing (stage-based content switching)
import UnifiedRoutes from './UnifiedRoutes';
import { ProtectedRoute } from './ProtectedRoute';
import ChatScreen from '../modules/investigator/pages/ChatScreen';
import { StorageService } from '../utils/storage';
import { FIRST_OPEN_WELCOME_KEY } from '../config/welcome';
import FirstOpenWelcome from '../components/FirstOpenWelcome';

const AppRouter: React.FC = () => {
  const { userRole, isLoading } = useAuth();
  const location = useLocation();
  const appRole = useRoleStore((s) => s.role);
  const isHydrated = useRoleStore((s) => s.isHydrated);
  const hydrateRole = useRoleStore((s) => s.hydrateRole);

  useEffect(() => {
    if (!isHydrated) {
      hydrateRole();
    }
  }, [isHydrated, hydrateRole]);

  console.log('🔀 AppRouter - userRole:', userRole, 'appRole:', appRole, 'isLoading:', isLoading, 'pathname:', location.pathname);

  if (isLoading || !isHydrated) {
    console.log('⏳ Mostrando pantalla de carga...');
    return <LoadingScreen />;
  }

  const hasSeenWelcome = StorageService.getItem(FIRST_OPEN_WELCOME_KEY) === 'true';
  if (!hasSeenWelcome && location.pathname !== '/welcome') {
    return <Navigate to="/welcome" replace />;
  }
  if (hasSeenWelcome && location.pathname === '/welcome') {
    return <Navigate to="/register" replace />;
  }

  // Check if user is on a unified route (these are always accessible regardless of userRole)
  const isOnUnifiedRoute = 
    location.pathname === '/' ||
    location.pathname.startsWith('/home') ||
    location.pathname.startsWith('/lessons') ||
    location.pathname.startsWith('/journal') ||
    location.pathname.startsWith('/progress') ||
    location.pathname.startsWith('/profile') ||
    location.pathname.startsWith('/training');

  // Skip role-based redirects for unified routes - let them pass through
  if (isOnUnifiedRoute) {
    // Unified routes are handled directly by the Routes below
    // No role-based protection needed
  } else if (userRole) {
    // LEGACY ROUTE PROTECTION: Only applies to legacy routes (/member, /missionary, etc.)
    const defaultRoute = '/home'; // New default is unified home
    const isOnMemberRoute = location.pathname.startsWith('/member');
    const isOnMissionaryRoute = location.pathname.startsWith('/missionary');
    const isOnMemberRole = userRole === 'member';

    // Redirect non-member users away from member routes
    if (!isOnMemberRole && isOnMemberRoute) {
      return <Navigate to={defaultRoute} replace />;
    }

    // Redirect non-missionary users away from missionary routes
    if (userRole !== 'missionary' && isOnMissionaryRoute) {
      return <Navigate to={defaultRoute} replace />;
    }

    // Check if missionary has leadership role and should be in leadership layout
    if (userRole === 'missionary' && isOnMissionaryRoute) {
      try {
        const leadershipRole = LeadershipRoleService.getCurrentRole();
        const hasLeadershipRole = leadershipRole !== 'none';
        const isOnLeadershipRoute = location.pathname.startsWith('/missionary/leadership');
        
        if (hasLeadershipRole && !isOnLeadershipRoute && location.pathname !== '/missionary/profile') {
          if (location.pathname !== '/leadership') {
            return <Navigate to={`/missionary/leadership/${leadershipRole}/dashboard`} replace />;
          }
        }
        
        if (!hasLeadershipRole && isOnLeadershipRoute) {
          if (location.pathname !== '/identity-reminder') {
            return <Navigate to="/missionary/home" replace />;
          }
        }
      } catch (error) {
        console.error('Error checking leadership role:', error);
      }
    }
  }

  // Check if missionary has leadership role active
  let leadershipRole: string = 'none';
  let hasLeadershipRole = false;
  
  if (userRole === 'missionary') {
    try {
      leadershipRole = LeadershipRoleService.getCurrentRole();
      hasLeadershipRole = leadershipRole !== 'none';
    } catch (error) {
      console.error('Error getting leadership role:', error);
      // Default to 'none' if there's an error
      leadershipRole = 'none';
      hasLeadershipRole = false;
    }
  }

  return (
    <Routes>
      {/* ROOT: Redirect to unified home */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* First open welcome */}
      <Route path="/welcome" element={<FirstOpenWelcome />} />
      
      {/* UNIFIED ROUTES: Main app flow - stage-based content switching */}
      {/* Públicas: /home, /lessons (investigador entra sin fricción) */}
      <Route path="/home/*" element={<UnifiedRoutes />} />
      <Route path="/lessons/*" element={<UnifiedRoutes />} />
      {/* Privadas: requieren auth - redirigen a /login?redirect=... si no hay user */}
      <Route path="/journal/*" element={<ProtectedRoute><UnifiedRoutes /></ProtectedRoute>} />
      <Route path="/progress/*" element={<ProtectedRoute><UnifiedRoutes /></ProtectedRoute>} />
      <Route path="/profile/*" element={<ProtectedRoute><UnifiedRoutes /></ProtectedRoute>} />
      <Route path="/training/*" element={<ProtectedRoute><UnifiedRoutes /></ProtectedRoute>} />
      <Route path="/chat/:conversationId" element={<ProtectedRoute><ChatScreen /></ProtectedRoute>} />
      
      {/* Auth: Registration and Login with Firebase */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<RegisterPage />} />
      
      {/* LEGACY: Auth/Role selection - moved to /legacy/auth */}
      <Route path="/legacy/auth" element={<RoleSelectionScreen />} />
      {/* Compatibility redirect: /auth -> new register page */}
      <Route path="/auth" element={<Navigate to="/register" replace />} />
      
      {/* DEV-ONLY: Direct module access (keep for testing) */}
      <Route path="/investigator/*" element={<InvestigatorRoutes />} />
      <Route path="/new-member/*" element={<NewMemberRoutes />} />
      
      {/* Legal pages - accessible to everyone */}
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/support" element={<SupportPage />} />
      
      {/* LEGACY ROLE-BASED LAYOUTS: Only used when userRole is set and navigating to legacy routes */}
      {userRole ? (
        userRole === 'investigator' ? (
          <Route path="/legacy/*" element={<InvestigatorLayout />} />
        ) : userRole === 'missionary' ? (
          hasLeadershipRole ? (
            // Missionary with active leadership role
            <Route path="/missionary/*" element={<MissionaryLeadershipLayout />} />
          ) : (
            // Regular missionary
            <Route path="/missionary/*" element={<MissionaryLayout />} />
          )
        ) : (
          // Member role
          <Route path="/member/*" element={<MemberLayout />} />
        )
      ) : null}
      
      {/* Catch-all: redirect unknown routes to unified home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRouter;

