import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaHeart } from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import { useProgress } from '../../context/ProgressContext';
import { LESSONS } from '../../../data/lessonsData';
import { getDailyDevotional } from '../../data/devotionals';
import { InvestigatorCommitmentsService } from '../../services/investigatorCommitmentsService';
import { pickCommitmentForToday } from '../../utils/commitments';
import { getRelatedCommitmentsForDailyMessage } from '../../utils/getRelatedCommitmentsForDailyMessage';
import { AppFooter } from '../../components/layout/AppFooter';
import { useDailyMessageForToday } from '../../hooks/useDailyMessageForToday';
import {
  PageContainer,
  TopBar,
  RoleBadge,
  Card,
  Section,
  ProgressBar,
  ButtonSecondary,
  IconButton,
} from '../../ui/components';
import './Page.css';
import './HomePage.css';

const InvestigatorHome: React.FC = () => {
  const { locale, t } = useI18n();
  const navigate = useNavigate();
  const { getOverallProgress, getCurrentLesson } = useProgress();
  const [devotionalFeedback, setDevotionalFeedback] = useState<'felt' | 'confused' | null>(null);
  const [commitments, setCommitments] = useState<any[]>([]);
  const [todaySuggestion, setTodaySuggestion] = useState<any | null>(null);

  const overallProgress = getOverallProgress();
  const completedLessons = overallProgress.completedLessons || 0;
  const totalLessons = overallProgress.totalLessons || 7;
  const progressPercent = overallProgress.percentage;

  const currentLessonData = getCurrentLesson();
  const currentLesson = currentLessonData ? LESSONS.find(l => l.id === currentLessonData.lessonId) : null;
  const firstLesson = LESSONS[0];

  // Sistema dinámico de mensaje diario
  const dailyMessageId = useDailyMessageForToday("investigator");
  const msgKey = `dailyMessages.${dailyMessageId}`;
  
  // Obtener lessonId del mensaje y título de la lección relacionada
  const lessonId = t(`${msgKey}.lessonId` as any);
  const lessonTitle = useMemo(() => {
    if (lessonId && lessonId !== `${msgKey}.lessonId`) {
      try {
        return t(`investigatorLessons.lessons.${lessonId}.title` as any);
      } catch {
        return "";
      }
    }
    return "";
  }, [lessonId, msgKey, t]);

  // Cargar compromisos y sugerencia para hoy
  useEffect(() => {
    const loadCommitments = async () => {
      try {
        const loaded = await InvestigatorCommitmentsService.loadCommitments();
        setCommitments(loaded);
        
        // Get suggestion for today
        const suggestion = pickCommitmentForToday(loaded);
        if (suggestion) {
          // Translate if it's a key
          const text = suggestion.text.startsWith('investigatorCommitments.samples.')
            ? t(suggestion.text as any)
            : suggestion.text;
          setTodaySuggestion({ ...suggestion, text });
        }
      } catch (error) {
        console.error('Error loading commitments:', error);
      }
    };
    loadCommitments();
  }, [t]);

  // Get related commitments for daily message
  const relatedCommitments = useMemo(() => {
    if (!dailyMessageId || !lessonId || lessonId === `${msgKey}.lessonId`) {
      return [];
    }
    return getRelatedCommitmentsForDailyMessage(
      dailyMessageId,
      (key: string) => t(key as any),
      commitments
    );
  }, [dailyMessageId, lessonId, msgKey, commitments, t]);

  const relatedCommitment = relatedCommitments[0];

  const handleStartLesson = () => {
    const lessonToStart = currentLesson || firstLesson;
    navigate(`/lessons/${lessonToStart.id}`);
  };

  const quickAccessItems = [
    {
      icon: '📖',
      title: t('home.quickAccess.lessons.title'),
      subtitle: t('home.quickAccess.lessons.subtitle'),
      link: '/lessons',
      color: 'primary'
    },
    {
      icon: '📊',
      title: t('home.quickAccess.progress.title'),
      subtitle: t('home.quickAccess.progress.subtitle'),
      link: '/progress',
      color: 'secondary'
    },
    {
      icon: '✅',
      title: t('home.quickAccess.commitments.title'),
      subtitle: t('home.quickAccess.commitments.subtitle'),
      link: '/tasks',
      color: 'accent'
    }
  ];

  const additionalResources = [
    {
      icon: '📝',
      title: t('home.additionalResources.myStory.title'),
      subtitle: t('home.additionalResources.myStory.subtitle'),
      link: '/god-story',
      color: 'primary'
    },
    {
      icon: '❓',
      title: t('home.additionalResources.toughQuestions.title'),
      subtitle: t('home.additionalResources.toughQuestions.subtitle'),
      link: '/difficult-questions',
      color: 'secondary'
    }
  ];

  return (
    <PageContainer>
      <TopBar
        title={t('app.title')}
        subtitle={<RoleBadge role={t('roles.investigator')} />}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        {/* Hero de Bienvenida */}
        <Card variant="gradient" className="home-welcome-hero">
          <div className="home-welcome-hero-content">
            <h1 className="home-welcome-hero-title">{t('home.welcome.title')}</h1>
            <p className="home-welcome-hero-subtitle">{t('home.welcome.subtitle')}</p>
          </div>
        </Card>

        {/* Tarjeta de Progreso */}
        <Card variant="gradient" className="home-progress-card">
          <div className="progress-card-header">
            <div>
              <h2 className="progress-title">{t('home.progress.title')}</h2>
              <p className="progress-stats">
                {t('home.progress.stats', { completed: completedLessons, total: totalLessons })}
              </p>
              <p className="progress-hint">{t('home.progress.hint')}</p>
            </div>
            <div className="progress-percentage">
              {t('home.progress.percentLabel', { percent: progressPercent })}
            </div>
          </div>
          <ProgressBar value={progressPercent} variant="primary" size="md" showLabel={false} />
        </Card>

        {/* Iniciar Jornada */}
        <Card variant="default" className="home-start-journey-card" onClick={handleStartLesson}>
          <div className="start-journey-icon">{currentLesson ? '📖' : '🚀'}</div>
          <div className="start-journey-content">
            <h3 className="start-journey-title">{t('home.startJourney.title')}</h3>
            <p className="start-journey-subtitle">
              {currentLesson 
                ? `${t('home.continueIn')}: ${currentLesson.title[locale]}`
                : t('home.startJourney.subtitle')
              }
            </p>
          </div>
          <button className="start-journey-button" onClick={(e) => { e.stopPropagation(); handleStartLesson(); }}>
            {t('home.startJourney.button')}
          </button>
        </Card>

        {/* Mensaje Diario */}
        <Card variant="gradient" className="home-daily-message-card">
          <h3 className="daily-message-title">
            <span className="daily-message-icon">✨</span>
            {t('home.dailyMessage.title')}
          </h3>
          
          <div className="daily-message-scripture">
            <div className="scripture-ref">{t(`${msgKey}.scriptureRef` as any)}</div>
            <div className="scripture-text">{t(`${msgKey}.scriptureText` as any)}</div>
          </div>

          <div className="daily-message-reflection">
            <p>{t(`${msgKey}.reflection` as any)}</p>
          </div>

          <div className="daily-message-action">
            <strong>{t('home.dailyMessage.todayActionTitle')}</strong>
            <p>{t(`${msgKey}.action` as any)}</p>
          </div>

          {lessonTitle && (
            <div className="daily-message-lesson-link" style={{ marginTop: '12px', fontSize: '12px', opacity: 0.8 }}>
              {t('home.dailyMessage.fromLessonLabel', { lessonTitle })}
            </div>
          )}

          <div className="devotional-feedback">
            <ButtonSecondary
              size="sm"
              onClick={() => setDevotionalFeedback(devotionalFeedback === 'felt' ? null : 'felt')}
              className={devotionalFeedback === 'felt' ? 'active' : ''}
            >
              {t('home.dailyMessage.buttonFeltSomething')}
            </ButtonSecondary>
            <ButtonSecondary
              size="sm"
              onClick={() => setDevotionalFeedback(devotionalFeedback === 'confused' ? null : 'confused')}
              className={devotionalFeedback === 'confused' ? 'active' : ''}
            >
              {t('home.dailyMessage.buttonNeedHelp')}
            </ButtonSecondary>
          </div>
        </Card>

        {/* Sugerencia para hoy */}
        {todaySuggestion && (
          <Card variant="gradient" className="home-today-suggestion-card">
            <h3 className="home-today-suggestion-title">
              {t('investigatorCommitments.todaySuggestion.title')}
            </h3>
            <p className="home-today-suggestion-text">{todaySuggestion.text}</p>
            <ButtonSecondary
              onClick={async () => {
                try {
                  await InvestigatorCommitmentsService.updateCommitmentState(todaySuggestion.id, 'today');
                  const loaded = await InvestigatorCommitmentsService.loadCommitments();
                  setCommitments(loaded);
                  const suggestion = pickCommitmentForToday(loaded);
                  if (suggestion) {
                    const text = suggestion.text.startsWith('investigatorCommitments.samples.')
                      ? t(suggestion.text as any)
                      : suggestion.text;
                    setTodaySuggestion({ ...suggestion, text });
                  }
                } catch (error) {
                  console.error('Error updating commitment state:', error);
                }
              }}
              className="home-today-suggestion-button"
            >
              {t('investigatorCommitments.todaySuggestion.buttonSetToday')}
            </ButtonSecondary>
          </Card>
        )}

        {/* Próximo Compromiso */}
        <Card variant="outlined" className="next-commitment-card empty">
          <h3 className="commitment-title">{t('home.nextCommitment.title')}</h3>
          <p className="commitment-empty">{t('home.nextCommitment.description')}</p>
        </Card>

        {/* Accesos Rápidos */}
        <Section title={t('home.quickAccess')}>
          <div className="quick-actions-grid">
            {quickAccessItems.map((item, index) => (
              <Card 
                key={index} 
                variant="default" 
                className={`action-card action-${item.color}`} 
                onClick={() => navigate(item.link)}
              >
                <div className="action-icon">{item.icon}</div>
                <div className="action-content">
                  <h4 className="action-title">{item.title}</h4>
                  <p className="action-description">{item.subtitle}</p>
                </div>
                <div className="action-arrow">→</div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Recursos Adicionales */}
        <Section title={t('home.additionalResources.title')}>
          <div className="quick-actions-grid">
            {additionalResources.map((item, index) => (
              <Card 
                key={index} 
                variant="default" 
                className={`action-card action-${item.color}`} 
                onClick={() => navigate(item.link)}
              >
                <div className="action-icon">{item.icon}</div>
                <div className="action-content">
                  <h4 className="action-title">{item.title}</h4>
                  <p className="action-description">{item.subtitle}</p>
                </div>
                <div className="action-arrow">→</div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Tarjeta de Soporte */}
        <Card variant="gradient" className="home-support-card">
          <div className="support-card-icon">
            <FaHeart />
          </div>
          <h3 className="support-card-title">{t('home.supportCard.title')}</h3>
          <p className="support-card-body">{t('home.supportCard.body')}</p>
          <button 
            className="support-card-button"
            onClick={() => {
              // TODO: Implementar navegación a chat con misioneros
              alert(t('home.supportCard.button'));
            }}
          >
            {t('home.supportCard.button')}
          </button>
        </Card>
      </div>
      <AppFooter />
    </PageContainer>
  );
};

export default InvestigatorHome;
