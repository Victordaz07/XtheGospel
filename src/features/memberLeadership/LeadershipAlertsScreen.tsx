import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import { LeadershipAlert } from '../../data/memberLeadershipTypes';
import { MemberLeadershipService } from '../../services/memberLeadershipService';
import {
  PageContainer,
  TopBar,
  Card,
  Section,
  IconButton,
  ButtonSecondary,
  EmptyState,
} from '../../ui/components';
import { FaBell, FaTriangleExclamation } from 'react-icons/fa6';
import '../../pages/learning/Page.css';
import './LeadershipAlertsScreen.css';

const LeadershipAlertsScreen: React.FC = () => {
  const { t } = useI18n();
  const [alerts, setAlerts] = useState<LeadershipAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const data = await MemberLeadershipService.getAlerts();
      setAlerts(data);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.type === filter);

  const getAlertTypeClass = (type: string) => {
    return `alert-card alert-card--${type}`;
  };

  if (loading) {
    return (
      <PageContainer>
        <TopBar
          title={t('leadershipAlerts.title')}
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

  return (
    <PageContainer>
      <TopBar
        title={t('leadershipAlerts.title')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        {alerts.length === 0 ? (
          <EmptyState
            title="No hay alertas"
            description="No hay alertas activas en este momento."
            icon={<FaTriangleExclamation />}
          />
        ) : (
          <>
            <Section title={t('leadershipAlerts.title')}>
              <div className="alerts-filters">
                <button
                  className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  Todos
                </button>
                <button
                  className={`filter-button ${filter === 'high' ? 'active' : ''}`}
                  onClick={() => setFilter('high')}
                >
                  {t('leadershipAlerts.types.high')}
                </button>
                <button
                  className={`filter-button ${filter === 'medium' ? 'active' : ''}`}
                  onClick={() => setFilter('medium')}
                >
                  {t('leadershipAlerts.types.medium')}
                </button>
                <button
                  className={`filter-button ${filter === 'low' ? 'active' : ''}`}
                  onClick={() => setFilter('low')}
                >
                  {t('leadershipAlerts.types.low')}
                </button>
              </div>
            </Section>

            <Section>
              <div className="alerts-list">
                {filteredAlerts.map((alert) => (
                  <Card
                    key={alert.id}
                    variant="default"
                    className={getAlertTypeClass(alert.type)}
                  >
                    <div className="alert-header">
                      <div className="alert-icon-wrapper">
                        <FaTriangleExclamation className="alert-icon" />
                      </div>
                      <div className="alert-content">
                        <h3 className="alert-title">{alert.title}</h3>
                        <p className="alert-description">{alert.description}</p>
                        {alert.suggestedActions.length > 0 && (
                          <div className="alert-actions">
                            {alert.suggestedActions.map((action, idx) => (
                              <ButtonSecondary
                                key={idx}
                                onClick={() => alert(`TODO: ${action}`)}
                                className="alert-action-button"
                              >
                                {action}
                              </ButtonSecondary>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default LeadershipAlertsScreen;

