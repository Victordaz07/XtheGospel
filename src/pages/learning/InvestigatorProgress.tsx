import React, { useState, useEffect } from 'react';
import { FaBookOpen, FaCircleCheck } from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import { useProgress } from '../../context/ProgressContext';
import { CommitmentsService } from '../../services/commitmentsService';
import { BaptismChecklistService, BaptismChecklist } from '../../services/baptismChecklistService';
import './Page.css';
import './ProgressPage.css';

const InvestigatorProgress: React.FC = () => {
  const { t } = useI18n();
  const { progress, getOverallProgress } = useProgress();
  const [commitmentsCompleted, setCommitmentsCompleted] = useState(0);
  const [checklist, setChecklist] = useState<BaptismChecklist>({ items: {} });

  useEffect(() => {
    loadCommitmentsStats();
    loadChecklist();
  }, []);

  const loadCommitmentsStats = async () => {
    const commitments = await CommitmentsService.loadCommitments();
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    const completedThisWeek = commitments.filter(c => {
      if (!c.completed) return false;
      const completedDate = new Date(c.createdAt);
      return completedDate >= thisWeek;
    }).length;
    setCommitmentsCompleted(completedThisWeek);
  };

  const loadChecklist = () => {
    setChecklist(BaptismChecklistService.loadChecklist());
  };

  const toggleChecklistItem = (itemId: string) => {
    BaptismChecklistService.toggleItem(itemId);
    loadChecklist();
  };

  const overallProgress = getOverallProgress();
  const completedLessons = overallProgress.completedLessons;
  const totalLessons = overallProgress.totalLessons;
  const progressPercent = overallProgress.percentage;

  const checklistItems = [
    {
      id: 'learnedAboutChrist',
      key: 'progress.checklist.learnedAboutChrist',
    },
    {
      id: 'prayedToKnow',
      key: 'progress.checklist.prayedToKnow',
    },
    {
      id: 'keepingCommandments',
      key: 'progress.checklist.keepingCommandments',
    },
    {
      id: 'talkedAboutInterview',
      key: 'progress.checklist.talkedAboutInterview',
    },
    {
      id: 'readyForCovenants',
      key: 'progress.checklist.readyForCovenants',
    },
  ];

  const completedChecklistItems = BaptismChecklistService.getCompletedCount();

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('progress.title')}</h1>
      </div>
      <div className="page-content">
        {/* Métricas básicas */}
        <div className="progress-metrics">
          <div className="metric-card">
            <div className="metric-icon metric-icon-violet">
              <FaBookOpen />
            </div>
            <div className="metric-content">
              <h3>{t('progress.lessonsCompleted')}</h3>
              <p className="metric-value">{completedLessons} {t('progress.of')} {totalLessons}</p>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon metric-icon-green">
              <FaCircleCheck />
            </div>
            <div className="metric-content">
              <h3>{t('progress.commitmentsThisWeek')}</h3>
              <p className="metric-value">{commitmentsCompleted}</p>
            </div>
          </div>
        </div>

        {/* Barra de progreso general */}
        <div className="progress-card">
          <h2>{t('progress.general')}</h2>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressPercent}%` }}>
              {progressPercent}%
            </div>
          </div>
          <p className="progress-description">
            {t('progress.description') || 'Tu progreso general en las lecciones'}
          </p>
        </div>

        {/* Checklist de preparación bautismal */}
        <div className="baptism-checklist-card">
          <h2>{t('progress.baptismChecklist') || 'Preparación para el Bautismo'}</h2>
          <p className="checklist-subtitle">
            {t('progress.checklistSubtitle') || `${completedChecklistItems} de ${checklistItems.length} completados`}
          </p>
          <div className="checklist-items">
            {checklistItems.map((item) => {
              const checklistItem = checklist.items[item.id];
              const isCompleted = checklistItem?.completed || false;
              
              return (
                <div
                  key={item.id}
                  className={`checklist-item ${isCompleted ? 'completed' : ''}`}
                  onClick={() => toggleChecklistItem(item.id)}
                >
                  <div className="checklist-checkbox">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => toggleChecklistItem(item.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="checklist-label">
                    {t(item.key)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigatorProgress;
