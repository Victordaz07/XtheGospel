import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import {
  MemberTransfersService,
  MemberTransfer,
} from '../../services/memberTransfersService';
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
  FaArrowRightArrowLeft,
} from 'react-icons/fa6';
import '../Page.css';
import './MemberTransfers.css';

const MemberTransfers: React.FC = () => {
  const { t, locale } = useI18n();
  const [transfers, setTransfers] = useState<MemberTransfer[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState<MemberTransfer | null>(
    null,
  );
  const [draft, setDraft] = useState<Partial<MemberTransfer>>({
    date: new Date().toISOString().split('T')[0],
    fromArea: '',
    toArea: '',
    fromCompanion: '',
    toCompanion: '',
    notes: '',
  });
  const [currentArea, setCurrentArea] = useState<string | null>(null);
  const [currentCompanion, setCurrentCompanion] = useState<string | null>(null);

  useEffect(() => {
    loadTransfers();
  }, []);

  const loadTransfers = () => {
    const loaded = MemberTransfersService.loadTransfers();
    setTransfers(
      loaded.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    );
    setCurrentArea(MemberTransfersService.getCurrentArea());
    setCurrentCompanion(MemberTransfersService.getCurrentCompanion());
  };

  const openNew = () => {
    setDraft({
      date: new Date().toISOString().split('T')[0],
      fromArea: currentArea || '',
      toArea: '',
      fromCompanion: currentCompanion || '',
      toCompanion: '',
      notes: '',
    });
    setEditingTransfer(null);
    setModalOpen(true);
  };

  const openEdit = (transfer: MemberTransfer) => {
    setDraft({
      date: transfer.date.split('T')[0],
      fromArea: transfer.fromArea,
      toArea: transfer.toArea,
      fromCompanion: transfer.fromCompanion || '',
      toCompanion: transfer.toCompanion || '',
      notes: transfer.notes || '',
    });
    setEditingTransfer(transfer);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTransfer(null);
    setDraft({
      date: new Date().toISOString().split('T')[0],
      fromArea: '',
      toArea: '',
      fromCompanion: '',
      toCompanion: '',
      notes: '',
    });
  };

  const saveTransfer = () => {
    if (!draft.date || !draft.fromArea || !draft.toArea) {
      alert(
        t('member.transfers.validationError') ||
          'Por favor completa todos los campos requeridos',
      );
      return;
    }

    if (editingTransfer) {
      MemberTransfersService.updateTransfer(editingTransfer.id, {
        date: draft.date,
        fromArea: draft.fromArea,
        toArea: draft.toArea,
        fromCompanion: draft.fromCompanion,
        toCompanion: draft.toCompanion,
        notes: draft.notes,
      });
    } else {
      MemberTransfersService.addTransfer(
        draft.date!,
        draft.fromArea!,
        draft.toArea!,
        draft.fromCompanion,
        draft.toCompanion,
        draft.notes,
      );
    }

    closeModal();
    loadTransfers();
  };

  const deleteTransfer = (id: string) => {
    if (
      window.confirm(
        t('member.transfers.confirmDelete') || '¿Eliminar este traslado?',
      )
    ) {
      MemberTransfersService.deleteTransfer(id);
      loadTransfers();
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

  const getTransferTypeLabel = (
    type: MemberTransfer['transferType'],
  ): string => {
    switch (type) {
      case 'area_change':
        return t('member.transfers.type.areaChange') || 'Cambio de área';
      case 'companion_change':
        return (
          t('member.transfers.type.companionChange') || 'Cambio de compañero'
        );
      case 'both':
        return t('member.transfers.type.both') || 'Área y compañero';
      default:
        return '';
    }
  };

  return (
    <PageContainer>
      <TopBar
        title={t('member.transfers.title') || 'Traslados'}
        subtitle={
          t('member.transfers.subtitle') ||
          'Registra cada cambio de área y compañero'
        }
        rightAction={
          <IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />
        }
      />

      <div className="page-content">
        {/* Información actual */}
        {(currentArea || currentCompanion) && (
          <Card variant="gradient" className="member-transfers-current-info">
            <h3 className="member-transfers-current-title">
              {t('member.transfers.currentInfo') || 'Información actual'}
            </h3>
            <div className="member-transfers-current-details">
              {currentArea && (
                <div className="member-transfers-current-item">
                  <span className="member-transfers-current-label">
                    {t('member.transfers.currentArea') || 'Área:'}
                  </span>
                  <span className="member-transfers-current-value">
                    {currentArea}
                  </span>
                </div>
              )}
              {currentCompanion && (
                <div className="member-transfers-current-item">
                  <span className="member-transfers-current-label">
                    {t('member.transfers.currentCompanion') || 'Compañero:'}
                  </span>
                  <span className="member-transfers-current-value">
                    {currentCompanion}
                  </span>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Botón principal para agregar */}
        {transfers.length > 0 && (
          <div className="member-transfers-add-button-container">
            <ButtonPrimary
              onClick={openNew}
              className="member-transfers-add-button"
            >
              <FaPlus /> {t('member.transfers.addButton') || 'Nuevo traslado'}
            </ButtonPrimary>
          </div>
        )}

        {/* Estado vacío */}
        {transfers.length === 0 ? (
          <Card variant="gradient" className="member-transfers-empty-state">
            <div className="member-transfers-empty-icon">🔄</div>
            <h2 className="member-transfers-empty-title">
              {t('member.transfers.empty.title') ||
                'Comienza a registrar tus traslados'}
            </h2>
            <p className="member-transfers-empty-description">
              {t('member.transfers.empty.description') ||
                'Registra cada cambio de área y compañero para mantener un historial completo de tu misión.'}
            </p>
            <ButtonPrimary
              onClick={openNew}
              className="member-transfers-empty-button"
            >
              <FaPlus /> {t('member.transfers.addButton') || 'Nuevo traslado'}
            </ButtonPrimary>
          </Card>
        ) : (
          <div className="member-transfers-list">
            {transfers.map(transfer => (
              <Card
                key={transfer.id}
                variant="default"
                className="member-transfers-card"
              >
                <div className="member-transfers-card-header">
                  <div className="member-transfers-card-meta">
                    <div className="member-transfers-card-date">
                      {formatDate(transfer.date)}
                    </div>
                    <div className="member-transfers-card-type">
                      <FaArrowRightArrowLeft />{' '}
                      {getTransferTypeLabel(transfer.transferType)}
                    </div>
                  </div>
                  <div className="member-transfers-card-actions">
                    <IconButton
                      icon={<FaPencil />}
                      onClick={() => openEdit(transfer)}
                      ariaLabel={t('common.edit') || 'Editar'}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      onClick={() => deleteTransfer(transfer.id)}
                      ariaLabel={t('common.delete') || 'Eliminar'}
                    />
                  </div>
                </div>
                <div className="member-transfers-card-content">
                  <div className="member-transfers-transfer-details">
                    <div className="member-transfers-transfer-item">
                      <span className="member-transfers-transfer-label">
                        {t('member.transfers.fromArea') || 'De área:'}
                      </span>
                      <span className="member-transfers-transfer-value">
                        {transfer.fromArea}
                      </span>
                    </div>
                    <div className="member-transfers-transfer-arrow">→</div>
                    <div className="member-transfers-transfer-item">
                      <span className="member-transfers-transfer-label">
                        {t('member.transfers.toArea') || 'A área:'}
                      </span>
                      <span className="member-transfers-transfer-value">
                        {transfer.toArea}
                      </span>
                    </div>
                  </div>
                  {(transfer.fromCompanion || transfer.toCompanion) && (
                    <div className="member-transfers-companion-details">
                      {transfer.fromCompanion && (
                        <div className="member-transfers-companion-item">
                          <span className="member-transfers-companion-label">
                            {t('member.transfers.fromCompanion') ||
                              'De compañero:'}
                          </span>
                          <span className="member-transfers-companion-value">
                            {transfer.fromCompanion}
                          </span>
                        </div>
                      )}
                      {transfer.toCompanion && (
                        <div className="member-transfers-companion-item">
                          <span className="member-transfers-companion-label">
                            {t('member.transfers.toCompanion') ||
                              'A compañero:'}
                          </span>
                          <span className="member-transfers-companion-value">
                            {transfer.toCompanion}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  {transfer.notes && (
                    <div className="member-transfers-notes">
                      <strong>{t('member.transfers.notes') || 'Notas:'}</strong>
                      <p>{transfer.notes}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal de edición/creación */}
      {modalOpen && (
        <div className="member-transfers-modal-overlay" onClick={closeModal}>
          <div
            className="member-transfers-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="member-transfers-modal-header">
              <h2>
                {editingTransfer
                  ? t('member.transfers.editTransfer') || 'Editar traslado'
                  : t('member.transfers.newTransfer') || 'Nuevo traslado'}
              </h2>
              <IconButton
                icon={<FaXmark />}
                onClick={closeModal}
                ariaLabel={t('common.close') || 'Cerrar'}
              />
            </div>
            <div className="member-transfers-modal-content">
              <div className="member-transfers-form-group">
                <label>{t('member.transfers.form.date') || 'Fecha'} *</label>
                <input
                  type="date"
                  value={draft.date || ''}
                  onChange={e => setDraft({ ...draft, date: e.target.value })}
                  required
                />
              </div>
              <div className="member-transfers-form-row">
                <div className="member-transfers-form-group">
                  <label>
                    {t('member.transfers.form.fromArea') || 'De área'} *
                  </label>
                  <input
                    type="text"
                    value={draft.fromArea || ''}
                    onChange={e =>
                      setDraft({ ...draft, fromArea: e.target.value })
                    }
                    placeholder={
                      t('member.transfers.form.fromAreaPlaceholder') ||
                      'Ej: Centro'
                    }
                    required
                  />
                </div>
                <div className="member-transfers-form-group">
                  <label>
                    {t('member.transfers.form.toArea') || 'A área'} *
                  </label>
                  <input
                    type="text"
                    value={draft.toArea || ''}
                    onChange={e =>
                      setDraft({ ...draft, toArea: e.target.value })
                    }
                    placeholder={
                      t('member.transfers.form.toAreaPlaceholder') ||
                      'Ej: Norte'
                    }
                    required
                  />
                </div>
              </div>
              <div className="member-transfers-form-row">
                <div className="member-transfers-form-group">
                  <label>
                    {t('member.transfers.form.fromCompanion') || 'De compañero'}
                  </label>
                  <input
                    type="text"
                    value={draft.fromCompanion || ''}
                    onChange={e =>
                      setDraft({ ...draft, fromCompanion: e.target.value })
                    }
                    placeholder={
                      t('member.transfers.form.fromCompanionPlaceholder') ||
                      'Ej: Élder García'
                    }
                  />
                </div>
                <div className="member-transfers-form-group">
                  <label>
                    {t('member.transfers.form.toCompanion') || 'A compañero'}
                  </label>
                  <input
                    type="text"
                    value={draft.toCompanion || ''}
                    onChange={e =>
                      setDraft({ ...draft, toCompanion: e.target.value })
                    }
                    placeholder={
                      t('member.transfers.form.toCompanionPlaceholder') ||
                      'Ej: Élder López'
                    }
                  />
                </div>
              </div>
              <div className="member-transfers-form-group">
                <label>{t('member.transfers.form.notes') || 'Notas'}</label>
                <textarea
                  value={draft.notes || ''}
                  onChange={e => setDraft({ ...draft, notes: e.target.value })}
                  placeholder={
                    t('member.transfers.form.notesPlaceholder') ||
                    'Notas adicionales...'
                  }
                  rows={3}
                />
              </div>
            </div>
            <div className="member-transfers-modal-footer">
              <ButtonSecondary onClick={closeModal}>
                {t('common.cancel') || 'Cancelar'}
              </ButtonSecondary>
              <ButtonPrimary onClick={saveTransfer}>
                {t('common.save') || 'Guardar'}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default MemberTransfers;
