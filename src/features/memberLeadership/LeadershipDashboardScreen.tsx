import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { AreaKPI, AreaTrend, LeadershipAlert } from '../../data/memberLeadershipTypes';
import {
  PageContainer,
  TopBar,
  Card,
  Section,
  ButtonSecondary,
  IconButton,
} from '../../ui/components';
import { FaBell, FaChartLine, FaTriangleExclamation } from 'react-icons/fa6';
import '../../pages/learning/Page.css';
import './LeadershipDashboardScreen.css';

const LeadershipDashboardScreen: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();

  // Mock data - TODO: Replace with real service
  const [kpis] = useState<AreaKPI>({
    lessonsTotal: 12,
    lessonsWithMember: 8,
    investigatorsActive: 5,
    investigatorsAttending: 4,
    investigatorsWithDate: 2,
    baptismsLast90Days: 3,
    commitmentsCreated: 15,
    commitmentsCompleted: 12,
    newConvertsActive: 2,
    memberParticipationThisWeek: 6,
  });

  const [trends] = useState<AreaTrend[]>([
    { week: '2025-W07', lessons: 10, attendance: 3, commitmentsCompleted: 8 },
    { week: '2025-W08', lessons: 11, attendance: 3, commitmentsCompleted: 9 },
    { week: '2025-W09', lessons: 9, attendance: 4, commitmentsCompleted: 10 },
    { week: '2025-W10', lessons: 12, attendance: 4, commitmentsCompleted: 12 },
  ]);

  const [alerts] = useState<LeadershipAlert[]>([
    {
      id: '1',
      type: 'high',
      category: 'noContact',
      title: t('leadershipAlerts.noContact.title'),
      description: t('leadershipAlerts.noContact.description', { days: 14, alias: 'Carlos' }),
      investigatorId: 'inv1',
      suggestedActions: [t('leadershipAlerts.noContact.action1')],
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'medium',
      category: 'missingSundays',
      title: t('leadershipAlerts.missingSundays.title'),
      description: t('leadershipAlerts.missingSundays.description', { alias: 'Ana', weeks: 2 }),
      newConvertId: 'nc1',
      suggestedActions: [t('leadershipAlerts.missingSundays.action1')],
      createdAt: new Date().toISOString(),
    },
  ]);

  const recommendations = useMemo(() => {
    return [
      t('leadershipDashboard.recommendations.familyLopez'),
      t('leadershipDashboard.recommendations.carlosContact'),
      t('leadershipDashboard.recommendations.anaIntegration'),
    ];
  }, [t]);

  const highRiskAlerts = alerts.filter(a => a.type === 'high').length;
  const mediumRiskAlerts = alerts.filter(a => a.type === 'medium').length;
  const lowRiskAlerts = alerts.filter(a => a.type === 'low').length;

  return (
    <PageContainer>
      <TopBar
        title={t('leadershipDashboard.header.title')}
        subtitle={t('leadershipDashboard.header.subtitle')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        {/* Overview Cards */}
        <Section title={t('leadershipDashboard.sections.overview')}>
          <div className="ld-overview-grid">
            <Card variant="gradient" className="ld-overview-card">
              <div className="ld-overview-value">{kpis.investigatorsActive}</div>
              <div className="ld-overview-label">{t('leadershipKPIs.investigatorsActive')}</div>
            </Card>
            <Card variant="gradient" className="ld-overview-card">
              <div className="ld-overview-value">{kpis.investigatorsAttending}</div>
              <div className="ld-overview-label">{t('leadershipKPIs.investigatorsAttending')}</div>
            </Card>
            <Card variant="gradient" className="ld-overview-card">
              <div className="ld-overview-value">{kpis.investigatorsWithDate}</div>
              <div className="ld-overview-label">{t('leadershipKPIs.investigatorsWithDate')}</div>
            </Card>
            <Card variant="gradient" className="ld-overview-card">
              <div className="ld-overview-value">{kpis.newConvertsActive}</div>
              <div className="ld-overview-label">{t('leadershipKPIs.newConvertsActive')}</div>
            </Card>
          </div>
        </Section>

        {/* KPIs Summary */}
        <Section title={t('leadershipDashboard.sections.kpis')}>
          <Card variant="default" className="ld-kpis-card">
            <div className="ld-kpis-grid">
              <div className="ld-kpi-item">
                <span className="ld-kpi-label">{t('leadershipKPIs.lessonsTotal')}</span>
                <span className="ld-kpi-value">{kpis.lessonsTotal}</span>
              </div>
              <div className="ld-kpi-item">
                <span className="ld-kpi-label">{t('leadershipKPIs.lessonsWithMember')}</span>
                <span className="ld-kpi-value">{kpis.lessonsWithMember}</span>
              </div>
              <div className="ld-kpi-item">
                <span className="ld-kpi-label">{t('leadershipKPIs.commitmentsCompleted')}</span>
                <span className="ld-kpi-value">{kpis.commitmentsCompleted}</span>
              </div>
              <div className="ld-kpi-item">
                <span className="ld-kpi-label">{t('leadershipKPIs.memberParticipation')}</span>
                <span className="ld-kpi-value">{kpis.memberParticipationThisWeek}</span>
              </div>
            </div>
            <ButtonSecondary
              onClick={() => navigate('/member/leadership/kpis')}
              className="ld-view-all-button"
            >
              {t('common.viewAll')}
            </ButtonSecondary>
          </Card>
        </Section>

        {/* Trends Preview */}
        <Section title={t('leadershipDashboard.sections.trends')}>
          <Card variant="default" className="ld-trends-card">
            <div className="ld-trend-chart">
              {trends.map((trend, idx) => (
                <div key={idx} className="ld-trend-bar">
                  <div className="ld-trend-bar-fill" style={{ height: `${(trend.lessons / 15) * 100}%` }} />
                  <div className="ld-trend-label">{trend.week.split('-W')[1]}</div>
                </div>
              ))}
            </div>
            <p className="ld-trend-note">{t('leadershipDashboard.trends.note')}</p>
          </Card>
        </Section>

        {/* Actionable Recommendations */}
        <Section title={t('leadershipDashboard.sections.actions')}>
          <Card variant="outlined" className="ld-recommendations-card">
            <ul className="ld-recommendations-list">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="ld-recommendation-item">
                  <span className="ld-recommendation-icon">💡</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Section>

        {/* Alerts Summary */}
        <Section title={t('leadershipDashboard.sections.alerts')}>
          <Card variant="default" className="ld-alerts-summary-card">
            <div className="ld-alerts-summary">
              <div className="ld-alert-badge ld-alert-badge--high">
                <FaTriangleExclamation />
                <span>{highRiskAlerts} {t('leadershipAlerts.types.high')}</span>
              </div>
              <div className="ld-alert-badge ld-alert-badge--medium">
                <FaTriangleExclamation />
                <span>{mediumRiskAlerts} {t('leadershipAlerts.types.medium')}</span>
              </div>
              <div className="ld-alert-badge ld-alert-badge--low">
                <FaTriangleExclamation />
                <span>{lowRiskAlerts} {t('leadershipAlerts.types.low')}</span>
              </div>
            </div>
            <ButtonSecondary
              onClick={() => navigate('/member/leadership/alerts')}
              className="ld-view-all-button"
            >
              {t('leadershipDashboard.alerts.viewAll')}
            </ButtonSecondary>
          </Card>
        </Section>
      </div>
    </PageContainer>
  );
};

export default LeadershipDashboardScreen;

