export type LeaderSectionId =
  | 'todayPanel'
  | 'newConverts'
  | 'friendsInTeaching'
  | 'meetingsAndResources';

export interface LeaderSectionConfig {
  id: LeaderSectionId;
  icon: string;       // nombre de icono o emoji
  titleKey: string;   // i18n: memberLeader.todayPanel.title
  subtitleKey: string;
  routePath: string;  // ruta de navegación
}

export const leaderSections: LeaderSectionConfig[] = [
  {
    id: 'todayPanel',
    icon: '⚡',
    titleKey: 'memberLeader.todayPanel.title',
    subtitleKey: 'memberLeader.todayPanel.subtitle',
    routePath: '/member/leader/today'
  },
  {
    id: 'newConverts',
    icon: '👥',
    titleKey: 'memberLeader.newConverts.title',
    subtitleKey: 'memberLeader.newConverts.subtitle',
    routePath: '/member/leader/converts'
  },
  {
    id: 'friendsInTeaching',
    icon: '📖',
    titleKey: 'memberLeader.friendsInTeaching.title',
    subtitleKey: 'memberLeader.friendsInTeaching.subtitle',
    routePath: '/member/leader/friends'
  },
  {
    id: 'meetingsAndResources',
    icon: '📅',
    titleKey: 'memberLeader.meetingsResources.title',
    subtitleKey: 'memberLeader.meetingsResources.subtitle',
    routePath: '/member/leader/meetings'
  }
];

