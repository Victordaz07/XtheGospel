export type LessonId =
  | 'lesson_1_restoration'
  | 'lesson_2_plan_of_salvation'
  | 'lesson_3_gospel_of_jesus_christ'
  | 'lesson_4_commandments'
  | 'lesson_5_ordinances_and_covenants'
  | 'lesson_6_laws_and_ordinances';

export interface MissionaryLessonConfig {
  id: LessonId;
  order: number;
  titleKey: string;
  tagKey: string;
  durationKey: string;
  screenName: string; // Para navegación
}

export const missionaryLessons: MissionaryLessonConfig[] = [
  {
    id: 'lesson_1_restoration',
    order: 1,
    titleKey: 'lesson1.title',
    tagKey: 'lesson1.tag',
    durationKey: 'lesson1.duration',
    screenName: 'Lesson1'
  },
  {
    id: 'lesson_2_plan_of_salvation',
    order: 2,
    titleKey: 'lesson2.title',
    tagKey: 'lesson2.tag',
    durationKey: 'lesson2.duration',
    screenName: 'Lesson2'
  },
  {
    id: 'lesson_3_gospel_of_jesus_christ',
    order: 3,
    titleKey: 'lesson3.title',
    tagKey: 'lesson3.tag',
    durationKey: 'lesson3.duration',
    screenName: 'Lesson3'
  },
  {
    id: 'lesson_4_commandments',
    order: 4,
    titleKey: 'lesson4.title',
    tagKey: 'lesson4.tag',
    durationKey: 'lesson4.duration',
    screenName: 'Lesson4'
  },
  {
    id: 'lesson_5_ordinances_and_covenants',
    order: 5,
    titleKey: 'lesson5.title',
    tagKey: 'lesson5.tag',
    durationKey: 'lesson5.duration',
    screenName: 'Lesson5'
  },
  {
    id: 'lesson_6_laws_and_ordinances',
    order: 6,
    titleKey: 'lesson6.title',
    tagKey: 'lesson6.tag',
    durationKey: 'lesson6.duration',
    screenName: 'Lesson6'
  }
];

