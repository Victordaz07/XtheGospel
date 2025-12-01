import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LeadershipBitacoraService, BitacoraEntry } from '../../../services/leadershipBitacoraService';
import { PromoteNoteModal } from '../../../components/missionary/leadership/PromoteNoteModal';
import { getLeadershipRoleEnhanced, LeadershipRole } from '../../../data/missionary/leadershipModeEnhanced';
import { LeadershipRoleService } from '../../../services/leadershipRoleService';
import { FaPaperPlane } from 'react-icons/fa';
import '../../../pages/Page.css';
import './LeadershipTools.css';

export const PersonalNotesScreen: React.FC = () => {
  const location = useLocation();
  const [currentRoleId, setCurrentRoleId] = useState<LeadershipRole>('districtLeader');
  const [role, setRole] = useState(getLeadershipRoleEnhanced('districtLeader'));
  const [entries, setEntries] = useState<BitacoraEntry[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [selectedNoteContent, setSelectedNoteContent] = useState('');
  const [newEntry, setNewEntry] = useState({ date: new Date().toISOString().split('T')[0], content: '', tags: [] as string[] });
  
  useEffect(() => {
    const roleFromService = LeadershipRoleService.getCurrentRole();
    setCurrentRoleId(roleFromService);
    setRole(getLeadershipRoleEnhanced(roleFromService));
  }, [location.pathname]);
  
  const roleColor = role?.color || '#3B82F6';

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const allEntries = LeadershipBitacoraService.loadAllEntries();
    setEntries(allEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const handleSaveEntry = () => {
    if (!newEntry.content.trim()) return;
    
    LeadershipBitacoraService.saveEntry({
      date: newEntry.date,
      content: newEntry.content,
      tags: newEntry.tags
    });
    
    setNewEntry({ date: new Date().toISOString().split('T')[0], content: '', tags: [] });
    setShowAddModal(false);
    loadEntries();
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm('¿Eliminar esta entrada?')) {
      LeadershipBitacoraService.deleteEntry(id);
      loadEntries();
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Notas personales</h1>
        <p className="page-subtitle">Bitácora privada para tus reflexiones y notas espirituales</p>
      </div>
      <div className="page-content">
        <div className="leadership-tools-header">
          <button
            className="leadership-add-button"
            onClick={() => setShowAddModal(true)}
          >
            + Nueva entrada
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="leader-empty-card">
            <p>No hay entradas aún. Comienza agregando tu primera nota.</p>
          </div>
        ) : (
          <div className="bitacora-entries-list">
            {entries.map((entry) => (
              <div key={entry.id} className="bitacora-entry-card">
                <div className="bitacora-entry-header">
                  <span className="bitacora-entry-date">
                    {new Date(entry.date).toLocaleDateString('es-ES', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <div className="bitacora-entry-actions">
                    <button
                      className="bitacora-promote-button"
                      onClick={() => {
                        setSelectedNoteContent(entry.content);
                        setShowPromoteModal(true);
                      }}
                      title="Compartir como mensaje al distrito"
                    >
                      <FaPaperPlane />
                      <span>Compartir</span>
                    </button>
                    <button
                      className="bitacora-delete-button"
                      onClick={() => handleDeleteEntry(entry.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="bitacora-entry-content">
                  {entry.content.split('\n').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      {idx < entry.content.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                {entry.tags && entry.tags.length > 0 && (
                  <div className="bitacora-entry-tags">
                    {entry.tags.map((tag, idx) => (
                      <span key={idx} className="bitacora-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add Entry Modal */}
        {showAddModal && (
          <div className="leadership-modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="leadership-modal" onClick={(e) => e.stopPropagation()}>
              <div className="leadership-modal-header">
                <h3>Nueva entrada</h3>
                <button className="leadership-modal-close" onClick={() => setShowAddModal(false)}>×</button>
              </div>
              <div className="leadership-modal-body">
                <div className="leadership-form-field">
                  <label>Fecha</label>
                  <input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  />
                </div>
                <div className="leadership-form-field">
                  <label>Contenido</label>
                  <textarea
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                    placeholder="Escribe tus reflexiones, notas espirituales, o recordatorios importantes..."
                    rows={8}
                  />
                </div>
              </div>
              <div className="leadership-modal-footer">
                <button className="leadership-button secondary" onClick={() => setShowAddModal(false)}>
                  Cancelar
                </button>
                <button className="leadership-button primary" onClick={handleSaveEntry}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Promote Note Modal */}
        <PromoteNoteModal
          isOpen={showPromoteModal}
          onClose={() => {
            setShowPromoteModal(false);
            setSelectedNoteContent('');
          }}
          noteContent={selectedNoteContent}
          roleColor={roleColor}
        />
      </div>
    </div>
  );
};

