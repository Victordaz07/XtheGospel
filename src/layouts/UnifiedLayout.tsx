import React from 'react';
import { useJourneyStage } from '../core/journey/useJourneyStore';
import { BottomNav } from '../ui/components';
import './UnifiedLayout.css';

interface UnifiedLayoutProps {
  children: React.ReactNode;
}

export default function UnifiedLayout({ children }: UnifiedLayoutProps): JSX.Element {
  const stage = useJourneyStage();

  return (
    <div className={`unified-layout unified-layout--${stage}`}>
      <div className="unified-layout-shell">
        <div className="unified-layout-deco unified-layout-deco-top" />
        <div className="unified-layout-deco unified-layout-deco-bottom" />
        
        <main className="unified-layout-content">
          {children}
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
