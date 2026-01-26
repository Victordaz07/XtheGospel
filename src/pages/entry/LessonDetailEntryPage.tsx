import React from 'react';
import { useParams } from 'react-router-dom';
import { useJourneyStage } from '../../core/journey/useJourneyStore';
import InvestigatorLessonDetailPage from '../../modules/investigator/pages/InvestigatorLessonDetailPage';
import NewMemberGuideDetailPage from '../../modules/new-member/pages/NewMemberGuideDetailPage';

/**
 * Lesson Detail Entry Page
 * Sprint 5 - Stage-aware routing
 * 
 * - seeking: Shows Investigator lesson detail
 * - covenanted: Shows New Member guide detail
 */
export default function LessonDetailEntryPage(): JSX.Element {
  const stage = useJourneyStage();

  if (stage === 'covenanted') {
    return <NewMemberGuideDetailPage />;
  }

  // Default: seeking
  return <InvestigatorLessonDetailPage />;
}
