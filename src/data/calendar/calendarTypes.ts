// src/data/calendar/calendarTypes.ts

// Nivel de alcance del evento
export type CalendarScope =
  | 'MISSION'       // Toda la misión
  | 'ZONE'          // Zona completa
  | 'DISTRICT'      // Distrito completo
  | 'COMPANIONSHIP' // Un compañerismo específico
  | 'PERSONAL';     // Evento personal del misionero

// Tipo de evento
export type CalendarEventType =
  | 'ZONE_COUNCIL'
  | 'DISTRICT_COUNCIL'
  | 'EXCHANGE'
  | 'INTERVIEW'
  | 'TRAINING'
  | 'PDAY'
  | 'TRANSFER'
  | 'SERVICE'
  | 'LESSON'
  | 'STUDY'
  | 'CONTACT'
  | 'OTHER';

export interface MissionCalendarEvent {
  id: string;

  title: string;
  description?: string;
  type: CalendarEventType;

  scope: CalendarScope;

  // Tags de jerarquía para saber a quién aplica
  missionId: string;
  zoneId?: string;
  districtId?: string;
  companionshipId?: string;
  missionaryIds?: string[]; // para eventos personales / intercambios

  start: string; // ISO
  end: string;   // ISO
  allDay?: boolean;

  location?: string;

  // Para saber quién lo creó / desde qué rol
  createdByUserId: string;
  createdByRole:
    | 'MISSIONARY'
    | 'DISTRICT_LEADER'
    | 'ZONE_LEADER'
    | 'AP'
    | 'PRESIDENT';

  // Control de permisos simples
  lockForLowerRoles?: boolean; // true = DL / ZL no pueden moverlo
  canBeOverlapped?: boolean;   // false = se marca como conflicto fuerte

  createdAt: string;
  updatedAt?: string;
}

// Mantener compatibilidad con el código anterior
export type CalendarEvent = MissionCalendarEvent;
export type CalendarVisibility = 'ALL' | 'MISSIONARIES' | 'LEADERS_ONLY';

