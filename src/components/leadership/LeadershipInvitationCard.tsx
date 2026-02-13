/**
 * Leadership Invitation Card
 * 
 * Displays a leadership calling invitation for the member to accept or decline.
 * Shows in the member's profile or notifications area.
 */

import React, { useState } from 'react';
import {
  LeadershipInvitation,
  getDaysUntilExpiry,
  canRespondToInvitation,
} from '../../types/leadershipInvitation';
import { acceptInvitation, declineInvitation } from '../../services/firebase/invitationService';
import './LeadershipInvitationCard.css';

interface LeadershipInvitationCardProps {
  invitation: LeadershipInvitation;
  memberUid: string;
  onResponse?: (accepted: boolean) => void;
}

const LeadershipInvitationCard: React.FC<LeadershipInvitationCardProps> = ({
  invitation,
  memberUid,
  onResponse,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [responded, setResponded] = useState(false);
  const [responseType, setResponseType] = useState<'accepted' | 'declined' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const daysRemaining = getDaysUntilExpiry(invitation);
  const canRespond = canRespondToInvitation(invitation);

  const handleAccept = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await acceptInvitation(invitation.id, memberUid);
      
      if (result.success) {
        setResponded(true);
        setResponseType('accepted');
        onResponse?.(true);
      } else {
        const errorMessages: Record<string, string> = {
          not_found: 'Invitación no encontrada',
          expired: 'Esta invitación ha expirado',
          already_responded: 'Ya has respondido a esta invitación',
          unauthorized: 'No tienes permiso para responder',
          unknown: 'Error al aceptar. Intenta de nuevo.',
        };
        setError(errorMessages[result.error || 'unknown']);
      }
    } catch (err) {
      console.error('Accept error:', err);
      setError('Error al aceptar. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await declineInvitation(invitation.id, memberUid);
      
      if (result.success) {
        setResponded(true);
        setResponseType('declined');
        onResponse?.(false);
      } else {
        setError('Error al declinar. Intenta de nuevo.');
      }
    } catch (err) {
      console.error('Decline error:', err);
      setError('Error al declinar. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show success state if responded
  if (responded) {
    return (
      <div className={`li-card li-card--${responseType}`}>
        <div className="li-card__success">
          {responseType === 'accepted' ? (
            <>
              <span className="li-card__success-icon">✅</span>
              <h3>¡Llamamiento Aceptado!</h3>
              <p>
                Has aceptado servir como <strong>{invitation.roleName}</strong> en {invitation.wardName}.
              </p>
              <p className="li-card__next-step">
                📱 Descarga <strong>xTheGospel Leaders</strong> para acceder a tus herramientas de liderazgo.
              </p>
            </>
          ) : (
            <>
              <span className="li-card__success-icon">📝</span>
              <h3>Invitación Declinada</h3>
              <p>
                Has declinado la invitación. El obispado será notificado.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="li-card">
      {/* Header */}
      <div className="li-card__header">
        <span className="li-card__badge">Nuevo Llamamiento</span>
        {daysRemaining <= 7 && (
          <span className="li-card__expiry">
            ⏳ Expira en {daysRemaining} día{daysRemaining !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="li-card__content">
        <div className="li-card__role">
          <h3 className="li-card__role-name">{invitation.roleName}</h3>
          <span className="li-card__organization">{invitation.organization}</span>
        </div>

        <div className="li-card__ward">
          <span className="li-card__ward-icon">⛪</span>
          <span className="li-card__ward-name">{invitation.wardName}</span>
          {invitation.stakeName && (
            <span className="li-card__stake-name">{invitation.stakeName}</span>
          )}
        </div>

        <div className="li-card__from">
          <span className="li-card__from-label">Invitación de:</span>
          <span className="li-card__from-name">{invitation.invitedByName}</span>
        </div>

        {invitation.message && (
          <div className="li-card__message">
            <p>"{invitation.message}"</p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="li-card__error">{error}</div>
      )}

      {/* Actions */}
      {canRespond && (
        <div className="li-card__actions">
          <button
            className="li-card__btn li-card__btn--decline"
            onClick={handleDecline}
            disabled={isLoading}
          >
            Declinar
          </button>
          <button
            className="li-card__btn li-card__btn--accept"
            onClick={handleAccept}
            disabled={isLoading}
          >
            {isLoading ? 'Procesando...' : 'Aceptar Llamamiento'}
          </button>
        </div>
      )}

      {/* Info */}
      <div className="li-card__info">
        <p>
          Al aceptar, podrás acceder a la app <strong>xTheGospel Leaders</strong> con las herramientas 
          específicas para tu llamamiento.
        </p>
      </div>
    </div>
  );
};

export default LeadershipInvitationCard;
