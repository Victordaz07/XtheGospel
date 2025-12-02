import React from 'react';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import { useI18n } from '../../context/I18nContext';

export function MissionaryDashboardPage() {
  const { t } = useI18n();

  return (
    <XtgPage
      title={t('missionary.dashboard.title') || "Missionary Dashboard"}
      subtitle={t('missionary.dashboard.subtitle') || "Plan your day, follow up with investigators, and coordinate with your companion."}
      badge="Missionary"
    >
      <div className="xtg-section xtg-grid-2">
        <XtgCard title={t('missionary.dashboard.todaysAgenda') || "Today's Agenda"}>
          <p className="xtg-text-muted">
            {t('missionary.dashboard.todaysAgendaDesc') || "View your appointments, lessons, and key commitments for today."}
          </p>
          {/* listado / tabla de citas */}
        </XtgCard>

        <XtgCard title={t('missionary.dashboard.peopleTeaching') || "People You Are Teaching"}>
          <p className="xtg-text-muted">
            {t('missionary.dashboard.peopleTeachingDesc') || "Quick access to investigators, members, and friends you are currently teaching or visiting."}
          </p>
        </XtgCard>
      </div>

      <div className="xtg-section xtg-grid-3">
        <XtgCard title={t('missionary.dashboard.commitments') || "Commitments Follow-up"}>
          <p className="xtg-text-muted">
            {t('missionary.dashboard.commitmentsDesc') || "See which investigators have commitments pending and who may need a loving follow-up."}
          </p>
        </XtgCard>

        <XtgCard title={t('missionary.dashboard.leadershipMessages') || "Leadership Messages"}>
          <p className="xtg-text-muted">
            {t('missionary.dashboard.leadershipMessagesDesc') || "Read the latest messages, agendas, and focus points from your district and zone leaders."}
          </p>
        </XtgCard>

        <XtgCard title={t('missionary.dashboard.studyResources') || "Study & Resources"}>
          <p className="xtg-text-muted">
            {t('missionary.dashboard.studyResourcesDesc') || "Access study aids, lesson outlines, and practice scenarios to teach with power."}
          </p>
        </XtgCard>
      </div>
    </XtgPage>
  );
}

