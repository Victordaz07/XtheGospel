import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaBookOpen, FaPenToSquare, FaChartLine, FaHandsPraying, FaComments } from 'react-icons/fa6';
import {
  getInvestigatorCoreLessons,
  getLessonById,
  isInvestigatorCoreTopicId,
} from '../data/lessons';
import { getHomeScripture } from '../data/scriptures';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { ScriptureCard } from '../components/ScriptureCard';
import { useI18n } from '../../../context/I18nContext';
import { useChatNavigation } from '../hooks/useChatNavigation';
import './InvestigatorHomePage.css';

/**
 * Investigator Home Page
 * Sprint 7 - Pastoral tone, no metrics
 * Now with i18n support and dynamic greeting
 */
export default function InvestigatorHomePage(): JSX.Element {
  const { t, locale } = useI18n();
  const { lastLessonId } = useInvestigatorStore();
  const { openChat, status, clearStatus } = useChatNavigation();
  const contentLocale: 'es' | 'en' = locale === 'es' ? 'es' : 'en';
  const homeScripture = getHomeScripture(contentLocale);
  const coreLessons = getInvestigatorCoreLessons(contentLocale);

  useEffect(() => {
    if (status === 'no-missionaries' || status === 'error') {
      const timer = setTimeout(clearStatus, 4000);
      return () => clearTimeout(timer);
    }
  }, [status, clearStatus]);

  // Get time-based greeting
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return t('app.home.greetingMorning');
    if (hour < 18) return t('app.home.greetingAfternoon');
    return t('app.home.greetingEvening');
  };

  // Get current lesson to continue or first lesson
  const currentLesson =
    lastLessonId && isInvestigatorCoreTopicId(lastLessonId)
      ? getLessonById(lastLessonId, contentLocale)
      : coreLessons[0];

  return (
    <div className="inv-home anim-fade-up">
      {/* Welcome Card - Hero */}
      <section className="inv-home__welcome" aria-label={t('app.home.greeting')}>
        <p className="inv-home__welcome-greeting">{getGreeting()} 👋</p>
        <h1 className="inv-home__welcome-title">{t('app.home.title')}</h1>
        <p className="inv-home__welcome-subtitle">
          {t('app.home.subtitle')}
        </p>
      </section>

      {/* Continue Learning - Hero Card */}
      {currentLesson && (
        <div className="inv-home__continue">
          <div className="inv-home__continue-header">
            <span className="inv-home__continue-label">
              {lastLessonId ? t('app.home.continueLabel') : t('app.home.startLabel')}
            </span>
            <Link to="/lessons" className="inv-home__continue-link">
              {t('app.common.seeAll')}
            </Link>
          </div>
          <Link
            to={`/lessons/${currentLesson.id}`}
            className="inv-home__continue-card"
          >
            <div className="inv-home__continue-icon">{currentLesson.icon}</div>
            <div className="inv-home__continue-info">
              <h3 className="inv-home__continue-title">
                {currentLesson.title}
              </h3>
              <p className="inv-home__continue-meta">
                {currentLesson.subtitle}
              </p>
            </div>
            <FaChevronRight className="inv-home__continue-arrow" />
          </Link>
        </div>
      )}

      {/* Daily Scripture */}
      <div className="inv-home__scripture-section">
        <h2 className="inv-home__section-title">{t('app.home.scriptureTitle')}</h2>
        <ScriptureCard scripture={homeScripture} />
      </div>

      {/* Quick Actions - Grid of 4 */}
      <nav className="inv-home__section" aria-label={t('app.home.actions')}>
        <h2 className="inv-home__section-title">{t('app.home.actions')}</h2>
        <div className="inv-home__actions" role="list">
          <Link to="/lessons" className="inv-home__action-btn" role="listitem" aria-label={t('app.home.missionaryPath')}>
            <div className="inv-home__action-icon" aria-hidden="true">
              <FaBookOpen />
            </div>
            <span className="inv-home__action-label">{t('app.home.missionaryPath')}</span>
          </Link>
          <Link to="/journal" className="inv-home__action-btn" role="listitem" aria-label={t('app.home.myJournal')}>
            <div className="inv-home__action-icon" aria-hidden="true">
              <FaPenToSquare />
            </div>
            <span className="inv-home__action-label">{t('app.home.myJournal')}</span>
          </Link>
          <Link to="/progress" className="inv-home__action-btn" role="listitem" aria-label={t('app.home.myProgress')}>
            <div className="inv-home__action-icon" aria-hidden="true">
              <FaChartLine />
            </div>
            <span className="inv-home__action-label">{t('app.home.myProgress')}</span>
          </Link>
          <Link to="/profile" className="inv-home__action-btn" role="listitem" aria-label={t('app.home.pray')}>
            <div className="inv-home__action-icon" aria-hidden="true">
              <FaHandsPraying />
            </div>
            <span className="inv-home__action-label">{t('app.home.pray')}</span>
          </Link>
          <button
            type="button"
            className="inv-home__action-btn"
            role="listitem"
            onClick={openChat}
            disabled={status === 'loading'}
            aria-label={t('app.home.chatWithMissionaries')}
          >
            <div className="inv-home__action-icon" aria-hidden="true">
              <FaComments />
            </div>
            <span className="inv-home__action-label">
              {status === 'loading' ? t('app.common.loading') : t('app.home.chatWithMissionaries')}
            </span>
          </button>
        </div>
      </nav>
      {(status === 'no-missionaries' || status === 'error') && (
        <div className="inv-home__toast" role="status">
          {status === 'no-missionaries'
            ? t('app.home.noMissionariesAssigned')
            : t('app.home.chatError')}
        </div>
      )}
    </div>
  );
}
