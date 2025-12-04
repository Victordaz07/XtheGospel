import { InvestigatorCommitment } from '../data/investigatorCommitments';

/**
 * Pick a commitment to suggest for today
 * Prefers commitments already marked as "today", otherwise picks the oldest pending
 */
export function pickCommitmentForToday(
  commitments: InvestigatorCommitment[]
): InvestigatorCommitment | null {
  if (!commitments.length) return null;

  // Prefer ones already marked as "today"
  const today = commitments.find(c => c.state === 'today');
  if (today) return today;

  // Otherwise pick the oldest "pending"
  const pending = commitments
    .filter(c => c.state === 'pending')
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  return pending[0] ?? null;
}

/**
 * Get the oldest pending commitment to suggest for today
 * @deprecated Use pickCommitmentForToday instead
 */
export function getCommitmentForToday(
  commitments: InvestigatorCommitment[]
): InvestigatorCommitment | null {
  return pickCommitmentForToday(commitments);
}

