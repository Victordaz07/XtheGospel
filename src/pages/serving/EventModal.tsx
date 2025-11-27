import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import { MissionaryEvent, MissionaryEventType } from '../../types/missionaryEvent';
import { CustomSelect } from '../../vineyard/components/CustomSelect';
import './EventModal.css';

interface EventModalProps {
  open: boolean;
  initialEvent?: MissionaryEvent;
  selectedDate: Date;
  onClose: () => void;
  onSave: (event: MissionaryEvent) => void;
  onDelete?: () => void;
}

const EventModal: React.FC<EventModalProps> = ({
  open,
  initialEvent,
  selectedDate,
  onClose,
  onSave,
  onDelete,
}) => {
  const { t } = useI18n();
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MissionaryEventType>('STUDY');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [investigatorName, setInvestigatorName] = useState('');
  const [notes, setNotes] = useState('');

  // Inicializar formulario cuando se abre el modal o cambia el evento inicial
  useEffect(() => {
    if (open) {
      if (initialEvent) {
        // Modo edición
        setTitle(initialEvent.title);
        setType(initialEvent.type);
        const startDate = new Date(initialEvent.start);
        const endDate = new Date(initialEvent.end);
        setDate(startDate.toISOString().split('T')[0]);
        setStartTime(startDate.toTimeString().slice(0, 5));
        setEndTime(endDate.toTimeString().slice(0, 5));
        setLocation(initialEvent.location || '');
        setInvestigatorName(initialEvent.investigatorName || '');
        setNotes(initialEvent.notes || '');
      } else {
        // Modo creación
        setTitle('');
        setType('STUDY');
        setDate(selectedDate.toISOString().split('T')[0]);
        setStartTime('08:00');
        setEndTime('09:00');
        setLocation('');
        setInvestigatorName('');
        setNotes('');
      }
    }
  }, [open, initialEvent, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert(t('missionary.agenda.fillAllFields') || 'Por favor completa todos los campos');
      return;
    }

    // Validar que la hora de fin sea mayor que la de inicio
    if (startTime >= endTime) {
      alert('La hora de fin debe ser mayor que la hora de inicio');
      return;
    }

    // Crear fechas ISO
    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${date}T${endTime}:00`);

    const event: MissionaryEvent = {
      id: initialEvent?.id || Date.now().toString(),
      title: title.trim(),
      type,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      location: location.trim() || undefined,
      investigatorName: investigatorName.trim() || undefined,
      notes: notes.trim() || undefined,
    };

    onSave(event);
  };

  if (!open) return null;

  const eventTypes: MissionaryEventType[] = [
    'STUDY',
    'PLANNING',
    'TRAVEL',
    'CONTACTING',
    'SERVICE',
    'TEACHING',
    'MEAL',
    'MEETING',
    'OTHER',
  ];

  return (
    <div className="event-modal-overlay" onClick={onClose}>
      <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="event-modal-header">
          <h2>
            {initialEvent
              ? t('missionary.agenda.form.edit')
              : t('missionary.agenda.newEvent')}
          </h2>
          <button className="event-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="event-modal-form">
          <div className="form-group">
            <label htmlFor="event-title">
              {t('missionary.agenda.form.title')} *
            </label>
            <input
              id="event-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('missionary.agenda.eventTitlePlaceholder')}
              required
            />
          </div>

          <div className="form-group">
            <CustomSelect
              label={t('missionary.agenda.form.type') + ' *'}
              value={type}
              onChange={(value) => setType(value as MissionaryEventType)}
              options={eventTypes.map((eventType) => ({
                value: eventType,
                label: t(`missionary.eventType.${eventType}`),
              }))}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="event-date">
                {t('missionary.agenda.form.date')} *
              </label>
              <input
                id="event-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="event-start-time">
                {t('missionary.agenda.form.startTime')} *
              </label>
              <input
                id="event-start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="event-end-time">
                {t('missionary.agenda.form.endTime')} *
              </label>
              <input
                id="event-end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="event-location">
              {t('missionary.agenda.form.location')}
            </label>
            <input
              id="event-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={t('missionary.agenda.locationPlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="event-investigator">
              {t('missionary.agenda.form.investigatorName')}
            </label>
            <input
              id="event-investigator"
              type="text"
              value={investigatorName}
              onChange={(e) => setInvestigatorName(e.target.value)}
              placeholder={t('missionary.agenda.personNamePlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="event-notes">
              {t('missionary.agenda.form.notes')}
            </label>
            <textarea
              id="event-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('missionary.agenda.notesPlaceholder')}
              rows={4}
            />
          </div>

          <div className="event-modal-actions">
            {onDelete && (
              <button
                type="button"
                className="btn-delete"
                onClick={() => {
                  if (window.confirm(t('missionary.agenda.deleteConfirm'))) {
                    onDelete();
                  }
                }}
              >
                {t('missionary.agenda.form.delete')}
              </button>
            )}
            <div className="event-modal-actions-right">
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
              >
                {t('missionary.agenda.form.cancel')}
              </button>
              <button type="submit" className="btn-primary">
                {t('missionary.agenda.form.save')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;

