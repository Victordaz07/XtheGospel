/**
 * XtgProfileCard - Shareable xTheGospel ID Card
 * 
 * A beautiful, shareable profile card that displays the user's
 * xTheGospel ID. Can be shared with leaders for ward registration.
 */

import React, { useState } from 'react';
import { FaShareNodes, FaCopy, FaCheck, FaChurch, FaUser } from 'react-icons/fa6';
import { UniversalUserProfile, MemberStatus } from '../../types/user';
import { useI18n } from '../../context/I18nContext';
import './XtgProfileCard.css';

interface XtgProfileCardProps {
  profile: UniversalUserProfile;
  compact?: boolean;
  onShare?: () => void;
}

const STATUS_COLORS: Record<MemberStatus, string> = {
  investigator: 'friend',
  new_convert: 'success',
  active: 'primary',
  less_active: 'neutral',
  returned: 'accent',
};

export function XtgProfileCard({ profile, compact = false, onShare }: XtgProfileCardProps): JSX.Element {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const statusLabel = t(`app.profileCard.status.${profile.memberStatus}`);

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(profile.xthegospelId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = async () => {
    if (onShare) {
      onShare();
      return;
    }

    // Try native share if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('app.profileCard.shareTitle'),
          text: t('app.profileCard.shareText', {
            displayName: profile.displayName,
            xtgId: profile.xthegospelId,
          }),
          url: `https://xthegospel.app/profile/${profile.xthegospelId}`,
        });
      } catch (error) {
        // User cancelled or error - fallback to copy
        handleCopyId();
      }
    } else {
      handleCopyId();
    }
  };

  const initials = profile.displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (compact) {
    return (
      <div className="xtg-card xtg-card--compact">
        {/* Avatar and Name Row */}
        <div className="xtg-card__compact-header">
          <div className="xtg-card__avatar-small">
            {profile.photoURL ? (
              <img src={profile.photoURL} alt={profile.displayName} />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div className="xtg-card__compact-info">
            <span className="xtg-card__name-compact">{profile.displayName}</span>
            <span className="xtg-card__badge-compact" data-status={STATUS_COLORS[profile.memberStatus]}>
              {statusLabel}
            </span>
          </div>
        </div>

        {/* ID Box */}
        <div className="xtg-card__compact-id">
          <span className="xtg-card__id-label-compact">{t('app.profileCard.myXtgId')}</span>
          <div className="xtg-card__id-row">
            <span className="xtg-card__id-compact">{profile.xthegospelId}</span>
            <button className="xtg-card__copy-btn" onClick={handleCopyId}>
              {copied ? <FaCheck /> : <FaCopy />}
            </button>
          </div>
        </div>

        {/* Share Button */}
        <button className="xtg-card__share-compact" onClick={handleShare}>
          <FaShareNodes />
          {t('app.profileCard.shareWithLeader')}
        </button>
      </div>
    );
  }

  return (
    <div className="xtg-card">
      {/* Header with gradient */}
      <div className="xtg-card__header">
        <div className="xtg-card__logo">xTheGospel</div>
        <div className="xtg-card__badge" data-status={STATUS_COLORS[profile.memberStatus]}>
          {statusLabel}
        </div>
      </div>

      {/* Avatar and name */}
      <div className="xtg-card__profile">
        <div className="xtg-card__avatar">
          {profile.photoURL ? (
            <img src={profile.photoURL} alt={profile.displayName} />
          ) : (
            <span className="xtg-card__initials">{initials}</span>
          )}
        </div>
        <h2 className="xtg-card__name">{profile.displayName}</h2>
        
        {/* Church unit if available */}
        {profile.unit && (
          <div className="xtg-card__unit">
            <FaChurch />
            <span>{profile.unit.wardName}, {profile.unit.stakeName}</span>
          </div>
        )}
      </div>

      {/* ID Section */}
      <div className="xtg-card__id-section">
        <span className="xtg-card__id-label">{t('app.profileCard.myXtgId')}</span>
        <div className="xtg-card__id-box">
          <span className="xtg-card__id">{profile.xthegospelId}</span>
          <button 
            className="xtg-card__id-copy" 
            onClick={handleCopyId}
            title={copied ? t('app.profileCard.copied') : t('app.profileCard.copyId')}
          >
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
        </div>
      </div>

      {/* Verification badge */}
      {profile.verifiedByLeader && (
        <div className="xtg-card__verified">
          <FaCheck /> {t('app.profileCard.verifiedByLeader')}
        </div>
      )}

      {/* Share button */}
      <button className="xtg-card__share-btn" onClick={handleShare}>
        <FaShareNodes />
        {t('app.profileCard.shareWithLeader')}
      </button>

      {/* Footer */}
      <div className="xtg-card__footer">
        <span>{t('app.profileCard.useThisId')}</span>
      </div>
    </div>
  );
}

export default XtgProfileCard;
