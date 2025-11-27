import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaBell } from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import { useProgress } from '../../context/ProgressContext';
import { LESSONS } from '../../../data/lessonsData';
import { getDailyDevotional } from '../../data/devotionals';
import { CommitmentsService } from '../../services/commitmentsService';
import {
  PageContainer,
  TopBar,
  RoleBadge,
  Card,
  Section,
  ProgressBar,
  DevotionalCard,
  CommitCard,
  ButtonSecondary,
  IconButton,
} from '../../ui/components';
import './Page.css';
import './HomePage.css';

const InvestigatorHome: React.FC = () => {
  const { locale, t } = useI18n();
  const { getOverallProgress, getCurrentLesson } = useProgress();
  const [devotionalFeedback, setDevotionalFeedback] = useState<'felt' | 'confused' | null>(null);
  const [nextCommitment, setNextCommitment] = useState<{ id: string; text: string } | null>(null);

  const overallProgress = getOverallProgress();
  const completedLessons = overallProgress.completedLessons || 0;
  const totalLessons = overallProgress.totalLessons || 7;
  const progressPercent = overallProgress.percentage;

  const currentLessonData = getCurrentLesson();
  const currentLesson = currentLessonData ? LESSONS.find(l => l.id === currentLessonData.lessonId) : null;
  const firstLesson = LESSONS[0];

  const dailyDevotional = getDailyDevotional();

  // Cargar próximo compromiso
  useEffect(() => {
    const loadNextCommitment = async () => {
      const commitments = await CommitmentsService.loadCommitments();
      const pending = commitments.filter(c => !c.completed).sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      if (pending.length > 0) {
        setNextCommitment({ id: pending[0].id, text: pending[0].title });
      }
    };
    loadNextCommitment();
  }, []);

  const quickActions = [
    {
      icon: '📖',
      title: t('home.lessons'),
      description: t('home.lessonsDesc'),
      link: '/lessons',
      color: 'primary'
    },
    {
      icon: '📊',
      title: t('tabs.progress'),
      description: t('home.progressDesc'),
      link: '/progress',
      color: 'secondary'
    },
    {
      icon: '✅',
      title: t('home.tasks'),
      description: t('home.tasksDesc'),
      link: '/tasks',
      color: 'accent'
    },
    {
      icon: '💧',
      title: t('home.baptism'),
      description: t('home.baptismDesc'),
      link: '/baptism',
      color: 'info'
    }
  ];

  return (
    <PageContainer>
      <TopBar
        title="App Misional"
        subtitle={<RoleBadge role={t('auth.investigator') || 'Investigator'} />}
        rightAction={<IconButton icon={<FaBell />} ariaLabel="Notifications" />}
      />

      <Card variant="gradient" className="home-welcome-block">
        <h2>{t('home.welcomeTitle') || 'Welcome back!'}</h2>
        <p>{t('home.welcomeMessage') || 'Continue your journey of faith and discovery'}</p>
      </Card>

      <div className="page-content">
        {/* Progress Card */}
        <Card variant="gradient" className="home-progress-card">
          <div className="progress-card-header">
            <div>
              <h2>{t('home.progress')}</h2>
              <p className="progress-subtitle">{completedLessons} {t('home.lessonsCompleted')} {totalLessons} {t('home.lessonsCompletedText')}</p>
              {currentLesson ? (
                <p className="progress-current-lesson">
                  {t('home.currentLesson')}: {currentLesson.title[locale]}
                </p>
              ) : (
                <p className="progress-current-lesson">
                  {t('home.startFirstLesson')}
                </p>
              )}
            </div>
            <div className="progress-percentage">{progressPercent}%</div>
          </div>
          <ProgressBar value={progressPercent} variant="primary" size="md" showLabel={false} />
        </Card>

        {/* Resume Lesson Card */}
        <Card variant="default" className="resume-lesson-card" onClick={() => window.location.href = currentLesson ? `/lessons/${currentLesson.id}` : `/lessons/${firstLesson.id}`}>
          <div className="resume-lesson-icon">{currentLesson ? '📖' : '🚀'}</div>
          <div className="resume-lesson-content">
            <h3>{currentLesson ? t('home.resumeLesson') : t('home.startJourney')}</h3>
            <p>{currentLesson ? `${t('home.continueIn')}: ${currentLesson.title[locale]}` : `${t('home.startWithLesson')}: ${firstLesson.title[locale]}`}</p>
          </div>
          <div className="resume-lesson-arrow">→</div>
        </Card>

        {/* Daily Devotional */}
        <DevotionalCard
          scripture={{
            ref: dailyDevotional.scripture.ref,
            text: dailyDevotional.scripture.text[locale],
          }}
          application={dailyDevotional.application[locale]}
          action={dailyDevotional.action[locale]}
          feedback={
            <div className="devotional-feedback">
              <ButtonSecondary
                size="sm"
                onClick={() => setDevotionalFeedback(devotionalFeedback === 'felt' ? null : 'felt')}
                className={devotionalFeedback === 'felt' ? 'active' : ''}
              >
                {t('home.feltSomething')}
              </ButtonSecondary>
              <ButtonSecondary
                size="sm"
                onClick={() => setDevotionalFeedback(devotionalFeedback === 'confused' ? null : 'confused')}
                className={devotionalFeedback === 'confused' ? 'active' : ''}
              >
                {t('home.notUnderstood')}
              </ButtonSecondary>
            </div>
          }
        />

        {/* Next Commitment Card */}
        {nextCommitment ? (
          <CommitCard
            id={nextCommitment.id}
            title={t('home.nextCommitment')}
            description={nextCommitment.text}
            to="/tasks"
          />
        ) : (
          <Card variant="outlined" className="empty">
            <h3>{t('home.nextCommitment')}</h3>
            <p>{t('home.noCommitmentsYet')}</p>
          </Card>
        )}

        {/* Quick Actions */}
        <Section title={t('home.quickAccess')}>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <Card key={index} variant="default" className={`action-${action.color}`} onClick={() => window.location.href = action.link}>
                <div className="action-icon">{action.icon}</div>
                <div className="action-content">
                  <h4 className="action-title">{action.title}</h4>
                  <p className="action-description">{action.description}</p>
                </div>
                <div className="action-arrow">→</div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Welcome Message */}
        <Card variant="gradient" className="home-welcome-card">
          <div className="welcome-icon">✨</div>
          <h3>{t('home.welcomeTitle')}</h3>
          <p>{t('home.welcomeMessage')}</p>
        </Card>

        {/* Extra Modules */}
        <Section title={t('home.extraModules') || 'Recursos Adicionales'}>
          <div className="quick-actions-grid">
            <Card variant="default" className="action-primary" onClick={() => window.location.href = '/god-story'}>
              <div className="action-icon">📖</div>
              <div className="action-content">
                <h4 className="action-title">{t('godStory.title') || 'Mi Historia con Dios'}</h4>
                <p className="action-description">{t('godStory.subtitle') || 'Registra tus experiencias espirituales'}</p>
              </div>
              <div className="action-arrow">→</div>
            </Card>
            <Card variant="default" className="action-secondary" onClick={() => window.location.href = '/difficult-questions'}>
              <div className="action-icon">❓</div>
              <div className="action-content">
                <h4 className="action-title">{t('difficultQuestions.title') || 'Preguntas Difíciles'}</h4>
                <p className="action-description">{t('difficultQuestions.subtitle') || 'Respuestas a preguntas comunes'}</p>
              </div>
              <div className="action-arrow">→</div>
            </Card>
          </div>
        </Section>
      </div>
    </PageContainer>
  );
};

export default InvestigatorHome;

