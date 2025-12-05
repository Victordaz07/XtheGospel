import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LeadershipDashboardScreen from '../features/memberLeadership/LeadershipDashboardScreen';
import LeadershipKPIsScreen from '../features/memberLeadership/LeadershipKPIsScreen';
import LeadershipInvestigatorsScreen from '../features/memberLeadership/LeadershipInvestigatorsScreen';
import LeadershipNewConvertsScreen from '../features/memberLeadership/LeadershipNewConvertsScreen';
import LeadershipMissionaryReportScreen from '../features/memberLeadership/LeadershipMissionaryReportScreen';
import LeadershipActivitiesScreen from '../features/memberLeadership/LeadershipActivitiesScreen';
import LeadershipActionPlanScreen from '../features/memberLeadership/LeadershipActionPlanScreen';
import LeadershipAlertsScreen from '../features/memberLeadership/LeadershipAlertsScreen';

/**
 * Navigator for Member Leadership 2.0 module
 * Only accessible to authorized members with leadership permissions
 */
export const MemberLeadershipNavigator: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LeadershipDashboardScreen />} />
      <Route path="/dashboard" element={<LeadershipDashboardScreen />} />
      <Route path="/kpis" element={<LeadershipKPIsScreen />} />
      <Route path="/investigators" element={<LeadershipInvestigatorsScreen />} />
      <Route path="/new-converts" element={<LeadershipNewConvertsScreen />} />
      <Route path="/missionary-report" element={<LeadershipMissionaryReportScreen />} />
      <Route path="/activities" element={<LeadershipActivitiesScreen />} />
      <Route path="/action-plan" element={<LeadershipActionPlanScreen />} />
      <Route path="/alerts" element={<LeadershipAlertsScreen />} />
      <Route path="*" element={<Navigate to="/member/leadership/dashboard" replace />} />
    </Routes>
  );
};

