import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import { useAuth } from '../../context/AuthContext';
import { UserRoleKey, getRoleDefaultRoute } from '../../config/roles';
import './role-selection.css';

type MissionRole = UserRoleKey;

interface RoleOption {
  id: MissionRole;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  actionLabel: string;
  colorClass: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'investigator',
    icon: '🌱',
    title: 'Aprendiendo el Evangelio',
    tagline: 'Estoy aprendiendo sobre el evangelio.',
    description:
      'Quiero conocer mejor a Jesucristo, hacer preguntas y prepararme para el bautismo.',
    actionLabel: 'Comenzar a Aprender',
    colorClass: 'role-card--green',
  },
  {
    id: 'missionary',
    icon: '🙏',
    title: 'Predicando el Evangelio',
    tagline: 'Estoy sirviendo o ayudando como misionero.',
    description:
      'Enseño el evangelio, acompaño a investigadores y quiero organizar mejor mi servicio.',
    actionLabel: 'Comenzar a Enseñar',
    colorClass: 'role-card--purple',
  },
  {
    id: 'member',
    icon: '🤝',
    title: 'Aprendiendo a Predicar',
    tagline: 'Quiero apoyar la obra misional en mi barrio.',
    description:
      'Soy miembro de la Iglesia y deseo invitar, acompañar y cuidar a amigos e investigadores.',
    actionLabel: 'Servir y Crecer',
    colorClass: 'role-card--pink',
  },
];

interface Props {
  onContinue?: (role: MissionRole) => void;
}

export const RoleSelectionScreen: React.FC<Props> = ({ onContinue }) => {
  const [selectedRole, setSelectedRole] = useState<MissionRole | null>(null);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!selectedRole) return;

    if (onContinue) {
      onContinue(selectedRole);
    } else {
      // Integrate with auth system
      try {
        await login(selectedRole);
        // Navigate to role's default route
        navigate(getRoleDefaultRoute(selectedRole), { replace: true });
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <XtgPage
      title="xTheGospel"
      subtitle="Selecciona tu rol para continuar. Siempre puedes cambiarlo más adelante."
      badge="App Misional"
    >
      <div className="xtg-section xtg-stack-lg">
        <XtgCard>
          <p className="xtg-text-muted">
            Esta aplicación fue creada para investigadores, misioneros y miembros.
            Elige la opción que mejor describe tu situación actual.
          </p>
        </XtgCard>

        <div className="role-card-list xtg-stack-md">
          {ROLE_OPTIONS.map((role) => {
            const isActive = selectedRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                className={[
                  'role-card',
                  'role-card--vertical',
                  role.colorClass,
                  isActive ? 'role-card--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="role-card-top">
                  <div className="role-card-icon">
                    <span>{role.icon}</span>
                  </div>
                  <div className="role-card-text">
                    <h2 className="role-card-title">{role.title}</h2>
                    <p className="role-card-tagline">{role.tagline}</p>
                  </div>
                </div>

                <p className="role-card-description">{role.description}</p>

                <div className="role-card-bottom">
                  <span className="role-card-action">{role.actionLabel}</span>
                  <span className="role-card-arrow">→</span>
                </div>

                {isActive && (
                  <div className="role-card-selected-pill">
                    Seleccionado
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="role-selection-footer">
          <button
            type="button"
            className="role-continue-button"
            disabled={!selectedRole || isLoading}
            onClick={handleContinue}
          >
            {isLoading ? 'Cargando...' : 'Continuar'}
          </button>

          <p className="role-selection-helper xtg-text-muted">
            Aun si tienes un llamamiento de liderazgo, tu identidad principal aquí
            sigue siendo la misma: discípulo de Jesucristo que está aprendiendo, sirviendo y creciendo.
          </p>
        </div>
      </div>
    </XtgPage>
  );
};

