import React, { useState } from 'react';
import { Exchange } from '../../../services/exchangeService';
import { ShareService } from '../../../services/shareService';
import { FaSave, FaPaperPlane, FaCheck, FaShare } from 'react-icons/fa';
import './ExchangeActions.css';

interface ExchangeActionsProps {
  exchange: Exchange;
  roleColor: string;
  onSave: () => void;
  onPublish: () => void;
  onComplete: () => void;
}

export const ExchangeActions: React.FC<ExchangeActionsProps> = ({
  exchange,
  roleColor,
  onSave,
  onPublish,
  onComplete
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShare = async (method: 'whatsapp' | 'email' | 'clipboard') => {
    const template = `📌 Intercambio – ${exchange.date} ${exchange.time || ''}

Compañerismo: ${exchange.companionshipName}
Misionero contigo: ${exchange.missionaryName || 'Por definir'}
Área: ${exchange.area}

Enfoque principal: ${exchange.focus}
Escritura/principio: ${exchange.scripture}

Metas del día: ${exchange.goals.metasDia}
Personas a visitar: ${exchange.goals.personasVisitar}
Hábito a modelar: ${exchange.goals.habitoModelar}
Indicador de éxito: ${exchange.goals.indicadorExito}

Nos veremos preparados y con fe para aprender juntos. – ${exchange.leaderName}`;

    try {
      if (method === 'whatsapp') {
        ShareService.shareToWhatsApp(template);
      } else if (method === 'email') {
        ShareService.shareToEmail(
          `Intercambio – ${exchange.date}`,
          template
        );
      } else {
        await ShareService.copyToClipboard(template);
        alert('Intercambio copiado al portapapeles');
      }
      setShowShareMenu(false);
    } catch (error) {
      console.error('Error compartiendo:', error);
      alert('Error al compartir');
    }
  };

  return (
    <div className="exchange-actions" style={{ borderTopColor: roleColor }}>
      <div className="actions-primary">
        <button
          className="action-button secondary"
          onClick={onSave}
          title="Guardar como borrador"
        >
          <FaSave />
          <span>Guardar borrador</span>
        </button>

        {exchange.status === 'draft' && (
          <button
            className="action-button primary"
            onClick={onPublish}
            style={{ backgroundColor: roleColor }}
            title="Publicar al misionero"
          >
            <FaPaperPlane />
            <span>Publicar al misionero</span>
          </button>
        )}

        {exchange.status === 'planned' && (
          <button
            className="action-button success"
            onClick={onComplete}
            title="Marcar como completado"
          >
            <FaCheck />
            <span>Completar intercambio</span>
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

      {exchange.status !== 'draft' && (
        <div className="exchange-status-badge" style={{ backgroundColor: `${roleColor}15`, color: roleColor }}>
          {exchange.status === 'planned' && '📅 Planificado'}
          {exchange.status === 'completed' && '✅ Completado'}
        </div>
      )}
    </div>
  );
};

