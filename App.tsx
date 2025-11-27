import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nProvider } from './context/I18nContext';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import AppNavigator from './navigation/index';

export default function App() {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <AuthProvider>
          <ProgressProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </ProgressProvider>
        </AuthProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
}