// src/data/missionary/leadershipModeEnhanced.ts
// Estructura enriquecida del Modo Liderazgo Misional basada en el JSON completo

export type LeadershipRole = 'districtLeader' | 'zoneLeader' | 'assistantToPresident' | 'none';

export interface CoreScripture {
    ref: string;
    focus: string;
}

export interface DashboardKPI {
    id: string;
    label: string;
    type: 'number' | 'percentage' | 'score' | 'trend' | 'scale';
    description: string;
}

export interface QuickAction {
    id: string;
    label: string;
    targetTabId: string;
}

export interface DashboardConfig {
    heroText: string;
    kpis: DashboardKPI[];
    quickActions: QuickAction[];
}

export interface TabSection {
    id: string;
    type: 'template' | 'checklist' | 'journal' | 'info' | 'list' | 'form' | 'practice';
    title: string;
    description?: string;
    fields?: string[];
    items?: string[];
    prompts?: string[];
    bullets?: string[];
}

export interface TabConfig {
    id: string;
    title: string;
    subtitle?: string;
    purpose?: string;
    icon: string;
    description: string;
    sections: TabSection[];
}

export interface LeadershipRoleConfigEnhanced {
    id: LeadershipRole;
    name: string;
    color: string;
    icon: string;
    summary: string;
    spiritualMotto: string;
    coreScriptures: CoreScripture[];
    dashboard: DashboardConfig;
    tabs: TabConfig[];
    recommendedHabits: string[];
}

export interface LeadershipModeData {
    id: string;
    name: string;
    description: string;
    roles: LeadershipRoleConfigEnhanced[];
}

import { districtLeaderComplete } from './districtLeaderComplete';
import { zoneLeaderComplete } from './zoneLeaderComplete';
import { assistantToPresidentComplete } from './assistantToPresidentComplete';

// Datos completos según el JSON proporcionado
export const leadershipModeData: LeadershipModeData = {
    id: "leadership_mode",
    name: "Modo Liderazgo Misional",
    description: "Suite de herramientas para líderes de distrito, líderes de zona y asistentes del presidente.",
    roles: [
        districtLeaderComplete as LeadershipRoleConfigEnhanced,
        zoneLeaderComplete as LeadershipRoleConfigEnhanced,
        assistantToPresidentComplete as LeadershipRoleConfigEnhanced
    ]
};

// Helper function para obtener configuración de rol
export const getLeadershipRoleEnhanced = (roleId: LeadershipRole): LeadershipRoleConfigEnhanced | null => {
    if (roleId === 'none') return null;
    return leadershipModeData.roles.find(r => r.id === roleId) || null;
};

// Helper function para obtener tab por ID
export const getTabById = (roleId: LeadershipRole, tabId: string): TabConfig | null => {
    const role = getLeadershipRoleEnhanced(roleId);
    if (!role) return null;
    return role.tabs.find(t => t.id === tabId) || null;
};

