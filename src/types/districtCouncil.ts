// src/types/districtCouncil.ts

export type DistrictCouncilStatus = 'draft' | 'published' | 'completed';

export interface DistrictCouncil {
  id: string;
  missionId: string;
  zoneId: string;
  districtId: string;

  leaderId: string;
  leaderName: string; // LD
  title: string;
  date: string;      // "2025-12-03"
  time: string;      // "18:00"
  location: string;  // "Capilla Estaca Norte"

  status: DistrictCouncilStatus;

  summary: {
    spiritualFocus: string;   // enfoque espiritual
    trainingTopic: string;    // tema de capacitación
    mainGoal: string;         // meta principal del distrito
  };

  spiritualStart: {
    scripture: string;
    ideaCentral: string;
    application: string;
  };

  progress: {
    personasConFecha: string;
    personasEnRiesgo: string;
    investigadoresNuevos: string;
    investigadoresEnIglesia: string;
    comentarios: string;
  };

  experiences: string;        // milagros y testimonios del distrito

  training: {
    tema: string;
    escritura: string;
    principio: string;
    habilidad: string;
    compromiso: string;
  };

  roleplays: {
    escenario: string;
    objetivo: string;
    puntosFuertes: string;
    aspectosMejorar: string;
    compromiso: string;
  };

  goals: {
    personas: string;
    compromisos: string;
    fechas: string;
    acciones: string;
    seguimiento: string;
  };

  closing: {
    personas: string;
    misioneros: string;
    unidad: string;
  };

  createdAt: any;      // FirebaseTimestamp
  updatedAt: any;
  publishedAt?: any;
  completedAt?: any;
}

export type DistrictCouncilFormState = Omit<
  DistrictCouncil,
  'id' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'completedAt'
> & { id?: string };

