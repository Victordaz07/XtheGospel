import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import './missionary-people.css';

type PersonStatus =
  | 'new'
  | 'in-progress'
  | 'ready-for-baptism'
  | 'baptized';

type PeopleFilter = 'all' | PersonStatus;

interface Person {
  id: string;
  name: string;
  status: PersonStatus;
  ward: string;
  nextStep: string;       // próximo paso
  lastContactLabel: string;
  tags: string[];
}

interface PeopleStats {
  total: number;
  new: number;
  inProgress: number;
  readyForBaptism: number;
  baptized: number;
}

/** MOCK – Cursor puede reemplazar esto con Zustand/Firestore */
const usePeopleData = () => {
  const people: Person[] = [
    // Vacío por ahora; deja 1–2 ejemplos si quieres probar
    // {
    //   id: '1',
    //   name: 'Ana Pérez',
    //   status: 'in-progress',
    //   ward: 'Barrio Centro',
    //   nextStep: 'Enseñar Plan de Salvación el jueves',
    //   lastContactLabel: 'Visitada hace 3 días',
    //   tags: ['Referencia de miembro', 'Familia joven'],
    // },
  ];

  const stats: PeopleStats = {
    total: people.length,
    new: people.filter((p) => p.status === 'new').length,
    inProgress: people.filter((p) => p.status === 'in-progress').length,
    readyForBaptism: people.filter((p) => p.status === 'ready-for-baptism').length,
    baptized: people.filter((p) => p.status === 'baptized').length,
  };

  return { people, stats };
};

export const MissionaryPeopleScreen: React.FC = () => {
  const navigate = useNavigate();
  const { people, stats } = usePeopleData();
  const [filter, setFilter] = useState<PeopleFilter>('all');

  const filteredPeople = useMemo(() => {
    if (filter === 'all') return people;
    return people.filter((p) => p.status === filter);
  }, [people, filter]);

  const handleAddPerson = () => {
    // Abre modal / navegación para crear persona
    // Por ahora solo un placeholder
    alert('Abrir formulario para agregar persona');
  };

  return (
    <XtgPage
      title="Personas"
      subtitle="Gestiona a las personas que estás enseñando y acompañando."
      badge="MISIONERO"
      rightIcon="menu"
    >
      <div className="xtg-section xtg-stack-lg">

        {/* Métricas superiores */}
        <section>
          <h2 className="mp-section-title">Resumen rápido</h2>
          <div className="mp-metrics-grid">
            <XtgCard>
              <p className="mp-metric-label">Total</p>
              <p className="mp-metric-value">{stats.total}</p>
            </XtgCard>
            <XtgCard>
              <p className="mp-metric-label">Nuevo</p>
              <p className="mp-metric-value">{stats.new}</p>
            </XtgCard>
            <XtgCard>
              <p className="mp-metric-label">En progreso</p>
              <p className="mp-metric-value">{stats.inProgress}</p>
            </XtgCard>
            <XtgCard>
              <p className="mp-metric-label">Listo para bautismo</p>
              <p className="mp-metric-value">{stats.readyForBaptism}</p>
            </XtgCard>
            <XtgCard>
              <p className="mp-metric-label">Bautizado</p>
              <p className="mp-metric-value">{stats.baptized}</p>
            </XtgCard>
          </div>
        </section>

        {/* Filtros */}
        <section>
          <h2 className="mp-section-title">Filtrar por estado</h2>
          <div className="mp-filter-row">
            <button
              type="button"
              className={
                filter === 'all'
                  ? 'mp-filter-pill mp-filter-pill--active'
                  : 'mp-filter-pill'
              }
              onClick={() => setFilter('all')}
            >
              Todos
            </button>
            <button
              type="button"
              className={
                filter === 'new'
                  ? 'mp-filter-pill mp-filter-pill--active'
                  : 'mp-filter-pill'
              }
              onClick={() => setFilter('new')}
            >
              Nuevo
            </button>
            <button
              type="button"
              className={
                filter === 'in-progress'
                  ? 'mp-filter-pill mp-filter-pill--active'
                  : 'mp-filter-pill'
              }
              onClick={() => setFilter('in-progress')}
            >
              En progreso
            </button>
            <button
              type="button"
              className={
                filter === 'ready-for-baptism'
                  ? 'mp-filter-pill mp-filter-pill--active'
                  : 'mp-filter-pill'
              }
              onClick={() => setFilter('ready-for-baptism')}
            >
              Listo para bautismo
            </button>
            <button
              type="button"
              className={
                filter === 'baptized'
                  ? 'mp-filter-pill mp-filter-pill--active'
                  : 'mp-filter-pill'
              }
              onClick={() => setFilter('baptized')}
            >
              Bautizado
            </button>
          </div>
        </section>

        {/* Lista de personas */}
        <section className="mp-list-section">
          <div className="mp-list-header">
            <h2 className="mp-section-title">Personas</h2>
            <button
              type="button"
              className="mp-add-button"
              onClick={handleAddPerson}
            >
              + Agregar persona
            </button>
          </div>

          {filteredPeople.length === 0 ? (
            <div className="mp-empty-state">
              <div className="mp-empty-icon">🕊️</div>
              <p className="mp-empty-title">No hay personas registradas.</p>
              <p className="mp-empty-text">
                Comienza agregando investigadores, amigos o miembros a quienes
                estás enseñando o acompañando.
              </p>
              <button
                type="button"
                className="mp-empty-button"
                onClick={handleAddPerson}
              >
                Agregar primera persona
              </button>
            </div>
          ) : (
            <div className="mp-people-list">
              {filteredPeople.map((person) => (
                <article key={person.id} className="mp-person-card">
                  <header className="mp-person-header">
                    <div>
                      <h3 className="mp-person-name">{person.name}</h3>
                      <p className="mp-person-ward">{person.ward}</p>
                    </div>
                    <span
                      className={[
                        'mp-status-pill',
                        `mp-status-pill--${person.status}`,
                      ].join(' ')}
                    >
                      {person.status === 'new' && 'Nuevo'}
                      {person.status === 'in-progress' && 'En progreso'}
                      {person.status === 'ready-for-baptism' &&
                        'Listo para bautismo'}
                      {person.status === 'baptized' && 'Bautizado'}
                    </span>
                  </header>

                  <p className="mp-next-step">
                    Próximo paso: <span>{person.nextStep}</span>
                  </p>

                  <p className="mp-last-contact">{person.lastContactLabel}</p>

                  {person.tags.length > 0 && (
                    <div className="mp-tag-row">
                      {person.tags.map((tag) => (
                        <span key={tag} className="mp-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mp-card-actions">
                    <button
                      type="button"
                      className="mp-card-primary"
                      onClick={() =>
                        navigate(`/missionary/person/${person.id}`)
                      }
                    >
                      Ver ficha
                    </button>
                    <button
                      type="button"
                      className="mp-card-secondary"
                      onClick={() =>
                        navigate(`/agenda/new?personId=${person.id}`)
                      }
                    >
                      Programar cita
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

