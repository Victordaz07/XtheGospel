import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import { GodStoryService, GodStoryEntry } from '../../services/godStoryService';
import { INVESTIGATOR_LESSONS } from '../../data/investigatorLessons';
import { MyStoryEntry } from '../../data/investigatorMyStory';
import {
  PageContainer,
  TopBar,
  Card,
  ButtonPrimary,
  ButtonSecondary,
  IconButton,
} from '../../ui/components';
import { FaBell, FaPlus, FaPencil, FaTrash, FaXmark } from 'react-icons/fa6';
import './Page.css';
import './GodStoryPage.css';

const GodStoryPage: React.FC = () => {
  const { t, locale } = useI18n();
  const [entries, setEntries] = useState<GodStoryEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<GodStoryEntry | null>(null);
  const [draft, setDraft] = useState<Partial<MyStoryEntry>>({
    title: '',
    content: '',
    lessonId: undefined,
  });

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const loaded = GodStoryService.loadEntries();
    setEntries(
      loaded.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    );
  };

  const openNew = () => {
    setDraft({
      title: '',
      content: '',
      lessonId: undefined,
    });
    setEditingEntry(null);
    setModalOpen(true);
  };

  const openEdit = (entry: GodStoryEntry) => {
    setDraft({
      title: entry.title || '',
      content: entry.content,
      lessonId: entry.lessonId,
    });
    setEditingEntry(entry);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingEntry(null);
    setDraft({
      title: '',
      content: '',
      lessonId: undefined,
    });
  };

  const saveEntry = () => {
    if (!draft.content?.trim()) return;

    if (editingEntry) {
      GodStoryService.updateEntry(editingEntry.id, {
        title: draft.title || '',
        content: draft.content,
        lessonId: draft.lessonId,
      });
    } else {
      GodStoryService.addEntry(draft.content, draft.title, draft.lessonId);
    }

    closeModal();
    loadEntries();
  };

  const deleteEntry = (id: string) => {
    if (window.confirm(t('investigatorMyStory.entry.confirmDelete'))) {
      GodStoryService.deleteEntry(id);
      loadEntries();
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(
        locale === 'es'
          ? 'es-ES'
          : locale === 'fr'
            ? 'fr-FR'
            : locale === 'pt'
              ? 'pt-BR'
              : 'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      );
    } catch {
      return dateString;
    }
  };

  const getLessonTitle = (lessonId?: string): string | null => {
    if (!lessonId) return null;
    const lesson = INVESTIGATOR_LESSONS.find(
      l => l.id === lessonId || l.lessonId === lessonId,
    );
    return lesson ? t(`${lesson.translationKey}.title`) : null;
  };

  const getPreview = (content: string, maxLength: number = 100): string => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  return (
    <PageContainer>
      <TopBar
        title={t('investigatorMyStory.header.title')}
        subtitle={t('investigatorMyStory.header.subtitle')}
        rightAction={
          <IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />
        }
      />

      <div className="page-content">
        {/* Botón principal para agregar */}
        {entries.length > 0 && (
          <div className="ims-add-button-container">
            <ButtonPrimary onClick={openNew} className="ims-add-button">
              <FaPlus /> {t('investigatorMyStory.list.addButton')}
            </ButtonPrimary>
          </div>
        )}

        {/* Estado vacío */}
        {entries.length === 0 ? (
          <Card variant="gradient" className="ims-empty-state">
            <div className="ims-empty-icon">📖</div>
            <h2 className="ims-empty-title">
              {t('investigatorMyStory.empty.title')}
            </h2>
            <p className="ims-empty-description">
              {t('investigatorMyStory.empty.description')}
            </p>
            <ButtonPrimary onClick={openNew} className="ims-empty-button">
              <FaPlus /> {t('investigatorMyStory.list.addButton')}
            </ButtonPrimary>
          </Card>
        ) : (
          <div className="ims-entries-list">
            {entries.map(entry => {
              const lessonTitle = getLessonTitle(entry.lessonId);

              return (
                <Card
                  key={entry.id}
                  variant="default"
                  className="ims-entry-card"
                >
                  <div className="ims-entry-header">
                    <div className="ims-entry-title-section">
                      <h3 className="ims-entry-title">
                        {entry.title || t('investigatorMyStory.entry.noTitle')}
                      </h3>
                      <div className="ims-entry-meta">
                        <span className="ims-entry-date">
                          {formatDate(entry.date)}
                        </span>
                        {lessonTitle && (
                          <span className="ims-entry-lesson-badge">
                            {lessonTitle}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="ims-entry-actions">
                      <IconButton
                        icon={<FaPencil />}
                        ariaLabel={t('investigatorMyStory.entry.editButton')}
                        onClick={() => openEdit(entry)}
                        className="ims-action-button"
                      />
                      <IconButton
                        icon={<FaTrash />}
                        ariaLabel={t('investigatorMyStory.entry.deleteButton')}
                        onClick={() => deleteEntry(entry.id)}
                        className="ims-action-button ims-action-button--danger"
                      />
                    </div>
                  </div>
                  <p className="ims-entry-preview">
                    {getPreview(entry.content)}
                  </p>
                </Card>
              );
            })}
          </div>
        )}

        {/* Modal de Crear/Editar */}
        {modalOpen && (
          <div className="ims-modal-overlay" onClick={closeModal}>
            <div onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <Card variant="default" className="ims-modal">
                <div className="ims-modal-header">
                  <h2 className="ims-modal-title">
                    {editingEntry
                      ? t('investigatorMyStory.entry.editButton')
                      : t('investigatorMyStory.list.addButton')}
                  </h2>
                  <IconButton
                    icon={<FaXmark />}
                    ariaLabel={t('investigatorMyStory.entry.cancelButton')}
                    onClick={closeModal}
                  />
                </div>

                <div className="ims-modal-content">
                  {/* Título */}
                  <div className="ims-form-field">
                    <label className="ims-form-label">
                      {t('investigatorMyStory.entry.titleLabel')}
                    </label>
                    <input
                      type="text"
                      className="ims-form-input"
                      value={draft.title || ''}
                      onChange={e =>
                        setDraft({ ...draft, title: e.target.value })
                      }
                      placeholder={t('investigatorMyStory.entry.titleLabel')}
                    />
                  </div>

                  {/* Contenido */}
                  <div className="ims-form-field">
                    <label className="ims-form-label">
                      {t('investigatorMyStory.entry.contentLabel')}
                    </label>
                    <textarea
                      className="ims-form-textarea"
                      value={draft.content || ''}
                      onChange={e =>
                        setDraft({ ...draft, content: e.target.value })
                      }
                      placeholder={t('investigatorMyStory.entry.contentLabel')}
                      rows={8}
                    />
                  </div>

                  {/* Lección relacionada */}
                  <div className="ims-form-field">
                    <label className="ims-form-label">
                      {t('investigatorMyStory.entry.lessonLabel')}
                    </label>
                    <div className="ims-lesson-selector">
                      <button
                        className={`ims-lesson-option ${!draft.lessonId ? 'ims-lesson-option--selected' : ''}`}
                        onClick={() =>
                          setDraft({ ...draft, lessonId: undefined })
                        }
                      >
                        {t('investigatorMyStory.entry.lessonLabel')
                          .split('(')[0]
                          .trim()}
                      </button>
                      {INVESTIGATOR_LESSONS.map(lesson => (
                        <button
                          key={lesson.id}
                          className={`ims-lesson-option ${draft.lessonId === lesson.id ? 'ims-lesson-option--selected' : ''}`}
                          onClick={() =>
                            setDraft({ ...draft, lessonId: lesson.id })
                          }
                        >
                          {t(`${lesson.translationKey}.title`)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ims-modal-footer">
                  <ButtonSecondary onClick={closeModal}>
                    {t('investigatorMyStory.entry.cancelButton')}
                  </ButtonSecondary>
                  <ButtonPrimary
                    onClick={saveEntry}
                    disabled={!draft.content?.trim()}
                  >
                    {t('investigatorMyStory.entry.saveButton')}
                  </ButtonPrimary>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default GodStoryPage;
