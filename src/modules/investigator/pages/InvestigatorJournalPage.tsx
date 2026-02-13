import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaBookOpen } from 'react-icons/fa6';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { useSpiritualMemoryStore } from '../../../core/memory/useSpiritualMemoryStore';
import { getLessonById } from '../data/lessons';
import { getGuideTopicById } from '../../new-member/data/guideTopics';
import { useI18n } from '../../../context/I18nContext';
import './InvestigatorJournalPage.css';

/**
 * Journal Page
 * Sprint 7 - Pastoral tone, improved empty state
 * Now with i18n support
 */
export default function InvestigatorJournalPage(): JSX.Element {
  const { t } = useI18n();
  const [newEntry, setNewEntry] = useState('');
  const { journalEntries, addJournalEntry, deleteJournalEntry } = useInvestigatorStore();
  const { markJournalEntry } = useSpiritualMemoryStore();

  const handleAddEntry = (): void => {
    if (newEntry.trim()) {
      addJournalEntry({
        type: 'text',
        content: newEntry.trim(),
      });
      markJournalEntry();
      setNewEntry('');
    }
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return t('app.common.today');
    if (diffDays === 1) return t('app.common.yesterday');
    if (diffDays < 7) return t('app.common.daysAgo', { count: diffDays });
    
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const getSourceTitle = (lessonId?: string): string | null => {
    if (!lessonId) return null;
    const lesson = getLessonById(lessonId);
    if (lesson) return lesson.title;
    const topic = getGuideTopicById(lessonId);
    if (topic) return topic.title;
    return null;
  };

  // Group entries by time period
  const groupEntriesByPeriod = () => {
    const now = new Date();
    const groups: { [key: string]: typeof journalEntries } = {};
    
    journalEntries.forEach(entry => {
      const date = new Date(entry.createdAt);
      const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      let key: string;
      if (diffDays < 7) {
        key = t('app.common.thisWeek');
      } else if (diffDays < 14) {
        key = t('app.common.lastWeek');
      } else if (diffDays < 30) {
        key = t('app.common.thisMonth');
      } else {
        key = t('app.common.older');
      }
      
      if (!groups[key]) groups[key] = [];
      groups[key].push(entry);
    });
    
    return groups;
  };

  const groupedEntries = groupEntriesByPeriod();

  return (
    <div className="inv-journal anim-fade-up">
      {/* Header */}
      <header className="inv-journal__header">
        <h1 className="inv-journal__title">{t('app.journal.title')}</h1>
        <p className="inv-journal__subtitle">
          {t('app.journal.subtitle')}
        </p>
      </header>

      {/* New Entry */}
      <div className="inv-journal__new">
        <label className="inv-journal__new-label" htmlFor="journal-entry">
          {t('app.journal.writeLabel')}
        </label>
        <textarea
          id="journal-entry"
          className="inv-journal__new-textarea"
          placeholder={t('app.journal.placeholder')}
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
        <button
          className="inv-journal__new-btn"
          onClick={handleAddEntry}
          disabled={!newEntry.trim()}
        >
          {t('app.journal.saveButton')}
        </button>
      </div>

      {/* Entries List */}
      <div className="inv-journal__list">
        <h2 className="inv-journal__list-title">{t('app.journal.reflectionsTitle')}</h2>
        
        {journalEntries.length === 0 ? (
          <div className="inv-journal__empty">
            <div className="inv-journal__empty-icon">{t('app.journal.emptyIcon')}</div>
            <h3 className="inv-journal__empty-title">{t('app.journal.emptyTitle')}</h3>
            <p className="inv-journal__empty-text">
              {t('app.journal.emptyText')}
            </p>
            <Link to="/lessons" className="inv-journal__empty-action">
              <FaBookOpen /> {t('app.journal.emptyAction')}
            </Link>
          </div>
        ) : (
          Object.entries(groupedEntries).map(([period, entries]) => (
            <div key={period} className="inv-journal__group">
              <h3 className="inv-journal__group-title">📅 {period}</h3>
              {entries.map((entry) => {
                const sourceTitle = getSourceTitle(entry.lessonId);
                return (
                  <article key={entry.id} className="inv-journal__entry">
                    <div className="inv-journal__entry-header">
                      <span className="inv-journal__entry-date">
                        {formatDate(entry.createdAt)}
                      </span>
                      <button
                        className="inv-journal__entry-delete"
                        onClick={() => deleteJournalEntry(entry.id)}
                        aria-label={t('app.common.delete')}
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <p className="inv-journal__entry-content">{entry.content}</p>
                    {sourceTitle && (
                      <p className="inv-journal__entry-source">
                        {t('app.journal.fromLesson', { title: sourceTitle })}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
