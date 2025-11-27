import React, { useMemo, useState } from 'react';
import '../Page.css';
import { useI18n } from '../../context/I18nContext';
import { getMemberSkillSections } from '../../utils/memberData';

const MemberSkills: React.FC = () => {
  const { t } = useI18n();
  const sections = useMemo(() => getMemberSkillSections(t), [t]);
  const [expanded, setExpanded] = useState<string | null>(
    sections[0]?.id || null,
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('member.skills.title')}</h1>
        <p className="page-subtitle">{t('member.skills.intro')}</p>
      </div>
      <div className="page-content">
        {sections.map(section => {
          const isExpanded = expanded === section.id;
          return (
            <div key={section.id} className="baptism-section-card">
              <div
                className="baptism-section-header"
                onClick={() => setExpanded(isExpanded ? null : section.id)}
              >
                <div>
                  <h2>{section.title}</h2>
                  <p>{section.summary}</p>
                </div>
                <span className="section-toggle">{isExpanded ? '▼' : '▶'}</span>
              </div>
              {isExpanded && (
                <div className="baptism-section-content">
                  <p>{section.content}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemberSkills;
