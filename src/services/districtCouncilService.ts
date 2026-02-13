// src/services/districtCouncilService.ts
// Servicio para gestionar reuniones de distrito

export type CouncilStatus = 'draft' | 'published' | 'completed';

export interface DistrictCouncil {
  id: string;
  missionId?: string;
  zoneId?: string;
  districtId?: string;
  leaderId: string;
  leaderName: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: CouncilStatus;

  // Resumen rápido
  summary: {
    spiritualFocus: string;
    trainingTopic: string;
    mainGoal: string;
  };

  // Bloques de contenido
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

  experiences: string;

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
    resumen: string;
  };

  closing: {
    personas: string;
    misioneros: string;
    unidad: string;
  };

  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  completedAt?: string;
}

export interface DistrictCouncilComment {
  id: string;
  councilId: string;
  authorId: string;
  authorName: string;
  authorRole: 'missionary' | 'district_leader' | 'zone_leader' | 'assistant_to_president';
  text: string;
  createdAt: string;
}

const DISTRICT_COUNCILS_KEY = '@districtCouncils';
const LEADERSHIP_EVENTS_KEY = '@leadershipEvents';
const COUNCIL_COMMENTS_KEY = '@councilComments';

export const DistrictCouncilService = {
  // Guardar/actualizar reunión
  saveCouncil: (council: Omit<DistrictCouncil, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): DistrictCouncil => {
    try {
      const councils = DistrictCouncilService.getAllCouncils();
      const now = new Date().toISOString();
      const id = council.id ?? `council_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newCouncil: DistrictCouncil = {
        ...council,
        id,
        createdAt: council.id ? councils.find(c => c.id === council.id)?.createdAt ?? now : now,
        updatedAt: now
      };

      const index = councils.findIndex(c => c.id === newCouncil.id);
      if (index >= 0) {
        councils[index] = newCouncil;
      } else {
        councils.push(newCouncil);
      }

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(DISTRICT_COUNCILS_KEY, JSON.stringify(councils));
      }

      return newCouncil;
    } catch (e) {
      console.error('Error guardando reunión:', e);
      throw e;
    }
  },

  // Publicar al distrito
  publishCouncil: (councilId: string): DistrictCouncil | null => {
    try {
      const councils = DistrictCouncilService.getAllCouncils();
      const council = councils.find(c => c.id === councilId);

      if (!council) return null;

      council.status = 'published';
      council.publishedAt = new Date().toISOString();
      council.updatedAt = new Date().toISOString();

      // Crear evento de liderazgo
      DistrictCouncilService.createLeadershipEvent({
        type: 'district_council',
        sourceId: councilId,
        title: `Reunión de Distrito – ${council.date} ${council.time}`,
        description: council.summary.spiritualFocus || 'Reunión de distrito programada',
        date: council.date,
        time: council.time,
        location: council.location,
        leaderName: council.leaderName || 'Líder de Distrito',
        leaderRole: 'district_leader',
        status: 'upcoming',
        districtId: council.districtId
      });

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(DISTRICT_COUNCILS_KEY, JSON.stringify(councils));
      }

      return council;
    } catch (e) {
      console.error('Error publicando reunión:', e);
      throw e;
    }
  },

  // Obtener todas las reuniones
  getAllCouncils: (): DistrictCouncil[] => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const json = localStorage.getItem(DISTRICT_COUNCILS_KEY);
        if (json) {
          return JSON.parse(json);
        }
      }
      return [];
    } catch (e) {
      console.error('Error cargando reuniones:', e);
      return [];
    }
  },

  // Obtener reunión por ID
  getCouncilById: (id: string): DistrictCouncil | null => {
    const councils = DistrictCouncilService.getAllCouncils();
    return councils.find(c => c.id === id) || null;
  },

  // Obtener borradores
  getDrafts: (): DistrictCouncil[] => {
    return DistrictCouncilService.getAllCouncils().filter(c => c.status === 'draft');
  },

  // Obtener publicadas
  getPublished: (districtId?: string): DistrictCouncil[] => {
    let councils = DistrictCouncilService.getAllCouncils().filter(c => c.status === 'published');
    if (districtId) {
      councils = councils.filter(c => c.districtId === districtId);
    }
    return councils.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`).getTime();
      const dateB = new Date(`${b.date}T${b.time}`).getTime();
      return dateB - dateA; // Más recientes primero
    });
  },

  // Crear evento de liderazgo
  createLeadershipEvent: (event: {
    type: 'district_council' | 'zone_council' | 'mission_broadcast';
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
  }): void => {
    try {
      const events = DistrictCouncilService.getAllLeadershipEvents();
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

  // Obtener eventos para un distrito
  getEventsForDistrict: (districtId: string): any[] => {
    const events = DistrictCouncilService.getAllLeadershipEvents();
    return events.filter(e => e.districtId === districtId)
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`).getTime();
        const dateB = new Date(`${b.date}T${b.time}`).getTime();
        return dateA - dateB; // Próximas primero
      });
  },

  // Agregar comentario
  addComment: (comment: Omit<DistrictCouncilComment, 'id' | 'createdAt'>): DistrictCouncilComment => {
    try {
      const comments = DistrictCouncilService.getCommentsByCouncil(comment.councilId);
      const newComment: DistrictCouncilComment = {
        ...comment,
        id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      };

      comments.push(newComment);

      if (typeof window !== 'undefined' && window.localStorage) {
        const allComments = DistrictCouncilService.getAllComments();
        const otherComments = allComments.filter(c => c.councilId !== comment.councilId);
        localStorage.setItem(COUNCIL_COMMENTS_KEY, JSON.stringify([...otherComments, ...comments]));
      }

      return newComment;
    } catch (e) {
      console.error('Error agregando comentario:', e);
      throw e;
    }
  },

  // Obtener comentarios de una reunión
  getCommentsByCouncil: (councilId: string): DistrictCouncilComment[] => {
    try {
      const allComments = DistrictCouncilService.getAllComments();
      return allComments
        .filter(c => c.councilId === councilId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } catch (e) {
      console.error('Error cargando comentarios:', e);
      return [];
    }
  },

  // Obtener todos los comentarios
  getAllComments: (): DistrictCouncilComment[] => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const json = localStorage.getItem(COUNCIL_COMMENTS_KEY);
        if (json) {
          return JSON.parse(json);
        }
      }
      return [];
    } catch (e) {
      console.error('Error cargando comentarios:', e);
      return [];
    }
  },

  // Marcar como leída (para misioneros)
  markAsRead: (eventId: string, userId: string): void => {
    try {
      const key = `@eventRead_${eventId}_${userId}`;
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, new Date().toISOString());
      }
    } catch (e) {
      console.error('Error marcando como leída:', e);
    }
  },

  // Verificar si está leída
  isRead: (eventId: string, userId: string): boolean => {
    try {
      const key = `@eventRead_${eventId}_${userId}`;
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key) !== null;
      }
      return false;
    } catch (e) {
      return false;
    }
  },

  // Completar reunión
  completeCouncil: (councilId: string): DistrictCouncil | null => {
    try {
      const councils = DistrictCouncilService.getAllCouncils();
      const council = councils.find(c => c.id === councilId);

      if (!council) return null;

      council.status = 'completed';
      council.completedAt = new Date().toISOString();
      council.updatedAt = new Date().toISOString();

      // Actualizar evento de liderazgo
      const events = DistrictCouncilService.getAllLeadershipEvents();
      const eventIndex = events.findIndex(e => e.sourceId === councilId && e.type === 'district_council');
      if (eventIndex >= 0) {
        events[eventIndex].status = 'past';
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(LEADERSHIP_EVENTS_KEY, JSON.stringify(events));
        }
      }

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(DISTRICT_COUNCILS_KEY, JSON.stringify(councils));
      }

      return council;
    } catch (e) {
      console.error('Error completando reunión:', e);
      throw e;
    }
  },

  // Obtener reuniones por distrito (para historial)
  getCouncilsByDistrict: (districtId: string): DistrictCouncil[] => {
    return DistrictCouncilService.getAllCouncils()
      .filter(c => c.districtId === districtId)
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
        const dateB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
        return dateB - dateA; // Más recientes primero
      });
  },

  // Obtener reuniones completadas
  getCompleted: (districtId?: string): DistrictCouncil[] => {
    let councils = DistrictCouncilService.getAllCouncils().filter(c => c.status === 'completed');
    if (districtId) {
      councils = councils.filter(c => c.districtId === districtId);
    }
    return councils.sort((a, b) => {
      const dateA = new Date(a.completedAt || a.date).getTime();
      const dateB = new Date(b.completedAt || b.date).getTime();
      return dateB - dateA;
    });
  }
};

