import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import { CommitmentsService, Commitment, CommitmentCategory } from '../services/commitmentsService';
import { INVESTIGATOR_LESSONS } from '../data/investigatorLessons';
import {
  PageContainer,
  TopBar,
  Card,
  ButtonPrimary,
  ButtonSecondary,
  IconButton,
} from '../ui/components';
import { FaBell, FaHeart, FaHandHeart } from 'react-icons/fa6';
import './Page.css';
import './CommitmentsPage.css';

const CommitmentsPage: React.FC = () => {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [filter, setFilter] = useState<CommitmentCategory | 'all'>('all');
  const [newCommitmentText, setNewCommitmentText] = useState('');
  const [newCommitmentCategory, setNewCommitmentCategory] = useState<CommitmentCategory>('spiritual');

  useEffect(() => {
    loadCommitments();
  }, []);

  const loadCommitments = async () => {
    const loaded = await CommitmentsService.loadCommitments();
    setCommitments(loaded);
  };

  const addCommitment = async () => {
    if (!newCommitmentText.trim()) return;

    try {
      await CommitmentsService.addCommitment({
        title: newCommitmentText,
        category: newCommitmentCategory,
        completed: false,
        source: 'manual',
      });
      setNewCommitmentText('');
      await loadCommitments();
    } catch (error) {
      console.error('Error agregando compromiso:', error);
    }
  };

  const toggleCommitment = async (id: string) => {
    const commitment = commitments.find(c => c.id === id);
    if (commitment) {
      await CommitmentsService.updateCommitment(id, { completed: !commitment.completed });
      await loadCommitments();
    }
  };

  const deleteCommitment = async (id: string) => {
    if (window.confirm(t('commitments.deleteConfirm') || '¿Eliminar este compromiso?')) {
      await CommitmentsService.deleteCommitment(id);
      await loadCommitments();
    }
  };

  const filteredCommitments = filter === 'all' 
    ? commitments 
    : commitments.filter(c => c.category === filter);

  const filterOptions: Array<{ key: CommitmentCategory | 'all'; label: string; description: string }> = [
    { key: 'all', label: t('investigatorCommitments.filters.all'), description: t('investigatorCommitments.filters.allDesc') },
    { key: 'study', label: t('investigatorCommitments.filters.study'), description: t('investigatorCommitments.filters.studyDesc') },
    { key: 'spiritual', label: t('investigatorCommitments.filters.spiritual'), description: t('investigatorCommitments.filters.spiritualDesc') },
    { key: 'attendance', label: t('investigatorCommitments.filters.attendance'), description: t('investigatorCommitments.filters.attendanceDesc') },
  ];

  const getCategoryLabel = (category: CommitmentCategory): string => {
    const map: Record<CommitmentCategory, string> = {
      study: t('investigatorCommitments.new.typeStudy'),
      spiritual: t('investigatorCommitments.new.typeSpiritual'),
      attendance: t('investigatorCommitments.new.typeAttendance'),
    };
    return map[category];
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const localeMap: Record<string, string> = {
        es: 'es-ES',
        fr: 'fr-FR',
        pt: 'pt-BR',
        en: 'en-US',
      };
      return date.toLocaleDateString(localeMap[locale] || 'es-ES', { 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getLessonTitle = (lessonId?: string): string | null => {
    if (!lessonId) return null;
    const lesson = INVESTIGATOR_LESSONS.find(l => l.id === lessonId || l.lessonId === lessonId);
    return lesson ? t(`${lesson.translationKey}.title`) : null;
  };

  return (
    <PageContainer>
      <TopBar
        title={t('investigatorCommitments.header.title')}
        subtitle={t('investigatorCommitments.header.subtitle')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel="Notifications" />}
      />

      <div className="page-content">
        {/* Tarjeta de nuevo compromiso */}
        <Card variant="default" className="ic-new-commitment-card">
          <div className="ic-new-commitment-form">
            <div className="ic-form-field">
              <input
                type="text"
                value={newCommitmentText}
                onChange={(e) => setNewCommitmentText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCommitment()}
                placeholder={t('investigatorCommitments.new.placeholder')}
                className="ic-commitment-input"
              />
            </div>

            <div className="ic-form-field">
              <label className="ic-form-label">
                {t('investigatorCommitments.new.typeLabel')}
              </label>
              <div className="ic-type-selector">
                {(['spiritual', 'study', 'attendance'] as CommitmentCategory[]).map((cat) => {
                  const labelKey = cat === 'spiritual' ? 'typeSpiritual' :
                                   cat === 'study' ? 'typeStudy' :
                                   cat === 'attendance' ? 'typeAttendance' : '';
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewCommitmentCategory(cat)}
                      className={`ic-type-option ${newCommitmentCategory === cat ? 'ic-type-option--selected' : ''}`}
                    >
                      {t(`investigatorCommitments.new.${labelKey}`)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="ic-helper-text">
              {t('investigatorCommitments.new.helper')}
            </div>

            <ButtonPrimary
              onClick={addCommitment}
              disabled={!newCommitmentText.trim()}
              className="ic-save-button"
            >
              {t('investigatorCommitments.new.buttonSave')}
            </ButtonPrimary>
          </div>
        </Card>

        {/* Filtros */}
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

        {/* Lista de compromisos */}
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
            filteredCommitments.map((commitment) => {
              const lessonTitle = getLessonTitle(commitment.lessonId);
              
              return (
                <Card
                  key={commitment.id}
                  variant="default"
                  className={`ic-commitment-card ${commitment.completed ? 'ic-commitment-card--completed' : ''}`}
                >
                  <div className="ic-commitment-checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={commitment.completed}
                      onChange={() => toggleCommitment(commitment.id)}
                      className="ic-commitment-checkbox"
                    />
                  </div>
                  <div className="ic-commitment-content">
                    <div className="ic-commitment-header">
                      <h3 className="ic-commitment-title">{commitment.title}</h3>
                      <span className={`ic-commitment-category ic-commitment-category--${commitment.category}`}>
                        {getCategoryLabel(commitment.category)}
                      </span>
                    </div>
                    {commitment.description && (
                      <p className="ic-commitment-description">{commitment.description}</p>
                    )}
                    <div className="ic-commitment-meta">
                      <span className="ic-commitment-date">
                        {t('investigatorCommitments.entry.addedOn', { date: formatDate(commitment.createdAt) })}
                      </span>
                      {lessonTitle && (
                        <span className="ic-commitment-lesson">
                          {t('investigatorCommitments.entry.fromLesson', { lessonTitle })}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteCommitment(commitment.id)}
                    className="ic-commitment-delete"
                    title={t('common.delete') || 'Eliminar'}
                  >
                    🗑️
                  </button>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default CommitmentsPage;
