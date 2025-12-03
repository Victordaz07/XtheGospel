import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import './missionary-guide.css';

type LessonStatus = 'not-started' | 'in-progress' | 'completed';

interface MissionaryLesson {
  id: string;
  number: number;
  title: string;              // i18n key en producción
  sectionLabel: string;       // ej: "Doctrina de Cristo"
  durationMinutes: number;
  status: LessonStatus;
  progressPercent: number;    // 0–100
  recommendedFor: string;     // ej: "Investigadores con fecha"
}

type LessonFilter = 'all' | 'core' | 'additional';

const useMissionaryLessons = () => {
  // MOCK – en producción esto viene de tu data / i18n
  const lessons: MissionaryLesson[] = [
    {
      id: 'lesson-1',
      number: 1,
      title: 'La Restauración del Evangelio de Jesucristo',
      sectionLabel: 'Doctrina de Cristo',
      durationMinutes: 45,
      status: 'not-started',
      progressPercent: 0,
      recommendedFor: 'Primeras lecciones, curiosos por el "por qué" de la Iglesia.',
    },
    {
      id: 'lesson-2',
      number: 2,
      title: 'El Plan de Salvación',
      sectionLabel: 'Doctrina de Cristo',
      durationMinutes: 45,
      status: 'in-progress',
      progressPercent: 40,
      recommendedFor: 'Investigadores que preguntan sobre el propósito de la vida.',
    },
    {
      id: 'lesson-3',
      number: 3,
      title: 'El Evangelio de Jesucristo',
      sectionLabel: 'Doctrina de Cristo',
      durationMinutes: 45,
      status: 'not-started',
      progressPercent: 0,
      recommendedFor: 'Personas que ya sienten deseo de cambiar su vida.',
    },
    {
      id: 'lesson-4',
      number: 4,
      title: 'Los Mandamientos',
      sectionLabel: 'Doctrina de Cristo',
      durationMinutes: 45,
      status: 'not-started',
      progressPercent: 0,
      recommendedFor: 'Investigadores que ya asisten a la Iglesia.',
    },
    {
      id: 'lesson-5',
      number: 5,
      title: 'Ordenanzas y Convenios',
      sectionLabel: 'Doctrina de Cristo',
      durationMinutes: 45,
      status: 'not-started',
      progressPercent: 0,
      recommendedFor: 'Investigadores con fecha bautismal o recién bautizados.',
    },
    {
      id: 'lesson-6',
      number: 6,
      title: 'Leyes y Ordenanzas',
      sectionLabel: 'Doctrina de Cristo',
      durationMinutes: 45,
      status: 'not-started',
      progressPercent: 0,
      recommendedFor: 'Fortalecer conversos y miembros menos activos.',
    },
  ];

  return { lessons };
};

export const MissionaryGuideScreen: React.FC = () => {
  const navigate = useNavigate();
  const { lessons } = useMissionaryLessons();
  const [filter, setFilter] = useState<LessonFilter>('all');

  const completedCount = lessons.filter((l) => l.status === 'completed').length;
  const totalCount = lessons.length;

  const filteredLessons = lessons.filter((lesson) => {
    if (filter === 'core') return lesson.sectionLabel === 'Doctrina de Cristo';
    if (filter === 'additional') return lesson.sectionLabel !== 'Doctrina de Cristo';
    return true;
  });

  const handleOpenLesson = (lessonId: string) => {
    // Ajusta esta ruta a tu sistema real de lecciones
    navigate(`/lessons/${lessonId.replace('lesson-', '')}`);
  };

  return (
    <XtgPage
      title="Missionary Guide"
      subtitle="Doctrina de Cristo – Lecciones misionales listas para enseñar y estudiar."
      badge="Guía para misioneros"
      rightIcon="menu"
    >
      <div className="xtg-section xtg-stack-lg">

        {/* Resumen superior */}
        <XtgCard>
          <div className="mg-header-row">
            <div>
              <p className="mg-header-title">Doctrina de Cristo</p>
              <p className="mg-header-sub">
                Progreso de tus lecciones principales.
              </p>
            </div>
            <div className="mg-header-badge">
              {completedCount} / {totalCount} completadas
            </div>
          </div>

          <div className="mg-progress-row">
            <div className="mg-progress-bar">
              <div
                className="mg-progress-fill"
                style={{
                  width:
                    totalCount === 0
                      ? '0%'
                      : `${Math.round(
                          (completedCount / totalCount) * 100,
                        )}%`,
                }}
              />
            </div>
            <span className="mg-progress-text">
              {totalCount === 0
                ? 'Sin lecciones registradas'
                : `${Math.round((completedCount / totalCount) * 100)}% completado`}
            </span>
          </div>

          {/* Filtros */}
          <div className="mg-filter-row">
            <button
              type="button"
              className={
                filter === 'all' ? 'mg-filter-pill mg-filter-pill--active' : 'mg-filter-pill'
              }
              onClick={() => setFilter('all')}
            >
              Todas
            </button>
            <button
              type="button"
              className={
                filter === 'core' ? 'mg-filter-pill mg-filter-pill--active' : 'mg-filter-pill'
              }
              onClick={() => setFilter('core')}
            >
              Doctrina de Cristo
            </button>
            <button
              type="button"
              className={
                filter === 'additional'
                  ? 'mg-filter-pill mg-filter-pill--active'
                  : 'mg-filter-pill'
              }
              onClick={() => setFilter('additional')}
            >
              Complementarias
            </button>
          </div>
        </XtgCard>

        {/* Lista de lecciones */}
        <div className="mg-lesson-list">
          {filteredLessons.map((lesson) => (
            <article key={lesson.id} className="mg-lesson-card">
              <header className="mg-lesson-header">
                <div>
                  <h2 className="mg-lesson-title">{lesson.title}</h2>
                  <p className="mg-lesson-meta">
                    ⏱ {lesson.durationMinutes} minutos · Lección {lesson.number}
                  </p>
                </div>
                <div
                  className={[
                    'mg-lesson-status',
                    `mg-lesson-status--${lesson.status}`,
                  ].join(' ')}
                >
                  {lesson.status === 'completed'
                    ? 'Completada'
                    : lesson.status === 'in-progress'
                    ? 'En progreso'
                    : 'Pendiente'}
                </div>
              </header>

              <p className="mg-lesson-recommended">
                {lesson.recommendedFor}
              </p>

              <div className="mg-lesson-progress-row">
                <div className="mg-lesson-progress-bar">
                  <div
                    className="mg-lesson-progress-fill"
                    style={{ width: `${lesson.progressPercent}%` }}
                  />
                </div>
                <span className="mg-lesson-progress-text">
                  {lesson.progressPercent}% estudiado
                </span>
              </div>

              <div className="mg-lesson-actions">
                <button
                  type="button"
                  className="mg-lesson-primary"
                  onClick={() => handleOpenLesson(lesson.id)}
                >
                  Ver lección →
                </button>
                <button
                  type="button"
                  className="mg-lesson-secondary"
                  onClick={() => {
                    // aquí puedes abrir un modal de planificación, etc.
                  }}
                >
                  Planificar con investigador
                </button>
              </div>
            </article>
          ))}

          {filteredLessons.length === 0 && (
            <p className="xtg-text-muted">
              No hay lecciones para este filtro.
            </p>
          )}
        </div>
      </div>
    </XtgPage>
  );
};

