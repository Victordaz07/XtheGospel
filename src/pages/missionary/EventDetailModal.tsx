import React from 'react';
import { formatHourMinute } from './MissionaryAgendaScreen';
import { useI18n } from '../../context/I18nContext';
import './event-detail-modal.css';

interface MissionaryEvent {
  id: string;
  title: string;
  type: string;
  start: string;
  end: string;
  location?: string;
  personName?: string;
  areaName?: string;
  required?: boolean;
  source?: 'PERSONAL' | 'LEADERSHIP';
  scope?: 'MISSION' | 'ZONE' | 'DISTRICT' | 'COMPANIONSHIP' | 'PERSONAL';
  description?: string;
}

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  event: MissionaryEvent | null;
}

// EVENT_TYPE_LABEL and SCOPE_LABEL moved inside component to use translations

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  event,
}) => {
  const { t } = useI18n();
  if (!isOpen || !event) return null;

  const EVENT_TYPE_LABEL: Record<string, string> = {
    STUDY: t('agenda.eventTypes.study') || 'Estudio',
    LESSON: t('agenda.eventTypes.lesson') || 'Lección',
    CONTACT: t('agenda.eventTypes.contact') || 'Contacto',
    SERVICE: t('agenda.eventTypes.service') || 'Servicio',
    DISTRICT_COUNCIL:
      t('event.modal.fields.districtCouncil') || 'Consejo de distrito',
    ZONE_COUNCIL: t('event.modal.fields.zoneCouncil') || 'Consejo de zona',
    PDAY: t('agenda.eventTypes.pday') || 'Día P',
    OTHER: t('common.other') || 'Otro',
  };
  const SCOPE_LABEL: Record<string, string> = {
    MISSION: t('agenda.scope.mission') || 'Misión',
    ZONE: t('agenda.scope.zone') || 'Zona',
    DISTRICT: t('agenda.scope.district') || 'Distrito',
    COMPANIONSHIP: t('agenda.scope.companionship') || 'Compañerismo',
    PERSONAL: t('agenda.scope.personal') || 'Personal',
  };

  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const durationMs = endDate.getTime() - startDate.getTime();
  const durationHours = Math.round((durationMs / (1000 * 60 * 60)) * 10) / 10;

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const canEdit =
    !event.id.startsWith('mockup-') &&
    (event.source === 'PERSONAL' || event.scope === 'PERSONAL');

  return (
    <div className="event-detail-overlay" onClick={onClose}>
      <div className="event-detail-modal" onClick={e => e.stopPropagation()}>
        <div className="event-detail-header">
          <div className="event-detail-header-content">
            <span
              className={`event-detail-type event-detail-type--${event.type}`}
            >
              {EVENT_TYPE_LABEL[event.type] || event.type}
            </span>
            {event.scope && event.scope !== 'PERSONAL' && (
              <span
                className={`event-detail-scope event-detail-scope--${event.scope.toLowerCase()}`}
              >
                {SCOPE_LABEL[event.scope]}
              </span>
            )}
            {event.required && (
              <span className="event-detail-required">
                {t('agenda.eventLabels.required')}
              </span>
            )}
          </div>
          <button
            type="button"
            className="event-detail-close"
            onClick={onClose}
            aria-label={t('event.modal.close')}
          >
            ×
          </button>
        </div>

        <div className="event-detail-content">
          <h1 className="event-detail-title">{event.title}</h1>

          <div className="event-detail-section">
            <div className="event-detail-row">
              <div className="event-detail-info-item">
                <span className="event-detail-label">
                  {t('event.detail.labels.date')}
                </span>
                <span className="event-detail-value">
                  {formatFullDate(startDate)}
                </span>
              </div>
            </div>

            <div className="event-detail-row">
              <div className="event-detail-info-item">
                <span className="event-detail-label">
                  {t('event.detail.labels.startTime')}
                </span>
                <span className="event-detail-value">
                  {formatHourMinute(startDate)}
                </span>
              </div>
              <div className="event-detail-info-item">
                <span className="event-detail-label">
                  {t('event.detail.labels.endTime')}
                </span>
                <span className="event-detail-value">
                  {formatHourMinute(endDate)}
                </span>
              </div>
            </div>

            <div className="event-detail-row">
              <div className="event-detail-info-item">
                <span className="event-detail-label">
                  {t('event.detail.labels.duration')}
                </span>
                <span className="event-detail-value">
                  {durationHours === 1
                    ? t('event.detail.duration.oneHour')
                    : t('event.detail.duration.hours', {
                        hours: durationHours.toString(),
                      })}
                </span>
              </div>
            </div>

            {event.location && (
              <div className="event-detail-row">
                <div className="event-detail-info-item">
                  <span className="event-detail-label">
                    {t('event.detail.labels.location')}
                  </span>
                  <span className="event-detail-value">{event.location}</span>
                </div>
              </div>
            )}

            {event.personName && (
              <div className="event-detail-row">
                <div className="event-detail-info-item">
                  <span className="event-detail-label">
                    {t('event.detail.labels.person')}
                  </span>
                  <span className="event-detail-value">{event.personName}</span>
                </div>
              </div>
            )}

            {event.areaName && (
              <div className="event-detail-row">
                <div className="event-detail-info-item">
                  <span className="event-detail-label">
                    {t('event.detail.labels.area')}
                  </span>
                  <span className="event-detail-value">{event.areaName}</span>
                </div>
              </div>
            )}
          </div>

          {event.description && (
            <div className="event-detail-section">
              <h3 className="event-detail-section-title">
                {t('event.detail.labels.description')}
              </h3>
              <div className="event-detail-description">
                {event.description.split('\n').map((line, i) => (
                  <p key={i}>{line || '\u00A0'}</p>
                ))}
              </div>
            </div>
          )}

          {!event.description && (
            <div className="event-detail-section">
              <div className="event-detail-empty-description">
                <span>📝</span>
                <p>{t('event.detail.emptyDescription')}</p>
              </div>
            </div>
          )}
        </div>

        <div className="event-detail-footer">
          {canEdit ? (
            <button
              type="button"
              className="event-detail-edit-button"
              onClick={onEdit}
            >
              {t('event.detail.editButton')}
            </button>
          ) : (
            <div className="event-detail-readonly-message">
              {event.id.startsWith('mockup-')
                ? t('event.detail.readonlyMessages.routine')
                : t('event.detail.readonlyMessages.personalOnly')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
