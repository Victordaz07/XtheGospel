import React, { useState } from 'react';
import { LeaderMessage, LeaderMessageService } from '../../../services/leaderMessageService';
import { ShareService } from '../../../services/shareService';
import { FaSave, FaPaperPlane, FaShare } from 'react-icons/fa';
import './MessageActions.css';

interface MessageActionsProps {
  message: LeaderMessage;
  roleColor: string;
  onSave: () => void;
  onPublish: () => void;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  message,
  roleColor,
  onSave,
  onPublish
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShare = async (method: 'whatsapp' | 'email' | 'clipboard') => {
    const template = `📣 Mensaje del líder

Título: ${message.title}
Tipo: ${message.type}
${message.scripture ? `Escritura: ${message.scripture}` : ''}

${message.body}

– ${message.senderName}`;

    try {
      if (method === 'whatsapp') {
        ShareService.shareToWhatsApp(template);
      } else if (method === 'email') {
        ShareService.shareToEmail(
          `Mensaje del líder – ${message.title}`,
          template
        );
      } else {
        await ShareService.copyToClipboard(template);
        alert('Mensaje copiado al portapapeles');
      }
      setShowShareMenu(false);
    } catch (error) {
      console.error('Error compartiendo:', error);
      alert('Error al compartir');
    }
  };

  return (
    <div className="message-actions" style={{ borderTopColor: roleColor }}>
      <div className="actions-primary">
        <button
          className="action-button secondary"
          onClick={onSave}
          title="Guardar como borrador"
        >
          <FaSave />
          <span>Guardar borrador</span>
        </button>

        {message.status === 'draft' && (
          <button
            className="action-button primary"
            onClick={onPublish}
            style={{ backgroundColor: roleColor }}
            title="Publicar a la zona"
          >
            <FaPaperPlane />
            <span>Publicar a la zona</span>
          </button>
        )}
      </div>

      <div className="actions-secondary">
        <div className="share-menu-container">
          <button
            className="action-button ghost"
            onClick={() => setShowShareMenu(!showShareMenu)}
            title="Compartir por..."
          >
            <FaShare />
            <span>Compartir</span>
          </button>
          
          {showShareMenu && (
            <div className="share-menu">
              <button onClick={() => handleShare('whatsapp')}>
                WhatsApp
              </button>
              <button onClick={() => handleShare('email')}>
                Correo
              </button>
              <button onClick={() => handleShare('clipboard')}>
                Copiar texto
              </button>
            </div>
          )}
        </div>
      </div>

      {message.status !== 'draft' && (
        <div className="message-status-badge" style={{ backgroundColor: `${roleColor}15`, color: roleColor }}>
          {message.status === 'published' && '📣 Publicado'}
          {message.status === 'archived' && '📦 Archivado'}
        </div>
      )}
    </div>
  );
};

