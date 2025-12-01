// src/services/leaderMessageService.ts
// Servicio para gestionar mensajes de liderazgo

export type MessageStatus = 'draft' | 'published' | 'archived';
export type MessageType = 'devotional' | 'invitation' | 'training' | 'announcement';
export type TargetScope = 'district' | 'zone' | 'mission';

export interface LeaderMessage {
  id: string;
  missionId?: string;
  zoneId?: string;
  districtId?: string;
  
  senderId: string;
  senderName: string;
  senderRole: 'district_leader' | 'zone_leader' | 'assistant_to_president' | 'mission_president';
  
  title: string;
  body: string;
  scripture?: string;
  type: MessageType;
  
  targetScope: TargetScope;
  status: MessageStatus;
  
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

const LEADER_MESSAGES_KEY = '@leaderMessages';
const LEADERSHIP_EVENTS_KEY = '@leadershipEvents';

export const LeaderMessageService = {
  // Guardar/actualizar mensaje
  saveMessage: (message: Omit<LeaderMessage, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): LeaderMessage => {
    try {
      const messages = LeaderMessageService.getAllMessages();
      const now = new Date().toISOString();
      
      const newMessage: LeaderMessage = {
        ...message,
        id: message.id || `message_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: message.id ? messages.find(m => m.id === message.id)?.createdAt || now : now,
        updatedAt: now
      };
      
      const index = messages.findIndex(m => m.id === newMessage.id);
      if (index >= 0) {
        messages[index] = newMessage;
      } else {
        messages.push(newMessage);
      }
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(LEADER_MESSAGES_KEY, JSON.stringify(messages));
      }
      
      return newMessage;
    } catch (e) {
      console.error('Error guardando mensaje:', e);
      throw e;
    }
  },

  // Publicar mensaje
  publishMessage: (messageId: string): LeaderMessage | null => {
    try {
      const messages = LeaderMessageService.getAllMessages();
      const message = messages.find(m => m.id === messageId);
      
      if (!message) return null;
      
      message.status = 'published';
      message.publishedAt = new Date().toISOString();
      message.updatedAt = new Date().toISOString();
      
      // Crear evento de liderazgo
      LeaderMessageService.createLeadershipEvent({
        type: 'leader_message',
        sourceId: messageId,
        title: message.title,
        description: message.body.substring(0, 100) + '...',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0].substring(0, 5),
        location: '',
        leaderName: message.senderName,
        leaderRole: message.senderRole,
        status: 'upcoming',
        districtId: message.districtId,
        zoneId: message.zoneId,
        targetScope: message.targetScope
      });
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(LEADER_MESSAGES_KEY, JSON.stringify(messages));
      }
      
      return message;
    } catch (e) {
      console.error('Error publicando mensaje:', e);
      throw e;
    }
  },

  // Obtener todos los mensajes
  getAllMessages: (): LeaderMessage[] => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const json = localStorage.getItem(LEADER_MESSAGES_KEY);
        if (json) {
          return JSON.parse(json);
        }
      }
      return [];
    } catch (e) {
      console.error('Error cargando mensajes:', e);
      return [];
    }
  },

  // Obtener mensaje por ID
  getMessageById: (id: string): LeaderMessage | null => {
    const messages = LeaderMessageService.getAllMessages();
    return messages.find(m => m.id === id) || null;
  },

  // Obtener mensajes por distrito
  getMessagesByDistrict: (districtId: string): LeaderMessage[] => {
    return LeaderMessageService.getAllMessages()
      .filter(m => m.districtId === districtId && m.targetScope === 'district')
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.createdAt).getTime();
        const dateB = new Date(b.publishedAt || b.createdAt).getTime();
        return dateB - dateA;
      });
  },

  // Obtener mensajes por zona
  getMessagesByZone: (zoneId: string): LeaderMessage[] => {
    return LeaderMessageService.getAllMessages()
      .filter(m => m.zoneId === zoneId && m.targetScope === 'zone')
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.createdAt).getTime();
        const dateB = new Date(b.publishedAt || b.createdAt).getTime();
        return dateB - dateA;
      });
  },

  // Obtener mensajes para un distrito (incluye mensajes de zona y misión que aplican)
  getMessagesForDistrict: (districtId: string, zoneId?: string): LeaderMessage[] => {
    return LeaderMessageService.getAllMessages()
      .filter(m => {
        if (m.status !== 'published') return false;
        // Mensajes dirigidos al distrito
        if (m.targetScope === 'district' && m.districtId === districtId) return true;
        // Mensajes dirigidos a la zona (que incluye este distrito)
        if (m.targetScope === 'zone' && m.zoneId === zoneId) return true;
        // Mensajes de misión (para todos)
        if (m.targetScope === 'mission') return true;
        return false;
      })
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.createdAt).getTime();
        const dateB = new Date(b.publishedAt || b.createdAt).getTime();
        return dateB - dateA;
      });
  },

  // Obtener mensajes publicados para un misionero
  getMessagesForMissionary: (districtId?: string, zoneId?: string, missionId?: string): LeaderMessage[] => {
    const messages = LeaderMessageService.getAllMessages()
      .filter(m => m.status === 'published');
    
    const filtered = messages.filter(m => {
      if (m.targetScope === 'mission') return true;
      if (m.targetScope === 'zone' && m.zoneId === zoneId) return true;
      if (m.targetScope === 'district' && m.districtId === districtId) return true;
      return false;
    });
    
    return filtered.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt).getTime();
      const dateB = new Date(b.publishedAt || b.createdAt).getTime();
      return dateB - dateA;
    });
  },

  // Obtener borradores
  getDrafts: (senderId?: string): LeaderMessage[] => {
    let messages = LeaderMessageService.getAllMessages().filter(m => m.status === 'draft');
    if (senderId) {
      messages = messages.filter(m => m.senderId === senderId);
    }
    return messages.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  // Crear mensaje desde nota personal
  createMessageFromNote: (note: {
    title: string;
    body: string;
    scripture?: string;
    senderId: string;
    senderName: string;
    senderRole: 'district_leader' | 'zone_leader' | 'assistant_to_president';
    targetScope: TargetScope;
    districtId?: string;
    zoneId?: string;
  }): LeaderMessage => {
    const message: Omit<LeaderMessage, 'id' | 'createdAt' | 'updatedAt'> = {
      missionId: 'current_mission',
      zoneId: note.zoneId,
      districtId: note.districtId,
      senderId: note.senderId,
      senderName: note.senderName,
      senderRole: note.senderRole,
      title: note.title,
      body: note.body,
      scripture: note.scripture,
      type: 'devotional',
      targetScope: note.targetScope,
      status: 'draft'
    };
    
    return LeaderMessageService.saveMessage(message);
  },

  // Crear evento de liderazgo
  createLeadershipEvent: (event: {
    type: 'leader_message';
    sourceId: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    leaderName: string;
    leaderRole: 'district_leader' | 'zone_leader' | 'assistant_to_president' | 'mission_president';
    status: 'upcoming' | 'past';
    districtId?: string;
    zoneId?: string;
    targetScope?: TargetScope;
  }): void => {
    try {
      const events = LeaderMessageService.getAllLeadershipEvents();
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

  // Obtener mensajes para un misionero (vía eventos)
  getMessagesForMissionaryViaEvents: (districtId?: string, zoneId?: string): any[] => {
    const events = LeaderMessageService.getAllLeadershipEvents();
    return events
      .filter(e => {
        if (e.type !== 'leader_message') return false;
        if (e.targetScope === 'mission') return true;
        if (e.targetScope === 'zone' && e.zoneId === zoneId) return true;
        if (e.targetScope === 'district' && e.districtId === districtId) return true;
        return false;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
  },

  // Eliminar mensaje
  deleteMessage: (messageId: string): boolean => {
    try {
      const messages = LeaderMessageService.getAllMessages();
      const filtered = messages.filter(m => m.id !== messageId);
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(LEADER_MESSAGES_KEY, JSON.stringify(filtered));
      }
      
      return true;
    } catch (e) {
      console.error('Error eliminando mensaje:', e);
      return false;
    }
  }
};

