import React from 'react';
import { useJourneyStage } from '../../core/journey/useJourneyStore';
import InvestigatorHomePage from '../../modules/investigator/pages/InvestigatorHomePage';
import NewMemberHomePage from '../../modules/new-member/pages/NewMemberHomePage';

/**
 * Home Entry Page
 * Renders different home content based on journey stage
 */
export default function HomeEntryPage(): JSX.Element {
  const stage = useJourneyStage();

  if (stage === 'covenanted') {
    return <NewMemberHomePage />;
  }

  // Default: seeking
  return <InvestigatorHomePage />;
}
