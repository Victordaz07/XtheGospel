import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import { memberActivities } from '../data/memberActivities';
import { memberStudyModules } from '../data/memberStudyModules';
import { ActivityRenderer } from '../components/ActivityRenderer';
import { MemberActivityCard } from '../components/MemberActivityCard';
import { CustomSelect } from '../components/CustomSelect';
import '../../pages/Page.css';
import './ActivitiesPage.css';

export const ActivitiesPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedModuleId, setSelectedModuleId] = useState<string>('all');
  const [activeActivityId, setActiveActivityId] = useState<string | null>(searchParams.get('activity'));

  const filteredActivities = useMemo(() => {
    return memberActivities.filter((activity) => selectedModuleId === 'all' || activity.moduleId === selectedModuleId);
  }, [selectedModuleId]);

  const groupedByType = useMemo(() => {
    return filteredActivities.reduce<Record<string, typeof memberActivities>>((acc, activity) => {
      if (!acc[activity.type]) acc[activity.type] = [];
      acc[activity.type].push(activity);
      return acc;
    }, {});
  }, [filteredActivities]);

  const activeActivity = memberActivities.find((activity) => activity.id === activeActivityId) ?? null;

  const handleModuleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModuleId(event.target.value);
  };

  const handleStartActivity = (activityId: string) => {
    setActiveActivityId(activityId);
    setSearchParams((params) => {
      params.set('activity', activityId);
      return params;
    });
  };

  const clearSelection = () => {
    setActiveActivityId(null);
    setSearchParams((params) => {
      params.delete('activity');
      return params;
    });
  };

  return (
    <div className="page">
      <button
        className="activities-back-button"
        onClick={() => navigate(-1)}
        aria-label={t('common.back') || 'Volver'}
      >
        <FaArrowLeft />
        <span>{t('common.back') || 'Volver'}</span>
      </button>

      <div className="page-content activities-page-content">
        <header className="activities-header-card">
          <div className="activities-header-content">
            <h1 className="activities-title">
              {t('member.activities.title') || 'Actividades interactivas'}
            </h1>
            <p className="activities-subtitle">
              {t('member.activities.subtitle') || 'Primero estudia, luego practica lo aprendido.'}
            </p>
          </div>
          <div className="activities-filter">
            <CustomSelect
              label={t('member.activities.filterByModule') || 'Filtrar por módulo'}
              value={selectedModuleId}
              onChange={(value) => setSelectedModuleId(value)}
              options={[
                { value: 'all', label: t('member.activities.allModules') || 'Todos los módulos' },
                ...memberStudyModules.map((module) => ({
                  value: module.id,
                  label: module.title,
                })),
              ]}
            />
          </div>
        </header>

        {activeActivity ? (
          <div className="activities-detail-container">
            <div className="activities-detail-header">
              <button
                type="button"
                onClick={clearSelection}
                className="activities-detail-back"
              >
                <FaArrowLeft />
                <span>{t('common.back') || 'Volver'}</span>
              </button>
            </div>
            <ActivityRenderer activity={activeActivity} />
          </div>
        ) : (
          <div className="activities-list-container">
            {Object.entries(groupedByType).map(([type, activities]) => (
              <section key={type} className="activities-type-section">
                <h2 className="activities-type-title">
                  {t(`member.activityTypes.${type}`) ?? type}
                </h2>
                <div className="activities-vertical-list">
                  {activities.map((activity) => (
                    <MemberActivityCard
                      key={activity.id}
                      activity={activity}
                      onStart={() => handleStartActivity(activity.id)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
