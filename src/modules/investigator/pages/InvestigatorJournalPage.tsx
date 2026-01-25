import React, { useState } from 'react';
import { FaPenToSquare, FaMicrophone, FaTrash } from 'react-icons/fa6';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { getLessonById } from '../data/lessons';
import './InvestigatorJournalPage.css';

type JournalMode = 'text' | 'voice';

export default function InvestigatorJournalPage(): JSX.Element {
  const [mode, setMode] = useState<JournalMode>('text');
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
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getLessonTitle = (lessonId?: string): string | null => {
    if (!lessonId) return null;
    const lesson = getLessonById(lessonId);
    return lesson ? lesson.title : null;
  };

  return (
    <div className="inv-journal">
      {/* Header */}
      <div className="inv-journal__header">
        <h1 className="inv-journal__title">My Journal</h1>
        <p className="inv-journal__subtitle">
          Record your thoughts, feelings, and spiritual experiences
        </p>
      </div>

      {/* Toggle */}
      <div className="inv-journal__toggle">
        <button
          className={`inv-journal__toggle-btn ${mode === 'text' ? 'active' : ''}`}
          onClick={() => setMode('text')}
        >
          <FaPenToSquare /> Text
        </button>
        <button
          className={`inv-journal__toggle-btn ${mode === 'voice' ? 'active' : ''}`}
          onClick={() => setMode('voice')}
        >
          <FaMicrophone /> Voice
        </button>
      </div>

      {/* New Entry */}
      {mode === 'text' ? (
        <div className="inv-journal__new">
          <p className="inv-journal__new-label">New Entry</p>
          <textarea
            className="inv-journal__new-textarea"
            placeholder="What's on your mind? Share your thoughts, questions, or spiritual experiences..."
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
      ) : (
        <div className="inv-journal__voice">
          <div className="inv-journal__voice-icon">
            <FaMicrophone />
          </div>
          <h3 className="inv-journal__voice-title">Voice Recording</h3>
          <p className="inv-journal__voice-text">
            Voice journal coming soon! For now, use text entries.
          </p>
        </div>
      )}

      {/* Past Entries */}
      <div className="inv-journal__list">
        <h2 className="inv-journal__list-title">Past Entries</h2>
        
        {journalEntries.length === 0 ? (
          <div className="inv-journal__empty">
            <div className="inv-journal__empty-icon">📝</div>
            <p className="inv-journal__empty-text">
              No entries yet. Start writing your first reflection!
            </p>
          </div>
        ) : (
          journalEntries.map((entry) => (
            <div key={entry.id} className="inv-journal__entry">
              <div className="inv-journal__entry-header">
                <span className="inv-journal__entry-type">
                  {entry.type === 'text' ? <FaPenToSquare /> : <FaMicrophone />}
                  {entry.type}
                </span>
                <span className="inv-journal__entry-date">
                  {formatDate(entry.createdAt)}
                </span>
              </div>
              <p className="inv-journal__entry-content">{entry.content}</p>
              {entry.lessonId && (
                <p className="inv-journal__entry-lesson">
                  From lesson: {getLessonTitle(entry.lessonId)}
                </p>
              )}
              <button
                className="inv-journal__entry-delete"
                onClick={() => deleteJournalEntry(entry.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
