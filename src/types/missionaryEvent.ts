export type MissionaryEventType =
  | "STUDY"
  | "PLANNING"
  | "TRAVEL"
  | "CONTACTING"
  | "SERVICE"
  | "TEACHING"
  | "MEAL"
  | "MEETING"
  | "OTHER";

export interface MissionaryEvent {
  id: string;
  title: string;
  type: MissionaryEventType;
  start: string; // ISO string con fecha y hora
  end: string;   // ISO string
  location?: string;
  investigatorName?: string;
  notes?: string;
}

// Helper para obtener estilos de color por tipo de evento
export const EVENT_TYPE_STYLES: Record<MissionaryEventType, { bg: string; border: string; text: string }> = {
  STUDY: { bg: "rgba(196, 181, 253, 0.2)", border: "rgba(196, 181, 253, 0.8)", text: "rgba(109, 40, 217, 1)" },
  PLANNING: { bg: "rgba(165, 180, 252, 0.2)", border: "rgba(165, 180, 252, 0.8)", text: "rgba(67, 56, 202, 1)" },
  TRAVEL: { bg: "rgba(251, 146, 60, 0.2)", border: "rgba(251, 146, 60, 0.8)", text: "rgba(194, 65, 12, 1)" },
  CONTACTING: { bg: "rgba(134, 239, 172, 0.2)", border: "rgba(134, 239, 172, 0.8)", text: "rgba(20, 83, 45, 1)" },
  SERVICE: { bg: "rgba(125, 211, 252, 0.2)", border: "rgba(125, 211, 252, 0.8)", text: "rgba(12, 74, 110, 1)" },
  TEACHING: { bg: "rgba(254, 240, 138, 0.2)", border: "rgba(254, 240, 138, 0.8)", text: "rgba(133, 77, 14, 1)" },
  MEAL: { bg: "rgba(253, 186, 116, 0.2)", border: "rgba(253, 186, 116, 0.8)", text: "rgba(154, 52, 18, 1)" },
  MEETING: { bg: "rgba(147, 197, 253, 0.2)", border: "rgba(147, 197, 253, 0.8)", text: "rgba(30, 64, 175, 1)" },
  OTHER: { bg: "rgba(209, 213, 219, 0.2)", border: "rgba(209, 213, 219, 0.8)", text: "rgba(55, 65, 81, 1)" },
};

// Helper para calcular minutos desde medianoche
export const getMinutesFromMidnight = (date: Date): number => {
  return date.getHours() * 60 + date.getMinutes();
};

// Helper para calcular duración en minutos
export const getDurationMinutes = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60));
};

// Helper para formatear hora (HH:MM)
export const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Helper para obtener eventos del día
export const getEventsForDay = (events: MissionaryEvent[], date: Date): MissionaryEvent[] => {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return events.filter(event => {
    const eventStart = new Date(event.start);
    return eventStart >= dayStart && eventStart <= dayEnd;
  }).sort((a, b) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
};

