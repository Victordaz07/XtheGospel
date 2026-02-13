// src/services/transferPlanService.ts
// Servicio para gestionar planes de transferencias

export interface TransferAssignment {
  missionaryId: string;
  missionaryName: string;
  fromArea: string;
  toArea: string;
  fromCompanionship: string;
  toCompanionship: string;
  newRole?: 'district_leader' | 'zone_leader' | 'trainer' | 'assistant_to_president';
}

export interface TransferPlan {
  id: string;
  missionId: string;
  transferNumber: number;
  effectiveDate: string; // "2025-12-10"
  notes: string;
  assignments: TransferAssignment[];
  createdById: string;
  createdByName: string;
  status: 'draft' | 'final';
  createdAt: string;
  updatedAt: string;
}

const TRANSFER_PLANS_KEY = '@transferPlans';

export const TransferPlanService = {
  // Guardar/actualizar plan
  savePlan: (plan: Omit<TransferPlan, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): TransferPlan => {
    try {
      const plans = TransferPlanService.getAllPlans();
      const now = new Date().toISOString();
      const id = plan.id ?? `transfer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newPlan: TransferPlan = {
        ...plan,
        id,
        createdAt: plan.id ? plans.find(p => p.id === plan.id)?.createdAt ?? now : now,
        updatedAt: now
      };

      const index = plans.findIndex(p => p.id === newPlan.id);
      if (index >= 0) {
        plans[index] = newPlan;
      } else {
        plans.push(newPlan);
      }

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(TRANSFER_PLANS_KEY, JSON.stringify(plans));
      }

      return newPlan;
    } catch (e) {
      console.error('Error guardando plan de transfers:', e);
      throw e;
    }
  },

  // Obtener todos los planes
  getAllPlans: (): TransferPlan[] => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const json = localStorage.getItem(TRANSFER_PLANS_KEY);
        if (json) {
          return JSON.parse(json);
        }
      }
      return [];
    } catch (e) {
      console.error('Error cargando planes de transfers:', e);
      return [];
    }
  },

  // Obtener plan por ID
  getPlanById: (id: string): TransferPlan | null => {
    const plans = TransferPlanService.getAllPlans();
    return plans.find(p => p.id === id) || null;
  },

  // Obtener planes por misión
  getPlansByMission: (missionId: string): TransferPlan[] => {
    return TransferPlanService.getAllPlans()
      .filter(p => p.missionId === missionId)
      .sort((a, b) => {
        const dateA = new Date(a.effectiveDate).getTime();
        const dateB = new Date(b.effectiveDate).getTime();
        return dateB - dateA; // Más recientes primero
      });
  },

  // Obtener borradores
  getDrafts: (missionId?: string): TransferPlan[] => {
    let plans = TransferPlanService.getAllPlans().filter(p => p.status === 'draft');
    if (missionId) {
      plans = plans.filter(p => p.missionId === missionId);
    }
    return plans.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateB - dateA;
    });
  },

  // Obtener planes finales
  getFinalPlans: (missionId?: string): TransferPlan[] => {
    let plans = TransferPlanService.getAllPlans().filter(p => p.status === 'final');
    if (missionId) {
      plans = plans.filter(p => p.missionId === missionId);
    }
    return plans.sort((a, b) => {
      const dateA = new Date(a.effectiveDate).getTime();
      const dateB = new Date(b.effectiveDate).getTime();
      return dateB - dateA;
    });
  },

  // Eliminar plan
  deletePlan: (planId: string): boolean => {
    try {
      const plans = TransferPlanService.getAllPlans();
      const filtered = plans.filter(p => p.id !== planId);

      if (filtered.length === plans.length) {
        return false; // No se encontró el plan
      }

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(TRANSFER_PLANS_KEY, JSON.stringify(filtered));
      }

      return true;
    } catch (e) {
      console.error('Error eliminando plan:', e);
      return false;
    }
  },

  // Generar número de transfer automático
  getNextTransferNumber: (missionId: string): number => {
    const plans = TransferPlanService.getPlansByMission(missionId);
    if (plans.length === 0) return 1;

    const maxNumber = Math.max(...plans.map(p => p.transferNumber || 0));
    return maxNumber + 1;
  }
};

