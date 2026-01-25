import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import { NewConvertLeadershipView } from '../../data/memberLeadershipTypes';
import { MemberLeadershipService } from '../../services/memberLeadershipService';
import {
  PageContainer,
  TopBar,
  Card,
  Section,
  IconButton,
  EmptyState,
  ProgressBar,
} from '../../ui/components';
import { FaBell, FaDroplet, FaCircleCheck, FaTriangleExclamation } from 'react-icons/fa6';
import '../../pages/learning/Page.css';
import './LeadershipNewConvertsScreen.css';

const LeadershipNewConvertsScreen: React.FC = () => {
  const { t } = useI18n();
  const [newConverts, setNewConverts] = useState<NewConvertLeadershipView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNewConverts();
  }, []);

  const loadNewConverts = async () => {
    try {
      setLoading(true);
      const data = await MemberLeadershipService.getNewConverts();
      setNewConverts(data);
    } catch (error) {
      console.error('Error loading new converts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (convert: NewConvertLeadershipView): 'high' | 'medium' | 'low' => {
    if (convert.attendanceLast4Sundays < 2 || convert.lastContactDays > 14) return 'high';
    if (convert.attendanceLast4Sundays < 3 || convert.lastContactDays > 7) return 'medium';
    return 'low';
  };

  const getRiskIcon = (risk: 'high' | 'medium' | 'low') => {
    if (risk === 'high') return <FaTriangleExclamation className="risk-icon risk-high" />;
    if (risk === 'medium') return <FaTriangleExclamation className="risk-icon risk-medium" />;
    return <FaCircleCheck className="risk-icon risk-low" />;
  };

  if (loading) {
    return (
      <PageContainer>
        <TopBar
          title={t('leadershipNewConverts.title')}
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
        title={t('leadershipNewConverts.title')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        {newConverts.length === 0 ? (
          <EmptyState
            title={t('leadershipNewConverts.emptyTitle')}
            description={t('leadershipNewConverts.emptyDescription')}
            icon={<FaDroplet />}
          />
        ) : (
          <Section title={t('leadershipNewConverts.title')}>
            <div className="new-converts-list">
              {newConverts.map((convert) => {
                const risk = getRiskLevel(convert);
                const progress = (convert.stepsCompleted / convert.stepsTotal) * 100;

                return (
                  <Card key={convert.id} variant="default" className="new-convert-card">
                    <div className="new-convert-header">
                      <div className="new-convert-info">
                        <h3 className="new-convert-alias">{convert.alias}</h3>
                        <span className="new-convert-months">
                          {t('leadershipNewConverts.monthsSinceBaptism', { months: convert.monthsSinceBaptism })}
                        </span>
                      </div>
                      <div className="risk-badge">
                        {getRiskIcon(risk)}
                        <span className={`risk-text risk-${risk}`}>
                          {t(`leadershipNewConverts.risk.${risk}`)}
                        </span>
                      </div>
                    </div>

                    <div className="new-convert-progress">
                      <div className="progress-header">
                        <span>Progreso: {convert.stepsCompleted}/{convert.stepsTotal}</span>
                        <span className="progress-stage">{convert.progressionStage}</span>
                      </div>
                      <ProgressBar value={progress} variant="primary" size="md" />
                    </div>

                    <div className="new-convert-meta">
                      <div className="meta-item">
                        <strong>Asistencia:</strong> {t('leadershipNewConverts.attendance', { count: convert.attendanceLast4Sundays })}
                      </div>
                      <div className="meta-item">
                        <strong>Último contacto:</strong> hace {convert.lastContactDays} días
                      </div>
                      {convert.assignedMembers.length > 0 && (
                        <div className="meta-item">
                          <strong>Miembros asignados:</strong> {convert.assignedMembers.join(', ')}
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </Section>
        )}
      </div>
    </PageContainer>
  );
};

export default LeadershipNewConvertsScreen;

