import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';
import { Lesson } from '../data/lessons';
import './LessonListCard.css';

interface LessonListCardProps {
  lesson: Lesson;
}

/**
 * Lesson List Card
 * Sprint 7 - No status labels, unified routes
 */
export function LessonListCard({ lesson }: LessonListCardProps): JSX.Element {
  return (
    <Link 
      to={`/lessons/${lesson.id}`} 
      className="lesson-list-card"
    >
      <div className="lesson-list-card__icon">{lesson.icon}</div>
      <div className="lesson-list-card__content">
        <h3 className="lesson-list-card__title">{lesson.title}</h3>
        <p className="lesson-list-card__subtitle">{lesson.subtitle}</p>
      </div>
      <FaChevronRight className="lesson-list-card__arrow" />
    </Link>
  );
}
