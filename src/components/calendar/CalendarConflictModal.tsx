// src/components/calendar/CalendarConflictModal.tsx
import React from 'react';
import { CalendarConflict } from '../../services/calendarService';
import { MissionCalendarEvent } from '../../data/calendar/calendarTypes';
import './calendar-conflict-modal.css';

interface CalendarConflictModalProps {
  open: boolean;
  conflicts: CalendarConflict[];
  onClose: () => void;
}

const formatHour = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

const describeEvent = (ev: MissionCalendarEvent) => {
  const date = formatDate(ev.start);
  const start = formatHour(ev.start);
  const end = formatHour(ev.end);
  return `${date} · ${start}–${end}`;
};

export const CalendarConflictModal: React.FC<CalendarConflictModalProps> = ({
  open,
  conflicts,
  onClose,
}) => {
  if (!open) return null;
  if (!conflicts.length) return null;

  return (
    <div className="xtg-modal-backdrop" onClick={onClose}>
      <div className="xtg-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="xtg-modal-title">Horario ya reservado</h2>
        <p className="xtg-modal-text">
          No se pudo guardar este evento porque ya existe al menos una
          actividad bloqueante en ese horario.
        </p>

        <div className="xtg-modal-list">
          {conflicts.map((c) => (
            <div
              key={c.existingEvent.id}
              className={`xtg-modal-conflict xtg-modal-conflict--${c.level.toLowerCase()}`}
            >
              <div className="xtg-modal-conflict-title">
                {c.existingEvent.title}
              </div>
              <div className="xtg-modal-conflict-meta">
                {describeEvent(c.existingEvent)}
                {c.existingEvent.location && ` · ${c.existingEvent.location}`}
              </div>
              <div className="xtg-modal-conflict-tag">
                {c.level === 'HARD'
                  ? 'Evento de misión / zona (no se puede sobreponer)'
                  : 'Conflicto suave'}
              </div>
            </div>
          ))}
        </div>

        <button className="xtg-modal-button" type="button" onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  );
};

