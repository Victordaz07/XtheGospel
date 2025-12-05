import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import { AreaKPI, AreaTrend } from '../../data/memberLeadershipTypes';
import { MemberLeadershipService } from '../../services/memberLeadershipService';
import {
  PageContainer,
  TopBar,
  Card,
  Section,
  IconButton,
} from '../../ui/components';
import { FaBell, FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa6';
import '../../pages/learning/Page.css';
import './LeadershipKPIsScreen.css';

const LeadershipKPIsScreen: React.FC = () => {
  const { t } = useI18n();
  const [kpis, setKpis] = useState<AreaKPI | null>(null);
  const [previousKpis, setPreviousKpis] = useState<AreaKPI | null>(null);
  const [trends, setTrends] = useState<AreaTrend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [currentKpis, trendsData] = await Promise.all([
        MemberLeadershipService.getAreaKPIs(),
        MemberLeadershipService.getAreaTrends(),
      ]);
      setKpis(currentKpis);
      setTrends(trendsData);
      
      // Mock previous week data for comparison
      setPreviousKpis({
        ...currentKpis,
        lessonsTotal: currentKpis.lessonsTotal - 1,
        lessonsWithMember: currentKpis.lessonsWithMember - 1,
        commitmentsCompleted: currentKpis.commitmentsCompleted - 2,
      });
    } catch (error) {
      console.error('Error loading KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getChangeIndicator = (current: number, previous: number) => {
    if (current > previous) return <FaArrowUp className="kpi-change-up" />;
    if (current < previous) return <FaArrowDown className="kpi-change-down" />;
    return <FaMinus className="kpi-change-neutral" />;
  };

  const getChangePercent = (current: number, previous: number) => {
    if (previous === 0) return '0%';
    const change = ((current - previous) / previous) * 100;
    return `${change > 0 ? '+' : ''}${change.toFixed(0)}%`;
  };

  if (loading) {
    return (
      <PageContainer>
        <TopBar
          title={t('leadershipKPIs.title')}
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

  if (!kpis || !previousKpis) {
    return (
      <PageContainer>
        <TopBar
          title={t('leadershipKPIs.title')}
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

  const kpiItems = [
    { key: 'lessonsTotal', current: kpis.lessonsTotal, previous: previousKpis.lessonsTotal },
    { key: 'lessonsWithMember', current: kpis.lessonsWithMember, previous: previousKpis.lessonsWithMember },
    { key: 'investigatorsActive', current: kpis.investigatorsActive, previous: previousKpis.investigatorsActive },
    { key: 'investigatorsAttending', current: kpis.investigatorsAttending, previous: previousKpis.investigatorsAttending },
    { key: 'investigatorsWithDate', current: kpis.investigatorsWithDate, previous: previousKpis.investigatorsWithDate },
    { key: 'baptismsLast90Days', current: kpis.baptismsLast90Days, previous: previousKpis.baptismsLast90Days },
    { key: 'commitmentsCreated', current: kpis.commitmentsCreated, previous: previousKpis.commitmentsCreated },
    { key: 'commitmentsCompleted', current: kpis.commitmentsCompleted, previous: previousKpis.commitmentsCompleted },
    { key: 'newConvertsActive', current: kpis.newConvertsActive, previous: previousKpis.newConvertsActive },
    { key: 'memberParticipation', current: kpis.memberParticipationThisWeek, previous: previousKpis.memberParticipationThisWeek },
  ];

  return (
    <PageContainer>
      <TopBar
        title={t('leadershipKPIs.title')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        <Section title={t('leadershipKPIs.title')}>
          <div className="kpis-grid">
            {kpiItems.map((item) => (
              <Card key={item.key} variant="default" className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">{t(`leadershipKPIs.${item.key}`)}</span>
                  <div className="kpi-change">
                    {getChangeIndicator(item.current, item.previous)}
                    <span className="kpi-change-text">
                      {getChangePercent(item.current, item.previous)}
                    </span>
                  </div>
                </div>
                <div className="kpi-value">{item.current}</div>
                <div className="kpi-previous">Semana anterior: {item.previous}</div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title={t('leadershipDashboard.sections.trends')}>
          <Card variant="default" className="kpis-trends-card">
            <div className="kpis-trend-chart">
              {trends.map((trend, idx) => (
                <div key={idx} className="kpis-trend-bar">
                  <div className="kpis-trend-bar-fill" style={{ height: `${(trend.lessons / 15) * 100}%` }} />
                  <div className="kpis-trend-label">{trend.week.split('-W')[1]}</div>
                </div>
              ))}
            </div>
          </Card>
        </Section>
      </div>
    </PageContainer>
  );
};

export default LeadershipKPIsScreen;

