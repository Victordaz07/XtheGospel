import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import './missionary-identity.css';

// Browser globals for web environment
declare const alert: (message?: string) => void;

interface Props {
  /** Rol de liderazgo previo: 'DL' | 'ZL' | 'AP' | undefined */
  previousLeadershipRole?: 'DL' | 'ZL' | 'AP';
}

export const MissionaryIdentityReminderPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get previous role from location state or determine from current role
  const previousLeadershipRole = (location.state as any)?.previousLeadershipRole as 'DL' | 'ZL' | 'AP' | undefined;

  const handleGoToMissionaryHome = () => {
    // Navigate to regular missionary home
    navigate('/home', { replace: true });
  };

  const handleGoBackToLeadership = () => {
    // Redirige al módulo de liderazgo si el misionero quiere regresar
    // This would require restoring the leadership role, but for now just show a message
    // eslint-disable-next-line no-restricted-globals
    alert('Para volver al módulo de liderazgo, cambia tu rol desde el perfil.');
  };

  const leadershipLabel =
    previousLeadershipRole === 'DL'
      ? 'Líder de Distrito'
      : previousLeadershipRole === 'ZL'
      ? 'Líder de Zona'
      : previousLeadershipRole === 'AP'
      ? 'Asistente del Presidente'
      : 'Líder Misional';

  return (
    <XtgPage
      title="Sigues siendo un misionero del Señor"
      subtitle="Tu llamamiento de liderazgo es temporal, pero tu identidad como discípulo de Jesucristo es eterna."
      badge="Modo Misionero"
    >
      <div className="xtg-section xtg-stack-lg missionary-identity-page">
        {/* Tarjeta principal */}
        <XtgCard>
          <div className="missionary-identity-hero">
            <div className="missionary-identity-icon">
              {/* Puedes cambiar el emoji por un ícono real más adelante */}
              <span>🕊️</span>
            </div>
            <div className="missionary-identity-text">
              <h2 className="missionary-identity-title">
                Has vuelto al modo de misionero regular
              </h2>
              <p className="missionary-identity-subtitle">
                Aunque hayas servido como <strong>{leadershipLabel}</strong>, tu
                misión principal sigue siendo la misma: predicar el evangelio,
                amar a las personas y ayudarles a venir a Cristo.
              </p>
            </div>
          </div>
        </XtgCard>

        {/* Sección: Recordatorio doctrinal */}
        <XtgCard title="Tu identidad no depende del cargo">
          <p className="xtg-text-muted">
            No eres valioso por el título que tengas, sino por quién eres ante
            Dios. El liderazgo es un encargo temporal de servicio; ser
            misionero, discípulo y testigo de Jesucristo es tu identidad
            permanente.
          </p>
          <ul className="missionary-identity-list">
            <li>
              <strong>Eres un siervo del Señor</strong> antes que un
              administrador de números o reportes.
            </li>
            <li>
              <strong>Cada día y cada área</strong> son sagrados, aunque ya no
              tengas una responsabilidad de liderazgo.
            </li>
            <li>
              <strong>Tu influencia real</strong> sigue siendo uno a uno: con tu
              compañero, con los investigadores y con los miembros.
            </li>
          </ul>
        </XtgCard>

        {/* Sección: Qué haces ahora como misionero regular */}
        <XtgCard title="Qué significa estar ahora en modo misionero regular">
          <div className="missionary-identity-grid">
            <div>
              <h3 className="missionary-identity-small-title">
                En tu día a día
              </h3>
              <ul className="missionary-identity-list">
                <li>Predicas el evangelio en tu área con todo tu corazón.</li>
                <li>
                  Preparas lecciones, visitas, contactos y servicio con
                  diligencia.
                </li>
                <li>
                  Sigues los estándares misionales y tu horario con obediencia
                  y fe.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="missionary-identity-small-title">
                En relación con el liderazgo
              </h3>
              <ul className="missionary-identity-list">
                <li>
                  Recibes agendas, mensajes e indicaciones en el{' '}
                  <strong>Centro de Liderazgo</strong>.
                </li>
                <li>
                  Puedes hacer preguntas o pedir ayuda a tus líderes cuando lo
                  necesites.
                </li>
                <li>
                  Sigues siendo una voz importante en la misión, aunque ahora
                  sin un título de liderazgo específico.
                </li>
              </ul>
            </div>
          </div>
        </XtgCard>

        {/* CTA */}
        <XtgCard>
          <div className="missionary-identity-actions">
            <button
              type="button"
              className="missionary-identity-btn missionary-identity-btn-primary"
              onClick={handleGoToMissionaryHome}
            >
              Ir a mi panel de misionero
            </button>
            <button
              type="button"
              className="missionary-identity-btn missionary-identity-btn-ghost"
              onClick={handleGoBackToLeadership}
            >
              Volver al módulo de liderazgo
            </button>
          </div>
          <p className="missionary-identity-footer-text xtg-text-muted">
            Esta pantalla aparece cuando cambias de un rol de liderazgo a modo
            misionero regular, para recordarte que lo más importante no es el
            cargo, sino tu consagración al Señor.
          </p>
        </XtgCard>
      </div>
    </XtgPage>
  );
};

