import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLeadershipRoleEnhanced } from '../../../data/missionary/leadershipModeEnhanced';
import {
  BaptismalInterview,
  BaptismalInterviewService,
} from '../../../services/baptismalInterviewService';
import { InterviewActions } from '../../../components/missionary/leadership/InterviewActions';
import { SectionCard } from '../../../components/missionary/leadership/SectionCard';
import { TabSection } from '../../../data/missionary/leadershipModeEnhanced';
import '../../../pages/Page.css';
import './BaptismalInterviewScreen.css';

export const BaptismalInterviewScreen: React.FC = () => {
  const location = useLocation();
  const role = getLeadershipRoleEnhanced('districtLeader');
  const [interview, setInterview] = useState<BaptismalInterview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<BaptismalInterview[]>([]);
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null);

  useEffect(() => {
    loadInterview();
    loadHistory();
  }, []);

  useEffect(() => {
    if (selectedInterviewId) {
      loadInterviewById(selectedInterviewId);
    }
  }, [selectedInterviewId]);

  // Sincronizar datos de la entrevista con localStorage para los acordeones
  useEffect(() => {
    if (!interview || !interview.id) return;

    // Sincronizar datos de interview_planner
    const plannerData: Record<string, any> = {
      field_0: interview.personName || '',
      field_1: interview.teachingCompanionship || '',
      field_2: interview.teachingArea || '',
      field_3: interview.interviewLeaderName || '',
      field_4: interview.date || '',
      field_5: interview.time || '',
      field_6: interview.place || ''
    };
    localStorage.setItem('@leadership_districtLeader_baptismal_interviews_interview_planner', JSON.stringify(plannerData));

    // Sincronizar datos de pre_notes
    const preNotesData: Record<string, any> = {
      field_0: interview.notesBefore?.lessonsTaught || '',
      field_1: interview.notesBefore?.concerns || '',
      field_2: interview.notesBefore?.specialNeeds || ''
    };
    localStorage.setItem('@leadership_districtLeader_baptismal_interviews_pre_notes', JSON.stringify(preNotesData));

    // Sincronizar datos de spiritual_check
    const spiritualData: Record<string, any> = {
      item_0: interview.spiritualChecklist?.understandsGospel || false,
      item_1: interview.spiritualChecklist?.understandsCovenants || false,
      item_2: interview.spiritualChecklist?.willingToKeepCommandments || false,
      item_3: interview.spiritualChecklist?.testimonyOfChrist || false,
      item_4: interview.spiritualChecklist?.testimonyOfRestoration || false
    };
    localStorage.setItem('@leadership_districtLeader_baptismal_interviews_spiritual_check', JSON.stringify(spiritualData));

    // Sincronizar datos de pastoral_notes
    const pastoralData: Record<string, any> = {
      prompt_0: interview.pastoralNotes?.testimonyImpression || '',
      prompt_1: interview.pastoralNotes?.recommendedFocusBeforeBaptism || '',
      prompt_2: interview.pastoralNotes?.recommendedFocusAfterBaptism || '',
      prompt_3: interview.pastoralNotes?.risksIfNotSupported || ''
    };
    localStorage.setItem('@leadership_districtLeader_baptismal_interviews_pastoral_notes', JSON.stringify(pastoralData));
  }, [interview?.id, interview?.personName, interview?.date]);

  const loadInterview = () => {
    // Si hay una entrevista seleccionada del historial, no cargar borrador
    if (selectedInterviewId) {
      return;
    }

    const drafts = BaptismalInterviewService.getDrafts('current_user');
    const latestDraft = drafts.length > 0 ? drafts[0] : null;

    if (latestDraft) {
      setInterview(latestDraft);
      setIsLoading(false);
    } else {
      createNewInterview();
    }
  };

  const createNewInterview = () => {
    const newInterview: BaptismalInterview = {
      id: '',
      interviewLeaderId: 'current_user',
      interviewLeaderName: 'Líder de Distrito',
      interviewLeaderRole: 'district_leader',
      createdById: 'current_user',
      createdByRole: 'district_leader',
      districtId: 'current_district',
      zoneId: 'current_zone',
      personName: '',
      teachingCompanionship: '',
      teachingArea: '',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      place: 'Capilla del barrio',
      status: 'draft',
      notesBefore: {
        lessonsTaught: '',
        concerns: '',
        specialNeeds: ''
      },
      spiritualChecklist: {
        understandsGospel: false,
        understandsCovenants: false,
        willingToKeepCommandments: false,
        testimonyOfChrist: false,
        testimonyOfRestoration: false
      },
      pastoralNotes: {
        testimonyImpression: '',
        recommendedFocusBeforeBaptism: '',
        recommendedFocusAfterBaptism: '',
        risksIfNotSupported: ''
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setInterview(newInterview);
    setIsLoading(false);
  };

  const loadInterviewById = (interviewId: string) => {
    const loaded = BaptismalInterviewService.getInterviewById(interviewId);
    if (loaded) {
      setInterview(loaded);
      setIsLoading(false);
    }
  };

  const loadHistory = () => {
    // Cargar TODAS las entrevistas del distrito (no solo completadas)
    const allInterviews = BaptismalInterviewService.getInterviewsByDistrict('current_district');
    // Ordenar por fecha descendente (más recientes primero)
    const sorted = allInterviews.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
      const dateB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
      return dateB - dateA;
    });
    setHistory(sorted);
  };

  const handleNewInterview = () => {
    setSelectedInterviewId(null);
    createNewInterview();
    loadHistory();
  };

  const handleDataChange = (sectionId: string, data: Record<string, any>) => {
    if (!interview) return;

    const updated = { ...interview };
    
    if (sectionId === 'interview_planner') {
      updated.personName = data.field_0 || '';
      updated.teachingCompanionship = data.field_1 || '';
      updated.teachingArea = data.field_2 || '';
      updated.interviewLeaderName = data.field_3 || interview.interviewLeaderName;
      updated.date = data.field_4 || interview.date;
      updated.time = data.field_5 || interview.time;
      updated.place = data.field_6 || interview.place;
    } else if (sectionId === 'pre_notes') {
      updated.notesBefore = {
        lessonsTaught: data.field_0 || '',
        concerns: data.field_1 || '',
        specialNeeds: data.field_2 || ''
      };
    } else if (sectionId === 'spiritual_check') {
      updated.spiritualChecklist = {
        understandsGospel: data.item_0 || false,
        understandsCovenants: data.item_1 || false,
        willingToKeepCommandments: data.item_2 || false,
        testimonyOfChrist: data.item_3 || false,
        testimonyOfRestoration: data.item_4 || false
      };
    } else if (sectionId === 'pastoral_notes') {
      updated.pastoralNotes = {
        testimonyImpression: data.prompt_0 || '',
        recommendedFocusBeforeBaptism: data.prompt_1 || '',
        recommendedFocusAfterBaptism: data.prompt_2 || '',
        risksIfNotSupported: data.prompt_3 || ''
      };
    }

    updated.updatedAt = new Date().toISOString();
    setInterview(updated);
    
    // Auto-guardar
    if (updated.id) {
      BaptismalInterviewService.saveInterview(updated);
    }
  };

  const handleSave = () => {
    if (!interview) return;
    
    const saved = BaptismalInterviewService.saveInterview({
      ...interview,
      status: 'draft'
    });
    setInterview(saved);
    alert('Entrevista guardada como borrador');
  };

  const handlePublish = () => {
    if (!interview) return;
    
    // Validación completa según especificación
    if (!interview.personName || !interview.date || !interview.time || !interview.place || !interview.teachingCompanionship) {
      alert('Por favor completa: Nombre de la persona, Fecha, Hora, Lugar y Compañerismo que enseña');
      return;
    }
    
    // Guardar primero como draft si no tiene ID
    const saved = interview.id 
      ? interview 
      : BaptismalInterviewService.saveInterview({
          ...interview,
          status: 'draft'
        });
    
    // Programar (scheduled) y crear leadershipEvent
    const published = BaptismalInterviewService.publishInterview(saved.id);
    if (published) {
      setInterview(published);
      loadHistory(); // Recargar historial para mostrar la nueva entrevista programada
      alert('Entrevista programada y publicada al compañerismo');
    }
  };

  const handleComplete = () => {
    if (!interview || !interview.id) return;
    
    if (interview.status !== 'scheduled') {
      alert('Solo se pueden completar entrevistas que estén programadas');
      return;
    }
    
    const completed = BaptismalInterviewService.completeInterview(interview.id);
    if (completed) {
      setInterview(completed);
      loadHistory();
      alert('Entrevista marcada como completada');
    }
  };

  if (isLoading || !interview || !role) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Cargando...</h1>
        </div>
      </div>
    );
  }

  const tabConfig = role.tabs.find(t => t.id === 'baptismal_interviews');
  if (!tabConfig) return null;

  const roleColor = role.color || '#3B82F6';

  return (
    <div className="page">
      <div className="page-header">
        <h1>{tabConfig.title}</h1>
        <p className="page-subtitle">{tabConfig.subtitle}</p>
      </div>

      <div className="page-content">

        {/* Acciones */}
        <InterviewActions
          interview={interview}
          roleColor={roleColor}
          onSave={handleSave}
          onPublish={handlePublish}
          onComplete={handleComplete}
        />

        {/* Botón para nueva entrevista */}
        <div className="interview-header-actions">
          <button
            className="new-interview-button"
            onClick={handleNewInterview}
            style={{ backgroundColor: roleColor }}
          >
            + Nueva entrevista
          </button>
        </div>

        {/* Secciones */}
        {tabConfig.sections.map((section: TabSection) => {
          if (section.id === 'interview_history') {
            return (
              <div key={section.id} className="interview-history-section">
                <div className="history-section-header">
                  <h2>{section.title}</h2>
                  <span className="history-count">{history.length} entrevista{history.length !== 1 ? 's' : ''}</span>
                </div>
                {history.length === 0 ? (
                  <p className="empty-history">Aún no hay entrevistas registradas. Crea una nueva entrevista arriba.</p>
                ) : (
                  <div className="history-list">
                    {history.map((h) => {
                      const statusLabels = {
                        draft: '📝 Borrador',
                        scheduled: '📅 Programada',
                        completed: '✅ Completada',
                        cancelled: '❌ Cancelada'
                      };
                      
                      return (
                        <div
                          key={h.id}
                          className={`history-item ${selectedInterviewId === h.id ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedInterviewId(h.id);
                            loadInterviewById(h.id);
                          }}
                        >
                          <div className="history-header">
                            <div className="history-main-info">
                              <strong>{h.personName || 'Sin nombre'}</strong>
                              <span className="history-date">{h.date} {h.time && `– ${h.time}`}</span>
                            </div>
                            <span className={`history-status status-${h.status}`}>
                              {statusLabels[h.status] || h.status}
                            </span>
                          </div>
                          <div className="history-details">
                            <div className="history-detail-row">
                              <span><strong>Área:</strong> {h.teachingArea || '—'}</span>
                              <span><strong>Compañerismo:</strong> {h.teachingCompanionship || '—'}</span>
                            </div>
                            <div className="history-detail-row">
                              <span><strong>Entrevistador:</strong> {h.interviewLeaderName || '—'}</span>
                              {h.place && <span><strong>Lugar:</strong> {h.place}</span>}
                            </div>
                            {h.pastoralNotes?.testimonyImpression && (
                              <p className="history-comment">
                                <em>{h.pastoralNotes.testimonyImpression.substring(0, 100)}{h.pastoralNotes.testimonyImpression.length > 100 ? '...' : ''}</em>
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <SectionCard
              key={section.id}
              section={section}
              roleColor={roleColor}
              tabId="baptismal_interviews"
              roleId="districtLeader"
              defaultExpanded={section.id === 'interview_planner'}
              onDataChange={handleDataChange}
            />
          );
        })}
      </div>
    </div>
  );
};

