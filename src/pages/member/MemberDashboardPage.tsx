import React from 'react';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import { useI18n } from '../../context/I18nContext';

export function MemberDashboardPage() {
  const { t } = useI18n();

  return (
    <XtgPage
      title={t('member.dashboard.title') || "Member Dashboard"}
      subtitle={t('member.dashboard.subtitle') || "Strengthen your testimony and support investigators and new converts."}
      badge="Member"
    >
      <div className="xtg-section xtg-grid-2">
        <XtgCard title={t('member.dashboard.doctrinalStudy') || "Doctrinal Study"}>
          <p className="xtg-text-muted">
            {t('member.dashboard.doctrinalStudyDesc') || "Access structured study modules to deepen your understanding of the gospel."}
          </p>
        </XtgCard>

        <XtgCard title={t('member.dashboard.newConvertCare') || "New Convert Care"}>
          <p className="xtg-text-muted">
            {t('member.dashboard.newConvertCareDesc') || "Follow a step-by-step care guide to support recent converts in their first months in the Church."}
          </p>
        </XtgCard>
      </div>

      <div className="xtg-section xtg-grid-3">
        <XtgCard title={t('member.dashboard.friendsPraying') || "Friends You Are Praying For"}>
          <p className="xtg-text-muted">
            {t('member.dashboard.friendsPrayingDesc') || "Keep track of friends you are ministering to, praying for, or inviting to learn the gospel."}
          </p>
        </XtgCard>

        <XtgCard title={t('member.dashboard.missionarySupport') || "Missionary Support"}>
          <p className="xtg-text-muted">
            {t('member.dashboard.missionarySupportDesc') || "Discover practical ways to help full-time missionaries in your ward or branch."}
          </p>
        </XtgCard>

        <XtgCard title={t('member.dashboard.progressXP') || "Progress & XP"}>
          <p className="xtg-text-muted">
            {t('member.dashboard.progressXPDesc') || "See your learning streaks, XP, and achievements as you study and serve."}
          </p>
        </XtgCard>
      </div>
    </XtgPage>
  );
}

