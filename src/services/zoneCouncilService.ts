// src/services/zoneCouncilService.ts
// Servicio para gestionar reuniones de zona

export type ZoneCouncilStatus = 'draft' | 'published' | 'completed';

export interface ZoneCouncil {
  id: string;
  missionId: string;
  zoneId: string;
  leaderId: string;
  leaderName: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: ZoneCouncilStatus;
  
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
  
  progressByDistrict: string; // Resumen de distritos
  
  experiences: string;
  
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
  
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  completedAt?: string;
}

export interface ZoneCouncilComment {
  id: string;
  councilId: string;
  authorId: string;
  authorName: string;
  authorRole: 'missionary' | 'district_leader' | 'zone_leader' | 'assistant_to_president';
  text: string;
  createdAt: string;
}

const ZONE_COUNCILS_KEY = '@zoneCouncils';
const LEADERSHIP_EVENTS_KEY = '@leadershipEvents';
const ZONE_COUNCIL_COMMENTS_KEY = '@zoneCouncilComments';

export const ZoneCouncilService = {
  // Guardar/actualizar reunión
  saveCouncil: (council: Omit<ZoneCouncil, 'id' | 'createdAt' | 'updatedAt'>): ZoneCouncil => {
    try {
      const councils = ZoneCouncilService.getAllCouncils();
      const now = new Date().toISOString();
      
      const newCouncil: ZoneCouncil = {
        ...council,
        id: council.id || `zone_council_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: council.id ? councils.find(c => c.id === council.id)?.createdAt || now : now,
        updatedAt: now
      };
      
      const index = councils.findIndex(c => c.id === newCouncil.id);
      if (index >= 0) {
        councils[index] = newCouncil;
      } else {
        councils.push(newCouncil);
      }
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(ZONE_COUNCILS_KEY, JSON.stringify(councils));
      }
      
      return newCouncil;
    } catch (e) {
      console.error('Error guardando reunión de zona:', e);
      throw e;
    }
  },

  // Publicar a la zona
  publishCouncil: (councilId: string): ZoneCouncil | null => {
    try {
      const councils = ZoneCouncilService.getAllCouncils();
      const council = councils.find(c => c.id === councilId);
      
      if (!council) return null;
      
      council.status = 'published';
      council.publishedAt = new Date().toISOString();
      council.updatedAt = new Date().toISOString();
      
      // Crear evento de liderazgo
      ZoneCouncilService.createLeadershipEvent({
        type: 'zone_council',
        sourceId: councilId,
        title: `Reunión de Zona – ${council.date} ${council.time}`,
        description: council.summary.spiritualFocus || 'Reunión de zona programada',
        date: council.date,
        time: council.time,
        location: council.location,
        leaderName: council.leaderName || 'Líder de Zona',
        leaderRole: 'zone_leader',
        status: 'upcoming',
        zoneId: council.zoneId
      });
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(ZONE_COUNCILS_KEY, JSON.stringify(councils));
      }
      
      return council;
    } catch (e) {
      console.error('Error publicando reunión de zona:', e);
      throw e;
    }
  },

  // Obtener todas las reuniones
  getAllCouncils: (): ZoneCouncil[] => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const json = localStorage.getItem(ZONE_COUNCILS_KEY);
        if (json) {
          return JSON.parse(json);
        }
      }
      return [];
    } catch (e) {
      console.error('Error cargando reuniones de zona:', e);
      return [];
    }
  },

  // Obtener reunión por ID
  getCouncilById: (id: string): ZoneCouncil | null => {
    const councils = ZoneCouncilService.getAllCouncils();
    return councils.find(c => c.id === id) || null;
  },

  // Obtener borradores
  getDrafts: (): ZoneCouncil[] => {
    return ZoneCouncilService.getAllCouncils().filter(c => c.status === 'draft');
  },

  // Obtener publicadas
  getPublished: (zoneId?: string): ZoneCouncil[] => {
    let councils = ZoneCouncilService.getAllCouncils().filter(c => c.status === 'published');
    if (zoneId) {
      councils = councils.filter(c => c.zoneId === zoneId);
    }
    return councils.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`).getTime();
      const dateB = new Date(`${b.date}T${b.time}`).getTime();
      return dateB - dateA; // Más recientes primero
    });
  },

  // Crear evento de liderazgo
  createLeadershipEvent: (event: {
    type: 'zone_council';
    sourceId: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    leaderName: string;
    leaderRole: 'zone_leader';
    status: 'upcoming' | 'past';
    zoneId: string;
  }): void => {
    try {
      const events = ZoneCouncilService.getAllLeadershipEvents();
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

  // Obtener eventos de liderazgo (compartido con districtCouncilService)
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

  // Obtener eventos para una zona
  getEventsForZone: (zoneId: string): any[] => {
    const events = ZoneCouncilService.getAllLeadershipEvents();
    return events.filter(e => e.zoneId === zoneId)
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`).getTime();
        const dateB = new Date(`${b.date}T${b.time}`).getTime();
        return dateA - dateB; // Próximas primero
      });
  },

  // Agregar comentario
  addComment: (comment: Omit<ZoneCouncilComment, 'id' | 'createdAt'>): ZoneCouncilComment => {
    try {
      const comments = ZoneCouncilService.getCommentsByCouncil(comment.councilId);
      const newComment: ZoneCouncilComment = {
        ...comment,
        id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      };
      
      comments.push(newComment);
      
      if (typeof window !== 'undefined' && window.localStorage) {
        const allComments = ZoneCouncilService.getAllComments();
        const otherComments = allComments.filter(c => c.councilId !== comment.councilId);
        localStorage.setItem(ZONE_COUNCIL_COMMENTS_KEY, JSON.stringify([...otherComments, ...comments]));
      }
      
      return newComment;
    } catch (e) {
      console.error('Error agregando comentario:', e);
      throw e;
    }
  },

  // Obtener comentarios de una reunión
  getCommentsByCouncil: (councilId: string): ZoneCouncilComment[] => {
    try {
      const allComments = ZoneCouncilService.getAllComments();
      return allComments
        .filter(c => c.councilId === councilId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } catch (e) {
      console.error('Error cargando comentarios:', e);
      return [];
    }
  },

  // Obtener todos los comentarios
  getAllComments: (): ZoneCouncilComment[] => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const json = localStorage.getItem(ZONE_COUNCIL_COMMENTS_KEY);
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

  // Marcar como leída
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
  completeCouncil: (councilId: string): ZoneCouncil | null => {
    try {
      const councils = ZoneCouncilService.getAllCouncils();
      const council = councils.find(c => c.id === councilId);
      
      if (!council) return null;
      
      council.status = 'completed';
      council.completedAt = new Date().toISOString();
      council.updatedAt = new Date().toISOString();
      
      // Actualizar evento de liderazgo
      const events = ZoneCouncilService.getAllLeadershipEvents();
      const eventIndex = events.findIndex(e => e.sourceId === councilId && e.type === 'zone_council');
      if (eventIndex >= 0) {
        events[eventIndex].status = 'past';
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(LEADERSHIP_EVENTS_KEY, JSON.stringify(events));
        }
      }
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(ZONE_COUNCILS_KEY, JSON.stringify(councils));
      }
      
      return council;
    } catch (e) {
      console.error('Error completando reunión de zona:', e);
      throw e;
    }
  },

  // Obtener reuniones por zona (para historial)
  getCouncilsByZone: (zoneId: string): ZoneCouncil[] => {
    return ZoneCouncilService.getAllCouncils()
      .filter(c => c.zoneId === zoneId)
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
        const dateB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
        return dateB - dateA; // Más recientes primero
      });
  },

  // Obtener reuniones completadas
  getCompleted: (zoneId?: string): ZoneCouncil[] => {
    let councils = ZoneCouncilService.getAllCouncils().filter(c => c.status === 'completed');
    if (zoneId) {
      councils = councils.filter(c => c.zoneId === zoneId);
    }
    return councils.sort((a, b) => {
      const dateA = new Date(a.completedAt || a.date).getTime();
      const dateB = new Date(b.completedAt || b.date).getTime();
      return dateB - dateA;
    });
  }
};

