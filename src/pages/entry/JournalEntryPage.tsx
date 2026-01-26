import React from 'react';
import InvestigatorJournalPage from '../../modules/investigator/pages/InvestigatorJournalPage';

/**
 * Journal Entry Page
 * Reuses the same journal for all stages (continuous experience)
 */
export default function JournalEntryPage(): JSX.Element {
  // Journal is shared across stages - continuous experience
  return <InvestigatorJournalPage />;
}
