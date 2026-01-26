import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { I18nProvider } from './context/I18nContext';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { ModeProvider } from './state/mode';
import AppRouter from './router/AppRouter';
import ErrorBoundary from './components/ErrorBoundary';
import { XtgAppLayout } from './layouts/XtgAppLayout';
import { seedDemoCalendarEvents } from './services/calendarService';

// Semilla de eventos demo (solo en desarrollo)
if (import.meta.env.DEV) {
  seedDemoCalendarEvents('MISSION_001', 'ZONE_001');
}

export default function App() {
  console.log('📱 Renderizando App...');
  return (
    <ErrorBoundary>
      <I18nProvider>
        <AuthProvider>
          <ProgressProvider>
            <ModeProvider>
              <BrowserRouter>
                <XtgAppLayout>
                  <AppRouter />
                </XtgAppLayout>
              </BrowserRouter>
            </ModeProvider>
          </ProgressProvider>
        </AuthProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}

