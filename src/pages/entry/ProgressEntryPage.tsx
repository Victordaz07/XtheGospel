import React from 'react';
import { useLocation } from 'react-router-dom';
import { useJourneyStage } from '../../core/journey/useJourneyStore';
import BaptismPreparationScreen from '../../modules/investigator/pages/BaptismPreparationScreen';
import InvestigatorProgressPage from '../../modules/investigator/pages/InvestigatorProgressPage';
import NewMemberProgressPage from '../../modules/new-member/pages/NewMemberProgressPage';

/**
 * Progress Entry Page
 * Shows different progress views based on journey stage
 * /progress + seeking → BaptismPreparationScreen
 * /progress/baptism-preparation → BaptismPreparationScreen (alias)
 */
export default function ProgressEntryPage(): JSX.Element {
  const location = useLocation();
  const stage = useJourneyStage();
  const path = location.pathname;

  if (path === '/progress/baptism-preparation') return <BaptismPreparationScreen />;
  if (path === '/progress' && stage === 'seeking') return <BaptismPreparationScreen />;
  if (stage === 'covenanted') return <NewMemberProgressPage />;

  return <InvestigatorProgressPage />;
}
