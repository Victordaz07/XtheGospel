// src/hooks/useZoneBaptismalInterviewsList.ts
import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export function useZoneBaptismalInterviewsList(
  missionId: string,
  zoneId: string,
) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const col = collection(db, 'baptismalInterviews');
    const q = query(
      col,
      where('missionId', '==', missionId),
      where('zoneId', '==', zoneId),
      orderBy('date', 'desc'),
    );

    const unsub = onSnapshot(q, snap => {
      const rows: any[] = [];
      snap.forEach(d => rows.push({ id: d.id, ...(d.data() as any) }));
      setItems(rows);
      setLoading(false);
    }, (error) => {
      console.error('Error loading interviews:', error);
      setLoading(false);
    });

    return unsub;
  }, [missionId, zoneId]);

  return { items, loading };
}

