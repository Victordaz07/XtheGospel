import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { mockNewConverts, NewConvert, ConvertTimeframe, OrganizationType } from '../../data/leaderNewConverts';
import { newConvertsExtended } from '../../data/leader/newConvertsExtended';
import { convertPlansByOrganization } from '../../data/leader/convertPlansByOrganization';
import { ConvertNotesService, ConvertNote } from '../../services/convertNotesService';
import '../../pages/Page.css';
import './LeaderScreens.css';
import './ConvertNotesModal.css';

export const LeaderNewConvertsScreen: React.FC = () => {
  const { t } = useI18n();
  const location = useLocation();
  const [selectedConvert, setSelectedConvert] = useState<string | null>(null);
  const [notesModalOpen, setNotesModalOpen] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, ConvertNote>>({});
  const [noteContent, setNoteContent] = useState<Record<string, string>>({});

  useEffect(() => {
    // Cargar todas las notas al iniciar
    const allNotes: Record<string, ConvertNote> = {};
    mockNewConverts.forEach(convert => {
      const note = ConvertNotesService.loadNote(convert.id);
      if (note) {
        allNotes[convert.id] = note;
        noteContent[convert.id] = note.content;
      } else {
        noteContent[convert.id] = '';
      }
    });
    setNotes(allNotes);
  }, []);

  const getStatusLabel = (status: string) => {
    return t(`memberLeader.newConverts.status.${status}`);
  };

  const getTimeframeMonths = (timeframe: ConvertTimeframe) => {
    if (timeframe === '0-3') return '0_3';
    if (timeframe === '3-6') return '3_6';
    return '6_12';
  };

  const getPlanItems = (timeframe: ConvertTimeframe) => {
    const key = getTimeframeMonths(timeframe);
    const items: string[] = [];
    for (let i = 0; i < 3; i++) {
      const itemKey = `memberLeader.newConverts.plan.months${key}.items.${i}`;
      const item = t(itemKey);
      if (item !== itemKey) items.push(item);
    }
    return items;
  };

  const getOrganizationName = (org?: OrganizationType): string => {
    if (!org) return 'No asignada';
    const orgNames: Record<OrganizationType, string> = {
      eldersQuorum: 'Quórum de Élderes',
      reliefSociety: 'Sociedad de Socorro',
      youngAdults: 'Jóvenes Adultos Solteros (JAS)',
      youngMen: 'Hombres Jóvenes',
      youngWomen: 'Mujeres Jóvenes',
      primary: 'Primaria'
    };
    return orgNames[org] || 'No asignada';
  };

  const getDetailedPlan = (convert: NewConvert) => {
    if (!convert.organization) return null;
    const plan = convertPlansByOrganization[convert.organization]?.[convert.timeframe];
    return plan;
  };

  const handleOpenNotes = (convertId: string) => {
    setNotesModalOpen(convertId);
    if (!noteContent[convertId]) {
      const existingNote = ConvertNotesService.loadNote(convertId);
      setNoteContent(prev => ({
        ...prev,
        [convertId]: existingNote?.content || ''
      }));
    }
  };

  const handleSaveNote = async (convertId: string) => {
    const content = noteContent[convertId] || '';
    await ConvertNotesService.saveNote(convertId, content);
    const updatedNote = ConvertNotesService.loadNote(convertId);
    if (updatedNote) {
      setNotes(prev => ({
        ...prev,
        [convertId]: updatedNote
      }));
    }
    setNotesModalOpen(null);
  };

  const stats = {
    total: mockNewConverts.length,
    withCalling: mockNewConverts.filter(c => c.hasCalling).length,
    preparing: mockNewConverts.filter(c => c.isPreparingForTemple).length
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('memberLeader.newConverts.title')}</h1>
        <p className="page-subtitle">{t('memberLeader.newConverts.subtitle')}</p>
      </div>
      <div className="page-content">
        <div className="leader-stats-card">
          <p>
            {t('memberLeader.newConverts.stats', stats)}
          </p>
        </div>

        {mockNewConverts.map(convert => {
          const detailedPlan = getDetailedPlan(convert);
          const hasNote = notes[convert.id] && notes[convert.id].content.trim().length > 0;

          return (
            <div key={convert.id} className="leader-convert-card">
              <div className="leader-convert-header">
                <div>
                  <h3>{convert.name}</h3>
                  <p className="leader-convert-time">
                    {t('memberLeader.newConverts.timeframeLabel', { months: convert.monthsSinceBaptism })}
                    {convert.organization && (
                      <span style={{ marginLeft: '8px', color: '#4F46E5', fontSize: '12px' }}>
                        • {getOrganizationName(convert.organization)}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="leader-convert-status-chips">
                {convert.statuses.map(status => (
                  <span key={status} className="leader-status-chip">
                    {getStatusLabel(status)}
                  </span>
                ))}
              </div>

              <div className="leader-convert-actions">
                <button
                  className="leader-button-small"
                  onClick={() => setSelectedConvert(
                    selectedConvert === convert.id ? null : convert.id
                  )}
                >
                  {t('memberLeader.newConverts.viewPlan')}
                </button>
                <button 
                  className={`leader-button-small secondary ${hasNote ? 'has-note' : ''}`}
                  onClick={() => handleOpenNotes(convert.id)}
                >
                  {hasNote ? '📝 ' : ''}{t('memberLeader.newConverts.quickNotes')}
                </button>
              </div>

              {selectedConvert === convert.id && (
                <div className="leader-plan-detail">
                  {detailedPlan ? (
                    <>
                      <h4>Plan detallado: {detailedPlan.organizationName} - {detailedPlan.timeframe} meses</h4>
                      
                      <div className="leader-plan-section">
                        <h5>Metas principales</h5>
                        <ul>
                          {detailedPlan.goals.map((goal, idx) => (
                            <li key={idx}>{goal}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="leader-plan-section">
                        <h5>Acciones sugeridas</h5>
                        <ul>
                          {detailedPlan.actions.map((action, idx) => (
                            <li key={idx}>{action}</li>
                          ))}
                        </ul>
                      </div>

                      {detailedPlan.callings.length > 0 && (
                        <div className="leader-plan-section">
                          <h5>Llamamientos sugeridos</h5>
                          <ul>
                            {detailedPlan.callings.map((calling, idx) => (
                              <li key={idx}>{calling}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="leader-plan-section">
                        <h5>Actividades recomendadas</h5>
                        <ul>
                          {detailedPlan.activities.map((activity, idx) => (
                            <li key={idx}>{activity}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="leader-plan-section">
                        <h5>Enfoque doctrinal</h5>
                        <ul>
                          {detailedPlan.doctrinalFocus.map((focus, idx) => (
                            <li key={idx}>{focus}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="leader-plan-section">
                        <h5>Escrituras clave</h5>
                        <div className="leader-scripture-chips">
                          {detailedPlan.scriptures.map((scripture, idx) => (
                            <span key={idx} className="leader-scripture-chip">{scripture}</span>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4>{t(`memberLeader.newConverts.plan.months${getTimeframeMonths(convert.timeframe)}.title`)}</h4>
                      <ul>
                        {getPlanItems(convert.timeframe).map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                      {!convert.organization && (
                        <p style={{ marginTop: '12px', color: '#F59E0B', fontSize: '13px' }}>
                          ⚠️ Asigna una organización para ver el plan detallado específico.
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Modal de notas */}
              {notesModalOpen === convert.id && (
                <div className="convert-notes-modal-overlay" onClick={() => setNotesModalOpen(null)}>
                  <div className="convert-notes-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="convert-notes-modal-header">
                      <h3>Notas para {convert.name}</h3>
                      <button 
                        className="convert-notes-close"
                        onClick={() => setNotesModalOpen(null)}
                      >
                        ×
                      </button>
                    </div>
                    <div className="convert-notes-modal-body">
                      <textarea
                        className="convert-notes-textarea"
                        value={noteContent[convert.id] || ''}
                        onChange={(e) => setNoteContent(prev => ({
                          ...prev,
                          [convert.id]: e.target.value
                        }))}
                        placeholder="Escribe notas sobre este nuevo converso. Recuerda: solo información útil para bendecir, no detalles confidenciales."
                        rows={10}
                      />
                      {notes[convert.id] && (
                        <p className="convert-notes-timestamp">
                          Última actualización: {new Date(notes[convert.id].updatedAt).toLocaleString('es-ES')}
                        </p>
                      )}
                    </div>
                    <div className="convert-notes-modal-footer">
                      <button
                        className="leader-button-small secondary"
                        onClick={() => setNotesModalOpen(null)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="leader-button-small"
                        onClick={() => handleSaveNote(convert.id)}
                      >
                        Guardar notas
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Guía extendida */}
        <div className="leader-template-card" style={{ marginTop: '20px' }}>
          <div className="leader-template-header">
            <div style={{ flex: 1 }}>
              <h3>{newConvertsExtended.title}</h3>
              <p>{newConvertsExtended.description}</p>
            </div>
            <Link
              to={location.pathname.includes('/member/') 
                ? '/member/leader/converts/extended' 
                : '/leader/converts/extended'}
              className="leader-button-small"
              style={{ 
                textDecoration: 'none', 
                display: 'inline-block',
                whiteSpace: 'nowrap',
                marginLeft: '12px'
              }}
            >
              Ver guía completa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
