import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import MissionaryLessonDetailFull from './MissionaryLessonDetailFull';
import { missionaryLessons } from '../../../data/missionaryGuideLessons';
import './Page.css';
import './MissionaryLessons.css';

const MissionaryLessonsList: React.FC = () => {
  const { t } = useI18n();
  
  // Usar nuestra configuración de lecciones
  const lessons = React.useMemo(() => {
    if (!missionaryLessons || missionaryLessons.length === 0) {
      console.warn('⚠️ missionaryLessons está vacío o undefined');
      return [];
    }
    const mapped = missionaryLessons
      .sort((a, b) => a.order - b.order)
      .map((lesson) => ({
        id: lesson.id,
        title: t(lesson.titleKey),
        tag: t(lesson.tagKey),
        duration: t(lesson.durationKey),
        screenName: lesson.screenName
      }));
    console.log('📚 Lecciones mapeadas:', mapped.length, mapped);
    return mapped;
  }, [t]);

  return (
    <div className="page missionary-guide-page">
      <div className="page-header">
        <h1>{t('missionaryGuide.headerTitle')}</h1>
        <p className="page-subtitle">{t('missionaryGuide.headerSubtitle')}</p>
      </div>
      <div className="page-content">
        <div className="missionary-lessons-grid">
          {lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                to={`/lessons/${index + 1}`}
                className="missionary-lesson-card"
              >
                <div className="lesson-card-header">
                  <h2 className="lesson-card-title">{lesson.title}</h2>
                  <span className="lesson-card-number">{lesson.tag}</span>
                </div>
                <p className="lesson-card-focus">{lesson.duration}</p>
                <div className="lesson-card-stats">
                  <span className="stat-item">
                    📚 Lección {index + 1}
                  </span>
                  <span className="stat-item">
                    ⏱️ {lesson.duration}
                  </span>
                </div>
                <button className="lesson-card-button">
                  Ver Lección →
                </button>
              </Link>
            ))
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              <p>Cargando lecciones...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MissionaryLessons: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MissionaryLessonsList />} />
      <Route path="/:lessonId" element={<MissionaryLessonDetailFull />} />
    </Routes>
  );
};

export default MissionaryLessons;
