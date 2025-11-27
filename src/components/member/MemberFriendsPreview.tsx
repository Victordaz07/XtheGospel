import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { MemberFriendsService } from '../../services/memberFriendsService';
import './MemberComponents.css';

/**
 * Friends preview component
 * Shows explanation and a button to open the full friends list
 */
export const MemberFriendsPreview: React.FC = () => {
  const { t } = useI18n();
  const friends = MemberFriendsService.getFriends();
  const friendsCount = friends.length;

  return (
    <div className="member-friends-preview profile-card">
      <h2>{t('member.friends.title')}</h2>
      <p>{t('member.friends.description')}</p>
      <p className="friends-explanation">{t('member.friends.explanation')}</p>
      {friendsCount > 0 && (
        <p className="friends-count">
          {t('member.ui.actions')}: {friendsCount} {friendsCount === 1 ? 'amigo' : 'amigos'}
        </p>
      )}
      <Link to="/member/friends" className="btn-primary">
        {t('member.home.cards.friends.cta')}
      </Link>
    </div>
  );
};

