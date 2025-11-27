import React from "react";
import { useI18n } from "../../context/I18nContext";

export type MemberViewMode = "member" | "leader";

type Props = {
  mode: MemberViewMode;
  canUseLeaderView: boolean;
  onChange: (mode: MemberViewMode) => void;
};

export const MemberRoleToggle: React.FC<Props> = ({
  mode,
  canUseLeaderView,
  onChange,
}) => {
  const { t } = useI18n();

  const handleClick = (next: MemberViewMode) => {
    if (next === "leader" && !canUseLeaderView) return;
    onChange(next);
  };

  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 shadow-sm">
      <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {t("member.viewMode.title")}
          </h2>
          <p className="text-xs text-slate-500">
            {t("member.viewMode.subtitle")}
          </p>
        </div>

        <div className="mt-3 inline-flex items-center justify-center rounded-full bg-white p-1 shadow-inner md:mt-0">
          <button
            type="button"
            onClick={() => handleClick("member")}
            className={[
              "relative rounded-full px-4 py-1.5 text-xs font-medium transition",
              mode === "member"
                ? "bg-sky-600 text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            ].join(" ")}
          >
            {t("member.viewMode.member")}
          </button>

          <button
            type="button"
            onClick={() => handleClick("leader")}
            className={[
              "relative ml-1 rounded-full px-4 py-1.5 text-xs font-medium transition",
              !canUseLeaderView
                ? "cursor-not-allowed text-slate-400"
                : mode === "leader"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            ].join(" ")}
          >
            {t("member.viewMode.leader")}
            {!canUseLeaderView && (
              <span className="ml-1 text-[9px] uppercase tracking-wide">
                🔒
              </span>
            )}
          </button>
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-slate-500">
        {canUseLeaderView
          ? t("member.viewMode.helper")
          : t("member.viewMode.leaderLocked")}
      </p>
    </section>
  );
};

