import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import { MemberSupportTask, MemberSupportTaskType, MemberSupportTaskStatus } from '../../data/memberTypes';
import {
  PageContainer,
  TopBar,
  Card,
  Section,
  ButtonPrimary,
  ButtonSecondary,
  IconButton,
} from '../../ui/components';
import { FaBell } from 'react-icons/fa6';
import '../learning/Page.css';
import './MemberHelpPanelScreen.css';

const MemberHelpPanelScreen: React.FC = () => {
  const { t } = useI18n();
  const [tasks, setTasks] = useState<MemberSupportTask[]>([]);

  // TODO: Load from service/Firestore
  useEffect(() => {
    // Mock data for now
    setTasks([]);
  }, []);

  const getTaskTypeLabel = (type: MemberSupportTaskType): string => {
    return t(`memberHelpPanel.taskTypes.${type}`);
  };

  const getStatusLabel = (status: MemberSupportTaskStatus): string => {
    return t(`memberHelpPanel.statuses.${status}`);
  };

  const handleOfferHelp = (taskId: string) => {
    setTasks(tasks.map(t =>
      t.id === taskId
        ? { ...t, status: 'claimed' as MemberSupportTaskStatus }
        : t
    ));
    // TODO: Save to service/Firestore
  };

  const handleMarkCompleted = (taskId: string) => {
    setTasks(tasks.map(t =>
      t.id === taskId
        ? { ...t, status: 'completed' as MemberSupportTaskStatus }
        : t
    ));
    // TODO: Save to service/Firestore
  };

  const filteredTasks = tasks.filter(t => t.status !== 'completed');

  return (
    <PageContainer>
      <TopBar
        title={t('memberHelpPanel.header.title')}
        subtitle={t('memberHelpPanel.header.subtitle')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        {filteredTasks.length === 0 ? (
          <Card variant="outlined" className="member-help-panel-empty">
            <h3 className="empty-title">{t('memberHelpPanel.list.emptyTitle')}</h3>
            <p className="empty-description">{t('memberHelpPanel.list.emptyDescription')}</p>
          </Card>
        ) : (
          <Section title={t('memberHelpPanel.header.title')}>
            <div className="member-help-tasks-list">
              {filteredTasks.map((task) => (
                <Card key={task.id} variant="default" className="member-help-task-card">
                  <div className="task-header">
                    <div className="task-type-badge">{getTaskTypeLabel(task.type)}</div>
                    <div className={`task-status-badge task-status-${task.status}`}>
                      {getStatusLabel(task.status)}
                    </div>
                  </div>
                  <p className="task-description">{task.description}</p>
                  {task.investigatorAlias && (
                    <p className="task-investigator">
                      {t('memberHelpPanel.taskCard.labelInvestigator', { alias: task.investigatorAlias })}
                    </p>
                  )}
                  {task.scheduledAt && (
                    <p className="task-scheduled">
                      📅 {new Date(task.scheduledAt).toLocaleString()}
                    </p>
                  )}
                  <div className="task-actions">
                    {task.status === 'open' && (
                      <ButtonPrimary onClick={() => handleOfferHelp(task.id)}>
                        {t('memberHelpPanel.taskCard.buttonOfferHelp')}
                      </ButtonPrimary>
                    )}
                    {task.status === 'open' && (
                      <ButtonSecondary onClick={() => {
                        // TODO: Implement "maybe" functionality
                      }}>
                        {t('memberHelpPanel.taskCard.buttonMaybe')}
                      </ButtonSecondary>
                    )}
                    {task.status === 'claimed' && (
                      <ButtonPrimary onClick={() => handleMarkCompleted(task.id)}>
                        {t('memberHelpPanel.taskCard.buttonMarkCompleted')}
                      </ButtonPrimary>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        )}
      </div>
    </PageContainer>
  );
};

export default MemberHelpPanelScreen;

