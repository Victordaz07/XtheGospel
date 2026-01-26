import React from 'react';
import './NewMemberProgressPage.css';

/**
 * New Member Progress Page
 * 
 * Sprint 4 – Semantic Cleanup
 * Removed all numeric metrics and gamification elements.
 * Focuses on pastoral, reflective language that honors the
 * continuous, non-measured nature of spiritual growth.
 */
export default function NewMemberProgressPage(): JSX.Element {
  // Reflective experiences - no counts, no status, just moments
  const recentExperiences = [
    'You attended your first sacrament meeting',
    'You began a habit of personal prayer',
    'You studied the scriptures independently',
    'You felt the Spirit guide you in a decision',
    'You connected with members in your ward',
  ];

  // Gentle suggestions - static, no tracking
  const gentleSteps = [
    'Continue attending Sunday meetings',
    'Set aside time for personal prayer',
    'Stay connected with your ward family',
  ];

  return (
    <div className="nm-progress">
      {/* Header */}
      <header className="nm-progress__header">
        <h1 className="nm-progress__title">Your Journey So Far</h1>
        <p className="nm-progress__subtitle">
          This space reflects moments of growth and devotion as you continue your discipleship.
        </p>
      </header>

      {/* Recent Experiences */}
      <section className="nm-progress__experiences">
        <h2 className="nm-progress__section-title">Recent Experiences</h2>
        <ul className="nm-progress__experience-list">
          {recentExperiences.map((experience, index) => (
            <li key={index} className="nm-progress__experience-item">
              <span className="nm-progress__experience-dot" aria-hidden="true" />
              <span className="nm-progress__experience-text">{experience}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Gentle Steps */}
      <section className="nm-progress__gentle-steps">
        <h2 className="nm-progress__section-title">Next gentle steps</h2>
        <p className="nm-progress__gentle-intro">
          There is no rush. Consider these invitations when you feel ready:
        </p>
        <ul className="nm-progress__steps-list">
          {gentleSteps.map((step, index) => (
            <li key={index} className="nm-progress__step-item">
              {step}
            </li>
          ))}
        </ul>
      </section>

      {/* Closing reflection */}
      <footer className="nm-progress__footer">
        <p className="nm-progress__footer-text">
          Your journey is personal and sacred. The Savior walks with you at every step.
        </p>
      </footer>
    </div>
  );
}
