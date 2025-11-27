import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useI18n } from '../../context/I18nContext';
import { LanguagePicker } from '../../components/LanguagePicker';

const LessonsDemo: React.FC = () => {
    const { t, locale } = useI18n();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>📚 App Misional</Text>
                <Text style={styles.subtitle}>Lecciones Misionales Completas</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.demoCard}>
                    <Text style={styles.demoTitle}>🎯 Funcionalidades Implementadas</Text>

                    <View style={styles.featureList}>
                        <Text style={styles.featureItem}>✅ 5 Lecciones completas (Restauración, Plan de Salvación, Evangelio, Mandamientos, Leyes y Ordenanzas)</Text>
                        <Text style={styles.featureItem}>✅ 4 idiomas (ES, EN, FR, PT)</Text>
                        <Text style={styles.featureItem}>✅ Navegación Stack completa</Text>
                        <Text style={styles.featureItem}>✅ Componente LessonCard reutilizable</Text>
                        <Text style={styles.featureItem}>✅ Archivos JSON de traducción</Text>
                        <Text style={styles.featureItem}>✅ Diseño moderno y limpio</Text>
                        <Text style={styles.featureItem}>✅ Preparado para imágenes AI</Text>
                    </View>
                </View>

                <View style={styles.languageSection}>
                    <Text style={styles.sectionTitle}>🌍 Idioma Actual: {locale.toUpperCase()}</Text>
                    <LanguagePicker />
                </View>

                <View style={styles.instructionsCard}>
                    <Text style={styles.instructionsTitle}>📋 Próximos Pasos</Text>
                    <Text style={styles.instructionsText}>
                        1. Agregar imágenes generadas con AI para cada tema{'\n'}
                        2. Implementar pantallas de detalle para cada subtema{'\n'}
                        3. Integrar con sistema de progreso existente{'\n'}
                        4. Agregar quizzes interactivos por lección
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#e3f2fd',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    demoCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    demoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a365d',
        marginBottom: 16,
    },
    featureList: {
        gap: 8,
    },
    featureItem: {
        fontSize: 14,
        color: '#4a5568',
        lineHeight: 20,
    },
    languageSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a365d',
        marginBottom: 16,
    },
    instructionsCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    instructionsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a365d',
        marginBottom: 12,
    },
    instructionsText: {
        fontSize: 14,
        color: '#4a5568',
        lineHeight: 20,
    },
});

export default LessonsDemo;
