// src/types/zoneCouncil.ts

export type ZoneCouncilStatus = 'draft' | 'published' | 'completed';

export interface ZoneCouncil {
  id: string;
  missionId: string;
  zoneId: string;

  leaderId: string;
  leaderName: string; // ZL
  title: string;
  date: string;      // "2025-12-03"
  time: string;      // "18:00"
  location: string;  // "Capilla Estaca Norte"

  status: ZoneCouncilStatus;

  summary: {
    spiritualFocus: string;   // enfoque espiritual
    trainingTopic: string;    // tema de capacitación
    mainGoal: string;         // meta principal de la zona
    zoneMotto?: string;       // lema o frase inspiradora de la zona (opcional)
  };

  spiritualStart: {
    scripture: string;
    ideaCentral: string;
    application: string;
  };

  progressByDistrict: string; // resumen por distrito (nombres, tendencias)
  experiences: string;        // milagros y testimonios de la zona

  training: {
    tema: string;
    escritura: string;
    principio: string;
    habilidad: string;
    compromiso: string;
  };

  goals: {
    metasZona: string;
    accionesPorDistrito: string;
    seguimiento: string;
  };

  closing: {
    personas: string;
    misioneros: string;
    unidad: string;
  };

  reportedToMission?: boolean; // si ya se reportó a la misión (AP/Presidente)

  createdAt: any;      // FirebaseTimestamp
  updatedAt: any;
  publishedAt?: any;
  completedAt?: any;
}

export type ZoneCouncilFormState = Omit<
  ZoneCouncil,
  'id' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'completedAt'
> & { id?: string };

