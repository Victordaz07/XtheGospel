import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLeadershipRoleEnhanced } from '../../../data/missionary/leadershipModeEnhanced';
import {
  TransferPlan,
  TransferPlanService,
  TransferAssignment,
} from '../../../services/transferPlanService';
import '../../../pages/Page.css';
import './DistrictCouncilScreen.css'; // Reutilizar estilos

export const TransferPlanScreen: React.FC = () => {
  const location = useLocation();
  const role = getLeadershipRoleEnhanced('assistantToPresident');
  const [plan, setPlan] = useState<TransferPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<TransferPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const allPlans = TransferPlanService.getPlansByMission('current_mission');
    setHistory(allPlans);
  };

  const loadPlanById = (planId: string) => {
    const loaded = TransferPlanService.getPlanById(planId);
    if (loaded) {
      setPlan(loaded);
      setIsLoading(false);
    }
  };

  const loadPlan = () => {
    if (selectedPlanId) {
      return;
    }

    const drafts = TransferPlanService.getDrafts('current_mission');
    const latestDraft =
      drafts.length > 0
        ? drafts.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() -
              new Date(a.updatedAt).getTime(),
          )[0]
        : null;

    if (latestDraft) {
      setPlan(latestDraft);
      setIsLoading(false);
    } else {
      const newPlan: TransferPlan = {
        id: '',
        missionId: 'current_mission',
        transferNumber: TransferPlanService.getNextTransferNumber('current_mission'),
        effectiveDate: new Date().toISOString().split('T')[0],
        notes: '',
        assignments: [],
        createdById: 'current_user',
        createdByName: 'Asistente del Presidente',
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const saved = TransferPlanService.savePlan(newPlan);
      setPlan(saved);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPlanId) {
      loadPlanById(selectedPlanId);
    } else {
      loadPlan();
    }
  }, [selectedPlanId]);

  const handleNewPlan = () => {
    setSelectedPlanId(null);
    loadPlan();
    loadHistory();
  };

  const handleFieldChange = (field: keyof TransferPlan, value: any) => {
    if (!plan) return;
    const updated = {
      ...plan,
      [field]: value,
      updatedAt: new Date().toISOString(),
    };
    setPlan(updated);
    TransferPlanService.savePlan(updated);
  };

  const handleAddAssignment = () => {
    if (!plan) return;
    const newAssignment: TransferAssignment = {
      missionaryId: '',
      missionaryName: '',
      fromArea: '',
      toArea: '',
      fromCompanionship: '',
      toCompanionship: '',
    };
    const updated = {
      ...plan,
      assignments: [...plan.assignments, newAssignment],
      updatedAt: new Date().toISOString(),
    };
    setPlan(updated);
    TransferPlanService.savePlan(updated);
  };

  const handleUpdateAssignment = (
    index: number,
    field: keyof TransferAssignment,
    value: any,
  ) => {
    if (!plan) return;
    const assignments = [...plan.assignments];
    assignments[index] = {
      ...assignments[index],
      [field]: value,
    };
    const updated = {
      ...plan,
      assignments,
      updatedAt: new Date().toISOString(),
    };
    setPlan(updated);
    TransferPlanService.savePlan(updated);
  };

  const handleRemoveAssignment = (index: number) => {
    if (!plan) return;
    const assignments = plan.assignments.filter((_, i) => i !== index);
    const updated = {
      ...plan,
      assignments,
      updatedAt: new Date().toISOString(),
    };
    setPlan(updated);
    TransferPlanService.savePlan(updated);
  };

  const handleMarkFinal = () => {
    if (!plan) return;
    if (confirm('¿Marcar este plan como final? Ya no podrá editarse.')) {
      const updated = {
        ...plan,
        status: 'final' as const,
        updatedAt: new Date().toISOString(),
      };
      setPlan(updated);
      TransferPlanService.savePlan(updated);
      loadHistory();
      alert('Plan marcado como final');
    }
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

  if (!plan) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Error</h1>
        </div>
      </div>
    );
  }

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
          <h1>Plan de Transfers</h1>
          <p className="page-subtitle">Planifica y gestiona los traslados de la misión</p>
        </div>
      </div>
      <div className="page-content">
        <div className="council-header-actions">
          <button
            className="new-council-button"
            onClick={handleNewPlan}
            style={{ backgroundColor: role.color }}
          >
            + Nuevo plan
          </button>
          {plan.status === 'draft' && (
            <button
              className="action-button success"
              onClick={handleMarkFinal}
              style={{ marginLeft: '12px' }}
            >
              Marcar como final
            </button>
          )}
        </div>

        <div className="council-basic-info">
          <div className="council-info-field">
            <label>Número de Transfer</label>
            <input
              type="number"
              value={plan.transferNumber}
              onChange={e => {
                handleFieldChange('transferNumber', parseInt(e.target.value) || 0);
              }}
              style={{ borderLeftColor: role.color }}
            />
          </div>
          <div className="council-info-field">
            <label>Fecha Efectiva</label>
            <input
              type="date"
              value={plan.effectiveDate}
              onChange={e => {
                handleFieldChange('effectiveDate', (e.target as HTMLInputElement).value);
              }}
              style={{ borderLeftColor: role.color }}
            />
          </div>
          <div className="council-info-field" style={{ gridColumn: '1 / -1' }}>
            <label>Notas</label>
            <textarea
              value={plan.notes}
              onChange={e => {
                handleFieldChange('notes', (e.target as HTMLTextAreaElement).value);
              }}
              placeholder="Notas sobre este plan de transfers..."
              rows={3}
              style={{ borderLeftColor: role.color }}
            />
          </div>
        </div>

        {/* Asignaciones */}
        <div className="council-section-read" style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3>Asignaciones</h3>
            <button
              onClick={handleAddAssignment}
              style={{
                padding: '8px 16px',
                backgroundColor: role.color,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              + Agregar asignación
            </button>
          </div>

          {plan.assignments.length === 0 ? (
            <p style={{ color: '#9CA3AF', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>
              No hay asignaciones aún. Agrega una asignación para comenzar.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {plan.assignments.map((assignment, index) => (
                <div
                  key={index}
                  style={{
                    padding: '16px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    backgroundColor: '#F9FAFB',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <strong style={{ color: role.color }}>Asignación #{index + 1}</strong>
                    <button
                      onClick={() => handleRemoveAssignment(index)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#EF4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Misionero
                      </label>
                      <input
                        type="text"
                        value={assignment.missionaryName}
                        onChange={e => handleUpdateAssignment(index, 'missionaryName', (e.target as HTMLInputElement).value)}
                        placeholder="Nombre del misionero"
                        style={{ width: '100%', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Nuevo Rol (opcional)
                      </label>
                      <select
                        value={assignment.newRole || ''}
                        onChange={e => handleUpdateAssignment(index, 'newRole', e.target.value || undefined)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                      >
                        <option value="">Sin cambio de rol</option>
                        <option value="district_leader">Líder de Distrito</option>
                        <option value="zone_leader">Líder de Zona</option>
                        <option value="trainer">Entrenador</option>
                        <option value="assistant_to_president">Asistente del Presidente</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Área Origen
                      </label>
                      <input
                        type="text"
                        value={assignment.fromArea}
                        onChange={e => handleUpdateAssignment(index, 'fromArea', (e.target as HTMLInputElement).value)}
                        placeholder="Área actual"
                        style={{ width: '100%', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Área Destino
                      </label>
                      <input
                        type="text"
                        value={assignment.toArea}
                        onChange={e => handleUpdateAssignment(index, 'toArea', (e.target as HTMLInputElement).value)}
                        placeholder="Nueva área"
                        style={{ width: '100%', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Compañerismo Origen
                      </label>
                      <input
                        type="text"
                        value={assignment.fromCompanionship}
                        onChange={e => handleUpdateAssignment(index, 'fromCompanionship', (e.target as HTMLInputElement).value)}
                        placeholder="Compañerismo actual"
                        style={{ width: '100%', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                        Compañerismo Destino
                      </label>
                      <input
                        type="text"
                        value={assignment.toCompanionship}
                        onChange={e => handleUpdateAssignment(index, 'toCompanionship', (e.target as HTMLInputElement).value)}
                        placeholder="Nuevo compañerismo"
                        style={{ width: '100%', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Historial */}
        <div className="council-history-section" style={{ marginTop: '32px' }}>
          <div className="history-section-header">
            <h2>Historial de planes</h2>
            <span className="history-count">{history.length} plan{history.length !== 1 ? 'es' : ''}</span>
          </div>
          {history.length === 0 ? (
            <p className="empty-history">Aún no hay planes registrados.</p>
          ) : (
            <div className="history-list">
              {history.map((h) => {
                const statusLabels = {
                  draft: '📝 Borrador',
                  final: '✅ Final'
                };
                
                return (
                  <div
                    key={h.id}
                    className={`history-item ${selectedPlanId === h.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedPlanId(h.id);
                      loadPlanById(h.id);
                    }}
                  >
                    <div className="history-header">
                      <div className="history-main-info">
                        <strong>Transfer #{h.transferNumber} – {h.effectiveDate}</strong>
                        <span className="history-date">
                          {h.assignments.length} asignación{h.assignments.length !== 1 ? 'es' : ''}
                        </span>
                      </div>
                      <span className={`history-status status-${h.status}`}>
                        {statusLabels[h.status] || h.status}
                      </span>
                    </div>
                    {h.notes && (
                      <p className="history-comment">
                        <em>{h.notes.substring(0, 100)}{h.notes.length > 100 ? '...' : ''}</em>
                      </p>
                    )}
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

