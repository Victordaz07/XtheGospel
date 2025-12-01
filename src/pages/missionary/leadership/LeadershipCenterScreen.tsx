import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DistrictCouncilService } from '../../../services/districtCouncilService';
import { DistrictCouncil } from '../../../services/districtCouncilService';
import { ExchangeService, Exchange } from '../../../services/exchangeService';
import { BaptismalInterviewService, BaptismalInterview } from '../../../services/baptismalInterviewService';
import { LeaderMessageService, LeaderMessage } from '../../../services/leaderMessageService';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUser, FaCheck, FaComment, FaExchangeAlt, FaWater, FaBullhorn } from 'react-icons/fa';
import '../../../pages/Page.css';
import './LeadershipCenterScreen.css';

export const LeadershipCenterScreen: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [council, setCouncil] = useState<DistrictCouncil | null>(null);
  const [exchange, setExchange] = useState<Exchange | null>(null);
  const [interview, setInterview] = useState<BaptismalInterview | null>(null);
  const [leaderMessage, setLeaderMessage] = useState<LeaderMessage | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    // Cargar eventos para el distrito actual
    const districtId = 'current_district'; // TODO: obtener del contexto
    const districtEvents = DistrictCouncilService.getEventsForDistrict(districtId);
    
    // Agregar intercambios
    const missionaryId = 'current_user'; // TODO: obtener del contexto
    const exchangeEvents = ExchangeService.getExchangesForMissionary(missionaryId);
    
    // Agregar entrevistas bautismales
    const interviewEvents = BaptismalInterviewService.getInterviewsForMissionary(districtId);
    
    // Agregar mensajes de liderazgo
    const zoneId = 'current_zone'; // TODO: obtener del contexto
    const messageEvents = LeaderMessageService.getMessagesForMissionaryViaEvents(districtId, zoneId);
    
    setEvents([...districtEvents, ...exchangeEvents, ...interviewEvents, ...messageEvents]);
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      if (selectedEvent.type === 'exchange') {
        // Cargar el intercambio completo
        const exchangeData = ExchangeService.getExchangeById(selectedEvent.sourceId);
        setExchange(exchangeData);
        setCouncil(null);
        setInterview(null);
        setComments([]);
      } else if (selectedEvent.type === 'baptismal_interview') {
        // Cargar la entrevista completa
        const interviewData = BaptismalInterviewService.getInterviewById(selectedEvent.sourceId);
        setInterview(interviewData);
        setCouncil(null);
        setExchange(null);
        setLeaderMessage(null);
        setComments([]);
      } else if (selectedEvent.type === 'leader_message') {
        // Cargar el mensaje completo
        const messageData = LeaderMessageService.getMessageById(selectedEvent.sourceId);
        setLeaderMessage(messageData);
        setCouncil(null);
        setExchange(null);
        setInterview(null);
        setComments([]);
      } else {
        // Cargar el council completo
        const councilData = DistrictCouncilService.getCouncilById(selectedEvent.sourceId);
        setCouncil(councilData);
        setExchange(null);
        setInterview(null);
        setLeaderMessage(null);
        
        // Cargar comentarios
        if (councilData) {
          const councilComments = DistrictCouncilService.getCommentsByCouncil(councilData.id);
          setComments(councilComments);
        }
      }
      
      // Verificar si está leída
      const userId = 'current_user'; // TODO: obtener del contexto
      const read = DistrictCouncilService.isRead(selectedEvent.id, userId);
      setIsRead(read);
    }
  }, [selectedEvent]);

  const handleMarkAsRead = () => {
    if (selectedEvent) {
      const userId = 'current_user'; // TODO: obtener del contexto
      DistrictCouncilService.markAsRead(selectedEvent.id, userId);
      setIsRead(true);
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedEvent || !council) return;

    const comment = DistrictCouncilService.addComment({
      councilId: council.id,
      authorId: 'current_user',
      authorName: 'Yo',
      authorRole: 'missionary',
      text: newComment
    });

    setComments([...comments, comment]);
    setNewComment('');
  };

  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const pastEvents = events.filter(e => e.status === 'past');

  // Vista de intercambio
  if (selectedEvent && selectedEvent.type === 'exchange' && exchange) {
    return (
      <div className="page">
        <div className="page-header">
          <button className="back-button" onClick={() => setSelectedEvent(null)}>
            ← Volver
          </button>
          <h1>{selectedEvent.title}</h1>
          <p className="page-subtitle">{selectedEvent.description}</p>
        </div>
        <div className="page-content">
          {/* Información del intercambio */}
          <div className="event-detail-card">
            <div className="event-detail-info">
              <div className="event-detail-item">
                <FaCalendar />
                <span>{exchange.date}</span>
              </div>
              {exchange.time && (
                <div className="event-detail-item">
                  <FaClock />
                  <span>{exchange.time}</span>
                </div>
              )}
              <div className="event-detail-item">
                <FaMapMarkerAlt />
                <span>{exchange.area}</span>
              </div>
              <div className="event-detail-item">
                <FaUser />
                <span>{exchange.leaderName}</span>
              </div>
            </div>
            {!isRead && (
              <button className="mark-read-button" onClick={handleMarkAsRead}>
                <FaCheck />
                <span>Marcar como leído</span>
              </button>
            )}
            {isRead && (
              <div className="read-badge">
                <FaCheck />
                <span>Leído</span>
              </div>
            )}
          </div>

          {/* Resumen del intercambio */}
          <div className="council-summary-card">
            <h3>Detalles del intercambio</h3>
            {exchange.companionshipName && (
              <div className="summary-item">
                <strong>Compañerismo:</strong> {exchange.companionshipName}
              </div>
            )}
            {exchange.missionaryName && (
              <div className="summary-item">
                <strong>Misionero contigo:</strong> {exchange.missionaryName}
              </div>
            )}
            {exchange.focus && (
              <div className="summary-item">
                <strong>Enfoque principal:</strong> {exchange.focus}
              </div>
            )}
            {exchange.scripture && (
              <div className="summary-item">
                <strong>Escritura/principio:</strong> {exchange.scripture}
              </div>
            )}
          </div>

          {/* Metas del intercambio */}
          {exchange.goals && (exchange.goals.metasDia || exchange.goals.personasVisitar) && (
            <div className="council-read-view">
              <div className="council-section-read">
                <h3>Metas del día</h3>
                {exchange.goals.metasDia && (
                  <p><strong>Metas específicas:</strong> {exchange.goals.metasDia}</p>
                )}
                {exchange.goals.personasVisitar && (
                  <p><strong>Personas a visitar:</strong> {exchange.goals.personasVisitar}</p>
                )}
                {exchange.goals.habitoModelar && (
                  <p><strong>Hábito a modelar:</strong> {exchange.goals.habitoModelar}</p>
                )}
                {exchange.goals.indicadorExito && (
                  <p><strong>Indicador de éxito:</strong> {exchange.goals.indicadorExito}</p>
                )}
              </div>
            </div>
          )}

          {/* Resumen e impresiones (si está completado) */}
          {exchange.status === 'completed' && exchange.summary && (
            <div className="council-read-view">
              <div className="council-section-read">
                <h3>Resumen del intercambio</h3>
                {exchange.summary.donesVistos && (
                  <p><strong>Dones vistos:</strong> {exchange.summary.donesVistos}</p>
                )}
                {exchange.summary.necesitaAyuda && (
                  <p><strong>Área que necesita ayuda:</strong> {exchange.summary.necesitaAyuda}</p>
                )}
                {exchange.summary.compromisoEspiritual && (
                  <p><strong>Compromiso espiritual:</strong> {exchange.summary.compromisoEspiritual}</p>
                )}
                {exchange.summary.impresionEspiritu && (
                  <p><em>{exchange.summary.impresionEspiritu}</em></p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vista de entrevista bautismal
  if (selectedEvent && selectedEvent.type === 'baptismal_interview' && interview) {
    return (
      <div className="page">
        <div className="page-header">
          <button className="back-button" onClick={() => setSelectedEvent(null)}>
            ← Volver
          </button>
          <h1>{selectedEvent.title}</h1>
          <p className="page-subtitle">{selectedEvent.description}</p>
        </div>
        <div className="page-content">
          {/* Información de la entrevista */}
          <div className="event-detail-card">
            <div className="event-detail-info">
              <div className="event-detail-item">
                <FaCalendar />
                <span>{interview.date}</span>
              </div>
              <div className="event-detail-item">
                <FaClock />
                <span>{interview.time}</span>
              </div>
              <div className="event-detail-item">
                <FaMapMarkerAlt />
                <span>{interview.place}</span>
              </div>
              <div className="event-detail-item">
                <FaUser />
                <span>{interview.interviewLeaderName}</span>
              </div>
            </div>
            {!isRead && (
              <button className="mark-read-button" onClick={handleMarkAsRead}>
                <FaCheck />
                <span>Marcar como leído</span>
              </button>
            )}
            {isRead && (
              <div className="read-badge">
                <FaCheck />
                <span>Leído</span>
              </div>
            )}
          </div>

          {/* Resumen de la entrevista */}
          <div className="council-summary-card">
            <h3>Detalles de la entrevista</h3>
            <div className="summary-item">
              <strong>Persona:</strong> {interview.personName}
            </div>
            <div className="summary-item">
              <strong>Compañerismo:</strong> {interview.teachingCompanionship}
            </div>
            <div className="summary-item">
              <strong>Área:</strong> {interview.teachingArea}
            </div>
            {interview.notesBefore.concerns && (
              <div className="summary-item">
                <strong>Notas previas:</strong> {interview.notesBefore.concerns}
              </div>
            )}
          </div>

          {/* Información previa */}
          {interview.notesBefore && (interview.notesBefore.lessonsTaught || interview.notesBefore.specialNeeds) && (
            <div className="council-read-view">
              <div className="council-section-read">
                <h3>Información previa</h3>
                {interview.notesBefore.lessonsTaught && (
                  <p><strong>Lecciones enseñadas:</strong> {interview.notesBefore.lessonsTaught}</p>
                )}
                {interview.notesBefore.specialNeeds && (
                  <p><strong>Necesidades especiales:</strong> {interview.notesBefore.specialNeeds}</p>
                )}
              </div>
            </div>
          )}

          {/* Recordatorios para el compañerismo */}
          <div className="council-read-view">
            <div className="council-section-read">
              <h3>Recordatorios para el compañerismo</h3>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                <li>Acompañar a la persona con tiempo de antelación.</li>
                <li>Revisar brevemente las preguntas clave del folleto antes de llegar.</li>
                <li>Asegurar un miembro de apoyo, si es posible.</li>
                <li>Mantener una actitud reverente antes y después de la entrevista.</li>
              </ul>
            </div>
          </div>

          {/* Observaciones pastorales (si está completada) */}
          {interview.status === 'completed' && interview.pastoralNotes && (
            <div className="council-read-view">
              <div className="council-section-read">
                <h3>Observaciones pastorales</h3>
                {interview.pastoralNotes.testimonyImpression && (
                  <p><strong>Impresión del testimonio:</strong> {interview.pastoralNotes.testimonyImpression}</p>
                )}
                {interview.pastoralNotes.recommendedFocusBeforeBaptism && (
                  <p><strong>Reforzar antes del bautismo:</strong> {interview.pastoralNotes.recommendedFocusBeforeBaptism}</p>
                )}
                {interview.pastoralNotes.recommendedFocusAfterBaptism && (
                  <p><strong>Reforzar después del bautismo:</strong> {interview.pastoralNotes.recommendedFocusAfterBaptism}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vista de mensaje de liderazgo
  if (selectedEvent && selectedEvent.type === 'leader_message' && leaderMessage) {
    return (
      <div className="page">
        <div className="page-header">
          <button className="back-button" onClick={() => setSelectedEvent(null)}>
            ← Volver
          </button>
          <h1>{selectedEvent.title}</h1>
          <p className="page-subtitle">Mensaje de {leaderMessage.senderName}</p>
        </div>
        <div className="page-content">
          {/* Información del mensaje */}
          <div className="event-detail-card">
            <div className="event-detail-info">
              <div className="event-detail-item">
                <FaCalendar />
                <span>{new Date(leaderMessage.publishedAt || leaderMessage.createdAt).toLocaleDateString('es-ES')}</span>
              </div>
              <div className="event-detail-item">
                <FaUser />
                <span>{leaderMessage.senderName}</span>
              </div>
              <div className="event-detail-item">
                <FaBullhorn />
                <span>{leaderMessage.type === 'devotional' ? 'Devocional' : 
                        leaderMessage.type === 'invitation' ? 'Invitación' :
                        leaderMessage.type === 'training' ? 'Capacitación' : 'Anuncio'}</span>
              </div>
            </div>
            {!isRead && (
              <button className="mark-read-button" onClick={handleMarkAsRead}>
                <FaCheck />
                <span>Marcar como leído</span>
              </button>
            )}
            {isRead && (
              <div className="read-badge">
                <FaCheck />
                <span>Leído</span>
              </div>
            )}
          </div>

          {/* Contenido del mensaje */}
          <div className="council-read-view">
            <div className="council-section-read">
              <h2>{leaderMessage.title}</h2>
              {leaderMessage.scripture && (
                <div className="message-scripture">
                  <strong>📖 Escritura:</strong> {leaderMessage.scripture}
                </div>
              )}
              <div className="message-body" style={{ whiteSpace: 'pre-wrap' }}>
                {leaderMessage.body}
              </div>
              <div className="message-signature">
                <p>– {leaderMessage.senderName}</p>
                <div className="message-scope-container">
                  {leaderMessage.targetScope === 'district' && (
                    <p className="message-scope">Mensaje para el distrito</p>
                  )}
                  {leaderMessage.targetScope === 'zone' && (
                    <p className="message-scope">Mensaje para la zona</p>
                  )}
                  {leaderMessage.targetScope === 'mission' && (
                    <p className="message-scope">Mensaje para toda la misión</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista de reunión de distrito
  if (selectedEvent && council) {
    return (
      <div className="page">
        <div className="page-header">
          <button className="back-button" onClick={() => setSelectedEvent(null)}>
            ← Volver
          </button>
          <h1>{selectedEvent.title}</h1>
          <p className="page-subtitle">{selectedEvent.description}</p>
        </div>
        <div className="page-content">
          {/* Información de la reunión */}
          <div className="event-detail-card">
            <div className="event-detail-info">
              <div className="event-detail-item">
                <FaCalendar />
                <span>{council.date}</span>
              </div>
              <div className="event-detail-item">
                <FaClock />
                <span>{council.time}</span>
              </div>
              <div className="event-detail-item">
                <FaMapMarkerAlt />
                <span>{council.location}</span>
              </div>
              <div className="event-detail-item">
                <FaUser />
                <span>{selectedEvent.leaderName}</span>
              </div>
            </div>
            {!isRead && (
              <button className="mark-read-button" onClick={handleMarkAsRead}>
                <FaCheck />
                <span>Marcar como leída</span>
              </button>
            )}
            {isRead && (
              <div className="read-badge">
                <FaCheck />
                <span>Leída</span>
              </div>
            )}
          </div>

          {/* Resumen */}
          {council.summary && (
            <div className="council-summary-card">
              <h3>Resumen</h3>
              {council.summary.spiritualFocus && (
                <div className="summary-item">
                  <strong>Tema espiritual:</strong> {council.summary.spiritualFocus}
                </div>
              )}
              {council.summary.trainingTopic && (
                <div className="summary-item">
                  <strong>Capacitación:</strong> {council.summary.trainingTopic}
                </div>
              )}
              {council.summary.mainGoal && (
                <div className="summary-item">
                  <strong>Meta principal:</strong> {council.summary.mainGoal}
                </div>
              )}
            </div>
          )}

          {/* Contenido completo en modo lectura */}
          <div className="council-read-view">
            {council.spiritualStart.ideaCentral && (
              <div className="council-section-read">
                <h3>Inicio espiritual</h3>
                {council.spiritualStart.scripture && (
                  <p><strong>Escritura:</strong> {council.spiritualStart.scripture}</p>
                )}
                <p>{council.spiritualStart.ideaCentral}</p>
                {council.spiritualStart.application && (
                  <p><em>{council.spiritualStart.application}</em></p>
                )}
              </div>
            )}

            {council.training.tema && (
              <div className="council-section-read">
                <h3>Capacitación misional</h3>
                <p><strong>Tema:</strong> {council.training.tema}</p>
                {council.training.principio && (
                  <p><strong>Principio:</strong> {council.training.principio}</p>
                )}
                {council.training.compromiso && (
                  <p><strong>Compromiso:</strong> {council.training.compromiso}</p>
                )}
              </div>
            )}

            {council.goals.resumen && (
              <div className="council-section-read">
                <h3>Metas de la semana</h3>
                <p>{council.goals.resumen}</p>
                {council.goals.personas && (
                  <p><strong>Personas a enseñar:</strong> {council.goals.personas}</p>
                )}
                {council.goals.compromisos && (
                  <p><strong>Compromisos:</strong> {council.goals.compromisos}</p>
                )}
              </div>
            )}
          </div>

          {/* Comentarios */}
          <div className="council-comments-section">
            <h3>
              <FaComment />
              <span>Preguntas / comentarios para el líder</span>
            </h3>
            
            <div className="comments-list">
              {comments.length === 0 ? (
                <p className="no-comments">Aún no hay comentarios. Sé el primero en preguntar.</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <strong>{comment.authorName}</strong>
                      <span className="comment-date">
                        {new Date(comment.createdAt).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="comment-text">{comment.text}</div>
                  </div>
                ))
              )}
            </div>

            <div className="comment-input">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe tu pregunta o comentario..."
                rows={3}
              />
              <button
                className="comment-submit-button"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Centro de liderazgo</h1>
        <p className="page-subtitle">Reuniones, agendas y mensajes de tus líderes</p>
      </div>
      <div className="page-content">
        {/* Próximas reuniones */}
        {upcomingEvents.length > 0 && (
          <div className="events-section">
            <h2>Próximas reuniones</h2>
            <div className="events-list">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="event-card"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="event-card-header">
                    <h3>{event.title}</h3>
                    <span className="event-type-badge">
                      {event.type === 'district_council' ? 'Distrito' : 
                       event.type === 'exchange' ? 'Intercambio' : 
                       event.type === 'baptismal_interview' ? 'Entrevista' :
                       event.type === 'leader_message' ? 'Mensaje' : 'Zona'}
                    </span>
                  </div>
                  <div className="event-card-info">
                    <div className="event-info-item">
                      <FaCalendar />
                      <span>{event.date}</span>
                    </div>
                    {event.time && (
                      <div className="event-info-item">
                        <FaClock />
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="event-info-item">
                        <FaMapMarkerAlt />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  <p className="event-description">{event.description}</p>
                  <div className="event-card-footer">
                    <FaUser />
                    <span>{event.leaderName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Historial */}
        {pastEvents.length > 0 && (
          <div className="events-section">
            <h2>Historial</h2>
            <div className="events-list">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="event-card past"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="event-card-header">
                    <h3>{event.title}</h3>
                    <span className="event-type-badge">
                      {event.type === 'district_council' ? 'Distrito' : 
                       event.type === 'exchange' ? 'Intercambio' : 
                       event.type === 'baptismal_interview' ? 'Entrevista' :
                       event.type === 'leader_message' ? 'Mensaje' : 'Zona'}
                    </span>
                  </div>
                  <div className="event-card-info">
                    <div className="event-info-item">
                      <FaCalendar />
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {events.length === 0 && (
          <div className="empty-events">
            <p>No hay reuniones programadas aún.</p>
            <p className="empty-hint">Las agendas publicadas por tu líder aparecerán aquí.</p>
          </div>
        )}
      </div>
    </div>
  );
};

