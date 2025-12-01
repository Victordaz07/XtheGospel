// src/services/baptismalInterviewService.ts
// Servicio para gestionar entrevistas bautismales

export type InterviewStatus = 'draft' | 'scheduled' | 'completed' | 'cancelled';

export interface BaptismalInterview {
  id: string;
  missionId?: string;
  zoneId?: string;
  districtId?: string;
  personName: string;
  personId?: string;
  teachingCompanionship: string;
  teachingArea: string;
  interviewLeaderId: string;
  interviewLeaderName: string;
  interviewLeaderRole: 'district_leader' | 'zone_leader' | 'assistant_to_president';
  createdById: string;
  createdByRole: 'district_leader' | 'zone_leader' | 'assistant_to_president';
  date: string;
  time: string;
  place: string;
  status: InterviewStatus;
  
  notesBefore: {
    lessonsTaught: string;
    concerns: string;
    specialNeeds: string;
  };
  
  spiritualChecklist: {
    understandsGospel: boolean;
    understandsCovenants: boolean;
    willingToKeepCommandments: boolean;
    testimonyOfChrist: boolean;
    testimonyOfRestoration: boolean;
  };
  
  pastoralNotes: {
    testimonyImpression: string;
    recommendedFocusBeforeBaptism: string;
    recommendedFocusAfterBaptism: string;
    risksIfNotSupported: string;
  };
  
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

const BAPTISMAL_INTERVIEWS_KEY = '@baptismalInterviews';
const LEADERSHIP_EVENTS_KEY = '@leadershipEvents';

export const BaptismalInterviewService = {
  // Guardar/actualizar entrevista
  saveInterview: (interview: Omit<BaptismalInterview, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): BaptismalInterview => {
    try {
      const interviews = BaptismalInterviewService.getAllInterviews();
      const now = new Date().toISOString();
      
      const newInterview: BaptismalInterview = {
        ...interview,
        id: interview.id || `interview_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: interview.id ? interviews.find(i => i.id === interview.id)?.createdAt || now : now,
        updatedAt: now
      };
      
      const index = interviews.findIndex(i => i.id === newInterview.id);
      if (index >= 0) {
        interviews[index] = newInterview;
      } else {
        interviews.push(newInterview);
      }
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(BAPTISMAL_INTERVIEWS_KEY, JSON.stringify(interviews));
      }
      
      return newInterview;
    } catch (e) {
      console.error('Error guardando entrevista:', e);
      throw e;
    }
  },

  // Publicar al compañerismo
  publishInterview: (interviewId: string): BaptismalInterview | null => {
    try {
      const interviews = BaptismalInterviewService.getAllInterviews();
      const interview = interviews.find(i => i.id === interviewId);
      
      if (!interview) return null;
      
      interview.status = 'scheduled';
      interview.updatedAt = new Date().toISOString();
      
      // Crear evento de liderazgo
      BaptismalInterviewService.createLeadershipEvent({
        type: 'baptismal_interview',
        sourceId: interviewId,
        title: `Entrevista bautismal – ${interview.personName} – ${interview.date} ${interview.time}`,
        description: `Entrevistador: ${interview.interviewLeaderName} | Lugar: ${interview.place}`,
        date: interview.date,
        time: interview.time,
        location: interview.place,
        leaderName: interview.interviewLeaderName,
        leaderRole: interview.interviewLeaderRole,
        status: 'upcoming',
        districtId: interview.districtId,
        zoneId: interview.zoneId,
        companionshipName: interview.teachingCompanionship
      });
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(BAPTISMAL_INTERVIEWS_KEY, JSON.stringify(interviews));
      }
      
      return interview;
    } catch (e) {
      console.error('Error publicando entrevista:', e);
      throw e;
    }
  },

  // Completar entrevista
  completeInterview: (interviewId: string): BaptismalInterview | null => {
    try {
      const interviews = BaptismalInterviewService.getAllInterviews();
      const interview = interviews.find(i => i.id === interviewId);
      
      if (!interview) return null;
      
      interview.status = 'completed';
      interview.completedAt = new Date().toISOString();
      interview.updatedAt = new Date().toISOString();
      
      // Actualizar evento de liderazgo
      const events = BaptismalInterviewService.getAllLeadershipEvents();
      const eventIndex = events.findIndex(e => e.sourceId === interviewId && e.type === 'baptismal_interview');
      if (eventIndex >= 0) {
        events[eventIndex].status = 'past';
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(LEADERSHIP_EVENTS_KEY, JSON.stringify(events));
        }
      }
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(BAPTISMAL_INTERVIEWS_KEY, JSON.stringify(interviews));
      }
      
      return interview;
    } catch (e) {
      console.error('Error completando entrevista:', e);
      throw e;
    }
  },

  // Obtener todas las entrevistas
  getAllInterviews: (): BaptismalInterview[] => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const json = localStorage.getItem(BAPTISMAL_INTERVIEWS_KEY);
        if (json) {
          return JSON.parse(json);
        }
      }
      return [];
    } catch (e) {
      console.error('Error cargando entrevistas:', e);
      return [];
    }
  },

  // Obtener entrevista por ID
  getInterviewById: (id: string): BaptismalInterview | null => {
    const interviews = BaptismalInterviewService.getAllInterviews();
    return interviews.find(i => i.id === id) || null;
  },

  // Obtener entrevistas por distrito
  getInterviewsByDistrict: (districtId: string): BaptismalInterview[] => {
    return BaptismalInterviewService.getAllInterviews()
      .filter(i => i.districtId === districtId)
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`).getTime();
        const dateB = new Date(`${b.date}T${b.time}`).getTime();
        return dateA - dateB;
      });
  },

  // Obtener entrevistas por zona
  getInterviewsByZone: (zoneId: string): BaptismalInterview[] => {
    return BaptismalInterviewService.getAllInterviews()
      .filter(i => i.zoneId === zoneId)
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`).getTime();
        const dateB = new Date(`${b.date}T${b.time}`).getTime();
        return dateA - dateB;
      });
  },

  // Obtener entrevistas programadas
  getScheduled: (districtId?: string, zoneId?: string): BaptismalInterview[] => {
    let interviews = BaptismalInterviewService.getAllInterviews().filter(i => i.status === 'scheduled');
    
    if (districtId) {
      interviews = interviews.filter(i => i.districtId === districtId);
    }
    if (zoneId) {
      interviews = interviews.filter(i => i.zoneId === zoneId);
    }
    
    return interviews.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`).getTime();
      const dateB = new Date(`${b.date}T${b.time}`).getTime();
      return dateA - dateB;
    });
  },

  // Obtener entrevistas completadas
  getCompleted: (districtId?: string, zoneId?: string): BaptismalInterview[] => {
    let interviews = BaptismalInterviewService.getAllInterviews().filter(i => i.status === 'completed');
    
    if (districtId) {
      interviews = interviews.filter(i => i.districtId === districtId);
    }
    if (zoneId) {
      interviews = interviews.filter(i => i.zoneId === zoneId);
    }
    
    return interviews.sort((a, b) => {
      const dateA = new Date(a.completedAt || a.date).getTime();
      const dateB = new Date(b.completedAt || b.date).getTime();
      return dateB - dateA;
    });
  },

  // Obtener borradores
  getDrafts: (leaderId?: string): BaptismalInterview[] => {
    let interviews = BaptismalInterviewService.getAllInterviews().filter(i => i.status === 'draft');
    if (leaderId) {
      interviews = interviews.filter(i => i.createdById === leaderId);
    }
    return interviews.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  // Obtener entrevistas para un compañerismo
  getInterviewsForCompanionship: (companionshipName: string): BaptismalInterview[] => {
    return BaptismalInterviewService.getAllInterviews()
      .filter(i => i.teachingCompanionship === companionshipName && i.status === 'scheduled')
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`).getTime();
        const dateB = new Date(`${b.date}T${b.time}`).getTime();
        return dateA - dateB;
      });
  },

  // Crear evento de liderazgo
  createLeadershipEvent: (event: {
    type: 'baptismal_interview';
    sourceId: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    leaderName: string;
    leaderRole: 'district_leader' | 'zone_leader' | 'assistant_to_president';
    status: 'upcoming' | 'past';
    districtId?: string;
    zoneId?: string;
    companionshipName?: string;
  }): void => {
    try {
      const events = BaptismalInterviewService.getAllLeadershipEvents();
      const newEvent = {
        ...event,
        id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      };
      
      events.push(newEvent);
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(LEADERSHIP_EVENTS_KEY, JSON.stringify(events));
      }
    } catch (e) {
      console.error('Error creando evento:', e);
    }
  },

  // Obtener eventos de liderazgo
  getAllLeadershipEvents: (): any[] => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const json = localStorage.getItem(LEADERSHIP_EVENTS_KEY);
        if (json) {
          return JSON.parse(json);
        }
      }
      return [];
    } catch (e) {
      console.error('Error cargando eventos:', e);
      return [];
    }
  },

  // Obtener entrevistas para un compañerismo (vía eventos)
  getInterviewsForCompanionshipViaEvents: (companionshipName: string): any[] => {
    const events = BaptismalInterviewService.getAllLeadershipEvents();
    return events
      .filter(e => e.type === 'baptismal_interview' && e.companionshipName === companionshipName)
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
        const dateB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
        return dateA - dateB;
      });
  },

  // Obtener entrevistas para un misionero (por districtId)
  getInterviewsForMissionary: (districtId: string): any[] => {
    const events = BaptismalInterviewService.getAllLeadershipEvents();
    return events
      .filter(e => e.type === 'baptismal_interview' && e.districtId === districtId && e.status === 'upcoming')
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
        const dateB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
        return dateA - dateB;
      });
  },

  // Eliminar entrevista
  deleteInterview: (interviewId: string): boolean => {
    try {
      const interviews = BaptismalInterviewService.getAllInterviews();
      const filtered = interviews.filter(i => i.id !== interviewId);
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(BAPTISMAL_INTERVIEWS_KEY, JSON.stringify(filtered));
      }
      
      return true;
    } catch (e) {
      console.error('Error eliminando entrevista:', e);
      return false;
    }
  }
};

