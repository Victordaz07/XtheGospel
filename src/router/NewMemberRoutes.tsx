import { Routes, Route, Navigate } from 'react-router-dom';

import NewMemberLayout from '@/modules/new-member/layout/NewMemberLayout';
import NewMemberHomePage from '@/modules/new-member/pages/NewMemberHomePage';
import NewMemberGuidePage from '@/modules/new-member/pages/NewMemberGuidePage';
import NewMemberProgressPage from '@/modules/new-member/pages/NewMemberProgressPage';
import NewMemberProfilePage from '@/modules/new-member/pages/NewMemberProfilePage';

export default function NewMemberRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<NewMemberLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<NewMemberHomePage />} />
        <Route path="guide" element={<NewMemberGuidePage />} />
        <Route path="progress" element={<NewMemberProgressPage />} />
        <Route path="profile" element={<NewMemberProfilePage />} />
      </Route>
    </Routes>
  );
}
