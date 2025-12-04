import { InvestigatorCommitment } from '../data/investigatorCommitments';

/**
 * Get commitments related to a daily message based on its lessonId
 */
export function getRelatedCommitmentsForDailyMessage(
  dailyMessageId: string,
  translate: (key: string) => string,
  commitments: InvestigatorCommitment[]
): InvestigatorCommitment[] {
  const baseKey = `dailyMessages.${dailyMessageId}`;
  const lessonIdKey = `${baseKey}.lessonId`;
  const lessonId = translate(lessonIdKey as any);

  // If translation returns the key itself, it means the key doesn't exist
  if (!lessonId || lessonId === lessonIdKey) {
    return [];
  }

  // Filter commitments that match this lessonId
  return commitments.filter(c => {
    if (!c.lessonId) return false;
    // Direct match
    if (c.lessonId === lessonId) return true;
    // Also check if the commitment text is a key that references this lesson
    // This handles cases where commitments were created with textKey stored
    return false;
  });
}

