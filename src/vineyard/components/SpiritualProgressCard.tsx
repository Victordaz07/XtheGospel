import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MemberBadge } from '../state/memberProgressStore';
import './SpiritualProgressCard.css';

const BADGE_CATALOG = [
  { id: 'primer-estudio', name: 'Primera Luz', icon: '💡' },
  { id: 'companion-fiel', name: 'Compañero Fiel', icon: '🤝' },
  { id: 'disciplina-constante', name: 'Discípulo Constante', icon: '🔥' },
  { id: 'mentor-de-fe', name: 'Mentor de Fe', icon: '📚' },
  { id: 'faro-del-barrio', name: 'Faro del Barrio', icon: '🏮' },
  { id: 'guardian-del-templo', name: 'Guardián del Templo', icon: '⛪' },
];

export interface SpiritualProgressProps {
  level: number;
  levelLabel: string;      // "Principiante", "Discípulo en progreso", etc.
  totalXp: number;         // XP acumulado total
  currentLevelXp: number;  // XP en el nivel actual
  nextLevelXp: number;     // XP requerido para subir
  streakDays: number;      // racha de días
  badgesUnlocked: number;  // cantidad de insignias
  badgesTotal: number;     // total de insignias posibles
  earnedBadges?: MemberBadge[]; // insignias desbloqueadas
}

export const SpiritualProgressCard: React.FC<SpiritualProgressProps> = ({
  level,
  levelLabel,
  totalXp,
  currentLevelXp,
  nextLevelXp,
  streakDays,
  badgesUnlocked,
  badgesTotal,
  earnedBadges = [],
}) => {
  const navigate = useNavigate();

  const percent =
    nextLevelXp > 0 ? Math.min(100, Math.round((currentLevelXp / nextLevelXp) * 100)) : 0;

  const handleGoToActivities = () => {
    navigate('/member/activities');
  };

  const handleGoToStudy = () => {
    navigate('/member/study');
  };

  const handleGoToBadges = () => {
    navigate('/member/progress');
  };

  return (
    <section className="spiritual-card">
      <header className="spiritual-card__header">
        <div>
          <p className="spiritual-card__eyebrow">Progreso espiritual</p>
          <h2 className="spiritual-card__title">Nivel {level}</h2>
          <p className="spiritual-card__subtitle">{levelLabel}</p>
        </div>

        <div className="spiritual-card__chip">
          <span role="img" aria-label="plant">
            🌱
          </span>
          <span>Racha: {streakDays} {streakDays === 1 ? 'día' : 'días'}</span>
        </div>
      </header>

      <div className="spiritual-card__progress-block">
        <div className="spiritual-card__progress-header">
          <span>XP actual</span>
          <span>
            {currentLevelXp} / {nextLevelXp} XP
          </span>
        </div>
        <div className="spiritual-card__progress-bar">
          <div
            className="spiritual-card__progress-bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="spiritual-card__progress-caption">
          Te faltan <strong>{Math.max(0, nextLevelXp - currentLevelXp)} XP</strong> para pasar al
          siguiente nivel.
        </p>
      </div>

      <div className="spiritual-card__stats">
        <div className="spiritual-card__stat">
          <span className="spiritual-card__stat-label">XP total</span>
          <span className="spiritual-card__stat-value">{totalXp}</span>
        </div>
        <div className="spiritual-card__stat">
          <span className="spiritual-card__stat-label">Racha</span>
          <span className="spiritual-card__stat-value">
            🔥 {streakDays} {streakDays === 1 ? 'día' : 'días'}
          </span>
        </div>
        <div className="spiritual-card__stat">
          <span className="spiritual-card__stat-label">Insignias</span>
          <span className="spiritual-card__stat-value">
            🏅 {badgesUnlocked} / {badgesTotal}
          </span>
        </div>
      </div>

      <div className="spiritual-card__actions">
        <button className="spiritual-card__btn spiritual-card__btn--primary" onClick={handleGoToActivities}>
          Ver actividades que dan XP
        </button>
        <button className="spiritual-card__btn spiritual-card__btn--ghost" onClick={handleGoToStudy}>
          Ir a mi estudio de hoy
        </button>
        <button className="spiritual-card__btn spiritual-card__btn--link" onClick={handleGoToBadges}>
          Ver todas mis insignias
        </button>
      </div>

      <div className="spiritual-card__badges">
        <div className="spiritual-card__badges-header">
          <h3>Insignias</h3>
          <span className="spiritual-card__badges-hint">
            Desbloquéalas al estudiar, servir y compartir el evangelio.
          </span>
        </div>

        {badgesUnlocked === 0 ? (
          <p className="spiritual-card__badges-empty">
            Aún no has desbloqueado insignias. Comienza con una actividad corta y vuelve a
            revisar aquí.
          </p>
        ) : (
          <div className="spiritual-card__badges-grid">
            {BADGE_CATALOG.map((badge) => {
              const isUnlocked = earnedBadges.some((earned) => earned.id === badge.id);
              return (
                <div
                  key={badge.id}
                  className={
                    'spiritual-card__badge ' +
                    (isUnlocked ? 'spiritual-card__badge--unlocked' : 'spiritual-card__badge--locked')
                  }
                >
                  <span className="spiritual-card__badge-icon">
                    {isUnlocked ? badge.icon : '🔒'}
                  </span>
                  <span className="spiritual-card__badge-label">
                    {isUnlocked ? badge.name : 'Bloqueada'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <footer className="spiritual-card__footer">
        <p>
          Recuerda: los puntos te motivan, pero el objetivo real es convertirte cada día en un
          discípulo misionero más parecido a Cristo.
        </p>
      </footer>
    </section>
  );
};

export default SpiritualProgressCard;

