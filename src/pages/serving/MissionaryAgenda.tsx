import React, { useState, useMemo } from 'react';
import { useI18n } from '../../context/I18nContext';
import { MissionaryEvent, MissionaryEventType, EVENT_TYPE_STYLES, getMinutesFromMidnight, getDurationMinutes, formatTime, getEventsForDay } from '../../types/missionaryEvent';
import EventModal from './EventModal';
import '../learning/Page.css';
import './MissionaryAgenda.css';

// Datos mock para demostración
const generateMockEvents = (date: Date): MissionaryEvent[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return [
    {
      id: '1',
      title: 'ESTUDIO O PLANIFICACIÓN',
      type: 'STUDY',
      start: new Date(year, month, day, 8, 0).toISOString(),
      end: new Date(year, month, day, 10, 0).toISOString(),
      location: 'Casa',
      notes: 'Estudio personal y planificación del día',
    },
    {
      id: '2',
      title: 'VIAJES',
      type: 'TRAVEL',
      start: new Date(year, month, day, 10, 30).toISOString(),
      end: new Date(year, month, day, 11, 0).toISOString(),
      location: 'Zona Centro',
      notes: 'Viaje a zona de contacto',
    },
    {
      id: '3',
      title: 'CONTACTO',
      type: 'CONTACTING',
      start: new Date(year, month, day, 11, 0).toISOString(),
      end: new Date(year, month, day, 12, 30).toISOString(),
      location: 'Zona Centro',
      investigatorName: 'María González',
      notes: 'Contacto con investigador',
    },
    {
      id: '4',
      title: 'SERVICIO',
      type: 'SERVICE',
      start: new Date(year, month, day, 14, 0).toISOString(),
      end: new Date(year, month, day, 16, 0).toISOString(),
      location: 'Casa de Hermana Pérez',
      notes: 'Servicio de limpieza',
    },
    {
      id: '5',
      title: 'ENSEÑANZA',
      type: 'TEACHING',
      start: new Date(year, month, day, 16, 30).toISOString(),
      end: new Date(year, month, day, 18, 0).toISOString(),
      location: 'Capilla',
      investigatorName: 'Juan Pérez',
      notes: 'Lección 1: La Restauración',
    },
    {
      id: '6',
      title: 'COMIDA',
      type: 'MEAL',
      start: new Date(year, month, day, 19, 0).toISOString(),
      end: new Date(year, month, day, 20, 0).toISOString(),
      location: 'Casa',
      notes: 'Cena',
    },
  ];
};

const MissionaryAgenda: React.FC = () => {
  const { t } = useI18n();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<MissionaryEvent[]>(() => generateMockEvents(new Date()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<MissionaryEvent | null>(null);

  // Obtener eventos del día seleccionado
  const dayEvents = useMemo(() => {
    return getEventsForDay(events, selectedDate);
  }, [events, selectedDate]);

  // Generar horas del día (6:00 AM a 10:00 PM)
  const hours = useMemo(() => {
    const hoursArray = [];
    for (let hour = 6; hour <= 22; hour++) {
      hoursArray.push(hour);
    }
    return hoursArray;
  }, []);

  // Navegación de fechas
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
    // Cargar eventos del nuevo día (en producción, esto vendría de Firebase)
    const newDayEvents = generateMockEvents(newDate);
    setEvents(prev => {
      const filtered = prev.filter(e => {
        const eDate = new Date(e.start);
        return eDate.toDateString() !== newDate.toDateString();
      });
      return [...filtered, ...newDayEvents];
    });
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
    // Cargar eventos del nuevo día
    const newDayEvents = generateMockEvents(newDate);
    setEvents(prev => {
      const filtered = prev.filter(e => {
        const eDate = new Date(e.start);
        return eDate.toDateString() !== newDate.toDateString();
      });
      return [...filtered, ...newDayEvents];
    });
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    const todayEvents = generateMockEvents(today);
    setEvents(prev => {
      const filtered = prev.filter(e => {
        const eDate = new Date(e.start);
        return eDate.toDateString() !== today.toDateString();
      });
      return [...filtered, ...todayEvents];
    });
  };

  // Formatear fecha para mostrar
  const formatDateDisplay = (date: Date): string => {
    const days = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${dayName} ${day} ${month}`;
  };

  // Calcular posición y altura de un evento
  const getEventStyle = (event: MissionaryEvent) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    
    const startMinutes = getMinutesFromMidnight(startDate);
    const durationMinutes = getDurationMinutes(event.start, event.end);
    
    // El día comienza a las 6:00 AM (360 minutos desde medianoche)
    const dayStartMinutes = 6 * 60;
    const dayEndMinutes = 22 * 60;
    const totalDayMinutes = dayEndMinutes - dayStartMinutes;
    
    // Calcular posición top (porcentaje desde el inicio del día)
    const topPercent = ((startMinutes - dayStartMinutes) / totalDayMinutes) * 100;
    
    // Calcular altura (porcentaje de la duración)
    const heightPercent = (durationMinutes / totalDayMinutes) * 100;
    
    return {
      top: `${Math.max(0, topPercent)}%`,
      height: `${Math.max(2, heightPercent)}%`, // Mínimo 2% para que sea visible
    };
  };

  // Manejar clic en evento para editar
  const handleEventClick = (event: MissionaryEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  // Manejar guardar evento
  const handleSaveEvent = (event: MissionaryEvent) => {
    if (editingEvent) {
      // Actualizar evento existente
      setEvents(prev => prev.map(e => e.id === event.id ? event : e));
    } else {
      // Crear nuevo evento
      setEvents(prev => [...prev, event]);
    }
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  // Manejar eliminar evento
  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  // Manejar abrir modal para nuevo evento
  const handleNewEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('missionary.agenda.title')}</h1>
        <p className="page-subtitle">{t('missionary.agenda.subtitle')}</p>
      </div>

      <div className="page-content">
        {/* Header de navegación de fecha */}
        <div className="agenda-date-navigation">
          <button 
            className="agenda-nav-button" 
            onClick={goToPreviousDay}
            aria-label="Día anterior"
          >
            ‹
          </button>
          <div className="agenda-date-display">
            <span className="agenda-date-text">{formatDateDisplay(selectedDate)}</span>
            <button 
              className="agenda-today-button"
              onClick={goToToday}
            >
              {t('missionary.agenda.today')}
            </button>
          </div>
          <button 
            className="agenda-nav-button" 
            onClick={goToNextDay}
            aria-label="Día siguiente"
          >
            ›
          </button>
        </div>

        {/* Vista de calendario diario */}
        <div className="agenda-day-view">
          {/* Columna de horas */}
          <div className="agenda-time-column">
            {hours.map(hour => (
              <div key={hour} className="agenda-time-slot">
                <span className="agenda-time-label">
                  {hour.toString().padStart(2, '0')}:00
                </span>
              </div>
            ))}
          </div>

          {/* Columna principal con eventos */}
          <div className="agenda-events-column">
            {/* Líneas de hora */}
            {hours.map(hour => (
              <div key={hour} className="agenda-hour-line" />
            ))}

            {/* Bloques de eventos */}
            {dayEvents.map(event => {
              const style = getEventStyle(event);
              const eventStyles = EVENT_TYPE_STYLES[event.type];
              const startTime = formatTime(new Date(event.start));
              const endTime = formatTime(new Date(event.end));

              return (
                <div
                  key={event.id}
                  className="agenda-event-block"
                  style={{
                    ...style,
                    backgroundColor: eventStyles.bg,
                    borderLeft: `3px solid ${eventStyles.border}`,
                    color: eventStyles.text,
                  }}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="agenda-event-header">
                    <span className="agenda-event-type">
                      {t(`missionary.eventType.${event.type}`)}
                    </span>
                    <span className="agenda-event-time">
                      {startTime} - {endTime}
                    </span>
                  </div>
                  <div className="agenda-event-title">{event.title}</div>
                  {event.investigatorName && (
                    <div className="agenda-event-person">
                      👤 {event.investigatorName}
                    </div>
                  )}
                  {event.location && (
                    <div className="agenda-event-location">
                      📍 {event.location}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Botón FAB para agregar evento */}
        <button 
          className="agenda-fab"
          onClick={handleNewEvent}
          aria-label={t('missionary.agenda.newEvent')}
        >
          +
        </button>
      </div>

      {/* Modal de evento */}
      <EventModal
        open={isModalOpen}
        initialEvent={editingEvent || undefined}
        selectedDate={selectedDate}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        onDelete={editingEvent ? () => handleDeleteEvent(editingEvent.id) : undefined}
      />
    </div>
  );
};

export default MissionaryAgenda;
