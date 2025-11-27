import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { memberStudyModules } from '../data/memberStudyModules';
import { useMemberProgressStore } from '../state/memberProgressStore';
import { StudyModuleCard } from '../components/StudyModuleCard';
import { useI18n } from '../../context/I18nContext';
import './StudyModulesPage.css';

export const StudyModulesPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const completedSections = useMemberProgressStore((state) => state.completedStudySectionIds);

  const orderedModules = useMemo(
    () =>
      [...memberStudyModules].sort((a, b) => {
        if (a.levelRecommended === b.levelRecommended) return a.title.localeCompare(b.title);
        return a.levelRecommended - b.levelRecommended;
      }),
    [],
  );

  return (
    <div className="page">
      <button
        className="study-modules-back-button"
        onClick={() => navigate(-1)}
        aria-label={t('common.back') || 'Volver'}
      >
        <FaArrowLeft />
        <span>{t('common.back') || 'Volver'}</span>
      </button>
      <div className="page-content study-modules-page-content">
        <header className="study-modules-header">
          <p className="study-modules-category">
            {t('memberStudy.header.category') || 'Estudio profundo'}
          </p>
          <h1 className="study-modules-title">
            {t('memberStudy.header.title') || 'Módulos reveladores para miembros'}
          </h1>
          <p className="study-modules-description">
            {t('memberStudy.header.description') || 'Empieza por el módulo que responda mejor a tu rol actual en la obra. Lee con calma, medita y toma notas. Marca cada sección estudiada para ver tu avance.'}
          </p>
        </header>

        <div className="study-modules-grid">
          {orderedModules.map((module) => (
            <StudyModuleCard key={module.id} module={module} completedSectionIds={completedSections} />
          ))}
        </div>
      </div>
    </div>
  );
};

