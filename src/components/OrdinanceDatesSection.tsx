import React, { useState } from 'react';
import { 
  FaCalendarDays, 
  FaUser, 
  FaChurch,
  FaCircleCheck,
  FaClock,
  FaCircleXmark,
  FaPaperPlane,
  FaChevronDown,
  FaChevronUp,
  FaShieldHalved
} from 'react-icons/fa6';
import { 
  useJourneyStore, 
  useJourneyStage, 
  getStageLabel,
  getVerificationLabel,
  setDevBypass,
  isDevBypassActive,
  type VerificationStatus 
} from '../core/journey/useJourneyStore';
import './OrdinanceDatesSection.css';

/**
 * Ordinance Dates Section
 * Complete ordinance information with verification system
 * Requires authorization by bishopric/clerk for validity
 */
export function OrdinanceDatesSection(): JSX.Element {
  const { 
    ordinanceDates, 
    setBaptismDate, 
    setBaptizedBy,
    setConfirmationDate, 
    setConfirmedBy,
    submitForVerification,
    clearDates 
  } = useJourneyStore();
  const stage = useJourneyStage();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleBaptismDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBaptismDate(e.target.value);
  };

  const handleBaptizedByChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBaptizedBy(e.target.value);
  };

  const handleConfirmationDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmationDate(e.target.value);
  };

  const handleConfirmedByChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmedBy(e.target.value);
  };

  const handleSubmitForVerification = (): void => {
    submitForVerification();
  };

  const hasAnyData = ordinanceDates.baptismDate || ordinanceDates.baptizedBy || 
                     ordinanceDates.confirmationDate || ordinanceDates.confirmedBy;

  const canSubmit = ordinanceDates.baptismDate && ordinanceDates.baptizedBy && 
                    ordinanceDates.verificationStatus !== 'pending' &&
                    ordinanceDates.verificationStatus !== 'verified';

  const status = ordinanceDates.verificationStatus || 'none';

  return (
    <div className="ord-dates">
      {/* Header */}
      <button 
        className="ord-dates__header"
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        <div className="ord-dates__header-left">
          <FaCalendarDays className="ord-dates__icon" />
          <div>
            <h3 className="ord-dates__title">Fechas de Ordenanzas</h3>
            <p className="ord-dates__subtitle">Bautismo y Confirmación</p>
          </div>
        </div>
        <div className="ord-dates__header-right">
          <VerificationBadge status={status} />
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="ord-dates__content">
          {isDevBypassActive() && (
            <div className="ord-dates__dev-banner">
              <span>Modo prueba activo</span>
              <button
                type="button"
                className="ord-dates__dev-bypass ord-dates__dev-bypass--small"
                onClick={() => {
                  setDevBypass(false);
                  window.location.reload();
                }}
              >
                Desactivar
              </button>
            </div>
          )}
          {/* Info Banner */}
          <div className="ord-dates__info">
            <FaShieldHalved className="ord-dates__info-icon" />
            <p>
              Esta información debe ser verificada por un miembro del obispado 
              o secretario de barrio para confirmar tu membresía.
            </p>
          </div>

          {/* Baptism Section */}
          <div className="ord-dates__section">
            <h4 className="ord-dates__section-title">Bautismo</h4>
            
            <div className="ord-dates__field">
              <label className="ord-dates__label">
                <FaCalendarDays className="ord-dates__field-icon" />
                Fecha de Bautismo
              </label>
              <input
                type="date"
                className="ord-dates__input"
                value={ordinanceDates.baptismDate || ''}
                onChange={handleBaptismDateChange}
                disabled={status === 'verified'}
              />
            </div>

            <div className="ord-dates__field">
              <label className="ord-dates__label">
                <FaUser className="ord-dates__field-icon" />
                ¿Quién te bautizó?
              </label>
              <input
                type="text"
                className="ord-dates__input"
                value={ordinanceDates.baptizedBy || ''}
                onChange={handleBaptizedByChange}
                placeholder="Nombre del poseedor del sacerdocio"
                disabled={status === 'verified'}
              />
            </div>
          </div>

          {/* Confirmation Section */}
          <div className="ord-dates__section">
            <h4 className="ord-dates__section-title">Confirmación</h4>
            
            <div className="ord-dates__field">
              <label className="ord-dates__label">
                <FaCalendarDays className="ord-dates__field-icon" />
                Fecha de Confirmación
              </label>
              <input
                type="date"
                className="ord-dates__input"
                value={ordinanceDates.confirmationDate || ''}
                onChange={handleConfirmationDateChange}
                disabled={status === 'verified'}
              />
            </div>

            <div className="ord-dates__field">
              <label className="ord-dates__label">
                <FaUser className="ord-dates__field-icon" />
                ¿Quién te confirmó?
              </label>
              <input
                type="text"
                className="ord-dates__input"
                value={ordinanceDates.confirmedBy || ''}
                onChange={handleConfirmedByChange}
                placeholder="Nombre del poseedor del sacerdocio"
                disabled={status === 'verified'}
              />
            </div>
          </div>

          {/* Verification Status */}
          <div className={`ord-dates__verification ord-dates__verification--${status}`}>
            <VerificationStatusDisplay 
              status={status} 
              verifiedBy={ordinanceDates.verifiedBy}
              verifiedByRole={ordinanceDates.verifiedByRole}
              verifiedAt={ordinanceDates.verifiedAt}
              rejectionReason={ordinanceDates.rejectionReason}
            />
          </div>

          {/* Submit Button */}
          {canSubmit && (
            <button 
              className="ord-dates__submit"
              onClick={handleSubmitForVerification}
            >
              <FaPaperPlane />
              Enviar para Verificación
            </button>
          )}

          {/* Journey Status */}
          <div className="ord-dates__status">
            <span className={`ord-dates__status-dot ord-dates__status-dot--${stage}`} />
            <p className="ord-dates__status-text">
              Estado: {getStageLabel(stage)}
            </p>
          </div>

          {/* Clear Button */}
          {hasAnyData && status !== 'verified' && (
            <button className="ord-dates__clear" onClick={clearDates}>
              Borrar datos
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

interface VerificationBadgeProps {
  status: VerificationStatus;
}

function VerificationBadge({ status }: VerificationBadgeProps): JSX.Element {
  const config = {
    none: { icon: null, className: 'none' },
    pending: { icon: <FaClock />, className: 'pending' },
    verified: { icon: <FaCircleCheck />, className: 'verified' },
    rejected: { icon: <FaCircleXmark />, className: 'rejected' },
  };

  const { icon, className } = config[status];

  if (!icon) return <></>;

  return (
    <span className={`ord-dates__badge ord-dates__badge--${className}`}>
      {icon}
    </span>
  );
}

interface VerificationStatusDisplayProps {
  status: VerificationStatus;
  verifiedBy?: string;
  verifiedByRole?: string;
  verifiedAt?: number;
  rejectionReason?: string;
}

function VerificationStatusDisplay({ 
  status, 
  verifiedBy, 
  verifiedByRole,
  verifiedAt,
  rejectionReason 
}: VerificationStatusDisplayProps): JSX.Element {
  if (status === 'none') {
    return (
      <div className="ord-dates__ver-info">
        <FaShieldHalved className="ord-dates__ver-icon" />
        <div>
          <p className="ord-dates__ver-title">Sin verificar</p>
          <p className="ord-dates__ver-desc">
            Completa los datos y envíalos para verificación
          </p>
        </div>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="ord-dates__ver-info">
        <FaClock className="ord-dates__ver-icon" />
        <div>
          <p className="ord-dates__ver-title">Pendiente de Verificación</p>
          <p className="ord-dates__ver-desc">
            Un líder de tu barrio revisará esta información
          </p>
          <button
            type="button"
            className="ord-dates__dev-bypass"
            onClick={() => {
              setDevBypass(true);
              window.location.reload();
            }}
          >
            Modo prueba: pasar directo al perfil
          </button>
        </div>
      </div>
    );
  }

  if (status === 'verified') {
    const date = verifiedAt ? new Date(verifiedAt).toLocaleDateString('es', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '';

    return (
      <div className="ord-dates__ver-info">
        <FaCircleCheck className="ord-dates__ver-icon" />
        <div>
          <p className="ord-dates__ver-title">Verificado</p>
          <p className="ord-dates__ver-desc">
            Por {verifiedBy} ({verifiedByRole})
            {date && <span className="ord-dates__ver-date"> • {date}</span>}
          </p>
        </div>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="ord-dates__ver-info">
        <FaCircleXmark className="ord-dates__ver-icon" />
        <div>
          <p className="ord-dates__ver-title">Datos Rechazados</p>
          <p className="ord-dates__ver-desc">
            {rejectionReason || 'Por favor revisa y corrige la información'}
          </p>
          {verifiedBy && (
            <p className="ord-dates__ver-by">Revisado por: {verifiedBy}</p>
          )}
        </div>
      </div>
    );
  }

  return <></>;
}
