import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Modal,
    SafeAreaView,
} from 'react-native';
import { useI18n } from '../../context/I18nContext';

interface LessonDetailProps {
    topicId: string;
    onBack?: () => void;
    onNextTopic?: () => void;
    onTestLearning?: () => void;
    onBackToLesson?: () => void;
    isLastTopic?: boolean;
}

export default function LessonDetail({
    topicId,
    onBack,
    onNextTopic,
    onTestLearning,
    onBackToLesson,
    isLastTopic = false
}: LessonDetailProps) {
    const { t } = useI18n();
    const [modalVisible, setModalVisible] = useState(false);

    const topicTitle = t(topicId);
    const topicDesc = t(`${topicId}.desc`);
    const mainScripture = t(`${topicId}.scriptureMain`);

    // Obtener escrituras adicionales
    const moreScriptures = [];
    for (let i = 0; i < 4; i++) {
        const scripture = t(`${topicId}.more.${i}`);
        if (scripture && scripture !== `${topicId}.more.${i}`) {
            moreScriptures.push(scripture);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {onBack && (
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <Text style={styles.backButtonText}>← {t('back')}</Text>
                    </TouchableOpacity>
                </View>
            )}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Text style={styles.title}>{topicTitle}</Text>

                    <View style={styles.section}>
                        <Text style={styles.description}>{topicDesc}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('mainScripture')}</Text>
                        <View style={styles.scriptureContainer}>
                            <Text style={styles.scriptureText}>{mainScripture}</Text>
                        </View>
                    </View>

                    {moreScriptures.length > 0 && (
                        <TouchableOpacity
                            style={styles.learnMoreButton}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.learnMoreText}>{t('learnMore')}</Text>
                        </TouchableOpacity>
                    )}

                    {/* Botones de navegación */}
                    <View style={styles.navigationButtons}>
                        {!isLastTopic ? (
                            // Botón para tópicos intermedios
                            onNextTopic && (
                                <TouchableOpacity
                                    style={styles.nextTopicButton}
                                    onPress={onNextTopic}
                                >
                                    <Text style={styles.nextTopicText}>{t('nextTopic')}</Text>
                                </TouchableOpacity>
                            )
                        ) : (
                            // Botones para el último tópico
                            <View style={styles.lastTopicButtons}>
                                {onTestLearning && (
                                    <TouchableOpacity
                                        style={styles.testLearningButton}
                                        onPress={onTestLearning}
                                    >
                                        <Text style={styles.testLearningText}>{t('testLearning')}</Text>
                                    </TouchableOpacity>
                                )}
                                {onBackToLesson && (
                                    <TouchableOpacity
                                        style={styles.backToLessonButton}
                                        onPress={onBackToLesson}
                                    >
                                        <Text style={styles.backToLessonText}>{t('backToLesson')}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{t('learnMore')}</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>{t('close')}</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalScrollView}>
                            {moreScriptures.map((scripture, index) => (
                                <View key={index} style={styles.additionalScriptureContainer}>
                                    <Text style={styles.additionalScriptureText}>{scripture}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    backButton: {
        alignSelf: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#6b7280',
        borderRadius: 8,
    },
    backButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#4b5563',
        textAlign: 'justify',
    },
    scriptureContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#3b82f6',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    scriptureText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#1f2937',
        fontStyle: 'italic',
        textAlign: 'justify',
    },
    learnMoreButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#3b82f6',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    learnMoreText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
        minHeight: '50%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
    },
    closeButton: {
        backgroundColor: '#ef4444',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    closeButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
    modalScrollView: {
        flex: 1,
        padding: 20,
    },
    additionalScriptureContainer: {
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#10b981',
    },
    additionalScriptureText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#374151',
        fontStyle: 'italic',
        textAlign: 'justify',
    },
    navigationButtons: {
        marginTop: 24,
    },
    nextTopicButton: {
        backgroundColor: '#10b981',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        shadowColor: '#10b981',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    nextTopicText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    lastTopicButtons: {
        gap: 12,
    },
    testLearningButton: {
        backgroundColor: '#f59e0b',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        shadowColor: '#f59e0b',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    testLearningText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    backToLessonButton: {
        backgroundColor: '#6b7280',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        shadowColor: '#6b7280',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    backToLessonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});
