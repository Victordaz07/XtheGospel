import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { getAllMissionaryLessons } from '../../utils/missionaryData';
import MissionaryLessonDetail from './MissionaryLessonDetail';
import './Page.css';
import './MissionaryLessons.css';

const MissionaryLessonsList: React.FC = () => {
  const { t } = useI18n();
  const lessons = getAllMissionaryLessons(t);

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('missionary.header')}</h1>
        <p className="page-subtitle">{t('missionary.subheader')}</p>
      </div>
      <div className="page-content">
        <div className="missionary-lessons-grid">
          {lessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/lessons/${lesson.id.replace('lesson', '')}`}
              className="missionary-lesson-card"
            >
              <div className="lesson-card-header">
                <h2 className="lesson-card-title">{lesson.title}</h2>
                <span className="lesson-card-number">{lesson.id.replace('lesson', 'L')}</span>
              </div>
              <p className="lesson-card-focus">{lesson.doctrineFocus}</p>
              <div className="lesson-card-stats">
                <span className="stat-item">
                  📋 {lesson.keyPoints.length} puntos clave
                </span>
                <span className="stat-item">
                  📖 {lesson.keyScriptures.length} escrituras
                </span>
                <span className="stat-item">
                  💬 {lesson.questions.length} preguntas
                </span>
              </div>
              <button className="lesson-card-button">
                Ver Hoja de Estudio →
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const MissionaryLessons: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MissionaryLessonsList />} />
      <Route path="/:lessonId" element={<MissionaryLessonDetail />} />
    </Routes>
  );
};

export default MissionaryLessons;
