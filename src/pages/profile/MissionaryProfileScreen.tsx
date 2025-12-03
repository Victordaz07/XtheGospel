import React, { useState, useMemo, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useI18n, Locale } from '../../context/I18nContext';
import { LeadershipRoleService } from '../../services/leadershipRoleService';
import { getLeadershipRoleConfig } from '../../data/missionary/leadershipMode';
import { useRoleStore } from '../../store/useRoleStore';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import '../../styles/xthegospel-ui.css';
import './MissionaryProfileScreen.css';

type ActiveAppRole = 'INVESTIGATOR' | 'MISSIONARY' | 'MEMBER';

const DEFAULT_AVATAR = 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg';

const languageOptions: { code: Locale; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

export const MissionaryProfileScreen: React.FC = () => {
  const { userRole, logout } = useAuth();
  const { locale, setLocale, t } = useI18n();
  const navigate = useNavigate();
  const appRole = useRoleStore((s) => s.role);
  const setRole = useRoleStore((s) => s.setRole);

  const [formState, setFormState] = useState({
    fullName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 987-6543',
    address: '123 Mission Street · Salt Lake City, UT',
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(DEFAULT_AVATAR);

  // Determinar rol activo en la app
  const activeAppRole: ActiveAppRole = useMemo(() => {
    if (userRole === 'investigator') return 'INVESTIGATOR';
    if (userRole === 'missionary') return 'MISSIONARY';
    return 'MEMBER';
  }, [userRole]);

  // Determinar si está en modo liderazgo
  const isLeadershipMode = useMemo(() => {
    if (userRole !== 'missionary') return false;
    try {
      const leadershipRole = LeadershipRoleService.getCurrentRole();
      return leadershipRole !== 'none';
    } catch {
      return false;
    }
  }, [userRole]);

  // Obtener etiqueta de liderazgo
  const leadershipLabel = useMemo(() => {
    if (!isLeadershipMode) return undefined;
    try {
      const leadershipRole = LeadershipRoleService.getCurrentRole();
      if (leadershipRole === 'none') return undefined;
      const config = getLeadershipRoleConfig(leadershipRole);
      return config.title;
    } catch {
      return undefined;
    }
  }, [isLeadershipMode]);

  // Fecha de miembro desde (mock por ahora)
  const memberSinceLabel = useMemo(() => {
    const date = new Date('2023-06-01');
    return new Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(date);
  }, [locale]);

  const handleChange = (field: keyof typeof formState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setShowSavedMessage(false);
    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSavingProfile(false);
    setShowSavedMessage(true);
    setTimeout(() => setShowSavedMessage(false), 3000);
  };

  const handleToggleLeadershipMode = () => {
    if (isLeadershipMode) {
      // Salir del modo liderazgo
      LeadershipRoleService.clearRole();
      // Redirigir a la pantalla de recordatorio de identidad
      navigate('/identity-reminder');
    } else {
      // Activar modo liderazgo (esto normalmente lo haría un presidente/asistente)
      // Por ahora, solo mostramos un mensaje
      alert('El modo liderazgo debe ser activado por tu presidente de misión o asistentes.');
    }
  };

  const handleChangeActiveRole = () => {
    // Abrir modal/sheet para cambiar de rol
    navigate('/auth');
  };

  const handleChangeLanguage = () => {
    setShowLanguageModal(true);
  };

  const handleLanguageSelect = async (code: Locale) => {
    await setLocale(code);
    setShowLanguageModal(false);
  };

  const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const appRoleLabel =
    activeAppRole === 'INVESTIGATOR'
      ? 'Investigador'
      : activeAppRole === 'MISSIONARY'
      ? 'Misionero'
      : 'Miembro';

  const currentLanguage = languageOptions.find((opt) => opt.code === locale);
  const langLabel = currentLanguage?.name || 'Español';

  return (
    <div className="xtg-screen xtg-profile-screen">
      <XtgPage
        title="Perfil"
        subtitle="Configuración y preferencias personales"
      >
        <div className="xtg-section xtg-stack-lg">
          {/* Tarjeta de identidad */}
          <section className="xtg-card xtg-profile-identity-card">
            <div className="xtg-profile-identity-main">
              <div className="xtg-profile-avatar-wrapper">
                <div className="xtg-profile-avatar">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={formState.fullName} />
                  ) : (
                    <span>{formState.fullName.charAt(0)}</span>
                  )}
                </div>
                <button
                  type="button"
                  className="xtg-profile-avatar-button"
                  onClick={() => avatarInputRef.current?.click()}
                >
                  Cambiar foto
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarUpload}
                />
              </div>

              <div className="xtg-profile-identity-text">
                <h2 className="xtg-profile-name">{formState.fullName}</h2>

                <div className="xtg-profile-badges">
                  <span className="xtg-badge xtg-badge-primary">{appRoleLabel}</span>
                  {isLeadershipMode && leadershipLabel && (
                    <span className="xtg-badge xtg-badge-leadership">{leadershipLabel}</span>
                  )}
                </div>

                <p className="xtg-profile-member-since">
                  {userRole === 'missionary' ? 'En la misión desde' : 'Miembro desde'} {memberSinceLabel}
                </p>
              </div>
            </div>

            {isLeadershipMode && (
              <div className="xtg-profile-leadership-note">
                Aunque sirves en un rol de liderazgo, sigues siendo un misionero regular consagrado a predicar el Evangelio. El modo liderazgo solo agrega herramientas; no cambia tu valor delante del Señor.
              </div>
            )}
          </section>

          {/* Datos personales */}
          <XtgCard title="🧍‍♂️ Información personal">
            <div>
              <p className="xtg-card-subtitle">
                Mantén tus datos actualizados para que la misión pueda contactarte de forma segura.
              </p>

            <form onSubmit={handleSubmit} className="xtg-form">
              <label className="xtg-field">
                <span className="xtg-field-label">Nombre completo</span>
                <input
                  type="text"
                  value={formState.fullName}
                  onChange={handleChange('fullName')}
                  className="xtg-input"
                />
              </label>

              <label className="xtg-field">
                <span className="xtg-field-label">Correo electrónico</span>
                <input
                  type="email"
                  value={formState.email}
                  onChange={handleChange('email')}
                  className="xtg-input"
                />
              </label>

              <label className="xtg-field">
                <span className="xtg-field-label">Teléfono</span>
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={handleChange('phone')}
                  className="xtg-input"
                />
              </label>

              <label className="xtg-field">
                <span className="xtg-field-label">Dirección (opcional)</span>
                <input
                  type="text"
                  value={formState.address}
                  onChange={handleChange('address')}
                  className="xtg-input"
                />
              </label>

              <button type="submit" className="xtg-button-primary xtg-button-full" disabled={isSavingProfile}>
                {isSavingProfile ? 'Guardando...' : 'Guardar perfil'}
              </button>
              {showSavedMessage && (
                <p className="xtg-form-message xtg-form-message-success">✓ Guardado</p>
              )}
            </form>
            </div>
          </XtgCard>

          {/* Modo liderazgo */}
          {userRole === 'missionary' && (
            <XtgCard title="🛡️ Mi llamamiento actual">
              <div>
                <p className="xtg-card-subtitle">
                  Administra las herramientas de liderazgo asignadas por tu presidente de misión.
                </p>

              <div className="xtg-profile-row">
                <div>
                  <p className="xtg-profile-row-title">
                    {isLeadershipMode
                      ? leadershipLabel ?? 'Modo liderazgo activo'
                      : 'Misionero regular (sin rol de liderazgo activo)'}
                  </p>
                  <p className="xtg-profile-row-text">
                    {isLeadershipMode
                      ? 'Puedes desactivar el modo liderazgo para usar solo las herramientas de misionero regular.'
                      : 'Si recibiste un llamamiento de liderazgo, tu presidente o asistentes pueden activar las herramientas adicionales.'}
                  </p>
                </div>

                <button
                  type="button"
                  className="xtg-button-ghost"
                  onClick={handleToggleLeadershipMode}
                >
                  {isLeadershipMode ? 'Salir de modo liderazgo' : 'Activar modo liderazgo'}
                </button>
              </div>
              </div>
            </XtgCard>
          )}

          {/* Contexto de uso + idioma */}
          <XtgCard title="📚 Configuración">
            <div>
              <p className="xtg-card-subtitle">
                Ajusta cómo usas la app y en qué idioma la ves.
              </p>

            <div className="xtg-profile-row">
              <div>
                <p className="xtg-profile-row-title">Rol actual en la app</p>
                <p className="xtg-profile-row-text">
                  Estás usando la app como: <strong>{appRoleLabel}</strong>.
                </p>
              </div>
              <button
                type="button"
                className="xtg-button-ghost"
                onClick={handleChangeActiveRole}
              >
                Cambiar rol
              </button>
            </div>

            <div className="xtg-profile-row">
              <div>
                <p className="xtg-profile-row-title">Idioma preferido</p>
                <p className="xtg-profile-row-text">{langLabel}</p>
              </div>
              <button
                type="button"
                className="xtg-button-ghost"
                onClick={handleChangeLanguage}
              >
                Cambiar idioma
              </button>
            </div>
            </div>
          </XtgCard>

          {/* Privacidad / seguridad */}
          <XtgCard title="🔐 Privacidad y seguridad">
            <div>
              <p className="xtg-card-subtitle">
                xTheGospel / For The Gospel utiliza autenticación segura (por ejemplo, Firebase Auth) y almacenamiento cifrado. No se exponen datos sensibles de miembros ni de ordenanzas; tú decide qué registrar y compartir.
              </p>

            <div className="xtg-profile-links-row">
              <button
                type="button"
                className="xtg-link-button"
                onClick={() => navigate('/privacy')}
              >
                Privacy
              </button>
              <span className="xtg-dot">•</span>
              <button
                type="button"
                className="xtg-link-button"
                onClick={() => navigate('/terms')}
              >
                Terms
              </button>
              <span className="xtg-dot">•</span>
              <button
                type="button"
                className="xtg-link-button"
                onClick={() => navigate('/support')}
              >
                Support
              </button>
            </div>
            </div>
          </XtgCard>

          {/* Logout */}
          <section className="xtg-profile-logout-section">
            <button
              type="button"
              className="xtg-button-danger xtg-button-full"
              onClick={logout}
            >
              Cerrar sesión
            </button>
          </section>
        </div>
      </XtgPage>

      {/* Modal de idioma */}
      {showLanguageModal && (
        <div className="xtg-modal-backdrop" onClick={() => setShowLanguageModal(false)}>
          <div className="xtg-modal-panel" onClick={(e) => e.stopPropagation()}>
            <h3 className="xtg-modal-title">Idioma</h3>
            <div className="xtg-modal-language-list">
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  className={`xtg-modal-language-option ${locale === option.code ? 'selected' : ''}`}
                  onClick={() => handleLanguageSelect(option.code)}
                >
                  <span>
                    {option.flag} {option.name}
                  </span>
                  {locale === option.code && <span className="xtg-checkmark">✓</span>}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="xtg-button-ghost xtg-button-full"
              onClick={() => setShowLanguageModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

