import React from 'react';
import { lessons } from '../data/lessons';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { LessonListCard } from '../components/LessonListCard';
import './InvestigatorLessonsPage.css';

export default function InvestigatorLessonsPage(): JSX.Element {
  const { getLessonStatus, getCompletedLessonsCount, getExploringLessonsCount } = useInvestigatorStore();
  
  const completedCount = getCompletedLessonsCount();
  const exploringCount = getExploringLessonsCount();
  const totalCount = lessons.length;

  return (
    <div className="inv-lessons">
      {/* Header */}
      <div className="inv-lessons__header">
        <h1 className="inv-lessons__title">Lessons</h1>
        <p className="inv-lessons__subtitle">
          Discover the gospel of Jesus Christ
        </p>
      </div>

      {/* Progress Summary */}
      <div className="inv-lessons__progress">
        <div className="inv-lessons__progress-stat">
          <span className="inv-lessons__progress-value">{totalCount}</span>
          <span className="inv-lessons__progress-label">Total</span>
        </div>
        <div className="inv-lessons__progress-divider" />
        <div className="inv-lessons__progress-stat">
          <span className="inv-lessons__progress-value">{exploringCount}</span>
          <span className="inv-lessons__progress-label">Exploring</span>
        </div>
        <div className="inv-lessons__progress-divider" />
        <div className="inv-lessons__progress-stat">
          <span className="inv-lessons__progress-value">{completedCount}</span>
          <span className="inv-lessons__progress-label">Completed</span>
        </div>
      </div>

      {/* Lessons List */}
      <div className="inv-lessons__list">
        {lessons.map((lesson) => (
          <LessonListCard
            key={lesson.id}
            lesson={lesson}
            status={getLessonStatus(lesson.id)}
          />
        ))}
      </div>
    </div>
  );
}
