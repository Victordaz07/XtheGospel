import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { I18nProvider } from './context/I18nContext';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import AppRouter from './router/AppRouter';
import ErrorBoundary from './components/ErrorBoundary';
import { XtgAppLayout } from './layouts/XtgAppLayout';

export default function App() {
  console.log('📱 Renderizando App...');
  return (
    <ErrorBoundary>
      <I18nProvider>
        <AuthProvider>
          <ProgressProvider>
            <BrowserRouter>
              <XtgAppLayout>
                <AppRouter />
              </XtgAppLayout>
            </BrowserRouter>
          </ProgressProvider>
        </AuthProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}

