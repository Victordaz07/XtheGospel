import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { useI18n } from '../../../context/I18nContext';

interface QuizLevelSelectorProps {
    visible: boolean;
    onClose: () => void;
    onSelectLevel: (level: 'easy' | 'medium' | 'hard') => void;
}

export default function QuizLevelSelector({ visible, onClose, onSelectLevel }: QuizLevelSelectorProps) {
    const { t } = useI18n();

    const levels = [
        {
            id: 'easy' as const,
            title: t('quiz.level.easy'),
            description: t('quiz.level.easy.desc'),
            color: '#10b981',
            icon: '🟢',
        },
        {
            id: 'medium' as const,
            title: t('quiz.level.medium'),
            description: t('quiz.level.medium.desc'),
            color: '#f59e0b',
            icon: '🟡',
        },
        {
            id: 'hard' as const,
            title: t('quiz.level.hard'),
            description: t('quiz.level.hard.desc'),
            color: '#ef4444',
            icon: '🔴',
        },
    ];

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>{t('quiz.levels.title')}</Text>

                    <View style={styles.levelsContainer}>
                        {levels.map((level) => (
                            <TouchableOpacity
                                key={level.id}
                                style={[styles.levelCard, { borderLeftColor: level.color }]}
                                onPress={() => {
                                    onSelectLevel(level.id);
                                    onClose();
                                }}
                            >
                                <View style={styles.levelHeader}>
                                    <Text style={styles.levelIcon}>{level.icon}</Text>
                                    <View style={styles.levelInfo}>
                                        <Text style={styles.levelTitle}>{level.title}</Text>
                                        <Text style={styles.levelDescription}>{level.description}</Text>
                                    </View>
                                </View>
                                <View style={styles.levelFooter}>
                                    <Text style={[styles.startButton, { color: level.color }]}>
                                        {t('quiz.selectLevel')} →
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1f2937',
        textAlign: 'center',
        marginBottom: 24,
    },
    levelsContainer: {
        gap: 16,
        marginBottom: 24,
    },
    levelCard: {
        backgroundColor: '#f9fafb',
        borderRadius: 16,
        padding: 20,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    levelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    levelIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    levelInfo: {
        flex: 1,
    },
    levelTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    levelDescription: {
        fontSize: 14,
        color: '#6b7280',
    },
    levelFooter: {
        alignItems: 'flex-end',
    },
    startButton: {
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButton: {
        backgroundColor: '#6b7280',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});
