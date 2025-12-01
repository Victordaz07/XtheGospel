// src/hooks/usePersonalNote.ts
import { useState, useCallback, useEffect } from 'react';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

interface Params {
  noteId?: string;
  missionId: string;
  zoneId: string;
  districtId?: string;
  leaderId: string;
  leaderName: string;
  leaderRole: 'district_leader' | 'zone_leader' | 'assistant_to_president';
}

export function usePersonalNote(params: Params) {
  const { noteId, missionId, zoneId, districtId, leaderId, leaderName, leaderRole } = params;

  const [form, setForm] = useState({
    title: '',
    body: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar nota existente
  useEffect(() => {
    if (!noteId) return;

    const load = async () => {
      try {
        const ref = doc(db, 'personalNotes', noteId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setForm({
            title: data.title || '',
            body: data.body || '',
          });
        }
      } catch (e: any) {
        console.error('Error loading note:', e);
      }
    };

    load();
  }, [noteId]);

  const updateField = useCallback((key: 'title' | 'body', value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  const saveNote = useCallback(async () => {
    if (!form.title.trim() && !form.body.trim()) {
      setError('La nota debe tener título o contenido.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const baseData = {
        missionId,
        zoneId,
        districtId,
        leaderId,
        leaderName,
        leaderRole,
        title: form.title.trim(),
        body: form.body.trim(),
        updatedAt: serverTimestamp(),
      };

      if (noteId) {
        const ref = doc(db, 'personalNotes', noteId);
        await updateDoc(ref, baseData);
      } else {
        const col = collection(db, 'personalNotes');
        await addDoc(col, {
          ...baseData,
          createdAt: serverTimestamp(),
        });
      }
    } catch (e: any) {
      console.error('Error saving note:', e);
      setError('Error al guardar la nota.');
      throw e;
    } finally {
      setSaving(false);
    }
  }, [form, noteId, missionId, zoneId, districtId, leaderId, leaderName, leaderRole]);

  const promoteToDistrictMessage = useCallback(async () => {
    if (!form.title.trim() && !form.body.trim()) {
      setError('La nota debe tener título o contenido para compartir.');
      return;
    }

    try {
      const messagesCol = collection(db, 'leaderMessages');
      await addDoc(messagesCol, {
        missionId,
        zoneId,
        districtId: districtId || undefined,
        senderId: leaderId,
        senderName: leaderName,
        senderRole: leaderRole,
        title: form.title.trim() || 'Mensaje del líder',
        body: form.body.trim(),
        scripture: '',
        type: 'encouragement',
        targetScope: leaderRole === 'district_leader' ? 'district' : leaderRole === 'zone_leader' ? 'zone' : 'mission',
        status: 'published',
        createdAt: serverTimestamp(),
      });
    } catch (e: any) {
      console.error('Error promoting note to message:', e);
      setError('Error al compartir como mensaje.');
      throw e;
    }
  }, [form, missionId, zoneId, districtId, leaderId, leaderName, leaderRole]);

  const promoteToZoneMessage = useCallback(async () => {
    // Para zone leaders, promueve a mensaje de zona
    if (!form.title.trim() && !form.body.trim()) {
      setError('La nota debe tener título o contenido para compartir.');
      return;
    }

    try {
      const messagesCol = collection(db, 'leaderMessages');
      await addDoc(messagesCol, {
        missionId,
        zoneId,
        districtId: undefined,
        senderId: leaderId,
        senderName: leaderName,
        senderRole: leaderRole,
        title: form.title.trim() || 'Mensaje del líder',
        body: form.body.trim(),
        scripture: '',
        type: 'encouragement',
        targetScope: 'zone',
        status: 'published',
        createdAt: serverTimestamp(),
      });
    } catch (e: any) {
      console.error('Error promoting note to zone message:', e);
      setError('Error al compartir como mensaje.');
      throw e;
    }
  }, [form, missionId, zoneId, leaderId, leaderName, leaderRole]);

  return {
    form,
    updateField,
    saveNote,
    promoteToDistrictMessage: promoteToZoneMessage,
    promoteToZoneMessage,
    saving,
    error,
  };
}

