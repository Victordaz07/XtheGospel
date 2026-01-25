import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRoleStore } from '../store/useRoleStore';
import { RoleSelectionScreen } from '../pages/auth/RoleSelectionScreen';
import InvestigatorLayout from '../layouts/LearningLayout';
import MissionaryLayout from '../layouts/MissionaryLayout';
import MemberLayout from '../layouts/MemberLayout';
import { LeaderLayout } from '../vineyard/layout/LeaderLayout';
import { MissionaryLeadershipLayout } from '../layouts/MissionaryLeadershipLayout';
import LoadingScreen from '../components/LoadingScreen';
import { getRoleDefaultRoute, UserRoleKey } from '../config/roles';
import { LeadershipRoleService } from '../services/leadershipRoleService';
import { PrivacyPage } from '../pages/legal/PrivacyPage';
import { TermsPage } from '../pages/legal/TermsPage';
import { SupportPage } from '../pages/support/SupportPage';

// Strangler Fig: New Investigator module (MVP)
import InvestigatorRoutes from './InvestigatorRoutes';

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

  // Si hay userRole y está en /auth, redirigir a la sección correcta según el rol usando rutas centralizadas
  if (userRole && location.pathname === '/auth') {
    return <Navigate to={getRoleDefaultRoute(userRole)} replace />;
  }

  // Route protection: redirect to appropriate default route based on role
  if (userRole) {
    const defaultRoute = getRoleDefaultRoute(userRole);
    const isOnMemberRoute = location.pathname.startsWith('/member');
    const isOnLeaderRoute = location.pathname.startsWith('/leader');
    const isOnMemberRole = userRole === 'member';

    // For member role users, check appRole to decide between member or leader layout
    if (isOnMemberRole) {
      if (appRole === 'leader') {
        // User is in leader mode, redirect to leader routes
        if (!isOnLeaderRoute) {
          return <Navigate to="/leader/home" replace />;
        }
      } else {
        // User is in member mode, redirect to member routes
        if (!isOnMemberRoute) {
          return <Navigate to={defaultRoute} replace />;
        }
      }
    }

    // Redirect non-member users away from member/leader routes
    if (!isOnMemberRole && (isOnMemberRoute || isOnLeaderRoute)) {
      return <Navigate to={defaultRoute} replace />;
    }

    // Redirect missionary users away from investigator-only routes
    if (userRole === 'missionary' && (location.pathname.startsWith('/baptism') || location.pathname.startsWith('/progress'))) {
      return <Navigate to={defaultRoute} replace />;
    }

    // Check if missionary has leadership role and should be in leadership layout
    if (userRole === 'missionary') {
      try {
        const leadershipRole = LeadershipRoleService.getCurrentRole();
        const hasLeadershipRole = leadershipRole !== 'none';
        const isOnLeadershipRoute = location.pathname.startsWith('/missionary/leadership');
        
        if (hasLeadershipRole && !isOnLeadershipRoute && location.pathname !== '/missionary/profile') {
          // Allow access to leadership center screen for regular missionaries
          // This is the "Centro de Liderazgo" screen within MissionaryLayout
          if (location.pathname === '/leadership') {
            // Let it through to MissionaryLayout - don't redirect
          } else {
            // Redirect to leadership dashboard
            return <Navigate to={`/missionary/leadership/${leadershipRole}/dashboard`} replace />;
          }
        }
        
        if (!hasLeadershipRole && isOnLeadershipRoute) {
          // Allow identity reminder screen when transitioning from leadership to regular
          if (location.pathname === '/identity-reminder') {
            // Let it through to MissionaryLayout - don't redirect
          } else {
            // Redirect away from leadership routes if no role active
            return <Navigate to={defaultRoute} replace />;
          }
        }
      } catch (error) {
        console.error('Error checking leadership role:', error);
        // Continue with normal flow if there's an error
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
      {/* Strangler Fig: Investigator MVP module - accessible without auth for development */}
      <Route path="/investigator/*" element={<InvestigatorRoutes />} />
      
      {/* Root redirect to Investigator MVP (Strangler Fig entry point) */}
      <Route path="/" element={<Navigate to="/investigator/home" replace />} />
      <Route path="/home" element={<Navigate to="/investigator/home" replace />} />
      
      {/* Legal pages - accessible to everyone */}
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/support" element={<SupportPage />} />
      
      {userRole ? (
        userRole === 'investigator' ? (
          <Route path="/*" element={<InvestigatorLayout />} />
        ) : userRole === 'missionary' ? (
          hasLeadershipRole ? (
            // Missionary with active leadership role
            <Route path="/*" element={<MissionaryLeadershipLayout />} />
          ) : (
            // Regular missionary
            <Route path="/*" element={<MissionaryLayout />} />
          )
        ) : appRole === 'leader' ? (
          // Member role but in leader app mode
          <Route path="/*" element={<LeaderLayout />} />
        ) : (
          // Member role in member app mode
          <Route path="/*" element={<MemberLayout />} />
        )
      ) : (
        <>
          <Route path="/auth" element={<RoleSelectionScreen />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;

