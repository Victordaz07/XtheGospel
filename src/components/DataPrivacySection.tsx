/**
 * Data & Privacy Section
 * Sprint 10 - Data Ownership & Export
 * 
 * "Everything you write here belongs to you.
 *  You can take it with you, anytime."
 */
import React, { useState, useEffect } from 'react';
import { FaDownload, FaTrashCan, FaShieldHalved, FaCheck } from 'react-icons/fa6';
import {
  exportLocalData,
  clearAllLocalData,
  getDataInfo,
  DataInfo,
} from '../core/export/exportLocalData';
import './DataPrivacySection.css';

interface DataPrivacySectionProps {
  /** CSS class prefix for theming (e.g., 'inv-profile' or 'nm-profile') */
  classPrefix?: string;
}

export default function DataPrivacySection({
  classPrefix = 'data-privacy',
}: DataPrivacySectionProps): JSX.Element {
  const [dataInfo, setDataInfo] = useState<DataInfo | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  useEffect(() => {
    // Load data info on mount
    setDataInfo(getDataInfo());
  }, []);

  const handleExport = () => {
    try {
      exportLocalData();
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      alert('Export failed. Please try again.');
    }
  };

  const handleClearRequest = () => {
    setShowClearConfirm(true);
  };

  const handleClearConfirm = () => {
    clearAllLocalData();
    // Page will reload after clear
  };

  const handleClearCancel = () => {
    setShowClearConfirm(false);
  };

  return (
    <div className={`${classPrefix}__data-privacy`}>
      {/* Trust Message */}
      <div className={`${classPrefix}__privacy-intro`}>
        <FaShieldHalved className={`${classPrefix}__privacy-icon`} />
        <p className={`${classPrefix}__privacy-message`}>
          Everything you write here belongs to you.
          <br />
          <span className={`${classPrefix}__privacy-emphasis`}>
            You can take it with you, anytime.
          </span>
        </p>
      </div>

      {/* What Exists */}
      <div className={`${classPrefix}__data-summary`}>
        <h4 className={`${classPrefix}__data-summary-title`}>Your data on this device</h4>
        <ul className={`${classPrefix}__data-list`}>
          <li className={dataInfo?.hasJourneyData ? '' : `${classPrefix}__data-empty`}>
            <span>Journey dates</span>
            <span>{dataInfo?.hasJourneyData ? '✓' : '—'}</span>
          </li>
          <li className={dataInfo?.hasJournalEntries ? '' : `${classPrefix}__data-empty`}>
            <span>Journal entries</span>
            <span>
              {dataInfo?.hasJournalEntries
                ? `${dataInfo.journalEntryCount} ${dataInfo.journalEntryCount === 1 ? 'entry' : 'entries'}`
                : '—'}
            </span>
          </li>
          <li className={dataInfo?.hasSpiritualMemory ? '' : `${classPrefix}__data-empty`}>
            <span>Continuity memory</span>
            <span>{dataInfo?.hasSpiritualMemory ? '✓' : '—'}</span>
          </li>
          <li className={dataInfo?.hasLeadershipData ? '' : `${classPrefix}__data-empty`}>
            <span>Leadership data</span>
            <span>{dataInfo?.hasLeadershipData ? '✓' : '—'}</span>
          </li>
        </ul>
      </div>

      {/* What Does NOT Exist */}
      <div className={`${classPrefix}__no-tracking`}>
        <p className={`${classPrefix}__no-tracking-text`}>
          <strong>What we don't have:</strong> No accounts, no cloud sync, 
          no tracking, no analytics. Your data stays on this device only.
        </p>
      </div>

      {/* Actions */}
      <div className={`${classPrefix}__data-actions`}>
        <button
          className={`${classPrefix}__data-btn ${classPrefix}__data-btn--export`}
          onClick={handleExport}
          disabled={exportSuccess}
        >
          {exportSuccess ? (
            <>
              <FaCheck /> Exported!
            </>
          ) : (
            <>
              <FaDownload /> Export my data
            </>
          )}
        </button>

        <button
          className={`${classPrefix}__data-btn ${classPrefix}__data-btn--clear`}
          onClick={handleClearRequest}
        >
          <FaTrashCan /> Clear local data
        </button>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className={`${classPrefix}__confirm-overlay`}>
          <div className={`${classPrefix}__confirm-modal`}>
            <h3 className={`${classPrefix}__confirm-title`}>Clear all data?</h3>
            <p className={`${classPrefix}__confirm-text`}>
              This will remove everything stored on this device:
              <br />
              <br />
              • Journey dates
              <br />
              • Journal entries
              <br />
              • Leadership data (callings, notes, calendar)
              <br />
              • App preferences
              <br />
              <br />
              <strong>We recommend exporting your data first.</strong>
              <br />
              You can start fresh at any time.
            </p>
            <div className={`${classPrefix}__confirm-actions`}>
              <button
                className={`${classPrefix}__confirm-btn ${classPrefix}__confirm-btn--cancel`}
                onClick={handleClearCancel}
              >
                Keep my data
              </button>
              <button
                className={`${classPrefix}__confirm-btn ${classPrefix}__confirm-btn--confirm`}
                onClick={handleClearConfirm}
              >
                Yes, clear everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
