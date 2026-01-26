import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaPenToSquare } from 'react-icons/fa6';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { useSpiritualMemoryStore, useHasJournalActivity } from '../../../core/memory/useSpiritualMemoryStore';
import './InvestigatorProgressPage.css';

/**
 * Investigator Progress Page
 * Sprint 8 - Spiritual Memory: gentle reflection messages
 * 
 * "Progress is not measured; it is accompanied."
 */
export default function InvestigatorProgressPage(): JSX.Element {
  const { journalEntries, lastLessonId } = useInvestigatorStore();
  const { isHydrated, hydrate, lastLessonTitle } = useSpiritualMemoryStore();
  const hasReflectionActivity = useHasJournalActivity();
  
  // Hydrate memory on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrate();
    }
  }, [isHydrated, hydrate]);
  
  const hasJournalEntries = journalEntries.length > 0;
  const hasStartedLearning = lastLessonId !== null || (isHydrated && lastLessonTitle);

  return (
    <div className="inv-progress">
      {/* Header */}
      <header className="inv-progress__header">
        <h1 className="inv-progress__title">Your Journey</h1>
        <p className="inv-progress__subtitle">
          A quiet place to reflect on your spiritual path
        </p>
      </header>

      {/* Reflection Card */}
      <section className="inv-progress__reflection">
        <p className="inv-progress__reflection-text">
          Growth happens in small moments—a question that lingers, 
          a feeling of peace, a new understanding. This space is for you 
          to pause and notice how far you've come.
        </p>
      </section>

      {/* Recent Activity */}
      <section className="inv-progress__section">
        <h2 className="inv-progress__section-title">Recent moments</h2>
        
        {hasJournalEntries || hasStartedLearning || hasReflectionActivity ? (
          <div className="inv-progress__moments">
            {hasStartedLearning && (
              <div className="inv-progress__moment">
                <span className="inv-progress__moment-icon">📖</span>
                <p className="inv-progress__moment-text">
                  You've been exploring the gospel
                </p>
              </div>
            )}
            {hasReflectionActivity && (
              <div className="inv-progress__moment">
                <span className="inv-progress__moment-icon">✍️</span>
                <p className="inv-progress__moment-text">
                  You've taken time to reflect
                </p>
              </div>
            )}
            {hasJournalEntries && !hasReflectionActivity && (
              <div className="inv-progress__moment">
                <span className="inv-progress__moment-icon">📝</span>
                <p className="inv-progress__moment-text">
                  You've written reflections in your journal
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="inv-progress__empty">
            <p className="inv-progress__empty-text">
              Your journey is just beginning. Every step matters, 
              even the small ones.
            </p>
          </div>
        )}
      </section>

      {/* Gentle Next Steps */}
      <section className="inv-progress__section">
        <h2 className="inv-progress__section-title">Gentle invitations</h2>
        <p className="inv-progress__intro-text">
          When you feel ready, consider these next steps:
        </p>
        <div className="inv-progress__actions">
          <Link to="/lessons" className="inv-progress__action">
            <span className="inv-progress__action-icon">
              <FaBookOpen />
            </span>
            <div className="inv-progress__action-content">
              <h3 className="inv-progress__action-title">Explore a topic</h3>
              <p className="inv-progress__action-desc">
                Discover something new about the gospel
              </p>
            </div>
          </Link>
          <Link to="/journal" className="inv-progress__action">
            <span className="inv-progress__action-icon">
              <FaPenToSquare />
            </span>
            <div className="inv-progress__action-content">
              <h3 className="inv-progress__action-title">Write a reflection</h3>
              <p className="inv-progress__action-desc">
                Capture your thoughts and questions
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Closing */}
      <footer className="inv-progress__footer">
        <p className="inv-progress__footer-text">
          There's no finish line here—just a path walked with the Savior.
        </p>
      </footer>
    </div>
  );
}
