import React, { useMemo } from 'react';
import { useI18n } from '../../context/I18nContext';
import { useMemberProgressStore } from '../../vineyard/state/memberProgressStore';
import { memberStudyModules } from '../../vineyard/data/memberStudyModules';
import { memberActivities } from '../../vineyard/data/memberActivities';
import { SpiritualProgressCard } from '../../vineyard/components/SpiritualProgressCard';
import { buildSectionProgressId } from '../../vineyard/utils/progressIds';
import './ProgressPage.css';

const LEVEL_BOUNDARIES = [
  { level: 1, min: 0, max: 199, name: 'Principiante' },
  { level: 2, min: 200, max: 499, name: 'Discípulo' },
  { level: 3, min: 500, max: 999, name: 'Mentor' },
  { level: 4, min: 1000, max: Infinity, name: 'Guía' },
];

const BADGE_CATALOG_TOTAL = 6;

export const ProgressPage: React.FC = () => {
  const { t } = useI18n();
  const progress = useMemberProgressStore(state => state.progress);
  const completedStudySectionIds = useMemberProgressStore(
    state => state.completedStudySectionIds,
  );

  // Calculate level progress data
  const currentWindow =
    LEVEL_BOUNDARIES.find(entry => entry.level === progress.level) ??
    LEVEL_BOUNDARIES[0];
  const xpIntoLevel = Math.max(progress.xp - currentWindow.min, 0);
  const xpWindowSize =
    currentWindow.max === Infinity
      ? 400
      : currentWindow.max - currentWindow.min + 1;

  const completedSectionsList = useMemo(() => {
    const entries: { moduleTitle: string; sectionTitle: string }[] = [];
    memberStudyModules.forEach(module => {
      module.sections.forEach(section => {
        if (
          completedStudySectionIds.includes(
            buildSectionProgressId(module.id, section.id),
          )
        ) {
          entries.push({
            moduleTitle: module.title,
            sectionTitle: section.title,
          });
        }
      });
    });
    return entries;
  }, [completedStudySectionIds]);

  const completedActivities = useMemo(() => {
    return memberActivities.filter(activity =>
      progress.completedActivityIds.includes(activity.id),
    );
  }, [progress.completedActivityIds]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      {/* Header Card */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-4 shadow-lg">
            <span className="text-3xl">📊</span>
          </div>
          <div className="flex-1">
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-600 font-semibold mb-2">
              Progreso integral
            </p>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              Tu camino como miembro misionero
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Observa tu crecimiento. El progreso verdadero es espiritual, y
              estos indicadores solo te recuerdan lo que el Señor ya está
              haciendo en ti.
            </p>
          </div>
        </div>
      </div>

      {/* Spiritual Progress Card */}
      <SpiritualProgressCard
        level={progress.level}
        levelLabel={currentWindow.name}
        totalXp={progress.xp}
        currentLevelXp={xpIntoLevel}
        nextLevelXp={xpWindowSize}
        streakDays={progress.streakDays}
        badgesUnlocked={progress.earnedBadges.length}
        badgesTotal={BADGE_CATALOG_TOTAL}
        earnedBadges={progress.earnedBadges}
      />

      {/* Study and Activities Cards */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Study Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-3">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-emerald-600 font-semibold">
                  Estudio registrado
                </p>
                <h2 className="text-2xl font-bold text-slate-900">
                  {completedSectionsList.length} secciones
                </h2>
              </div>
            </div>
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
              Texto serio primero
            </span>
          </div>
          <div className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {completedSectionsList.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                <span className="text-3xl opacity-30 mb-2 block">📖</span>
                <p className="text-sm text-slate-500 font-medium">
                  Aún no marcas secciones como estudiadas
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Empieza en "Estudiar"
                </p>
              </div>
            ) : (
              completedSectionsList.map(entry => (
                <div
                  key={`${entry.moduleTitle}-${entry.sectionTitle}`}
                  className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-white px-4 py-3 text-sm text-slate-700 hover:shadow-md transition-shadow"
                >
                  <p className="font-semibold text-slate-900 mb-1">
                    {entry.sectionTitle}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium">
                    {entry.moduleTitle}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activities Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-100 p-3">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-indigo-600 font-semibold">
                  Actividades completadas
                </p>
                <h2 className="text-2xl font-bold text-slate-900">
                  {completedActivities.length} prácticas
                </h2>
              </div>
            </div>
            <span className="rounded-full bg-indigo-50 border border-indigo-200 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm">
              Motivación sana
            </span>
          </div>
          <div className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {completedActivities.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                <span className="text-3xl opacity-30 mb-2 block">🎮</span>
                <p className="text-sm text-slate-500 font-medium">
                  Todavía no terminas actividades
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Revisa "Practicar"
                </p>
              </div>
            ) : (
              completedActivities.map(activity => (
                <div
                  key={activity.id}
                  className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-white px-4 py-3 text-sm text-slate-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 mb-1">
                        {activity.title}
                      </p>
                      <p className="text-xs text-indigo-600 font-medium">
                        {t(`member.activityTypes.${activity.type}`) ??
                          activity.type}
                      </p>
                    </div>
                    <div className="ml-3 rounded-lg bg-indigo-100 px-2.5 py-1">
                      <span className="text-xs font-bold text-indigo-700">
                        +{activity.xp} XP
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500 text-center">
              <span className="font-semibold">💡</span> Puedes repetir
              actividades para repasar, pero el XP solo se otorga una vez.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
