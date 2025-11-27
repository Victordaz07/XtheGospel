import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { getMemberSkillSections } from '../../utils/memberData';
import './MemberComponents.css';

/**
 * Skills preview component
 * Shows a summary of available missionary skills with links to full content
 */
export const MemberSkillsPreview: React.FC = () => {
  const { t } = useI18n();
  const sections = useMemo(() => getMemberSkillSections(t), [t]);

  // Show first 3 skills as preview
  const previewSections = sections.slice(0, 3);

  return (
    <div className="member-skills-preview">
      <div className="preview-header">
        <h2>{t('member.skills.title')}</h2>
        <p className="preview-intro">{t('member.skills.intro')}</p>
      </div>
      <div className="skills-preview-list">
        {previewSections.map((section) => (
          <div key={section.id} className="skill-preview-item">
            <h3>{section.title}</h3>
            <p>{section.summary}</p>
          </div>
        ))}
      </div>
      <Link to="/member/skills" className="btn-primary">
        {t('member.home.cards.study.cta')}
      </Link>
    </div>
  );
};

