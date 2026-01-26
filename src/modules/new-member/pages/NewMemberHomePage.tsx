import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaPenToSquare } from 'react-icons/fa6';
import { useSpiritualMemoryStore } from '../../../core/memory/useSpiritualMemoryStore';
import { 
  usePastoralPhase, 
  getPastoralMessage, 
  isHomeContentQuestion,
  isHomeMinimal,
  useIsReflectivePhase,
  useIsWithdrawalPhase,
  useIsAbidingPhase
} from '../../../core/pastoral/usePastoralPhaseStore';
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
 * Sprint 13 - Understanding/Belonging: questions over statements, Journal priority
 * Sprint 14 - Integration/Abiding: intentional withdrawal, minimal presence
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * PASTORAL UX PRINCIPLES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This page is designed to REDUCE ANXIETY, not create engagement.
 * 
 * ❌ NO urgency language ("Don't miss", "Keep up", "You're behind")
 * ❌ NO streak mechanics or daily goals
 * ❌ NO comparison to others
 * ❌ NO guilt-inducing copy
 * ❌ NO tasks or assignments
 * 
 * ✅ Permission-based language ("When you're ready", "There's no rush")
 * ✅ Calmer visual density (fewer cards, more breathing room)
 * ✅ Reassurance over instruction
 * ✅ Grace over achievement
 * ✅ Questions over statements in deeper phases
 * ✅ Journal as central invitation, not obligation
 * ✅ Intentional withdrawal in final phases (Sprint 14)
 * 
 * Phase behavior:
 *   - stabilizing/rhythm: Declarative messages of reassurance
 *   - understanding/belonging: Open-ended questions that invite reflection
 *   - integration/abiding: Minimal presence, the app steps back
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * SPRINT 14: INTENTIONAL WITHDRAWAL
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * In 'integration' and 'abiding' phases, this page becomes deliberately
 * sparse. This is NOT missing content — it is a design decision.
 * 
 * The app learns to step back without disappearing.
 * The user should feel: "I don't need this app... but it's here."
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */
export default function NewMemberHomePage(): JSX.Element {
  const { lastLessonId, lastLessonTitle, isHydrated, hydrate } = useSpiritualMemoryStore();
  const phase = usePastoralPhase();
  const isReflective = useIsReflectivePhase();
  const isWithdrawal = useIsWithdrawalPhase();
  const isAbiding = useIsAbidingPhase();
  const isQuestion = isHomeContentQuestion(phase);
  const isMinimal = isHomeMinimal(phase);

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
  
  // Phase-aware content
  const continueLabel = getPastoralMessage('continueStudy', phase);
  const homeContent = getPastoralMessage('homeWelcome', phase);
  const journalInvite = getPastoralMessage('journalInvite', phase);
  const encouragement = getPastoralMessage('encouragement', phase);

  // In withdrawal phases, show minimal content
  if (isWithdrawal) {
    return (
      <div className={`nm-home nm-home--${phase}`}>
        {/* 
          SPRINT 14: MINIMAL HOME
          
          In integration/abiding phases, the home is deliberately sparse.
          One message (or almost nothing in abiding).
          No CTAs, no prompts, no guidance.
          
          This is intentional design, not missing content.
          The app steps back to let faith be lived.
        */}
        
        {/* Single message card — minimal and quiet */}
        <div className="nm-home__minimal">
          <p className="nm-home__minimal-text">
            {homeContent}
          </p>
        </div>

        {/* 
          Journal — quietly available
          
          In withdrawal phases, Journal is still accessible
          but doesn't push the user to write.
          
          "This space is here when you need it."
          "You don't have to return often."
        */}
        {!isAbiding && (
          <div className="nm-home__journal nm-home__journal--quiet">
            <Link to="/journal" className="nm-home__journal-link">
              <FaPenToSquare className="nm-home__journal-link-icon" />
              <span className="nm-home__journal-link-text">
                {journalInvite}
              </span>
            </Link>
          </div>
        )}

        {/* 
          In abiding phase, even the Journal link becomes
          very subtle — just an icon, almost hidden.
        */}
        {isAbiding && (
          <div className="nm-home__abiding-journal">
            <Link to="/journal" className="nm-home__abiding-journal-link" aria-label="Journal">
              <FaPenToSquare />
            </Link>
          </div>
        )}

        {/* 
          No encouragement section in withdrawal phases.
          Silence is the message.
        */}
      </div>
    );
  }

  // Earlier phases: full content
  return (
    <div className={`nm-home nm-home--${phase}`}>
      {/* 
        Primary Card — Message or Question
        
        Earlier phases (stabilizing/rhythm): 
          Two-line declarative message of reassurance
        
        Later phases (understanding/belonging):
          Single open-ended question
          No expected response, no CTA
          Just an invitation to reflect
      */}
      <div className={`nm-home__welcome ${isQuestion ? 'nm-home__welcome--question' : ''}`}>
        {!isQuestion && (
          <p className="nm-home__welcome-greeting">Welcome</p>
        )}
        
        {isQuestion ? (
          // Understanding/Belonging: Single reflective question
          <p className="nm-home__welcome-question">
            {homeContent}
          </p>
        ) : (
          // Stabilizing/Rhythm: Two-line reassurance
          <>
            <h1 className="nm-home__welcome-title">
              {homeContent.split('\n')[0]}
            </h1>
            <p className="nm-home__welcome-subtitle">
              {homeContent.split('\n')[1]}
            </p>
          </>
        )}
      </div>

      {/* 
        Journal Card — Increased visual priority in reflective phases
        
        In reflective phases (understanding/belonging), Journal moves up
        and becomes more prominent than the continue card.
        
        The copy removes pressure to "write well":
        "You don't need the right words."
        "Write what's true, not what sounds right."
      */}
      {isReflective && (
        <div className="nm-home__journal">
          <Link to="/journal" className="nm-home__journal-card">
            <div className="nm-home__journal-icon">
              <FaPenToSquare />
            </div>
            <div className="nm-home__journal-content">
              <p className="nm-home__journal-text">
                {journalInvite.split('\n')[0]}
              </p>
              {journalInvite.includes('\n') && (
                <p className="nm-home__journal-subtext">
                  {journalInvite.split('\n')[1]}
                </p>
              )}
            </div>
          </Link>
        </div>
      )}

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
        Encouragement — Closing message
        
        Earlier phases: More words, explicit reassurance
        Later phases: Fewer words, more silence
        
        In belonging phase, this becomes an affirmation of presence:
        "You belong here, even on quiet weeks."
      */}
      {encouragement && (
        <div className="nm-home__encouragement">
          <p className="nm-home__encouragement-text">
            {encouragement}
          </p>
        </div>
      )}
    </div>
  );
}
