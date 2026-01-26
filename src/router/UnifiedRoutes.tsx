import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import UnifiedLayout from '../layouts/UnifiedLayout';
import {
  HomeEntryPage,
  LessonsEntryPage,
  LessonDetailEntryPage,
  JournalEntryPage,
  ProgressEntryPage,
  ProfileEntryPage,
} from '../pages/entry';

/**
 * Unified Routes
 * Same 5 tabs, content switches based on journey stage.
 * 
 * Mounted at: /home/*, /lessons/*, /journal/*, /progress/*, /profile/*
 * Uses relative routing to render the appropriate page based on the parent path.
 */
export default function UnifiedRoutes(): JSX.Element {
  const location = useLocation();
  
  // Determine which page to render based on the current path
  const getPageForPath = (): JSX.Element => {
    const path = location.pathname;
    
    if (path.startsWith('/lessons/') && path !== '/lessons/') {
      // Lesson detail: /lessons/:lessonId
      const lessonId = path.split('/lessons/')[1]?.split('/')[0];
      return <LessonDetailEntryPage key={lessonId} />;
    }
    if (path.startsWith('/lessons')) return <LessonsEntryPage />;
    if (path.startsWith('/journal')) return <JournalEntryPage />;
    if (path.startsWith('/progress')) return <ProgressEntryPage />;
    if (path.startsWith('/profile')) return <ProfileEntryPage />;
    if (path.startsWith('/home') || path === '/') return <HomeEntryPage />;
    
    // Default to home
    return <HomeEntryPage />;
  };

  return (
    <UnifiedLayout>
      {getPageForPath()}
    </UnifiedLayout>
  );
}
