import React, { useState, useEffect } from 'react';
import { CalendarEventType } from '../../data/calendar/calendarTypes';
import { useI18n } from '../../context/I18nContext';
import './event-modal.css';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: EventFormData) => void;
  event?: {
    id: string;
    title: string;
    type: string;
    start: string;
    end: string;
    location?: string;
    personName?: string;
    description?: string;
    required?: boolean;
  } | null;
  defaultDate?: Date;
  defaultStartTime?: string;
  defaultEndTime?: string;
}

export interface EventFormData {
  title: string;
  type: CalendarEventType;
  start: string;
  end: string;
  location?: string;
  personName?: string;
  description?: string;
  required: boolean;
}

// EVENT_TYPE_OPTIONS will be created inside component to use translations

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  event,
  defaultDate,
  defaultStartTime,
  defaultEndTime,
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<CalendarEventType>('STUDY');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [personName, setPersonName] = useState('');
  const [description, setDescription] = useState('');
  const [required, setRequired] = useState(false);

  const { t } = useI18n();

  const EVENT_TYPE_OPTIONS: { value: CalendarEventType; label: string }[] = [
    { value: 'STUDY', label: t('agenda.eventTypes.study') },
    { value: 'LESSON', label: t('agenda.eventTypes.lesson') },
    { value: 'CONTACT', label: t('agenda.eventTypes.contact') },
    { value: 'SERVICE', label: t('agenda.eventTypes.service') },
    {
      value: 'DISTRICT_COUNCIL',
      label: t('event.modal.fields.districtCouncil'),
    },
    { value: 'ZONE_COUNCIL', label: t('event.modal.fields.zoneCouncil') },
    { value: 'PDAY', label: t('agenda.eventTypes.pday') },
    { value: 'OTHER', label: t('common.other') },
  ];

  useEffect(() => {
    if (isOpen) {
      if (event) {
        // Modo edición
        setTitle(event.title);
        setType(event.type as CalendarEventType);
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        setDate(startDate.toISOString().split('T')[0]);
        setStartTime(formatTimeForInput(startDate));
        setEndTime(formatTimeForInput(endDate));
        setLocation(event.location || '');
        setPersonName(event.personName || '');
        setDescription(event.description || '');
        setRequired(event.required || false);
      } else {
        // Modo creación
        const baseDate = defaultDate || new Date();
        setDate(baseDate.toISOString().split('T')[0]);
        setStartTime(defaultStartTime || '09:00');
        setEndTime(defaultEndTime || '10:00');
        setTitle('');
        setType('STUDY');
        setLocation('');
        setPersonName('');
        setDescription('');
        setRequired(false);
      }
    }
  }, [isOpen, event, defaultDate, defaultStartTime, defaultEndTime]);

  const formatTimeForInput = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date || !startTime || !endTime) {
      alert(t('event.modal.errors.requiredFields'));
      return;
    }

    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${date}T${endTime}:00`);

    if (endDateTime <= startDateTime) {
      alert(t('event.modal.errors.endBeforeStart'));
      return;
    }

    onSave({
      title: title.trim(),
      type,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      location: location.trim() || undefined,
      personName: personName.trim() || undefined,
      description: description.trim() || undefined,
      required,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="event-modal-overlay" onClick={onClose}>
      <div className="event-modal-content" onClick={e => e.stopPropagation()}>
        <div className="event-modal-header">
          <h2 className="event-modal-title">
            {event ? t('event.modal.editTitle') : t('event.modal.newTitle')}
          </h2>
          <button
            type="button"
            className="event-modal-close"
            onClick={onClose}
            aria-label={t('event.modal.close')}
          >
            ×
          </button>
        </div>

        <form className="event-modal-form" onSubmit={handleSubmit}>
          <div className="event-form-group">
            <label className="event-form-label">
              {t('event.modal.fields.title')}{' '}
              <span className="event-form-required">*</span>
            </label>
            <input
              type="text"
              className="event-form-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={t('event.modal.placeholders.title')}
              required
            />
          </div>

          <div className="event-form-group">
            <label className="event-form-label">
              {t('event.modal.fields.type')}{' '}
              <span className="event-form-required">*</span>
            </label>
            <select
              className="event-form-select"
              value={type}
              onChange={e => setType(e.target.value as CalendarEventType)}
              required
            >
              {EVENT_TYPE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="event-form-row">
            <div className="event-form-group">
              <label className="event-form-label">
                {t('event.modal.fields.date')}{' '}
                <span className="event-form-required">*</span>
              </label>
              <input
                type="date"
                className="event-form-input"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="event-form-row">
            <div className="event-form-group">
              <label className="event-form-label">
                {t('event.modal.fields.startTime')}{' '}
                <span className="event-form-required">*</span>
              </label>
              <input
                type="time"
                className="event-form-input"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                required
              />
            </div>

            <div className="event-form-group">
              <label className="event-form-label">
                {t('event.modal.fields.endTime')}{' '}
                <span className="event-form-required">*</span>
              </label>
              <input
                type="time"
                className="event-form-input"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="event-form-group">
            <label className="event-form-label">
              {t('event.modal.fields.location')}
            </label>
            <input
              type="text"
              className="event-form-input"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder={t('event.modal.placeholders.location')}
            />
          </div>

          <div className="event-form-group">
            <label className="event-form-label">
              {t('event.modal.fields.person')}
            </label>
            <input
              type="text"
              className="event-form-input"
              value={personName}
              onChange={e => setPersonName(e.target.value)}
              placeholder={t('event.modal.placeholders.person')}
            />
          </div>

          <div className="event-form-group">
            <label className="event-form-label">
              {t('event.modal.fields.description')}
            </label>
            <textarea
              className="event-form-textarea"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={t('event.modal.placeholders.description')}
              rows={3}
            />
          </div>

          <div className="event-form-group">
            <label className="event-form-checkbox-label">
              <input
                type="checkbox"
                className="event-form-checkbox"
                checked={required}
                onChange={e => setRequired(e.target.checked)}
              />
              <span>{t('event.modal.fields.required')}</span>
            </label>
          </div>

          <div className="event-modal-actions">
            <button
              type="button"
              className="event-modal-button event-modal-button--secondary"
              onClick={onClose}
            >
              {t('event.modal.buttons.cancel')}
            </button>
            <button
              type="submit"
              className="event-modal-button event-modal-button--primary"
            >
              {event
                ? t('event.modal.buttons.save')
                : t('event.modal.buttons.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
