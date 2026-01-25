import React from 'react';
import { lessons, getStatusLabel } from '../data/lessons';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import './InvestigatorProgressPage.css';

export default function InvestigatorProgressPage(): JSX.Element {
  const { milestones, getLessonStatus, getCompletedLessonsCount, journalEntries } = useInvestigatorStore();
  
  const completedCount = getCompletedLessonsCount();
  const totalLessons = lessons.length;
  const entriesCount = journalEntries.length;
  const unlockedMilestones = milestones.filter((m) => m.unlockedAt !== null).length;

  return (
    <div className="inv-progress">
      {/* Header */}
      <div className="inv-progress__header">
        <h1 className="inv-progress__title">My Progress</h1>
        <p className="inv-progress__subtitle">
          Track your spiritual journey milestones
        </p>
      </div>

      {/* Stats Summary */}
      <div className="inv-progress__stats">
        <div className="inv-progress__stat">
          <div className="inv-progress__stat-value">{completedCount}/{totalLessons}</div>
          <div className="inv-progress__stat-label">Lessons</div>
        </div>
        <div className="inv-progress__stat">
          <div className="inv-progress__stat-value">{entriesCount}</div>
          <div className="inv-progress__stat-label">Journal</div>
        </div>
        <div className="inv-progress__stat">
          <div className="inv-progress__stat-value">{unlockedMilestones}/{milestones.length}</div>
          <div className="inv-progress__stat-label">Milestones</div>
        </div>
      </div>

      {/* Milestones */}
      <div className="inv-progress__section">
        <h2 className="inv-progress__section-title">Milestones</h2>
        <div className="inv-progress__milestones">
          {milestones.map((milestone) => {
            const isUnlocked = milestone.unlockedAt !== null;
            return (
              <div
                key={milestone.key}
                className={`inv-progress__milestone ${
                  isUnlocked ? 'inv-progress__milestone--unlocked' : 'inv-progress__milestone--locked'
                }`}
              >
                <div className="inv-progress__milestone-icon">{milestone.icon}</div>
                <div className="inv-progress__milestone-content">
                  <h3 className="inv-progress__milestone-title">{milestone.title}</h3>
                  <p className="inv-progress__milestone-desc">{milestone.description}</p>
                </div>
                <span className="inv-progress__milestone-status">
                  {isUnlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lessons Overview */}
      <div className="inv-progress__section">
        <h2 className="inv-progress__section-title">Lessons Overview</h2>
        <div className="inv-progress__lessons">
          {lessons.map((lesson) => {
            const status = getLessonStatus(lesson.id);
            return (
              <div key={lesson.id} className="inv-progress__lesson">
                <span className="inv-progress__lesson-icon">{lesson.icon}</span>
                <h3 className="inv-progress__lesson-title">{lesson.title}</h3>
                <span className={`inv-progress__lesson-status inv-progress__lesson-status--${status}`}>
                  {getStatusLabel(status)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
