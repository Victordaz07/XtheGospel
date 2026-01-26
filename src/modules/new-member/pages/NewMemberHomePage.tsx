import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';
import { useSpiritualMemoryStore } from '../../../core/memory/useSpiritualMemoryStore';
import { usePastoralPhase, getPastoralMessage } from '../../../core/pastoral/usePastoralPhaseStore';
import './NewMemberHomePage.css';

// Static first suggestion (canonical first topic for new members)
const FIRST_TOPIC = {
  id: 'sacrament-meeting',
  title: 'Sacrament Meeting',
};

/**
 * New Member Home Page
 * 
 * Sprint 8 - Spiritual Memory: shows Continue card when available
 * Sprint 12 - Pastoral Phase: adapts tone based on internal phase
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * PASTORAL UX PRINCIPLES (Sprint 12)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This page is designed to REDUCE ANXIETY, not create engagement.
 * 
 * ❌ NO urgency language ("Don't miss", "Keep up", "You're behind")
 * ❌ NO streak mechanics or daily goals
 * ❌ NO comparison to others
 * ❌ NO guilt-inducing copy
 * 
 * ✅ Permission-based language ("When you're ready", "There's no rush")
 * ✅ Calmer visual density (fewer cards, more breathing room)
 * ✅ Reassurance over instruction
 * ✅ Grace over achievement
 * 
 * The user should feel: "This doesn't demand anything from me...
 * but I want to come back."
 * ═══════════════════════════════════════════════════════════════════════════
 */
export default function NewMemberHomePage(): JSX.Element {
  const { lastLessonId, lastLessonTitle, isHydrated, hydrate } = useSpiritualMemoryStore();
  const phase = usePastoralPhase();

  // Hydrate memory on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrate();
    }
  }, [isHydrated, hydrate]);

  // Determine what to show for continue/start
  const hasContinue = isHydrated && lastLessonId && lastLessonTitle;
  const continueId = hasContinue ? lastLessonId : FIRST_TOPIC.id;
  const continueTitle = hasContinue ? lastLessonTitle : FIRST_TOPIC.title;
  
  // Phase-aware labels (no urgency)
  const continueLabel = getPastoralMessage('continueStudy', phase);

  return (
    <div className={`nm-home nm-home--${phase}`}>
      {/* Welcome Card — Primary message of permission */}
      <div className="nm-home__welcome">
        <p className="nm-home__welcome-greeting">Welcome</p>
        <h1 className="nm-home__welcome-title">
          {getPastoralMessage('homeWelcome', phase).split('\n')[0]}
        </h1>
        <p className="nm-home__welcome-subtitle">
          {getPastoralMessage('homeWelcome', phase).split('\n')[1]}
        </p>
      </div>

      {/* Continue Card — Gentle, not urgent */}
      <div className="nm-home__continue">
        <p className="nm-home__continue-label">{continueLabel}</p>
        <Link to={`/lessons/${continueId}`} className="nm-home__continue-card">
          <div className="nm-home__continue-content">
            <h3 className="nm-home__continue-title">{continueTitle}</h3>
          </div>
          <FaChevronRight className="nm-home__continue-arrow" />
        </Link>
      </div>

      {/* 
        Sprint 12: Removed Quick Actions section
        
        Rationale: Fewer cards = less visual pressure.
        The user can still access Guide and Journal from the bottom nav.
        We don't need to present "things to do" on the home screen.
        
        This is intentional reduction, not missing content.
      */}

      {/* Encouragement — Closing reassurance */}
      <div className="nm-home__encouragement">
        <p className="nm-home__encouragement-text">
          {getPastoralMessage('encouragement', phase).split('\n')[0]}
        </p>
        <p className="nm-home__encouragement-text nm-home__encouragement-text--secondary">
          {getPastoralMessage('encouragement', phase).split('\n')[1]}
        </p>
      </div>
    </div>
  );
}
