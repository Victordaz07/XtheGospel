import React from 'react';
import { useJourneyStage } from '../../core/journey/useJourneyStore';
import InvestigatorProgressPage from '../../modules/investigator/pages/InvestigatorProgressPage';
import NewMemberProgressPage from '../../modules/new-member/pages/NewMemberProgressPage';

/**
 * Progress Entry Page
 * Shows different progress views based on journey stage
 */
export default function ProgressEntryPage(): JSX.Element {
  const stage = useJourneyStage();

  if (stage === 'covenanted') {
    return <NewMemberProgressPage />;
  }

  // Default: seeking
  return <InvestigatorProgressPage />;
}
