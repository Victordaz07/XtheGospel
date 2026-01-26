import React from 'react';
import { lessons } from '../data/lessons';
import { LessonListCard } from '../components/LessonListCard';
import './InvestigatorLessonsPage.css';

/**
 * Investigator Lessons Page
 * Sprint 7 - Pastoral tone, no metrics
 */
export default function InvestigatorLessonsPage(): JSX.Element {
  return (
    <div className="inv-lessons">
      {/* Header */}
      <header className="inv-lessons__header">
        <h1 className="inv-lessons__title">Topics</h1>
        <p className="inv-lessons__subtitle">
          Explore the gospel at your own pace
        </p>
      </header>

      {/* Introduction */}
      <div className="inv-lessons__intro">
        <p className="inv-lessons__intro-text">
          Each topic invites you to learn something new about God's love for you. 
          Take your time—there's no order or deadline.
        </p>
      </div>

      {/* Lessons List */}
      <div className="inv-lessons__list">
        {lessons.map((lesson) => (
          <LessonListCard
            key={lesson.id}
            lesson={lesson}
          />
        ))}
      </div>
    </div>
  );
}
