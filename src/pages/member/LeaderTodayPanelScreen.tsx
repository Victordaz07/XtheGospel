import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import {
  leaderTodayGroups,
  mockLeaderTodayTasks,
  LeaderTask
} from '../../data/leaderTodayTasks';
import '../../pages/Page.css';
import './LeaderScreens.css';

export const LeaderTodayPanelScreen: React.FC = () => {
  const { t } = useI18n();
  const [tasks, setTasks] = useState<LeaderTask[]>(mockLeaderTodayTasks);

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, isDone: !t.isDone } : t))
    );
  };

  const hasAnyTask = tasks.some(t => !t.isDone);

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('memberLeader.todayPanel.title')}</h1>
        <p className="page-subtitle">{t('memberLeader.todayPanel.subtitle')}</p>
      </div>
      <div className="page-content">
        {!hasAnyTask && (
          <div className="leader-empty-card">
            <p>{t('memberLeader.todayPanel.empty')}</p>
          </div>
        )}

        {leaderTodayGroups.map(group => {
          const groupTasks = tasks.filter(t => t.type === group.type);

          if (groupTasks.length === 0) return null;

          return (
            <div key={group.type} className="leader-group-card">
              <h2 className="leader-group-title">
                {t(group.titleKey)}
              </h2>

              {groupTasks.map(task => (
                <div
                  key={task.id}
                  className={`leader-task-row ${task.isDone ? 'leader-task-done' : ''}`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className="leader-task-left">
                    <div
                      className={`leader-checkbox ${task.isDone ? 'leader-checkbox-checked' : ''}`}
                    >
                      {task.isDone && <span className="leader-checkbox-mark">✓</span>}
                    </div>
                    <div className="leader-task-text">
                      <h3
                        className={`leader-task-name ${task.isDone ? 'leader-task-name-done' : ''}`}
                      >
                        {task.name}
                      </h3>
                      <p
                        className={`leader-task-description ${task.isDone ? 'leader-task-description-done' : ''}`}
                      >
                        {task.description}
                      </p>
                    </div>
                  </div>

                  <span className="leader-task-due">{task.dueLabel}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

