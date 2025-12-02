import React from 'react';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import { useI18n } from '../../context/I18nContext';

export function InvestigatorHomePage() {
  const { t } = useI18n();

  return (
    <XtgPage
      title={t('investigator.home.title') || "Welcome to xTheGospel"}
      subtitle={t('investigator.home.subtitle') || "Your personal space to learn the gospel, record your experiences with God, and prepare for baptism."}
      badge="Investigator"
    >
      <div className="xtg-section xtg-grid-2">
        <XtgCard title={t('investigator.home.startLearning') || "Start Learning"}>
          <p className="xtg-text-muted">
            {t('investigator.home.startLearningDesc') || "Access structured gospel lessons designed to help you understand the doctrine of Christ step by step."}
          </p>
          {/* botones o links a lecciones */}
        </XtgCard>

        <XtgCard title={t('investigator.home.myStory') || "My Story with God"}>
          <p className="xtg-text-muted">
            {t('investigator.home.myStoryDesc') || "Record spiritual impressions, answers to prayers, and important moments in your journey with the Savior."}
          </p>
        </XtgCard>
      </div>

      <div className="xtg-section xtg-grid-3">
        <XtgCard title={t('investigator.home.baptismPrep') || "Baptism Preparation"}>
          <p className="xtg-text-muted">
            {t('investigator.home.baptismPrepDesc') || "Review your commitments, upcoming lessons, and your current preparation path toward baptism."}
          </p>
        </XtgCard>

        <XtgCard title={t('investigator.home.dailyDevotionals') || "Daily Devotionals"}>
          <p className="xtg-text-muted">
            {t('investigator.home.dailyDevotionalsDesc') || "Read daily messages with scriptures, quotes from Church leaders, and invitations to act."}
          </p>
        </XtgCard>

        <XtgCard title={t('investigator.home.difficultQuestions') || "Difficult Questions"}>
          <p className="xtg-text-muted">
            {t('investigator.home.difficultQuestionsDesc') || "Explore thoughtful, doctrinally sound answers to common questions investigators often have."}
          </p>
        </XtgCard>
      </div>
    </XtgPage>
  );
}

