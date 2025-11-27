import React from 'react';
import { FaTimes, FaCheckCircle, FaInfoCircle, FaExclamationCircle } from 'react-icons/fa';
import { useI18n } from '../../context/I18nContext';
import './NotificationsModal.css';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock notifications data - in production, this would come from a service/API
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: '¡Módulo completado!',
    message: 'Has completado el módulo "Doctrina de Cristo en la vida diaria". ¡Felicidades!',
    time: 'Hace 2 horas',
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'Nueva actividad disponible',
    message: 'Hay una nueva actividad de práctica disponible: "Fe que impulsa acción"',
    time: 'Hace 5 horas',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Recordatorio de estudio',
    message: 'No olvides continuar con tu estudio diario. Tienes 3 secciones pendientes.',
    time: 'Ayer',
    read: true,
  },
  {
    id: '4',
    type: 'success',
    title: 'Racha de estudio',
    message: '¡Llevas 7 días consecutivos estudiando! Sigue así.',
    time: 'Hace 2 días',
    read: true,
  },
];

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();

  if (!isOpen) return null;

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="notification-icon notification-icon-success" />;
      case 'warning':
        return <FaExclamationCircle className="notification-icon notification-icon-warning" />;
      default:
        return <FaInfoCircle className="notification-icon notification-icon-info" />;
    }
  };

  return (
    <div className="notifications-modal-overlay" onClick={onClose}>
      <div className="notifications-modal" onClick={(e) => e.stopPropagation()}>
        <div className="notifications-modal-header">
          <div>
            <h2 className="notifications-modal-title">
              {t('memberHome.notifications.title') || 'Notificaciones'}
            </h2>
            {unreadCount > 0 && (
              <span className="notifications-badge">{unreadCount}</span>
            )}
          </div>
          <button
            className="notifications-modal-close"
            onClick={onClose}
            aria-label={t('common.close') || 'Cerrar'}
          >
            <FaTimes />
          </button>
        </div>

        <div className="notifications-modal-content">
          {mockNotifications.length === 0 ? (
            <div className="notifications-empty">
              <p>{t('memberHome.notifications.empty') || 'No tienes notificaciones'}</p>
            </div>
          ) : (
            <div className="notifications-list">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                >
                  <div className="notification-icon-wrapper">
                    {getIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <h3 className="notification-title">{notification.title}</h3>
                    <p className="notification-message">{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  {!notification.read && <div className="notification-dot" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

