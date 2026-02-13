/**
 * Data & Privacy Section
 * 
 * Shows cloud sync toggle and auth actions.
 * Only visible in DEV mode or if explicitly enabled.
 * 
 * Note: Leadership data sync has been moved to the xthegospel-leaders app.
 * This component now only handles authentication for the members app.
 */

import React, { useState, useEffect } from 'react';
import { FLAGS } from '../../config/featureFlags';
import { useAuthStore } from '../../state/auth/useAuthStore';
import { signIn, signUp, signOut } from '../../services/firebase/authService';

export const DataPrivacySection: React.FC = () => {
  const { user, loading: authLoadingState } = useAuthStore();
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(FLAGS.CLOUD_SYNC_ENABLED);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  
  // Auth form state
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    // Update local state when FLAGS changes (e.g., via env var)
    setCloudSyncEnabled(FLAGS.CLOUD_SYNC_ENABLED);
  }, []);

  const handleToggleCloudSync = () => {
    const newValue = !cloudSyncEnabled;
    setCloudSyncEnabled(newValue);
    setMessage({
      type: 'info',
      text: `Cloud Sync ${newValue ? 'enabled' : 'disabled'}. Restart app with VITE_CLOUD_SYNC_ENABLED=${newValue} to persist.`,
    });
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setMessage(null);

    try {
      if (authMode === 'signup') {
        await signUp(email, password);
        setMessage({ type: 'success', text: 'Account created successfully' });
        setShowAuthForm(false);
      } else {
        await signIn(email, password);
        setMessage({ type: 'success', text: 'Signed in successfully' });
        setShowAuthForm(false);
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Authentication failed' });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setMessage({ type: 'success', text: 'Signed out successfully' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to sign out' });
    }
  };

  // Only show in DEV mode (check if we're in development)
  const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development';

  if (!isDev) {
    return null; // Hide in production
  }

  return (
    <div className="xtg-card xtg-stack-md">
      <h2 className="xtg-card-title">☁️ Data & Privacy (Beta)</h2>
      
      {/* Auth Section */}
      <div className="xtg-stack-sm">
        {!user ? (
          <div>
            <p className="xtg-card-subtitle">
              Sign in to enable cloud sync for your data.
            </p>
            {!showAuthForm ? (
              <div className="xtg-stack-xs">
                <button
                  type="button"
                  className="xtg-button-primary"
                  onClick={() => setShowAuthForm(true)}
                >
                  Sign In / Sign Up
                </button>
              </div>
            ) : (
              <form onSubmit={handleAuth} className="xtg-stack-sm">
                <div>
                  <label htmlFor="auth-email">Email</label>
                  <input
                    id="auth-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={authLoading}
                  />
                </div>
                <div>
                  <label htmlFor="auth-password">Password</label>
                  <input
                    id="auth-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={authLoading}
                    minLength={6}
                  />
                </div>
                <div className="xtg-stack-xs">
                  <button
                    type="submit"
                    className="xtg-button-primary"
                    disabled={authLoading}
                  >
                    {authMode === 'signup' ? 'Sign Up' : 'Sign In'}
                  </button>
                  <button
                    type="button"
                    className="xtg-button-secondary"
                    onClick={() => {
                      setShowAuthForm(false);
                      setMessage(null);
                    }}
                    disabled={authLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="xtg-link-button"
                    onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                    disabled={authLoading}
                  >
                    {authMode === 'signin' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div>
            <p className="xtg-card-subtitle">
              Signed in as: <strong>{user.email}</strong>
            </p>
            <button
              type="button"
              className="xtg-button-secondary"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Cloud Sync Toggle */}
      <div className="xtg-stack-sm">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="cloud-sync-toggle" style={{ flex: 1 }}>
            <strong>Cloud Sync (Beta)</strong>
            <p className="xtg-text-muted" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Sync your data to Firebase. Local-first: data works offline.
            </p>
          </label>
          <input
            id="cloud-sync-toggle"
            type="checkbox"
            checked={cloudSyncEnabled}
            onChange={handleToggleCloudSync}
            disabled={!user}
            style={{ width: '2rem', height: '2rem' }}
          />
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`xtg-alert ${
            message.type === 'success' 
              ? 'xtg-alert-success' 
              : message.type === 'error' 
              ? 'xtg-alert-error' 
              : 'xtg-alert-info'
          }`}
          style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '0.5rem' }}
        >
          {message.text}
        </div>
      )}

      {/* Info */}
      <div className="xtg-text-muted" style={{ fontSize: '0.875rem', marginTop: '1rem' }}>
        <p>
          <strong>Note:</strong> Cloud sync is in beta. Your data is stored locally by default.
          Cloud sync is optional and can be disabled at any time.
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Data is user-scoped: only you can access your data. No metrics, no KPIs, no surveillance.
        </p>
      </div>
    </div>
  );
};
