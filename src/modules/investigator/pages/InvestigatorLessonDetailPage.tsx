import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { getLessonById } from '../data/lessons';
import { getLessonDetailScripture } from '../data/scriptures';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { useSpiritualMemoryStore } from '../../../core/memory/useSpiritualMemoryStore';
import { ScriptureCard } from '../components/ScriptureCard';
import { AudioPlayer } from '../components/AudioPlayer';
import './InvestigatorLessonDetailPage.css';

interface LessonParams {
  lessonId: string;
}

/**
 * Investigator Lesson Detail Page
 * Sprint 7 - Pastoral tone, no completion tracking
 */
export default function InvestigatorLessonDetailPage(): JSX.Element {
  const { lessonId } = useParams<keyof LessonParams>() as LessonParams;
  const { setLastLessonId, addJournalEntry } = useInvestigatorStore();
  const { setLastLesson, markSavedToJournal } = useSpiritualMemoryStore();
  
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);
  
  const lesson = getLessonById(lessonId);
  const scripture = getLessonDetailScripture();

  // Remember last visited lesson (both stores for compatibility)
  useEffect(() => {
    if (lesson) {
      setLastLessonId(lessonId);
      setLastLesson({ id: lessonId, title: lesson.title });
    }
  }, [lesson, lessonId, setLastLessonId, setLastLesson]);

  const handleSaveReflection = (): void => {
    if (reflection.trim()) {
      addJournalEntry({
        type: 'text',
        content: reflection,
        lessonId: lessonId,
      });
      markSavedToJournal();
      setReflection('');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (!lesson) {
    return (
      <div className="inv-lesson-detail">
        <Link to="/lessons" className="inv-lesson-detail__back">
          <FaArrowLeft /> Back to Topics
        </Link>
        <div className="inv-lesson-detail__not-found">
          <div className="inv-lesson-detail__not-found-icon">📚</div>
          <h2 className="inv-lesson-detail__not-found-title">Topic Not Found</h2>
          <p className="inv-lesson-detail__not-found-text">
            The topic you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="inv-lesson-detail">
      {/* Back Button */}
      <Link to="/lessons" className="inv-lesson-detail__back">
        <FaArrowLeft /> Back to Topics
      </Link>

      {/* Header */}
      <header className="inv-lesson-detail__header">
        <div className="inv-lesson-detail__icon">{lesson.icon}</div>
        <h1 className="inv-lesson-detail__title">{lesson.title}</h1>
        <p className="inv-lesson-detail__subtitle">{lesson.subtitle}</p>
      </header>

      {/* Sections */}
      <div className="inv-lesson-detail__sections">
        {lesson.sections.map((section) => (
          <article key={section.id} className="inv-lesson-detail__section">
            <h2 className="inv-lesson-detail__section-title">
              {section.title}
            </h2>
            <p className="inv-lesson-detail__section-content">{section.content}</p>
            
            {section.hasAudio && (
              <AudioPlayer label={`Listen: ${section.title}`} />
            )}
            
            {section.scriptureRef && (
              <p className="inv-lesson-detail__section-scripture">
                📖 {section.scriptureRef}
              </p>
            )}
          </article>
        ))}
      </div>

      {/* Scripture Card */}
      <div className="inv-lesson-detail__scripture">
        <p className="inv-lesson-detail__scripture-label">Featured Scripture</p>
        <ScriptureCard scripture={scripture} />
      </div>

      {/* Reflection */}
      <div className="inv-lesson-detail__reflection">
        <h3 className="inv-lesson-detail__reflection-label">Reflection</h3>
        <p className="inv-lesson-detail__reflection-prompt">{lesson.reflectionPrompt}</p>
        <textarea
          className="inv-lesson-detail__reflection-textarea"
          placeholder="What thoughts or feelings come to mind?"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
        <button 
          className="inv-lesson-detail__btn"
          onClick={handleSaveReflection}
          disabled={!reflection.trim()}
        >
          {saved ? 'Saved to Journal ✓' : 'Save to Journal'}
        </button>
        {saved && (
          <p className="inv-lesson-detail__saved-message">
            Your reflection has been saved. View it in your Journal.
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="inv-lesson-detail__footer">
        <p className="inv-lesson-detail__footer-text">
          Take your time. Return whenever you'd like.
        </p>
      </footer>
    </div>
  );
}
