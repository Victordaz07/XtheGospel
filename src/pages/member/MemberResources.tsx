import React, { useMemo } from 'react';
import '../Page.css';
import { useI18n } from '../../context/I18nContext';
import { getMemberResourcesData } from '../../utils/memberData';

const MemberResources: React.FC = () => {
  const { t } = useI18n();
  const resources = useMemo(() => getMemberResourcesData(t), [t]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('member.resources.title')}</h1>
        <p className="page-subtitle">{t('member.resources.intro')}</p>
      </div>
      <div className="page-content">
        <div className="profile-card">
          <h2>{t('member.resources.title')}</h2>
          {resources.scriptureGroups.map(group => (
            <div key={group.title} className="profile-section">
              <h3>{group.title}</h3>
              <ul>
                {group.references.map(reference => (
                  <li key={reference}>{reference}</li>
                ))}
              </ul>
              <p>{group.comment}</p>
            </div>
          ))}
        </div>

        <div className="profile-card">
          <h2>{t('member.resources.propheticQuotesTitle')}</h2>
          {resources.propheticQuotes.map(quote => (
            <blockquote key={quote.label}>
              <strong>{quote.label}</strong>
              <p>{quote.text}</p>
              <small>{quote.usage}</small>
            </blockquote>
          ))}
        </div>

        <div className="profile-card">
          <h2>{t('member.resources.familyIdeasTitle')}</h2>
          <ul>
            {resources.familyIdeas.map((idea, index) => (
              <li key={index}>{idea}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemberResources;
