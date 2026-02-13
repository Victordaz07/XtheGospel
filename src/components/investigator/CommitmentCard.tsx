import React from 'react';
import { useI18n } from '../../context/I18nContext';
import { InvestigatorCommitment, CommitmentState } from '../../data/investigatorCommitments';
import { INVESTIGATOR_LESSONS } from '../../data/investigatorLessons';
import { Card, ButtonPrimary } from '../../ui/components';
import './CommitmentCard.css';

interface CommitmentCardProps {
  item: InvestigatorCommitment;
  onChangeState: (id: string, next: CommitmentState) => void;
  onDelete?: (id: string) => void;
  onPress?: () => void;
}

export const CommitmentCard: React.FC<CommitmentCardProps> = ({
  item,
  onChangeState,
  onDelete,
  onPress,
}) => {
  const { t, locale } = useI18n();

  // Translate commitment text if it's an i18n key
  const getCommitmentText = () => {
    if (!item.text) return '';
    if (item.text.startsWith('investigatorCommitments.samples.')) {
      try {
        return t(item.text as any);
      } catch {
        return item.text;
      }
    }
    return item.text;
  };

  const formatDate = (dateString: string): string => {
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
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const lessonTitle = item.lessonId
    ? (() => {
        const lesson = INVESTIGATOR_LESSONS.find(
          (l) => l.id === item.lessonId || l.lessonId === item.lessonId
        );
        return lesson ? t(`${lesson.translationKey}.title`) : null;
      })()
    : null;

  const getStatePillStyle = () => {
    switch (item.state) {
      case 'today':
        return { bg: '#F5EDE3', text: '#6F4D32' }; // warm brass
      case 'completed':
        return { bg: '#E5EEF0', text: '#2F5A66' }; // sage/teal
      default:
        return { bg: '#E5E7EB', text: '#374151' }; // grey
    }
  };

  const stateStyle = getStatePillStyle();

  const getStateLabel = () => {
    switch (item.state) {
      case 'today':
        return t('investigatorCommitments.states.today');
      case 'completed':
        return t('investigatorCommitments.states.completed');
      default:
        return t('investigatorCommitments.states.pending');
    }
  };

  const handlePrimaryAction = () => {
    if (item.state === 'completed') {
      onChangeState(item.id, 'pending');
    } else if (item.state === 'today') {
      onChangeState(item.id, 'completed');
    } else {
      // pending
      onChangeState(item.id, 'today');
    }
  };

  const getPrimaryLabel = () => {
    if (item.state === 'completed') {
      return t('investigatorCommitments.card.undo');
    }
    if (item.state === 'today') {
      return t('investigatorCommitments.card.markDone');
    }
    return t('investigatorCommitments.card.setToday');
  };

  return (
    <Card
      variant="default"
      className={`commitment-card ${item.state === 'completed' ? 'commitment-card--completed' : ''}`}
      onClick={onPress}
    >
      <div className="commitment-card-content">
        <div className="commitment-card-header">
          <h3 className="commitment-card-title">{getCommitmentText()}</h3>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              className="commitment-card-delete"
              title={t('common.delete') || 'Eliminar'}
            >
              🗑️
            </button>
          )}
        </div>

        {lessonTitle && (
          <p className="commitment-card-lesson">
            {t('investigatorCommitments.labels.fromLesson', { lessonTitle })}
          </p>
        )}

        <div className="commitment-card-meta">
          <span className="commitment-card-date">
            {t('investigatorCommitments.labels.createdAt', { date: formatDate(item.createdAt) })}
          </span>
          <span
            className="commitment-card-state"
            style={{
              backgroundColor: stateStyle.bg,
              color: stateStyle.text,
            }}
          >
            {getStateLabel()}
          </span>
        </div>

        <ButtonPrimary
          onClick={(e) => {
            e.stopPropagation();
            handlePrimaryAction();
          }}
          className={`commitment-card-action ${item.state === 'completed' ? 'commitment-card-action--completed' : ''}`}
          size="sm"
        >
          {getPrimaryLabel()}
        </ButtonPrimary>
      </div>
    </Card>
  );
};

