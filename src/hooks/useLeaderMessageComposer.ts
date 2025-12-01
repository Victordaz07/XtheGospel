// src/hooks/useLeaderMessageComposer.ts
import { useState, useCallback } from 'react';
import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

interface Params {
  missionId: string;
  zoneId: string;
  districtId?: string;
  senderId: string;
  senderName: string;
  senderRole: 'district_leader' | 'zone_leader' | 'assistant_to_president';
  defaultScope?: 'district' | 'zone' | 'mission';
}

export function useLeaderMessageComposer(params: Params) {
  const {
    missionId,
    zoneId,
    districtId,
    senderId,
    senderName,
    senderRole,
    defaultScope = 'zone',
  } = params;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [scripture, setScripture] = useState('');
  const [type, setType] = useState<'devotional' | 'invitation' | 'training' | 'announcement'>('devotional');
  const [scope, setScope] = useState<'district' | 'zone' | 'mission'>(defaultScope);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const publish = useCallback(async () => {
    if (!title.trim() || !body.trim()) {
      setError('Título y mensaje son requeridos.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const col = collection(db, 'leaderMessages');
      await addDoc(col, {
        missionId,
        zoneId,
        districtId: scope === 'district' ? districtId : undefined,
        senderId,
        senderName,
        senderRole,
        title: title.trim(),
        body: body.trim(),
        scripture: scripture.trim() || undefined,
        type,
        targetScope: scope,
        status: 'published',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: serverTimestamp(),
      });

      // Limpiar formulario
      setTitle('');
      setBody('');
      setScripture('');
    } catch (e: any) {
      console.error('Error publishing message:', e);
      setError('Error al publicar el mensaje.');
      throw e;
    } finally {
      setSaving(false);
    }
  }, [title, body, scripture, type, scope, missionId, zoneId, districtId, senderId, senderName, senderRole]);

  return {
    title,
    setTitle,
    body,
    setBody,
    scripture,
    setScripture,
    type,
    setType,
    scope,
    setScope,
    publish,
    saving,
    error,
  };
}

