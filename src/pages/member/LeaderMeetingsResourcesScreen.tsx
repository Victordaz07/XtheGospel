import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { meetingTemplates, quickResources } from '../../data/leaderMeetingsResources';
import { convertPath12Weeks } from '../../data/leader/convertPath12Weeks';
import '../../pages/Page.css';
import './LeaderScreens.css';

export const LeaderMeetingsResourcesScreen: React.FC = () => {
  const { t } = useI18n();
  const location = useLocation();
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
          <h2>{t('memberLeader.meetingsResources.sections.templates') || 'Plantillas de Reunión'}</h2>
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
          <h2>{t('memberLeader.meetingsResources.sections.quickResources') || 'Recursos rápidos'}</h2>
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

        {/* Convert Path 12 Weeks Section */}
        <div className="leader-section-header" style={{ marginTop: '24px' }}>
          <h2>Guías extensas</h2>
        </div>

        <div className="leader-template-card">
          <div className="leader-template-header">
            <div style={{ flex: 1 }}>
              <h3>{convertPath12Weeks.title}</h3>
              <p>{convertPath12Weeks.description}</p>
            </div>
            <Link
              to={location.pathname.includes('/member/') 
                ? '/member/leader/meetings/convert-path' 
                : '/leader/meetings/convert-path'}
              className="leader-button-small"
              style={{ 
                textDecoration: 'none', 
                display: 'inline-block',
                whiteSpace: 'nowrap',
                marginLeft: '12px'
              }}
            >
              Ver guía completa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

