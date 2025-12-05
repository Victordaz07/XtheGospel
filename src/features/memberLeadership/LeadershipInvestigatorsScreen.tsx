import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import { InvestigatorLeadershipView } from '../../data/memberLeadershipTypes';
import { MemberLeadershipService } from '../../services/memberLeadershipService';
import {
  PageContainer,
  TopBar,
  Card,
  Section,
  ButtonPrimary,
  ButtonSecondary,
  IconButton,
  EmptyState,
} from '../../ui/components';
import { FaBell, FaUser, FaCalendar, FaUsers } from 'react-icons/fa6';
import '../../pages/learning/Page.css';
import './LeadershipInvestigatorsScreen.css';

const LeadershipInvestigatorsScreen: React.FC = () => {
  const { t } = useI18n();
  const [investigators, setInvestigators] = useState<InvestigatorLeadershipView[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    loadInvestigators();
  }, []);

  const loadInvestigators = async () => {
    try {
      setLoading(true);
      const data = await MemberLeadershipService.getInvestigators();
      setInvestigators(data);
    } catch (error) {
      console.error('Error loading investigators:', error);
    } finally {
      setLoading(false);
    }
  };

  const selected = investigators.find(inv => inv.id === selectedId);

  if (loading) {
    return (
      <PageContainer>
        <TopBar
          title={t('leadershipInvestigators.title')}
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
        title={t('leadershipInvestigators.title')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        {investigators.length === 0 ? (
          <EmptyState
            title={t('leadershipInvestigators.emptyTitle')}
            description={t('leadershipInvestigators.emptyDescription')}
            icon={<FaUsers />}
          />
        ) : (
          <>
            <Section title={t('leadershipInvestigators.title')}>
              <div className="investigators-list">
                {investigators.map((inv) => (
                  <Card
                    key={inv.id}
                    variant="default"
                    className={`investigator-card ${selectedId === inv.id ? 'selected' : ''}`}
                    onClick={() => setSelectedId(selectedId === inv.id ? null : inv.id)}
                  >
                    <div className="investigator-header">
                      <div className="investigator-info">
                        <h3 className="investigator-alias">{inv.alias}</h3>
                        <span className="investigator-stage">{inv.stage}</span>
                      </div>
                      {inv.attendedLastSunday && (
                        <span className="attendance-badge">✓ {t('leadershipInvestigators.attendedSunday')}</span>
                      )}
                    </div>
                    <div className="investigator-meta">
                      <span className="meta-item">
                        <FaCalendar /> {t('leadershipInvestigators.lastContact', { days: inv.lastContactDays })}
                      </span>
                      {inv.assignedMember && (
                        <span className="meta-item">
                          <FaUser /> {inv.assignedMember}
                        </span>
                      )}
                    </div>
                    {inv.needs.length > 0 && (
                      <div className="investigator-needs">
                        {inv.needs.map((need) => (
                          <span key={need} className="need-badge">
                            {t(`leadershipInvestigators.needs.${need}`)}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </Section>

            {selected && (
              <Section title={t('leadershipInvestigators.viewDetails')}>
                <Card variant="outlined" className="investigator-detail">
                  <h3>{selected.alias}</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>{t('leadershipInvestigators.lastContact', { days: selected.lastContactDays })}</strong>
                    </div>
                    <div className="detail-item">
                      <strong>Lecciones completadas:</strong> {selected.lessonsCompleted || 0}
                    </div>
                    <div className="detail-item">
                      <strong>Compromisos activos:</strong> {selected.commitmentsActive || 0}
                    </div>
                  </div>
                  <div className="detail-actions">
                    <ButtonPrimary onClick={() => alert('TODO: Assign member')}>
                      {t('leadershipInvestigators.assignMember')}
                    </ButtonPrimary>
                    <ButtonSecondary onClick={() => setSelectedId(null)}>
                      {t('common.close')}
                    </ButtonSecondary>
                  </div>
                </Card>
              </Section>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default LeadershipInvestigatorsScreen;

