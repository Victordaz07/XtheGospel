import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaBookOpen, FaPenToSquare, FaHandsPraying, FaCircleQuestion } from 'react-icons/fa6';
import { lessons, getLessonById } from '../data/lessons';
import { getHomeScripture } from '../data/scriptures';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { ScriptureCard } from '../components/ScriptureCard';
import './InvestigatorHomePage.css';

export default function InvestigatorHomePage(): JSX.Element {
  const { lastLessonId, getLessonStatus } = useInvestigatorStore();
  const homeScripture = getHomeScripture();
  
  // Get current lesson to continue or first lesson
  const currentLesson = lastLessonId 
    ? getLessonById(lastLessonId) 
    : lessons[0];
  
  // Get next lessons (exclude current)
  const upNextLessons = lessons
    .filter((l) => l.id !== currentLesson?.id)
    .filter((l) => getLessonStatus(l.id) !== 'completed')
    .slice(0, 2);

  return (
    <div className="inv-home">
      {/* Welcome Card */}
      <div className="inv-home__welcome">
        <p className="inv-home__welcome-greeting">Welcome back 👋</p>
        <h1 className="inv-home__welcome-title">Your Journey Awaits</h1>
        <p className="inv-home__welcome-subtitle">
          Continue learning about the gospel and discover eternal truths.
        </p>
      </div>

      {/* Continue Learning */}
      {currentLesson && (
        <div className="inv-home__continue">
          <div className="inv-home__continue-header">
            <span className="inv-home__continue-label">Continue Learning</span>
            <Link to="/investigator/lessons" className="inv-home__continue-link">
              View all
            </Link>
          </div>
          <Link 
            to={`/investigator/lessons/${currentLesson.id}`} 
            className="inv-home__continue-card"
          >
            <div className="inv-home__continue-icon">{currentLesson.icon}</div>
            <div className="inv-home__continue-info">
              <h3 className="inv-home__continue-title">{currentLesson.title}</h3>
              <p className="inv-home__continue-meta">
                {currentLesson.estimatedMinutes} min • {currentLesson.sections.length} sections
              </p>
            </div>
            <FaChevronRight className="inv-home__continue-arrow" />
          </Link>
        </div>
      )}

      {/* Up Next */}
      {upNextLessons.length > 0 && (
        <div className="inv-home__section">
          <h2 className="inv-home__section-title">Up Next</h2>
          <div className="inv-home__upnext-list">
            {upNextLessons.map((lesson) => (
              <Link 
                key={lesson.id} 
                to={`/investigator/lessons/${lesson.id}`}
                className="inv-home__upnext-item"
              >
                <span className="inv-home__upnext-icon">{lesson.icon}</span>
                <h3 className="inv-home__upnext-title">{lesson.title}</h3>
                <span className="inv-home__upnext-time">{lesson.estimatedMinutes} min</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="inv-home__section">
        <h2 className="inv-home__section-title">Quick Actions</h2>
        <div className="inv-home__actions">
          <Link to="/investigator/lessons" className="inv-home__action-btn">
            <div className="inv-home__action-icon">
              <FaBookOpen />
            </div>
            <span className="inv-home__action-label">All Lessons</span>
          </Link>
          <Link to="/investigator/journal" className="inv-home__action-btn">
            <div className="inv-home__action-icon">
              <FaPenToSquare />
            </div>
            <span className="inv-home__action-label">My Journal</span>
          </Link>
          <button className="inv-home__action-btn" onClick={() => alert('Prayer feature coming soon!')}>
            <div className="inv-home__action-icon">
              <FaHandsPraying />
            </div>
            <span className="inv-home__action-label">Prayer Guide</span>
          </button>
          <button className="inv-home__action-btn" onClick={() => alert('Questions feature coming soon!')}>
            <div className="inv-home__action-icon">
              <FaCircleQuestion />
            </div>
            <span className="inv-home__action-label">Ask Question</span>
          </button>
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
