import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { newConvertsExtended } from '../../data/leader/newConvertsExtended';
import '../../pages/Page.css';
import './LeaderScreens.css';
import './LeaderExtendedScreens.css';

export const LeaderNewConvertsExtendedScreen: React.FC = () => {
  const location = useLocation();
  const riskLevels = newConvertsExtended.riskLevels;
  const dimensions = newConvertsExtended.conversionDimensions;
  const priesthoodFlow = newConvertsExtended.priesthoodAndTempleFlow;
  const sampleProfiles = newConvertsExtended.sampleProfiles;

  const backPath = location.pathname.includes('/member/') 
    ? '/member/leader/converts' 
    : '/leader/converts';

  const getRiskIcon = (key: string) => {
    if (key === 'low') return '✓';
    if (key === 'medium') return '⚠';
    return '⚠⚠';
  };

  const getRiskColor = (key: string) => {
    if (key === 'low') return '#16A34A';
    if (key === 'medium') return '#F59E0B';
    return '#DC2626';
  };

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
            ← Volver a Nuevos conversos
          </Link>
        </div>
        <h1>{newConvertsExtended.title}</h1>
        <p className="page-subtitle">{newConvertsExtended.description}</p>
      </div>
      <div className="page-content">
        {/* Tags de estado */}
        <div className="leader-section-card">
          <h2 className="leader-section-title">Etiquetas de estado</h2>
          <div className="leader-chip-row">
            {newConvertsExtended.statusTags.map((tag, idx) => (
              <span key={idx} className="leader-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Niveles de riesgo */}
        <div className="leader-section-card">
          <h2 className="leader-section-title">Niveles de riesgo</h2>
          {Object.entries(riskLevels).map(([key, level]) => (
            <div key={key} className="leader-sub-card" style={{ borderLeft: `4px solid ${getRiskColor(key)}` }}>
              <div className="leader-sub-header-row">
                <span className="leader-risk-icon" style={{ color: getRiskColor(key) }}>
                  {getRiskIcon(key)}
                </span>
                <h3 className="leader-sub-title">{level.label}</h3>
              </div>
              <p className="leader-body-text">{level.description}</p>
              <h4 className="leader-sub-section-title">Acciones sugeridas</h4>
              <ul className="leader-list">
                {level.suggestedActions.map((a, idx) => (
                  <li key={idx} className="leader-list-item">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Dimensiones de conversión */}
        <div className="leader-section-card">
          <h2 className="leader-section-title">Dimensiones de la conversión</h2>
          {Object.entries(dimensions).map(([key, dim]) => (
            <div key={key} className="leader-sub-card">
              <h3 className="leader-sub-title">{dim.title}</h3>
              
              {dim.indicators?.length ? (
                <>
                  <h4 className="leader-sub-section-title">Indicadores</h4>
                  <ul className="leader-list">
                    {dim.indicators.map((ind, idx) => (
                      <li key={idx} className="leader-list-item">
                        {ind}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {dim.questionsForLeaders?.length ? (
                <>
                  <h4 className="leader-sub-section-title">Preguntas para líderes</h4>
                  <ul className="leader-list">
                    {dim.questionsForLeaders.map((q, idx) => (
                      <li key={idx} className="leader-list-item leader-question-item">
                        {q}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {dim.commonGaps?.length ? (
                <>
                  <h4 className="leader-sub-section-title">Vacíos doctrinales comunes</h4>
                  <ul className="leader-list">
                    {dim.commonGaps.map((g, idx) => (
                      <li key={idx} className="leader-list-item">
                        {g}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {dim.examplesOfSimpleCallings?.length ? (
                <>
                  <h4 className="leader-sub-section-title">Llamamientos o servicios simples</h4>
                  <ul className="leader-list">
                    {dim.examplesOfSimpleCallings.map((c, idx) => (
                      <li key={idx} className="leader-list-item leader-calling-item">
                        {c}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          ))}
        </div>

        {/* Flujo sacerdocio y templo */}
        <div className="leader-section-card">
          <h2 className="leader-section-title">{priesthoodFlow.title}</h2>
          <ol className="leader-numbered-list">
            {priesthoodFlow.steps.map((step, idx) => (
              <li key={idx} className="leader-list-item">
                {step}
              </li>
            ))}
          </ol>
          {priesthoodFlow.notes?.length ? (
            <>
              <h4 className="leader-sub-section-title">Notas importantes</h4>
              <ul className="leader-list">
                {priesthoodFlow.notes.map((n, idx) => (
                  <li key={idx} className="leader-list-item">
                    {n}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        {/* Perfiles de ejemplo */}
        <div className="leader-section-card">
          <h2 className="leader-section-title">Perfiles de ejemplo y planes sugeridos</h2>
          {sampleProfiles.map((p) => (
            <div key={p.id} className="leader-sub-card">
              <h3 className="leader-sub-title">{p.label}</h3>

              <h4 className="leader-sub-section-title">Fortalezas</h4>
              <ul className="leader-list">
                {p.strengths.map((s, idx) => (
                  <li key={idx} className="leader-list-item leader-strength-item">
                    {s}
                  </li>
                ))}
              </ul>

              <h4 className="leader-sub-section-title">Riesgos</h4>
              <ul className="leader-list">
                {p.risks.map((r, idx) => (
                  <li key={idx} className="leader-list-item leader-risk-item">
                    {r}
                  </li>
                ))}
              </ul>

              <h4 className="leader-sub-section-title">Plan sugerido</h4>
              <ul className="leader-list">
                {p.suggestedPlan.map((sp, idx) => (
                  <li key={idx} className="leader-list-item leader-plan-item">
                    {sp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

