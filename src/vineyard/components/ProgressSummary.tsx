import React, { useMemo } from 'react';
import { useMemberProgressStore } from '../state/memberProgressStore';

const LEVEL_BOUNDARIES = [
  { level: 1, min: 0, max: 199, name: 'Principiante', icon: '🌱', color: 'emerald' },
  { level: 2, min: 200, max: 499, name: 'Discípulo', icon: '📖', color: 'blue' },
  { level: 3, min: 500, max: 999, name: 'Mentor', icon: '🌟', color: 'purple' },
  { level: 4, min: 1000, max: Infinity, name: 'Guía', icon: '👑', color: 'amber' },
];

const BADGE_CATALOG = [
  { id: 'primer-estudio', name: 'Primera Luz', description: 'Completaste tu primera sección de estudio.', icon: '💡', color: 'yellow' },
  { id: 'companion-fiel', name: 'Compañero Fiel', description: 'Terminaste tres actividades interactivas.', icon: '🤝', color: 'blue' },
  { id: 'disciplina-constante', name: 'Discípulo Constante', description: 'Mantén una racha de estudio de 5 días.', icon: '🔥', color: 'orange' },
  { id: 'mentor-de-fe', name: 'Mentor de Fe', description: 'Alcanza el nivel 2.', icon: '📚', color: 'indigo' },
  { id: 'faro-del-barrio', name: 'Faro del Barrio', description: 'Alcanza el nivel 3.', icon: '🏮', color: 'purple' },
  { id: 'guardian-del-templo', name: 'Guardián del Templo', description: 'Completaste todas las secciones del módulo de nuevos conversos.', icon: '⛪', color: 'amber' },
];

const getCurrentLevelWindow = (level: number) => LEVEL_BOUNDARIES.find((entry) => entry.level === level) ?? LEVEL_BOUNDARIES[0];

export const ProgressSummary: React.FC = () => {
  const progress = useMemberProgressStore((state) => state.progress);

  const currentWindow = getCurrentLevelWindow(progress.level);
  const xpIntoLevel = Math.max(progress.xp - currentWindow.min, 0);
  const xpWindowSize = currentWindow.max === Infinity ? 400 : currentWindow.max - currentWindow.min + 1;
  const progressPercent = Math.min(100, Math.round((xpIntoLevel / xpWindowSize) * 100));
  const xpToNextLevel = currentWindow.max === Infinity ? '∞' : `${Math.max(currentWindow.max + 1 - progress.xp, 0)} XP`;

  const earnedBadgeIds = useMemo(() => new Set(progress.earnedBadges.map((b) => b.id)), [progress.earnedBadges]);

  const getColorClasses = (color: string, isEarned: boolean) => {
    const colors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
      yellow: {
        bg: isEarned ? 'bg-yellow-50' : 'bg-slate-50',
        border: isEarned ? 'border-yellow-300' : 'border-slate-200',
        text: isEarned ? 'text-yellow-800' : 'text-slate-400',
        icon: isEarned ? 'text-yellow-600' : 'text-slate-300',
      },
      blue: {
        bg: isEarned ? 'bg-blue-50' : 'bg-slate-50',
        border: isEarned ? 'border-blue-300' : 'border-slate-200',
        text: isEarned ? 'text-blue-800' : 'text-slate-400',
        icon: isEarned ? 'text-blue-600' : 'text-slate-300',
      },
      orange: {
        bg: isEarned ? 'bg-orange-50' : 'bg-slate-50',
        border: isEarned ? 'border-orange-300' : 'border-slate-200',
        text: isEarned ? 'text-orange-800' : 'text-slate-400',
        icon: isEarned ? 'text-orange-600' : 'text-slate-300',
      },
      indigo: {
        bg: isEarned ? 'bg-indigo-50' : 'bg-slate-50',
        border: isEarned ? 'border-indigo-300' : 'border-slate-200',
        text: isEarned ? 'text-indigo-800' : 'text-slate-400',
        icon: isEarned ? 'text-indigo-600' : 'text-slate-300',
      },
      purple: {
        bg: isEarned ? 'bg-purple-50' : 'bg-slate-50',
        border: isEarned ? 'border-purple-300' : 'border-slate-200',
        text: isEarned ? 'text-purple-800' : 'text-slate-400',
        icon: isEarned ? 'text-purple-600' : 'text-slate-300',
      },
      amber: {
        bg: isEarned ? 'bg-amber-50' : 'bg-slate-50',
        border: isEarned ? 'border-amber-300' : 'border-slate-200',
        text: isEarned ? 'text-amber-800' : 'text-slate-400',
        icon: isEarned ? 'text-amber-600' : 'text-slate-300',
      },
    };
    return colors[color] || colors.yellow;
  };

  // Circular progress calculation
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Progress Card */}
      <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8 shadow-lg">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-600 font-semibold mb-2">Progreso espiritual</p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-5xl font-bold text-slate-900">Nivel {progress.level}</h2>
              <span className="text-2xl">{currentWindow.icon}</span>
            </div>
            <p className="text-sm text-slate-600 mt-1">{currentWindow.name}</p>
          </div>
          
          {/* Streak Card */}
          <div className="rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 px-5 py-4 text-white shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🔥</span>
              <p className="text-xs uppercase tracking-wide font-semibold opacity-90">Racha</p>
            </div>
            <p className="text-3xl font-bold">{progress.streakDays}</p>
            <p className="text-xs opacity-90">días consecutivos</p>
          </div>
        </div>

        {/* XP Display */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">XP Total</span>
            <span className="text-2xl font-bold text-indigo-600">{progress.xp.toLocaleString()}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-600 mb-3">
            <span>Progreso del nivel actual</span>
            <span className="text-indigo-600">{progressPercent}%</span>
          </div>
          <div className="relative h-6 rounded-full bg-slate-200 overflow-hidden shadow-inner">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-slate-700 z-10">{xpIntoLevel} / {xpWindowSize === Infinity ? '∞' : xpWindowSize} XP</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500 text-center">
            <span className="font-semibold text-indigo-600">{xpToNextLevel}</span> para el siguiente nivel
          </p>
        </div>

        {/* Motivational Message */}
        <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 text-sm text-slate-700 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-xl">💭</span>
            <p className="leading-relaxed">
              <strong className="text-indigo-700">Recuerda:</strong> Los puntos te motivan, pero el objetivo es convertirte en un discípulo misionero más parecido a Cristo.
            </p>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🏆</span>
          <h3 className="text-lg font-bold text-slate-900">Insignias</h3>
        </div>
        
        {progress.earnedBadges.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-3 opacity-30">🔒</div>
            <p className="text-sm text-slate-500 font-medium">Aún no has desbloqueado insignias</p>
            <p className="text-xs text-slate-400 mt-1">Sigue estudiando y sirviendo</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {BADGE_CATALOG.map((badge) => {
              const isEarned = earnedBadgeIds.has(badge.id);
              const colors = getColorClasses(badge.color, isEarned);
              
              return (
                <div
                  key={badge.id}
                  className={`rounded-2xl border-2 ${colors.border} ${colors.bg} p-4 transition-all duration-300 ${
                    isEarned ? 'shadow-md hover:shadow-lg transform hover:scale-[1.02]' : 'opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-2xl ${colors.icon} flex-shrink-0`}>
                      {badge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${colors.text} mb-1`}>
                        {badge.name}
                        {isEarned && <span className="ml-2 text-xs">✓</span>}
                      </p>
                      <p className={`text-xs ${colors.text} opacity-80 leading-relaxed`}>
                        {badge.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

