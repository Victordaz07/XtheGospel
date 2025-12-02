import React from 'react';
import { XtgPage } from '../../../components/layout/XtgPage';
import { XtgCard } from '../../../components/ui/XtgCard';
import { useI18n } from '../../../context/I18nContext';

export function LeadershipCenterPage() {
  const { t } = useI18n();

  return (
    <XtgPage
      title={t('leadership.center.title') || "Leadership Center"}
      subtitle={t('leadership.center.subtitle') || "View agendas, messages, and key events shared by your mission leaders."}
      badge="Leadership Feed"
    >
      <div className="xtg-section xtg-grid-2">
        <XtgCard title={t('leadership.center.upcomingCouncils') || "Upcoming Councils & Meetings"}>
          <p className="xtg-text-muted">
            {t('leadership.center.upcomingCouncilsDesc') || "See district, zone, or mission-wide councils that you have been invited to attend."}
          </p>
        </XtgCard>

        <XtgCard title={t('leadership.center.latestMessages') || "Latest Leadership Messages"}>
          <p className="xtg-text-muted">
            {t('leadership.center.latestMessagesDesc') || "Read spiritual invitations, priorities, and updates from your leaders."}
          </p>
        </XtgCard>
      </div>

      <div className="xtg-section">
        <XtgCard title={t('leadership.center.fullActivityFeed') || "Full Activity Feed"}>
          <p className="xtg-text-muted">
            {t('leadership.center.fullActivityFeedDesc') || "Browse the historical feed of leadership events that apply to your area, zone, or mission."}
          </p>
          {/* aquí tu lista/tabla de eventos */}
        </XtgCard>
      </div>
    </XtgPage>
  );
}

