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
  setDevBypass,
  isDevBypassActive,
  type VerificationStatus 
} from '../core/journey/useJourneyStore';
import { useI18n } from '../context/I18nContext';
import './OrdinanceDatesSection.css';

/**
 * Ordinance Dates Section
 * Complete ordinance information with verification system
 * Requires authorization by bishopric/clerk for validity
 */
export function OrdinanceDatesSection(): JSX.Element {
  const { t, locale } = useI18n();
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

  const handleSwitchToMemberTest = (): void => {
    setDevBypass(true);
    window.location.reload();
  };

  const handleSwitchToInvestigatorTest = (): void => {
    setDevBypass(false);
    window.location.reload();
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
            <h3 className="ord-dates__title">{t('app.ordinances.title')}</h3>
            <p className="ord-dates__subtitle">{t('app.ordinances.subtitle')}</p>
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
              <span>{t('app.ordinances.devModeActive')}</span>
              <button
                type="button"
                className="ord-dates__dev-bypass ord-dates__dev-bypass--small"
                onClick={() => {
                  setDevBypass(false);
                  window.location.reload();
                }}
              >
                {t('app.ordinances.deactivate')}
              </button>
            </div>
          )}
          {/* Info Banner */}
          <div className="ord-dates__info">
            <FaShieldHalved className="ord-dates__info-icon" />
            <p>
              {t('app.ordinances.infoText')}
            </p>
          </div>

          {/* Baptism Section */}
          <div className="ord-dates__section">
            <h4 className="ord-dates__section-title">{t('app.ordinances.baptismSection')}</h4>
            
            <div className="ord-dates__field">
              <label className="ord-dates__label">
                <FaCalendarDays className="ord-dates__field-icon" />
                {t('app.ordinances.baptismDate')}
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
                {t('app.ordinances.baptizedByQuestion')}
              </label>
              <input
                type="text"
                className="ord-dates__input"
                value={ordinanceDates.baptizedBy || ''}
                onChange={handleBaptizedByChange}
                placeholder={t('app.ordinances.priesthoodHolderPlaceholder')}
                disabled={status === 'verified'}
              />
            </div>
          </div>

          {/* Confirmation Section */}
          <div className="ord-dates__section">
            <h4 className="ord-dates__section-title">{t('app.ordinances.confirmationSection')}</h4>
            
            <div className="ord-dates__field">
              <label className="ord-dates__label">
                <FaCalendarDays className="ord-dates__field-icon" />
                {t('app.ordinances.confirmationDate')}
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
                {t('app.ordinances.confirmedByQuestion')}
              </label>
              <input
                type="text"
                className="ord-dates__input"
                value={ordinanceDates.confirmedBy || ''}
                onChange={handleConfirmedByChange}
                placeholder={t('app.ordinances.priesthoodHolderPlaceholder')}
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
              {t('app.ordinances.submitForVerification')}
            </button>
          )}

          {/* Journey Status */}
          <div className="ord-dates__status">
            <span className={`ord-dates__status-dot ord-dates__status-dot--${stage}`} />
            <p className="ord-dates__status-text">
              {t('app.ordinances.stateLabel')}: {t(`app.ordinances.stage.${stage}`)}
            </p>
          </div>

          <div className="ord-dates__test-switch">
            <p className="ord-dates__test-switch-text">
              {t('app.ordinances.testSwitchText')}
            </p>
            {isDevBypassActive() ? (
              <button
                type="button"
                className="ord-dates__test-switch-btn ord-dates__test-switch-btn--secondary"
                onClick={handleSwitchToInvestigatorTest}
              >
                {t('app.ordinances.switchToInvestigator')}
              </button>
            ) : (
              <button
                type="button"
                className="ord-dates__test-switch-btn"
                onClick={handleSwitchToMemberTest}
              >
                {t('app.ordinances.switchToMember')}
              </button>
            )}
          </div>

          {/* Clear Button */}
          {hasAnyData && status !== 'verified' && (
            <button className="ord-dates__clear" onClick={clearDates}>
              {t('app.ordinances.clearData')}
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
  const { t, locale } = useI18n();

  if (status === 'none') {
    return (
      <div className="ord-dates__ver-info">
        <FaShieldHalved className="ord-dates__ver-icon" />
        <div>
          <p className="ord-dates__ver-title">{t('app.ordinances.status.none.title')}</p>
          <p className="ord-dates__ver-desc">
            {t('app.ordinances.status.none.desc')}
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
          <p className="ord-dates__ver-title">{t('app.ordinances.status.pending.title')}</p>
          <p className="ord-dates__ver-desc">
            {t('app.ordinances.status.pending.desc')}
          </p>
          <button
            type="button"
            className="ord-dates__dev-bypass"
            onClick={() => {
              setDevBypass(true);
              window.location.reload();
            }}
          >
            {t('app.ordinances.status.pending.devBypass')}
          </button>
        </div>
      </div>
    );
  }

  if (status === 'verified') {
    const date = verifiedAt ? new Date(verifiedAt).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '';

    return (
      <div className="ord-dates__ver-info">
        <FaCircleCheck className="ord-dates__ver-icon" />
        <div>
          <p className="ord-dates__ver-title">{t('app.ordinances.status.verified.title')}</p>
          <p className="ord-dates__ver-desc">
            {t('app.ordinances.status.verified.by', {
              verifiedBy: verifiedBy || '',
              verifiedByRole: verifiedByRole || '',
            })}
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
          <p className="ord-dates__ver-title">{t('app.ordinances.status.rejected.title')}</p>
          <p className="ord-dates__ver-desc">
            {rejectionReason || t('app.ordinances.status.rejected.defaultReason')}
          </p>
          {verifiedBy && (
            <p className="ord-dates__ver-by">
              {t('app.ordinances.status.rejected.reviewedBy', { verifiedBy })}
            </p>
          )}
        </div>
      </div>
    );
  }

  return <></>;
}
