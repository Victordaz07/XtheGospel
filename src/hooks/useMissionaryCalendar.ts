import { useEffect, useState } from 'react';
import {
  getEventsForMissionary,
  MissionaryContext,
} from '../services/calendarService';
import { MissionCalendarEvent } from '../data/calendar/calendarTypes';

export const useMissionaryCalendar = (ctx: MissionaryContext) => {
  const [events, setEvents] = useState<MissionCalendarEvent[]>([]);

  useEffect(() => {
    setEvents(getEventsForMissionary(ctx));
  }, [ctx.missionId, ctx.zoneId, ctx.districtId, ctx.companionshipId, ctx.missionaryId]);

  return { events };
};

