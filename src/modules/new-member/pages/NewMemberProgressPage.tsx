import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaPenToSquare } from 'react-icons/fa6';
import { useSpiritualMemoryStore, useHasJournalActivity } from '../../../core/memory/useSpiritualMemoryStore';
import { useInvestigatorStore } from '../../investigator/store/useInvestigatorStore';
import { 
  usePastoralPhase, 
  getPastoralMessage,
  useIsReflectivePhase 
} from '../../../core/pastoral/usePastoralPhaseStore';
import './NewMemberProgressPage.css';

/**
 * New Member Progress Page
 * 
 * Sprint 8 – Spiritual Memory: gentle reflection messages
 * Sprint 12 – Pastoral Phase: adapts tone and silence based on phase
 * Sprint 13 – Understanding/Belonging: presence over activity, no performance
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * PASTORAL UX PRINCIPLES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This page is NOT about measuring progress.
 * It's about honoring presence and affirming the journey.
 * 
 * ❌ NO numeric metrics or percentages
 * ❌ NO "you've completed X of Y"
 * ❌ NO comparison language
 * ❌ NO achievement framing
 * ❌ NO performance evaluation (Sprint 13)
 * 
 * ✅ Language of presence ("you've been here")
 * ✅ Language of process ("your journey is unfolding")
 * ✅ More visual silence in 'stabilizing' phase
 * ✅ Fewer elements, more breathing room
 * ✅ Belonging affirmation in deeper phases (Sprint 13)
 * 
 * Phase behavior:
 *   - stabilizing/rhythm: Gentle acknowledgment of activity
 *   - understanding/belonging: Affirmation of presence, not doing
 * 
 * The user should feel: "I'm not being measured. I'm being seen."
 * ═══════════════════════════════════════════════════════════════════════════
 */
export default function NewMemberProgressPage(): JSX.Element {
  const { isHydrated, hydrate, lastLessonTitle } = useSpiritualMemoryStore();
  const { journalEntries } = useInvestigatorStore();
  const hasReflectionActivity = useHasJournalActivity();
  const phase = usePastoralPhase();
  const isReflective = useIsReflectivePhase();

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

  // Phase-aware subtitle
  const getSubtitle = () => {
    if (phase === 'belonging') {
      return "You don't need to prove anything here.";
    }
    if (phase === 'understanding') {
      return "This is not a checklist. It's a mirror.";
    }
    return "This is not a checklist. It's a quiet reflection of your presence.";
  };

  // Phase-aware footer message
  const getFooterMessage = () => {
    if (phase === 'belonging') {
      return getPastoralMessage('belongingAffirmation', phase);
    }
    if (phase === 'understanding') {
      return "Faith grows in community, not performance.";
    }
    return "You don't need to do anything right now.";
  };

  return (
    <div className={`nm-progress nm-progress--${phase}`}>
      {/* Header — Phase-aware language */}
      <header className="nm-progress__header">
        <h1 className="nm-progress__title">
          {getPastoralMessage('progressHeader', phase)}
        </h1>
        <p className="nm-progress__subtitle">
          {getSubtitle()}
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
                  {isReflective 
                    ? "You've been exploring" 
                    : "You've spent time with the guide"}
                </p>
              </div>
            )}
            {(hasReflectionActivity || hasJournalEntries) && (
              <div className="nm-progress__moment">
                <span className="nm-progress__moment-icon">✍️</span>
                <p className="nm-progress__moment-text">
                  {isReflective 
                    ? "You've been reflecting" 
                    : "You've taken time to reflect"}
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
            
            {/* In reflective phases, Journal is the primary suggestion */}
            {isReflective ? (
              <Link to="/journal" className="nm-progress__empty-action nm-progress__empty-action--journal">
                <FaPenToSquare /> A quiet space to write
              </Link>
            ) : (
              <Link to="/lessons" className="nm-progress__empty-action">
                <FaBookOpen /> When you're ready
              </Link>
            )}
          </div>
        )}
      </section>

      {/* 
        Belonging Affirmation (Sprint 13)
        
        In understanding/belonging phases, we add a gentle affirmation
        that reinforces belonging without any implication of performance.
      */}
      {isReflective && hasActivity && (
        <section className="nm-progress__belonging">
          <p className="nm-progress__belonging-text">
            {getPastoralMessage('belongingAffirmation', phase)}
          </p>
        </section>
      )}

      {/* Closing reflection */}
      <footer className="nm-progress__footer">
        <p className="nm-progress__footer-text">
          {getFooterMessage()}
        </p>
        {!isReflective && (
          <p className="nm-progress__footer-text nm-progress__footer-text--secondary">
            The Savior walks with you, always.
          </p>
        )}
      </footer>
    </div>
  );
}
