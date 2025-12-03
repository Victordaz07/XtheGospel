import React, { useMemo, useState } from 'react';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import {
  CommitmentType,
  CommitmentStatus,
  useCommitmentsStore,
} from '../../store/commitmentsStore';
import './missionary-commitments.css';

type CommitmentsFilter = 'all' | CommitmentType;

export const MissionaryCommitmentsScreen: React.FC = () => {
  // Usar selector estable para evitar re-renders innecesarios
  const items = useCommitmentsStore((s) => s.items);
  const addCommitment = useCommitmentsStore((s) => s.addCommitment);
  const markCompleted = useCommitmentsStore((s) => s.markCompleted);
  
  // Calcular stats directamente con useMemo para evitar loops infinitos
  const stats = useMemo(() => {
    return {
      total: items.length,
      active: items.filter(
        (c) => c.status === 'pending' || c.status === 'in-progress',
      ).length,
      completed: items.filter((c) => c.status === 'completed').length,
      overdue: items.filter((c) => c.status === 'overdue').length,
    };
  }, [items]);

  const [filter, setFilter] = useState<CommitmentsFilter>('all');
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<CommitmentType>('spiritual');

  const filteredCommitments = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((c) => c.type === filter);
  }, [items, filter]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Por ahora manual, pero aquí ya se podrían inyectar personId / lessonId
    addCommitment({
      title: newTitle.trim(),
      type: newType,
    });

    setNewTitle('');
  };

  return (
    <XtgPage
      title="Compromisos"
      subtitle="Gestiona tus compromisos espirituales y de enseñanza."
      badge="MISIONERO"
      rightIcon="menu"
    >
      <div className="xtg-section xtg-stack-lg">

        {/* Resumen */}
        <section>
          <h2 className="mc-section-title">Resumen de compromisos</h2>
          <div className="mc-metrics-grid">
            <XtgCard>
              <p className="mc-metric-label">Total</p>
              <p className="mc-metric-value">{stats.total}</p>
            </XtgCard>
            <XtgCard>
              <p className="mc-metric-label">Activos</p>
              <p className="mc-metric-value">{stats.active}</p>
            </XtgCard>
            <XtgCard>
              <p className="mc-metric-label">Completados</p>
              <p className="mc-metric-value">{stats.completed}</p>
            </XtgCard>
            <XtgCard>
              <p className="mc-metric-label">Vencidos</p>
              <p className="mc-metric-value">{stats.overdue}</p>
            </XtgCard>
          </div>
        </section>

        {/* Nuevo compromiso */}
        <section>
          <h2 className="mc-section-title">Nuevo compromiso</h2>
          <XtgCard>
            <form className="mc-add-form" onSubmit={handleAdd}>
              <input
                type="text"
                className="mc-input"
                placeholder="Nuevo compromiso… (ej.: Leer Alma 32)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <select
                className="mc-select"
                value={newType}
                onChange={(e) => setNewType(e.target.value as CommitmentType)}
              >
                <option value="spiritual">Espiritual</option>
                <option value="study">Estudio</option>
                <option value="attendance">Asistencia</option>
                <option value="service">Servicio</option>
              </select>
              <button type="submit" className="mc-add-button">
                Agregar
              </button>
            </form>
            <p className="mc-add-hint">
              Consejo: registra solo compromisos claros y medibles para
              ayudarte a hacer seguimiento real.
            </p>
          </XtgCard>
        </section>

        {/* Filtros */}
        <section>
          <h2 className="mc-section-title">Filtrar por tipo</h2>
          <div className="mc-filter-row">
            <button
              type="button"
              className={
                filter === 'all'
                  ? 'mc-filter-pill mc-filter-pill--active'
                  : 'mc-filter-pill'
              }
              onClick={() => setFilter('all')}
            >
              Todos
            </button>
            <button
              type="button"
              className={
                filter === 'study'
                  ? 'mc-filter-pill mc-filter-pill--active'
                  : 'mc-filter-pill'
              }
              onClick={() => setFilter('study')}
            >
              Estudio
            </button>
            <button
              type="button"
              className={
                filter === 'spiritual'
                  ? 'mc-filter-pill mc-filter-pill--active'
                  : 'mc-filter-pill'
              }
              onClick={() => setFilter('spiritual')}
            >
              Espirituales
            </button>
            <button
              type="button"
              className={
                filter === 'attendance'
                  ? 'mc-filter-pill mc-filter-pill--active'
                  : 'mc-filter-pill'
              }
              onClick={() => setFilter('attendance')}
            >
              Asistencia
            </button>
            <button
              type="button"
              className={
                filter === 'service'
                  ? 'mc-filter-pill mc-filter-pill--active'
                  : 'mc-filter-pill'
              }
              onClick={() => setFilter('service')}
            >
              Servicio
            </button>
          </div>
        </section>

        {/* Lista */}
        <section className="mc-list-section">
          <h2 className="mc-section-title">Mis compromisos</h2>

          {filteredCommitments.length === 0 ? (
            <div className="mc-empty-state">
              <div className="mc-empty-icon">📄</div>
              <p className="mc-empty-title">Aún no tienes compromisos.</p>
              <p className="mc-empty-text">
                Crea un compromiso manual o registra los compromisos que dejas
                al final de cada lección para hacer seguimiento real.
              </p>
              <button
                type="button"
                className="mc-empty-button"
                onClick={() => {
                  const el =
                    document.querySelector<HTMLInputElement>('.mc-input');
                  el?.focus();
                }}
              >
                Crear primer compromiso
              </button>
            </div>
          ) : (
            <div className="mc-commitment-list">
              {filteredCommitments.map((c) => (
                <article key={c.id} className="mc-commitment-card">
                  <header className="mc-commitment-header">
                    <div>
                      <h3 className="mc-commitment-title">{c.title}</h3>
                      <p className="mc-commitment-meta">
                        {c.personName && <span>Con: {c.personName} · </span>}
                        {c.lessonTitle && (
                          <span>Lección: {c.lessonTitle} · </span>
                        )}
                        <span>
                          {new Date(c.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                    <span
                      className={[
                        'mc-status-pill',
                        `mc-status-pill--${c.status}`,
                      ].join(' ')}
                    >
                      {c.status === 'pending' && 'Pendiente'}
                      {c.status === 'in-progress' && 'En progreso'}
                      {c.status === 'completed' && 'Completado'}
                      {c.status === 'overdue' && 'Vencido'}
                    </span>
                  </header>

                  <p className="mc-due-label">
                    Fecha / meta:{' '}
                    {c.dueDate
                      ? new Date(c.dueDate).toLocaleDateString()
                      : 'Sin fecha específica'}
                  </p>

                  <div className="mc-tag-row">
                    <span
                      className={[
                        'mc-type-pill',
                        `mc-type-pill--${c.type}`,
                      ].join(' ')}
                    >
                      {c.type === 'spiritual' && 'Espiritual'}
                      {c.type === 'study' && 'Estudio'}
                      {c.type === 'attendance' && 'Asistencia'}
                      {c.type === 'service' && 'Servicio'}
                    </span>
                  </div>

                  <div className="mc-card-actions">
                    <button
                      type="button"
                      className="mc-card-primary"
                      onClick={() => markCompleted(c.id)}
                      disabled={c.status === 'completed'}
                    >
                      {c.status === 'completed'
                        ? 'Ya está cumplido'
                        : 'Marcar como cumplido'}
                    </button>
                    <button
                      type="button"
                      className="mc-card-secondary"
                      onClick={() => {
                        // Navegar a detalles cuando esté implementado
                        console.log('Ver detalles de compromiso:', c.id);
                      }}
                    >
                      Ver detalles
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </XtgPage>
  );
};
