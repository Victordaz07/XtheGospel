import { useCallback, useEffect, useMemo, useState } from 'react';
import type { NewConvertSection } from '../member/data/memberTypes';
import { StorageService } from '../utils/storage';

type ProgressState = {
  completedSections: string[];
};

const buildKey = (userId: string | null | undefined, lang: string) => `newConvertProgress:${userId || 'anon'}:${lang}`;

const parseState = (raw: string | null): ProgressState => {
  if (!raw) {
    return { completedSections: [] };
  }

  try {
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      completedSections: Array.isArray(parsed.completedSections) ? parsed.completedSections : [],
    };
  } catch {
    return { completedSections: [] };
  }
};

export const useNewConvertProgress = (
  sections: NewConvertSection[],
  userId: string | null | undefined,
  lang: string,
) => {
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  // Load state when lang/user changes
  useEffect(() => {
    const key = buildKey(userId, lang);
    const state = parseState(StorageService.getItem(key));
    setCompletedSections(state.completedSections);
  }, [userId, lang]);

  // Trim ids that no longer exist if sections change
  useEffect(() => {
    setCompletedSections((prev) => prev.filter((id) => sections.some((section) => section.id === id)));
  }, [sections]);

  // Persist whenever it changes
  useEffect(() => {
    const key = buildKey(userId, lang);
    const payload: ProgressState = { completedSections };
    StorageService.setItem(key, JSON.stringify(payload));
  }, [completedSections, userId, lang]);

  const isCompleted = useCallback(
    (sectionId: string) => completedSections.includes(sectionId),
    [completedSections],
  );

  const toggleSection = useCallback((sectionId: string) => {
    setCompletedSections((prev) => {
      if (prev.includes(sectionId)) {
        return prev.filter((id) => id !== sectionId);
      }
      return [...prev, sectionId];
    });
  }, []);

  const progress = useMemo(() => {
    if (sections.length === 0) {
      return 0;
    }
    const completedCount = completedSections.filter((id) => sections.some((section) => section.id === id)).length;
    return completedCount / sections.length;
  }, [completedSections, sections]);

  return {
    completedSections,
    isCompleted,
    toggleSection,
    progress,
  };
};


