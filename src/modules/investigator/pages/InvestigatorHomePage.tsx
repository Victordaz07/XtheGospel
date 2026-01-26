import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaBookOpen, FaPenToSquare } from 'react-icons/fa6';
import { lessons, getLessonById } from '../data/lessons';
import { getHomeScripture } from '../data/scriptures';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { ScriptureCard } from '../components/ScriptureCard';
import './InvestigatorHomePage.css';

/**
 * Investigator Home Page
 * Sprint 7 - Pastoral tone, no metrics
 */
export default function InvestigatorHomePage(): JSX.Element {
  const { lastLessonId } = useInvestigatorStore();
  const homeScripture = getHomeScripture();
  
  // Get current lesson to continue or first lesson
  const currentLesson = lastLessonId 
    ? getLessonById(lastLessonId) 
    : lessons[0];
  
  // Get suggested lessons (exclude current, show next 2)
  const suggestedLessons = lessons
    .filter((l) => l.id !== currentLesson?.id)
    .slice(0, 2);

  return (
    <div className="inv-home">
      {/* Welcome Card */}
      <div className="inv-home__welcome">
        <p className="inv-home__welcome-greeting">Welcome 👋</p>
        <h1 className="inv-home__welcome-title">Your Journey Awaits</h1>
        <p className="inv-home__welcome-subtitle">
          Explore the gospel at your own pace. There's no rush—just discovery.
        </p>
      </div>

      {/* Continue Learning */}
      {currentLesson && (
        <div className="inv-home__continue">
          <div className="inv-home__continue-header">
            <span className="inv-home__continue-label">
              {lastLessonId ? 'Continue exploring' : 'Start your journey'}
            </span>
            <Link to="/lessons" className="inv-home__continue-link">
              See all
            </Link>
          </div>
          <Link 
            to={`/lessons/${currentLesson.id}`} 
            className="inv-home__continue-card"
          >
            <div className="inv-home__continue-icon">{currentLesson.icon}</div>
            <div className="inv-home__continue-info">
              <h3 className="inv-home__continue-title">{currentLesson.title}</h3>
              <p className="inv-home__continue-meta">{currentLesson.subtitle}</p>
            </div>
            <FaChevronRight className="inv-home__continue-arrow" />
          </Link>
        </div>
      )}

      {/* Suggested Topics */}
      {suggestedLessons.length > 0 && (
        <div className="inv-home__section">
          <h2 className="inv-home__section-title">More to explore</h2>
          <div className="inv-home__upnext-list">
            {suggestedLessons.map((lesson) => (
              <Link 
                key={lesson.id} 
                to={`/lessons/${lesson.id}`}
                className="inv-home__upnext-item"
              >
                <span className="inv-home__upnext-icon">{lesson.icon}</span>
                <h3 className="inv-home__upnext-title">{lesson.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="inv-home__section">
        <h2 className="inv-home__section-title">Quick actions</h2>
        <div className="inv-home__actions">
          <Link to="/lessons" className="inv-home__action-btn">
            <div className="inv-home__action-icon">
              <FaBookOpen />
            </div>
            <span className="inv-home__action-label">All Topics</span>
          </Link>
          <Link to="/journal" className="inv-home__action-btn">
            <div className="inv-home__action-icon">
              <FaPenToSquare />
            </div>
            <span className="inv-home__action-label">My Journal</span>
          </Link>
        </div>
      </div>

      {/* Daily Scripture */}
      <div className="inv-home__scripture-section">
        <h2 className="inv-home__section-title">Today's Scripture</h2>
        <ScriptureCard scripture={homeScripture} />
      </div>
    </div>
  );
}
