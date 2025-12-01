// src/hooks/useDistrictBaptismalInterviewsList.ts
import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export function useDistrictBaptismalInterviewsList(
  missionId: string,
  zoneId: string,
  districtId: string,
) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const col = collection(db, 'baptismalInterviews');
    const q = query(
      col,
      where('missionId', '==', missionId),
      where('zoneId', '==', zoneId),
      where('districtId', '==', districtId),
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
  }, [missionId, zoneId, districtId]);

  return { items, loading };
}

