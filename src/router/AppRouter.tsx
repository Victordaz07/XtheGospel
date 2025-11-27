import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthPage from '../pages/AuthPage';
import InvestigatorLayout from '../layouts/LearningLayout';
import MissionaryLayout from '../layouts/MissionaryLayout';
import MemberLayout from '../layouts/MemberLayout';
import LoadingScreen from '../components/LoadingScreen';
import { getRoleDefaultRoute, UserRoleKey } from '../config/roles';

const AppRouter: React.FC = () => {
  const { userRole, isLoading } = useAuth();
  const location = useLocation();

  console.log('🔀 AppRouter - userRole:', userRole, 'isLoading:', isLoading, 'pathname:', location.pathname);

  if (isLoading) {
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
    const isOnMemberRole = userRole === 'member';

    // Redirect member users to member routes if they're not already there
    if (isOnMemberRole && !isOnMemberRoute) {
      return <Navigate to={defaultRoute} replace />;
    }

    // Redirect non-member users away from member routes
    if (!isOnMemberRole && isOnMemberRoute) {
      return <Navigate to={defaultRoute} replace />;
    }

    // Redirect missionary users away from investigator-only routes
    if (userRole === 'missionary' && (location.pathname.startsWith('/baptism') || location.pathname.startsWith('/progress'))) {
      return <Navigate to={defaultRoute} replace />;
    }
  }

  return (
    <Routes>
      {userRole ? (
        userRole === 'investigator' ? (
          <Route path="/*" element={<InvestigatorLayout />} />
        ) : userRole === 'missionary' ? (
          <Route path="/*" element={<MissionaryLayout />} />
        ) : (
          <Route path="/*" element={<MemberLayout />} />
        )
      ) : (
        <>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;

