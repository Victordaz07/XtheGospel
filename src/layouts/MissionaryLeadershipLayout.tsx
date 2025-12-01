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
import { DistrictCouncilScreen } from '../pages/missionary/leadership/DistrictCouncilScreen';
import { ZoneCouncilScreen } from '../pages/missionary/leadership/ZoneCouncilScreen';
import { ExchangeScreen } from '../pages/missionary/leadership/ExchangeScreen';
import { BaptismalInterviewScreen } from '../pages/missionary/leadership/BaptismalInterviewScreen';
import { LeaderMessageScreen } from '../pages/missionary/leadership/LeaderMessageScreen';
import { PersonalNotesScreen } from '../pages/missionary/leadership/PersonalNotesScreen';
import { TransferPlanScreen } from '../pages/missionary/leadership/TransferPlanScreen';
import { ZoneLeaderMessagesScreen } from '../pages/missionary/leadership/ZoneLeaderMessagesScreen';
import { LeadershipProfileScreen } from '../pages/missionary/leadership/LeadershipProfileScreen';
import { FloatingMenu } from '../ui/components';
import '../pages/Page.css';
import '../layouts/Layout.css';
import './MissionaryLeadershipLayout.css';

// Screens funcionales para tabs del Líder de Distrito
const DistrictMeetingScreen = () => <DistrictCouncilScreen />;
const ExchangesScreen = () => <ExchangeScreen />;
const BaptismalInterviewsScreen = () => <BaptismalInterviewScreen />;
const ZoneLeaderMessagesScreenWrapper = () => <ZoneLeaderMessagesScreen />;
const DistrictDashboardTabScreen = () => <LeadershipTabScreen roleId="districtLeader" tabId="dashboard" />;

// Placeholder component para tabs no implementados aún
const PlaceholderScreen: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
  <div className="page">
    <div className="page-header">
      <h1>{title}</h1>
      {description && <p className="page-subtitle">{description}</p>}
    </div>
    <div className="page-content">
      <div className="leader-empty-card">
        <p>Esta funcionalidad estará disponible próximamente.</p>
      </div>
    </div>
  </div>
);

const ZoneCouncilScreenWrapper = () => <ZoneCouncilScreen />;
const ZoneMessagesScreen = () => <LeaderMessageScreen />;
const PersonalizedSupportScreen = () => <PlaceholderScreen title="Apoyo personalizado" description="Brinda apoyo específico a cada misionero" />;
const SuggestedTransfersScreen = () => <PlaceholderScreen title="Transferencias sugeridas" description="Gestiona sugerencias de transferencias" />;
const ConferenceAttendanceScreen = () => <PlaceholderScreen title="Asistencia a conferencias" description="Registra asistencia a conferencias" />;
const TrainingResourcesScreen = () => <PlaceholderScreen title="Recursos de capacitación" description="Accede a materiales de capacitación" />;

const CouncilMeetingsScreen = () => <PlaceholderScreen title="Reuniones de consejo" description="Gestiona reuniones de consejo de misión" />;
const TravelsTransfersScreen = () => <TransferPlanScreen />;
const TrainingPlanningScreen = () => <PlaceholderScreen title="Planificación de capacitaciones" description="Organiza capacitaciones para la misión" />;
const ZoneFeedbackScreen = () => <PlaceholderScreen title="Feedback de zonas" description="Recibe y gestiona feedback de zonas" />;
const LeadersChatScreen = () => <PlaceholderScreen title="Chat interno con líderes" description="Comunícate con otros líderes" />;

export const MissionaryLeadershipLayout: React.FC = () => {
  const location = useLocation();
  const [currentRole, setCurrentRole] = useState<LeadershipRole>('none');
  const [roleConfig, setRoleConfig] = useState(getLeadershipRoleConfig('none'));

  useEffect(() => {
    try {
      const role = LeadershipRoleService.getCurrentRole();
      if (role === 'none') {
        // Si no hay rol, el AppRouter ya maneja la redirección
        return;
      }
      setCurrentRole(role);
      const config = getLeadershipRoleConfig(role);
      setRoleConfig(config);
    } catch (error) {
      console.error('Error loading leadership role:', error);
      // Si hay error, dejar que AppRouter maneje la redirección
    }
  }, []); // Solo ejecutar una vez al montar

  // Si no hay rol de liderazgo activo, mostrar loading o dejar que AppRouter redirija
  if (currentRole === 'none') {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Cargando...</h1>
        </div>
      </div>
    );
  }

  if (!roleConfig) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Cargando...</h1>
        </div>
      </div>
    );
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
  
  const baseTabs = hasDashboardTab 
    ? allTabs
    : [
        { 
          path: `/missionary/leadership/${currentRole}/dashboard`, 
          label: dashboardTab?.title || 'Dashboard', 
          icon: getTabIcon('dashboard', dashboardTab?.icon) 
        },
        ...allTabs
      ];
  
  // Agregar tab de perfil al final
  const tabs = [
    ...baseTabs,
    {
      path: `/missionary/leadership/${currentRole}/profile`,
      label: 'Perfil',
      icon: getTabIcon('profile', 'person-outline')
    }
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
            <Route path="/missionary/leadership/districtLeader/zone_messages" element={<ZoneLeaderMessagesScreenWrapper />} />
            <Route path="/missionary/leadership/districtLeader/profile" element={<LeadershipProfileScreen />} />
            {/* Legacy routes for backwards compatibility */}
            <Route path="/missionary/leadership/districtLeader/reunion-de-distrito" element={<DistrictMeetingScreen />} />
            <Route path="/missionary/leadership/districtLeader/intercambios" element={<ExchangesScreen />} />
            <Route path="/missionary/leadership/districtLeader/entrevistas-bautismales" element={<BaptismalInterviewsScreen />} />
            <Route path="/missionary/leadership/districtLeader/notas-personales" element={<PersonalNotesScreen />} />
            <Route path="/missionary/leadership/districtLeader/mensajes-del-lider-de-zona" element={<ZoneLeaderMessagesScreenWrapper />} />

            {/* Zone Leader Routes */}
            <Route path="/missionary/leadership/zoneLeader/dashboard" element={<ZoneLeaderDashboard />} />
            <Route path="/missionary/leadership/zoneLeader/zone_council" element={<ZoneCouncilScreenWrapper />} />
            <Route path="/missionary/leadership/zoneLeader/zone_exchanges" element={<ExchangeScreen />} />
            <Route path="/missionary/leadership/zoneLeader/zone_reports" element={<SuggestedTransfersScreen />} />
            <Route path="/missionary/leadership/zoneLeader/zone_messages" element={<ZoneMessagesScreen />} />
            <Route path="/missionary/leadership/zoneLeader/zone_communication" element={<ZoneMessagesScreen />} />
            <Route path="/missionary/leadership/zoneLeader/personal_notes" element={<PersonalNotesScreen />} />
            <Route path="/missionary/leadership/zoneLeader/baptismal_interviews" element={<BaptismalInterviewScreen />} />
            <Route path="/missionary/leadership/zoneLeader/profile" element={<LeadershipProfileScreen />} />
            {/* Legacy routes */}
            <Route path="/missionary/leadership/zoneLeader/consejo-de-zona" element={<ZoneCouncilScreenWrapper />} />
            <Route path="/missionary/leadership/zoneLeader/apoyo-personalizado-por-misionero" element={<PersonalizedSupportScreen />} />
            <Route path="/missionary/leadership/zoneLeader/transferencias-sugeridas" element={<SuggestedTransfersScreen />} />
            <Route path="/missionary/leadership/zoneLeader/asistencia-a-conferencias" element={<ConferenceAttendanceScreen />} />
            <Route path="/missionary/leadership/zoneLeader/recursos-de-capacitacion" element={<TrainingResourcesScreen />} />
            <Route path="/missionary/leadership/zoneLeader/notas-personales" element={<PersonalNotesScreen />} />

            {/* Assistant to President Routes */}
            <Route path="/missionary/leadership/assistantToPresident/dashboard" element={<AssistantToPresidentDashboard />} />
            <Route path="/missionary/leadership/assistantToPresident/mission_leaders_council" element={<CouncilMeetingsScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/transfers_planning" element={<TransferPlanScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/office_admin" element={<TrainingPlanningScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/field_tours" element={<ExchangeScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/ap_companionship" element={<LeadersChatScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/president_support" element={<LeadershipTabScreen roleId="assistantToPresident" tabId="president_support" />} />
            <Route path="/missionary/leadership/assistantToPresident/personal_notes" element={<PersonalNotesScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/mission_messages" element={<LeaderMessageScreen />} />
            <Route path="/missionary/leadership/assistantToPresident/profile" element={<LeadershipProfileScreen />} />
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

