import React from 'react';
import { useI18n } from '../../context/I18nContext';
import {
  getLeaderGuidelines,
  getLeaderBehavior,
  getLeaderSafeNotesSystem,
} from '../../data/leader';
import '../../pages/Page.css';
import './LeaderScreens.css';

export const LeaderGuidelinesScreen: React.FC = () => {
  const { t } = useI18n();
  const guidelines = getLeaderGuidelines();
  const behavior = getLeaderBehavior();
  const notesSystem = getLeaderSafeNotesSystem();

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('memberLeader.guidelines.title')}</h1>
        <p className="page-subtitle">{t('memberLeader.guidelines.subtitle')}</p>
      </div>
      <div className="page-content">
        <div className="leader-guidelines-section">
          <h2>Propósito</h2>
          <p>{guidelines.purpose}</p>
        </div>

        <div className="leader-guidelines-section">
          <h2>Quién debe usar este modo</h2>
          <ul>
            {guidelines.whoShouldUseThisMode.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="leader-guidelines-section">
          <h2>Fuentes de autoridad</h2>
          <ul>
            {guidelines.authoritySources.map((source, idx) => (
              <li key={idx}>{source}</li>
            ))}
          </ul>
        </div>

        <div className="leader-guidelines-section">
          <h2>Principios que rigen este modo</h2>
          <ul>
            {guidelines.principles.map((principle, idx) => (
              <li key={idx}>{principle}</li>
            ))}
          </ul>
        </div>

        <div className="leader-guidelines-section">
          <h2>Confidencialidad y límites</h2>
          <p className="leader-guidelines-summary">{guidelines.confidentiality.summary}</p>

          <h3>Referencias del Manual General</h3>
          <ul>
            {guidelines.confidentiality.handbookReferences.map((ref, idx) => (
              <li key={idx}>{ref}</li>
            ))}
          </ul>

          <h3>No registrar nunca en la app</h3>
          <ul className="leader-forbidden-list">
            {guidelines.confidentiality.doNotStore.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3>Ejemplos de notas apropiadas</h3>
          <ul className="leader-allowed-list">
            {guidelines.confidentiality.allowedNotesExamples.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>

        <div className="leader-guidelines-section">
          <h2>Código de conducta del líder</h2>
          <ul>
            {behavior.codeOfConduct.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3>Frases que debemos usar</h3>
          <ul className="leader-allowed-list">
            {behavior.phrasesToUse.map((phrase, idx) => (
              <li key={idx}>{phrase}</li>
            ))}
          </ul>

          <h3>Frases que debemos evitar</h3>
          <ul className="leader-forbidden-list">
            {behavior.phrasesToAvoid.map((phrase, idx) => (
              <li key={idx}>{phrase}</li>
            ))}
          </ul>
        </div>

        <div className="leader-guidelines-section">
          <h2>Sistema de notas seguras</h2>
          <p>
            Formato: <strong>{notesSystem.template.format}</strong>
          </p>
          <p className="leader-example">Ejemplo: {notesSystem.template.example}</p>

          <h3>Notas permitidas</h3>
          <ul className="leader-allowed-list">
            {notesSystem.allowedNotes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>

          <h3>Notas prohibidas</h3>
          <ul className="leader-forbidden-list">
            {notesSystem.forbiddenNotes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>

        <div className="leader-guidelines-disclaimer">
          <h2>Aviso importante</h2>
          <p>{guidelines.disclaimerText}</p>
        </div>
      </div>
    </div>
  );
};

