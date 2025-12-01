// src/hooks/useZoneLeaderDashboard.ts
import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

interface ZoneDashboardData {
  upcomingEvents: any[];
  recentMessages: any[];
}

interface Params {
  missionId: string;
  zoneId: string;
}

export function useZoneLeaderDashboard({ missionId, zoneId }: Params) {
  const [data, setData] = useState<ZoneDashboardData>({
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
      where('status', '==', 'upcoming'),
      orderBy('date', 'asc'),
    );

    const messagesCol = collection(db, 'leaderMessages');
    const messagesQuery = query(
      messagesCol,
      where('missionId', '==', missionId),
      where('zoneId', '==', zoneId),
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
      setData(prev => ({ ...prev, recentMessages: rows.slice(0, 5) }));
      setLoading(false);
    }, (error) => {
      console.error('Error loading messages:', error);
      setLoading(false);
    });

    return () => {
      unsubEvents();
      unsubMessages();
    };
  }, [missionId, zoneId]);

  return { data, loading };
}

