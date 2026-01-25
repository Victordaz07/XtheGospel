import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';
import { Lesson, LessonStatus, getStatusLabel } from '../data/lessons';
import './LessonListCard.css';

interface LessonListCardProps {
  lesson: Lesson;
  status: LessonStatus;
}

export function LessonListCard({ lesson, status }: LessonListCardProps): JSX.Element {
  return (
    <Link 
      to={`/investigator/lessons/${lesson.id}`} 
      className="lesson-list-card"
    >
      <div className="lesson-list-card__icon">{lesson.icon}</div>
      <div className="lesson-list-card__content">
        <h3 className="lesson-list-card__title">{lesson.title}</h3>
        <p className="lesson-list-card__subtitle">{lesson.subtitle}</p>
      </div>
      <span className={`lesson-list-card__status lesson-list-card__status--${status}`}>
        {getStatusLabel(status)}
      </span>
      <FaChevronRight className="lesson-list-card__arrow" />
    </Link>
  );
}
