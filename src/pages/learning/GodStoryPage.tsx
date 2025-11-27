import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import { GodStoryService, GodStoryEntry } from '../../services/godStoryService';
import './Page.css';
import './GodStoryPage.css';

const GodStoryPage: React.FC = () => {
  const { t } = useI18n();
  const [entries, setEntries] = useState<GodStoryEntry[]>([]);
  const [newEntryContent, setNewEntryContent] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const loaded = GodStoryService.loadEntries();
    setEntries(loaded.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const addEntry = () => {
    if (!newEntryContent.trim()) return;
    GodStoryService.addEntry(newEntryContent);
    setNewEntryContent('');
    setShowAddForm(false);
    loadEntries();
  };

  const deleteEntry = (id: string) => {
    if (window.confirm(t('godStory.deleteConfirm') || '¿Eliminar esta entrada?')) {
      GodStoryService.deleteEntry(id);
      loadEntries();
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('godStory.title') || 'Mi Historia con Dios'}</h1>
        <p>{t('godStory.subtitle') || 'Registra tus experiencias espirituales y momentos especiales'}</p>
      </div>
      <div className="page-content">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-entry-button"
        >
          {showAddForm ? '✕' : '+'} {t('godStory.addExperience') || 'Agregar Experiencia'}
        </button>

        {showAddForm && (
          <div className="add-entry-form">
            <textarea
              value={newEntryContent}
              onChange={(e) => setNewEntryContent(e.target.value)}
              placeholder={t('godStory.entryPlaceholder') || 'Escribe tu experiencia...'}
              className="entry-textarea"
              rows={6}
            />
            <div className="form-actions">
              <button onClick={addEntry} className="save-entry-button">
                {t('godStory.save') || 'Guardar'}
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewEntryContent('');
                }}
                className="cancel-button"
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        )}

        <div className="story-entries">
          {entries.length === 0 ? (
            <div className="empty-story">
              <div className="empty-icon">📖</div>
              <p>{t('godStory.empty') || 'Aún no has registrado experiencias. ¡Comienza a escribir tu historia!'}</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="story-entry">
                <div className="entry-header">
                  <div className="entry-date">{formatDate(entry.date)}</div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="entry-delete"
                    title={t('common.delete') || 'Eliminar'}
                  >
                    🗑️
                  </button>
                </div>
                <div className="entry-content">{entry.content}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GodStoryPage;

