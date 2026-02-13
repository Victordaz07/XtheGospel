import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import {
  MemberDiaryService,
  MemberDiaryEntry,
} from '../../services/memberDiaryService';
import {
  PageContainer,
  TopBar,
  Card,
  ButtonPrimary,
  ButtonSecondary,
  IconButton,
} from '../../ui/components';
import {
  FaBell,
  FaPlus,
  FaPencil,
  FaTrash,
  FaXmark,
  FaTag,
} from 'react-icons/fa6';
import '../Page.css';
import './MemberDiary.css';

const MemberDiary: React.FC = () => {
  const { t, locale } = useI18n();
  const [entries, setEntries] = useState<MemberDiaryEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<MemberDiaryEntry | null>(
    null,
  );
  const [draft, setDraft] = useState<Partial<MemberDiaryEntry>>({
    title: '',
    content: '',
    tags: [],
    area: '',
    companion: '',
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const loaded = MemberDiaryService.loadEntries();
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
      tags: [],
      area: '',
      companion: '',
    });
    setEditingEntry(null);
    setModalOpen(true);
  };

  const openEdit = (entry: MemberDiaryEntry) => {
    setDraft({
      title: entry.title || '',
      content: entry.content,
      tags: entry.tags || [],
      area: entry.area || '',
      companion: entry.companion || '',
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
      tags: [],
      area: '',
      companion: '',
    });
    setTagInput('');
  };

  const saveEntry = () => {
    if (!draft.content?.trim()) return;

    if (editingEntry) {
      MemberDiaryService.updateEntry(editingEntry.id, {
        title: draft.title || '',
        content: draft.content,
        tags: draft.tags,
        area: draft.area,
        companion: draft.companion,
      });
    } else {
      MemberDiaryService.addEntry(
        draft.content,
        draft.title,
        draft.tags,
        draft.area,
        draft.companion,
      );
    }

    closeModal();
    loadEntries();
  };

  const deleteEntry = (id: string) => {
    if (
      window.confirm(
        t('member.diary.confirmDelete') || '¿Eliminar esta entrada del diario?',
      )
    ) {
      MemberDiaryService.deleteEntry(id);
      loadEntries();
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !draft.tags?.includes(tagInput.trim())) {
      setDraft({
        ...draft,
        tags: [...(draft.tags || []), tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setDraft({
      ...draft,
      tags: draft.tags?.filter(t => t !== tagToRemove) || [],
    });
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

  const getPreview = (content: string, maxLength: number = 150): string => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  return (
    <PageContainer>
      <TopBar
        title={t('member.diary.title') || 'Mi diario'}
        subtitle={
          t('member.diary.subtitle') || 'Escribe tus experiencias y testimonios'
        }
        rightAction={
          <IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />
        }
      />

      <div className="page-content">
        {/* Botón principal para agregar */}
        {entries.length > 0 && (
          <div className="member-diary-add-button-container">
            <ButtonPrimary
              onClick={openNew}
              className="member-diary-add-button"
            >
              <FaPlus /> {t('member.diary.addButton') || 'Nueva entrada'}
            </ButtonPrimary>
          </div>
        )}

        {/* Estado vacío */}
        {entries.length === 0 ? (
          <Card variant="gradient" className="member-diary-empty-state">
            <div className="member-diary-empty-icon">📖</div>
            <h2 className="member-diary-empty-title">
              {t('member.diary.empty.title') || 'Comienza tu diario misional'}
            </h2>
            <p className="member-diary-empty-description">
              {t('member.diary.empty.description') ||
                'Registra tus experiencias, testimonios y momentos especiales de tu misión.'}
            </p>
            <ButtonPrimary
              onClick={openNew}
              className="member-diary-empty-button"
            >
              <FaPlus /> {t('member.diary.addButton') || 'Nueva entrada'}
            </ButtonPrimary>
          </Card>
        ) : (
          <div className="member-diary-entries-list">
            {entries.map(entry => (
              <Card
                key={entry.id}
                variant="default"
                className="member-diary-entry-card"
              >
                <div className="member-diary-entry-header">
                  <div className="member-diary-entry-meta">
                    <h3 className="member-diary-entry-title">
                      {entry.title || formatDate(entry.date)}
                    </h3>
                    <span className="member-diary-entry-date">
                      {formatDate(entry.date)}
                    </span>
                    {(entry.area || entry.companion) && (
                      <div className="member-diary-entry-location">
                        {entry.area && (
                          <span className="member-diary-area">
                            📍 {entry.area}
                          </span>
                        )}
                        {entry.companion && (
                          <span className="member-diary-companion">
                            👥 {entry.companion}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="member-diary-entry-actions">
                    <IconButton
                      icon={<FaPencil />}
                      onClick={() => openEdit(entry)}
                      ariaLabel={t('common.edit') || 'Editar'}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      onClick={() => deleteEntry(entry.id)}
                      ariaLabel={t('common.delete') || 'Eliminar'}
                    />
                  </div>
                </div>
                <div className="member-diary-entry-content">
                  <p>{getPreview(entry.content)}</p>
                </div>
                {entry.tags && entry.tags.length > 0 && (
                  <div className="member-diary-entry-tags">
                    {entry.tags.map(tag => (
                      <span key={tag} className="member-diary-tag">
                        <FaTag /> {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal de edición/creación */}
      {modalOpen && (
        <div className="member-diary-modal-overlay" onClick={closeModal}>
          <div
            className="member-diary-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="member-diary-modal-header">
              <h2>
                {editingEntry
                  ? t('member.diary.editEntry') || 'Editar entrada'
                  : t('member.diary.newEntry') || 'Nueva entrada'}
              </h2>
              <IconButton
                icon={<FaXmark />}
                onClick={closeModal}
                ariaLabel={t('common.close') || 'Cerrar'}
              />
            </div>
            <div className="member-diary-modal-content">
              <div className="member-diary-form-group">
                <label>
                  {t('member.diary.form.title') || 'Título (opcional)'}
                </label>
                <input
                  type="text"
                  value={draft.title || ''}
                  onChange={e => setDraft({ ...draft, title: e.target.value })}
                  placeholder={
                    t('member.diary.form.titlePlaceholder') ||
                    'Ej: Mi primer bautismo'
                  }
                />
              </div>
              <div className="member-diary-form-group">
                <label>{t('member.diary.form.content') || 'Contenido'} *</label>
                <textarea
                  value={draft.content || ''}
                  onChange={e =>
                    setDraft({ ...draft, content: e.target.value })
                  }
                  placeholder={
                    t('member.diary.form.contentPlaceholder') ||
                    'Escribe tus experiencias aquí...'
                  }
                  rows={8}
                />
              </div>
              <div className="member-diary-form-row">
                <div className="member-diary-form-group">
                  <label>{t('member.diary.form.area') || 'Área'}</label>
                  <input
                    type="text"
                    value={draft.area || ''}
                    onChange={e => setDraft({ ...draft, area: e.target.value })}
                    placeholder={
                      t('member.diary.form.areaPlaceholder') || 'Ej: Centro'
                    }
                  />
                </div>
                <div className="member-diary-form-group">
                  <label>
                    {t('member.diary.form.companion') || 'Compañero'}
                  </label>
                  <input
                    type="text"
                    value={draft.companion || ''}
                    onChange={e =>
                      setDraft({ ...draft, companion: e.target.value })
                    }
                    placeholder={
                      t('member.diary.form.companionPlaceholder') ||
                      'Ej: Élder García'
                    }
                  />
                </div>
              </div>
              <div className="member-diary-form-group">
                <label>{t('member.diary.form.tags') || 'Etiquetas'}</label>
                <div className="member-diary-tags-input">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder={
                      t('member.diary.form.tagsPlaceholder') ||
                      'Presiona Enter para agregar'
                    }
                  />
                  <ButtonSecondary onClick={addTag} size="sm">
                    <FaPlus />
                  </ButtonSecondary>
                </div>
                {draft.tags && draft.tags.length > 0 && (
                  <div className="member-diary-tags-list">
                    {draft.tags.map(tag => (
                      <span key={tag} className="member-diary-tag-input">
                        {tag}
                        <button onClick={() => removeTag(tag)}>
                          <FaXmark />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="member-diary-modal-footer">
              <ButtonSecondary onClick={closeModal}>
                {t('common.cancel') || 'Cancelar'}
              </ButtonSecondary>
              <ButtonPrimary
                onClick={saveEntry}
                disabled={!draft.content?.trim()}
              >
                {t('common.save') || 'Guardar'}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default MemberDiary;
