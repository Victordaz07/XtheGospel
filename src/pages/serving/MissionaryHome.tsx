import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaBell } from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import { CommitmentsService, Commitment } from '../../services/commitmentsService';
import { useProgress } from '../../context/ProgressContext';
import {
  PageContainer,
  TopBar,
  RoleBadge,
  Card,
  Section,
  StatPill,
  CommitCard,
  IconButton,
} from '../../ui/components';
import '../learning/Page.css';
import '../learning/HomePage.css';
import './MissionaryHome.css';

const MissionaryHome: React.FC = () => {
  const { t } = useI18n();
  const { progress, getOverallProgress } = useProgress();
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [upcomingCommitments, setUpcomingCommitments] = useState<Commitment[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const allCommitments = await CommitmentsService.loadCommitments();
    setCommitments(allCommitments);
    
    // Próximos compromisos (no completados, con fecha)
    const upcoming = allCommitments
      .filter(c => !c.completed && c.dueDate)
      .sort((a, b) => {
        const dateA = new Date(a.dueDate!).getTime();
        const dateB = new Date(b.dueDate!).getTime();
        return dateA - dateB;
      })
      .slice(0, 3);
    setUpcomingCommitments(upcoming);
  };

  const overallProgress = getOverallProgress();
  const completedCommitments = commitments.filter(c => c.completed).length;
  const totalCommitments = commitments.length;
  const pendingCommitments = commitments.filter(c => !c.completed).length;

  return (
    <PageContainer>
      <TopBar
        title="App Misional"
        subtitle={<RoleBadge role={t('auth.missionary') || 'Missionary'} />}
        rightAction={<IconButton icon={<FaBell />} ariaLabel="Notifications" />}
      />

      <Card variant="gradient" className="home-welcome-block">
        <h2>{t('missionary.home.title') || 'Inicio - Misionero'}</h2>
        <p>{t('missionary.home.subtitle') || 'Panel de control y herramientas'}</p>
      </Card>

      <div className="page-content">
        {/* Estadísticas rápidas */}
        <div className="progress-metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <StatPill
            label={t('missionary.home.lessonsCompleted') || 'Lecciones completadas'}
            value={`${overallProgress.completedLessons} / ${overallProgress.totalLessons}`}
            icon={<span>📊</span>}
            variant="primary"
          />
          <StatPill
            label={t('missionary.home.commitmentsCompleted') || 'Compromisos cumplidos'}
            value={`${completedCommitments} / ${totalCommitments}`}
            icon={<span>✅</span>}
            variant="success"
          />
          <StatPill
            label={t('missionary.home.pendingCommitments') || 'Compromisos pendientes'}
            value={pendingCommitments.toString()}
            icon={<span>⏳</span>}
            variant="warning"
          />
          <StatPill
            label={t('missionary.home.progress') || 'Progreso general'}
            value={`${overallProgress.percentage}%`}
            icon={<span>📈</span>}
            variant="info"
          />
        </div>

        {/* Próximos compromisos */}
        {upcomingCommitments.length > 0 && (
          <Section
            title={t('missionary.home.upcomingCommitments') || 'Próximos Compromisos'}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {upcomingCommitments.map((commitment) => (
                <CommitCard
                  key={commitment.id}
                  id={commitment.id}
                  title={commitment.title}
                  dueDate={commitment.dueDate}
                  to="/tasks"
                />
              ))}
            </div>
          </Section>
        )}

        {/* Acciones rápidas */}
        <Section title={t('missionary.home.quickActions') || 'Acciones Rápidas'}>
          <div className="quick-actions-grid">
            <Card variant="default" className="action-primary" onClick={() => window.location.href = '/lessons'}>
              <div className="action-icon">📖</div>
              <div className="action-content">
                <h4 className="action-title">{t('missionary.home.viewLessons') || 'Ver Mis Lecciones'}</h4>
                <p className="action-description">{t('missionary.home.viewLessonsDesc') || 'Accede a tus hojas de estudio PMG'}</p>
              </div>
              <div className="action-arrow">→</div>
            </Card>

            <Card variant="default" className="action-secondary" onClick={() => window.location.href = '/people'}>
              <div className="action-icon">👥</div>
              <div className="action-content">
                <h4 className="action-title">{t('missionary.home.viewPeople') || 'Ver Personas'}</h4>
                <p className="action-description">{t('missionary.home.viewPeopleDesc') || 'Gestiona tus investigadores'}</p>
              </div>
              <div className="action-arrow">→</div>
            </Card>

            <Card variant="default" className="action-accent" onClick={() => window.location.href = '/agenda'}>
              <div className="action-icon">📅</div>
              <div className="action-content">
                <h4 className="action-title">{t('missionary.home.viewAgenda') || 'Ver Agenda'}</h4>
                <p className="action-description">{t('missionary.home.viewAgendaDesc') || 'Revisa tus citas y actividades'}</p>
              </div>
              <div className="action-arrow">→</div>
            </Card>

            <Card variant="default" className="action-info" onClick={() => window.location.href = '/tasks'}>
              <div className="action-icon">✅</div>
              <div className="action-content">
                <h4 className="action-title">{t('missionary.home.viewCommitments') || 'Ver Compromisos'}</h4>
                <p className="action-description">{t('missionary.home.viewCommitmentsDesc') || 'Gestiona compromisos y tareas'}</p>
              </div>
              <div className="action-arrow">→</div>
            </Card>
          </div>
        </Section>
      </div>
    </PageContainer>
  );
};

export default MissionaryHome;
