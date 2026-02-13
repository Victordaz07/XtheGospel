// src/services/memberTransfersService.ts
// Servicio para gestionar traslados de miembros/misioneros

import { StorageService } from '../utils/storage';

const MEMBER_TRANSFERS_KEY = '@memberTransfers';

export interface MemberTransfer {
  id: string;
  date: string; // ISO string - fecha del traslado
  fromArea: string;
  toArea: string;
  fromCompanion?: string;
  toCompanion?: string;
  transferType: 'area_change' | 'companion_change' | 'both';
  notes?: string;
  createdAt: string;
}

export const MemberTransfersService = {
  loadTransfers: (): MemberTransfer[] => {
    try {
      const stored = StorageService.getItem(MEMBER_TRANSFERS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    } catch (e) {
      console.error('Error cargando traslados:', e);
      return [];
    }
  },

  saveTransfers: (transfers: MemberTransfer[]): void => {
    try {
      StorageService.setItem(MEMBER_TRANSFERS_KEY, JSON.stringify(transfers));
    } catch (e) {
      console.error('Error guardando traslados:', e);
    }
  },

  addTransfer: (
    date: string,
    fromArea: string,
    toArea: string,
    fromCompanion?: string,
    toCompanion?: string,
    notes?: string
  ): MemberTransfer => {
    const transfers = MemberTransfersService.loadTransfers();
    const now = new Date().toISOString();

    // Determinar el tipo de traslado
    let transferType: 'area_change' | 'companion_change' | 'both' = 'area_change';
    if (fromArea === toArea && fromCompanion && toCompanion && fromCompanion !== toCompanion) {
      transferType = 'companion_change';
    } else if (fromArea !== toArea && fromCompanion && toCompanion && fromCompanion !== toCompanion) {
      transferType = 'both';
    }

    const newTransfer: MemberTransfer = {
      id: crypto.randomUUID ? crypto.randomUUID() : `transfer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date,
      fromArea,
      toArea,
      fromCompanion,
      toCompanion,
      transferType,
      notes,
      createdAt: now,
    };

    MemberTransfersService.saveTransfers([...transfers, newTransfer]);
    return newTransfer;
  },

  updateTransfer: (id: string, updates: Partial<MemberTransfer>): void => {
    const transfers = MemberTransfersService.loadTransfers();
    const updated = transfers.map(transfer => {
      if (transfer.id === id) {
        const updatedTransfer = { ...transfer, ...updates };
        // Recalcular tipo si cambió área o compañero
        if (updates.fromArea || updates.toArea || updates.fromCompanion || updates.toCompanion) {
          const fromArea = updatedTransfer.fromArea;
          const toArea = updatedTransfer.toArea;
          const fromCompanion = updatedTransfer.fromCompanion;
          const toCompanion = updatedTransfer.toCompanion;

          if (fromArea === toArea && fromCompanion && toCompanion && fromCompanion !== toCompanion) {
            updatedTransfer.transferType = 'companion_change';
          } else if (fromArea !== toArea && fromCompanion && toCompanion && fromCompanion !== toCompanion) {
            updatedTransfer.transferType = 'both';
          } else {
            updatedTransfer.transferType = 'area_change';
          }
        }
        return updatedTransfer;
      }
      return transfer;
    });
    MemberTransfersService.saveTransfers(updated);
  },

  deleteTransfer: (id: string): void => {
    const transfers = MemberTransfersService.loadTransfers();
    const filtered = transfers.filter(t => t.id !== id);
    MemberTransfersService.saveTransfers(filtered);
  },

  getCurrentArea: (): string | null => {
    const transfers = MemberTransfersService.loadTransfers();
    if (transfers.length === 0) return null;
    // Ordenar por fecha descendente y tomar el área más reciente
    const sorted = [...transfers].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return sorted[0].toArea;
  },

  getCurrentCompanion: (): string | null => {
    const transfers = MemberTransfersService.loadTransfers();
    if (transfers.length === 0) return null;
    const sorted = [...transfers].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return sorted[0].toCompanion || null;
  },

  getTransfersByArea: (area: string): MemberTransfer[] => {
    const transfers = MemberTransfersService.loadTransfers();
    return transfers.filter(t => t.fromArea === area || t.toArea === area);
  },
};
