import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import { AppFooter } from '../../components/layout/AppFooter';
import './missionary-home.css';

interface MissionaryStats {
  completedLessons: number;
  totalLessons: number;
  completedCommitments: number;
  pendingCommitments: number;
  overallProgressPercent: number;
  todayLessons: number;
  todayContacts: number;
  todayDueCommitments: number;
}

interface AgendaEvent {
  id: string;
  timeLabel: string;     // ej: "3:00 PM"
  title: string;         // ej: "Lección con Ana"
  subtitle: string;      // ej: "Investigador - Barrio Centro"
  type: 'lesson' | 'visit' | 'call' | 'other';
}

interface FocusPerson {
  id: string;
  name: string;
  statusLabel: string;   // ej: "Con fecha", "En riesgo", "Nuevo"
  statusColor: 'green' | 'amber' | 'red' | 'blue';
}

interface KeyCommitment {
  id: string;
  personName: string;
  description: string;
  dueLabel: string;      // ej: "Vence hoy", "Para mañana"
}

interface SpiritualFocus {
  title: string;
  reference: string;
  summary: string;
}

interface MissionaryHomeData {
  stats: MissionaryStats;
  nextEvents: AgendaEvent[];
  focusPeople: FocusPerson[];
  keyCommitments: KeyCommitment[];
  spiritualFocus: SpiritualFocus;
}

/**
 * Hook de ejemplo. Cursor puede reemplazar el mock
 * con datos reales desde Zustand / Firestore / etc.
 */
const useMissionaryHomeData = (): MissionaryHomeData => {
  // MOCK – reemplazar con datos reales
  return {
    stats: {
      completedLessons: 0,
      totalLessons: 7,
      completedCommitments: 0,
      pendingCommitments: 0,
      overallProgressPercent: 0,
      todayLessons: 0,
      todayContacts: 0,
      todayDueCommitments: 0,
    },
    nextEvents: [],
    focusPeople: [],
    keyCommitments: [],
    spiritualFocus: {
      title: 'Invitar a venir a Cristo',
      reference: 'Moroni 10:32',
      summary:
        'Hoy enfócate en invitar con claridad y amor, ayudando a cada persona a acercarse un poco más al Salvador.',
    },
  };
};

export const MissionaryHomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { stats, nextEvents, focusPeople, keyCommitments, spiritualFocus } =
    useMissionaryHomeData();

  const goTo = (path: string) => () => navigate(path);

  return (
    <XtgPage
      title="Inicio – Misionero"
      subtitle="Panel personal para organizar tu día y servir mejor a tus investigadores."
      badge="MISIONERO"
      rightIcon="bell"
    >
      <div className="xtg-section xtg-stack-lg">

        {/* 1. Resumen de hoy */}
        <XtgCard title="Resumen de hoy">
          <div className="mh-today-grid">
            <div className="mh-today-item">
              <span className="mh-today-label">Lecciones de hoy</span>
              <span className="mh-today-value">{stats.todayLessons}</span>
            </div>
            <div className="mh-today-item">
              <span className="mh-today-label">Personas a contactar</span>
              <span className="mh-today-value">{stats.todayContacts}</span>
            </div>
            <div className="mh-today-item">
              <span className="mh-today-label">Compromisos que vencen hoy</span>
              <span className="mh-today-value">
                {stats.todayDueCommitments}
              </span>
            </div>
          </div>
        </XtgCard>

        {/* 2. Progreso general */}
        <div className="mh-grid-2">
          <XtgCard>
            <h3 className="mh-metric-title">Lecciones completadas</h3>
            <p className="mh-metric-main">
              {stats.completedLessons} / {stats.totalLessons}
            </p>
            <p className="mh-metric-sub">Hojas de estudio PMG</p>
          </XtgCard>

          <XtgCard>
            <h3 className="mh-metric-title">Compromisos</h3>
            <p className="mh-metric-main">
              {stats.completedCommitments} / {stats.completedCommitments + stats.pendingCommitments}
            </p>
            <p className="mh-metric-sub">Cumplidos vs. pendientes</p>
          </XtgCard>

          <XtgCard className="mh-metric-wide">
            <h3 className="mh-metric-title">Progreso general</h3>
            <div className="mh-progress-row">
              <div className="mh-progress-bar">
                <div
                  className="mh-progress-fill"
                  style={{ width: `${stats.overallProgressPercent}%` }}
                />
              </div>
              <span className="mh-progress-value">
                {stats.overallProgressPercent}%
              </span>
            </div>
            <p className="mh-metric-sub">
              Basado en lecciones, compromisos y seguimiento reciente.
            </p>
          </XtgCard>
        </div>

        {/* 3. Próximas citas */}
        <XtgCard
          title="Próximas citas"
          actionLabel="Ver agenda completa"
          onAction={goTo('/agenda')}
        >
          {nextEvents.length === 0 ? (
            <p className="xtg-text-muted">
              No tienes citas registradas. Revisa tu agenda y programa tus próximas visitas.
            </p>
          ) : (
            <ul className="mh-event-list">
              {nextEvents.map((event) => (
                <li key={event.id} className="mh-event-item">
                  <div className="mh-event-time">{event.timeLabel}</div>
                  <div className="mh-event-main">
                    <div className="mh-event-title">{event.title}</div>
                    <div className="mh-event-subtitle">{event.subtitle}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </XtgCard>

        {/* 4. Personas en enfoque */}
        <XtgCard
          title="Personas en enfoque esta semana"
          actionLabel="Ver todas las personas"
          onAction={goTo('/people')}
        >
          {focusPeople.length === 0 ? (
            <p className="xtg-text-muted">
              Aún no has destacado personas para esta semana. Elige 3–5 investigadores
              clave y concéntrate en ayudarles a progresar.
            </p>
          ) : (
            <ul className="mh-person-list">
              {focusPeople.map((person) => (
                <li key={person.id} className="mh-person-item">
                  <span className="mh-person-name">{person.name}</span>
                  <span
                    className={[
                      'mh-person-status',
                      `mh-person-status--${person.statusColor}`,
                    ].join(' ')}
                  >
                    {person.statusLabel}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </XtgCard>

        {/* 5. Compromisos clave */}
        <XtgCard
          title="Compromisos clave pendientes"
          actionLabel="Ver todos los compromisos"
          onAction={goTo('/tasks')}
        >
          {keyCommitments.length === 0 ? (
            <p className="xtg-text-muted">
              No hay compromisos marcados como prioritarios. Revisa tu lista de compromisos
              y selecciona aquellos que necesitan atención hoy.
            </p>
          ) : (
            <ul className="mh-commitment-list">
              {keyCommitments.map((c) => (
                <li key={c.id} className="mh-commitment-item">
                  <div className="mh-commitment-main">
                    <span className="mh-commitment-person">{c.personName}</span>
                    <span className="mh-commitment-desc">{c.description}</span>
                  </div>
                  <span className="mh-commitment-due">{c.dueLabel}</span>
                </li>
              ))}
            </ul>
          )}
        </XtgCard>

        {/* 6. Enfoque espiritual */}
        <XtgCard title="Enfoque espiritual de hoy">
          <h3 className="mh-spiritual-title">{spiritualFocus.title}</h3>
          <p className="mh-spiritual-ref">{spiritualFocus.reference}</p>
          <p className="mh-spiritual-summary">{spiritualFocus.summary}</p>
        </XtgCard>

        {/* 7. Acciones rápidas */}
        <section>
          <h2 className="mh-section-title">Acciones rápidas</h2>
          <div className="mh-quick-grid">
            <button
              type="button"
              className="mh-quick-card"
              onClick={goTo('/lessons')}
            >
              <div className="mh-quick-icon">📘</div>
              <div className="mh-quick-text">
                <span className="mh-quick-title">Ver Mis Lecciones</span>
                <span className="mh-quick-sub">
                  Accede a tus hojas de estudio PMG.
                </span>
              </div>
            </button>

            <button
              type="button"
              className="mh-quick-card"
              onClick={goTo('/people')}
            >
              <div className="mh-quick-icon">👥</div>
              <div className="mh-quick-text">
                <span className="mh-quick-title">Ver Personas</span>
                <span className="mh-quick-sub">
                  Gestiona investigadores, amigos y miembros clave.
                </span>
              </div>
            </button>

            <button
              type="button"
              className="mh-quick-card"
              onClick={goTo('/agenda')}
            >
              <div className="mh-quick-icon">📅</div>
              <div className="mh-quick-text">
                <span className="mh-quick-title">Ver Agenda</span>
                <span className="mh-quick-sub">
                  Revisa y organiza tus citas y visitas.
                </span>
              </div>
            </button>

            <button
              type="button"
              className="mh-quick-card"
              onClick={goTo('/tasks')}
            >
              <div className="mh-quick-icon">✅</div>
              <div className="mh-quick-text">
                <span className="mh-quick-title">Ver Compromisos</span>
                <span className="mh-quick-sub">
                  Da seguimiento a promesas y tareas espirituales.
                </span>
              </div>
            </button>

            <button
              type="button"
              className="mh-quick-card"
              onClick={goTo('/leadership')}
            >
              <div className="mh-quick-icon">🛡️</div>
              <div className="mh-quick-text">
                <span className="mh-quick-title">Centro de Liderazgo</span>
                <span className="mh-quick-sub">
                  Ve agendas, mensajes y énfasis de tus líderes.
                </span>
              </div>
            </button>

            <button
              type="button"
              className="mh-quick-card"
              onClick={goTo('/guide')}
            >
              <div className="mh-quick-icon">📖</div>
              <div className="mh-quick-text">
                <span className="mh-quick-title">Guía para Misioneros</span>
                <span className="mh-quick-sub">
                  Accede a recursos y ayudas rápidas de estudio.
                </span>
              </div>
            </button>
          </div>
        </section>
      </div>
      <AppFooter />
    </XtgPage>
  );
};

