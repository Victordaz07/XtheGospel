import React, { useState } from "react";
import { useI18n } from "../context/I18nContext";
import { MemberRoleToggle, MemberViewMode } from "../components/member/MemberRoleToggle";

// Mock hook - replace with actual implementation
const useMemberProfile = () => {
  // This is a placeholder - implement based on your actual profile system
  return {
    profile: {
      roleFlags: {
        isLeader: false, // Set to true if user has leadership calling
      },
    },
    loading: false,
    error: null,
  };
};

// Placeholder components - replace with actual implementations
const MemberMainView: React.FC<{ profile: any }> = ({ profile }) => {
  const { t } = useI18n();
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        {t("member.home.title")}
      </h2>
      <p className="text-slate-600">
        {t("member.home.welcomeSubtitle")}
      </p>
      {/* Add your member view content here */}
    </div>
  );
};

const MemberLeaderView: React.FC<{ profile: any }> = ({ profile }) => {
  const { t } = useI18n();
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Vista de líder
      </h2>
      <p className="text-slate-600">
        Contenido específico para líderes de barrio/estaca.
      </p>
      {/* Add your leader view content here */}
    </div>
  );
};

export const MemberMissionaryScreen: React.FC = () => {
  const { t } = useI18n();
  const { profile, loading, error } = useMemberProfile();
  const [viewMode, setViewMode] = useState<MemberViewMode>("member");

  const canUseLeaderView = !!profile?.roleFlags?.isLeader;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-500">
        {t("common.loading") ?? "Cargando..."}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-red-600">
        {t("common.error") ?? "Ocurrió un error al cargar tu perfil."}
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-6">
      {/* Toggle arriba */}
      <MemberRoleToggle
        mode={viewMode}
        canUseLeaderView={canUseLeaderView}
        onChange={setViewMode}
      />

      {/* Contenido según la vista */}
      {viewMode === "member" && <MemberMainView profile={profile} />}

      {viewMode === "leader" && canUseLeaderView && (
        <MemberLeaderView profile={profile} />
      )}
    </div>
  );
};

