import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import { ActionPlan } from '../../data/memberLeadershipTypes';
import { MemberLeadershipService } from '../../services/memberLeadershipService';
import {
  PageContainer,
  TopBar,
  Card,
  Section,
  ButtonPrimary,
  IconButton,
  ProgressBar,
} from '../../ui/components';
import { FaBell, FaPlus, FaCircleCheck } from 'react-icons/fa6';
import '../../pages/learning/Page.css';
import './LeadershipActionPlanScreen.css';

const LeadershipActionPlanScreen: React.FC = () => {
  const { t } = useI18n();
  const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActionPlan();
  }, []);

  const loadActionPlan = async () => {
    try {
      setLoading(true);
      const data = await MemberLeadershipService.getActionPlan();
      setActionPlan(data);
    } catch (error) {
      console.error('Error loading action plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'onTrack': return '#10b981';
      case 'atRisk': return '#f59e0b';
      case 'completed': return '#3b82f6';
      case 'delayed': return '#ef4444';
      default: return 'var(--color-text-secondary)';
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <TopBar
          title={t('leadershipActionPlan.title')}
          rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
        />
        <div className="page-content">
          <Card variant="default">
            <p>{t('common.errorLoading')}...</p>
          </Card>
        </div>
      </PageContainer>
    );
  }

  if (!actionPlan) {
    return (
      <PageContainer>
        <TopBar
          title={t('leadershipActionPlan.title')}
          rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
        />
        <div className="page-content">
          <Card variant="default">
            <p>{t('common.errorLoading')}</p>
          </Card>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <TopBar
        title={t('leadershipActionPlan.title')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        <Section title={t('leadershipActionPlan.objectives')}>
          <div className="objectives-list">
            {actionPlan.objectives.map((obj) => {
              const progress = (obj.current / obj.target) * 100;
              return (
                <Card key={obj.id} variant="default" className="objective-card">
                  <div className="objective-header">
                    <h3 className="objective-title">{obj.title}</h3>
                    <span
                      className="objective-status"
                      style={{ color: getStatusColor(obj.status) }}
                    >
                      {t(`leadershipActionPlan.status.${obj.status}`)}
                    </span>
                  </div>
                  <div className="objective-progress">
                    <div className="progress-info">
                      <span>{obj.current} / {obj.target}</span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                    <ProgressBar value={progress} variant="primary" size="md" />
                  </div>
                </Card>
              );
            })}
          </div>
          <ButtonPrimary onClick={() => alert('TODO: Add objective')} className="add-button">
            <FaPlus /> {t('leadershipActionPlan.addObjective')}
          </ButtonPrimary>
        </Section>

        <Section title={t('leadershipActionPlan.weeklyActions')}>
          <div className="actions-list">
            {actionPlan.weeklyActions.map((action) => (
              <Card key={action.id} variant="outlined" className="action-card">
                <div className="action-header">
                  <div className="action-info">
                    <h4 className="action-title">{action.title}</h4>
                    <p className="action-description">{action.description}</p>
                    {action.assignedTo && (
                      <span className="action-assigned">Asignado a: {action.assignedTo}</span>
                    )}
                  </div>
                  {action.completed && (
                    <FaCircleCheck className="action-completed-icon" />
                  )}
                </div>
              </Card>
            ))}
          </div>
          <ButtonPrimary onClick={() => alert('TODO: Add action')} className="add-button">
            <FaPlus /> {t('leadershipActionPlan.addAction')}
          </ButtonPrimary>
        </Section>
      </div>
    </PageContainer>
  );
};

export default LeadershipActionPlanScreen;

