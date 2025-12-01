// src/hooks/useDistrictLeaderDashboard.ts
import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

interface DistrictDashboardData {
  upcomingEvents: any[];
  recentMessages: any[];
}

interface Params {
  missionId: string;
  zoneId: string;
  districtId: string;
}

export function useDistrictLeaderDashboard({ missionId, zoneId, districtId }: Params) {
  const [data, setData] = useState<DistrictDashboardData>({
    upcomingEvents: [],
    recentMessages: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const eventsCol = collection(db, 'leadershipEvents');
    const eventsQuery = query(
      eventsCol,
      where('missionId', '==', missionId),
      where('zoneId', '==', zoneId),
      where('districtId', '==', districtId),
      where('status', '==', 'upcoming'),
      orderBy('date', 'asc'),
    );

    const messagesCol = collection(db, 'leaderMessages');
    const messagesQuery = query(
      messagesCol,
      where('missionId', '==', missionId),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc'),
    );

    const unsubEvents = onSnapshot(eventsQuery, snap => {
      const rows: any[] = [];
      snap.forEach(d => rows.push({ id: d.id, ...(d.data() as any) }));
      setData(prev => ({ ...prev, upcomingEvents: rows }));
      setLoading(false);
    }, (error) => {
      console.error('Error loading events:', error);
      setLoading(false);
    });

    const unsubMessages = onSnapshot(messagesQuery, snap => {
      const rows: any[] = [];
      snap.forEach(d => rows.push({ id: d.id, ...(d.data() as any) }));
      // Filtrar mensajes relevantes para el distrito
      const relevantMessages = rows.filter(m => 
        m.targetScope === 'district' && m.districtId === districtId ||
        m.targetScope === 'zone' && m.zoneId === zoneId ||
        m.targetScope === 'mission'
      );
      setData(prev => ({ ...prev, recentMessages: relevantMessages.slice(0, 5) }));
      setLoading(false);
    }, (error) => {
      console.error('Error loading messages:', error);
      setLoading(false);
    });

    return () => {
      unsubEvents();
      unsubMessages();
    };
  }, [missionId, zoneId, districtId]);

  return { data, loading };
}

