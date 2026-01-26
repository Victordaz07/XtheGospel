import React from 'react';
import { FaCalendarDays } from 'react-icons/fa6';
import { useJourneyStore, useJourneyStage, getStageLabel } from '../core/journey/useJourneyStore';
import './OrdinanceDatesSection.css';

/**
 * Ordinance Dates Section
 * Discreet section for profile pages - no gamification
 */
export function OrdinanceDatesSection(): JSX.Element {
  const { ordinanceDates, setBaptismDate, setConfirmationDate, clearDates } = useJourneyStore();
  const stage = useJourneyStage();

  const handleBaptismChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBaptismDate(e.target.value);
  };

  const handleConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmationDate(e.target.value);
  };

  const hasAnyDate = ordinanceDates.baptismDate || ordinanceDates.confirmationDate;

  return (
    <div className="ordinance-dates">
      <div className="ordinance-dates__header">
        <FaCalendarDays className="ordinance-dates__icon" />
        <h3 className="ordinance-dates__title">Ordinance Dates (optional)</h3>
      </div>
      
      <p className="ordinance-dates__helper">
        These dates help tailor your study and next steps.
      </p>

      <div className="ordinance-dates__fields">
        <div className="ordinance-dates__field">
          <label className="ordinance-dates__label">Baptism Date</label>
          <input
            type="date"
            className="ordinance-dates__input"
            value={ordinanceDates.baptismDate || ''}
            onChange={handleBaptismChange}
          />
        </div>

        <div className="ordinance-dates__field">
          <label className="ordinance-dates__label">Confirmation Date</label>
          <input
            type="date"
            className="ordinance-dates__input"
            value={ordinanceDates.confirmationDate || ''}
            onChange={handleConfirmationChange}
          />
        </div>
      </div>

      <div className="ordinance-dates__status">
        <span className={`ordinance-dates__status-dot ordinance-dates__status-dot--${stage}`} />
        <p className="ordinance-dates__status-text">
          Journey status: {getStageLabel(stage)}
        </p>
      </div>

      {hasAnyDate && (
        <button className="ordinance-dates__clear" onClick={clearDates}>
          Clear dates
        </button>
      )}
    </div>
  );
}
