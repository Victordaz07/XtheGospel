import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { getLeaderIntegrationPhases } from '../../data/leader';
import '../../pages/Page.css';
import './LeaderScreens.css';

export const LeaderIntegrationMapScreen: React.FC = () => {
  const { t } = useI18n();
  const phases = getLeaderIntegrationPhases();
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('memberLeader.integrationMap.title')}</h1>
        <p className="page-subtitle">{t('memberLeader.integrationMap.subtitle')}</p>
      </div>
      <div className="page-content">
        <div className="leader-integration-intro">
          <p>
            Guía de referencia para acompañar a nuevos conversos durante su primer año,
            basada en Predicad Mi Evangelio 2023 y el Manual General de la Iglesia.
          </p>
        </div>

        {phases.map((phase) => (
          <div key={phase.id} className="leader-phase-card">
            <div
              className="leader-phase-header"
              onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
            >
              <div>
                <h2>{phase.label}</h2>
                <p className="leader-phase-focus">{phase.focus}</p>
              </div>
              <span className="leader-expand-icon">
                {expandedPhase === phase.id ? '▼' : '▶'}
              </span>
            </div>

            {expandedPhase === phase.id && (
              <div className="leader-phase-content">
                <div className="leader-phase-objectives">
                  <h3>Objetivos principales</h3>
                  <ul>
                    {phase.objectives.map((objective, idx) => (
                      <li key={idx}>{objective}</li>
                    ))}
                  </ul>
                </div>

                <div className="leader-phase-actions">
                  <h3>Acciones sugeridas para líderes</h3>
                  <ul>
                    {phase.suggestedActionsForLeaders.map((action, idx) => (
                      <li key={idx}>{action}</li>
                    ))}
                  </ul>
                </div>

                <div className="leader-phase-scripture">
                  <h3>Base doctrinal</h3>
                  <ul>
                    {phase.scripturalBasis.map((scripture, idx) => (
                      <li key={idx}>{scripture}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

