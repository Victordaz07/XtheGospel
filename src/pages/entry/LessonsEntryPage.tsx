import React from 'react';
import { useI18n } from '../../context/I18nContext';
import InvestigatorLessonsPage from '../../modules/investigator/pages/InvestigatorLessonsPage';
import NewMemberGuidePage from '../../modules/new-member/pages/NewMemberGuidePage';
import './LessonsEntryPage.css';

/**
 * Lessons Entry Page
 *
 * Camino Misional (5 lecciones) + Tu guía y biblioteca para todos los usuarios,
 * sin depender de la etapa del viaje (seeking / covenanted).
 */
export default function LessonsEntryPage(): JSX.Element {
  const { t } = useI18n();

  return (
    <div className="lessons-entry-combined">
      <InvestigatorLessonsPage />
      <section
        className="lessons-entry-combined__transition"
        aria-labelledby="lessons-entry-guide-heading"
      >
        <hr className="lessons-entry-combined__divider" aria-hidden />
        <div className="lessons-entry-combined__section-head">
          <p className="lessons-entry-combined__eyebrow">
            {t('app.lessons.entryAfterMissionaryPathEyebrow')}
          </p>
          <p id="lessons-entry-guide-heading" className="lessons-entry-combined__section-subtitle">
            {t('app.lessons.entryAfterMissionaryPathSubtitle')}
          </p>
        </div>
      </section>
      <NewMemberGuidePage />
    </div>
  );
}
