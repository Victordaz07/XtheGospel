import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { getGuideTopicById } from '../data/guideTopics';
import { useInvestigatorStore } from '../../investigator/store/useInvestigatorStore';
import './NewMemberGuideDetailPage.css';

interface TopicParams {
  topicId: string;
}

/**
 * New Member Guide Detail Page
 * Sprint 5 - Shows topic content with reflection saving
 * 
 * Reuses the investigator journal store for continuity.
 */
export default function NewMemberGuideDetailPage(): JSX.Element {
  const { topicId } = useParams<keyof TopicParams>() as TopicParams;
  const navigate = useNavigate();
  const { addJournalEntry } = useInvestigatorStore();
  
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);
  
  const topic = getGuideTopicById(topicId);

  const handleSaveReflection = (): void => {
    if (reflection.trim()) {
      addJournalEntry({
        type: 'text',
        content: reflection,
        lessonId: topicId, // Reuse lessonId field for topic reference
      });
      setReflection('');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (!topic) {
    return (
      <div className="nm-guide-detail">
        <Link to="/lessons" className="nm-guide-detail__back">
          <FaArrowLeft /> Back to Guide
        </Link>
        <div className="nm-guide-detail__not-found">
          <div className="nm-guide-detail__not-found-icon">📚</div>
          <h2 className="nm-guide-detail__not-found-title">Topic Not Found</h2>
          <p className="nm-guide-detail__not-found-text">
            The topic you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="nm-guide-detail">
      {/* Back Button */}
      <Link to="/lessons" className="nm-guide-detail__back">
        <FaArrowLeft /> Back to Guide
      </Link>

      {/* Header */}
      <header className="nm-guide-detail__header">
        <h1 className="nm-guide-detail__title">{topic.title}</h1>
        <p className="nm-guide-detail__subtitle">{topic.subtitle}</p>
      </header>

      {/* Sections */}
      <div className="nm-guide-detail__sections">
        {topic.sections.map((section, index) => (
          <article key={index} className="nm-guide-detail__section">
            <h2 className="nm-guide-detail__section-title">
              {section.title}
            </h2>
            <p className="nm-guide-detail__section-content">
              {section.content}
            </p>
          </article>
        ))}
      </div>

      {/* Reflection */}
      <div className="nm-guide-detail__reflection">
        <h3 className="nm-guide-detail__reflection-label">Reflection</h3>
        <p className="nm-guide-detail__reflection-prompt">
          {topic.reflectionPrompt}
        </p>
        <textarea
          className="nm-guide-detail__reflection-textarea"
          placeholder="Write your thoughts here..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
        <div className="nm-guide-detail__reflection-actions">
          <button
            className="nm-guide-detail__btn nm-guide-detail__btn--primary"
            onClick={handleSaveReflection}
            disabled={!reflection.trim()}
          >
            {saved ? 'Saved to Journal ✓' : 'Save to Journal'}
          </button>
        </div>
        {saved && (
          <p className="nm-guide-detail__saved-message">
            Your reflection has been saved. View it in your Journal.
          </p>
        )}
      </div>

      {/* Footer encouragement */}
      <footer className="nm-guide-detail__footer">
        <p className="nm-guide-detail__footer-text">
          Take your time with these principles. Growth happens one day at a time.
        </p>
      </footer>
    </div>
  );
}
