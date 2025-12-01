// src/hooks/useLeadershipFeed.ts
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

interface LeadershipEvent {
  id: string;
  missionId: string;
  zoneId?: string;
  districtId?: string;
  title: string;
  description?: string;
  type: string;
  date: string;
  time?: string;
  location?: string;
  leaderName?: string;
  leaderRole?: string;
}

interface LeadershipMessage {
  id: string;
  missionId: string;
  zoneId?: string;
  districtId?: string;
  senderName: string;
  senderRole: string;
  title: string;
  body: string;
  scripture?: string;
  targetScope: 'district' | 'zone' | 'mission';
  createdAt?: any;
}

interface Params {
  missionId: string;
  zoneId?: string;
  districtId?: string;
}

interface Result {
  events: LeadershipEvent[];
  messages: LeadershipMessage[];
  loading: boolean;
}

export function useLeadershipFeed({ missionId, zoneId, districtId }: Params): Result {
  const [events, setEvents] = useState<LeadershipEvent[]>([]);
  const [messages, setMessages] = useState<LeadershipMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!missionId) return;

    // Eventos: filtramos por misión y luego filtramos en cliente por zona/distrito.
    const eventsCol = collection(db, 'leadershipEvents');
    const eventsQuery = query(
      eventsCol,
      where('missionId', '==', missionId),
      orderBy('date', 'asc'),
    );

    const unsubEvents = onSnapshot(eventsQuery, snap => {
      const rows: LeadershipEvent[] = [];
      snap.forEach(d => {
        const data = d.data() as any;
        rows.push({
          id: d.id,
          ...data,
        });
      });

      const today = new Date().toISOString().slice(0, 10);

      const filtered = rows.filter(ev => {
        // Solo eventos que aún no han pasado (o de hoy)
        if (ev.date && ev.date < today) return false;

        // Eventos para toda la misión
        if (!ev.zoneId && !ev.districtId) return true;

        // Eventos de zona
        if (ev.zoneId && zoneId && ev.zoneId === zoneId) return true;

        // Eventos de distrito
        if (ev.districtId && districtId && ev.districtId === districtId) return true;

        return false;
      });

      setEvents(filtered);
      setLoading(prev => prev && false);
    }, (error) => {
      console.error('Error loading events:', error);
      setLoading(false);
    });

    // Mensajes: también filtramos por misión y luego por alcance
    const msgCol = collection(db, 'leaderMessages');
    const msgQuery = query(
      msgCol,
      where('missionId', '==', missionId),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc'),
    );

    const unsubMessages = onSnapshot(msgQuery, snap => {
      const rows: LeadershipMessage[] = [];
      snap.forEach(d => {
        const data = d.data() as any;
        rows.push({
          id: d.id,
          ...data,
        });
      });

      const filtered = rows.filter(msg => {
        if (msg.targetScope === 'mission') return true;

        if (msg.targetScope === 'zone') {
          if (!zoneId) return false;
          return msg.zoneId === zoneId;
        }

        if (msg.targetScope === 'district') {
          if (!districtId) return false;
          return msg.districtId === districtId;
        }

        return false;
      });

      setMessages(filtered);
      setLoading(prev => prev && false);
    }, (error) => {
      console.error('Error loading messages:', error);
      setLoading(false);
    });

    return () => {
      unsubEvents();
      unsubMessages();
    };
  }, [missionId, zoneId, districtId]);

  return { events, messages, loading };
}

