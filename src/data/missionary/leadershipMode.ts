// src/data/missionary/leadershipMode.ts
// Modo Liderazgo Misional - Estructura completa

export type LeadershipRole = 'districtLeader' | 'zoneLeader' | 'assistantToPresident' | 'none';

export interface LeadershipRoleConfig {
  id: LeadershipRole;
  title: string;
  color: string;
  icon: string;
  dashboard: string;
  tabs: string[];
  kpis: string[];
  content: string;
}

export interface LeadershipActivation {
  accessPath: string;
  manualActivation: boolean;
  persistLastRole: boolean;
  roleSwitchCooldownWeeks: number;
  alertMessage: string;
  testingOverride: boolean;
}

export interface CommonTools {
  bitacoraPrivada: boolean;
  bandejaDeTareas: boolean;
  feedbackAnonimo: {
    enabled: boolean;
    visibleTo: string[];
  };
  mensajesPresidencia: boolean;
  chatEntreLideres: boolean;
  notificacionesInteligentes: boolean;
  modoEstudioSugerido: boolean;
}

export interface ProfileIntegration {
  displayLocation: string;
  label: string;
  roleSwitcherEnabled: boolean;
  showsHistory: boolean;
  canRevertToMissionary: boolean;
}

export interface MissionaryLeadershipMaster {
  activation: LeadershipActivation;
  commonTools: CommonTools;
  roles: {
    districtLeader: LeadershipRoleConfig;
    zoneLeader: LeadershipRoleConfig;
    assistantToPresident: LeadershipRoleConfig;
  };
  profileIntegration: ProfileIntegration;
}

export const missionaryLeadershipMaster: MissionaryLeadershipMaster = {
  activation: {
    accessPath: "Perfil Misional → Mi Llamamiento Actual",
    manualActivation: true,
    persistLastRole: true,
    roleSwitchCooldownWeeks: 6,
    alertMessage: "Cambiar tu asignación ahora reiniciará el período de espera de 6 semanas para nuevos cambios. ¿Deseas continuar?",
    testingOverride: true
  },
  commonTools: {
    bitacoraPrivada: true,
    bandejaDeTareas: true,
    feedbackAnonimo: {
      enabled: true,
      visibleTo: ["AP", "Presidente"]
    },
    mensajesPresidencia: true,
    chatEntreLideres: true,
    notificacionesInteligentes: true,
    modoEstudioSugerido: true
  },
  roles: {
    districtLeader: {
      id: "districtLeader",
      title: "Líder de Distrito",
      color: "#3B82F6",
      icon: "people-outline",
      dashboard: "Resumen de distrito, estado de cada pareja, metas del distrito",
      tabs: [
        "Reunión de distrito",
        "Intercambios",
        "Entrevistas bautismales",
        "Notas personales",
        "Mensajes del líder de zona"
      ],
      kpis: [
        "Lecciones semanales por área",
        "Bautismos en proceso",
        "Alertas por falta de asistencia",
        "Asistencia a reuniones de distrito"
      ],
      content: "Servir, capacitar y edificar espiritualmente a los misioneros del distrito. Actuar como mentor y punto de conexión. Enseñar con amor, corregir con mansedumbre. DyC 121, Mateo 23, 3 Nefi 11. Preguntas comunes: ¿cómo corrijo con amor? ¿cómo animar sin presión?"
    },
    zoneLeader: {
      id: "zoneLeader",
      title: "Líder de Zona",
      color: "#F59E0B",
      icon: "layers-outline",
      dashboard: "Estado general de la zona, metas cruzadas, prioridades doctrinales",
      tabs: [
        "Consejo de zona",
        "Apoyo personalizado por misionero",
        "Transferencias sugeridas",
        "Asistencia a conferencias",
        "Recursos de capacitación"
      ],
      kpis: [
        "Total bautismos por distrito",
        "Entrevistas completadas",
        "Intercambios realizados",
        "Alertas por bajo rendimiento doctrinal o actividad"
      ],
      content: "Velar espiritualmente por todos los misioneros de su zona. Ser formador de líderes, construir unidad. Mosíah 18:21, DyC 88, 107. Herramientas: intercambios, visitas, seguimiento y mentoría uno a uno. Casos: zona desanimada, líder inactivo, planificación ineficaz."
    },
    assistantToPresident: {
      id: "assistantToPresident",
      title: "Asistente del Presidente",
      color: "#EF4444",
      icon: "ribbon-outline",
      dashboard: "Misiones críticas, resumen de la misión, acciones pendientes",
      tabs: [
        "Reuniones de consejo",
        "Viajes / giras / transferencias",
        "Planificación de capacitaciones",
        "Feedback de zonas",
        "Chat interno con líderes"
      ],
      kpis: [
        "Indicadores por zona",
        "Transferencias programadas",
        "Asignaciones en riesgo",
        "Estado espiritual global por zonas"
      ],
      content: "Representar al presidente con humildad y exactitud. Entrenar, corregir, visitar y supervisar toda la misión. Juan 21, DyC 18, 2 Nefi 2. Inspira, lidera, organiza. No es jefe, es siervo y discípulo. Enseña con amor, guía con el Espíritu."
    }
  },
  profileIntegration: {
    displayLocation: "Perfil Misional",
    label: "Mi Llamamiento Actual",
    roleSwitcherEnabled: true,
    showsHistory: true,
    canRevertToMissionary: true
  }
};

// Helper functions
export const getLeadershipRoleConfig = (role: LeadershipRole): LeadershipRoleConfig | null => {
  if (role === 'none') return null;
  return missionaryLeadershipMaster.roles[role] || null;
};

export const getAllLeadershipRoles = (): LeadershipRoleConfig[] => {
  return Object.values(missionaryLeadershipMaster.roles);
};

export const isLeadershipRole = (role: LeadershipRole): boolean => {
  return role !== 'none';
};

