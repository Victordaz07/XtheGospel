import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import './Page.css';
import './BaptismPage.css';

const InvestigatorBaptism: React.FC = () => {
  const { t } = useI18n();
  const [expandedSection, setExpandedSection] = useState<string | null>('section1');

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const sections = [
    {
      id: 'section1',
      titleKey: 'baptism.section1.title',
      contentKey: 'baptism.section1.content',
    },
    {
      id: 'section2',
      titleKey: 'baptism.section2.title',
      contentKey: 'baptism.section2.content',
    },
    {
      id: 'section3',
      titleKey: 'baptism.section3.title',
      contentKey: 'baptism.section3.content',
    },
    {
      id: 'section4',
      titleKey: 'baptism.section4.title',
      contentKey: 'baptism.section4.content',
    },
    {
      id: 'section5',
      titleKey: 'baptism.section5.title',
      contentKey: 'baptism.section5.content',
    },
  ];

  const actionSteps = [
    {
      id: 'schedule',
      icon: '🗓️',
      titleKey: 'baptism.actionSteps.schedule.title',
      descriptionKey: 'baptism.actionSteps.schedule.description',
    },
    {
      id: 'sacrament',
      icon: '⛪',
      titleKey: 'baptism.actionSteps.attendSacrament.title',
      descriptionKey: 'baptism.actionSteps.attendSacrament.description',
    },
    {
      id: 'study',
      icon: '📖',
      titleKey: 'baptism.actionSteps.dailyStudy.title',
      descriptionKey: 'baptism.actionSteps.dailyStudy.description',
    },
    {
      id: 'invite',
      icon: '🤝',
      titleKey: 'baptism.actionSteps.inviteSupport.title',
      descriptionKey: 'baptism.actionSteps.inviteSupport.description',
    },
    {
      id: 'logistics',
      icon: '🎒',
      titleKey: 'baptism.actionSteps.prepareLogistics.title',
      descriptionKey: 'baptism.actionSteps.prepareLogistics.description',
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('tabs.baptism')}</h1>
        <p>{t('baptism.subtitle') || 'Preparación para el bautismo'}</p>
      </div>
      <div className="page-content">
        {sections.map((section) => {
          const isExpanded = expandedSection === section.id;
          return (
            <div key={section.id} className="baptism-section-card">
              <div
                className="baptism-section-header"
                onClick={() => toggleSection(section.id)}
              >
                <h2>{t(section.titleKey)}</h2>
                <span className="section-toggle">{isExpanded ? '▼' : '▶'}</span>
              </div>
              {isExpanded && (
                <div className="baptism-section-content">
                  <p>{t(section.contentKey)}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Actionable steps */}
        <div className="baptism-action-steps">
          <div className="action-steps-header">
            <h2>{t('baptism.actionSteps.title')}</h2>
            <p>{t('baptism.actionSteps.subtitle')}</p>
          </div>
          <div className="action-steps-grid">
            {actionSteps.map((step) => (
              <div key={step.id} className="action-step-card">
                <div className="action-step-icon">{step.icon}</div>
                <div className="action-step-content">
                  <h3>{t(step.titleKey)}</h3>
                  <p>{t(step.descriptionKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigatorBaptism;
