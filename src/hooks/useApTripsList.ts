// src/hooks/useApTripsList.ts
// Hook para listar giras/intercambios del AP
import { useEffect, useState } from 'react';
import { ExchangeService } from '../services/exchangeService';

export function useApTripsList(missionId: string) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener todos los intercambios del AP
    const exchanges = ExchangeService.getAllExchanges()
      .filter(e => e.leaderRole === 'assistant_to_president')
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
        const dateB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
        return dateB - dateA; // Más recientes primero
      });

    setItems(exchanges);
    setLoading(false);
  }, [missionId]);

  return { items, loading };
}

