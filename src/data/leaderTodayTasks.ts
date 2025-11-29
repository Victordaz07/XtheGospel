export type LeaderTaskType = 'newConvert' | 'friend' | 'general';

export interface LeaderTask {
  id: string;
  type: LeaderTaskType;
  name: string;          // nombre de la persona o título
  description: string;   // detalle corto
  dueLabel: string;      // "Hoy", "Antes del domingo", etc.
  isDone: boolean;
}

export interface LeaderTodayGroups {
  titleKey: string;    // i18n key
  type: LeaderTaskType;
}

export const leaderTodayGroups: LeaderTodayGroups[] = [
  {
    titleKey: 'memberLeader.todayPanel.groups.newConverts',
    type: 'newConvert'
  },
  {
    titleKey: 'memberLeader.todayPanel.groups.friends',
    type: 'friend'
  },
  {
    titleKey: 'memberLeader.todayPanel.groups.general',
    type: 'general'
  }
];

export const mockLeaderTodayTasks: LeaderTask[] = [
  {
    id: 't1',
    type: 'newConvert',
    name: 'Carlos',
    description: 'Llamar y preguntarle cómo se sintió en la última sacramental.',
    dueLabel: 'Hoy',
    isDone: false
  },
  {
    id: 't2',
    type: 'newConvert',
    name: 'Ana',
    description: 'Coordinar visita con ministradores antes del domingo.',
    dueLabel: 'Antes del domingo',
    isDone: false
  },
  {
    id: 't3',
    type: 'friend',
    name: 'Luis (amigo)',
    description: 'Confirmar si asistirá a la lección 3 con los misioneros.',
    dueLabel: 'Esta tarde',
    isDone: false
  },
  {
    id: 't4',
    type: 'friend',
    name: 'Familia Ramírez',
    description: 'Invitar a noche de hogar de barrio.',
    dueLabel: 'Esta semana',
    isDone: true
  },
  {
    id: 't5',
    type: 'general',
    name: 'Consejo de barrio',
    description: 'Anotar en agenda comentar sobre nuevos conversos (5 min).',
    dueLabel: 'Próxima reunión',
    isDone: false
  }
];

