import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPenToSquare, FaTrash, FaBookOpen } from 'react-icons/fa6';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { getLessonById } from '../data/lessons';
import { getGuideTopicById } from '../../new-member/data/guideTopics';
import './InvestigatorJournalPage.css';

/**
 * Journal Page
 * Sprint 7 - Pastoral tone, improved empty state
 * Shared across stages (seeking + covenanted)
 */
export default function InvestigatorJournalPage(): JSX.Element {
  const [newEntry, setNewEntry] = useState('');
  const { journalEntries, addJournalEntry, deleteJournalEntry } = useInvestigatorStore();

  const handleAddEntry = (): void => {
    if (newEntry.trim()) {
      addJournalEntry({
        type: 'text',
        content: newEntry.trim(),
      });
      setNewEntry('');
    }
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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

  return (
    <div className="inv-journal">
      {/* Header */}
      <header className="inv-journal__header">
        <h1 className="inv-journal__title">My Journal</h1>
        <p className="inv-journal__subtitle">
          A sacred space for your thoughts and reflections
        </p>
      </header>

      {/* New Entry */}
      <div className="inv-journal__new">
        <label className="inv-journal__new-label" htmlFor="journal-entry">
          Write something
        </label>
        <textarea
          id="journal-entry"
          className="inv-journal__new-textarea"
          placeholder="What's on your heart today? Share a thought, a question, or something you're grateful for..."
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
        <button
          className="inv-journal__new-btn"
          onClick={handleAddEntry}
          disabled={!newEntry.trim()}
        >
          Save Entry
        </button>
      </div>

      {/* Entries List */}
      <div className="inv-journal__list">
        <h2 className="inv-journal__list-title">Your reflections</h2>
        
        {journalEntries.length === 0 ? (
          <div className="inv-journal__empty">
            <div className="inv-journal__empty-icon">📝</div>
            <h3 className="inv-journal__empty-title">Your journal is waiting</h3>
            <p className="inv-journal__empty-text">
              Writing helps us understand what we feel and what we're learning. 
              Start with a single thought—there's no wrong way to begin.
            </p>
            <Link to="/lessons" className="inv-journal__empty-action">
              <FaBookOpen /> Explore a topic for inspiration
            </Link>
          </div>
        ) : (
          journalEntries.map((entry) => {
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
                    aria-label="Delete entry"
                  >
                    <FaTrash />
                  </button>
                </div>
                <p className="inv-journal__entry-content">{entry.content}</p>
                {sourceTitle && (
                  <p className="inv-journal__entry-source">
                    From: {sourceTitle}
                  </p>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
