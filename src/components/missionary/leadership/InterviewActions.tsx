import React, { useState } from 'react';
import { BaptismalInterview } from '../../../services/baptismalInterviewService';
import { ShareService } from '../../../services/shareService';
import { FaSave, FaPaperPlane, FaCheck, FaShare } from 'react-icons/fa';
import './InterviewActions.css';

interface InterviewActionsProps {
  interview: BaptismalInterview;
  roleColor: string;
  onSave: () => void;
  onPublish: () => void;
  onComplete: () => void;
}

export const InterviewActions: React.FC<InterviewActionsProps> = ({
  interview,
  roleColor,
  onSave,
  onPublish,
  onComplete
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShare = async (method: 'whatsapp' | 'email' | 'clipboard') => {
    const template = `🕊️ Entrevista bautismal programada

Persona: ${interview.personName}
Compañerismo: ${interview.teachingCompanionship}
Área: ${interview.teachingArea}

Entrevistador: ${interview.interviewLeaderName}
Fecha: ${interview.date} – Hora: ${interview.time}
Lugar: ${interview.place}

Notas previas: ${interview.notesBefore.concerns || 'Ninguna'}

Por favor asegúrense de que llegue puntual, con un miembro de apoyo si es posible, y en un ambiente reverente.`;

    try {
      if (method === 'whatsapp') {
        ShareService.shareToWhatsApp(template);
      } else if (method === 'email') {
        ShareService.shareToEmail(
          `Entrevista bautismal – ${interview.personName} – ${interview.date}`,
          template
        );
      } else {
        await ShareService.copyToClipboard(template);
        alert('Entrevista copiada al portapapeles');
      }
      setShowShareMenu(false);
    } catch (error) {
      console.error('Error compartiendo:', error);
      alert('Error al compartir');
    }
  };

  return (
    <div className="interview-actions" style={{ borderTopColor: roleColor }}>
      <div className="actions-primary">
        <button
          className="action-button secondary"
          onClick={onSave}
          title="Guardar como borrador"
        >
          <FaSave />
          <span>Guardar borrador</span>
        </button>

        {interview.status === 'draft' && (
          <button
            className="action-button primary"
            onClick={onPublish}
            style={{ backgroundColor: roleColor }}
            title="Programar entrevista y publicar al compañerismo"
          >
            <FaPaperPlane />
            <span>Programar entrevista</span>
          </button>
        )}

        {interview.status === 'scheduled' && (
          <button
            className="action-button success"
            onClick={onComplete}
            title="Marcar como completada"
          >
            <FaCheck />
            <span>Completar entrevista</span>
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

      {interview.status !== 'draft' && (
        <div className="interview-status-badge" style={{ backgroundColor: `${roleColor}15`, color: roleColor }}>
          {interview.status === 'scheduled' && '📅 Programada'}
          {interview.status === 'completed' && '✅ Completada'}
        </div>
      )}
    </div>
  );
};

