/**
 * RegisterPage - Modern xTheGospel Registration
 * 
 * Registration flow:
 * 1. Login (default) - for existing users
 * 2. Select type - "Estoy conociendo la iglesia" vs "Ya soy miembro"
 * 3. Signup form - with ward code for members
 * 4. Success - shows xTheGospel ID
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaSpinner,
  FaCheck,
  FaSeedling,
  FaChurch,
  FaHashtag,
} from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';
import './RegisterPage.css';

type RegisterMode = 'login' | 'select-type' | 'signup-friend' | 'signup-member' | 'success';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUpWithEmail, signInWithEmail, login, profile } = useAuth();
  
  const [mode, setMode] = useState<RegisterMode>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wardCode, setWardCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [isMember, setIsMember] = useState(false);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setWardCode('');
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmail(email, password);
      // Don't set role here - the profile already has memberStatus
      // The app will read it from the profile
      navigate('/home', { replace: true });
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found') {
        setError('No existe una cuenta con este email');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Contraseña incorrecta');
      } else if (err.code === 'auth/invalid-email') {
        setError('Email inválido');
      } else {
        setError(err.message || 'Error al iniciar sesión');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Por favor ingresa tu nombre');
      return;
    }
    if (!email.trim()) {
      setError('Por favor ingresa tu email');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // If member with ward code, validate it first
    // TODO: Implement ward code validation when service is ready
    if (isMember && wardCode.trim()) {
      // For now, just log it - will validate when wardCodeService is ready
      console.log('Ward code provided:', wardCode);
    }

    try {
      setLoading(true);
      // Pass isMember flag to set correct memberStatus
      await signUpWithEmail(email, password, fullName, isMember);
      
      // Set appropriate role based on member status
      await login(isMember ? 'member' : 'investigator');
      
      setCreatedId(profile?.xthegospelId || 'XTG-PENDING');
      setMode('success');
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Este email ya está registrado. Intenta iniciar sesión.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Email inválido');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres');
      } else {
        setError(err.message || 'Error al crear cuenta');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigate('/home', { replace: true });
  };

  const handleSelectType = (memberType: boolean) => {
    setIsMember(memberType);
    resetForm();
    setMode(memberType ? 'signup-member' : 'signup-friend');
  };

  // Login Form (Default)
  const renderLogin = () => (
    <div className="reg-container">
      <div className="reg-header">
        <div className="reg-logo">
          <span className="reg-logo-icon">✦</span>
        </div>
        <h1 className="reg-title">Bienvenido</h1>
        <p className="reg-subtitle">Inicia sesión en tu cuenta xTheGospel</p>
      </div>

      <form className="reg-form" onSubmit={handleLogin}>
        <div className="reg-field">
          <label>Correo Electrónico</label>
          <div className="reg-input-wrapper">
            <FaEnvelope className="reg-input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="reg-field">
          <label>Contraseña</label>
          <div className="reg-input-wrapper">
            <FaLock className="reg-input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="reg-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button type="button" className="reg-forgot">
          ¿Olvidaste tu contraseña?
        </button>

        {error && (
          <div className="reg-error">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="reg-submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="reg-spinner" />
              Iniciando sesión...
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </button>
      </form>

      <p className="reg-switch">
        ¿No tienes cuenta?{' '}
        <button type="button" onClick={() => { setMode('select-type'); setError(null); }}>
          Crear una
        </button>
      </p>
    </div>
  );

  // Select Type Screen - Friend or Member
  const renderSelectType = () => (
    <div className="reg-container">
      <button className="reg-back" onClick={() => { setMode('login'); setError(null); }}>
        <FaArrowLeft />
        <span>Volver</span>
      </button>

      <div className="reg-header">
        <div className="reg-logo">
          <span className="reg-logo-icon">✦</span>
        </div>
        <h1 className="reg-title">Crear Cuenta</h1>
        <p className="reg-subtitle">¿Cómo te describes mejor?</p>
      </div>

      <div className="reg-type-options">
        <button 
          className="reg-type-option"
          onClick={() => handleSelectType(false)}
        >
          <div className="reg-type-icon reg-type-icon--friend">
            <FaSeedling />
          </div>
          <div className="reg-type-content">
            <h3>Estoy conociendo la iglesia</h3>
            <p>Soy nuevo y quiero aprender sobre el evangelio</p>
          </div>
          <span className="reg-type-arrow">→</span>
        </button>

        <button 
          className="reg-type-option"
          onClick={() => handleSelectType(true)}
        >
          <div className="reg-type-icon reg-type-icon--member">
            <FaChurch />
          </div>
          <div className="reg-type-content">
            <h3>Ya soy miembro bautizado</h3>
            <p>Quiero registrar mi cuenta de miembro</p>
          </div>
          <span className="reg-type-arrow">→</span>
        </button>
      </div>

      <div className="reg-footer">
        <p className="reg-footer-note">
          Puedes cambiar tu estado más adelante si te bautizas
        </p>
      </div>
    </div>
  );

  // Signup Form for Friends (Conociendo la iglesia)
  const renderSignupFriend = () => (
    <div className="reg-container">
      <button className="reg-back" onClick={() => { setMode('select-type'); setError(null); }}>
        <FaArrowLeft />
        <span>Volver</span>
      </button>

      <div className="reg-header reg-header--compact">
        <div className="reg-type-badge reg-type-badge--friend">
          <FaSeedling />
          <span>Conociendo la iglesia</span>
        </div>
        <h1 className="reg-title">Crear Cuenta</h1>
        <p className="reg-subtitle">Comienza tu camino espiritual</p>
      </div>

      <form className="reg-form" onSubmit={handleSignup}>
        <div className="reg-field">
          <label>Nombre Completo</label>
          <div className="reg-input-wrapper">
            <FaUser className="reg-input-icon" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Tu nombre"
              autoComplete="name"
            />
          </div>
        </div>

        <div className="reg-field">
          <label>Correo Electrónico</label>
          <div className="reg-input-wrapper">
            <FaEnvelope className="reg-input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="reg-field">
          <label>Contraseña</label>
          <div className="reg-input-wrapper">
            <FaLock className="reg-input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="reg-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {error && (
          <div className="reg-error">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="reg-submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="reg-spinner" />
              Creando cuenta...
            </>
          ) : (
            'Crear Mi Cuenta'
          )}
        </button>
      </form>

      <p className="reg-terms">
        Al crear tu cuenta, aceptas nuestros{' '}
        <a href="/terms">Términos</a> y{' '}
        <a href="/privacy">Privacidad</a>
      </p>
    </div>
  );

  // Signup Form for Members
  const renderSignupMember = () => (
    <div className="reg-container">
      <button className="reg-back" onClick={() => { setMode('select-type'); setError(null); }}>
        <FaArrowLeft />
        <span>Volver</span>
      </button>

      <div className="reg-header reg-header--compact">
        <div className="reg-type-badge reg-type-badge--member">
          <FaChurch />
          <span>Miembro bautizado</span>
        </div>
        <h1 className="reg-title">Crear Cuenta</h1>
        <p className="reg-subtitle">Registra tu cuenta de miembro</p>
      </div>

      <form className="reg-form" onSubmit={handleSignup}>
        <div className="reg-field">
          <label>Nombre Completo</label>
          <div className="reg-input-wrapper">
            <FaUser className="reg-input-icon" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Tu nombre"
              autoComplete="name"
            />
          </div>
        </div>

        <div className="reg-field">
          <label>Correo Electrónico</label>
          <div className="reg-input-wrapper">
            <FaEnvelope className="reg-input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="reg-field">
          <label>Contraseña</label>
          <div className="reg-input-wrapper">
            <FaLock className="reg-input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="reg-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="reg-field">
          <label>
            Código de Barrio <span className="reg-optional">(opcional)</span>
          </label>
          <div className="reg-input-wrapper">
            <FaHashtag className="reg-input-icon" />
            <input
              type="text"
              value={wardCode}
              onChange={(e) => setWardCode(e.target.value.toUpperCase())}
              placeholder="Ej: CENTRO-2026-X7K9"
              autoComplete="off"
            />
          </div>
          <p className="reg-field-hint">
            Si tu líder te dio un código, ingrésalo para unirte a tu barrio
          </p>
        </div>

        {error && (
          <div className="reg-error">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="reg-submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="reg-spinner" />
              Creando cuenta...
            </>
          ) : (
            'Crear Mi Cuenta'
          )}
        </button>
      </form>

      <div className="reg-footer">
        <p className="reg-footer-note">
          Tu cuenta quedará pendiente de verificación por un líder
        </p>
      </div>

      <p className="reg-terms">
        Al crear tu cuenta, aceptas nuestros{' '}
        <a href="/terms">Términos</a> y{' '}
        <a href="/privacy">Privacidad</a>
      </p>
    </div>
  );

  // Success Screen
  const renderSuccess = () => (
    <div className="reg-container reg-container--success">
      <div className="reg-success-icon">
        <FaCheck />
      </div>
      
      <h1 className="reg-success-title">¡Cuenta Creada!</h1>
      <p className="reg-success-subtitle">
        {isMember 
          ? 'Bienvenido de vuelta a la familia' 
          : 'Bienvenido a tu camino espiritual'}
      </p>

      <div className="reg-id-card">
        <span className="reg-id-label">Tu xTheGospel ID</span>
        <span className="reg-id-value">{profile?.xthegospelId || createdId}</span>
        <span className="reg-id-hint">
          {isMember 
            ? 'Comparte este ID con tu líder para verificar tu cuenta'
            : 'Guarda este ID para tu registro futuro'}
        </span>
      </div>

      {isMember && (
        <div className="reg-pending-notice">
          <span>Tu cuenta está pendiente de verificación</span>
          <p>Un líder de tu barrio verificará tu cuenta pronto</p>
        </div>
      )}

      <button 
        className="reg-submit"
        onClick={handleContinue}
      >
        Comenzar
      </button>
    </div>
  );

  return (
    <div className="reg-page">
      {mode === 'login' && renderLogin()}
      {mode === 'select-type' && renderSelectType()}
      {mode === 'signup-friend' && renderSignupFriend()}
      {mode === 'signup-member' && renderSignupMember()}
      {mode === 'success' && renderSuccess()}
    </div>
  );
};

export default RegisterPage;
