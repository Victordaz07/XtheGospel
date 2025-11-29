export interface MeetingTemplate {
  id: string;
  titleKey: string;
  subtitleKey: string;
  contentKey: string;
}

export interface QuickResource {
  id: string;
  titleKey: string;
  contentKey: string;
}

export const meetingTemplates: MeetingTemplate[] = [
  {
    id: 'coord-weekly',
    titleKey: 'memberLeader.meetingsResources.templates.weeklyCoordination.title',
    subtitleKey: 'memberLeader.meetingsResources.templates.weeklyCoordination.subtitle',
    contentKey: 'memberLeader.meetingsResources.templates.weeklyCoordination.content'
  },
  {
    id: 'ward-council',
    titleKey: 'memberLeader.meetingsResources.templates.wardCouncil.title',
    subtitleKey: 'memberLeader.meetingsResources.templates.wardCouncil.subtitle',
    contentKey: 'memberLeader.meetingsResources.templates.wardCouncil.content'
  }
];

export const quickResources: QuickResource[] = [
  {
    id: 'receive-convert',
    titleKey: 'memberLeader.meetingsResources.resources.receiveConvert.title',
    contentKey: 'memberLeader.meetingsResources.resources.receiveConvert.content'
  },
  {
    id: 'warning-signs',
    titleKey: 'memberLeader.meetingsResources.resources.warningSigns.title',
    contentKey: 'memberLeader.meetingsResources.resources.warningSigns.content'
  },
  {
    id: 'working-missionaries',
    titleKey: 'memberLeader.meetingsResources.resources.workingMissionaries.title',
    contentKey: 'memberLeader.meetingsResources.resources.workingMissionaries.content'
  }
];

