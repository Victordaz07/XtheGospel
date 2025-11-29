import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { meetingTemplates, quickResources } from '../../data/leaderMeetingsResources';
import '../../pages/Page.css';
import './LeaderScreens.css';

export const LeaderMeetingsResourcesScreen: React.FC = () => {
  const { t } = useI18n();
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [expandedResource, setExpandedResource] = useState<string | null>(null);

  const formatContent = (content: string) => {
    return content.split('\n').map((line, idx) => (
      <React.Fragment key={idx}>
        {line}
        {idx < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('memberLeader.meetingsResources.title')}</h1>
        <p className="page-subtitle">{t('memberLeader.meetingsResources.subtitle')}</p>
      </div>
      <div className="page-content">
        {/* Meeting Templates Section */}
        <div className="leader-section-header">
          <h2>Plantillas de Reunión</h2>
        </div>

        {meetingTemplates.map(template => (
          <div key={template.id} className="leader-template-card">
            <div
              className="leader-template-header"
              onClick={() => setExpandedTemplate(
                expandedTemplate === template.id ? null : template.id
              )}
            >
              <div>
                <h3>{t(template.titleKey)}</h3>
                <p>{t(template.subtitleKey)}</p>
              </div>
              <span className="leader-expand-icon">
                {expandedTemplate === template.id ? '▼' : '▶'}
              </span>
            </div>

            {expandedTemplate === template.id && (
              <div className="leader-template-content">
                {formatContent(t(template.contentKey))}
              </div>
            )}
          </div>
        ))}

        {/* Quick Resources Section */}
        <div className="leader-section-header" style={{ marginTop: '24px' }}>
          <h2>Recursos rápidos</h2>
        </div>

        {quickResources.map(resource => (
          <div key={resource.id} className="leader-resource-card">
            <div
              className="leader-resource-header"
              onClick={() => setExpandedResource(
                expandedResource === resource.id ? null : resource.id
              )}
            >
              <h3>{t(resource.titleKey)}</h3>
              <span className="leader-expand-icon">
                {expandedResource === resource.id ? '▼' : '▶'}
              </span>
            </div>

            {expandedResource === resource.id && (
              <div className="leader-resource-content">
                {formatContent(t(resource.contentKey))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

