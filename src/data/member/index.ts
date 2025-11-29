// src/data/member/index.ts
// Punto de entrada para toda la data del modo Miembro

import { memberMode, MemberModuleId } from './memberMode';
import { missionaryGuide, MissionaryLessonId } from './missionaryGuide';

export type MemberScreenId =
  | 'MemberHome'
  | 'MemberDiary'
  | 'MemberTransfers'
  | 'MemberPhotos'
  | 'MemberResources'
  | 'MemberMissionaryGuide'
  | 'MemberProfile';

export interface MemberModuleConfig {
  id: MemberModuleId;
  order: number;
  icon: string;
  title: string;
  subtitle: string;
  routeName: MemberScreenId;
}

export interface MissionaryGuideLessonConfig {
  id: MissionaryLessonId;
  order: number;
  title: string;
  subtitle: string;
  objective: string;
}

const memberModulesList: MemberModuleConfig[] = memberMode.modules as MemberModuleConfig[];

export const getMemberModulesOrdered = (): MemberModuleConfig[] => {
  return [...memberModulesList].sort((a, b) => a.order - b.order);
};

export const getMemberModuleById = (id: MemberModuleId): MemberModuleConfig | undefined => {
  return memberModulesList.find((module) => module.id === id);
};

export const getMissionaryLessons = () => missionaryGuide;

export const getMissionaryLessonById = (id: MissionaryLessonId) => {
  return missionaryGuide.find((lesson) => lesson.id === id);
};

export const memberData = {
  memberMode,
  missionaryGuide,
  memberModulesList,
};

export { memberMode, missionaryGuide };


