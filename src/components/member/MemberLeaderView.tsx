import React from 'react';
import { useI18n } from '../../context/I18nContext';
import './MemberLeaderView.css';

export const MemberLeaderView: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="member-leader-view">
      <div className="page-header">
        <h1>{t('member.leader.home.title')}</h1>
        <p className="page-subtitle">{t('member.leader.home.welcomeSubtitle')}</p>
      </div>

      <div className="page-content">
        {/* Hero Section */}
        <div className="hero-card">
          <h2>{t('member.leader.home.welcomeTitle')}</h2>
          <p>{t('member.leader.home.welcomeSubtitle')}</p>
        </div>

        {/* Vision Section */}
        <div className="leader-section">
          <h2>{t('member.leader.vision.title')}</h2>
          
          <div className="leader-subsection">
            <h3>{t('member.leader.vision.doctrine.title')}</h3>
            <ul className="leader-points">
              {[0, 1, 2].map((index) => {
                const key = `member.leader.vision.doctrine.points.${index}`;
                const point = t(key);
                // Only render if translation exists (not just the key)
                if (point === key) return null;
                return <li key={index}>{point}</li>;
              })}
            </ul>
            <div className="scriptures-block">
              <strong>{t('member.leader.vision.doctrine.keyScriptures')}</strong>
              <ul className="scriptures-list">
                {[0, 1, 2, 3].map((index) => {
                  const key = `member.leader.vision.doctrine.keyScripturesList.${index}`;
                  const scripture = t(key);
                  if (scripture === key) return null;
                  return <li key={index}>{scripture}</li>;
                })}
              </ul>
            </div>
          </div>

          <div className="leader-subsection">
            <h3>{t('member.leader.vision.practical.title')}</h3>
            <ul className="leader-steps">
              {[0, 1, 2, 3].map((index) => {
                const key = `member.leader.vision.practical.steps.${index}`;
                const step = t(key);
                if (step === key) return null;
                return <li key={index}>{step}</li>;
              })}
            </ul>
          </div>
        </div>

        {/* Coordination Section */}
        <div className="leader-section">
          <h2>{t('member.leader.coordination.title')}</h2>
          
          <div className="leader-subsection">
            <h3>{t('member.leader.coordination.principles.title')}</h3>
            <ul className="leader-points">
              {[0, 1, 2].map((index) => {
                const key = `member.leader.coordination.principles.points.${index}`;
                const point = t(key);
                if (point === key) return null;
                return <li key={index}>{point}</li>;
              })}
            </ul>
          </div>

          <div className="leader-subsection">
            <h3>{t('member.leader.coordination.coordinationMeetings.title')}</h3>
            <ol className="leader-steps">
              {[0, 1, 2, 3, 4].map((index) => {
                const key = `member.leader.coordination.coordinationMeetings.suggestedAgenda.${index}`;
                const item = t(key);
                if (item === key) return null;
                return <li key={index}>{item}</li>;
              })}
            </ol>
          </div>
        </div>

        {/* Convert Care Section */}
        <div className="leader-section">
          <h2>{t('member.leader.convertCare.title')}</h2>
          
          <div className="leader-subsection">
            <h3>{t('member.leader.convertCare.risks.title')}</h3>
            <ul className="leader-points">
              {[0, 1, 2].map((index) => {
                const key = `member.leader.convertCare.risks.points.${index}`;
                const point = t(key);
                if (point === key) return null;
                return <li key={index}>{point}</li>;
              })}
            </ul>
          </div>

          <div className="leader-subsection">
            <h3>{t('member.leader.convertCare.bestPractices.title')}</h3>
            <ul className="leader-points">
              {[0, 1, 2].map((index) => {
                const key = `member.leader.convertCare.bestPractices.points.${index}`;
                const point = t(key);
                if (point === key) return null;
                return <li key={index}>{point}</li>;
              })}
            </ul>
          </div>
        </div>

        {/* Dashboard Ideas Section */}
        <div className="leader-section">
          <h2>{t('member.leader.dashboardIdeas.title')}</h2>
          <p className="leader-explanation">{t('member.leader.dashboardIdeas.explanation')}</p>
          <ul className="leader-points">
            {[0, 1, 2, 3].map((index) => {
              const key = `member.leader.dashboardIdeas.examples.${index}`;
              const example = t(key);
              if (example === key) return null;
              return <li key={index}>{example}</li>;
            })}
          </ul>
          <p className="leader-note">{t('member.leader.dashboardIdeas.note')}</p>
        </div>
      </div>
    </div>
  );
};

