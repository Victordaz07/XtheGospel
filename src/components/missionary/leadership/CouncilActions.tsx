import React, { useState } from 'react';
import { FaSave, FaPaperPlane, FaShare, FaCheck } from 'react-icons/fa';
import { DistrictCouncil, DistrictCouncilService, CouncilStatus } from '../../../services/districtCouncilService';
import { ShareService } from '../../../services/shareService';
import './CouncilActions.css';

interface CouncilActionsProps {
  council: DistrictCouncil;
  onSave: (council: DistrictCouncil) => void;
  onPublish: (council: DistrictCouncil) => void;
  onComplete?: (council: DistrictCouncil) => void;
  roleColor: string;
}

export const CouncilActions: React.FC<CouncilActionsProps> = ({ 
  council, 
  onSave, 
  onPublish,
  onComplete,
  roleColor 
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  const handleSaveDraft = () => {
    const updated = {
      ...council,
      status: 'draft' as CouncilStatus,
      updatedAt: new Date().toISOString()
    };
    DistrictCouncilService.saveCouncil(updated);
    onSave(updated);
  };

  const handlePublish = () => {
    if (!council.date || !council.time || !council.location) {
      alert('Por favor completa: Fecha, Hora y Lugar para publicar la reunión');
      return;
    }

    if (confirm('¿Publicar esta agenda al distrito? Los misioneros podrán verla en su Centro de liderazgo.')) {
      const published = DistrictCouncilService.publishCouncil(council.id);
      if (published) {
        onPublish(published);
      }
    }
  };

  const handleComplete = () => {
    if (council.status !== 'published') {
      alert('Solo se pueden completar reuniones que estén publicadas');
      return;
    }

    if (confirm('¿Marcar esta reunión como completada?')) {
      const completed = DistrictCouncilService.completeCouncil(council.id);
      if (completed && onComplete) {
        onComplete(completed);
      }
    }
  };

  const handleShare = async (method: 'whatsapp' | 'email' | 'copy') => {
    try {
      const success = await ShareService.shareWithOptions(council, method);
      if (success) {
        setShareSuccess(method);
        setTimeout(() => {
          setShareSuccess(null);
          setShowShareMenu(false);
        }, 2000);
      } else {
        // Mostrar mensaje de error si falla
        console.warn(`No se pudo compartir por ${method}`);
      }
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  return (
    <div className="council-actions">
      <div className="council-actions-primary">
        <button
          className="council-action-button secondary"
          onClick={handleSaveDraft}
          style={{ borderColor: roleColor, color: roleColor }}
        >
          <FaSave />
          <span>Guardar borrador</span>
        </button>
        
        {council.status !== 'published' && (
          <button
            className="council-action-button primary"
            onClick={handlePublish}
            style={{ backgroundColor: roleColor, borderColor: roleColor }}
          >
            <FaPaperPlane />
            <span>Publicar al distrito</span>
          </button>
        )}
        
        {council.status === 'published' && (
          <button
            className="council-action-button success"
            onClick={handleComplete}
            style={{ backgroundColor: '#10B981', borderColor: '#10B981' }}
          >
            <FaCheck />
            <span>Completar reunión</span>
          </button>
        )}

        {council.status === 'completed' && (
          <div className="council-status-badge" style={{ backgroundColor: `${roleColor}15`, color: roleColor }}>
            <FaCheck />
            <span>Completada</span>
          </div>
        )}
      </div>

      <div className="council-actions-share">
        <button
          className="council-action-button share"
          onClick={() => setShowShareMenu(!showShareMenu)}
          style={{ borderColor: roleColor, color: roleColor }}
        >
          <FaShare />
          <span>Compartir</span>
        </button>

        {showShareMenu && (
          <div className="council-share-menu" style={{ borderColor: roleColor }}>
            <button
              className="council-share-option"
              onClick={() => handleShare('whatsapp')}
            >
              <span>📱</span>
              <span>WhatsApp</span>
              {shareSuccess === 'whatsapp' && <span className="share-success">✓</span>}
            </button>
            <button
              className="council-share-option"
              onClick={() => handleShare('email')}
            >
              <span>📧</span>
              <span>Correo</span>
              {shareSuccess === 'email' && <span className="share-success">✓</span>}
            </button>
            <button
              className="council-share-option"
              onClick={() => handleShare('copy')}
            >
              <span>📋</span>
              <span>Copiar texto</span>
              {shareSuccess === 'copy' && <span className="share-success">✓</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

