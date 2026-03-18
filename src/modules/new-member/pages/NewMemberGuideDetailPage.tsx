import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { getGuideTopicById } from '../data/guideTopics';
import { getLessonById } from '../../investigator/data/lessons';
import { useInvestigatorStore } from '../../investigator/store/useInvestigatorStore';
import { useSpiritualMemoryStore } from '../../../core/memory/useSpiritualMemoryStore';
import { useI18n } from '../../../context/I18nContext';
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
  const { t, locale } = useI18n();
  const { topicId } = useParams<keyof TopicParams>() as TopicParams;
  const { addJournalEntry } = useInvestigatorStore();
  const { setLastLesson, markSavedToJournal } = useSpiritualMemoryStore();

  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);

  const topic = getGuideTopicById(topicId);
  const lesson = topic ? null : getLessonById(topicId, locale);

  // Remember last visited topic
  useEffect(() => {
    if (topic) {
      setLastLesson({ id: topicId, title: topic.title });
    } else if (lesson) {
      setLastLesson({ id: topicId, title: lesson.title });
    }
  }, [topic, lesson, topicId, setLastLesson]);

  const handleSaveReflection = (): void => {
    if (reflection.trim()) {
      addJournalEntry({
        type: 'text',
        content: reflection,
        lessonId: topicId, // Reuse lessonId field for topic reference
      });
      markSavedToJournal();
      setReflection('');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (!topic && !lesson) {
    return (
      <div className="nm-guide-detail">
        <Link to="/lessons" className="nm-guide-detail__back">
          <FaArrowLeft /> {t('app.lessons.backToExplore')}
        </Link>
        <div className="nm-guide-detail__not-found">
          <div className="nm-guide-detail__not-found-icon">📚</div>
          <h2 className="nm-guide-detail__not-found-title">{t('app.lessons.notAvailableTitle')}</h2>
          <p className="nm-guide-detail__not-found-text">
            {t('app.lessons.notAvailableText')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="nm-guide-detail">
      {/* Back Button */}
      <Link to="/lessons" className="nm-guide-detail__back">
        <FaArrowLeft /> {t('app.lessons.backToExplore')}
      </Link>

      {/* Header */}
      <header className="nm-guide-detail__header">
        <h1 className="nm-guide-detail__title">{(topic ?? lesson)!.title}</h1>
        <p className="nm-guide-detail__subtitle">
          {(topic ?? lesson)!.subtitle}
        </p>
      </header>

      {/* Sections */}
      <div className="nm-guide-detail__sections">
        {topic
          ? topic.sections.map((section, index) => (
              <article key={index} className="nm-guide-detail__section">
                <h2 className="nm-guide-detail__section-title">
                  {section.title}
                </h2>
                <p className="nm-guide-detail__section-content">
                  {section.content}
                </p>
              </article>
            ))
          : lesson!.sections.map(section => (
              <article key={section.id} className="nm-guide-detail__section">
                <h2 className="nm-guide-detail__section-title">
                  {section.title}
                </h2>
                <div className="nm-guide-detail__section-content">
                  {section.content.split(/\n\n+/).map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
                </div>
              </article>
            ))}
      </div>

      {/* Reflection */}
      <div className="nm-guide-detail__reflection">
        <h3 className="nm-guide-detail__reflection-label">{t('app.lessons.personalReflection')}</h3>
        <p className="nm-guide-detail__reflection-prompt">
          {topic ? topic.reflectionPrompt : lesson!.reflectionPrompt}
        </p>
        <textarea
          className="nm-guide-detail__reflection-textarea"
          placeholder={t('app.lessons.reflectionPlaceholder')}
          value={reflection}
          onChange={e => setReflection(e.target.value)}
        />
        <div className="nm-guide-detail__reflection-actions">
          <button
            className="nm-guide-detail__btn nm-guide-detail__btn--primary"
            onClick={handleSaveReflection}
            disabled={!reflection.trim()}
          >
            {saved ? t('app.lessons.savedToJournal') : t('app.lessons.saveToJournal')}
          </button>
        </div>
        {saved && (
          <p className="nm-guide-detail__saved-message">
            {t('app.lessons.savedMessage')}
          </p>
        )}
      </div>

      {/* Footer encouragement */}
      <footer className="nm-guide-detail__footer">
        <p className="nm-guide-detail__footer-text">
          {t('app.lessons.footerText')}
        </p>
      </footer>
    </div>
  );
}
