import React from 'react';
import { MemberActivity } from '../data/activitiesTypes';
import { useI18n } from '../../context/I18nContext';
import './MemberActivityCard.css';

interface MemberActivityCardProps {
  activity: MemberActivity;
  onStart: () => void;
}

export const MemberActivityCard: React.FC<MemberActivityCardProps> = ({ activity, onStart }) => {
  const { t } = useI18n();

  const getTypeLabel = (type: MemberActivity['type']): string => {
    return t(`member.activityTypes.${type}`) || type;
  };

  const shortDescription = activity.shortDescription || '';

  return (
    <article className="member-activity-card">
      <span className="member-activity-card__tag">
        {getTypeLabel(activity.type).toUpperCase()}
      </span>
      <h3 className="member-activity-card__title">{activity.title}</h3>
      {shortDescription && (
        <p className="member-activity-card__description">{shortDescription}</p>
      )}
      <div className="member-activity-card__footer">
        <div className="member-activity-card__meta">
          <span className="member-activity-card__xp">{activity.xp} XP</span>
          <span className="member-activity-card__separator">•</span>
          <span className="member-activity-card__level">
            {t('member.activities.level') || 'Nivel'} {activity.levelRecommended}
          </span>
        </div>
        <button
          type="button"
          className="member-activity-card__button"
          onClick={onStart}
        >
          {t('member.activities.start') || 'Empezar'}
          <span aria-hidden>→</span>
        </button>
      </div>
    </article>
  );
};

