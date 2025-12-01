import React, { useState } from 'react';
import { LeaderMessageService } from '../../../services/leaderMessageService';
import { FaTimes } from 'react-icons/fa';
import './PromoteNoteModal.css';

interface PromoteNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteContent: string;
  roleColor: string;
  onMessageCreated?: (messageId: string) => void;
}

export const PromoteNoteModal: React.FC<PromoteNoteModalProps> = ({
  isOpen,
  onClose,
  noteContent,
  roleColor,
  onMessageCreated
}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState(noteContent);
  const [scripture, setScripture] = useState('');

  if (!isOpen) return null;

  const handleCreateDraft = () => {
    if (!title.trim() || !body.trim()) {
      alert('Por favor completa el título y el cuerpo del mensaje');
      return;
    }

    const message = LeaderMessageService.createMessageFromNote({
      title,
      body,
      scripture: scripture.trim() || undefined,
      senderId: 'current_user',
      senderName: 'Líder de Distrito',
      senderRole: 'district_leader',
      targetScope: 'district',
      districtId: 'current_district'
    });

    if (onMessageCreated) {
      onMessageCreated(message.id);
    }

    alert('Mensaje creado como borrador. Puedes editarlo y publicarlo desde el tab de mensajes.');
    onClose();
    setTitle('');
    setBody(noteContent);
    setScripture('');
  };

  const handleCreateAndPublish = () => {
    if (!title.trim() || !body.trim()) {
      alert('Por favor completa el título y el cuerpo del mensaje');
      return;
    }

    const message = LeaderMessageService.createMessageFromNote({
      title,
      body,
      scripture: scripture.trim() || undefined,
      senderId: 'current_user',
      senderName: 'Líder de Distrito',
      senderRole: 'district_leader',
      targetScope: 'district',
      districtId: 'current_district'
    });

    const published = LeaderMessageService.publishMessage(message.id);
    if (published) {
      alert('Mensaje publicado al distrito');
      if (onMessageCreated) {
        onMessageCreated(message.id);
      }
    }

    onClose();
    setTitle('');
    setBody(noteContent);
    setScripture('');
  };

  return (
    <div className="promote-note-overlay" onClick={onClose}>
      <div className="promote-note-modal" onClick={(e) => e.stopPropagation()} style={{ borderTopColor: roleColor }}>
        <div className="promote-note-header">
          <h2>Compartir como mensaje al distrito</h2>
          <button className="promote-note-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="promote-note-content">
          <div className="promote-note-field">
            <label>Título del mensaje *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Énfasis de la semana, Mini devocional..."
            />
          </div>

          <div className="promote-note-field">
            <label>Escritura (opcional)</label>
            <input
              type="text"
              value={scripture}
              onChange={(e) => setScripture(e.target.value)}
              placeholder="Ej: DyC 88:77, Alma 32:27..."
            />
          </div>

          <div className="promote-note-field">
            <label>Cuerpo del mensaje *</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Escribe el mensaje completo..."
              rows={10}
            />
          </div>

          <div className="promote-note-info">
            <p>💡 <strong>Nota:</strong> Este mensaje será visible para todos los misioneros de tu distrito en el Centro de liderazgo.</p>
          </div>
        </div>

        <div className="promote-note-footer">
          <button className="promote-note-button secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="promote-note-button secondary" onClick={handleCreateDraft}>
            Guardar borrador
          </button>
          <button 
            className="promote-note-button primary" 
            onClick={handleCreateAndPublish}
            style={{ backgroundColor: roleColor }}
          >
            Publicar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

