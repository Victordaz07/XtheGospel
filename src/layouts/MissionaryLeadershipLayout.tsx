import React, { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { 
  LeadershipRole, 
  getLeadershipRoleConfig,
  missionaryLeadershipMaster 
} from '../data/missionary/leadershipMode';
import { 
  getLeadershipRoleEnhanced 
} from '../data/missionary/leadershipModeEnhanced';
import { getTabIcon } from '../utils/leadershipTabIcons';
import { LeadershipRoleService } from '../services/leadershipRoleService';
import { DistrictLeaderDashboard } from '../pages/missionary/leadership/DistrictLeaderDashboard';
import { ZoneLeaderDashboard } from '../pages/missionary/leadership/ZoneLeaderDashboard';
import { AssistantToPresidentDashboard } from '../pages/missionary/leadership/AssistantToPresidentDashboard';
import { LeadershipTabScreen } from '../pages/missionary/leadership/LeadershipTabScreen';
import { PersonalNotesScreen } from '../pages/missionary/leadership/PersonalNotesScreen';
import { FloatingMenu } from '../ui/components';
import '../pages/Page.css';
import '../layouts/Layout.css';
import './MissionaryLeadershipLayout.css';

// Screens funcionales para tabs del Líder de Distrito
const DistrictMeetingScreen = () => <LeadershipTabScreen roleId="districtLeader" tabId="district_council" />;
const ExchangesScreen = () => <LeadershipTabScreen roleId="districtLeader" tabId="exchanges" />;
const BaptismalInterviewsScreen = () => <LeadershipTabScreen roleId="districtLeader" tabId="baptismal_interviews" />;
const ZoneLeaderMessagesScreen = () => <LeadershipTabScreen roleId="districtLeader" tabId="zone_messages" />;
const DistrictDashboardTabScreen = () => <LeadershipTabScreen roleId="districtLeader" tabId="dashboard" />;

const ZoneCouncilScreen = () => <PlaceholderScreen title="Consejo de zona" description="Participa en consejos de zona" />;
const PersonalizedSupportScreen = () => <PlaceholderScreen title="Apoyo personalizado" description="Brinda apoyo específico a cada misionero" />;
const SuggestedTransfersScreen = () => <PlaceholderScreen title="Transferencias sugeridas" description="Gestiona sugerencias de transferencias" />;
const ConferenceAttendanceScreen = () => <PlaceholderScreen title="Asistencia a conferencias" description="Registra asistencia a conferencias" />;
const TrainingResourcesScreen = () => <PlaceholderScreen title="Recursos de capacitación" description="Accede a materiales de capacitación" />;

const CouncilMeetingsScreen = () => <PlaceholderScreen title="Reuniones de consejo" description="Gestiona reuniones de consejo de misión" />;
const TravelsTransfersScreen = () => <PlaceholderScreen title="Viajes / Transferencias" description="Planifica viajes y transferencias" />;
const TrainingPlanningScreen = () => <PlaceholderScreen title="Planificación de capacitaciones" description="Organiza capacitaciones para la misión" />;
const ZoneFeedbackScreen = () => <PlaceholderScreen title="Feedback de zonas" description="Recibe y gestiona feedback de zonas" />;
const LeadersChatScreen = () => <PlaceholderScreen title="Chat interno con líderes" description="Comunícate con otros líderes" />;

export const MissionaryLeadershipLayout: React.FC = () => {
  const location = useLocation();
  const [currentRole, setCurrentRole] = useState<LeadershipRole>('none');
  const [roleConfig, setRoleConfig] = useState(getLeadershipRoleConfig('none'));

  useEffect(() => {
    const role = LeadershipRoleService.getCurrentRole();
    setCurrentRole(role);
    const config = getLeadershipRoleConfig(role);
    setRoleConfig(config);
  }, [location.pathname]);

  // Si no hay rol de liderazgo activo, redirigir al modo misionero normal
  if (currentRole === 'none') {
    return <Navigate to="/missionary/home" replace />;
  }

  if (!roleConfig) {
    return <Navigate to="/missionary/home" replace />;
  }

  // Generar tabs según el rol usando la estructura enriquecida
  const getTabsForRole = () => {
    const basePath = '/missionary/leadership';
    const enhancedRole = getLeadershipRoleEnhanced(currentRole);
    
    if (enhancedRole) {
      return enhancedRole.tabs.map((tab) => ({
        path: `${basePath}/${currentRole}/${tab.id}`,
        label: tab.title,
        icon: getTabIcon(tab.id, tab.icon)
      }));
    }
    
    // Fallback a estructura antigua si no hay datos enriquecidos
    return roleConfig.tabs.map((tab) => {
      const tabId = tab.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[áàäâ]/g, 'a')
        .replace(/[éèëê]/g, 'e')
        .replace(/[íìïî]/g, 'i')
        .replace(/[óòöô]/g, 'o')
        .replace(/[úùüû]/g, 'u')
        .replace(/[ñ]/g, 'n')
        .replace(/[^a-z0-9-]/g, '');
      return {
        path: `${basePath}/${currentRole}/${tabId}`,
        label: tab,
        icon: getTabIcon(tabId)
      };
    });
  };

  const enhancedRole = getLeadershipRoleEnhanced(currentRole);
  const dashboardTab = enhancedRole?.tabs.find(t => t.id === 'dashboard');
  
  // Si hay un tab de dashboard en los tabs, incluirlo; si no, usar el dashboard por defecto
  const allTabs = getTabsForRole();
  const hasDashboardTab = allTabs.some(tab => tab.path.includes('/dashboard'));
  
  const tabs = hasDashboardTab 
    ? allTabs
    : [
        { 
          path: `/missionary/leadership/${currentRole}/dashboard`, 
          label: dashboardTab?.title || 'Dashboard', 
          icon: getTabIcon('dashboard', dashboardTab?.icon) 
        },
        ...allTabs
      ];

  return (
    <div className="layout">
      <div className="layout-shell" style={{ '--leadership-color': roleConfig.color } as React.CSSProperties}>
        <div className="layout-deco layout-deco-top" />
        <div className="layout-deco layout-deco-bottom" />
        <FloatingMenu tabs={tabs} />
        <main className="layout-content">
          <Routes>
            <Route path={`/missionary/leadership/${currentRole}`} element={<Navigate to={`/missionary/leadership/${currentRole}/dashboard`} replace />} />
            
            {/* District Leader Routes */}
            <Route path="/missionary/leadership/districtLeader/dashboard" element={<DistrictLeaderDashboard />} />
            <Route path="/missionary/leadership/districtLeader/district_council" element={<DistrictMeetingScreen />} />
            <Route path="/missionary/leadership/districtLeader/exchanges" element={<ExchangesScreen />} />
            <Route path="/missionary/leadership/districtLeader/baptismal_interviews" element={<BaptismalInterviewsScreen />} />
            <Route path="/missionary/leadership/districtLeader/personal_notes" element={<PersonalNotesScreen />} />
            <Route path="/missionary/leadership/districtLeader/zone_messages" element={<ZoneLeaderMessagesScreen />} />
            {/* Legacy routes for backwards compatibility */}
            <Route path="/missionary/leadership/districtLeader/reunion-de-distrito" element={<DistrictMeetingScreen />} />
            <Route path="/missionary/leadership/districtLeader/intercambios" element={<ExchangesScreen />} />
            <Route path="/missionary/leadership/districtLeader/entrevistas-bautismales" element={<BaptismalInterviewsScreen />} />
            <Route path="/missionary/leadership/districtLeader/notas-personales" element={<PersonalNotesScreen />} />
            <Route path="/missionary/leadership/districtLeader/mensajes-del-lider-de-zona" element={<ZoneLeaderMessagesScreen />} />

            {/* Zone Leader Routes */}
            <Route path="/missionary/leadership/zoneLeader/dashboard" element={<ZoneLeaderDashboard />} />
            <Route path="/missionary/leadership/zoneLeader/zone_council" element={<ZoneCouncilScreen />} />
            <Route path="/missionary/leadership/zoneLeader/zone_exchanges" element={<PersonalizedSupportScreen />} />
            <Route path="/missionary/leadership/zoneLeader/zone_reports" element={<SuggestedTransfersScreen />} />
            <Route path="/missionary/leadership/zoneLeader/zone_communication" element={<ConferenceAttendanceScreen />} />
            <Route path="/missionary/leadership/zoneLeader/personal_notes" element={<PersonalNotesScreen />} />
            {/* Legacy routes */}
            <Route path="/missionary/leadership/zoneLeader/consejo-de-zona" element={<ZoneCouncilScreen />} />
            <Route path="/missionary/leadership/zoneLeader/apoyo-personalizado-por-misionero" element={<PersonalizedSupportScreen />} />
            <Route path="/missionary/leadership/zoneLeader/transferencias-sugeridas" element={<SuggestedTransfersScreen />} />
            <Route path="/missionary/leadership/zoneLeader/asistencia-a-conferencias" element={<ConferenceAttendanceScreen />} />
            <Route path="/missionary/leadership/zoneLeader/recursos-de-capacitacion" element={<TrainingResourcesScreen />} />
            <Route path="/missionary/leadership/zoneLeader/notas-personales" element={<PersonalNotesScreen />} />

            {/* Assistant to President Routes */}
            <Route path="/missionary/leadership/assistantToPresident/dashboard" element={<AssistantToPresidentDashboard />} />
            <Route path="/missionary/leadership/assistantToPresident/mission_leaders_council" element={<CouncilMeetingsScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/transfers_planning" element={<TravelsTransfersScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/office_admin" element={<TrainingPlanningScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/field_tours" element={<ZoneFeedbackScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/ap_companionship" element={<LeadersChatScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/personal_notes" element={<PersonalNotesScreen />} />
            {/* Legacy routes */}
            <Route path="/missionary/leadership/assistantToPresident/reuniones-de-consejo" element={<CouncilMeetingsScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/viajes-giras-transferencias" element={<TravelsTransfersScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/planificacion-de-capacitaciones" element={<TrainingPlanningScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/feedback-de-zonas" element={<ZoneFeedbackScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/chat-interno-con-lideres" element={<LeadersChatScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/notas-personales" element={<PersonalNotesScreen />} />

            <Route path="*" element={<Navigate to={`/missionary/leadership/${currentRole}/dashboard`} replace />} />
          </Routes>
        </main>
        <nav className="bottom-nav leadership-bottom-nav" style={{ '--leadership-color': roleConfig.color } as React.CSSProperties}>
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path || 
              (tab.path.includes('/dashboard') && location.pathname === `/missionary/leadership/${currentRole}`) ||
              (tab.path !== `/missionary/leadership/${currentRole}/dashboard` && location.pathname.startsWith(tab.path));
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                style={isActive ? { color: roleConfig.color } : {}}
                title={tab.label}
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

