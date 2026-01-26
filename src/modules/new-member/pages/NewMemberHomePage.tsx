import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaPenToSquare } from 'react-icons/fa6';
import { useSpiritualMemoryStore } from '../../../core/memory/useSpiritualMemoryStore';
import { 
  usePastoralPhase, 
  getPastoralMessage, 
  isHomeContentQuestion,
  useIsReflectivePhase 
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
 * ❌ NO tasks or assignments (Sprint 13)
 * 
 * ✅ Permission-based language ("When you're ready", "There's no rush")
 * ✅ Calmer visual density (fewer cards, more breathing room)
 * ✅ Reassurance over instruction
 * ✅ Grace over achievement
 * ✅ Questions over statements in deeper phases (Sprint 13)
 * ✅ Journal as central invitation, not obligation (Sprint 13)
 * 
 * Phase behavior:
 *   - stabilizing/rhythm: Declarative messages of reassurance
 *   - understanding/belonging: Open-ended questions that invite reflection
 * 
 * The user should feel: "This doesn't demand anything from me...
 * but I want to come back."
 * ═══════════════════════════════════════════════════════════════════════════
 */
export default function NewMemberHomePage(): JSX.Element {
  const { lastLessonId, lastLessonTitle, isHydrated, hydrate } = useSpiritualMemoryStore();
  const phase = usePastoralPhase();
  const isReflective = useIsReflectivePhase();
  const isQuestion = isHomeContentQuestion(phase);

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
  
  // Phase-aware labels
  const continueLabel = getPastoralMessage('continueStudy', phase);
  const homeContent = getPastoralMessage('homeWelcome', phase);
  const journalInvite = getPastoralMessage('journalInvite', phase);

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
        Journal Card — Sprint 13: Increased visual priority
        
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
      <div className="nm-home__encouragement">
        <p className="nm-home__encouragement-text">
          {getPastoralMessage('encouragement', phase)}
        </p>
      </div>
    </div>
  );
}
