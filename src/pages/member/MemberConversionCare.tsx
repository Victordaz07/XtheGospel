import React, { useMemo } from 'react';
import '../Page.css';
import './MemberConversionCare.css';
import { useI18n } from '../../context/I18nContext';
import { getMemberConversionCareDeepData } from '../../utils/memberData';

const MemberConversionCare: React.FC = () => {
  const { t } = useI18n();
  const care = useMemo(() => getMemberConversionCareDeepData(t), [t]);

  return (
    <div className="page conversion-care-page">
      <div className="page-header">
        <h1>{care.title}</h1>
        <p className="page-subtitle">{care.subtitle}</p>
      </div>
      <div className="page-content conversion-care-content">
        <section className="conversion-card">
          <h2>{care.subtitle}</h2>
          <p>{care.intro.summary}</p>
          <div className="conversion-layout">
            <div>
              <h3>{t('member.conversionCare.memberGuide.sections.0.title')}</h3>
              <ul className="conversion-bullets">
                {care.intro.doctrinalPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="scripture-grid">
              {care.intro.scriptures.map((scripture, index) => (
                <div key={index} className="scripture-card">
                  <strong>{scripture.ref}</strong>
                  <p>{scripture.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="conversion-card">
          <h2>{care.memberGuide.title}</h2>
          <div className="guide-grid">
            {care.memberGuide.sections.map(section => (
              <div key={section.id} className="guide-section">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
                {section.items.map((item, index) => (
                  <div key={index} className="guide-item">
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                    {item.practices && (
                      <ul className="conversion-bullets">
                        {item.practices.map((practice, idx) => (
                          <li key={idx}>{practice}</li>
                        ))}
                      </ul>
                    )}
                    {item.steps && (
                      <ol className="conversion-steps">
                        {item.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="conversion-card">
          <h2>{care.auxiliaryGuide.title}</h2>
          <p>{care.auxiliaryGuide.description}</p>
          <div className="aux-grid">
            {care.auxiliaryGuide.organizations.map(org => (
              <div key={org.id} className="aux-card">
                <h3>{org.name}</h3>
                <p className="aux-focus">{org.focus}</p>
                <ul className="conversion-bullets">
                  {org.ideas.map((idea, index) => (
                    <li key={index}>{idea}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="conversion-card">
          <h2>{care.callings.title}</h2>
          <p>{care.callings.description}</p>
          <div className="callings-grid">
            <div>
              <h3>{t('member.conversionCare.callingsForNewMembers.principlesTitle') || 'Principios'}</h3>
              <ul className="conversion-bullets">
                {care.callings.principles.map((principle, index) => (
                  <li key={index}>{principle}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{t('member.conversionCare.callingsForNewMembers.goodCallingsTitle') || 'Buenos llamamientos'}</h3>
              <ul className="conversion-bullets">
                {care.callings.goodCallings.map((call, index) => (
                  <li key={index}>{call}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{t('member.conversionCare.callingsForNewMembers.callingsToDelayTitle') || 'Evitar por ahora'}</h3>
              <ul className="conversion-bullets">
                {care.callings.callingsToDelay.map((call, index) => (
                  <li key={index}>{call}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="conversion-card">
          <h2>{care.priesthoodPath.title}</h2>
          <p>{care.priesthoodPath.description}</p>
          <div className="priesthood-grid">
            {[care.priesthoodPath.aaronic, care.priesthoodPath.melchizedek].map(track => (
              <div key={track.title} className="priesthood-card">
                <h3>{track.title}</h3>
                <h4>{t('member.conversionCare.priesthoodPath.objectivesTitle') || 'Objetivos'}</h4>
                <ul className="conversion-bullets">
                  {track.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
                {track.lessons.map((lesson, index) => (
                  <div key={index} className="lesson-block">
                    <h5>{lesson.title}</h5>
                    <ul className="conversion-bullets">
                      {lesson.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="conversion-card">
          <h2>{care.templePreparation.title}</h2>
          <p>{care.templePreparation.description}</p>
          <div className="temple-grid">
            <div>
              <h3>{t('member.conversionCare.templePreparation.topicsTitle') || 'Temas clave'}</h3>
              <ul className="conversion-bullets">
                {care.templePreparation.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
            <div className="first-visit-card">
              <h3>{care.templePreparation.firstVisit.title}</h3>
              <ul className="conversion-bullets">
                {care.templePreparation.firstVisit.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="conversion-card">
          <h2>{care.conversionFlow.title}</h2>
          <p>{care.conversionFlow.description}</p>
          <div className="flow-steps">
            {care.conversionFlow.steps.map(step => (
              <div key={step.id} className="flow-step">
                <div className="flow-step-id">{step.title}</div>
                <p>{step.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MemberConversionCare;
