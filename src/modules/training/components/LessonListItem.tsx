/**
 * LessonListItem - Row item for lessons with status
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaCheck, FaCircle, FaLock } from 'react-icons/fa6';
import type { LessonStatus } from '../types/training';
import './LessonListItem.css';

export interface LessonListItemProps {
  lessonId: string;
  title: string;
  status: LessonStatus;
  to: string;
}

export function LessonListItem({
  lessonId,
  title,
  status,
  to,
}: LessonListItemProps): JSX.Element {
  const isLocked = status === 'locked';

  const content = (
    <>
      <div className={`tr-lesson-item__icon tr-lesson-item__icon--${status}`}>
        {status === 'completed' && <FaCheck />}
        {status === 'in_progress' && <FaCircle />}
        {status === 'locked' && <FaLock />}
      </div>
      <div className="tr-lesson-item__content">
        <h3 className="tr-lesson-item__title">{title}</h3>
      </div>
      {!isLocked && <FaChevronRight className="tr-lesson-item__arrow" />}
    </>
  );

  if (isLocked) {
    return (
      <div className={`tr-lesson-item tr-lesson-item--${status}`}>
        {content}
      </div>
    );
  }
  return (
    <Link to={to} className={`tr-lesson-item tr-lesson-item--${status}`}>
      {content}
    </Link>
  );
}
