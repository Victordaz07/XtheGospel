import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '../../context/I18nContext';
import {
  MemberPhotosService,
  MemberPhoto,
} from '../../services/memberPhotosService';
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
  FaImage,
  FaTag,
} from 'react-icons/fa6';
import '../Page.css';
import './MemberPhotos.css';

const MemberPhotos: React.FC = () => {
  const { t, locale } = useI18n();
  const [photos, setPhotos] = useState<MemberPhoto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<MemberPhoto | null>(null);
  const [viewingPhoto, setViewingPhoto] = useState<MemberPhoto | null>(null);
  const [draft, setDraft] = useState<Partial<MemberPhoto>>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    area: '',
    companion: '',
    tags: [],
    category: 'other',
  });
  const [tagInput, setTagInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    MemberPhoto['category'] | 'all'
  >('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = () => {
    const loaded = MemberPhotosService.loadPhotos();
    setPhotos(
      loaded.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    );
  };

  const openNew = () => {
    setDraft({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      area: '',
      companion: '',
      tags: [],
      category: 'other',
    });
    setEditingPhoto(null);
    setTagInput('');
    setModalOpen(true);
  };

  const openEdit = (photo: MemberPhoto) => {
    setDraft({
      title: photo.title || '',
      description: photo.description || '',
      date: photo.date.split('T')[0],
      area: photo.area || '',
      companion: photo.companion || '',
      tags: photo.tags || [],
      category: photo.category || 'other',
    });
    setEditingPhoto(photo);
    setTagInput('');
    setModalOpen(true);
  };

  const openView = (photo: MemberPhoto) => {
    setViewingPhoto(photo);
    setViewModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingPhoto(null);
    setDraft({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      area: '',
      companion: '',
      tags: [],
      category: 'other',
    });
    setTagInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setViewingPhoto(null);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(
        t('member.photos.invalidFile') ||
          'Por favor selecciona un archivo de imagen',
      );
      return;
    }

    try {
      const base64 = await MemberPhotosService.fileToBase64(file);
      setDraft({ ...draft, url: base64, thumbnailUrl: base64 });
    } catch (error) {
      console.error('Error procesando imagen:', error);
      alert(
        t('member.photos.errorProcessing') || 'Error al procesar la imagen',
      );
    }
  };

  const savePhoto = () => {
    if (!draft.url) {
      alert(t('member.photos.noImage') || 'Por favor selecciona una imagen');
      return;
    }

    if (editingPhoto) {
      MemberPhotosService.updatePhoto(editingPhoto.id, {
        title: draft.title || '',
        description: draft.description || '',
        date: draft.date || new Date().toISOString(),
        area: draft.area,
        companion: draft.companion,
        tags: draft.tags,
        category: draft.category,
      });
    } else {
      MemberPhotosService.addPhoto(
        draft.url,
        draft.thumbnailUrl,
        draft.title,
        draft.description,
        draft.date,
        draft.area,
        draft.companion,
        draft.tags,
        draft.category,
      );
    }

    closeModal();
    loadPhotos();
  };

  const deletePhoto = (id: string) => {
    if (
      window.confirm(t('member.photos.confirmDelete') || '¿Eliminar esta foto?')
    ) {
      MemberPhotosService.deletePhoto(id);
      loadPhotos();
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

  type PhotoCategory = Exclude<MemberPhoto['category'], undefined>;
  const getCategoryLabel = (category: PhotoCategory | undefined): string => {
    if (category == null) return '';
    const labels: Record<PhotoCategory, string> = {
      missionary_work:
        t('member.photos.category.missionaryWork') || 'Obra misional',
      companions: t('member.photos.category.companions') || 'Compañeros',
      area: t('member.photos.category.area') || 'Área',
      service: t('member.photos.category.service') || 'Servicio',
      other: t('member.photos.category.other') || 'Otro',
    };
    return labels[category];
  };

  const filteredPhotos =
    selectedCategory === 'all'
      ? photos
      : photos.filter(p => p.category === selectedCategory);

  const categories: Array<MemberPhoto['category'] | 'all'> = [
    'all',
    'missionary_work',
    'companions',
    'area',
    'service',
    'other',
  ];

  return (
    <PageContainer>
      <TopBar
        title={t('member.photos.title') || 'Fotos'}
        subtitle={t('member.photos.subtitle') || 'Galería de tu misión'}
        rightAction={
          <IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />
        }
      />

      <div className="page-content">
        {/* Filtros de categoría */}
        {photos.length > 0 && (
          <div className="member-photos-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`member-photos-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all'
                  ? t('member.photos.filter.all') || 'Todas'
                  : getCategoryLabel(cat as MemberPhoto['category'])}
              </button>
            ))}
          </div>
        )}

        {/* Botón principal para agregar */}
        {photos.length > 0 && (
          <div className="member-photos-add-button-container">
            <ButtonPrimary
              onClick={openNew}
              className="member-photos-add-button"
            >
              <FaPlus /> {t('member.photos.addButton') || 'Agregar foto'}
            </ButtonPrimary>
          </div>
        )}

        {/* Estado vacío */}
        {photos.length === 0 ? (
          <Card variant="gradient" className="member-photos-empty-state">
            <div className="member-photos-empty-icon">📸</div>
            <h2 className="member-photos-empty-title">
              {t('member.photos.empty.title') || 'Comienza tu galería misional'}
            </h2>
            <p className="member-photos-empty-description">
              {t('member.photos.empty.description') ||
                'Guarda los momentos especiales de tu misión para recordarlos siempre.'}
            </p>
            <ButtonPrimary
              onClick={openNew}
              className="member-photos-empty-button"
            >
              <FaPlus /> {t('member.photos.addButton') || 'Agregar foto'}
            </ButtonPrimary>
          </Card>
        ) : (
          <div className="member-photos-grid">
            {filteredPhotos.map(photo => (
              <Card
                key={photo.id}
                variant="default"
                className="member-photos-photo-card"
                onClick={() => openView(photo)}
              >
                <div className="member-photos-photo-image-container">
                  <img
                    src={photo.thumbnailUrl || photo.url}
                    alt={photo.title || 'Foto'}
                    className="member-photos-photo-image"
                  />
                  <div className="member-photos-photo-overlay">
                    <div className="member-photos-photo-actions">
                      <IconButton
                        icon={<FaPencil />}
                        onClick={e => {
                          e.stopPropagation();
                          openEdit(photo);
                        }}
                        ariaLabel={t('common.edit') || 'Editar'}
                      />
                      <IconButton
                        icon={<FaTrash />}
                        onClick={e => {
                          e.stopPropagation();
                          deletePhoto(photo.id);
                        }}
                        ariaLabel={t('common.delete') || 'Eliminar'}
                      />
                    </div>
                  </div>
                </div>
                {photo.title && (
                  <div className="member-photos-photo-title">{photo.title}</div>
                )}
                <div className="member-photos-photo-date">
                  {formatDate(photo.date)}
                </div>
                {photo.tags && photo.tags.length > 0 && (
                  <div className="member-photos-photo-tags">
                    {photo.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="member-photos-tag">
                        <FaTag /> {tag}
                      </span>
                    ))}
                    {photo.tags.length > 2 && (
                      <span className="member-photos-tag-more">
                        +{photo.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal de edición/creación */}
      {modalOpen && (
        <div className="member-photos-modal-overlay" onClick={closeModal}>
          <div
            className="member-photos-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="member-photos-modal-header">
              <h2>
                {editingPhoto
                  ? t('member.photos.editPhoto') || 'Editar foto'
                  : t('member.photos.newPhoto') || 'Nueva foto'}
              </h2>
              <IconButton
                icon={<FaXmark />}
                onClick={closeModal}
                ariaLabel={t('common.close') || 'Cerrar'}
              />
            </div>
            <div className="member-photos-modal-content">
              <div className="member-photos-form-group">
                <label>{t('member.photos.form.image') || 'Imagen'} *</label>
                {draft.url ? (
                  <div className="member-photos-image-preview">
                    <img src={draft.url} alt="Preview" />
                    <ButtonSecondary
                      onClick={() => {
                        setDraft({
                          ...draft,
                          url: undefined,
                          thumbnailUrl: undefined,
                        });
                        if (fileInputRef.current)
                          fileInputRef.current.value = '';
                      }}
                    >
                      {t('member.photos.form.changeImage') || 'Cambiar imagen'}
                    </ButtonSecondary>
                  </div>
                ) : (
                  <div className="member-photos-image-upload">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                    />
                    <ButtonSecondary
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FaImage />{' '}
                      {t('member.photos.form.selectImage') ||
                        'Seleccionar imagen'}
                    </ButtonSecondary>
                  </div>
                )}
              </div>
              <div className="member-photos-form-group">
                <label>{t('member.photos.form.title') || 'Título'}</label>
                <input
                  type="text"
                  value={draft.title || ''}
                  onChange={e => setDraft({ ...draft, title: e.target.value })}
                  placeholder={
                    t('member.photos.form.titlePlaceholder') ||
                    'Ej: Mi primer bautismo'
                  }
                />
              </div>
              <div className="member-photos-form-group">
                <label>
                  {t('member.photos.form.description') || 'Descripción'}
                </label>
                <textarea
                  value={draft.description || ''}
                  onChange={e =>
                    setDraft({ ...draft, description: e.target.value })
                  }
                  placeholder={
                    t('member.photos.form.descriptionPlaceholder') ||
                    'Describe esta foto...'
                  }
                  rows={3}
                />
              </div>
              <div className="member-photos-form-group">
                <label>{t('member.photos.form.date') || 'Fecha'}</label>
                <input
                  type="date"
                  value={draft.date || ''}
                  onChange={e => setDraft({ ...draft, date: e.target.value })}
                />
              </div>
              <div className="member-photos-form-row">
                <div className="member-photos-form-group">
                  <label>{t('member.photos.form.area') || 'Área'}</label>
                  <input
                    type="text"
                    value={draft.area || ''}
                    onChange={e => setDraft({ ...draft, area: e.target.value })}
                    placeholder={
                      t('member.photos.form.areaPlaceholder') || 'Ej: Centro'
                    }
                  />
                </div>
                <div className="member-photos-form-group">
                  <label>
                    {t('member.photos.form.companion') || 'Compañero'}
                  </label>
                  <input
                    type="text"
                    value={draft.companion || ''}
                    onChange={e =>
                      setDraft({ ...draft, companion: e.target.value })
                    }
                    placeholder={
                      t('member.photos.form.companionPlaceholder') ||
                      'Ej: Élder García'
                    }
                  />
                </div>
              </div>
              <div className="member-photos-form-group">
                <label>{t('member.photos.form.category') || 'Categoría'}</label>
                <select
                  value={draft.category || 'other'}
                  onChange={e =>
                    setDraft({
                      ...draft,
                      category: e.target.value as MemberPhoto['category'],
                    })
                  }
                >
                  {categories
                    .filter(c => c !== 'all')
                    .map(cat => (
                      <option key={cat} value={cat}>
                        {getCategoryLabel(cat as MemberPhoto['category'])}
                      </option>
                    ))}
                </select>
              </div>
              <div className="member-photos-form-group">
                <label>{t('member.photos.form.tags') || 'Etiquetas'}</label>
                <div className="member-photos-tags-input">
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
                      t('member.photos.form.tagsPlaceholder') ||
                      'Presiona Enter para agregar'
                    }
                  />
                  <ButtonSecondary onClick={addTag} size="sm">
                    <FaPlus />
                  </ButtonSecondary>
                </div>
                {draft.tags && draft.tags.length > 0 && (
                  <div className="member-photos-tags-list">
                    {draft.tags.map(tag => (
                      <span key={tag} className="member-photos-tag-input">
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
            <div className="member-photos-modal-footer">
              <ButtonSecondary onClick={closeModal}>
                {t('common.cancel') || 'Cancelar'}
              </ButtonSecondary>
              <ButtonPrimary onClick={savePhoto} disabled={!draft.url}>
                {t('common.save') || 'Guardar'}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      )}

      {/* Modal de visualización */}
      {viewModalOpen && viewingPhoto && (
        <div
          className="member-photos-view-modal-overlay"
          onClick={closeViewModal}
        >
          <div
            className="member-photos-view-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="member-photos-view-modal-header">
              <h2>{viewingPhoto.title || formatDate(viewingPhoto.date)}</h2>
              <IconButton
                icon={<FaXmark />}
                onClick={closeViewModal}
                ariaLabel={t('common.close') || 'Cerrar'}
              />
            </div>
            <div className="member-photos-view-modal-content">
              <img src={viewingPhoto.url} alt={viewingPhoto.title || 'Foto'} />
              {viewingPhoto.description && (
                <p className="member-photos-view-description">
                  {viewingPhoto.description}
                </p>
              )}
              <div className="member-photos-view-meta">
                <div className="member-photos-view-meta-item">
                  <strong>{t('member.photos.view.date') || 'Fecha:'}</strong>{' '}
                  {formatDate(viewingPhoto.date)}
                </div>
                {viewingPhoto.area && (
                  <div className="member-photos-view-meta-item">
                    <strong>{t('member.photos.view.area') || 'Área:'}</strong>{' '}
                    {viewingPhoto.area}
                  </div>
                )}
                {viewingPhoto.companion && (
                  <div className="member-photos-view-meta-item">
                    <strong>
                      {t('member.photos.view.companion') || 'Compañero:'}
                    </strong>{' '}
                    {viewingPhoto.companion}
                  </div>
                )}
                {viewingPhoto.tags && viewingPhoto.tags.length > 0 && (
                  <div className="member-photos-view-tags">
                    {viewingPhoto.tags.map(tag => (
                      <span key={tag} className="member-photos-tag">
                        <FaTag /> {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default MemberPhotos;
