import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XtgPage } from '../../../components/layout/XtgPage';
import { XtgCard } from '../../../components/ui/XtgCard';
import './LeadershipToRegularTransitionScreen.css';

interface TransitionOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  colorClass: string;
}

const CONTINUE_OPTIONS: TransitionOption[] = [
  {
    id: 'home',
    title: 'Ir al Inicio',
    description: 'Ver tu dashboard y estadísticas como misionero regular',
    icon: '🏠',
    route: '/home',
    colorClass: 'option--blue',
  },
  {
    id: 'agenda',
    title: 'Ver mi Agenda',
    description: 'Revisar tus citas y actividades programadas',
    icon: '📅',
    route: '/agenda',
    colorClass: 'option--green',
  },
  {
    id: 'people',
    title: 'Gestionar Personas',
    description: 'Administrar investigadores, contactos y miembros',
    icon: '👥',
    route: '/people',
    colorClass: 'option--purple',
  },
  {
    id: 'lessons',
    title: 'Estudiar Lecciones',
    description: 'Acceder a tus materiales de estudio y PMG',
    icon: '📖',
    route: '/lessons',
    colorClass: 'option--orange',
  },
];

export const LeadershipToRegularTransitionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleContinue = (route: string) => {
    navigate(route, { replace: true });
  };

  return (
    <XtgPage
      title="Sigues siendo un Misionero"
      subtitle="Tu identidad principal nunca cambia"
      badge="Transición"
    >
      <div className="transition-container xtg-stack-lg">
        {/* Mensaje Principal */}
        <XtgCard className="transition-hero-card">
          <div className="transition-icon-wrapper">
            <div className="transition-icon">🙏</div>
          </div>
          <h2 className="transition-title">
            Tu Llamamiento es Eterno
          </h2>
          <p className="transition-message">
            Aunque hayas servido como líder de distrito, líder de zona o asistente del presidente,
            tu identidad principal sigue siendo la de un <strong>misionero consagrado de Jesucristo</strong>.
          </p>
          <div className="transition-quote">
            <p className="transition-quote-text">
              "No importa dónde sirvas, sino cómo sirves."
            </p>
            <p className="transition-quote-author">
              Las asignaciones de liderazgo son temporales; tu llamamiento como discípulo misionero es eterno.
            </p>
          </div>
        </XtgCard>

        {/* Mensaje de ánimo */}
        <XtgCard className="transition-encouragement">
          <div className="encouragement-content">
            <div className="encouragement-icon">✨</div>
            <div className="encouragement-text">
              <h3>Tu poder no viene del título</h3>
              <p>
                Tu poder viene de tu fe, tu obediencia y tu amor por las almas.
                Tu influencia viene de tu ejemplo, no de tu posición.
              </p>
            </div>
          </div>
        </XtgCard>

        {/* Opciones para continuar */}
        <div className="transition-options-section">
          <h3 className="transition-options-title">
            ¿A dónde quieres ir ahora?
          </h3>
          <p className="transition-options-subtitle">
            Elige cómo quieres continuar tu servicio como misionero regular
          </p>
          
          <div className="transition-options-grid">
            {CONTINUE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`transition-option ${option.colorClass} ${
                  selectedOption === option.id ? 'transition-option--active' : ''
                }`}
                onClick={() => {
                  setSelectedOption(option.id);
                  handleContinue(option.route);
                }}
              >
                <div className="transition-option-icon">{option.icon}</div>
                <div className="transition-option-content">
                  <h4 className="transition-option-title">{option.title}</h4>
                  <p className="transition-option-description">{option.description}</p>
                </div>
                <div className="transition-option-arrow">→</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recordatorio final */}
        <XtgCard className="transition-reminder">
          <p className="transition-reminder-text">
            <strong>Recuerda:</strong> Hoy, como misionero regular, tu misión es la misma:
            proclamar el evangelio con sencillez y poder, buscar y enseñar a las personas una por una,
            y servir con humildad y buen ánimo.
          </p>
        </XtgCard>
      </div>
    </XtgPage>
  );
};

