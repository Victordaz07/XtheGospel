import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../constants/theme';

const MissionaryHome: React.FC = () => {
    const insets = useSafeAreaInsets();
    
    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Text style={styles.title}>Pantalla: Home (Misionero)</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: theme.fontSizes.lg,
        color: theme.colors.text,
    },
});

export default MissionaryHome;