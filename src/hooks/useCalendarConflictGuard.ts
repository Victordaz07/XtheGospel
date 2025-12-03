// src/hooks/useCalendarConflictGuard.ts
import { useState } from 'react';
import {
  CreateCalendarEventInput,
  createCalendarEvent,
  findConflicts,
  CalendarConflict,
} from '../services/calendarService';

interface UseCalendarConflictGuardResult {
  isSaving: boolean;
  lastConflicts: CalendarConflict[];
  isConflictModalOpen: boolean;
  openConflictModal: () => void;
  closeConflictModal: () => void;

  /**
   * Devuelve true si se guardó el evento,
   * false si se bloqueó por conflicto HARD.
   */
  saveWithConflictsCheck: (input: CreateCalendarEventInput) => Promise<boolean>;
}

/**
 * Encapsula la lógica:
 *  - Busca conflictos en el calendario
 *  - Si hay HARD → no guarda y abre modal
 *  - Si solo hay SOFT → guarda igual
 */
export const useCalendarConflictGuard = (): UseCalendarConflictGuardResult => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastConflicts, setLastConflicts] = useState<CalendarConflict[]>([]);
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);

  const openConflictModal = () => setIsConflictModalOpen(true);
  const closeConflictModal = () => setIsConflictModalOpen(false);

  const saveWithConflictsCheck = async (
    input: CreateCalendarEventInput,
  ): Promise<boolean> => {
    setIsSaving(true);
    try {
      const conflicts = findConflicts(input);
      setLastConflicts(conflicts);

      const hasHard = conflicts.some((c) => c.level === 'HARD');

      if (hasHard) {
        // hay conflicto de misión/zonas bloqueante
        setIsConflictModalOpen(true);
        return false;
      }

      createCalendarEvent(input);
      return true;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    lastConflicts,
    isConflictModalOpen,
    openConflictModal,
    closeConflictModal,
    saveWithConflictsCheck,
  };
};
