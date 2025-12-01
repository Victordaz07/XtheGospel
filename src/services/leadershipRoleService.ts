// src/services/leadershipRoleService.ts
// Servicio para gestionar el rol de liderazgo misional

import { LeadershipRole } from '../data/missionary/leadershipMode';

const LEADERSHIP_ROLE_KEY = '@missionaryLeadershipRole';
const ROLE_CHANGE_DATE_KEY = '@missionaryLeadershipRoleChangeDate';
const COOLDOWN_WEEKS = 6;

export interface RoleChangeInfo {
  role: LeadershipRole;
  changedAt: string;
  canChange: boolean;
  daysRemaining?: number;
}

export const LeadershipRoleService = {
  getCurrentRole: (): LeadershipRole => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const role = localStorage.getItem(LEADERSHIP_ROLE_KEY);
        if (role && (role === 'districtLeader' || role === 'zoneLeader' || role === 'assistantToPresident' || role === 'none')) {
          return role as LeadershipRole;
        }
      }
      return 'none';
    } catch (e) {
      console.error('Error obteniendo rol de liderazgo:', e);
      return 'none';
    }
  },

  setCurrentRole: (role: LeadershipRole): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(LEADERSHIP_ROLE_KEY, role);
        localStorage.setItem(ROLE_CHANGE_DATE_KEY, new Date().toISOString());
      }
    } catch (e) {
      console.error('Error guardando rol de liderazgo:', e);
    }
  },

  canChangeRole: (testingOverride: boolean = false): { canChange: boolean; daysRemaining?: number; message?: string } => {
    if (testingOverride) {
      return { canChange: true };
    }

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const changeDateStr = localStorage.getItem(ROLE_CHANGE_DATE_KEY);
        if (!changeDateStr) {
          return { canChange: true };
        }

        const changeDate = new Date(changeDateStr);
        const now = new Date();
        const daysSinceChange = Math.floor((now.getTime() - changeDate.getTime()) / (1000 * 60 * 60 * 24));
        const daysRequired = COOLDOWN_WEEKS * 7;
        const daysRemaining = daysRequired - daysSinceChange;

        if (daysRemaining <= 0) {
          return { canChange: true };
        }

        return {
          canChange: false,
          daysRemaining,
          message: `Cambiar tu asignación ahora reiniciará el período de espera de ${COOLDOWN_WEEKS} semanas para nuevos cambios. ¿Deseas continuar?`
        };
      }
      return { canChange: true };
    } catch (e) {
      console.error('Error verificando cambio de rol:', e);
      return { canChange: true };
    }
  },

  getRoleChangeInfo: (): RoleChangeInfo => {
    const role = LeadershipRoleService.getCurrentRole();
    const canChangeInfo = LeadershipRoleService.canChangeRole();
    
    return {
      role,
      changedAt: typeof window !== 'undefined' && window.localStorage 
        ? localStorage.getItem(ROLE_CHANGE_DATE_KEY) || new Date().toISOString()
        : new Date().toISOString(),
      canChange: canChangeInfo.canChange,
      daysRemaining: canChangeInfo.daysRemaining
    };
  },

  clearRole: (): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(LEADERSHIP_ROLE_KEY);
        localStorage.removeItem(ROLE_CHANGE_DATE_KEY);
      }
    } catch (e) {
      console.error('Error limpiando rol de liderazgo:', e);
    }
  }
};

