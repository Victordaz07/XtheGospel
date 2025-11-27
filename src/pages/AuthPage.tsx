import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBook,
  FaSeedling,
  FaHandsPraying,
  FaUsers,
  FaArrowLeft,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { UserRoleKey, ALL_ROLES, ROLE_DEFINITIONS, getRoleDefaultRoute } from '../config/roles';
import './AuthPage.css';

type AuthView = 'welcome' | 'login' | 'register';

const AuthPage: React.FC = () => {
  const { login, isLoading, userRole } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<UserRoleKey | null>(null);
  const [view, setView] = useState<AuthView>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userRole) {
      // Navigate to role's default route using centralized configuration
      navigate(getRoleDefaultRoute(userRole), { replace: true });
    }
  }, [userRole, navigate]);

  const handleRoleSelection = (role: UserRoleKey) => {
    setSelectedRole(role);
  };

  const confirmLogin = async () => {
    if (!selectedRole) {
      alert(t('auth.selectRoleAlert'));
      return;
    }

    try {
      await login(selectedRole);
      // Navigate using centralized route configuration
      navigate(getRoleDefaultRoute(selectedRole), { replace: true });
    } catch (error) {
      alert(t('auth.loginError'));
      console.error('Login error:', error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    confirmLogin();
  };

  // Use centralized role definitions with i18n labels
  const roles = ALL_ROLES.map((roleId) => {
    const roleDef = ROLE_DEFINITIONS[roleId];
    // Map role IDs to icons (you can customize this)
    const iconMap: Record<UserRoleKey, React.ReactNode> = {
      investigator: <FaSeedling />,
      missionary: <FaHandsPraying />,
      member: <FaUsers />,
    };
    const accentClassMap: Record<UserRoleKey, string> = {
      investigator: 'role-icon-green',
      missionary: 'role-icon-blue',
      member: 'role-icon-violet',
    };

    return {
      id: roleId,
      icon: iconMap[roleId],
      title: t(roleDef.i18nKey) || t(`roles.${roleId}.short`) || roleId,
      description: t(`roles.${roleId}.description`) || '',
      accentClass: accentClassMap[roleId],
      cta: t(`auth.${roleId}Cta`) || t(`auth.${roleId}Cta`),
    };
  });

  const inspirationalQuote = {
    text: '"Come, follow me, and I will make you fishers of men."',
    ref: 'Matthew 4:19',
  };

  const renderRoleSelector = (variant: 'grid' | 'radio' = 'grid') => (
    <div className={`auth-role-${variant}`}>
      {roles.map((role) => (
        <button
          key={role.id}
          type="button"
          className={`role-card ${variant} ${selectedRole === role.id ? 'selected' : ''}`}
          onClick={() => handleRoleSelection(role.id)}
        >
          <div className={`role-icon ${role.accentClass}`}>{role.icon}</div>
          <div className="role-info">
            <h3>{role.title}</h3>
            <p>{role.description}</p>
            {variant === 'grid' && (
              <div className={`role-cta ${role.accentClass}`}>
                <span>{role.cta}</span>
              </div>
            )}
          </div>
          {selectedRole === role.id && <span className="role-check">✓</span>}
        </button>
      ))}
    </div>
  );

  const renderWelcome = () => (
    <>
      <header className="auth-header">
        <div className="auth-logo">
          <FaBook />
        </div>
        <h1>App Misional</h1>
        <p>{t('auth.selectRole') || 'Choose your role to begin your spiritual journey'}</p>
      </header>

      {renderRoleSelector('grid')}

      <button className="auth-primary-btn" onClick={confirmLogin} disabled={!selectedRole || isLoading}>
        {isLoading ? t('auth.loading') || 'Loading...' : t('auth.continue') || 'Continue'}
      </button>

      <section className="auth-quote">
        <FaHandsPraying className="quote-icon" />
        <p className="quote-text">{inspirationalQuote.text}</p>
        <p className="quote-ref">{inspirationalQuote.ref}</p>
      </section>

      <footer className="auth-footer">
        <button type="button" onClick={() => setView('login')}>
          {t('auth.haveAccount') || 'Already have an account?'} <span>{t('auth.signIn') || 'Sign In'}</span>
        </button>
        <div className="auth-links">
          <span>Privacy</span>
          <span>•</span>
          <span>Terms</span>
          <span>•</span>
          <span>Support</span>
        </div>
      </footer>
    </>
  );

  const renderForm = (mode: 'login' | 'register') => (
    <div className="auth-form-card">
      <header className="auth-form-header">
        <button className="back-btn" type="button" onClick={() => setView('welcome')}>
          <FaArrowLeft />
        </button>
        <div className="form-logo">
          <FaBook />
        </div>
        <div className="form-title">
          <h2>{mode === 'login' ? t('auth.loginTitle') || 'Welcome Back' : t('auth.registerTitle') || 'Create Account'}</h2>
          <p>
            {mode === 'login'
              ? t('auth.loginSubtitle') || 'Sign in to continue your journey'
              : t('auth.registerSubtitle') || 'Join our community and begin your spiritual journey'}
          </p>
        </div>
      </header>

      <form className="auth-form" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <label className="auth-field">
            <span>{t('auth.fullName') || 'Full Name'}</span>
            <div className="input-wrapper">
              <FaUserPlus />
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder={t('auth.fullNamePlaceholder') || 'Enter your full name'}
              />
            </div>
          </label>
        )}

        <label className="auth-field">
          <span>{t('auth.email') || 'Email Address'}</span>
          <div className="input-wrapper">
            <FaEnvelope />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your.email@example.com"
            />
          </div>
        </label>

        <label className="auth-field">
          <span>{t('auth.password') || 'Password'}</span>
          <div className="input-wrapper password">
            <FaLock />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t('auth.passwordPlaceholder') || 'Enter your password'}
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </label>

        <div className="auth-form-note">
          <span>
            {t('auth.roleHint') || 'Sign in as Investigator, Missionary, or Member'}
          </span>
        </div>

        {renderRoleSelector('radio')}

        <button type="submit" className="auth-primary-btn" disabled={!selectedRole || isLoading}>
          {isLoading
            ? t('auth.loading') || 'Loading...'
            : mode === 'login'
            ? t('auth.signIn') || 'Sign In'
            : t('auth.register') || 'Create Account'}
        </button>
      </form>

      <div className="auth-switch">
        <p>
          {mode === 'login'
            ? t('auth.noAccount') || "Don't have an account?"
            : t('auth.haveAccount') || 'Already have an account?'}
          <button type="button" onClick={() => setView(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? t('auth.register') || 'Sign up' : t('auth.signIn') || 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );

  return (
    <div className="auth-page">
      <div className="auth-mobile-shell">
        <div className="auth-decor deco-top" />
        <div className="auth-decor deco-bottom" />
        {view === 'welcome' ? renderWelcome() : renderForm(view)}
      </div>
    </div>
  );
};

export default AuthPage;

