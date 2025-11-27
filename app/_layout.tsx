import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Layout SIN NavigationContainer
export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <View style={{ flex: 1 }}>
                {/* El contenido será manejado por el NavigationContainer principal */}
            </View>
            <StatusBar style="auto" />
        </SafeAreaProvider>
    );
}