/**
 * Leadership Callings Layout
 * 
 * Layout with bottom nav specific for Leadership mode:
 * Dashboard, Callings, Calendar, Profile
 * 
 * Uses the shared BottomNav component which is mode-aware.
 */

import React from 'react';
import { BottomNav } from '../ui/components';
import './LeadershipCallingsLayout.css';

interface LeadershipCallingsLayoutProps {
  children: React.ReactNode;
}

export default function LeadershipCallingsLayout({ children }: LeadershipCallingsLayoutProps): JSX.Element {
  return (
    <div className="leadership-callings-layout">
      <main className="leadership-callings-content">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
