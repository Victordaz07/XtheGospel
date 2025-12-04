import { CommitmentType, CommitmentState, InvestigatorCommitment } from './investigatorCommitments';

export type SuggestedCommitmentId =
  | 'prayRestoration'
  | 'readBookOfMormon'
  | 'attendChurch'
  | 'prayMorningNight'
  | 'readScriptures'
  | 'keepCommandments';

export interface SuggestedCommitment {
  id: SuggestedCommitmentId;
  lessonId: string; // should match InvestigatorLesson.id
  type: CommitmentType;
  initialState: CommitmentState;
  textKey: string; // i18n key like "investigatorCommitments.samples.prayRestoration"
}

export const SUGGESTED_COMMITMENTS_BY_LESSON: Record<string, SuggestedCommitment[]> = {
  restoration: [
    {
      id: 'prayRestoration',
      lessonId: 'restoration',
      type: 'spiritual',
      initialState: 'pending',
      textKey: 'investigatorCommitments.samples.prayRestoration'
    },
    {
      id: 'readBookOfMormon',
      lessonId: 'restoration',
      type: 'study',
      initialState: 'pending',
      textKey: 'investigatorCommitments.samples.readBookOfMormon'
    },
    {
      id: 'attendChurch',
      lessonId: 'restoration',
      type: 'attendance',
      initialState: 'pending',
      textKey: 'investigatorCommitments.samples.attendChurch'
    }
  ],
  gospelOfChrist: [
    {
      id: 'prayMorningNight',
      lessonId: 'gospelOfChrist',
      type: 'spiritual',
      initialState: 'pending',
      textKey: 'investigatorCommitments.samples.prayMorningNight'
    },
    {
      id: 'readScriptures',
      lessonId: 'gospelOfChrist',
      type: 'study',
      initialState: 'pending',
      textKey: 'investigatorCommitments.samples.readScriptures'
    }
  ],
  commandments: [
    {
      id: 'keepCommandments',
      lessonId: 'commandments',
      type: 'spiritual',
      initialState: 'pending',
      textKey: 'investigatorCommitments.samples.keepCommandments'
    }
  ],
  planOfSalvation: [
    {
      id: 'attendChurch',
      lessonId: 'planOfSalvation',
      type: 'attendance',
      initialState: 'pending',
      textKey: 'investigatorCommitments.samples.attendChurch'
    }
  ]
};

/**
 * Get suggested commitments for a completed lesson
 */
export function getSuggestedCommitmentsForLesson(lessonId: string): SuggestedCommitment[] {
  return SUGGESTED_COMMITMENTS_BY_LESSON[lessonId] || [];
}

/**
 * Create commitment objects from suggested commitments for a lesson
 * Filters out commitments that already exist (by text content)
 */
export function createCommitmentsFromLesson(
  lessonId: string,
  existingCommitments: InvestigatorCommitment[],
  translate: (key: string) => string
): InvestigatorCommitment[] {
  const suggested = SUGGESTED_COMMITMENTS_BY_LESSON[lessonId] ?? [];
  const now = new Date().toISOString();
  
  // Check which commitments already exist for this lesson
  const alreadyExistingKeys = new Set(
    existingCommitments
      .filter(c => c.lessonId === lessonId)
      .map(c => {
        // If text is an i18n key, translate it for comparison
        if (c.text.startsWith('investigatorCommitments.samples.')) {
          return translate(c.text);
        }
        return c.text;
      })
  );

  return suggested
    .filter(s => {
      const translatedText = translate(s.textKey);
      return !alreadyExistingKeys.has(translatedText);
    })
    .map<InvestigatorCommitment>(s => ({
      id: (typeof crypto !== 'undefined' && crypto.randomUUID)
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: s.textKey, // Store the key, UI will translate
      type: s.type,
      state: s.initialState,
      createdAt: now,
      lessonId: s.lessonId
    }));
}

