export type StudyReferenceType = 'scripture' | 'talk' | 'manual';

export interface StudyReference {
  type: StudyReferenceType;
  source: string;
  title?: string;
  quote?: string;
}

export interface StudySection {
  id: string;
  title: string;
  summary: string;
  content: string;
  references: StudyReference[];
  estimatedMinutes: number;
}

export interface StudyModule {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  levelRecommended: number;
  sections: StudySection[];
}

