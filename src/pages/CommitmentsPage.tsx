import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import { InvestigatorCommitmentsService } from '../services/investigatorCommitmentsService';
import { InvestigatorCommitment, CommitmentType, CommitmentState } from '../data/investigatorCommitments';
import { pickCommitmentForToday } from '../utils/commitments';
import { NewCommitmentCard } from '../components/investigator/NewCommitmentCard';
import { CommitmentCard } from '../components/investigator/CommitmentCard';
import {
  PageContainer,
  TopBar,
  Card,
  ButtonSecondary,
  IconButton,
} from '../ui/components';
import { FaBell } from 'react-icons/fa6';
import './Page.css';
import './CommitmentsPage.css';

const CommitmentsPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [commitments, setCommitments] = useState<InvestigatorCommitment[]>([]);
  const [filter, setFilter] = useState<CommitmentType | 'all'>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCommitments();
  }, []);

  const loadCommitments = async () => {
    try {
      setError(null);
      const loaded = await InvestigatorCommitmentsService.loadCommitments();
      setCommitments(loaded || []);
    } catch (error) {
      console.error('Error loading commitments:', error);
      setError(t('investigatorCommitments.errors.loading'));
      setCommitments([]);
    }
  };

  const handleAddCommitment = async (payload: { text: string; type: CommitmentType }) => {
    try {
      await InvestigatorCommitmentsService.addCommitment({
        text: payload.text,
        type: payload.type,
        state: 'pending',
      });
      await loadCommitments();
    } catch (error) {
      console.error('Error agregando compromiso:', error);
      // Error is logged, user can retry
    }
  };

  const handleChangeState = async (id: string, next: CommitmentState) => {
    try {
      await InvestigatorCommitmentsService.updateCommitmentState(id, next);
      await loadCommitments();
    } catch (error) {
      console.error('Error actualizando estado del compromiso:', error);
      // Error is logged, user can retry
    }
  };

  const handleDeleteCommitment = async (id: string) => {
    if (window.confirm(t('investigatorCommitments.errors.confirmDelete'))) {
      try {
        await InvestigatorCommitmentsService.deleteCommitment(id);
        await loadCommitments();
      } catch (error) {
        console.error('Error eliminando compromiso:', error);
        // Error is logged, user can retry
      }
    }
  };

  const filteredCommitments = useMemo(() => {
    if (filter === 'all') return commitments;
    return commitments.filter(c => c.type === filter);
  }, [commitments, filter]);

  const filterOptions: Array<{ key: CommitmentType | 'all'; label: string; description: string }> = [
    { key: 'all', label: t('investigatorCommitments.filters.all'), description: t('investigatorCommitments.filters.allDesc') },
    { key: 'study', label: t('investigatorCommitments.filters.study'), description: t('investigatorCommitments.filters.studyDesc') },
    { key: 'spiritual', label: t('investigatorCommitments.filters.spiritual'), description: t('investigatorCommitments.filters.spiritualDesc') },
    { key: 'attendance', label: t('investigatorCommitments.filters.attendance'), description: t('investigatorCommitments.filters.attendanceDesc') },
  ];

  // Get suggestion for today (translate text if it's a key)
  const todaySuggestion = useMemo(() => {
    try {
      const suggestion = pickCommitmentForToday(commitments);
      if (suggestion && suggestion.text && suggestion.text.startsWith('investigatorCommitments.samples.')) {
        try {
          return {
            ...suggestion,
            text: t(suggestion.text as any),
          };
        } catch {
          return suggestion;
        }
      }
      return suggestion;
    } catch (error) {
      console.error('Error getting today suggestion:', error);
      return null;
    }
  }, [commitments, t]);

  if (error) {
    return (
      <PageContainer>
        <TopBar
          title={t('investigatorCommitments.header.title')}
          subtitle={t('investigatorCommitments.header.subtitle')}
        />
        <div className="page-content">
          <Card variant="default">
            <p>{t('common.error')}: {error}</p>
            <button onClick={loadCommitments}>{t('common.retry')}</button>
          </Card>
        </div>
      </PageContainer>
    );
  }

  try {
    return (
      <PageContainer>
        <TopBar
          title={t('investigatorCommitments.header.title')}
          subtitle={t('investigatorCommitments.header.subtitle')}
          rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
        />

        <div className="page-content">
          {/* Today Suggestion Card */}
          {todaySuggestion && (
            <Card variant="gradient" className="ic-today-suggestion">
              <h3 className="ic-today-suggestion-title">
                {t('investigatorCommitments.todaySuggestion.title')}
              </h3>
              <p className="ic-today-suggestion-text">{todaySuggestion.text}</p>
              <ButtonSecondary
                onClick={() => handleChangeState(todaySuggestion.id, 'today')}
                className="ic-today-suggestion-button"
              >
                {t('investigatorCommitments.todaySuggestion.buttonSetToday')}
              </ButtonSecondary>
            </Card>
          )}

          {/* New Commitment Card */}
          <NewCommitmentCard onAdd={handleAddCommitment} />

        {/* Filters */}
        {commitments.length > 0 && (
          <div className="ic-filters-section">
            <h3 className="ic-filters-title">{t('investigatorCommitments.filters.title')}</h3>
            <div className="ic-filters-list">
              {filterOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setFilter(option.key)}
                  className={`ic-filter-chip ${filter === option.key ? 'ic-filter-chip--active' : ''}`}
                  title={option.description}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Commitments List */}
        <div className="ic-commitments-list">
          {filteredCommitments.length === 0 ? (
            <Card variant="gradient" className="ic-empty-state">
              <div className="ic-empty-icon">✨</div>
              <h2 className="ic-empty-title">{t('investigatorCommitments.empty.title')}</h2>
              <p className="ic-empty-description">{t('investigatorCommitments.empty.description')}</p>
              <ButtonSecondary onClick={() => navigate('/lessons')} className="ic-empty-button">
                {t('investigatorCommitments.empty.buttonGoToLessons')}
              </ButtonSecondary>
            </Card>
          ) : (
            filteredCommitments.map((commitment) => (
              <CommitmentCard
                key={commitment.id}
                item={commitment}
                onChangeState={handleChangeState}
                onDelete={handleDeleteCommitment}
              />
            ))
          )}
        </div>
      </div>
    </PageContainer>
    );
  } catch (renderError) {
    console.error('Error rendering CommitmentsPage:', renderError);
    return (
      <PageContainer>
        <TopBar
          title={t('common.error')}
          subtitle={t('investigatorCommitments.errors.pageLoadError')}
        />
        <div className="page-content">
          <Card variant="default">
            <p>{t('investigatorCommitments.errors.renderError')}: {String(renderError)}</p>
            <button onClick={() => window.location.reload()}>{t('common.reload')}</button>
          </Card>
        </div>
      </PageContainer>
    );
  }
};

export default CommitmentsPage;
