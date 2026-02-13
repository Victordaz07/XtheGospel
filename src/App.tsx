import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { I18nProvider } from './context/I18nContext';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { ThemeProvider } from './context/ThemeContext';
import { ModeProvider } from './state/mode';
import AppRouter from './router/AppRouter';
import ErrorBoundary from './components/ErrorBoundary';
import { XtgAppLayout } from './layouts/XtgAppLayout';
import { ScrollToTop } from './components/ScrollToTop';
import { seedDemoCalendarEvents } from './services/calendarService';
import { useAuthStore } from './state/auth/useAuthStore';

// Semilla de eventos demo (solo en desarrollo)
if (import.meta.env.DEV) {
  seedDemoCalendarEvents('MISSION_001', 'ZONE_001');
}

// Initialize Firebase Auth state listener
function FirebaseAuthInitializer() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    const unsubscribe = initialize();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [initialize]);

  return null;
}

export default function App() {
  console.log('📱 Renderizando App...');
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <I18nProvider>
          <AuthProvider>
            <ProgressProvider>
              <ModeProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <FirebaseAuthInitializer />
                  <XtgAppLayout>
                    <AppRouter />
                  </XtgAppLayout>
                </BrowserRouter>
              </ModeProvider>
            </ProgressProvider>
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

