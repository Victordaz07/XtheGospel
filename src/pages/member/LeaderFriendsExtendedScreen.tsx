import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { friendsInTeachingExtended } from '../../data/leader/friendsInTeachingExtended';
import '../../pages/Page.css';
import './LeaderScreens.css';
import './LeaderExtendedScreens.css';

export const LeaderFriendsExtendedScreen: React.FC = () => {
  const location = useLocation();
  const stages = friendsInTeachingExtended.teachingStages;
  const qa = friendsInTeachingExtended.commonQuestionsAndInspiredResponses;
  const sunday = friendsInTeachingExtended.sundaySuggestionsByProfile;
  const whatMembersCanDo = friendsInTeachingExtended.whatMembersCanDoThisWeek || [];

  const sundayEntries = Object.entries(sunday);

  const backPath = location.pathname.includes('/member/') 
    ? '/member/leader/friends' 
    : '/leader/friends';

  const getProfileLabel = (key: string) => {
    if (key === 'youngAdult') return 'Joven adulto';
    if (key === 'familyInvestigator') return 'Familia investigadora';
    if (key === 'elderlyPerson') return 'Persona mayor';
    return key;
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
            ← Volver a Amigos en enseñanza
          </Link>
        </div>
        <h1>{friendsInTeachingExtended.title}</h1>
        <p className="page-subtitle">{friendsInTeachingExtended.description}</p>
      </div>
      <div className="page-content">
        {/* Etapas de enseñanza */}
        <div className="leader-section-card">
          <h2 className="leader-section-title">Etapas de enseñanza</h2>
          {stages.map((stage) => (
            <div key={stage.id} className="leader-sub-card">
              <h3 className="leader-sub-title">{stage.label}</h3>
              <p className="leader-body-text">{stage.description}</p>

              {stage.signs?.length ? (
                <>
                  <h4 className="leader-sub-section-title">Señales</h4>
                  <ul className="leader-list">
                    {stage.signs.map((s, idx) => (
                      <li key={idx} className="leader-list-item">
                        {s}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {stage.leaderActions?.length ? (
                <>
                  <h4 className="leader-sub-section-title">Acciones para líderes</h4>
                  <ul className="leader-list">
                    {stage.leaderActions.map((a, idx) => (
                      <li key={idx} className="leader-list-item leader-action-item">
                        {a}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          ))}
        </div>

        {/* Preguntas comunes / respuestas inspiradas */}
        <div className="leader-section-card">
          <h2 className="leader-section-title">Preguntas comunes y respuestas inspiradas</h2>
          {qa.map((item, idx) => (
            <div key={idx} className="leader-sub-card">
              <h4 className="leader-sub-section-title">Pregunta frecuente</h4>
              <p className="leader-body-text leader-question-text">{item.question}</p>

              <h4 className="leader-sub-section-title">Respuesta sugerida</h4>
              <p className="leader-body-text">{item.suggestedResponse}</p>

              {item.scriptures?.length ? (
                <>
                  <h4 className="leader-sub-section-title">Escrituras sugeridas</h4>
                  <div className="leader-chip-row">
                    {item.scriptures.map((ref, rIdx) => (
                      <span key={rIdx} className="leader-chip leader-scripture-chip">
                        {ref}
                      </span>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>

        {/* Sugerencias para el domingo según perfil */}
        <div className="leader-section-card">
          <h2 className="leader-section-title">Sugerencias para el domingo según perfil</h2>
          {sundayEntries.map(([profileKey, suggestions]) => (
            <div key={profileKey} className="leader-sub-card">
              <div className="leader-sub-header-row">
                <span className="leader-profile-icon">👤</span>
                <h3 className="leader-sub-title">{getProfileLabel(profileKey)}</h3>
              </div>
              <ul className="leader-list">
                {(suggestions as string[]).map((s, idx) => (
                  <li key={idx} className="leader-list-item">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Qué pueden hacer los miembros esta semana */}
        <div className="leader-section-card">
          <h2 className="leader-section-title">Qué pueden hacer los miembros esta semana</h2>
          <ul className="leader-list">
            {whatMembersCanDo.map((action, idx) => (
              <li key={idx} className="leader-list-item leader-action-item">
                {action}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

