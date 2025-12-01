import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLeadershipRoleEnhanced, LeadershipRole } from '../../../data/missionary/leadershipModeEnhanced';
import { LeadershipRoleService } from '../../../services/leadershipRoleService';
import {
  Exchange,
  ExchangeService,
} from '../../../services/exchangeService';
import { ExchangeActions } from '../../../components/missionary/leadership/ExchangeActions';
import { SectionCard } from '../../../components/missionary/leadership/SectionCard';
import { TabSection } from '../../../data/missionary/leadershipModeEnhanced';
import '../../../pages/Page.css';
import './ExchangeScreen.css';

export const ExchangeScreen: React.FC = () => {
  const location = useLocation();
  const [currentRoleId, setCurrentRoleId] = useState<LeadershipRole>('districtLeader');
  const [role, setRole] = useState(getLeadershipRoleEnhanced('districtLeader'));
  
  useEffect(() => {
    const roleFromService = LeadershipRoleService.getCurrentRole();
    setCurrentRoleId(roleFromService);
    setRole(getLeadershipRoleEnhanced(roleFromService));
  }, [location.pathname]);
  const [exchange, setExchange] = useState<Exchange | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<Exchange[]>([]);
  const [selectedExchangeId, setSelectedExchangeId] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, [currentRoleId]);

  useEffect(() => {
    if (selectedExchangeId) {
      loadExchangeById(selectedExchangeId);
    } else {
      loadExchange();
    }
  }, [selectedExchangeId, currentRoleId]);

  const loadHistory = () => {
    // Cargar TODOS los intercambios del líder (no solo completados)
    const allExchanges = ExchangeService.getExchangesByLeader('current_user');
    setHistory(allExchanges);
  };

  const loadExchangeById = (exchangeId: string) => {
    const loaded = ExchangeService.getExchangeById(exchangeId);
    if (loaded) {
      setExchange(loaded);
      setIsLoading(false);
      syncExchangeToLocalStorage(loaded);
    }
  };

  const loadExchange = () => {
    // Si hay un intercambio seleccionado del historial, no cargar borrador
    if (selectedExchangeId) {
      return;
    }

    const drafts = ExchangeService.getDrafts('current_user');
    const latestDraft = drafts.length > 0 ? drafts[0] : null;

    if (latestDraft) {
      setExchange(latestDraft);
      setIsLoading(false);
    } else {
      const getLeaderName = () => {
        if (currentRoleId === 'districtLeader') return 'Líder de Distrito';
        if (currentRoleId === 'zoneLeader') return 'Líder de Zona';
        if (currentRoleId === 'assistantToPresident') return 'Asistente del Presidente';
        return 'Líder';
      };
      
      const getLeaderRole = () => {
        if (currentRoleId === 'districtLeader') return 'district_leader';
        if (currentRoleId === 'zoneLeader') return 'zone_leader';
        if (currentRoleId === 'assistantToPresident') return 'assistant_to_president';
        return 'district_leader';
      };
      
      const newExchange: Exchange = {
        id: '',
        leaderId: 'current_user',
        leaderName: getLeaderName(),
        leaderRole: getLeaderRole(),
        companionshipName: '',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        area: '',
        focus: '',
        scripture: '',
        status: 'draft',
        goals: {
          metasDia: '',
          personasVisitar: '',
          habitoModelar: '',
          indicadorExito: ''
        },
        summary: {
          donesVistos: '',
          necesitaAyuda: '',
          compromisoEspiritual: '',
          impresionEspiritu: ''
        },
        followUp: {
          compartiLoBueno: false,
          hableMejorar: false,
          fijamosMetas: false,
          reporteEnviado: false,
          futuraRevisionPlaneada: false
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setExchange(newExchange);
      setIsLoading(false);
    }
  };

  const handleNewExchange = () => {
    setSelectedExchangeId(null);
    loadExchange();
    loadHistory();
  };

  // Sincronizar datos del intercambio con localStorage para los acordeones
  const syncExchangeToLocalStorage = (exchange: Exchange) => {
    // Sincronizar exchange_planner
    const plannerData: Record<string, any> = {
      field_0: exchange.companionshipName || '',
      field_1: exchange.missionaryName || '',
      field_2: exchange.date || '',
      field_3: exchange.time || '',
      field_4: exchange.area || '',
      field_5: exchange.focus || '',
      field_6: exchange.scripture || ''
    };
    localStorage.setItem('@leadership_districtLeader_exchanges_exchange_planner', JSON.stringify(plannerData));

    // Sincronizar exchange_goals
    const goalsData: Record<string, any> = {
      field_0: exchange.goals?.metasDia || '',
      field_1: exchange.goals?.personasVisitar || '',
      field_2: exchange.goals?.habitoModelar || '',
      field_3: exchange.goals?.indicadorExito || ''
    };
    localStorage.setItem('@leadership_districtLeader_exchanges_exchange_goals', JSON.stringify(goalsData));

    // Sincronizar exchange_review
    const reviewData: Record<string, any> = {
      prompt_0: exchange.summary?.donesVistos || '',
      prompt_1: exchange.summary?.necesitaAyuda || '',
      prompt_2: exchange.summary?.compromisoEspiritual || '',
      prompt_3: exchange.summary?.impresionEspiritu || ''
    };
    localStorage.setItem('@leadership_districtLeader_exchanges_exchange_review', JSON.stringify(reviewData));

    // Sincronizar exchange_followup
    const followUpData: Record<string, any> = {
      item_0: exchange.followUp?.compartiLoBueno || false,
      item_1: exchange.followUp?.hableMejorar || false,
      item_2: exchange.followUp?.fijamosMetas || false,
      item_3: exchange.followUp?.reporteEnviado || false,
      item_4: exchange.followUp?.futuraRevisionPlaneada || false
    };
    localStorage.setItem('@leadership_districtLeader_exchanges_exchange_followup', JSON.stringify(followUpData));
  };

  useEffect(() => {
    if (exchange && exchange.id) {
      syncExchangeToLocalStorage(exchange);
    }
  }, [exchange?.id]);

  const handleDataChange = (sectionId: string, data: Record<string, any>) => {
    if (!exchange) return;

    const updated = { ...exchange };
    
    if (sectionId === 'exchange_planner') {
      updated.companionshipName = data.field_0 || '';
      updated.missionaryName = data.field_1 || '';
      // field_2: Fecha (se maneja en input separado, pero también puede venir del form)
      // field_3: Hora (se maneja en input separado, pero también puede venir del form)
      updated.area = data.field_4 || '';
      updated.focus = data.field_5 || '';
      updated.scripture = data.field_6 || '';
    } else if (sectionId === 'exchange_goals') {
      updated.goals = {
        metasDia: data.field_0 || '',
        personasVisitar: data.field_1 || '',
        habitoModelar: data.field_2 || '',
        indicadorExito: data.field_3 || ''
      };
    } else if (sectionId === 'exchange_review') {
      updated.summary = {
        donesVistos: data.prompt_0 || '',
        necesitaAyuda: data.prompt_1 || '',
        compromisoEspiritual: data.prompt_2 || '',
        impresionEspiritu: data.prompt_3 || ''
      };
    } else if (sectionId === 'exchange_followup') {
      updated.followUp = {
        compartiLoBueno: data.item_0 || false,
        hableMejorar: data.item_1 || false,
        fijamosMetas: data.item_2 || false,
        reporteEnviado: data.item_3 || false,
        futuraRevisionPlaneada: data.item_4 || false
      };
    }

    updated.updatedAt = new Date().toISOString();
    setExchange(updated);
    
    // Auto-guardar
    if (updated.id) {
      ExchangeService.saveExchange(updated);
    }
  };

  const handleSave = () => {
    if (!exchange) return;
    
    const saved = ExchangeService.saveExchange({
      ...exchange,
      status: 'draft'
    });
    setExchange(saved);
    alert('Intercambio guardado como borrador');
  };

  const handlePublish = () => {
    if (!exchange) return;
    
    if (!exchange.companionshipName || !exchange.date || !exchange.area) {
      alert('Por favor completa al menos: Compañerismo, Fecha y Área');
      return;
    }
    
    const saved = ExchangeService.saveExchange({
      ...exchange,
      status: 'draft'
    });
    
    const published = ExchangeService.publishExchange(saved.id);
    if (published) {
      setExchange(published);
      alert('Intercambio publicado al misionero');
    }
  };

  const handleComplete = () => {
    if (!exchange || !exchange.id) return;
    
    const completed = ExchangeService.completeExchange(exchange.id);
    if (completed) {
      setExchange(completed);
      loadHistory();
      alert('Intercambio marcado como completado');
    }
  };

  if (isLoading || !exchange || !role) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Cargando...</h1>
        </div>
      </div>
    );
  }

  const tabConfig = role.tabs.find(t => t.id === 'exchanges');
  if (!tabConfig) return null;

  const roleColor = role.color || '#3B82F6';

  return (
    <div className="page">
      <div className="page-header">
        <h1>{tabConfig.title}</h1>
        <p className="page-subtitle">{tabConfig.subtitle}</p>
      </div>

      <div className="page-content">
        {/* Información básica */}
        <div className="exchange-basic-info">
          <div className="info-row">
            <label>Fecha:</label>
            <input
              type="date"
              value={exchange.date}
              onChange={(e) => {
                const updated = { ...exchange, date: e.target.value };
                setExchange(updated);
                if (updated.id) ExchangeService.saveExchange(updated);
              }}
            />
          </div>
          <div className="info-row">
            <label>Hora:</label>
            <input
              type="time"
              value={exchange.time}
              onChange={(e) => {
                const updated = { ...exchange, time: e.target.value };
                setExchange(updated);
                if (updated.id) ExchangeService.saveExchange(updated);
              }}
            />
          </div>
        </div>

        {/* Acciones */}
        <ExchangeActions
          exchange={exchange}
          roleColor={roleColor}
          onSave={handleSave}
          onPublish={handlePublish}
          onComplete={handleComplete}
        />

        {/* Botón para nuevo intercambio */}
        <div className="exchange-header-actions">
          <button
            className="new-exchange-button"
            onClick={handleNewExchange}
            style={{ backgroundColor: roleColor }}
          >
            + Nuevo intercambio
          </button>
        </div>

        {/* Secciones */}
        {tabConfig.sections.map((section: TabSection) => {
          if (section.id === 'exchange_history') {
            return (
              <div key={section.id} className="exchange-history-section">
                <div className="history-section-header">
                  <h2>{section.title}</h2>
                  <span className="history-count">{history.length} intercambio{history.length !== 1 ? 's' : ''}</span>
                </div>
                {history.length === 0 ? (
                  <p className="empty-history">Aún no hay intercambios registrados. Crea uno nuevo arriba.</p>
                ) : (
                  <div className="history-list">
                    {history.map((h) => {
                      const statusLabels = {
                        draft: '📝 Borrador',
                        planned: '📅 Programado',
                        completed: '✅ Completado',
                        cancelled: '❌ Cancelado'
                      };
                      
                      return (
                        <div
                          key={h.id}
                          className={`history-item ${selectedExchangeId === h.id ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedExchangeId(h.id);
                            loadExchangeById(h.id);
                          }}
                        >
                          <div className="history-header">
                            <div className="history-main-info">
                              <strong>{h.date} {h.time && `– ${h.time}`}</strong>
                              <span className="history-area">{h.area}</span>
                            </div>
                            <span className={`history-status status-${h.status}`}>
                              {statusLabels[h.status] || h.status}
                            </span>
                          </div>
                          <div className="history-details">
                            <div className="history-detail-row">
                              <span><strong>Con:</strong> {h.missionaryName || h.companionshipName}</span>
                              <span><strong>Enfoque:</strong> {h.focus || '—'}</span>
                            </div>
                            {h.summary?.impresionEspiritu && (
                              <p className="history-comment">
                                <em>{h.summary.impresionEspiritu}</em>
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
              tabId="exchanges"
              roleId="districtLeader"
              defaultExpanded={section.id === 'exchange_planner'}
              onDataChange={handleDataChange}
            />
          );
        })}
      </div>
    </div>
  );
};

