import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { leaderGuideExtended } from '../../data/leader/leaderGuideExtended';
import '../../pages/Page.css';
import './LeaderScreens.css';
import './LeaderExtendedScreens.css';

export const LeaderGuideExtendedScreen: React.FC = () => {
  const location = useLocation();
  const guide = leaderGuideExtended;
  const confidentiality = guide.confidentialityRules;
  const behavior = guide.leaderBehavior;

  const backPath = location.pathname.includes('/member/') 
    ? '/member/leader/guidelines' 
    : '/leader/guidelines';

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
            ← Volver a Directrices y autoridad
          </Link>
        </div>
        <h1>{guide.title}</h1>
        <p className="page-subtitle">{guide.description}</p>
      </div>
      <div className="page-content">
        {/* Fuentes de autoridad */}
        <div className="leader-section-card">
          <h2 className="leader-section-title">Fuentes de autoridad</h2>
          <ul className="leader-list">
            {guide.authoritySources.map((s, idx) => (
              <li key={idx} className="leader-list-item">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Quién debe usar este modo */}
        <div className="leader-section-card">
          <h2 className="leader-section-title">Quién debe usar este modo</h2>
          <ul className="leader-list">
            {guide.whoShouldUseThisMode.map((p, idx) => (
              <li key={idx} className="leader-list-item leader-check-item">
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Confidencialidad */}
        <div className="leader-section-card">
          <div className="leader-section-header-row">
            <span className="leader-icon">🔒</span>
            <h2 className="leader-section-title">Reglas de confidencialidad</h2>
          </div>

          <div className="leader-sub-card leader-allowed-card">
            <h3 className="leader-sub-title">Se puede registrar</h3>
            <ul className="leader-list">
              {confidentiality.allowedNotes.map((n, idx) => (
                <li key={idx} className="leader-list-item">
                  {n}
                </li>
              ))}
            </ul>
          </div>

          <div className="leader-sub-card leader-forbidden-card">
            <h3 className="leader-sub-title">No se debe registrar</h3>
            <ul className="leader-list">
              {confidentiality.forbiddenNotes.map((n, idx) => (
                <li key={idx} className="leader-list-item leader-forbidden-item">
                  {n}
                </li>
              ))}
            </ul>
          </div>

          <div className="leader-sub-card leader-principles-card">
            <h3 className="leader-sub-title">Principios</h3>
            <ul className="leader-list">
              {confidentiality.principles.map((n, idx) => (
                <li key={idx} className="leader-list-item leader-check-item">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Conducta del líder */}
        <div className="leader-section-card">
          <div className="leader-section-header-row">
            <span className="leader-icon">🎖️</span>
            <h2 className="leader-section-title">Conducta del líder</h2>
          </div>

          <div className="leader-sub-card">
            <h3 className="leader-sub-title">Código de conducta</h3>
            <ul className="leader-list">
              {behavior.codeOfConduct.map((c, idx) => (
                <li key={idx} className="leader-list-item">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="leader-sub-card leader-phrases-good-card">
            <h3 className="leader-sub-title">Frases que ayudan</h3>
            <ul className="leader-list">
              {behavior.phrasesToUseOften.map((p, idx) => (
                <li key={idx} className="leader-list-item leader-quote-item">
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="leader-sub-card leader-phrases-bad-card">
            <h3 className="leader-sub-title">Frases a evitar</h3>
            <ul className="leader-list">
              {behavior.phrasesToAvoid.map((p, idx) => (
                <li key={idx} className="leader-list-item leader-forbidden-item">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="leader-section-card leader-disclaimer-card">
          <div className="leader-section-header-row">
            <span className="leader-icon">⚠️</span>
            <h2 className="leader-section-title">Nota importante</h2>
          </div>
          <p className="leader-body-text leader-disclaimer-text">{guide.disclaimerText}</p>
        </div>
      </div>
    </div>
  );
};

