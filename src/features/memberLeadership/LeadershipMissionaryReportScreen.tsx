import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import { MissionaryReport } from '../../data/memberLeadershipTypes';
import { MemberLeadershipService } from '../../services/memberLeadershipService';
import {
  PageContainer,
  TopBar,
  Card,
  Section,
  IconButton,
} from '../../ui/components';
import { FaBell, FaLightbulb, FaHandshake } from 'react-icons/fa6';
import '../../pages/learning/Page.css';
import './LeadershipMissionaryReportScreen.css';

const LeadershipMissionaryReportScreen: React.FC = () => {
  const { t } = useI18n();
  const [report, setReport] = useState<MissionaryReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);
      const data = await MemberLeadershipService.getMissionaryReport();
      setReport(data);
    } catch (error) {
      console.error('Error loading report:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <TopBar
          title={t('leadershipMissionaryReport.title')}
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

  if (!report) {
    return (
      <PageContainer>
        <TopBar
          title={t('leadershipMissionaryReport.title')}
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
        title={t('leadershipMissionaryReport.title')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        <Section title={`${t('leadershipMissionaryReport.title')} - ${report.area}`}>
          <Card variant="gradient" className="report-summary-card">
            <div className="report-summary-grid">
              <div className="report-stat">
                <div className="report-stat-value">{report.lessonsTaught}</div>
                <div className="report-stat-label">{t('leadershipMissionaryReport.lessonsTaught')}</div>
              </div>
              <div className="report-stat">
                <div className="report-stat-value">{report.lessonsWithMember}</div>
                <div className="report-stat-label">{t('leadershipMissionaryReport.lessonsWithMember')}</div>
              </div>
              <div className="report-stat">
                <div className="report-stat-value">{report.investigatorsAttending}</div>
                <div className="report-stat-label">{t('leadershipMissionaryReport.investigatorsAttending')}</div>
              </div>
              <div className="report-stat">
                <div className="report-stat-value">{report.newConvertsActive}</div>
                <div className="report-stat-label">{t('leadershipMissionaryReport.newConvertsActive')}</div>
              </div>
              <div className="report-stat">
                <div className="report-stat-value">{report.memberParticipants}</div>
                <div className="report-stat-label">{t('leadershipMissionaryReport.memberParticipants')}</div>
              </div>
            </div>
          </Card>
        </Section>

        {report.keyNeeds.length > 0 && (
          <Section title={t('leadershipMissionaryReport.keyNeeds')}>
            <Card variant="outlined" className="needs-card">
              <ul className="needs-list">
                {report.keyNeeds.map((need, idx) => (
                  <li key={idx} className="need-item">
                        <FaHandshake className="need-icon" />
                    <span>{need}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Section>
        )}

        {report.suggestions.length > 0 && (
          <Section title={t('leadershipMissionaryReport.suggestions')}>
            <Card variant="outlined" className="suggestions-card">
              <ul className="suggestions-list">
                {report.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="suggestion-item">
                    <FaLightbulb className="suggestion-icon" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Section>
        )}
      </div>
    </PageContainer>
  );
};

export default LeadershipMissionaryReportScreen;

