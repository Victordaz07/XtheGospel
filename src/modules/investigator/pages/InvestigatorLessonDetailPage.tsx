import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaClock, FaLayerGroup } from 'react-icons/fa6';
import { getLessonById } from '../data/lessons';
import { getLessonDetailScripture } from '../data/scriptures';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { ScriptureCard } from '../components/ScriptureCard';
import { AudioPlayer } from '../components/AudioPlayer';
import './InvestigatorLessonDetailPage.css';

interface LessonParams {
  lessonId: string;
}

export default function InvestigatorLessonDetailPage(): JSX.Element {
  const { lessonId } = useParams<keyof LessonParams>() as LessonParams;
  const navigate = useNavigate();
  const { setLessonStatus, setLastLessonId, getLessonStatus, addJournalEntry } = useInvestigatorStore();
  
  const [reflection, setReflection] = useState('');
  const lesson = getLessonById(lessonId);
  const scripture = getLessonDetailScripture();
  const status = getLessonStatus(lessonId);

  // Mark as exploring when entering
  useEffect(() => {
    if (lesson && status === 'not_started') {
      setLessonStatus(lessonId, 'exploring');
    }
    if (lesson) {
      setLastLessonId(lessonId);
    }
  }, [lesson, lessonId, status, setLessonStatus, setLastLessonId]);

  const handleSaveReflection = (): void => {
    if (reflection.trim()) {
      addJournalEntry({
        type: 'text',
        content: reflection,
        lessonId: lessonId,
      });
      setReflection('');
      alert('Reflection saved to your journal!');
    }
  };

  const handleMarkComplete = (): void => {
    setLessonStatus(lessonId, 'completed');
    navigate('/investigator/lessons');
  };

  if (!lesson) {
    return (
      <div className="inv-lesson-detail">
        <Link to="/investigator/lessons" className="inv-lesson-detail__back">
          <FaArrowLeft /> Back to Lessons
        </Link>
        <div className="inv-lesson-detail__not-found">
          <div className="inv-lesson-detail__not-found-icon">📚</div>
          <h2 className="inv-lesson-detail__not-found-title">Lesson Not Found</h2>
          <p className="inv-lesson-detail__not-found-text">
            The lesson you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="inv-lesson-detail">
      {/* Back Button */}
      <Link to="/investigator/lessons" className="inv-lesson-detail__back">
        <FaArrowLeft /> Back to Lessons
      </Link>

      {/* Header */}
      <div className="inv-lesson-detail__header">
        <div className="inv-lesson-detail__icon">{lesson.icon}</div>
        <h1 className="inv-lesson-detail__title">{lesson.title}</h1>
        <p className="inv-lesson-detail__subtitle">{lesson.subtitle}</p>
        <div className="inv-lesson-detail__meta">
          <span className="inv-lesson-detail__meta-item">
            <FaClock /> {lesson.estimatedMinutes} min
          </span>
          <span className="inv-lesson-detail__meta-item">
            <FaLayerGroup /> {lesson.sections.length} sections
          </span>
        </div>
      </div>

      {/* Sections */}
      <div className="inv-lesson-detail__sections">
        {lesson.sections.map((section, index) => (
          <div key={section.id} className="inv-lesson-detail__section">
            <h3 className="inv-lesson-detail__section-title">
              {index + 1}. {section.title}
            </h3>
            <p className="inv-lesson-detail__section-content">{section.content}</p>
            
            {section.hasAudio && (
              <AudioPlayer label={`Listen to "${section.title}"`} />
            )}
            
            {section.scriptureRef && (
              <p className="inv-lesson-detail__section-scripture">
                📖 {section.scriptureRef}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Scripture Card */}
      <div className="inv-lesson-detail__scripture">
        <p className="inv-lesson-detail__scripture-label">Featured Scripture</p>
        <ScriptureCard scripture={scripture} />
      </div>

      {/* Reflection Prompt */}
      <div className="inv-lesson-detail__reflection">
        <p className="inv-lesson-detail__reflection-label">Reflection</p>
        <p className="inv-lesson-detail__reflection-text">{lesson.reflectionPrompt}</p>
        <textarea
          className="inv-lesson-detail__reflection-textarea"
          placeholder="Write your thoughts here..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="inv-lesson-detail__actions">
        <button 
          className="inv-lesson-detail__btn inv-lesson-detail__btn--secondary"
          onClick={handleSaveReflection}
          disabled={!reflection.trim()}
        >
          Save Reflection
        </button>
        <button 
          className="inv-lesson-detail__btn inv-lesson-detail__btn--primary"
          onClick={handleMarkComplete}
        >
          {status === 'completed' ? 'Completed ✓' : 'Mark Complete'}
        </button>
      </div>
    </div>
  );
}
