import React from 'react';
import { Link } from 'react-router-dom';
import { StudyModule } from '../data/types';
import { buildSectionProgressId } from '../utils/progressIds';
import { useI18n } from '../../context/I18nContext';
import './StudyModuleCard.css';

interface StudyModuleCardProps {
  module: StudyModule;
  completedSectionIds: string[];
}

export const StudyModuleCard: React.FC<StudyModuleCardProps> = ({ module, completedSectionIds }) => {
  const { t } = useI18n();
  const estimatedMinutes = module.sections.reduce((sum, section) => sum + section.estimatedMinutes, 0);
  const totalSections = module.sections.length;
  const completedSections = module.sections.filter((section) =>
    completedSectionIds.includes(buildSectionProgressId(module.id, section.id)),
  ).length;
  const progressPercent = totalSections === 0 ? 0 : Math.round((completedSections / totalSections) * 100);

  return (
    <article className="study-module-card">
      <div className="study-module-header">
        <div className="study-module-header-content">
          <p className="study-module-level-tag">
            {t('memberStudy.moduleCard.levelRecommended', { level: module.levelRecommended }) || `Nivel recomendado ${module.levelRecommended}`}
          </p>
          <h3 className="study-module-title">{module.title}</h3>
          <p className="study-module-subtitle">{module.subtitle}</p>
        </div>
        <div className="study-module-minutes-tag">
          {estimatedMinutes} min
        </div>
      </div>

      <p className="study-module-description">{module.description}</p>

      <div className="study-module-progress">
        <div className="study-module-progress-text">
          <span>{t('memberStudy.moduleCard.progress') || 'Progreso'}</span>
          <span>
            {completedSections}/{totalSections} {t('memberStudy.moduleCard.sections') || 'secciones'}
          </span>
        </div>
        <div className="study-module-progress-bar-container">
          <div
            className="study-module-progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="study-module-footer">
        <Link
          to={`/member/study/${module.id}`}
          className="study-module-open-button"
        >
          {t('memberStudy.moduleCard.openModule') || 'Abrir módulo'}
          <span aria-hidden>→</span>
        </Link>
        <span className="study-module-total-minutes">
          {t('memberStudy.moduleCard.totalEstimatedMinutes', { minutes: estimatedMinutes }) || `Est. ${estimatedMinutes} min totales`}
        </span>
      </div>
    </article>
  );
};
