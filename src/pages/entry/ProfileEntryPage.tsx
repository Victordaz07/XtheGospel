import React from 'react';
import { useJourneyStage } from '../../core/journey/useJourneyStore';
import InvestigatorProfilePage from '../../modules/investigator/pages/InvestigatorProfilePage';
import NewMemberProfilePage from '../../modules/new-member/pages/NewMemberProfilePage';

/**
 * Profile Entry Page
 * Shows different profile views based on journey stage
 * Both include ordinance dates section for continuity
 */
export default function ProfileEntryPage(): JSX.Element {
  const stage = useJourneyStage();

  if (stage === 'covenanted') {
    return <NewMemberProfilePage />;
  }

  // Default: seeking
  return <InvestigatorProfilePage />;
}
