import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { convertPath12Weeks } from '../../data/leader/convertPath12Weeks';
import '../../pages/Page.css';
import './LeaderScreens.css';
import './ConvertPath12WeeksScreen.css';

export const ConvertPath12WeeksScreen: React.FC = () => {
  const location = useLocation();
  const [openWeeks, setOpenWeeks] = useState<Record<number, boolean>>({
    1: true
  });

  const toggleWeek = (weekNumber: number) => {
    setOpenWeeks((prev) => ({
      ...prev,
      [weekNumber]: !prev[weekNumber]
    }));
  };

  // Determinar la ruta de vuelta según el contexto
  const backPath = location.pathname.includes('/member/') 
    ? '/member/leader/meetings' 
    : '/leader/meetings';

  return (
    <div className="page">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Link
            to={backPath}
            style={{
              textDecoration: 'none',
              color: '#5A48FF',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            ← Volver a Reuniones y recursos
          </Link>
        </div>
        <h1>{convertPath12Weeks.title}</h1>
        <p className="page-subtitle">{convertPath12Weeks.description}</p>
      </div>
      <div className="page-content">
        {/* Nota rápida de uso */}
        <div className="convert-path-note-card">
          <span className="convert-path-note-icon">ℹ️</span>
          <p className="convert-path-note-text">
            Usa este mapa en coordinación misional, consejo de barrio y
            entrevistas personales. Cada tarjeta es una semana de apoyo
            espiritual, doctrinal y social.
          </p>
        </div>

        {/* Weeks */}
        {convertPath12Weeks.weeks.map((week) => {
          const isOpen = !!openWeeks[week.week];

          return (
            <div key={week.week} className="convert-path-week-card">
              {/* Header de la semana */}
              <div
                className="convert-path-week-header"
                onClick={() => toggleWeek(week.week)}
              >
                <div className="convert-path-week-badge">
                  {week.week}
                </div>
                <div className="convert-path-week-header-text">
                  <h3 className="convert-path-week-title">
                    Semana {week.week}: {week.theme}
                  </h3>
                  <p className="convert-path-week-subtitle">
                    Principales metas espirituales y de integración para esta
                    etapa.
                  </p>
                </div>
                <span className="convert-path-expand-icon">
                  {isOpen ? '▼' : '▶'}
                </span>
              </div>

              {/* Contenido colapsable */}
              {isOpen && (
                <div className="convert-path-week-body">
                  {/* Metas espirituales */}
                  {week.spiritualGoals?.length ? (
                    <div className="convert-path-section">
                      <h4 className="convert-path-section-title">Metas espirituales</h4>
                      <ul className="convert-path-list">
                        {week.spiritualGoals.map((g, idx) => (
                          <li key={idx} className="convert-path-list-item">
                            {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {/* Enfoque doctrinal */}
                  {week.doctrinalFocus?.length ? (
                    <div className="convert-path-section">
                      <h4 className="convert-path-section-title">Enfoque doctrinal</h4>
                      <ul className="convert-path-list">
                        {week.doctrinalFocus.map((d, idx) => (
                          <li key={idx} className="convert-path-list-item">
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {/* Integración social */}
                  {week.socialIntegration?.length ? (
                    <div className="convert-path-section">
                      <h4 className="convert-path-section-title">
                        Integración social y de barrio
                      </h4>
                      <ul className="convert-path-list">
                        {week.socialIntegration.map((s, idx) => (
                          <li key={idx} className="convert-path-list-item">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {/* Tareas para líderes / misioneros */}
                  {week.tasks?.length ? (
                    <div className="convert-path-section">
                      <h4 className="convert-path-section-title">
                        Tareas sugeridas para líderes y misioneros
                      </h4>
                      <ul className="convert-path-list convert-path-tasks-list">
                        {week.tasks.map((t, idx) => (
                          <li key={idx} className="convert-path-list-item convert-path-task-item">
                            <span className="convert-path-task-icon">✓</span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {/* Escrituras */}
                  {week.suggestedScriptures?.length ? (
                    <div className="convert-path-section">
                      <h4 className="convert-path-section-title">Escrituras clave</h4>
                      <div className="convert-path-scripture-chips">
                        {week.suggestedScriptures.map((ref, idx) => (
                          <span key={idx} className="convert-path-scripture-chip">
                            {ref}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

