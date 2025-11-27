import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface MemberBadge {
  id: string;
  name: string;
  description: string;
}

export interface MemberProgress {
  xp: number;
  level: number;
  completedActivityIds: string[];
  streakDays: number;
  lastActivityDate?: string;
  earnedBadges: MemberBadge[];
}

interface MemberProgressState {
  progress: MemberProgress;
  completedStudySectionIds: string[];
  addXP: (amount: number) => void;
  completeActivity: (activityId: string, xp: number) => { xpAwarded: boolean };
  markSectionStudied: (sectionId: string, xpReward?: number) => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'memberProgress_v1';
const SECTION_XP_REWARD = 5;

const computeLevelFromXp = (xp: number): number => {
  if (xp >= 1000) return 4;
  if (xp >= 500) return 3;
  if (xp >= 200) return 2;
  return 1;
};

const getTodayKey = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

const calculateStreak = (lastDate: string | undefined, currentStreak: number): { streak: number; lastDate: string } => {
  const todayKey = getTodayKey();

  if (!lastDate) {
    return { streak: 1, lastDate: todayKey };
  }

  if (lastDate === todayKey) {
    return { streak: currentStreak, lastDate };
  }

  const last = new Date(lastDate);
  const today = new Date(todayKey);
  const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return { streak: currentStreak + 1, lastDate: todayKey };
  }

  return { streak: 1, lastDate: todayKey };
};

const badgeCatalog: MemberBadge[] = [
  { id: 'primer-estudio', name: 'Primera Luz', description: 'Completaste tu primera sección de estudio.' },
  { id: 'companion-fiel', name: 'Compañero Fiel', description: 'Terminaste tres actividades interactivas.' },
  { id: 'disciplina-constante', name: 'Discípulo Constante', description: 'Mantén una racha de estudio de 5 días.' },
  { id: 'mentor-de-fe', name: 'Mentor de Fe', description: 'Alcanza el nivel 2.' },
  { id: 'faro-del-barrio', name: 'Faro del Barrio', description: 'Alcanza el nivel 3.' },
  { id: 'guardian-del-templo', name: 'Guardián del Templo', description: 'Completaste todas las secciones del módulo de nuevos conversos.' },
];

const evaluateBadges = (
  progress: MemberProgress,
  completedSections: string[],
  targetModuleSectionPrefix = 'cuidado-de-nuevos-conversos-y-preparacion-para-el-templo',
): MemberBadge[] => {
  const unlocked: MemberBadge[] = [];

  if (completedSections.length >= 1) {
    const badge = badgeCatalog.find((b) => b.id === 'primer-estudio');
    if (badge) unlocked.push(badge);
  }

  if (progress.completedActivityIds.length >= 3) {
    const badge = badgeCatalog.find((b) => b.id === 'companion-fiel');
    if (badge) unlocked.push(badge);
  }

  if (progress.streakDays >= 5) {
    const badge = badgeCatalog.find((b) => b.id === 'disciplina-constante');
    if (badge) unlocked.push(badge);
  }

  if (progress.level >= 2) {
    const badge = badgeCatalog.find((b) => b.id === 'mentor-de-fe');
    if (badge) unlocked.push(badge);
  }

  if (progress.level >= 3) {
    const badge = badgeCatalog.find((b) => b.id === 'faro-del-barrio');
    if (badge) unlocked.push(badge);
  }

  const careSections = completedSections.filter((id) => id.startsWith(targetModuleSectionPrefix));
  if (careSections.length >= 3) {
    const badge = badgeCatalog.find((b) => b.id === 'guardian-del-templo');
    if (badge) unlocked.push(badge);
  }

  const merged = [...progress.earnedBadges];
  unlocked.forEach((badge) => {
    if (!merged.some((existing) => existing.id === badge.id)) {
      merged.push(badge);
    }
  });

  return merged;
};

const createDefaultProgress = (): MemberProgress => ({
    xp: 0,
    level: 1,
    completedActivityIds: [],
    streakDays: 0,
    lastActivityDate: undefined,
    earnedBadges: [],
});

const createDefaultState = () => ({
  progress: createDefaultProgress(),
  completedStudySectionIds: [] as string[],
});

export const useMemberProgressStore = create<MemberProgressState>()(
  persist(
    (set, get) => ({
      ...createDefaultState(),
      addXP: (amount) => {
        if (amount <= 0) return;
        set((state) => {
          const updatedXP = state.progress.xp + amount;
          const { streak, lastDate } = calculateStreak(state.progress.lastActivityDate, state.progress.streakDays);
          const updatedProgress: MemberProgress = {
            ...state.progress,
            xp: updatedXP,
            level: computeLevelFromXp(updatedXP),
            streakDays: streak,
            lastActivityDate: lastDate,
          };

          updatedProgress.earnedBadges = evaluateBadges(updatedProgress, state.completedStudySectionIds);
          return { progress: updatedProgress };
        });
      },
      completeActivity: (activityId, xp) => {
        const { progress } = get();
        if (progress.completedActivityIds.includes(activityId)) {
          return { xpAwarded: false };
        }

        set((state) => {
          const updatedActivityIds = [...state.progress.completedActivityIds, activityId];
          const xpGain = xp > 0 ? xp : 0;
          const updatedXP = state.progress.xp + xpGain;
          const { streak, lastDate } = calculateStreak(state.progress.lastActivityDate, state.progress.streakDays);

          const updatedProgress: MemberProgress = {
            ...state.progress,
            completedActivityIds: updatedActivityIds,
            xp: updatedXP,
            level: computeLevelFromXp(updatedXP),
            streakDays: streak,
            lastActivityDate: lastDate,
          };

          updatedProgress.earnedBadges = evaluateBadges(updatedProgress, state.completedStudySectionIds);
          return { progress: updatedProgress };
        });

        return { xpAwarded: true };
      },
      markSectionStudied: (sectionId, xpReward = SECTION_XP_REWARD) => {
        if (!sectionId) return;

        set((state) => {
          if (state.completedStudySectionIds.includes(sectionId)) {
            return state;
          }

          const updatedSections = [...state.completedStudySectionIds, sectionId];
          const updatedXP = state.progress.xp + (xpReward > 0 ? xpReward : 0);
          const { streak, lastDate } = calculateStreak(state.progress.lastActivityDate, state.progress.streakDays);

          const updatedProgress: MemberProgress = {
            ...state.progress,
            xp: updatedXP,
            level: computeLevelFromXp(updatedXP),
            streakDays: streak,
            lastActivityDate: lastDate,
          };

          updatedProgress.earnedBadges = evaluateBadges(updatedProgress, updatedSections);

          return {
            progress: updatedProgress,
            completedStudySectionIds: updatedSections,
          };
        });
      },
      resetProgress: () => set(createDefaultState()),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        progress: state.progress,
        completedStudySectionIds: state.completedStudySectionIds,
      }),
    },
  ),
);

