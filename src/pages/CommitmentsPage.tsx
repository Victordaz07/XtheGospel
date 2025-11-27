import React, { useState, useEffect } from 'react';
import { useI18n } from '../context/I18nContext';
import { CommitmentsService, Commitment, CommitmentCategory } from '../services/commitmentsService';
import { CustomSelect } from '../vineyard/components/CustomSelect';
import './Page.css';
import './CommitmentsPage.css';

const CommitmentsPage: React.FC = () => {
  const { t } = useI18n();
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [filter, setFilter] = useState<CommitmentCategory | 'all'>('all');
  const [newCommitmentText, setNewCommitmentText] = useState('');
  const [newCommitmentCategory, setNewCommitmentCategory] = useState<CommitmentCategory>('spiritual');

  useEffect(() => {
    loadCommitments();
  }, []);

  const loadCommitments = async () => {
    const loaded = await CommitmentsService.loadCommitments();
    setCommitments(loaded);
  };

  const addCommitment = async () => {
    if (!newCommitmentText.trim()) return;

    try {
      await CommitmentsService.addCommitment({
        title: newCommitmentText,
        category: newCommitmentCategory,
        completed: false,
        source: 'manual',
      });
      setNewCommitmentText('');
      await loadCommitments();
    } catch (error) {
      console.error('Error agregando compromiso:', error);
    }
  };

  const toggleCommitment = async (id: string) => {
    const commitment = commitments.find(c => c.id === id);
    if (commitment) {
      await CommitmentsService.updateCommitment(id, { completed: !commitment.completed });
      await loadCommitments();
    }
  };

  const deleteCommitment = async (id: string) => {
    if (window.confirm(t('commitments.deleteConfirm') || '¿Eliminar este compromiso?')) {
      await CommitmentsService.deleteCommitment(id);
      await loadCommitments();
    }
  };

  const filteredCommitments = filter === 'all' 
    ? commitments 
    : commitments.filter(c => c.category === filter);

  const categories: Array<{ key: CommitmentCategory | 'all'; label: string }> = [
    { key: 'all', label: t('commitments.filterAll') || 'Todos' },
    { key: 'study', label: t('commitments.filterStudy') || 'Estudio' },
    { key: 'spiritual', label: t('commitments.filterSpiritual') || 'Espirituales' },
    { key: 'attendance', label: t('commitments.filterAttendance') || 'Asistencia' },
  ];

  const getCategoryLabel = (category: CommitmentCategory): string => {
    const map: Record<CommitmentCategory, string> = {
      study: t('commitments.categoryStudy') || 'Estudio',
      spiritual: t('commitments.categorySpiritual') || 'Espiritual',
      attendance: t('commitments.categoryAttendance') || 'Asistencia',
    };
    return map[category];
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('tasks.title')}</h1>
        <p>{t('commitments.description') || 'Gestiona tus compromisos espirituales'}</p>
      </div>
      <div className="page-content">
        {/* Input para nuevo compromiso */}
        <div className="commitment-input-section">
          <div className="commitment-input-group">
            <input
              type="text"
              value={newCommitmentText}
              onChange={(e) => setNewCommitmentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCommitment()}
              placeholder={t('tasks.newTask')}
              className="commitment-input-field"
            />
            <CustomSelect
              value={newCommitmentCategory}
              onChange={(value) => setNewCommitmentCategory(value as CommitmentCategory)}
              options={[
                { value: 'spiritual', label: t('commitments.categorySpiritual') || 'Espiritual' },
                { value: 'study', label: t('commitments.categoryStudy') || 'Estudio' },
                { value: 'attendance', label: t('commitments.categoryAttendance') || 'Asistencia' },
              ]}
            />
            <button onClick={addCommitment} className="commitment-add-button">
              {t('tasks.add')}
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="commitment-filters">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`filter-chip ${filter === cat.key ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Lista de compromisos */}
        <div className="commitments-list">
          {filteredCommitments.length === 0 ? (
            <div className="commitments-empty">
              <div className="empty-icon">📝</div>
              <p>{t('commitments.empty') || 'Aún no tienes compromisos. Termina un tema de las lecciones y agrega el primer compromiso.'}</p>
            </div>
          ) : (
            filteredCommitments.map((commitment) => (
              <div
                key={commitment.id}
                className={`commitment-item ${commitment.completed ? 'completed' : ''}`}
              >
                <div className="commitment-checkbox-container">
                  <input
                    type="checkbox"
                    checked={commitment.completed}
                    onChange={() => toggleCommitment(commitment.id)}
                    className="commitment-checkbox"
                  />
                </div>
                <div className="commitment-content">
                  <div className="commitment-header-row">
                    <h3 className="commitment-title">{commitment.title}</h3>
                    <span className={`commitment-category-badge category-${commitment.category}`}>
                      {getCategoryLabel(commitment.category)}
                    </span>
                  </div>
                  {commitment.description && (
                    <p className="commitment-description">{commitment.description}</p>
                  )}
                  {commitment.dueDate && (
                    <div className="commitment-due-date">
                      {t('commitments.dueDate') || 'Para'}: {formatDate(commitment.dueDate)}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteCommitment(commitment.id)}
                  className="commitment-delete"
                  title={t('common.delete') || 'Eliminar'}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommitmentsPage;

