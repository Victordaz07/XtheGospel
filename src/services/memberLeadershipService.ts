/**
 * Service for Member Leadership 2.0 module
 * TODO: Replace mock data with real Firestore queries
 */

import { 
  AreaKPI, 
  AreaTrend, 
  InvestigatorLeadershipView, 
  NewConvertLeadershipView,
  MissionaryReport,
  LeadershipAlert,
  ActionPlan
} from '../data/memberLeadershipTypes';

// Mock data - TODO: Replace with real service
export const MemberLeadershipService = {
  async getAreaKPIs(): Promise<AreaKPI> {
    // TODO: Fetch from Firestore
    return {
      lessonsTotal: 12,
      lessonsWithMember: 8,
      investigatorsActive: 5,
      investigatorsAttending: 4,
      investigatorsWithDate: 2,
      baptismsLast90Days: 3,
      commitmentsCreated: 15,
      commitmentsCompleted: 12,
      newConvertsActive: 2,
      memberParticipationThisWeek: 6,
    };
  },

  async getAreaTrends(weeks: number = 4): Promise<AreaTrend[]> {
    // TODO: Fetch from Firestore
    return [
      { week: '2025-W07', lessons: 10, attendance: 3, commitmentsCompleted: 8 },
      { week: '2025-W08', lessons: 11, attendance: 3, commitmentsCompleted: 9 },
      { week: '2025-W09', lessons: 9, attendance: 4, commitmentsCompleted: 10 },
      { week: '2025-W10', lessons: 12, attendance: 4, commitmentsCompleted: 12 },
    ];
  },

  async getInvestigators(): Promise<InvestigatorLeadershipView[]> {
    // TODO: Fetch from Firestore
    return [
      {
        id: 'inv1',
        alias: 'Familia López',
        stage: 'learningActively',
        lastContactDays: 3,
        attendedLastSunday: true,
        needs: ['integration', 'teaching'],
        assignedMember: 'Hna. Rodríguez',
        lessonsCompleted: 2,
        commitmentsActive: 3,
      },
      {
        id: 'inv2',
        alias: 'Carlos',
        stage: 'preparingForBaptism',
        lastContactDays: 14,
        attendedLastSunday: false,
        needs: ['transport', 'accompaniment'],
        assignedMember: undefined,
        lessonsCompleted: 4,
        commitmentsActive: 2,
      },
    ];
  },

  async getNewConverts(): Promise<NewConvertLeadershipView[]> {
    // TODO: Fetch from Firestore
    return [
      {
        id: 'nc1',
        alias: 'Ana',
        monthsSinceBaptism: 2,
        active: true,
        lastContactDays: 5,
        progressionStage: 'confirmation',
        stepsCompleted: 3,
        stepsTotal: 5,
        attendanceLast4Sundays: 3,
        assignedMembers: ['Hna. Martínez', 'Hno. García'],
      },
    ];
  },

  async getMissionaryReport(weekId?: string): Promise<MissionaryReport> {
    // TODO: Fetch from Firestore
    return {
      weekId: weekId || '2025-W10',
      area: 'Barrio El Camino',
      lessonsTaught: 12,
      lessonsWithMember: 8,
      investigatorsAttending: 4,
      newConvertsActive: 2,
      memberParticipants: 6,
      keyNeeds: [
        'Buscar pareja para recibir a la familia Méndez',
        'Reforzar visitas a Pedro (14 días sin contacto)',
      ],
      suggestions: [
        'Vincular a Ana con hermanas de su edad',
        'Organizar Noche de Hogar misional',
      ],
    };
  },

  async getAlerts(): Promise<LeadershipAlert[]> {
    // TODO: Fetch from Firestore
    return [
      {
        id: '1',
        type: 'high',
        category: 'noContact',
        title: 'Sin contacto reciente',
        description: 'Carlos no ha sido contactado en 14 días',
        investigatorId: 'inv2',
        suggestedActions: ['Asignar visita de apoyo', 'Contactar a los misioneros'],
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        type: 'medium',
        category: 'missingSundays',
        title: 'Falta a la Iglesia',
        description: 'Ana ha faltado 2 domingos seguidos',
        newConvertId: 'nc1',
        suggestedActions: ['Llamar para verificar', 'Asignar acompañante'],
        createdAt: new Date().toISOString(),
      },
    ];
  },

  async getActionPlan(month?: string): Promise<ActionPlan> {
    // TODO: Fetch from Firestore
    return {
      month: month || '2025-03',
      objectives: [
        {
          id: 'obj1',
          title: '3 familias asistiendo regularmente',
          target: 3,
          current: 2,
          deadline: '2025-03-31',
          status: 'onTrack',
        },
        {
          id: 'obj2',
          title: '5 miembros nuevos acompañando misioneros',
          target: 5,
          current: 3,
          deadline: '2025-03-31',
          status: 'atRisk',
        },
      ],
      weeklyActions: [
        {
          id: 'wa1',
          week: '2025-W10',
          title: 'Noche de Hogar misional',
          description: 'Actividad para investigadores y nuevos conversos',
          completed: false,
          assignedTo: 'Hna. Rodríguez',
        },
      ],
    };
  },
};

