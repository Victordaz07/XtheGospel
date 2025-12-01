// src/hooks/useDistrictCouncil.ts
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
  DistrictCouncilFormState,
  DistrictCouncilStatus,
} from '../types/districtCouncil';

interface UseDistrictCouncilParams {
  councilId?: string;
  missionId: string;
  zoneId: string;
  districtId: string;
  leaderId: string;
  leaderName: string;
}

export function useDistrictCouncil(params: UseDistrictCouncilParams) {
  const { councilId, missionId, zoneId, districtId, leaderId, leaderName } = params;

  const [form, setForm] = useState<DistrictCouncilFormState>(() => ({
    id: councilId,
    missionId,
    zoneId,
    districtId,
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
    },
    spiritualStart: {
      scripture: '',
      ideaCentral: '',
      application: '',
    },
    progress: {
      personasConFecha: '',
      personasEnRiesgo: '',
      investigadoresNuevos: '',
      investigadoresEnIglesia: '',
      comentarios: '',
    },
    experiences: '',
    training: {
      tema: '',
      escritura: '',
      principio: '',
      habilidad: '',
      compromiso: '',
    },
    roleplays: {
      escenario: '',
      objetivo: '',
      puntosFuertes: '',
      aspectosMejorar: '',
      compromiso: '',
    },
    goals: {
      personas: '',
      compromisos: '',
      fechas: '',
      acciones: '',
      seguimiento: '',
    },
    closing: {
      personas: '',
      misioneros: '',
      unidad: '',
    },
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
        const ref = doc(db, 'districtCouncils', councilId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as any;
          setForm(prev => ({
            ...prev,
            id: snap.id,
            ...data,
          }));
        } else {
          setError('Reunión de distrito no encontrada.');
        }
      } catch (e: any) {
        console.error(e);
        setError('Error al cargar la reunión de distrito.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [councilId]);

  // Campo raíz
  const updateField = useCallback(
    <K extends keyof DistrictCouncilFormState>(
      key: K,
      value: DistrictCouncilFormState[K],
    ) => {
      setForm(prev => ({ ...prev, [key]: value }));
    },
    [],
  );

  // Campo anidado
  const updateNestedField = useCallback(
    <K extends keyof DistrictCouncilFormState, P extends keyof DistrictCouncilFormState[K]>(
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
    async (status: DistrictCouncilStatus) => {
      setSaving(true);
      setError(null);

      try {
        const baseData = {
          ...form,
          missionId,
          zoneId,
          districtId,
          leaderId,
          leaderName,
          status,
          updatedAt: serverTimestamp(),
        };

        let currentId = form.id;

        if (!currentId) {
          const colRef = collection(db, 'districtCouncils');
          const docRef = await addDoc(colRef, {
            ...baseData,
            createdAt: serverTimestamp(),
          });
          currentId = docRef.id;
          setForm(prev => ({ ...prev, id: currentId }));
        } else {
          const docRef = doc(db, 'districtCouncils', currentId);
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
        setError('Error al guardar la reunión de distrito.');
        throw e;
      } finally {
        setSaving(false);
      }
    },
    [form, missionId, zoneId, districtId, leaderId, leaderName],
  );

  // 1) Guardar borrador
  const saveDraft = useCallback(async () => {
    return persist('draft');
  }, [persist]);

  // 2) Publicar al distrito (Centro de liderazgo)
  const publishToDistrict = useCallback(async () => {
    if (!form.date || !form.time || !form.location) {
      throw new Error(
        'Falta fecha, hora o lugar para publicar la reunión de distrito.',
      );
    }

    const title =
      form.title || `Reunión de distrito – ${form.date} ${form.time}`;

    const districtCouncilId = await persist('published');

    try {
      const eventsCol = collection(db, 'leadershipEvents');
      await addDoc(eventsCol, {
        type: 'district_council',
        sourceId: districtCouncilId,
        missionId,
        zoneId,
        districtId,
        title,
        description: form.summary?.mainGoal || '',
        date: form.date,
        time: form.time,
        location: form.location,
        leaderName,
        leaderRole: 'district_leader',
        status: 'upcoming',
        createdAt: serverTimestamp(),
      });

      if (districtCouncilId) {
        const councilRef = doc(db, 'districtCouncils', districtCouncilId);
        await updateDoc(councilRef, { publishedAt: serverTimestamp() });
      }
    } catch (e) {
      console.error('Error creando leadershipEvent para reunión de distrito', e);
    }

    return districtCouncilId;
  }, [form, persist, missionId, zoneId, districtId, leaderName]);

  // 3) Marcar como completada
  const completeCouncil = useCallback(async () => {
    if (!form.id) {
      throw new Error('No hay reunión de distrito para completar.');
    }

    setSaving(true);
    setError(null);

    try {
      const ref = doc(db, 'districtCouncils', form.id);
      await updateDoc(ref, {
        status: 'completed',
        completedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setForm(prev => ({ ...prev, status: 'completed' }));
    } catch (e: any) {
      console.error(e);
      setError('Error al completar la reunión de distrito.');
      throw e;
    } finally {
      setSaving(false);
    }
  }, [form]);

  // 4) Compartir agenda (WhatsApp / correo)
  const shareAgenda = useCallback(async () => {
    const text = `
📋 AGENDA – REUNIÓN DE DISTRITO

Distrito: ${districtId}
Fecha: ${form.date || '—'} – Hora: ${form.time || '—'}
Lugar: ${form.location || '—'}
Líder de distrito: ${leaderName}

1️⃣ Enfoque espiritual
• Enfoque: ${form.summary?.spiritualFocus || '—'}
• Escritura / cita: ${form.spiritualStart?.scripture || '—'}
• Idea central: ${form.spiritualStart?.ideaCentral || '—'}

2️⃣ Progreso del distrito
• Personas con fecha: ${form.progress?.personasConFecha || '—'}
• Personas en riesgo: ${form.progress?.personasEnRiesgo || '—'}
• Investigadores nuevos: ${form.progress?.investigadoresNuevos || '—'}
• Investigadores en la Iglesia: ${form.progress?.investigadoresEnIglesia || '—'}

3️⃣ Capacitación
• Tema: ${form.training?.tema || '—'}
• Escritura base: ${form.training?.escritura || '—'}
• Principio: ${form.training?.principio || '—'}
• Habilidad práctica: ${form.training?.habilidad || '—'}
• Compromiso del distrito: ${form.training?.compromiso || '—'}

4️⃣ Metas y acciones
• Personas a enseñar: ${form.goals?.personas || '—'}
• Compromisos: ${form.goals?.compromisos || '—'}
• Fechas: ${form.goals?.fechas || '—'}
• Acciones: ${form.goals?.acciones || '—'}

"Cada número representa personas reales, hijos de Dios."
    `.trim();

    await Share.share({ message: text });
  }, [form, districtId, leaderName]);

  return {
    form,
    setForm,
    updateField,
    updateNestedField,
    loading,
    saving,
    error,
    saveDraft,
    publishToDistrict,
    completeCouncil,
    shareAgenda,
  };
}

