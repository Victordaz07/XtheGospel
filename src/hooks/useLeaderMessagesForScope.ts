// src/hooks/useLeaderMessagesForScope.ts
import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

interface Params {
  missionId: string;
  zoneId?: string;
  districtId?: string;
  scope: 'district' | 'zone' | 'mission';
}

export function useLeaderMessagesForScope(params: Params) {
  const { missionId, zoneId, districtId, scope } = params;
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const col = collection(db, 'leaderMessages');
    const constraints = [
      where('missionId', '==', missionId),
      where('status', '==', 'published'),
      where('targetScope', '==', scope),
    ];

    if (scope === 'zone' && zoneId) {
      constraints.push(where('zoneId', '==', zoneId));
    } else if (scope === 'district' && districtId) {
      constraints.push(where('districtId', '==', districtId));
    }

    const q = query(
      col,
      ...constraints,
      orderBy('createdAt', 'desc'),
    );

    const unsub = onSnapshot(q, snap => {
      const rows: any[] = [];
      snap.forEach(d => rows.push({ id: d.id, ...(d.data() as any) }));
      setMessages(rows);
      setLoading(false);
    }, (error) => {
      console.error('Error loading messages:', error);
      setLoading(false);
    });

    return unsub;
  }, [missionId, zoneId, districtId, scope]);

  return { messages, loading };
}

