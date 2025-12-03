// src/services/leadershipCalendarMapper.ts
import {
  CreateCalendarEventInput,
} from './calendarService';
import { CalendarScope } from '../data/calendar/calendarTypes';

// 🔧 util para juntar fecha + hora en ISO
const buildIsoDateTime = (dateISO: string, timeHHmm: string) => {
  // dateISO: "2025-03-10" | "2025-03-10T00:00:00.000Z"
  const base = new Date(dateISO);
  const [h, m] = timeHHmm.split(':').map(Number);
  base.setHours(h ?? 0, m ?? 0, 0, 0);
  return base.toISOString();
};

/**
 * Reunión de Zona → evento ZONE_COUNCIL
 */
export interface ZoneCouncilCalendarPayload {
  missionId: string;
  zoneId: string;
  zoneName: string;

  dateISO: string;        // "2025-03-10"
  startTime: string;      // "09:00"
  endTime: string;        // "11:00"

  location?: string;
  theme?: string;
  createdByUserId: string;
}

export const buildZoneCouncilEvent = (
  payload: ZoneCouncilCalendarPayload,
): CreateCalendarEventInput => {
  const { missionId, zoneId, zoneName, dateISO, startTime, endTime, location, theme, createdByUserId } =
    payload;

  return {
    missionId,
    zoneId,
    scope: 'ZONE' as CalendarScope,
    type: 'ZONE_COUNCIL',
    title: `Reunión de Zona – ${zoneName}`,
    description: theme,
    start: buildIsoDateTime(dateISO, startTime),
    end: buildIsoDateTime(dateISO, endTime),
    location,
    createdByUserId,
    createdByRole: 'ZONE_LEADER',
    lockForLowerRoles: true,
    canBeOverlapped: false,
  };
};

/**
 * Reunión de Distrito → evento DISTRICT_COUNCIL
 */
export interface DistrictCouncilCalendarPayload {
  missionId: string;
  zoneId: string;
  districtId: string;
  districtName: string;

  dateISO: string;
  startTime: string;
  endTime: string;

  location?: string;
  theme?: string;
  createdByUserId: string;
}

export const buildDistrictCouncilEvent = (
  payload: DistrictCouncilCalendarPayload,
): CreateCalendarEventInput => {
  const {
    missionId,
    zoneId,
    districtId,
    districtName,
    dateISO,
    startTime,
    endTime,
    location,
    theme,
    createdByUserId,
  } = payload;

  return {
    missionId,
    zoneId,
    districtId,
    scope: 'DISTRICT' as CalendarScope,
    type: 'DISTRICT_COUNCIL',
    title: `Reunión de Distrito – ${districtName}`,
    description: theme,
    start: buildIsoDateTime(dateISO, startTime),
    end: buildIsoDateTime(dateISO, endTime),
    location,
    createdByUserId,
    createdByRole: 'DISTRICT_LEADER',
    lockForLowerRoles: true,
    canBeOverlapped: false,
  };
};

/**
 * Gira / capacitación de AP → evento TRAINING
 */
export interface ApTourCalendarPayload {
  missionId: string;
  zoneId?: string;
  districtId?: string;

  targetLabel: string; // "Zona Centro", "Distrito Norte", etc.

  dateISO: string;
  startTime: string;
  endTime: string;

  location?: string;
  focus?: string;
  createdByUserId: string;
}

export const buildApTourEvent = (
  payload: ApTourCalendarPayload,
): CreateCalendarEventInput => {
  const {
    missionId,
    zoneId,
    districtId,
    targetLabel,
    dateISO,
    startTime,
    endTime,
    location,
    focus,
    createdByUserId,
  } = payload;

  // si tiene zoneId usamos ZONE, si no, DISTRICT (ajusta según tu UI)
  const scope: CalendarScope = zoneId ? 'ZONE' : 'DISTRICT';

  return {
    missionId,
    zoneId,
    districtId,
    scope,
    type: 'TRAINING',
    title: `Gira de AP – ${targetLabel}`,
    description: focus,
    start: buildIsoDateTime(dateISO, startTime),
    end: buildIsoDateTime(dateISO, endTime),
    location,
    createdByUserId,
    createdByRole: 'AP',
    lockForLowerRoles: true,
    canBeOverlapped: false,
  };
};

