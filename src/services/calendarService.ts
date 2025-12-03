// src/services/calendarService.ts
import { MissionCalendarEvent, CalendarScope } from '../data/calendar/calendarTypes';

const STORAGE_KEY = 'xtg_mission_calendar_v1';

const loadAll = (): MissionCalendarEvent[] => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as MissionCalendarEvent[];
  } catch {
    return [];
  }
};

const saveAll = (events: MissionCalendarEvent[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

export interface MissionaryContext {
  missionId: string;
  zoneId?: string;
  districtId?: string;
  companionshipId?: string;
  missionaryId: string;
}

/**
 * Devuelve los eventos que aplican a un misionero:
 *  - Misión
 *  - Zona
 *  - Distrito
 *  - Compañerismo
 *  - Personales
 */
export const getEventsForMissionary = (
  ctx: MissionaryContext,
): MissionCalendarEvent[] => {
  const all = loadAll();

  return all.filter((ev) => {
    if (ev.missionId !== ctx.missionId) return false;

    if (ev.scope === 'MISSION') return true;

    if (ev.scope === 'ZONE') {
      return ev.zoneId && ev.zoneId === ctx.zoneId;
    }

    if (ev.scope === 'DISTRICT') {
      return ev.districtId && ev.districtId === ctx.districtId;
    }

    if (ev.scope === 'COMPANIONSHIP') {
      return ev.companionshipId && ev.companionshipId === ctx.companionshipId;
    }

    if (ev.scope === 'PERSONAL') {
      return ev.missionaryIds?.includes(ctx.missionaryId) ?? false;
    }

    return false;
  });
};

export interface CreateCalendarEventInput
  extends Omit<MissionCalendarEvent,
    'id' | 'createdAt' | 'updatedAt' | 'createdByUserId'> {
  createdByUserId: string;
}

export const createCalendarEvent = (
  input: CreateCalendarEventInput,
): MissionCalendarEvent => {
  const all = loadAll();

  const newEvent: MissionCalendarEvent = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  all.push(newEvent);
  saveAll(all);
  return newEvent;
};

// Chequeo simple de conflictos (mismas horas y mismo alcance)
export interface CalendarConflict {
  existingEvent: MissionCalendarEvent;
  level: 'HARD' | 'SOFT';
}

export const findConflicts = (
  candidate: CreateCalendarEventInput,
): CalendarConflict[] => {
  const all = loadAll();
  const start = new Date(candidate.start).getTime();
  const end = new Date(candidate.end).getTime();

  return all
    .filter((ev) => {
      // mismo alcance
      if (ev.missionId !== candidate.missionId) return false;
      if (ev.scope !== candidate.scope) return false;

      if (ev.scope === 'ZONE' && ev.zoneId !== candidate.zoneId) return false;
      if (ev.scope === 'DISTRICT' && ev.districtId !== candidate.districtId)
        return false;
      if (
        ev.scope === 'COMPANIONSHIP' &&
        ev.companionshipId !== candidate.companionshipId
      )
        return false;

      const evStart = new Date(ev.start).getTime();
      const evEnd = new Date(ev.end).getTime();

      // overlapping
      return evStart < end && evEnd > start;
    })
    .map<CalendarConflict>((ev) => ({
      existingEvent: ev,
      level: ev.canBeOverlapped === false ? 'HARD' : 'SOFT',
    }));
};

// Mantener compatibilidad con código anterior
export interface UserCalendarContext {
  userId: string;
  missionId: string;
  role: 'MISSIONARY' | 'DISTRICT_LEADER' | 'ZONE_LEADER' | 'AP' | 'PRESIDENT';
  zoneId?: string;
  districtId?: string;
  companionshipId?: string;
}

export const calendarService = {
  getEventsForUser(ctx: UserCalendarContext): MissionCalendarEvent[] {
    const all = loadAll();

    return all.filter((ev) => {
      if (ev.missionId !== ctx.missionId) return false;

      // visibilidad básica
      if (ev.scope === 'MISSION') return true;

      if (ev.scope === 'ZONE') {
        return ctx.zoneId && ev.zoneId === ctx.zoneId;
      }

      if (ev.scope === 'DISTRICT') {
        return ctx.districtId && ev.districtId === ctx.districtId;
      }

      if (ev.scope === 'COMPANIONSHIP') {
        return ctx.companionshipId && ev.companionshipId === ctx.companionshipId;
      }

      if (ev.scope === 'PERSONAL') {
        return ev.createdByUserId === ctx.userId;
      }

      return false;
    });
  },

  createLeadershipEvent(input: Omit<MissionCalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): MissionCalendarEvent {
    const all = loadAll();
    const event: MissionCalendarEvent = { 
      ...input, 
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    all.push(event);
    saveAll(all);
    return event;
  },

  createPersonalEvent(
    ctx: UserCalendarContext, 
    partial: Omit<MissionCalendarEvent, 'id' | 'missionId' | 'createdByUserId' | 'createdByRole' | 'scope' | 'createdAt' | 'updatedAt'>
  ): MissionCalendarEvent {
    const all = loadAll();
    const ev: MissionCalendarEvent = {
      id: crypto.randomUUID(),
      missionId: ctx.missionId,
      createdByUserId: ctx.userId,
      createdByRole: ctx.role,
      scope: 'PERSONAL',
      createdAt: new Date().toISOString(),
      ...partial,
    };
    all.push(ev);
    saveAll(all);
    return ev;
  },

  deleteEvent(id: string, ctx: UserCalendarContext) {
    const all = loadAll();
    const filtered = all.filter((ev) => {
      if (ev.id !== id) return true;
      // Regla simple: solo el creador o un rol superior puede borrar
      const isOwner = ev.createdByUserId === ctx.userId;
      const isHighLeader = ctx.role === 'AP' || ctx.role === 'PRESIDENT';
      return !(isOwner || isHighLeader) ? true : false;
    });
    saveAll(filtered);
  },

  updateEvent(id: string, updates: Partial<MissionCalendarEvent>, ctx: UserCalendarContext): MissionCalendarEvent | null {
    const all = loadAll();
    const index = all.findIndex((ev) => ev.id === id);
    
    if (index === -1) return null;
    
    const event = all[index];
    const isOwner = event.createdByUserId === ctx.userId;
    const isHighLeader = ctx.role === 'AP' || ctx.role === 'PRESIDENT';
    
    if (!isOwner && !isHighLeader) return null;
    
    all[index] = { ...event, ...updates, updatedAt: new Date().toISOString() };
    saveAll(all);
    return all[index];
  },
};

// Semilla de eventos demo (solo para desarrollo)
export const seedDemoCalendarEvents = (missionId: string, zoneId: string) => {
  const all = loadAll();

  if (all.length > 0) return; // ya hay datos, no tocar

  const today = new Date();

  const nextMonday = new Date(today);
  // buscar próximo lunes
  while (nextMonday.getDay() !== 1) {
    nextMonday.setDate(nextMonday.getDate() + 1);
  }

  const pdayStart = new Date(nextMonday);
  pdayStart.setHours(10, 0, 0, 0);

  const pdayEnd = new Date(nextMonday);
  pdayEnd.setHours(18, 0, 0, 0);

  const zoneCouncilStart = new Date(nextMonday);
  zoneCouncilStart.setDate(zoneCouncilStart.getDate() + 2); // miércoles
  zoneCouncilStart.setHours(9, 0, 0, 0);

  const zoneCouncilEnd = new Date(zoneCouncilStart);
  zoneCouncilEnd.setHours(11, 0, 0, 0);

  const baseNow = new Date().toISOString();

  const demoEvents: MissionCalendarEvent[] = [
    {
      id: crypto.randomUUID(),
      title: 'P-Day de Misión',
      description:
        'Día de preparación. Actividades aprobadas según el manual misional.',
      type: 'PDAY',
      scope: 'MISSION',
      missionId,
      start: pdayStart.toISOString(),
      end: pdayEnd.toISOString(),
      allDay: false,
      location: 'Toda la misión',
      createdByUserId: 'PRESIDENT',
      createdByRole: 'PRESIDENT',
      lockForLowerRoles: true,
      canBeOverlapped: false,
      createdAt: baseNow,
    },
    {
      id: crypto.randomUUID(),
      title: 'Reunión de Zona – Zona Centro',
      description: 'Capacitación sobre Doctrina de Cristo y planificación.',
      type: 'ZONE_COUNCIL',
      scope: 'ZONE',
      missionId,
      zoneId,
      start: zoneCouncilStart.toISOString(),
      end: zoneCouncilEnd.toISOString(),
      allDay: false,
      location: 'Capilla Central de la Zona Centro',
      createdByUserId: 'ZL_01',
      createdByRole: 'ZONE_LEADER',
      lockForLowerRoles: true,
      canBeOverlapped: false,
      createdAt: baseNow,
    },
  ];

  saveAll(demoEvents);
};
