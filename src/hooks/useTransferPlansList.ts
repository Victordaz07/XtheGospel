// src/hooks/useTransferPlansList.ts
// Hook para listar planes de transferencias
import { useEffect, useState } from 'react';
import { TransferPlanService } from '../services/transferPlanService';

export function useTransferPlansList(missionId: string) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const plans = TransferPlanService.getPlansByMission(missionId);
    setItems(plans);
    setLoading(false);
  }, [missionId]);

  return { items, loading };
}

