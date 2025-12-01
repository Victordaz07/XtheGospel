// src/services/exchangeService.ts
// Servicio para gestionar intercambios misionales

export type ExchangeStatus = 'draft' | 'planned' | 'completed' | 'cancelled';

export interface Exchange {
  id: string;
  missionId?: string;
  zoneId?: string;
  districtId?: string;
  leaderId: string;
  leaderName: string;
  leaderRole?: 'district_leader' | 'zone_leader' | 'assistant_to_president';
  
  companionshipName: string;
  missionaryId?: string;
  missionaryName?: string;
  
  date: string;
  time?: string;
  area: string;
  
  focus: string;
  scripture: string;
  
  status: ExchangeStatus;
  
  goals: {
    metasDia: string;
    personasVisitar: string;
    habitoModelar: string;
    indicadorExito: string;
  };
  
  summary: {
    donesVistos: string;
    necesitaAyuda: string;
    compromisoEspiritual: string;
    impresionEspiritu: string;
  };
  
  followUp: {
    compartiLoBueno: boolean;
    hableMejorar: boolean;
    fijamosMetas: boolean;
    reporteEnviado: boolean;
    futuraRevisionPlaneada: boolean;
  };
  
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

const EXCHANGES_KEY = '@exchanges';
const LEADERSHIP_EVENTS_KEY = '@leadershipEvents';

export const ExchangeService = {
  // Guardar/actualizar intercambio
  saveExchange: (exchange: Omit<Exchange, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Exchange => {
    try {
      const exchanges = ExchangeService.getAllExchanges();
      const now = new Date().toISOString();
      
      const newExchange: Exchange = {
        ...exchange,
        id: exchange.id || `exchange_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: exchange.id ? exchanges.find(e => e.id === exchange.id)?.createdAt || now : now,
        updatedAt: now
      };
      
      const index = exchanges.findIndex(e => e.id === newExchange.id);
      if (index >= 0) {
        exchanges[index] = newExchange;
      } else {
        exchanges.push(newExchange);
      }
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(EXCHANGES_KEY, JSON.stringify(exchanges));
      }
      
      return newExchange;
    } catch (e) {
      console.error('Error guardando intercambio:', e);
      throw e;
    }
  },

  // Publicar al misionero
  publishExchange: (exchangeId: string): Exchange | null => {
    try {
      const exchanges = ExchangeService.getAllExchanges();
      const exchange = exchanges.find(e => e.id === exchangeId);
      
      if (!exchange) return null;
      
      exchange.status = 'planned';
      exchange.updatedAt = new Date().toISOString();
      
      // Crear evento de liderazgo
      ExchangeService.createLeadershipEvent({
        type: 'exchange',
        sourceId: exchangeId,
        title: `Intercambio con ${exchange.leaderName} – ${exchange.date} ${exchange.time || ''}`,
        description: `Enfoque: ${exchange.focus} | Área: ${exchange.area}`,
        date: exchange.date,
        time: exchange.time || '',
        location: exchange.area,
        leaderName: exchange.leaderName,
        leaderRole: exchange.leaderRole || 'district_leader',
        status: 'upcoming',
        districtId: exchange.districtId,
        missionaryId: exchange.missionaryId
      });
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(EXCHANGES_KEY, JSON.stringify(exchanges));
      }
      
      return exchange;
    } catch (e) {
      console.error('Error publicando intercambio:', e);
      throw e;
    }
  },

  // Completar intercambio
  completeExchange: (exchangeId: string): Exchange | null => {
    try {
      const exchanges = ExchangeService.getAllExchanges();
      const exchange = exchanges.find(e => e.id === exchangeId);
      
      if (!exchange) return null;
      
      exchange.status = 'completed';
      exchange.completedAt = new Date().toISOString();
      exchange.updatedAt = new Date().toISOString();
      
      // Actualizar evento de liderazgo
      const events = ExchangeService.getAllLeadershipEvents();
      const eventIndex = events.findIndex(e => e.sourceId === exchangeId && e.type === 'exchange');
      if (eventIndex >= 0) {
        events[eventIndex].status = 'past';
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(LEADERSHIP_EVENTS_KEY, JSON.stringify(events));
        }
      }
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(EXCHANGES_KEY, JSON.stringify(exchanges));
      }
      
      return exchange;
    } catch (e) {
      console.error('Error completando intercambio:', e);
      throw e;
    }
  },

  // Obtener todos los intercambios
  getAllExchanges: (): Exchange[] => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const json = localStorage.getItem(EXCHANGES_KEY);
        if (json) {
          return JSON.parse(json);
        }
      }
      return [];
    } catch (e) {
      console.error('Error cargando intercambios:', e);
      return [];
    }
  },

  // Obtener intercambio por ID
  getExchangeById: (id: string): Exchange | null => {
    const exchanges = ExchangeService.getAllExchanges();
    return exchanges.find(e => e.id === id) || null;
  },

  // Obtener borradores
  getDrafts: (leaderId?: string): Exchange[] => {
    let exchanges = ExchangeService.getAllExchanges().filter(e => e.status === 'draft');
    if (leaderId) {
      exchanges = exchanges.filter(e => e.leaderId === leaderId);
    }
    return exchanges.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  // Obtener intercambios planificados
  getPlanned: (missionaryId?: string): Exchange[] => {
    let exchanges = ExchangeService.getAllExchanges().filter(e => e.status === 'planned');
    if (missionaryId) {
      exchanges = exchanges.filter(e => e.missionaryId === missionaryId);
    }
    return exchanges.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
      const dateB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
      return dateA - dateB; // Próximos primero
    });
  },

  // Obtener intercambios completados
  getCompleted: (leaderId?: string): Exchange[] => {
    let exchanges = ExchangeService.getAllExchanges().filter(e => e.status === 'completed');
    if (leaderId) {
      exchanges = exchanges.filter(e => e.leaderId === leaderId);
    }
    return exchanges.sort((a, b) => {
      const dateA = new Date(a.completedAt || a.date).getTime();
      const dateB = new Date(b.completedAt || b.date).getTime();
      return dateB - dateA; // Más recientes primero
    });
  },

  // Obtener historial por misionero
  getHistoryByMissionary: (missionaryId: string): Exchange[] => {
    return ExchangeService.getAllExchanges()
      .filter(e => e.missionaryId === missionaryId && e.status === 'completed')
      .sort((a, b) => {
        const dateA = new Date(a.completedAt || a.date).getTime();
        const dateB = new Date(b.completedAt || b.date).getTime();
        return dateB - dateA;
      });
  },

  // Obtener todos los intercambios de un líder
  getExchangesByLeader: (leaderId: string): Exchange[] => {
    return ExchangeService.getAllExchanges()
      .filter(e => e.leaderId === leaderId)
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
        const dateB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
        return dateB - dateA; // Más recientes primero
      });
  },

  // Crear evento de liderazgo
  createLeadershipEvent: (event: {
    type: 'exchange';
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
    missionaryId?: string;
  }): void => {
    try {
      const events = ExchangeService.getAllLeadershipEvents();
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

  // Obtener intercambios para un misionero
  getExchangesForMissionary: (missionaryId: string): any[] => {
    const events = ExchangeService.getAllLeadershipEvents();
    return events
      .filter(e => e.type === 'exchange' && e.missionaryId === missionaryId)
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
        const dateB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
        return dateA - dateB;
      });
  },

  // Eliminar intercambio
  deleteExchange: (exchangeId: string): boolean => {
    try {
      const exchanges = ExchangeService.getAllExchanges();
      const filtered = exchanges.filter(e => e.id !== exchangeId);
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(EXCHANGES_KEY, JSON.stringify(filtered));
      }
      
      return true;
    } catch (e) {
      console.error('Error eliminando intercambio:', e);
      return false;
    }
  }
};

