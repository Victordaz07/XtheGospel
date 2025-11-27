import React, { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaBookOpen, FaHandshake, FaBook, FaHeart, FaStar, FaFire, FaUsers, FaCrown, FaLock } from 'react-icons/fa';
import { useI18n } from '../../context/I18nContext';
import { useMemberProgressStore } from '../state/memberProgressStore';
import { memberStudyModules } from '../data/memberStudyModules';
import { memberActivities } from '../data/memberActivities';
import { buildSectionProgressId } from '../utils/progressIds';
import '../../pages/Page.css';
import './ProgressPage.css';

const LEVEL_BOUNDARIES = [
  { level: 1, min: 0, max: 199, name: 'Principiante' },
  { level: 2, min: 200, max: 499, name: 'Discípulo' },
  { level: 3, min: 500, max: 999, name: 'Mentor' },
  { level: 4, min: 1000, max: Infinity, name: 'Guía' },
];

const BADGE_CATALOG = [
  { id: 'primer-estudio', name: 'Primera Luz', icon: '💡', color: 'yellow', emoji: '💡' },
  { id: 'companion-fiel', name: 'Compañero Fiel', icon: '🤝', color: 'blue', emoji: '🤝' },
  { id: 'disciplina-constante', name: 'Discípulo Constante', icon: '🔥', color: 'green', emoji: '🔥' },
  { id: 'mentor-de-fe', name: 'Mentor de Fe', icon: '📚', color: 'indigo', emoji: '📚' },
  { id: 'faro-del-barrio', name: 'Faro del Barrio', icon: '🏮', color: 'purple', emoji: '🏮' },
  { id: 'guardian-del-templo', name: 'Guardián del Templo', icon: '⛪', color: 'amber', emoji: '⛪' },
];

const BADGE_CATALOG_TOTAL = 24; // Total badges available

export const ProgressPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const progress = useMemberProgressStore((state) => state.progress);
  const completedStudySectionIds = useMemberProgressStore((state) => state.completedStudySectionIds);

  // Safety check
  if (!progress) {
    return (
      <div className="page progress-page-new">
        <div className="page-content progress-page-content-new">
          <p>Loading progress...</p>
        </div>
      </div>
    );
  }

  // Calculate level progress data
  console.log('ProgressPage rendering', { progress, completedStudySectionIds });
  const currentWindow = LEVEL_BOUNDARIES.find((entry) => entry.level === progress.level) ?? LEVEL_BOUNDARIES[0];
  const xpIntoLevel = Math.max(progress.xp - currentWindow.min, 0);
  const xpWindowSize = currentWindow.max === Infinity ? 400 : currentWindow.max - currentWindow.min + 1;
  const xpToNextLevel = currentWindow.max === Infinity ? '∞' : String(Math.max(currentWindow.max + 1 - progress.xp, 0));

  const completedSectionsList = useMemo(() => {
    const entries: { moduleTitle: string; sectionTitle: string }[] = [];
    memberStudyModules.forEach((module) => {
      module.sections.forEach((section) => {
        if (completedStudySectionIds.includes(buildSectionProgressId(module.id, section.id))) {
          entries.push({ moduleTitle: module.title, sectionTitle: section.title });
        }
      });
    });
    return entries;
  }, [completedStudySectionIds]);

  const completedActivities = useMemo(() => {
    return memberActivities.filter((activity) => progress.completedActivityIds.includes(activity.id));
  }, [progress.completedActivityIds]);

  const earnedBadgeIds = useMemo(() => new Set(progress.earnedBadges.map((b) => b.id)), [progress.earnedBadges]);

  // Get next lesson (mock - you can implement actual logic)
  const nextLesson = {
    title: t('member.progress.nextLesson.title') || 'Continuar siguiente lección',
    subtitle: t('member.progress.nextLesson.subtitle') || 'Doctrina de Cristo en la vida diaria',
    link: '/member/study',
  };

  console.log('ProgressPage render - progress:', progress);

  return (
    <div className="page progress-page-new">
      <button
        className="progress-back-button"
        onClick={() => navigate(-1)}
        aria-label={t('common.back') || 'Volver'}
      >
        <FaArrowLeft />
        <span>{t('common.back') || 'Volver'}</span>
      </button>

      <div className="page-content progress-page-content-new" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header className="progress-header-new">
          <div className="progress-header-left">
            <div className="progress-header-icon-new">
              <FaBookOpen />
            </div>
            <div>
              <h1 className="progress-header-title-new">
                {t('member.progress.header.dashboard') || 'Progress Dashboard'}
              </h1>
              <span className="progress-header-badge-new">
                {t('roles.member.title') || 'MEMBER'}
              </span>
            </div>
          </div>
          <button className="progress-header-notification" aria-label={t('memberHome.notifications.title') || 'Notificaciones'}>
            <span>🔔</span>
          </button>
        </header>

        {/* XP Overview Section */}
        <section className="progress-xp-section">
          <div className="progress-xp-card">
            <div className="progress-xp-header">
              <div>
                <p className="progress-xp-label">{t('member.progress.xp.total') || 'Total Experience'}</p>
                <h2 className="progress-xp-value">{progress.xp.toLocaleString()} XP</h2>
              </div>
              <div className="progress-xp-star">
                <FaStar />
              </div>
            </div>
            <div className="progress-xp-stats">
              <div className="progress-xp-stat">
                <p className="progress-xp-stat-value">{progress.streakDays}</p>
                <p className="progress-xp-stat-label">{t('member.progress.xp.dayStreak') || 'Day Streak'}</p>
              </div>
              <div className="progress-xp-divider"></div>
              <div className="progress-xp-stat">
                <p className="progress-xp-stat-value">{t('member.progress.xp.level') || 'Level'} {progress.level}</p>
                <p className="progress-xp-stat-label">{t('member.progress.xp.currentLevel') || 'Current Level'}</p>
              </div>
              <div className="progress-xp-divider"></div>
              <div className="progress-xp-stat">
                <p className="progress-xp-stat-value">{xpToNextLevel}</p>
                <p className="progress-xp-stat-label">{t('member.progress.xp.toNextLevel') || 'To Next Level'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="progress-badges-section">
          <div className="progress-badges-header">
            <h3 className="progress-badges-title">{t('member.progress.badges.title') || 'Badges Earned'}</h3>
            <span className="progress-badges-count">
              {progress.earnedBadges.length} {t('member.progress.badges.of') || 'of'} {BADGE_CATALOG_TOTAL}
            </span>
          </div>
          <div className="progress-badges-grid">
            {BADGE_CATALOG.map((badge) => {
              const isEarned = earnedBadgeIds.has(badge.id);
              return (
                <div key={badge.id} className={`progress-badge-item ${isEarned ? 'earned' : 'locked'}`}>
                  <div className={`progress-badge-icon progress-badge-icon-${badge.color} ${isEarned ? '' : 'locked'}`}>
                    {isEarned ? <span className="progress-badge-emoji">{badge.emoji}</span> : <FaLock />}
                  </div>
                  <p className="progress-badge-label">{isEarned ? badge.name : t('member.progress.badges.locked') || 'Locked'}</p>
                </div>
              );
            })}
            {/* Fill remaining slots with locked badges */}
            {Array.from({ length: BADGE_CATALOG_TOTAL - BADGE_CATALOG.length }).map((_, index) => (
              <div key={`locked-${index}`} className="progress-badge-item locked">
                <div className="progress-badge-icon locked">
                  <FaLock />
                </div>
                <p className="progress-badge-label">{t('member.progress.badges.locked') || 'Locked'}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What do you want to do now? Section */}
        <section className="progress-actions-section">
          <div className="progress-actions-card">
            <div className="progress-actions-header">
              <div className="progress-actions-icon">
                <span>🚀</span>
              </div>
              <div>
                <h3 className="progress-actions-title">
                  {t('member.progress.actions.title') || 'What do you want to do now?'}
                </h3>
                <p className="progress-actions-subtitle">
                  {t('member.progress.actions.subtitle') || 'Continue building your spiritual foundation'}
                </p>
              </div>
            </div>
            <div className="progress-actions-list">
              <Link to={nextLesson.link} className="progress-action-button progress-action-primary">
                <div className="progress-action-content">
                  <FaBookOpen className="progress-action-icon" />
                  <div className="progress-action-text">
                    <p className="progress-action-title">{nextLesson.title}</p>
                    <p className="progress-action-subtitle">{nextLesson.subtitle}</p>
                  </div>
                </div>
                <span className="progress-action-arrow">→</span>
              </Link>
              <Link to="/member/commitments" className="progress-action-button progress-action-secondary">
                <div className="progress-action-content">
                  <FaHandshake className="progress-action-icon progress-action-icon-green" />
                  <div className="progress-action-text">
                    <p className="progress-action-title">
                      {t('member.progress.actions.reviewCommitments') || 'Review Commitments'}
                    </p>
                    <p className="progress-action-subtitle">
                      {t('member.progress.actions.activeCommitments', { count: 3 }) || '3 active commitments'}
                    </p>
                  </div>
                </div>
                <span className="progress-action-arrow">→</span>
              </Link>
              <Link to="/member/study" className="progress-action-button progress-action-secondary">
                <div className="progress-action-content">
                  <FaBook className="progress-action-icon progress-action-icon-blue" />
                  <div className="progress-action-text">
                    <p className="progress-action-title">
                      {t('member.progress.actions.dailyScripture') || 'Daily Scripture Study'}
                    </p>
                    <p className="progress-action-subtitle">
                      {t('member.progress.actions.strengthenTestimony') || 'Strengthen your testimony'}
                    </p>
                  </div>
                </div>
                <span className="progress-action-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Encouragement Section */}
        <section className="progress-encouragement-section">
          <div className="progress-encouragement-card">
            <div className="progress-encouragement-content">
              <FaHeart className="progress-encouragement-icon" />
              <h3 className="progress-encouragement-title">
                {t('member.progress.encouragement.title') || "You're doing amazing!"}
              </h3>
              <p className="progress-encouragement-text">
                {t('member.progress.encouragement.message') || 'Every step you take brings you closer to understanding eternal truths. Keep going, and remember that the Lord is with you on this journey.'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
