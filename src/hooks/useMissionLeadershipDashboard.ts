// src/hooks/useMissionLeadershipDashboard.ts
// Hook para el dashboard de liderazgo a nivel misión (AP)
import { useEffect, useState } from 'react';
import { LeaderMessageService } from '../services/leaderMessageService';

interface MissionDashboardData {
  upcomingEvents: any[];
  recentMessages: any[];
}

interface Params {
  missionId: string;
}

export function useMissionLeadershipDashboard({ missionId }: Params) {
  const [data, setData] = useState<MissionDashboardData>({
    upcomingEvents: [],
    recentMessages: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar eventos de liderazgo de toda la misión
    const events = LeaderMessageService.getAllLeadershipEvents()
      .filter(e => {
        // Eventos de toda la misión (sin filtro de zona/distrito) o eventos del AP
        return !e.zoneId || e.leaderRole === 'assistant_to_president';
      })
      .filter(e => e.status === 'upcoming')
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
        const dateB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
        return dateA - dateB; // Próximos primero
      });

    // Cargar mensajes publicados de toda la misión
    const messages = LeaderMessageService.getAllMessages()
      .filter(m => {
        if (m.status !== 'published') return false;
        // Mensajes dirigidos a la misión completa
        if (m.targetScope === 'mission') return true;
        // Mensajes del AP
        if (m.senderRole === 'assistant_to_president') return true;
        return false;
      })
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.createdAt).getTime();
        const dateB = new Date(b.publishedAt || b.createdAt).getTime();
        return dateB - dateA; // Más recientes primero
      })
      .slice(0, 10);

    setData({
      upcomingEvents: events,
      recentMessages: messages,
    });
    setLoading(false);
  }, [missionId]);

  return { data, loading };
}

