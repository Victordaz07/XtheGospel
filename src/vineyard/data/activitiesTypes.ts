export type MemberActivityType =
  | 'QUIZ_SINGLE'
  | 'SCENARIO'
  | 'QUIZ_SCRIPTURE_MATCH'
  | 'CHARACTER_GUESS'
  | 'REAL_WORLD_MISSION'
  | 'READING_BLOCK';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface QuizSingleActivity {
  id: string;
  moduleId: string;
  type: 'QUIZ_SINGLE';
  title: string;
  shortDescription?: string;
  xp: number;
  levelRecommended: number;
  question: string;
  options: QuizOption[];
}

export interface ScenarioActivity {
  id: string;
  moduleId: string;
  type: 'SCENARIO';
  title: string;
  shortDescription?: string;
  xp: number;
  levelRecommended: number;
  scenario: string;
  options: QuizOption[];
}

export interface ScriptureMatchActivity {
  id: string;
  moduleId: string;
  type: 'QUIZ_SCRIPTURE_MATCH';
  title: string;
  shortDescription?: string;
  xp: number;
  levelRecommended: number;
  situation: string;
  scriptures: Array<{
    id: string;
    reference: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }>;
}

export interface CharacterGuessActivity {
  id: string;
  moduleId: string;
  type: 'CHARACTER_GUESS';
  title: string;
  shortDescription?: string;
  xp: number;
  levelRecommended: number;
  clues: string[];
  options: string[];
  correctName: string;
  explanation: string;
}

export interface RealWorldMissionActivity {
  id: string;
  moduleId: string;
  type: 'REAL_WORLD_MISSION';
  title: string;
  shortDescription?: string;
  xp: number;
  levelRecommended: number;
  description: string;
  instructions: string;
  reflectionPrompt?: string;
}

export interface ReadingBlockActivity {
  id: string;
  moduleId: string;
  type: 'READING_BLOCK';
  title: string;
  shortDescription?: string;
  xp: number;
  levelRecommended: number;
  content: string;
  reflectionQuestion?: string;
}

export type MemberActivity =
  | QuizSingleActivity
  | ScenarioActivity
  | ScriptureMatchActivity
  | CharacterGuessActivity
  | RealWorldMissionActivity
  | ReadingBlockActivity;
