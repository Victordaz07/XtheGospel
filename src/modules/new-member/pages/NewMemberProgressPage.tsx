import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa6';
import { useSpiritualMemoryStore, useHasJournalActivity } from '../../../core/memory/useSpiritualMemoryStore';
import { useInvestigatorStore } from '../../investigator/store/useInvestigatorStore';
import { usePastoralPhase, getPastoralMessage } from '../../../core/pastoral/usePastoralPhaseStore';
import './NewMemberProgressPage.css';

/**
 * New Member Progress Page
 * 
 * Sprint 8 – Spiritual Memory: gentle reflection messages
 * Sprint 12 – Pastoral Phase: adapts tone and silence based on phase
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * PASTORAL UX PRINCIPLES (Sprint 12)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This page is NOT about measuring progress.
 * It's about honoring presence and affirming the journey.
 * 
 * ❌ NO numeric metrics or percentages
 * ❌ NO "you've completed X of Y"
 * ❌ NO comparison language
 * ❌ NO achievement framing
 * 
 * ✅ Language of presence ("you've been here")
 * ✅ Language of process ("your journey is unfolding")
 * ✅ More visual silence in 'stabilizing' phase
 * ✅ Fewer elements, more breathing room
 * 
 * The user should feel: "I'm not being measured. I'm being seen."
 * ═══════════════════════════════════════════════════════════════════════════
 */
export default function NewMemberProgressPage(): JSX.Element {
  const { isHydrated, hydrate, lastLessonTitle } = useSpiritualMemoryStore();
  const { journalEntries } = useInvestigatorStore();
  const hasReflectionActivity = useHasJournalActivity();
  const phase = usePastoralPhase();

  // Hydrate memory on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrate();
    }
  }, [isHydrated, hydrate]);

  const hasJournalEntries = journalEntries.length > 0;
  const hasExploredGuide = isHydrated && lastLessonTitle;

  // Check if there's any activity to show
  const hasActivity = hasReflectionActivity || hasExploredGuide || hasJournalEntries;

  return (
    <div className={`nm-progress nm-progress--${phase}`}>
      {/* Header — Phase-aware language */}
      <header className="nm-progress__header">
        <h1 className="nm-progress__title">
          {getPastoralMessage('progressHeader', phase)}
        </h1>
        <p className="nm-progress__subtitle">
          This is not a checklist. It's a quiet reflection of your presence.
        </p>
      </header>

      {/* Recent Experiences */}
      <section className="nm-progress__experiences">
        {hasActivity ? (
          <div className="nm-progress__moments">
            {hasExploredGuide && (
              <div className="nm-progress__moment">
                <span className="nm-progress__moment-icon">📖</span>
                <p className="nm-progress__moment-text">
                  You've spent time with the guide
                </p>
              </div>
            )}
            {(hasReflectionActivity || hasJournalEntries) && (
              <div className="nm-progress__moment">
                <span className="nm-progress__moment-icon">✍️</span>
                <p className="nm-progress__moment-text">
                  You've taken time to reflect
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="nm-progress__empty">
            <p className="nm-progress__empty-text">
              {getPastoralMessage('progressEmpty', phase).split('\n')[0]}
            </p>
            <p className="nm-progress__empty-text nm-progress__empty-text--secondary">
              {getPastoralMessage('progressEmpty', phase).split('\n')[1]}
            </p>
            <Link to="/lessons" className="nm-progress__empty-action">
              <FaBookOpen /> When you're ready
            </Link>
          </div>
        )}
      </section>

      {/* 
        Sprint 12: Removed "Next gentle steps" section
        
        Rationale: Even "gentle steps" can feel like expectations.
        In 'stabilizing' phase especially, we want to remove
        any sense of "what you should do next."
        
        The footer provides enough reassurance.
      */}

      {/* Closing reflection */}
      <footer className="nm-progress__footer">
        <p className="nm-progress__footer-text">
          You don't need to do anything right now.
        </p>
        <p className="nm-progress__footer-text nm-progress__footer-text--secondary">
          The Savior walks with you, always.
        </p>
      </footer>
    </div>
  );
}
