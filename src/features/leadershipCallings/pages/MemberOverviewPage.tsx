/**
 * Member Overview Page
 * 
 * Shows member's callings (current and past) + leader notes.
 * NO surveillance, NO activity metrics.
 */

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallingsStore, useLeadershipNotesStore } from '../state';
import { STATUS_LABELS, ORGANIZATION_LABELS, NOTE_TYPE_LABELS, NoteType } from '../types';

// Mock members data
const MOCK_MEMBERS: Record<string, { name: string; since: string }> = {
  'member-1': { name: 'María García', since: '2018' },
  'member-2': { name: 'Juan Pérez', since: '2020' },
  'member-3': { name: 'Ana López', since: '2019' },
  'member-4': { name: 'Pedro Martínez', since: '2016' },
  'member-5': { name: 'Roberto Sánchez', since: '2021' },
};

const MemberOverviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const callings = useCallingsStore((s) => s.getCallingsByMember(id || ''));
  const notes = useLeadershipNotesStore((s) => s.getMemberNotes(id || ''));
  const addNote = useLeadershipNotesStore((s) => s.addNote);
  
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [noteType, setNoteType] = useState<NoteType>('followup');
  
  const member = id ? MOCK_MEMBERS[id] : undefined;
  
  if (!member) {
    return (
      <div className="leadership-page">
        <header className="leadership-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Volver
          </button>
          <h1>Miembro no encontrado</h1>
        </header>
      </div>
    );
  }
  
  const currentCallings = callings.filter(c => c.status !== 'released');
  const pastCallings = callings.filter(c => c.status === 'released');
  
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteContent.trim() && id) {
      addNote({
        scope: 'member',
        scopeId: id,
        type: noteType,
        content: noteContent.trim(),
      });
      setNoteContent('');
      setShowNoteForm(false);
    }
  };
  
  return (
    <div className="leadership-page">
      <header className="leadership-header">
        <button className="back-button" onClick={() => navigate('/member/leadership/members')}>
          ← Volver
        </button>
        <h1>Miembro</h1>
      </header>
      
      <main className="leadership-content">
        {/* Member Header */}
        <div className="member-overview-header">
          <div className="member-avatar large">👤</div>
          <h2 className="member-name">{member.name}</h2>
          <p className="member-since">Miembro desde {member.since}</p>
        </div>
        
        {/* Current Callings */}
        <section className="overview-section">
          <h3>Llamamientos actuales</h3>
          {currentCallings.length === 0 ? (
            <p className="empty-text">Sin llamamientos activos.</p>
          ) : (
            <div className="callings-mini-list">
              {currentCallings.map(calling => (
                <div 
                  key={calling.id}
                  className="calling-mini-card"
                  onClick={() => navigate(`/member/leadership/callings/${calling.id}`)}
                >
                  <span className="calling-position">{calling.position}</span>
                  <span className="calling-org">{ORGANIZATION_LABELS[calling.organization]}</span>
                  <span className={`status-badge status-${calling.status}`}>
                    {STATUS_LABELS[calling.status]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
        
        {/* Service History */}
        <section className="overview-section">
          <h3>Historial de servicio</h3>
          {pastCallings.length === 0 ? (
            <p className="empty-text">Sin llamamientos anteriores registrados.</p>
          ) : (
            <ul className="service-history">
              {pastCallings.map(calling => (
                <li key={calling.id}>
                  <span className="history-position">{calling.position}</span>
                  <span className="history-dates">
                    {calling.timeline.proposedAt && new Date(calling.timeline.proposedAt).getFullYear()}
                    {' - '}
                    {calling.timeline.releasedAt && new Date(calling.timeline.releasedAt).getFullYear()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
        
        {/* Leader Notes */}
        <section className="overview-section">
          <div className="section-header">
            <h3>Notas del líder</h3>
            <button 
              className="add-button"
              onClick={() => setShowNoteForm(!showNoteForm)}
            >
              {showNoteForm ? '✕' : '➕'}
            </button>
          </div>
          
          {showNoteForm && (
            <form className="add-form" onSubmit={handleAddNote}>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Añadir nota..."
                rows={3}
                required
              />
              <select 
                value={noteType}
                onChange={(e) => setNoteType(e.target.value as NoteType)}
              >
                <option value="followup">{NOTE_TYPE_LABELS.followup}</option>
                <option value="administrative">{NOTE_TYPE_LABELS.administrative}</option>
                <option value="pastoral">{NOTE_TYPE_LABELS.pastoral}</option>
              </select>
              <button type="submit" className="action-button primary">
                Guardar nota
              </button>
            </form>
          )}
          
          {notes.length === 0 ? (
            <p className="empty-text">Sin notas registradas.</p>
          ) : (
            <div className="notes-list">
              {notes.map(note => (
                <div key={note.id} className="note-card">
                  <div className="note-header">
                    <span className="note-date">
                      📅 {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                    <span className="note-type">🏷️ {NOTE_TYPE_LABELS[note.type]}</span>
                  </div>
                  <p className="note-content">{note.content}</p>
                  <span className="privacy-badge">🔒 Solo visible para ti</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MemberOverviewPage;
