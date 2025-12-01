import React, { useState, useEffect } from 'react';
import { getLeadershipRoleEnhanced } from '../../../data/missionary/leadershipModeEnhanced';
import { LeaderMessageService, LeaderMessage } from '../../../services/leaderMessageService';
import '../../../pages/Page.css';
import './ZoneLeaderMessagesScreen.css';

export const ZoneLeaderMessagesScreen: React.FC = () => {
  const role = getLeadershipRoleEnhanced('districtLeader');
  const [messages, setMessages] = useState<LeaderMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<LeaderMessage | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    // Cargar mensajes dirigidos al distrito o a la zona (que incluye este distrito)
    const allMessages = LeaderMessageService.getMessagesForDistrict('current_district', 'current_zone');
    setMessages(allMessages);
    setLoading(false);
  };

  if (!role) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Error</h1>
          <p className="page-subtitle">No se pudo cargar la configuración del rol</p>
        </div>
      </div>
    );
  }

  const roleColor = role.color || '#3B82F6';

  if (loading) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Cargando...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header" style={{ borderLeftColor: roleColor }}>
        <div
          className="leadership-header-badge"
          style={{ backgroundColor: `${roleColor}15`, color: roleColor }}
        >
          📨
        </div>
        <div>
          <h1>Mensajes del líder de zona</h1>
          <p className="page-subtitle">Recibe y aplica la visión y énfasis de la zona</p>
        </div>
      </div>

      <div className="page-content">
        {messages.length === 0 ? (
          <div className="leader-empty-card">
            <p>No hay mensajes del líder de zona aún.</p>
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#6B7280' }}>
              Los mensajes que el líder de zona publique para tu zona aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="zone-messages-list">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`zone-message-card ${selectedMessage?.id === message.id ? 'selected' : ''}`}
                onClick={() => setSelectedMessage(selectedMessage?.id === message.id ? null : message)}
              >
                <div className="zone-message-header">
                  <div className="zone-message-title-row">
                    <h3>{message.title}</h3>
                    <span className="zone-message-type">{message.type}</span>
                  </div>
                  <div className="zone-message-meta">
                    <span className="zone-message-sender">
                      De: {message.senderName} ({message.senderRole === 'zone_leader' ? 'Líder de Zona' : message.senderRole})
                    </span>
                    <span className="zone-message-date">
                      {new Date(message.publishedAt || message.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {selectedMessage?.id === message.id && (
                  <div className="zone-message-detail">
                    {message.scripture && (
                      <div className="zone-message-scripture">
                        <strong>📖 Escritura:</strong> {message.scripture}
                      </div>
                    )}
                    <div className="zone-message-body">
                      {message.body.split('\n').map((paragraph, idx) => (
                        <React.Fragment key={idx}>
                          {paragraph}
                          {idx < message.body.split('\n').length - 1 && (
                            <>
                              <br />
                              <br />
                            </>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMessage?.id !== message.id && (
                  <div className="zone-message-preview">
                    {message.body.substring(0, 150)}
                    {message.body.length > 150 && '...'}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

