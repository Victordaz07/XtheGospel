import { Routes, Route, Navigate } from 'react-router-dom';

import InvestigatorLayout from '@/modules/investigator/layout/InvestigatorLayout';
import InvestigatorHomePage from '@/modules/investigator/pages/InvestigatorHomePage';
import InvestigatorLessonsPage from '@/modules/investigator/pages/InvestigatorLessonsPage';
import InvestigatorLessonDetailPage from '@/modules/investigator/pages/InvestigatorLessonDetailPage';
import InvestigatorJournalPage from '@/modules/investigator/pages/InvestigatorJournalPage';
import InvestigatorProgressPage from '@/modules/investigator/pages/InvestigatorProgressPage';
import InvestigatorProfilePage from '@/modules/investigator/pages/InvestigatorProfilePage';

export default function InvestigatorRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<InvestigatorLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<InvestigatorHomePage />} />
        <Route path="lessons" element={<InvestigatorLessonsPage />} />
        <Route path="lessons/:lessonId" element={<InvestigatorLessonDetailPage />} />
        <Route path="journal" element={<InvestigatorJournalPage />} />
        <Route path="progress" element={<InvestigatorProgressPage />} />
        <Route path="profile" element={<InvestigatorProfilePage />} />
      </Route>
    </Routes>
  );
}
