export type LessonState = "notStarted" | "inProgress" | "completed";

export interface InvestigatorLesson {
  id: string; // ID usado en el sistema (L1, L2, etc. o restoration, planOfSalvation, etc.)
  translationKey: string; // e.g. "investigatorLessons.lessons.restoration"
  order: number;
  lessonId?: string; // ID real de la lección en lessonsData (para compatibilidad)
}

// Mapeo de IDs de investigatorLessons a IDs reales de lecciones
const LESSON_ID_MAP: Record<string, string> = {
  restoration: "L1",
  planOfSalvation: "L2",
  gospelOfChrist: "L3",
  commandments: "L4",
  lawsAndOrdinances: "L5",
  followingChrist: "L6",
  joiningTheChurch: "L7"
};

export const INVESTIGATOR_LESSONS: InvestigatorLesson[] = [
  { id: "restoration", translationKey: "investigatorLessons.lessons.restoration", order: 1, lessonId: "L1" },
  { id: "planOfSalvation", translationKey: "investigatorLessons.lessons.planOfSalvation", order: 2, lessonId: "L2" },
  { id: "gospelOfChrist", translationKey: "investigatorLessons.lessons.gospelOfChrist", order: 3, lessonId: "L3" },
  { id: "commandments", translationKey: "investigatorLessons.lessons.commandments", order: 4, lessonId: "L4" },
  { id: "lawsAndOrdinances", translationKey: "investigatorLessons.lessons.lawsAndOrdinances", order: 5, lessonId: "L5" },
  { id: "followingChrist", translationKey: "investigatorLessons.lessons.followingChrist", order: 6, lessonId: "L6" },
  { id: "joiningTheChurch", translationKey: "investigatorLessons.lessons.joiningTheChurch", order: 7, lessonId: "L7" }
];

// Helper para obtener el ID real de la lección
export const getRealLessonId = (investigatorLessonId: string): string => {
  return LESSON_ID_MAP[investigatorLessonId] || investigatorLessonId;
};

