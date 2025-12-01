// src/hooks/useZoneCouncil.ts
import { useCallback, useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { Share } from 'react-native';
import { db } from '../config/firebaseConfig';
import {
  ZoneCouncilFormState,
  ZoneCouncilStatus,
} from '../types/zoneCouncil';

interface UseZoneCouncilParams {
  councilId?: string;
  missionId: string;
  zoneId: string;
  leaderId: string;
  leaderName: string;
}

export function useZoneCouncil(params: UseZoneCouncilParams) {
  const { councilId, missionId, zoneId, leaderId, leaderName } = params;

  const [form, setForm] = useState<ZoneCouncilFormState>(() => ({
    id: councilId,
    missionId,
    zoneId,
    leaderId,
    leaderName,
    title: '',
    date: '',
    time: '',
    location: '',
    status: 'draft',
    summary: {
      spiritualFocus: '',
      trainingTopic: '',
      mainGoal: '',
      zoneMotto: '',
    },
    spiritualStart: {
      scripture: '',
      ideaCentral: '',
      application: '',
    },
    progressByDistrict: '',
    experiences: '',
    training: {
      tema: '',
      escritura: '',
      principio: '',
      habilidad: '',
      compromiso: '',
    },
    goals: {
      metasZona: '',
      accionesPorDistrito: '',
      seguimiento: '',
    },
    closing: {
      personas: '',
      misioneros: '',
      unidad: '',
    },
    reportedToMission: false,
  }));

  const [loading, setLoading] = useState<boolean>(!!councilId);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar consejo existente
  useEffect(() => {
    if (!councilId) return;

    const load = async () => {
      setLoading(true);
      try {
        const ref = doc(db, 'zoneCouncils', councilId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as any;
          setForm(prev => ({
            ...prev,
            id: snap.id,
            ...data,
          }));
        } else {
          setError('Reunión de zona no encontrada.');
        }
      } catch (e: any) {
        console.error(e);
        setError('Error al cargar la reunión de zona.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [councilId]);

  // Campo raíz
  const updateField = useCallback(
    <K extends keyof ZoneCouncilFormState>(
      key: K,
      value: ZoneCouncilFormState[K],
    ) => {
      setForm(prev => ({ ...prev, [key]: value }));
    },
    [],
  );

  // Campo anidado
  const updateNestedField = useCallback(
    <K extends keyof ZoneCouncilFormState, P extends keyof ZoneCouncilFormState[K]>(
      key: K,
      prop: P,
      value: any,
    ) => {
      setForm(prev => ({
        ...prev,
        [key]: {
          ...(prev[key] as any),
          [prop]: value,
        },
      }));
    },
    [],
  );

  const persist = useCallback(
    async (status: ZoneCouncilStatus) => {
      setSaving(true);
      setError(null);

      try {
        const baseData = {
          ...form,
          missionId,
          zoneId,
          leaderId,
          leaderName,
          status,
          updatedAt: serverTimestamp(),
        };

        let currentId = form.id;

        if (!currentId) {
          const colRef = collection(db, 'zoneCouncils');
          const docRef = await addDoc(colRef, {
            ...baseData,
            createdAt: serverTimestamp(),
          });
          currentId = docRef.id;
          setForm(prev => ({ ...prev, id: currentId }));
        } else {
          const docRef = doc(db, 'zoneCouncils', currentId);
          await setDoc(
            docRef,
            {
              ...baseData,
              createdAt: (form as any).createdAt ?? serverTimestamp(),
            },
            { merge: true },
          );
        }

        return currentId;
      } catch (e: any) {
        console.error(e);
        setError('Error al guardar la reunión de zona.');
        throw e;
      } finally {
        setSaving(false);
      }
    },
    [form, missionId, zoneId, leaderId, leaderName],
  );

  // 1) Guardar borrador
  const saveDraft = useCallback(async () => {
    return persist('draft');
  }, [persist]);

  // 2) Publicar a la zona (Centro de liderazgo)
  const publishToZone = useCallback(async () => {
    if (!form.date || !form.time || !form.location) {
      throw new Error(
        'Falta fecha, hora o lugar para publicar la reunión de zona.',
      );
    }

    const title =
      form.title || `Reunión de zona – ${form.date} ${form.time}`;

    const zoneCouncilId = await persist('published');

    try {
      const eventsCol = collection(db, 'leadershipEvents');
      await addDoc(eventsCol, {
        type: 'zone_council',
        sourceId: zoneCouncilId,
        missionId,
        zoneId,
        title,
        description: form.summary?.mainGoal || '',
        date: form.date,
        time: form.time,
        location: form.location,
        leaderName,
        leaderRole: 'zone_leader',
        status: 'upcoming',
        createdAt: serverTimestamp(),
      });

      if (zoneCouncilId) {
        const councilRef = doc(db, 'zoneCouncils', zoneCouncilId);
        await updateDoc(councilRef, { publishedAt: serverTimestamp() });
      }
    } catch (e) {
      console.error('Error creando leadershipEvent para reunión de zona', e);
    }

    return zoneCouncilId;
  }, [form, persist, missionId, zoneId, leaderName]);

  // 3) Marcar como completada
  const completeCouncil = useCallback(async () => {
    if (!form.id) {
      throw new Error('No hay reunión de zona para completar.');
    }

    setSaving(true);
    setError(null);

    try {
      const ref = doc(db, 'zoneCouncils', form.id);
      await updateDoc(ref, {
        status: 'completed',
        completedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setForm(prev => ({ ...prev, status: 'completed' }));
    } catch (e: any) {
      console.error(e);
      setError('Error al completar la reunión de zona.');
      throw e;
    } finally {
      setSaving(false);
    }
  }, [form]);

  // 4) Compartir agenda (WhatsApp / correo)
  const shareAgenda = useCallback(async () => {
    const text = `
📋 AGENDA – REUNIÓN DE ZONA

Zona: ${zoneId}
Fecha: ${form.date || '—'} – Hora: ${form.time || '—'}
Lugar: ${form.location || '—'}
Líder de zona: ${leaderName}

1️⃣ Enfoque espiritual
• Enfoque: ${form.summary?.spiritualFocus || '—'}
• Escritura / cita: ${form.spiritualStart?.scripture || '—'}
• Idea central: ${form.spiritualStart?.ideaCentral || '—'}

2️⃣ Progreso por distrito
${form.progressByDistrict || '—'}

3️⃣ Capacitación
• Tema: ${form.training?.tema || '—'}
• Escritura base: ${form.training?.escritura || '—'}
• Principio: ${form.training?.principio || '—'}
• Habilidad práctica: ${form.training?.habilidad || '—'}
• Compromiso de la zona: ${form.training?.compromiso || '—'}

4️⃣ Metas y acciones
• Metas de la zona: ${form.goals?.metasZona || '—'}
• Acciones por distrito: ${form.goals?.accionesPorDistrito || '—'}
• Cómo daremos seguimiento: ${form.goals?.seguimiento || '—'}

"Cada número representa personas reales, hijos de Dios."
    `.trim();

    await Share.share({ message: text });
  }, [form, zoneId, leaderName]);

  return {
    form,
    setForm,
    updateField,
    updateNestedField,
    loading,
    saving,
    error,
    saveDraft,
    publishToZone,
    completeCouncil,
    shareAgenda,
  };
}

