import React from 'react';
import { useJourneyStage } from '../../core/journey/useJourneyStore';
import InvestigatorLessonsPage from '../../modules/investigator/pages/InvestigatorLessonsPage';
import NewMemberGuidePage from '../../modules/new-member/pages/NewMemberGuidePage';

/**
 * Lessons Entry Page
 * - seeking: Shows Investigator lessons
 * - covenanted: Shows New Member guide (same "Lessons" tab label in nav)
 */
export default function LessonsEntryPage(): JSX.Element {
  const stage = useJourneyStage();

  if (stage === 'covenanted') {
    return <NewMemberGuidePage />;
  }

  // Default: seeking
  return <InvestigatorLessonsPage />;
}
