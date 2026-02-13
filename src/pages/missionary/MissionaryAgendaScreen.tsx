import React, { useMemo, useState, useEffect } from 'react';
import { FaEye, FaPencil } from 'react-icons/fa6';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import { useMissionaryCalendar } from '../../hooks/useMissionaryCalendar';
import {
  MissionCalendarEvent,
  CalendarScope,
} from '../../data/calendar/calendarTypes';
import { useAuth } from '../../context/AuthContext';
import { LeadershipRoleService } from '../../services/leadershipRoleService';
import { EventModal, EventFormData } from './EventModal';
import { EventDetailModal } from './EventDetailModal';
import { useI18n } from '../../context/I18nContext';
import './missionary-agenda.css';

declare const alert: (message?: string) => void;

type AgendaViewMode = 'day' | 'week' | 'month' | 'transfer';

type EventType =
  | 'study'
  | 'lesson'
  | 'contact'
  | 'service'
  | 'meeting'
  | 'travel'
  | 'pday';

export interface MissionaryEvent {
  id: string;
  title: string;
  type: EventType;
  start: string; // ISO
  end: string; // ISO
  location?: string;
  personName?: string;
  areaName?: string;
  required?: boolean;
  source?: 'PERSONAL' | 'LEADERSHIP';
  leadershipType?: string;
  scope?: CalendarScope;
  canBeOverlapped?: boolean;
  description?: string;
  // scopeLabel removed - translated dynamically in components
}

// mapScopeLabel removed - will be translated dynamically in components

// Mapea CalendarEvent → MissionaryEvent (para la agenda)
const mapToMissionaryEvent = (ev: MissionCalendarEvent): MissionaryEvent => {
  let type: EventType = 'meeting';

  switch (ev.type) {
    case 'LESSON':
      type = 'lesson';
      break;
    case 'STUDY':
      type = 'study';
      break;
    case 'SERVICE':
      type = 'service';
      break;
    case 'EXCHANGE':
    case 'CONTACT':
      type = 'contact';
      break;
    case 'PDAY':
      type = 'pday';
      break;
    case 'TRANSFER':
      type = 'travel';
      break;
    case 'ZONE_COUNCIL':
    case 'DISTRICT_COUNCIL':
    case 'TRAINING':
    case 'INTERVIEW':
      type = 'meeting';
      break;
    default:
      type = 'meeting';
      break;
  }

  return {
    id: ev.id,
    title: ev.title,
    type,
    start: ev.start,
    end: ev.end,
    location: ev.location,
    areaName: ev.zoneId || ev.districtId,
    required: ev.canBeOverlapped === false,
    source: ev.scope === 'PERSONAL' ? 'PERSONAL' : 'LEADERSHIP',
    leadershipType: ev.type,
    scope: ev.scope,
    canBeOverlapped: ev.canBeOverlapped,
    description: ev.description,
    // scopeLabel will be calculated dynamically in components using t()
  };
};

/** Genera eventos mockup de rutina diaria de misionero */
const generateMockupRoutineEvents = (): MissionaryEvent[] => {
  const today = new Date();
  const events: MissionaryEvent[] = [];

  // Generar eventos para los próximos 14 días
  for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + dayOffset);
    const dayOfWeek = currentDate.getDay(); // 0 = domingo, 1 = lunes, etc.
    const dateStr = currentDate.toISOString().split('T')[0];

    // Rutina diaria (todos los días excepto miércoles que es P-Day)
    if (dayOfWeek !== 3) {
      // No es miércoles
      // Despertar - 6:30 AM
      events.push({
        id: `mockup-wake-${dateStr}`,
        title: 'Despertar',
        type: 'study',
        start: `${dateStr}T06:30:00`,
        end: `${dateStr}T06:30:00`,
        location: 'Casa',
        source: 'PERSONAL',
      });

      // Estudio personal - 7:00 AM - 8:00 AM
      events.push({
        id: `mockup-study-${dateStr}`,
        title: 'Estudio Personal',
        type: 'study',
        start: `${dateStr}T07:00:00`,
        end: `${dateStr}T08:00:00`,
        location: 'Casa',
        source: 'PERSONAL',
      });

      // Desayuno - 8:00 AM - 9:00 AM
      events.push({
        id: `mockup-breakfast-${dateStr}`,
        title: 'Desayuno',
        type: 'study',
        start: `${dateStr}T08:00:00`,
        end: `${dateStr}T09:00:00`,
        location: 'Casa',
        source: 'PERSONAL',
      });

      // Salir a predicar - 9:00 AM
      events.push({
        id: `mockup-preach-start-${dateStr}`,
        title: 'Salir a predicar',
        type: 'contact',
        start: `${dateStr}T09:00:00`,
        end: `${dateStr}T09:00:00`,
        location: 'Área',
        source: 'PERSONAL',
      });

      // Almuerzo - 12:30 PM - 2:00 PM
      events.push({
        id: `mockup-lunch-${dateStr}`,
        title: 'Almuerzo',
        type: 'study',
        start: `${dateStr}T12:30:00`,
        end: `${dateStr}T14:00:00`,
        location: 'Casa',
        source: 'PERSONAL',
      });

      // Volver a casa - 9:30 PM
      events.push({
        id: `mockup-return-home-${dateStr}`,
        title: 'Volver a casa',
        type: 'study',
        start: `${dateStr}T21:30:00`,
        end: `${dateStr}T21:30:00`,
        location: 'Casa',
        source: 'PERSONAL',
      });

      // Lecciones de ejemplo (distribuidas en diferentes días)
      if (dayOffset % 3 === 0) {
        events.push({
          id: `mockup-lesson-${dateStr}-1`,
          title: 'Lección: La Restauración',
          type: 'lesson',
          start: `${dateStr}T10:00:00`,
          end: `${dateStr}T11:00:00`,
          location: 'Casa de investigador',
          personName: 'Ana Pérez',
          source: 'PERSONAL',
        });
      }

      if (dayOffset % 4 === 1) {
        events.push({
          id: `mockup-lesson-${dateStr}-2`,
          title: 'Lección: El Plan de Salvación',
          type: 'lesson',
          start: `${dateStr}T15:00:00`,
          end: `${dateStr}T16:00:00`,
          location: 'Casa de investigador',
          personName: 'Carlos Rodríguez',
          source: 'PERSONAL',
        });
      }

      // Contactos de ejemplo
      if (dayOffset % 2 === 0) {
        events.push({
          id: `mockup-contact-${dateStr}-1`,
          title: 'Contacto: Testigos',
          type: 'contact',
          start: `${dateStr}T14:30:00`,
          end: `${dateStr}T15:30:00`,
          location: 'Área',
          source: 'PERSONAL',
        });
      }

      // Actividades de servicio (algunos días)
      if (dayOffset % 5 === 0) {
        events.push({
          id: `mockup-service-${dateStr}`,
          title: 'Servicio: Ayuda a miembro',
          type: 'service',
          start: `${dateStr}T16:00:00`,
          end: `${dateStr}T18:00:00`,
          location: 'Casa de miembro',
          personName: 'Hermano García',
          source: 'PERSONAL',
        });
      }
    }

    // P-Day (Miércoles) - 11:30 AM - 9:30 PM
    if (dayOfWeek === 3) {
      // Miércoles
      events.push({
        id: `mockup-pday-${dateStr}`,
        title: 'P-Day (Día de Preparación)',
        type: 'travel',
        start: `${dateStr}T11:30:00`,
        end: `${dateStr}T21:30:00`,
        location: 'Área',
        source: 'PERSONAL',
      });
    }

    // Reunión de Distrito - Lunes 10:00 AM - 12:00 PM
    if (dayOfWeek === 1) {
      // Lunes
      events.push({
        id: `mockup-district-meeting-${dateStr}`,
        title: 'Reunión de Distrito',
        type: 'meeting',
        start: `${dateStr}T10:00:00`,
        end: `${dateStr}T12:00:00`,
        location: 'Capilla',
        areaName: 'Distrito Centro',
        source: 'LEADERSHIP',
        required: true,
      });
    }

    // Iglesia - Domingo 11:30 AM - 1:30 PM
    if (dayOfWeek === 0) {
      // Domingo
      events.push({
        id: `mockup-church-${dateStr}`,
        title: 'Reunión Sacramental',
        type: 'meeting',
        start: `${dateStr}T11:30:00`,
        end: `${dateStr}T13:30:00`,
        location: 'Capilla',
        source: 'PERSONAL',
        required: true,
      });
    }
  }

  return events;
};

const useAgendaData = () => {
  // TODO: jalar este contexto real desde Auth / Profile
  const missionaryContext = {
    missionId: 'MISSION_001',
    zoneId: 'ZONE_001',
    districtId: 'DISTRICT_001',
    companionshipId: 'COMP_001',
    missionaryId: 'MISSIONARY_001',
  };

  const { events: rawEvents } = useMissionaryCalendar(missionaryContext);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshEvents = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Mapear eventos del calendario
  const calendarEvents = useMemo(() => {
    return rawEvents.map(mapToMissionaryEvent);
  }, [rawEvents, refreshKey]);

  // Generar eventos mockup de rutina (solo si no hay eventos del calendario)
  const mockupEvents = useMemo(() => {
    if (calendarEvents.length > 0) return [];
    return generateMockupRoutineEvents();
  }, [calendarEvents.length]);

  // Combinar ambos, dando prioridad a eventos del calendario
  const allEvents = useMemo(() => {
    const combined = [...calendarEvents];
    const calendarIds = new Set(calendarEvents.map(e => e.id));

    mockupEvents.forEach(mockup => {
      if (!calendarIds.has(mockup.id)) {
        combined.push(mockup);
      }
    });

    return combined.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    );
  }, [calendarEvents, mockupEvents]);

  return { events: allEvents, refreshEvents };
};

/* Helpers de fechas (simple, sin librerías externas) */

const addDays = (d: Date, days: number) => {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + days);
  return nd;
};

const addWeeks = (d: Date, weeks: number) => addDays(d, weeks * 7);

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

const startOfWeek = (d: Date) => {
  const day = d.getDay(); // 0 domingo
  const diff = day === 0 ? -6 : 1 - day; // lunes como inicio
  return startOfDay(addDays(d, diff));
};

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

const endOfMonth = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatShortDate = (d: Date) =>
  d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });

const formatDayName = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: 'short' });

export const formatHourMinute = (d: Date) => {
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${displayHours}:${displayMinutes} ${ampm}`;
};

// getRangeLabel moved inside component to use translations

// EVENT_TYPE_LABEL will be created inside component to use translations

type ScopeFilter = 'ALL' | CalendarScope;

export const MissionaryAgendaScreen: React.FC = () => {
  const { t } = useI18n();
  const { events, refreshEvents } = useAgendaData();
  const [view, setView] = useState<AgendaViewMode>('day');
  const [currentDate, setCurrentDate] = useState<Date>(startOfDay(new Date()));
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<MissionaryEvent | null>(
    null,
  );
  const [viewingEvent, setViewingEvent] = useState<MissionaryEvent | null>(
    null,
  );
  const [modalDefaultDate, setModalDefaultDate] = useState<Date | undefined>(
    undefined,
  );

  const today = startOfDay(new Date());

  const onPrev = () => {
    if (view === 'day') setCurrentDate(addDays(currentDate, -1));
    else if (view === 'week') setCurrentDate(addWeeks(currentDate, -1));
    else if (view === 'month')
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
      );
    else if (view === 'transfer') setCurrentDate(addWeeks(currentDate, -6));
  };

  const onNext = () => {
    if (view === 'day') setCurrentDate(addDays(currentDate, 1));
    else if (view === 'week') setCurrentDate(addWeeks(currentDate, 1));
    else if (view === 'month')
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
      );
    else if (view === 'transfer') setCurrentDate(addWeeks(currentDate, 6));
  };

  const onToday = () => setCurrentDate(startOfDay(new Date()));

  /* Filtrado de eventos según rango */

  const dayEvents = useMemo(() => {
    return events
      .filter(e => {
        if (!isSameDay(new Date(e.start), currentDate)) return false;
        if (scopeFilter !== 'ALL' && e.scope !== scopeFilter) return false;
        return true;
      })
      .sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      );
  }, [events, currentDate, scopeFilter]);

  const weekEvents = useMemo(() => {
    const start = startOfWeek(currentDate);
    const end = addDays(start, 7);
    return events.filter(e => {
      const s = new Date(e.start);
      if (s < start || s >= end) return false;
      if (scopeFilter !== 'ALL' && e.scope !== scopeFilter) return false;
      return true;
    });
  }, [events, currentDate, scopeFilter]);

  const monthEvents = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return events.filter(e => {
      const s = new Date(e.start);
      if (s < start || s > end) return false;
      if (scopeFilter !== 'ALL' && e.scope !== scopeFilter) return false;
      return true;
    });
  }, [events, currentDate, scopeFilter]);

  const transferEvents = useMemo(() => {
    const start = startOfWeek(currentDate);
    const end = addWeeks(start, 6);
    return events.filter(e => {
      const s = new Date(e.start);
      if (s < start || s >= end) return false;
      if (scopeFilter !== 'ALL' && e.scope !== scopeFilter) return false;
      return true;
    });
  }, [events, currentDate, scopeFilter]);

  const getRangeLabel = (viewMode: AgendaViewMode, current: Date) => {
    if (viewMode === 'day') {
      return formatShortDate(current);
    } else if (viewMode === 'week') {
      const start = startOfWeek(current);
      const end = addDays(start, 6);
      return t('agenda.rangeLabels.week', {
        start: formatShortDate(start),
        end: formatShortDate(end),
      });
    } else if (viewMode === 'month') {
      const monthName = current.toLocaleDateString(undefined, {
        month: 'long',
      });
      const year = current.getFullYear().toString();
      return t('agenda.rangeLabels.month', { month: monthName, year });
    } else if (viewMode === 'transfer') {
      const weekStart = startOfWeek(current);
      const weekEnd = addWeeks(weekStart, 5);
      return t('agenda.rangeLabels.transfer', {
        start: formatShortDate(weekStart),
        end: formatShortDate(weekEnd),
      });
    }
    return '';
  };

  const viewLabel = getRangeLabel(view, currentDate);

  // EVENT_TYPE_LABEL creado dinámicamente usando traducciones
  const EVENT_TYPE_LABEL: Record<EventType, string> = {
    study: t('event.types.study'),
    lesson: t('event.types.lesson'),
    contact: t('event.types.contact'),
    service: t('event.types.service'),
    meeting: t('event.types.meeting'),
    travel: t('event.types.travel'),
    pday: t('event.types.pday'),
  };

  // Mapear EventType de MissionaryEvent a CalendarEventType
  const mapEventTypeToCalendarType = (
    type: EventType,
  ): MissionCalendarEvent['type'] => {
    switch (type) {
      case 'study':
        return 'STUDY';
      case 'lesson':
        return 'LESSON';
      case 'contact':
        return 'CONTACT';
      case 'service':
        return 'SERVICE';
      case 'meeting':
        return 'DISTRICT_COUNCIL';
      case 'travel':
        return 'PDAY';
      default:
        return 'OTHER';
    }
  };

  // TODO: Obtener contexto real del usuario desde AuthContext cuando esté disponible
  const userCtx = {
    userId: 'demo-user',
    missionId: 'MISSION_001',
    role: 'MISSIONARY' as const,
    zoneId: 'ZONE_001',
    districtId: 'DISTRICT_001',
    companionshipId: 'COMP_001',
  };

  const handleSaveEvent = (formData: EventFormData) => {
    if (editingEvent && editingEvent.id.startsWith('mockup-')) {
      // No se pueden editar eventos mockup, solo crear nuevos
      alert(
        'Los eventos de rutina no se pueden editar. Crea un nuevo evento personal.',
      );
      return;
    }

    // TODO: Implementar creación/edición de eventos usando el servicio de calendario
    // Por ahora solo refrescamos los eventos
    alert(
      editingEvent
        ? 'Evento actualizado (funcionalidad pendiente)'
        : 'Evento creado (funcionalidad pendiente)',
    );
    refreshEvents();
  };

  const handleEventClick = (event: MissionaryEvent) => {
    // Abrir modal de detalles
    setViewingEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleEditFromDetail = () => {
    const eventToEdit = viewingEvent;
    if (!eventToEdit) return;

    // Cerrar modal de detalles si está abierto
    setIsDetailModalOpen(false);

    // Verificar permisos
    if (eventToEdit.id.startsWith('mockup-')) {
      alert(t('agenda.alerts.routineCannotEdit'));
      return;
    }

    setEditingEvent(eventToEdit);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: MissionaryEvent) => {
    if (event.id.startsWith('mockup-')) {
      alert(t('agenda.alerts.routineCannotEdit'));
      return;
    }
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleAddEvent = (date?: Date) => {
    setEditingEvent(null);
    setModalDefaultDate(date || currentDate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setModalDefaultDate(undefined);
  };

  return (
    <XtgPage
      title="Agenda"
      subtitle="Gestiona tus citas y actividades."
      badge="MISIONERO"
      rightIcon="menu"
    >
      <div className="xtg-section xtg-stack-lg">
        {/* Filtros por alcance */}
        <section>
          <div className="ma-scope-filters">
            <button
              type="button"
              className={`ma-scope-chip ${scopeFilter === 'ALL' ? 'ma-scope-chip--active' : ''}`}
              onClick={() => setScopeFilter('ALL')}
            >
              Todos
            </button>
            <button
              type="button"
              className={`ma-scope-chip ${scopeFilter === 'MISSION' ? 'ma-scope-chip--active' : ''}`}
              onClick={() => setScopeFilter('MISSION')}
            >
              Misión
            </button>
            <button
              type="button"
              className={`ma-scope-chip ${scopeFilter === 'ZONE' ? 'ma-scope-chip--active' : ''}`}
              onClick={() => setScopeFilter('ZONE')}
            >
              Zona
            </button>
            <button
              type="button"
              className={`ma-scope-chip ${scopeFilter === 'DISTRICT' ? 'ma-scope-chip--active' : ''}`}
              onClick={() => setScopeFilter('DISTRICT')}
            >
              Distrito
            </button>
            <button
              type="button"
              className={`ma-scope-chip ${scopeFilter === 'COMPANIONSHIP' ? 'ma-scope-chip--active' : ''}`}
              onClick={() => setScopeFilter('COMPANIONSHIP')}
            >
              Compañerismo
            </button>
            <button
              type="button"
              className={`ma-scope-chip ${scopeFilter === 'PERSONAL' ? 'ma-scope-chip--active' : ''}`}
              onClick={() => setScopeFilter('PERSONAL')}
            >
              Personal
            </button>
          </div>
        </section>

        {/* Selector de vista */}
        <section>
          <div className="ma-view-switch">
            <button
              type="button"
              className={
                view === 'day'
                  ? 'ma-view-pill ma-view-pill--active'
                  : 'ma-view-pill'
              }
              onClick={() => setView('day')}
            >
              {t('agenda.views.day')}
            </button>
            <button
              type="button"
              className={
                view === 'week'
                  ? 'ma-view-pill ma-view-pill--active'
                  : 'ma-view-pill'
              }
              onClick={() => setView('week')}
            >
              {t('agenda.views.week')}
            </button>
            <button
              type="button"
              className={
                view === 'month'
                  ? 'ma-view-pill ma-view-pill--active'
                  : 'ma-view-pill'
              }
              onClick={() => setView('month')}
            >
              {t('agenda.views.month')}
            </button>
            <button
              type="button"
              className={
                view === 'transfer'
                  ? 'ma-view-pill ma-view-pill--active'
                  : 'ma-view-pill'
              }
              onClick={() => setView('transfer')}
            >
              {t('agenda.views.transfer')}
            </button>
          </div>
        </section>

        {/* Navegación de rango */}
        <section>
          <XtgCard>
            <div className="ma-range-header">
              <button type="button" className="ma-nav-button" onClick={onPrev}>
                ‹
              </button>
              <div className="ma-range-center">
                <span className="ma-range-label">{viewLabel}</span>
                <button
                  type="button"
                  className="ma-today-pill"
                  onClick={onToday}
                  disabled={isSameDay(today, currentDate)}
                >
                  {t('agenda.rangeLabels.today')}
                </button>
              </div>
              <button type="button" className="ma-nav-button" onClick={onNext}>
                ›
              </button>
            </div>
          </XtgCard>
        </section>

        {/* Contenido según vista */}
        <section>
          {view === 'day' && (
            <DayView
              date={currentDate}
              events={dayEvents}
              onEventClick={handleEventClick}
              onEditEvent={handleEditEvent}
              t={t}
              eventTypeLabels={EVENT_TYPE_LABEL}
            />
          )}

          {view === 'week' && (
            <WeekView
              referenceDate={currentDate}
              events={weekEvents}
              onEventClick={handleEventClick}
              onEditEvent={handleEditEvent}
              t={t}
            />
          )}

          {view === 'month' && (
            <MonthView referenceDate={currentDate} events={monthEvents} />
          )}

          {view === 'transfer' && (
            <TransferView referenceDate={currentDate} events={transferEvents} />
          )}
        </section>

        {/* Botón flotante para agregar evento */}
        <button
          type="button"
          className="ma-add-event-button"
          onClick={() => handleAddEvent()}
          title={t('agenda.actions.addEvent')}
        >
          +
        </button>
      </div>

      {/* Modal de detalles del evento */}
      <EventDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setViewingEvent(null);
        }}
        onEdit={handleEditFromDetail}
        event={viewingEvent}
      />

      {/* Modal de edición/creación de evento */}
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        event={
          editingEvent
            ? {
                id: editingEvent.id,
                title: editingEvent.title,
                type: mapEventTypeToCalendarType(editingEvent.type),
                start: editingEvent.start,
                end: editingEvent.end,
                location: editingEvent.location,
                personName: editingEvent.personName,
                description:
                  viewingEvent?.description || editingEvent.description,
                required: editingEvent.required,
              }
            : null
        }
        defaultDate={modalDefaultDate}
      />
    </XtgPage>
  );
};

/* ---------- VISTAS ---------- */

interface DayViewProps {
  date: Date;
  events: MissionaryEvent[];
  onEventClick: (event: MissionaryEvent) => void;
  onEditEvent: (event: MissionaryEvent) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  eventTypeLabels: Record<EventType, string>;
}

const DayView: React.FC<DayViewProps> = ({
  date,
  events,
  onEventClick,
  onEditEvent,
  t,
  eventTypeLabels,
}) => {
  // Extender a 24 horas (6 AM - 11:59 PM) con intervalos de 30 minutos
  const startHour = 6;
  const endHour = 24; // Hasta las 11:59 PM

  return (
    <div className="ma-day-view">
      <div className="ma-day-column">
        {Array.from({ length: (endHour - startHour) * 2 }, (_, i) => {
          const hour = startHour + Math.floor(i / 2);
          const isHalfHour = i % 2 === 1;
          const hourDate = new Date(date);
          hourDate.setHours(hour, isHalfHour ? 30 : 0, 0, 0);

          return (
            <div
              key={i}
              className={`ma-day-hour-row ${
                isHalfHour ? 'ma-day-hour-row--half' : 'ma-day-hour-row--full'
              }`}
            >
              <div
                className={`ma-hour-label ${
                  isHalfHour ? 'ma-hour-label--half' : ''
                }`}
              >
                {formatHourMinute(hourDate)}
              </div>
              <div
                className={`ma-hour-line ${
                  isHalfHour ? 'ma-hour-line--dashed' : ''
                }`}
              />
            </div>
          );
        })}
        <div className="ma-day-events-layer">
          {events.map(ev => {
            const start = new Date(ev.start);
            const end = new Date(ev.end);
            const startHourDecimal = start.getHours() + start.getMinutes() / 60;
            const endHourDecimal = end.getHours() + end.getMinutes() / 60;
            // 80px por hora (40px por media hora) para evitar superposiciones
            // Restamos startHour (6) porque empezamos a las 6 AM
            const top = (startHourDecimal - startHour) * 80;
            // Altura mínima más pequeña para eventos cortos, pero mantener proporción
            const durationHours = endHourDecimal - startHourDecimal;
            const height = Math.max(
              durationHours * 80,
              durationHours < 0.5 ? 30 : 40,
            );

            return (
              <div
                key={ev.id}
                className={`ma-day-event ma-day-event--${ev.type} ${
                  ev.id.startsWith('mockup-') ? 'ma-day-event--readonly' : ''
                }`}
                style={{ top, height }}
                data-required={ev.required ? 'true' : 'false'}
                data-source={ev.source || 'PERSONAL'}
                onClick={() => onEventClick(ev)}
                title={
                  ev.id.startsWith('mockup-')
                    ? t('agenda.eventLabels.routineNotEditable')
                    : t('agenda.eventLabels.clickToEdit')
                }
              >
                <div className="ma-day-event-header">
                  <div className="ma-day-event-type">
                    {eventTypeLabels[ev.type]}
                    {ev.required && (
                      <span className="ma-required-badge">
                        {t('agenda.eventLabels.required')}
                      </span>
                    )}
                  </div>
                  {ev.scope && ev.scope !== 'PERSONAL' && (
                    <span className="ma-scope-badge">
                      {ev.scope === 'MISSION'
                        ? t('agenda.scopeFilters.mission')
                        : ev.scope === 'ZONE'
                          ? t('agenda.scopeFilters.zone')
                          : ev.scope === 'DISTRICT'
                            ? t('agenda.scopeFilters.district')
                            : ev.scope === 'COMPANIONSHIP'
                              ? t('agenda.scopeFilters.companionship')
                              : ev.scope}
                    </span>
                  )}
                </div>
                <div className="ma-day-event-title">{ev.title}</div>
                <div className="ma-day-event-meta">
                  {formatHourMinute(start)} – {formatHourMinute(end)}
                  {ev.location && ` • ${ev.location}`}
                  {ev.personName && ` • ${ev.personName}`}
                </div>
                <div className="ma-day-event-actions">
                  <button
                    type="button"
                    className="ma-event-action-btn ma-event-action-btn--view"
                    onClick={e => {
                      e.stopPropagation();
                      onEventClick(ev);
                    }}
                    title={t('agenda.actions.viewDetails')}
                  >
                    <FaEye />
                  </button>
                  {!ev.id.startsWith('mockup-') && (
                    <button
                      type="button"
                      className="ma-event-action-btn ma-event-action-btn--edit"
                      onClick={e => {
                        e.stopPropagation();
                        onEditEvent(ev);
                      }}
                      title={t('agenda.actions.editEvent')}
                    >
                      <FaPencil />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {events.length === 0 && (
        <div className="ma-empty-hint">
          {t('agenda.emptyStates.noEventsHint')}
        </div>
      )}
    </div>
  );
};

interface WeekViewProps {
  referenceDate: Date;
  events: MissionaryEvent[];
  onEventClick?: (event: MissionaryEvent) => void;
  onEditEvent?: (event: MissionaryEvent) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const WeekView: React.FC<WeekViewProps> = ({
  referenceDate,
  events,
  onEventClick,
  onEditEvent,
  t,
}) => {
  const start = startOfWeek(referenceDate);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  const eventsByDay = (d: Date) =>
    events.filter(ev => isSameDay(new Date(ev.start), d));

  return (
    <div className="ma-week-view">
      {days.map(d => (
        <div key={d.toISOString()} className="ma-week-column">
          <div
            className={
              isSameDay(d, startOfDay(new Date()))
                ? 'ma-week-day-header ma-week-day-header--today'
                : 'ma-week-day-header'
            }
          >
            <span className="ma-week-day-name">{formatDayName(d)}</span>
            <span className="ma-week-day-date">{d.getDate()}</span>
          </div>

          <div className="ma-week-events">
            {eventsByDay(d).length === 0 ? (
              <div className="ma-week-empty">
                {t('agenda.emptyStates.noEvents')}
              </div>
            ) : (
              eventsByDay(d).map(ev => {
                const startEv = new Date(ev.start);
                const endEv = new Date(ev.end);
                return (
                  <div
                    key={ev.id}
                    className={`ma-week-event ma-week-event--${ev.type} ${
                      ev.id.startsWith('mockup-')
                        ? 'ma-week-event--readonly'
                        : ''
                    }`}
                    data-required={ev.required ? 'true' : 'false'}
                    data-source={ev.source || 'PERSONAL'}
                    title={
                      ev.id.startsWith('mockup-')
                        ? t('agenda.eventLabels.routineNotEditable')
                        : t('agenda.eventLabels.clickToView')
                    }
                  >
                    <div className="ma-week-event-top">
                      <div className="ma-week-event-time">
                        {formatHourMinute(startEv)} – {formatHourMinute(endEv)}
                      </div>
                      {ev.scope && ev.scope !== 'PERSONAL' && (
                        <span className="ma-scope-badge ma-scope-badge--tiny">
                          {ev.scope === 'MISSION'
                            ? t('agenda.scopeFilters.mission')
                            : ev.scope === 'ZONE'
                              ? t('agenda.scopeFilters.zone')
                              : ev.scope === 'DISTRICT'
                                ? t('agenda.scopeFilters.district')
                                : ev.scope === 'COMPANIONSHIP'
                                  ? t('agenda.scopeFilters.companionship')
                                  : ev.scope}
                        </span>
                      )}
                    </div>
                    <div className="ma-week-event-title">{ev.title}</div>
                    {ev.location && (
                      <div className="ma-week-event-meta">{ev.location}</div>
                    )}
                    <div className="ma-week-event-actions">
                      <button
                        type="button"
                        className="ma-event-action-btn ma-event-action-btn--view"
                        onClick={e => {
                          e.stopPropagation();
                          onEventClick?.(ev);
                        }}
                        title={t('agenda.actions.viewDetails')}
                      >
                        <FaEye />
                      </button>
                      {!ev.id.startsWith('mockup-') && (
                        <button
                          type="button"
                          className="ma-event-action-btn ma-event-action-btn--edit"
                          onClick={e => {
                            e.stopPropagation();
                            onEditEvent?.(ev);
                          }}
                          title={t('agenda.actions.editEvent')}
                        >
                          <FaPencil />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

interface MonthViewProps {
  referenceDate: Date;
  events: MissionaryEvent[];
}

const MonthView: React.FC<MonthViewProps> = ({ referenceDate, events }) => {
  const start = startOfMonth(referenceDate);
  const end = endOfMonth(referenceDate);

  const startGrid = startOfWeek(start);
  const totalDays =
    Math.ceil((end.getTime() - startGrid.getTime()) / (1000 * 60 * 60 * 24)) +
    1;
  const days = Array.from({ length: totalDays }, (_, i) =>
    addDays(startGrid, i),
  );

  const eventsByDay = (d: Date) =>
    events.filter(ev => isSameDay(new Date(ev.start), d));

  const weekdayNames = Array.from({ length: 7 }, (_, i) =>
    formatDayName(addDays(startGrid, i)),
  );

  return (
    <div className="ma-month-view">
      <div className="ma-month-weekdays">
        {weekdayNames.map(name => (
          <div key={name} className="ma-month-weekday">
            {name}
          </div>
        ))}
      </div>
      <div className="ma-month-grid">
        {days.map(d => {
          const inMonth = d.getMonth() === referenceDate.getMonth();
          const dayEvents = eventsByDay(d);

          return (
            <div
              key={d.toISOString()}
              className={
                'ma-month-cell' +
                (inMonth ? '' : ' ma-month-cell--muted') +
                (isSameDay(d, startOfDay(new Date()))
                  ? ' ma-month-cell--today'
                  : '')
              }
            >
              <div className="ma-month-cell-header">
                <span className="ma-month-cell-date">{d.getDate()}</span>
                {dayEvents.length > 0 && (
                  <span className="ma-month-cell-count">
                    {dayEvents.length}
                  </span>
                )}
              </div>
              <div className="ma-month-cell-dots">
                {dayEvents.slice(0, 3).map(ev => (
                  <span
                    key={ev.id}
                    className={`ma-month-dot ma-month-dot--${ev.type}`}
                  />
                ))}
                {dayEvents.length > 3 && (
                  <span className="ma-month-more">+{dayEvents.length - 3}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface TransferViewProps {
  referenceDate: Date;
  events: MissionaryEvent[];
}

const TransferView: React.FC<TransferViewProps> = ({
  referenceDate,
  events,
}) => {
  const firstWeek = startOfWeek(referenceDate); // TODO: conectar a fecha real de traslado desde settings
  const weeks = Array.from({ length: 6 }, (_, i) => addWeeks(firstWeek, i));

  const eventsByWeek = (weekStart: Date) => {
    const weekEnd = addDays(weekStart, 7);
    return events.filter(ev => {
      const s = new Date(ev.start);
      return s >= weekStart && s < weekEnd;
    });
  };

  return (
    <div className="ma-transfer-view">
      {weeks.map((ws, index) => {
        const we = addDays(ws, 6);
        const weekEvents = eventsByWeek(ws);
        const lessons = weekEvents.filter(e => e.type === 'lesson').length;
        const contacts = weekEvents.filter(e => e.type === 'contact').length;
        const service = weekEvents.filter(e => e.type === 'service').length;

        return (
          <XtgCard key={ws.toISOString()} className="ma-transfer-card">
            <div className="ma-transfer-header">
              <div>
                <div className="ma-transfer-week-label">Semana {index + 1}</div>
                <div className="ma-transfer-dates">
                  {formatShortDate(ws)} – {formatShortDate(we)}
                </div>
              </div>
              {isSameDay(ws, startOfWeek(startOfDay(new Date()))) && (
                <span className="ma-transfer-badge">Semana actual</span>
              )}
            </div>
            <div className="ma-transfer-metrics">
              <div className="ma-transfer-metric">
                <span className="ma-transfer-metric-label">Lecciones</span>
                <span className="ma-transfer-metric-value">{lessons}</span>
              </div>
              <div className="ma-transfer-metric">
                <span className="ma-transfer-metric-label">Contactos</span>
                <span className="ma-transfer-metric-value">{contacts}</span>
              </div>
              <div className="ma-transfer-metric">
                <span className="ma-transfer-metric-label">Servicio</span>
                <span className="ma-transfer-metric-value">{service}</span>
              </div>
            </div>
            <p className="ma-transfer-hint">
              Usa esta vista para planificar el traslado completo, asegurando
              que cada semana tenga estudio, enseñanza y servicio equilibrados.
            </p>
          </XtgCard>
        );
      })}
    </div>
  );
};
