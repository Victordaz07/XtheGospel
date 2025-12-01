import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLeadershipRoleEnhanced } from '../../../data/missionary/leadershipModeEnhanced';
import {
  DistrictCouncil,
  DistrictCouncilService,
  CouncilStatus,
} from '../../../services/districtCouncilService';
import { CouncilActions } from '../../../components/missionary/leadership/CouncilActions';
import { CouncilHelpModal } from '../../../components/missionary/leadership/CouncilHelpModal';
import { SectionCard } from '../../../components/missionary/leadership/SectionCard';
import { TabSectionRenderer } from '../../../components/missionary/leadership/TabSectionRenderer';
import { TabSection } from '../../../data/missionary/leadershipModeEnhanced';
import '../../../pages/Page.css';
import './DistrictCouncilScreen.css';

export const DistrictCouncilScreen: React.FC = () => {
  const location = useLocation();
  const role = getLeadershipRoleEnhanced('districtLeader');
  const [council, setCouncil] = useState<DistrictCouncil | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<DistrictCouncil[]>([]);
  const [selectedCouncilId, setSelectedCouncilId] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    // Cargar TODAS las reuniones del distrito (no solo completadas)
    const allCouncils = DistrictCouncilService.getCouncilsByDistrict('current_district');
    setHistory(allCouncils);
  };

  const loadCouncilById = (councilId: string) => {
    const loaded = DistrictCouncilService.getCouncilById(councilId);
    if (loaded) {
      setCouncil(loaded);
      setIsLoading(false);
      // Sincronizar datos con localStorage
      syncCouncilToLocalStorage(loaded);
    }
  };

  const loadCouncil = () => {
    // Si hay una reunión seleccionada del historial, no cargar borrador
    if (selectedCouncilId) {
      return;
    }

    // Buscar borrador más reciente o crear uno nuevo
    const drafts = DistrictCouncilService.getDrafts();
    const latestDraft =
      drafts.length > 0
        ? drafts.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() -
              new Date(a.updatedAt).getTime(),
          )[0]
        : null;

    if (latestDraft) {
      setCouncil(latestDraft);
      setIsLoading(false);
    } else {
      // Crear nuevo borrador
      const newCouncil: DistrictCouncil = {
        id: '',
        leaderId: 'current_user', // TODO: obtener del contexto de auth
        leaderName: 'Líder de Distrito', // TODO: obtener del contexto de auth
        title: `Reunión de Distrito – ${new Date().toLocaleDateString(
          'es-ES',
        )}`,
        date: new Date().toISOString().split('T')[0],
        time: '18:00',
        location: 'Capilla del barrio',
        status: 'draft',
        districtId: 'current_district', // TODO: obtener del contexto
        summary: {
          spiritualFocus: '',
          trainingTopic: '',
          mainGoal: '',
        },
        spiritualStart: {
          scripture: '',
          ideaCentral: '',
          application: '',
        },
        progress: {
          personasConFecha: '',
          personasEnRiesgo: '',
          investigadoresNuevos: '',
          investigadoresEnIglesia: '',
          comentarios: '',
        },
        experiences: '',
        training: {
          tema: '',
          escritura: '',
          principio: '',
          habilidad: '',
          compromiso: '',
        },
        roleplays: {
          escenario: '',
          objetivo: '',
          puntosFuertes: '',
          aspectosMejorar: '',
          compromiso: '',
        },
        goals: {
          personas: '',
          compromisos: '',
          fechas: '',
          acciones: '',
          seguimiento: '',
          resumen: '',
        },
        closing: {
          personas: '',
          misioneros: '',
          unidad: '',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const saved = DistrictCouncilService.saveCouncil(newCouncil);
      setCouncil(saved);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCouncilId) {
      loadCouncilById(selectedCouncilId);
    } else {
      loadCouncil();
    }
  }, [selectedCouncilId]);

  const handleNewCouncil = () => {
    setSelectedCouncilId(null);
    loadCouncil();
    loadHistory();
  };

  // Sincronizar datos de la reunión con localStorage para los acordeones
  const syncCouncilToLocalStorage = (council: DistrictCouncil) => {
    // Sincronizar spiritual_start
    const spiritualData: Record<string, any> = {
      field_0: council.spiritualStart?.scripture || '',
      field_1: council.spiritualStart?.ideaCentral || '',
      field_2: council.spiritualStart?.application || ''
    };
    localStorage.setItem('@leadership_districtLeader_district_council_spiritual_start', JSON.stringify(spiritualData));

    // Sincronizar live_reports
    const progressData: Record<string, any> = {
      field_0: council.progress?.personasConFecha || '',
      field_1: council.progress?.personasEnRiesgo || '',
      field_2: council.progress?.investigadoresNuevos || '',
      field_3: council.progress?.investigadoresEnIglesia || '',
      field_4: '', // "Investigadores que progresaron esta semana" - no se guarda en el modelo actual
      field_5: council.progress?.comentarios || ''
    };
    localStorage.setItem('@leadership_districtLeader_district_council_live_reports', JSON.stringify(progressData));

    // Sincronizar experiences (journal con 3 prompts)
    const experiencesData: Record<string, any> = {
      prompt_0: council.experiences || '', // Combinamos todos los prompts en experiences
      prompt_1: '',
      prompt_2: ''
    };
    localStorage.setItem('@leadership_districtLeader_district_council_experiences', JSON.stringify(experiencesData));

    // Sincronizar training
    const trainingData: Record<string, any> = {
      field_0: council.training?.tema || '',
      field_1: council.training?.escritura || '',
      field_2: council.training?.principio || '',
      field_3: council.training?.habilidad || '',
      field_4: council.training?.compromiso || ''
    };
    localStorage.setItem('@leadership_districtLeader_district_council_training', JSON.stringify(trainingData));

    // Sincronizar roleplays
    const roleplaysData: Record<string, any> = {
      field_0: council.roleplays?.escenario || '',
      field_1: council.roleplays?.objetivo || '',
      field_2: council.roleplays?.puntosFuertes || '',
      field_3: council.roleplays?.aspectosMejorar || '',
      field_4: council.roleplays?.compromiso || ''
    };
    localStorage.setItem('@leadership_districtLeader_district_council_roleplays', JSON.stringify(roleplaysData));

    // Sincronizar goals
    const goalsData: Record<string, any> = {
      field_0: council.goals?.personas || '',
      field_1: council.goals?.compromisos || '',
      field_2: council.goals?.fechas || '',
      field_3: council.goals?.acciones || '',
      field_4: council.goals?.seguimiento || ''
    };
    localStorage.setItem('@leadership_districtLeader_district_council_goals', JSON.stringify(goalsData));

    // Sincronizar closing_prayer
    const closingData: Record<string, any> = {
      field_0: council.closing?.personas || '',
      field_1: council.closing?.misioneros || '',
      field_2: council.closing?.unidad || ''
    };
    localStorage.setItem('@leadership_districtLeader_district_council_closing_prayer', JSON.stringify(closingData));
  };

  useEffect(() => {
    if (council && council.id) {
      syncCouncilToLocalStorage(council);
    }
  }, [council?.id]);

  const handleSectionDataChange = (
    sectionId: string,
    data: Record<string, any>,
  ) => {
    if (!council) return;

    const updated = { ...council };

    // Mapear datos de secciones al formato del council
    switch (sectionId) {
      case 'spiritual_start':
        updated.spiritualStart = {
          scripture: data.field_0 || '',
          ideaCentral: data.field_1 || '',
          application: data.field_2 || '',
        };
        updated.summary.spiritualFocus = data.field_1 || '';
        break;

      case 'live_reports':
        updated.progress = {
          personasConFecha: data.field_0 || '',
          personasEnRiesgo: data.field_1 || '',
          investigadoresNuevos: data.field_2 || '',
          investigadoresEnIglesia: data.field_3 || '',
          comentarios: data.field_5 || '', // field_4 es "Investigadores que progresaron esta semana" - no se guarda en el modelo actual
        };
        break;

      case 'experiences':
        // Combinar los 3 prompts en un solo texto
        const expParts = [];
        if (data.prompt_0) expParts.push(data.prompt_0);
        if (data.prompt_1) expParts.push(data.prompt_1);
        if (data.prompt_2) expParts.push(data.prompt_2);
        updated.experiences = expParts.join('\n\n');
        break;

      case 'training':
        updated.training = {
          tema: data.field_0 || '',
          escritura: data.field_1 || '',
          principio: data.field_2 || '',
          habilidad: data.field_3 || '',
          compromiso: data.field_4 || '',
        };
        updated.summary.trainingTopic = data.field_0 || '';
        break;

      case 'roleplays':
        updated.roleplays = {
          escenario: data.field_0 || '',
          objetivo: data.field_1 || '',
          puntosFuertes: data.field_2 || '',
          aspectosMejorar: data.field_3 || '',
          compromiso: data.field_4 || '',
        };
        break;

      case 'goals':
        updated.goals = {
          personas: data.field_0 || '',
          compromisos: data.field_1 || '',
          fechas: data.field_2 || '',
          acciones: data.field_3 || '',
          seguimiento: data.field_4 || '',
          resumen: data.field_0 || '', // Resumen de metas
        };
        updated.summary.mainGoal = data.field_0 || '';
        break;

      case 'closing_prayer':
        updated.closing = {
          personas: data.field_0 || '',
          misioneros: data.field_1 || '',
          unidad: data.field_2 || '',
        };
        break;
    }

    updated.updatedAt = new Date().toISOString();
    setCouncil(updated);

    // Auto-guardar
    DistrictCouncilService.saveCouncil(updated);
  };

  const handleSave = (updated: DistrictCouncil) => {
    setCouncil(updated);
  };

  const handlePublish = (published: DistrictCouncil) => {
    setCouncil(published);
    loadHistory(); // Recargar historial para mostrar la nueva reunión publicada
  };

  const handleComplete = (completed: DistrictCouncil) => {
    setCouncil(completed);
    loadHistory();
    alert('Reunión marcada como completada');
  };

  if (!role) return null;

  if (isLoading) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Cargando...</h1>
        </div>
      </div>
    );
  }

  if (!council) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Error</h1>
        </div>
      </div>
    );
  }

  // Secciones del tab district_council
  const tab = role.tabs.find(t => t.id === 'district_council');
  if (!tab) return null;

  return (
    <div className="page">
      <div className="page-header" style={{ borderLeftColor: role.color }}>
        <div
          className="leadership-header-badge"
          style={{ backgroundColor: `${role.color}15`, color: role.color }}
        >
          🛡️
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
          <div>
            <h1>{tab.title}</h1>
            {tab.subtitle && <p className="page-subtitle">{tab.subtitle}</p>}
            {tab.purpose && (
              <p className="page-purpose" style={{ color: role.color }}>
                {tab.purpose}
              </p>
            )}
          </div>
          <CouncilHelpModal roleColor={role.color} />
        </div>
      </div>
      <div className="page-content">
        {/* Botón para nueva reunión */}
        <div className="council-header-actions">
          <button
            className="new-council-button"
            onClick={handleNewCouncil}
            style={{ backgroundColor: role.color }}
          >
            + Nueva reunión
          </button>
        </div>

        {/* Botones de acción */}
        <CouncilActions
          council={council}
          onSave={handleSave}
          onPublish={handlePublish}
          onComplete={handleComplete}
          roleColor={role.color}
        />

        {/* Información básica de la reunión */}
        <div className="council-basic-info">
          <div className="council-info-field">
            <label>Fecha</label>
            <input
              type="date"
              value={council.date}
              onChange={e => {
                const value = (e.target as HTMLInputElement).value;
                const updated = {
                  ...council,
                  date: value,
                  updatedAt: new Date().toISOString(),
                };
                setCouncil(updated);
                DistrictCouncilService.saveCouncil(updated);
              }}
              style={{ borderLeftColor: role.color }}
            />
          </div>
          <div className="council-info-field">
            <label>Hora</label>
            <input
              type="time"
              value={council.time}
              onChange={e => {
                const value = (e.target as HTMLInputElement).value;
                const updated = {
                  ...council,
                  time: value,
                  updatedAt: new Date().toISOString(),
                };
                setCouncil(updated);
                DistrictCouncilService.saveCouncil(updated);
              }}
              style={{ borderLeftColor: role.color }}
            />
          </div>
          <div className="council-info-field">
            <label>Lugar</label>
            <input
              type="text"
              value={council.location}
              onChange={e => {
                const value = (e.target as HTMLInputElement).value;
                const updated = {
                  ...council,
                  location: value,
                  updatedAt: new Date().toISOString(),
                };
                setCouncil(updated);
                DistrictCouncilService.saveCouncil(updated);
              }}
              placeholder="Capilla del barrio"
              style={{ borderLeftColor: role.color }}
            />
          </div>
        </div>

        {/* Secciones editables */}
        {tab.sections
          .filter(
            section => 
              section.id !== 'purpose_info' && 
              section.id !== 'agenda' &&
              section.id !== 'council_history'
          )
          .map((section, idx) => (
            <SectionCard
              key={section.id}
              section={section}
              roleColor={role.color}
              tabId="district_council"
              roleId="districtLeader"
              defaultExpanded={idx === 0}
              onDataChange={handleSectionDataChange}
            />
          ))}

        {/* Historial de reuniones */}
        <div className="council-history-section">
          <div className="history-section-header">
            <h2>Historial de reuniones</h2>
            <span className="history-count">{history.length} reunión{history.length !== 1 ? 'es' : ''}</span>
          </div>
          {history.length === 0 ? (
            <p className="empty-history">Aún no hay reuniones registradas. Crea una nueva reunión arriba.</p>
          ) : (
            <div className="history-list">
              {history.map((h) => {
                const statusLabels = {
                  draft: '📝 Borrador',
                  published: '📅 Publicada',
                  completed: '✅ Completada'
                };
                
                return (
                  <div
                    key={h.id}
                    className={`history-item ${selectedCouncilId === h.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedCouncilId(h.id);
                      loadCouncilById(h.id);
                    }}
                  >
                    <div className="history-header">
                      <div className="history-main-info">
                        <strong>{h.title || `Reunión – ${h.date}`}</strong>
                        <span className="history-date">{h.date} {h.time && `– ${h.time}`}</span>
                      </div>
                      <span className={`history-status status-${h.status}`}>
                        {statusLabels[h.status] || h.status}
                      </span>
                    </div>
                    <div className="history-details">
                      <div className="history-detail-row">
                        <span><strong>Lugar:</strong> {h.location || '—'}</span>
                        {h.summary?.mainGoal && (
                          <span className="history-goal">{h.summary.mainGoal.substring(0, 80)}{h.summary.mainGoal.length > 80 ? '...' : ''}</span>
                        )}
                      </div>
                      {h.summary?.spiritualFocus && (
                        <p className="history-comment">
                          <em>Enfoque: {h.summary.spiritualFocus}</em>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
