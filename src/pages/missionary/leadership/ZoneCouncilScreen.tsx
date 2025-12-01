import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLeadershipRoleEnhanced } from '../../../data/missionary/leadershipModeEnhanced';
import {
  ZoneCouncil,
  ZoneCouncilService,
  ZoneCouncilStatus,
} from '../../../services/zoneCouncilService';
import { CouncilActions } from '../../../components/missionary/leadership/CouncilActions';
import { SectionCard } from '../../../components/missionary/leadership/SectionCard';
import '../../../pages/Page.css';
import './DistrictCouncilScreen.css'; // Reutilizar estilos

export const ZoneCouncilScreen: React.FC = () => {
  const location = useLocation();
  const role = getLeadershipRoleEnhanced('zoneLeader');
  const [council, setCouncil] = useState<ZoneCouncil | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<ZoneCouncil[]>([]);
  const [selectedCouncilId, setSelectedCouncilId] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const allCouncils = ZoneCouncilService.getCouncilsByZone('current_zone');
    setHistory(allCouncils);
  };

  const loadCouncilById = (councilId: string) => {
    const loaded = ZoneCouncilService.getCouncilById(councilId);
    if (loaded) {
      setCouncil(loaded);
      setIsLoading(false);
      syncCouncilToLocalStorage(loaded);
    }
  };

  const loadCouncil = () => {
    if (selectedCouncilId) {
      return;
    }

    const drafts = ZoneCouncilService.getDrafts();
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
      const newCouncil: ZoneCouncil = {
        id: '',
        leaderId: 'current_user',
        leaderName: 'Líder de Zona',
        title: `Reunión de Zona – ${new Date().toLocaleDateString('es-ES')}`,
        date: new Date().toISOString().split('T')[0],
        time: '18:00',
        location: 'Capilla central',
        status: 'draft',
        missionId: 'current_mission',
        zoneId: 'current_zone',
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
        progressByDistrict: '',
        experiences: '',
        training: {
          tema: '',
          escritura: '',
          principio: '',
          habilidad: '',
          compromiso: '',
        },
        goals: {
          metasZona: '',
          accionesPorDistrito: '',
          seguimiento: '',
        },
        closing: {
          personas: '',
          misioneros: '',
          unidad: '',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const saved = ZoneCouncilService.saveCouncil(newCouncil);
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

  const syncCouncilToLocalStorage = (council: ZoneCouncil) => {
    const spiritualData: Record<string, any> = {
      field_0: council.spiritualStart?.scripture || '',
      field_1: council.spiritualStart?.ideaCentral || '',
      field_2: council.spiritualStart?.application || ''
    };
    localStorage.setItem('@leadership_zoneLeader_zone_council_spiritual_start', JSON.stringify(spiritualData));

    const progressData: Record<string, any> = {
      field_0: council.progressByDistrict || ''
    };
    localStorage.setItem('@leadership_zoneLeader_zone_council_progress_by_district', JSON.stringify(progressData));

    const experiencesData: Record<string, any> = {
      prompt_0: council.experiences || ''
    };
    localStorage.setItem('@leadership_zoneLeader_zone_council_experiences', JSON.stringify(experiencesData));

    const trainingData: Record<string, any> = {
      field_0: council.training?.tema || '',
      field_1: council.training?.escritura || '',
      field_2: council.training?.principio || '',
      field_3: council.training?.habilidad || '',
      field_4: council.training?.compromiso || ''
    };
    localStorage.setItem('@leadership_zoneLeader_zone_council_training', JSON.stringify(trainingData));

    const goalsData: Record<string, any> = {
      field_0: council.goals?.metasZona || '',
      field_1: council.goals?.accionesPorDistrito || '',
      field_2: council.goals?.seguimiento || ''
    };
    localStorage.setItem('@leadership_zoneLeader_zone_council_goals', JSON.stringify(goalsData));

    const closingData: Record<string, any> = {
      field_0: council.closing?.personas || '',
      field_1: council.closing?.misioneros || '',
      field_2: council.closing?.unidad || ''
    };
    localStorage.setItem('@leadership_zoneLeader_zone_council_closing_prayer', JSON.stringify(closingData));
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

    switch (sectionId) {
      case 'spiritual_start':
        updated.spiritualStart = {
          scripture: data.field_0 || '',
          ideaCentral: data.field_1 || '',
          application: data.field_2 || '',
        };
        updated.summary.spiritualFocus = data.field_1 || '';
        break;

      case 'progress_by_district':
        updated.progressByDistrict = data.field_0 || '';
        break;

      case 'experiences':
        updated.experiences = data.prompt_0 || '';
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

      case 'goals':
        updated.goals = {
          metasZona: data.field_0 || '',
          accionesPorDistrito: data.field_1 || '',
          seguimiento: data.field_2 || '',
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
    ZoneCouncilService.saveCouncil(updated);
  };

  const handleSave = (updated: ZoneCouncil) => {
    setCouncil(updated);
  };

  const handlePublish = (published: ZoneCouncil) => {
    setCouncil(published);
    loadHistory();
  };

  const handleComplete = (completed: ZoneCouncil) => {
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

  const tab = role.tabs.find(t => t.id === 'zone_council');
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
        <div style={{ flex: 1 }}>
          <h1>{tab.title}</h1>
          {tab.subtitle && <p className="page-subtitle">{tab.subtitle}</p>}
          {tab.purpose && (
            <p className="page-purpose" style={{ color: role.color }}>
              {tab.purpose}
            </p>
          )}
        </div>
      </div>
      <div className="page-content">
        <div className="council-header-actions">
          <button
            className="new-council-button"
            onClick={handleNewCouncil}
            style={{ backgroundColor: role.color }}
          >
            + Nueva reunión
          </button>
        </div>

        <CouncilActions
          council={council as any}
          onSave={handleSave as any}
          onPublish={handlePublish as any}
          onComplete={handleComplete as any}
          roleColor={role.color}
        />

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
                ZoneCouncilService.saveCouncil(updated);
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
                ZoneCouncilService.saveCouncil(updated);
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
                ZoneCouncilService.saveCouncil(updated);
              }}
              placeholder="Capilla central"
              style={{ borderLeftColor: role.color }}
            />
          </div>
        </div>

        {tab.sections
          .filter(
            section => 
              section.id !== 'council_info' && 
              section.id !== 'council_agenda'
          )
          .map((section, idx) => (
            <SectionCard
              key={section.id}
              section={section}
              roleColor={role.color}
              tabId="zone_council"
              roleId="zoneLeader"
              defaultExpanded={idx === 0}
              onDataChange={handleSectionDataChange}
            />
          ))}

        <div className="council-history-section">
          <div className="history-section-header">
            <h2>Historial de reuniones</h2>
            <span className="history-count">{history.length} reunión{history.length !== 1 ? 'es' : ''}</span>
          </div>
          {history.length === 0 ? (
            <p className="empty-history">Aún no hay reuniones registradas.</p>
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

