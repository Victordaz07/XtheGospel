import { useLocation } from 'react-router-dom';

import UnifiedLayout from '../layouts/UnifiedLayout';
import {
  HomeEntryPage,
  LessonsEntryPage,
  LessonDetailEntryPage,
  JournalEntryPage,
  ProgressEntryPage,
  ProfileEntryPage,
} from '../pages/entry';
import TrainingDashboard from '../modules/training/pages/TrainingDashboard';
import TrainingPathScreen from '../modules/training/pages/TrainingPathScreen';
import LessonPlaceholderScreen from '../modules/training/pages/LessonPlaceholderScreen';

/**
 * Unified Routes
 * Same 5 tabs + training, content switches based on journey stage.
 *
 * Mounted at: /home/*, /lessons/*, /journal/*, /progress/*, /profile/*, /training/*
 */
export default function UnifiedRoutes(): JSX.Element {
  const location = useLocation();

  const getPageForPath = (): JSX.Element => {
    const path = location.pathname;

    if (path.startsWith('/training/')) {
      const parts = path.replace(/^\/training\/?/, '').split('/').filter(Boolean);
      if (parts.length >= 2) {
        return <LessonPlaceholderScreen key={path} />;
      }
      if (parts.length === 1) {
        return <TrainingPathScreen key={path} />;
      }
    }
    if (path.startsWith('/training')) return <TrainingDashboard />;

    if (path.startsWith('/lessons/') && path !== '/lessons/') {
      const lessonId = path.split('/lessons/')[1]?.split('/')[0];
      return <LessonDetailEntryPage key={lessonId} />;
    }
    if (path.startsWith('/lessons')) return <LessonsEntryPage />;
    if (path.startsWith('/journal')) return <JournalEntryPage />;
    if (path.startsWith('/progress')) return <ProgressEntryPage />;
    if (path.startsWith('/profile')) return <ProfileEntryPage />;
    if (path.startsWith('/home') || path === '/') return <HomeEntryPage />;

    return <HomeEntryPage />;
  };

  return <UnifiedLayout>{getPageForPath()}</UnifiedLayout>;
}
