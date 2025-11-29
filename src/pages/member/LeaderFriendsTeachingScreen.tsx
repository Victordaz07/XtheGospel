import React from 'react';
import { useI18n } from '../../context/I18nContext';
import { mockFriendsInTeaching } from '../../data/leaderFriendsTeaching';
import '../../pages/Page.css';
import './LeaderScreens.css';

export const LeaderFriendsTeachingScreen: React.FC = () => {
  const { t } = useI18n();

  const getStatusLabel = (status: string) => {
    return t(`memberLeader.friendsInTeaching.status.${status}`);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('memberLeader.friendsInTeaching.title')}</h1>
        <p className="page-subtitle">{t('memberLeader.friendsInTeaching.subtitle')}</p>
      </div>
      <div className="page-content">
        {mockFriendsInTeaching.map(friend => (
          <div key={friend.id} className="leader-friend-card">
            <div className="leader-friend-header">
              <h3>{friend.name}</h3>
              {friend.broughtBy && (
                <p className="leader-friend-brought">
                  {t('memberLeader.friendsInTeaching.broughtBy', { name: friend.broughtBy })}
                </p>
              )}
            </div>

            <div className="leader-friend-status">
              <span className="leader-status-badge">
                {friend.statusLabel}
              </span>
            </div>

            {friend.notes && (
              <div className="leader-friend-notes">
                <p>{friend.notes}</p>
              </div>
            )}

            <div className="leader-friend-actions">
              <button className="leader-button-small">
                {t('memberLeader.friendsInTeaching.actions.coordinateVisit')}
              </button>
              <button className="leader-button-small secondary">
                {t('memberLeader.friendsInTeaching.actions.prepareSunday')}
              </button>
              <button className="leader-button-small secondary">
                {t('memberLeader.friendsInTeaching.actions.inspiredQuestions')}
              </button>
            </div>

            <div className="leader-sunday-suggestions">
              <h4>{t('memberLeader.friendsInTeaching.sundaySuggestions.title')}</h4>
              <ul>
                {[0, 1, 2].map(idx => {
                  const item = t(`memberLeader.friendsInTeaching.sundaySuggestions.items.${idx}`);
                  if (item === `memberLeader.friendsInTeaching.sundaySuggestions.items.${idx}`) return null;
                  return <li key={idx}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

