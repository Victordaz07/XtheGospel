import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LessonsList from '../../components/LessonsList';
import LessonDetail from '../../components/LessonDetail';
import './Page.css';

const InvestigatorLessons: React.FC = () => {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<LessonsList />} />
        <Route path="/:lessonId" element={<LessonDetail />} />
      </Routes>
    </div>
  );
};

export default InvestigatorLessons;

