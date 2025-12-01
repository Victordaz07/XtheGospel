// src/data/leader/index.ts
// 🔹 1. Imports de las estructuras de datos del modo líder

import { leaderMode } from './leaderMode';
import { leaderModeAdditional } from './leaderModeAdditional';
import { leaderIntegrationExtended } from './leaderIntegrationExtended';
import { leaderScreensConfig } from './leaderScreensConfig';
import { convertPath12Weeks } from './convertPath12Weeks';
import { newConvertsExtended } from './newConvertsExtended';
import { friendsInTeachingExtended } from './friendsInTeachingExtended';
import { leaderGuideExtended } from './leaderGuideExtended';

// 🔹 2. Tipos básicos

export type LeaderModuleId =
  | 'today_panel'
  | 'new_converts'
  | 'friends_in_teaching'
  | 'meetings_and_resources'
  | 'integration_map'
  | 'guidelines_and_authority';

export type LeaderScreenId =
  | 'LeaderTodayPanel'
  | 'LeaderNewConverts'
  | 'LeaderFriendsTeaching'
  | 'LeaderMeetingsResources'
  | 'LeaderIntegrationMap'
  | 'LeaderGuidelines';

export interface LeaderModuleConfig {
  id: LeaderModuleId;
  order: number;
  icon: string;
  title: string;
  subtitle: string;
  routeName: LeaderScreenId;
}

export interface LeaderScreenConfig {
  id: LeaderScreenId;
  moduleId: LeaderModuleId;
  title: string;
  usesData: string[];
  layout: string;
  description: string;
}

// 🔹 3. Derivados cómodos desde leaderMode / leaderScreensConfig

const modulesList: LeaderModuleConfig[] = leaderMode.modules as LeaderModuleConfig[];
const screensList: LeaderScreenConfig[] = leaderScreensConfig.screens as LeaderScreenConfig[];

// 🔹 4. Helpers para usar en los screens

export const getLeaderModuleById = (id: LeaderModuleId): LeaderModuleConfig | undefined => {
  return modulesList.find((m) => m.id === id);
};

export const getLeaderScreenById = (id: LeaderScreenId): LeaderScreenConfig | undefined => {
  return screensList.find((s) => s.id === id);
};

export const getLeaderScreenByRouteName = (routeName: string): LeaderScreenConfig | undefined => {
  return screensList.find((s) => s.id === routeName);
};

// Devuelve los módulos en orden (para un home tipo "grid de módulos de líder")
export const getOrderedLeaderModules = (): LeaderModuleConfig[] => {
  return [...modulesList].sort((a, b) => a.order - b.order);
};

// 🔹 5. Selectores específicos para data de integración y recursos

export const getLeaderIntegrationPhases = () => {
  return leaderIntegrationExtended.phases;
};

export const getLeaderMeetingsConfig = () => {
  return leaderMode.meetingsAndResources.meetings;
};

export const getLeaderQuickResources = () => {
  return leaderMode.meetingsAndResources.quickResources;
};

export const getLeaderExtendedMeetings = () => {
  return leaderModeAdditional.extendedMeetings;
};

export const getLeaderExtendedResources = () => {
  return leaderModeAdditional.extendedResources;
};

export const getLeaderGuidelines = () => {
  return leaderMode.guidelinesAndAuthority;
};

export const getLeaderBehavior = () => {
  return leaderModeAdditional.leaderBehavior;
};

export const getLeaderSafeNotesSystem = () => {
  return leaderModeAdditional.safeNotesSystem;
};

export const getLeaderConvertPath12Weeks = () => {
  return convertPath12Weeks;
};

export const getLeaderNewConvertsExtended = () => {
  return newConvertsExtended;
};

export const getLeaderFriendsExtended = () => {
  return friendsInTeachingExtended;
};

export const getLeaderGuideExtended = () => {
  return leaderGuideExtended;
};

// 🔹 6. Export maestro: todo lo relacionado al modo Líder

export const leaderData = {
  leaderMode,
  leaderModeAdditional,
  leaderIntegrationExtended,
  leaderScreensConfig,
  modulesList,
  screensList,
};

// Re-exportar los datos principales para acceso directo
export { 
  leaderMode, 
  leaderModeAdditional, 
  leaderIntegrationExtended, 
  leaderScreensConfig, 
  convertPath12Weeks,
  newConvertsExtended,
  friendsInTeachingExtended,
  leaderGuideExtended
};

