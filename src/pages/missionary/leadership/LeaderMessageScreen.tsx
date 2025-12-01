import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLeadershipRoleEnhanced } from '../../../data/missionary/leadershipModeEnhanced';
import { LeadershipRoleService } from '../../../services/leadershipRoleService';
import {
  LeaderMessage,
  LeaderMessageService,
  MessageType,
  TargetScope,
} from '../../../services/leaderMessageService';
import { MessageActions } from '../../../components/missionary/leadership/MessageActions';
import '../../../pages/Page.css';
import './LeaderMessageScreen.css';

export const LeaderMessageScreen: React.FC = () => {
  const location = useLocation();
  const [currentRoleId, setCurrentRoleId] = useState<string>('zoneLeader');
  const [role, setRole] = useState(getLeadershipRoleEnhanced('zoneLeader'));
  const [message, setMessage] = useState<LeaderMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sentMessages, setSentMessages] = useState<LeaderMessage[]>([]);

  useEffect(() => {
    // Detectar el rol actual desde la URL o el servicio
    const roleFromService = LeadershipRoleService.getCurrentRole();
    const roleId = roleFromService === 'zoneLeader' ? 'zoneLeader' : 
                   roleFromService === 'districtLeader' ? 'districtLeader' :
                   roleFromService === 'assistantToPresident' ? 'assistantToPresident' : 'zoneLeader';
    setCurrentRoleId(roleId);
    setRole(getLeadershipRoleEnhanced(roleId));
  }, [location.pathname]);

  useEffect(() => {
    if (role) {
      loadMessage();
      loadSentMessages();
    }
  }, [currentRoleId, role]);

  const loadMessage = () => {
    const drafts = LeaderMessageService.getDrafts('current_user');
    const latestDraft = drafts.length > 0 ? drafts[0] : null;

    if (latestDraft) {
      setMessage(latestDraft);
    } else {
      const isDistrictLeader = currentRoleId === 'districtLeader';
      const isAP = currentRoleId === 'assistantToPresident';
      const getSenderName = () => {
        if (isDistrictLeader) return 'Líder de Distrito';
        if (isAP) return 'Asistente del Presidente';
        return 'Líder de Zona';
      };
      const getSenderRole = () => {
        if (isDistrictLeader) return 'district_leader';
        if (isAP) return 'assistant_to_president';
        return 'zone_leader';
      };
      const getTargetScope = (): TargetScope => {
        if (isDistrictLeader) return 'district';
        if (isAP) return 'mission';
        return 'zone';
      };
      
      const newMessage: LeaderMessage = {
        id: '',
        senderId: 'current_user',
        senderName: getSenderName(),
        senderRole: getSenderRole(),
        zoneId: isAP ? undefined : 'current_zone',
        districtId: isDistrictLeader ? 'current_district' : undefined,
        missionId: 'current_mission',
        title: '',
        body: '',
        scripture: '',
        type: 'devotional',
        targetScope: getTargetScope(),
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setMessage(newMessage);
    }
    setIsLoading(false);
  };

  const loadSentMessages = () => {
    if (currentRoleId === 'districtLeader') {
      const districtMessages = LeaderMessageService.getMessagesByDistrict('current_district');
      setSentMessages(districtMessages);
    } else if (currentRoleId === 'assistantToPresident') {
      const missionMessages = LeaderMessageService.getAllMessages()
        .filter(m => m.status === 'published' && (m.targetScope === 'mission' || m.senderRole === 'assistant_to_president'))
        .sort((a, b) => {
          const dateA = new Date(a.publishedAt || a.createdAt).getTime();
          const dateB = new Date(b.publishedAt || b.createdAt).getTime();
          return dateB - dateA;
        });
      setSentMessages(missionMessages);
    } else {
      const zoneMessages = LeaderMessageService.getMessagesByZone('current_zone');
      setSentMessages(zoneMessages);
    }
  };

  const handleFieldChange = (field: keyof LeaderMessage, value: any) => {
    if (!message) return;

    const updated = { ...message, [field]: value, updatedAt: new Date().toISOString() };
    setMessage(updated);
    
    // Auto-guardar
    if (updated.id) {
      LeaderMessageService.saveMessage(updated);
    }
  };

  const handleSave = () => {
    if (!message) return;
    
    if (!message.title.trim() || !message.body.trim()) {
      alert('Por favor completa el título y el cuerpo del mensaje');
      return;
    }
    
    const saved = LeaderMessageService.saveMessage({
      ...message,
      status: 'draft'
    });
    setMessage(saved);
    alert('Mensaje guardado como borrador');
    loadSentMessages();
  };

  const handlePublish = () => {
    if (!message) return;
    
    if (!message.title.trim() || !message.body.trim()) {
      alert('Por favor completa el título y el cuerpo del mensaje');
      return;
    }
    
    const saved = LeaderMessageService.saveMessage({
      ...message,
      status: 'draft'
    });
    
    const published = LeaderMessageService.publishMessage(saved.id);
    if (published) {
      setMessage(published);
      alert('Mensaje publicado a la zona');
      loadSentMessages();
    }
  };

  if (isLoading || !message || !role) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Cargando...</h1>
        </div>
      </div>
    );
  }

  const roleColor = role.color || '#F59E0B';

  const tabConfig = role?.tabs.find(t => t.id === 'zone_messages');
  const pageTitle = tabConfig?.title || (currentRoleId === 'districtLeader' ? 'Mensajes al distrito' : 'Mensajes del líder de zona');
  const pageSubtitle = tabConfig?.subtitle || (currentRoleId === 'districtLeader' ? 'Comparte visión y ánimo con tu distrito' : 'Comparte visión, énfasis y ánimo con toda tu zona');

  return (
    <div className="page">
      <div className="page-header">
        <h1>{pageTitle}</h1>
        <p className="page-subtitle">{pageSubtitle}</p>
      </div>

      <div className="page-content">
        {/* Formulario de nuevo mensaje */}
        <div className="message-form-card">
          <h2>Nuevo mensaje para la zona</h2>
          
          <div className="message-form-field">
            <label>Título del mensaje *</label>
            <input
              type="text"
              value={message.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Ej: Énfasis de la semana, Mini devocional..."
            />
          </div>

          <div className="message-form-field">
            <label>Tipo *</label>
            <select
              value={message.type}
              onChange={(e) => handleFieldChange('type', e.target.value as MessageType)}
            >
              <option value="devotional">Devocional</option>
              <option value="invitation">Invitación</option>
              <option value="training">Capacitación</option>
              <option value="announcement">Anuncio</option>
            </select>
          </div>

          <div className="message-form-field">
            <label>Escritura/cita de apoyo</label>
            <input
              type="text"
              value={message.scripture || ''}
              onChange={(e) => handleFieldChange('scripture', e.target.value)}
              placeholder="Ej: DyC 88:77, Alma 32:27..."
            />
          </div>

          <div className="message-form-field">
            <label>Cuerpo del mensaje (texto completo) *</label>
            <textarea
              value={message.body}
              onChange={(e) => handleFieldChange('body', e.target.value)}
              placeholder="Escribe el mensaje completo..."
              rows={12}
            />
          </div>
        </div>

        {/* Acciones */}
        <MessageActions
          message={message}
          roleColor={roleColor}
          onSave={handleSave}
          onPublish={handlePublish}
        />

        {/* Mensajes enviados */}
        <div className="sent-messages-section">
          <h2>Mensajes enviados recientemente</h2>
          {sentMessages.length === 0 ? (
            <p className="empty-messages">Aún no has enviado mensajes.</p>
          ) : (
            <div className="sent-messages-list">
              {sentMessages.map((msg) => (
                <div key={msg.id} className="sent-message-card">
                  <div className="sent-message-header">
                    <div>
                      <strong>{msg.title}</strong>
                      <span className="message-type-badge">{msg.type}</span>
                    </div>
                    <span className="message-date">
                      {new Date(msg.publishedAt || msg.createdAt).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <p className="sent-message-preview">{msg.body.substring(0, 150)}...</p>
                  <div className="sent-message-footer">
                    <span className="message-status">{msg.status === 'published' ? '✅ Publicado' : '📝 Borrador'}</span>
                    <span className="message-scope">Alcance: {msg.targetScope === 'zone' ? 'Zona' : 'Distrito'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

