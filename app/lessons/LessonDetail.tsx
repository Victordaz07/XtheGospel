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
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const topicTitle = t(topicId);
    const topicDesc = t(`${topicId}.desc`);
    const topicGoal = t(`${topicId}.goal`);
    const mainScripture = t(`${topicId}.scriptureMain`);
    const scriptureRef = t(`${topicId}.scriptureRef`);
    const scriptureExplanation = t(`${topicId}.scriptureExplanation`);

    // Obtener escrituras adicionales
    const moreScriptures = [];
    for (let i = 0; i < 4; i++) {
        const scripture = t(`${topicId}.more.${i}`);
        if (scripture && scripture !== `${topicId}.more.${i}`) {
            moreScriptures.push(scripture);
        }
    }

    // Obtener preguntas inspiradas
    const inspiredQuestions = [];
    for (let i = 0; i < 5; i++) {
        const question = t(`${topicId}.questions.${i}`);
        if (question && question !== `${topicId}.questions.${i}`) {
            inspiredQuestions.push(question);
        }
    }

    // Obtener ejemplos
    const examples = [];
    for (let i = 0; i < 3; i++) {
        const exampleTitle = t(`${topicId}.examples.${i}.title`);
        const exampleStory = t(`${topicId}.examples.${i}.story`);
        if (exampleTitle && exampleTitle !== `${topicId}.examples.${i}.title`) {
            examples.push({ title: exampleTitle, story: exampleStory });
        }
    }

    // Obtener objeciones comunes
    const objections = [];
    for (let i = 0; i < 5; i++) {
        const objection = t(`${topicId}.objections.${i}.objection`);
        const answer = t(`${topicId}.objections.${i}.answer`);
        if (objection && objection !== `${topicId}.objections.${i}.objection`) {
            objections.push({ objection, answer });
        }
    }
    // Si no hay objeciones en el formato anterior, intentar con el formato nested
    if (objections.length === 0) {
        for (let i = 0; i < 5; i++) {
            const objection = t(`${topicId}.objections.objections.${i}.objection`);
            const answer = t(`${topicId}.objections.objections.${i}.answer`);
            if (objection && objection !== `${topicId}.objections.objections.${i}.objection`) {
                objections.push({ objection, answer });
            }
        }
    }

    // Obtener diálogos
    const dialogues = [];
    for (let i = 0; i < 3; i++) {
        const dialogueTitle = t(`${topicId}.dialogues.${i}.title`);
        const dialogueLines = [];
        for (let j = 0; j < 5; j++) {
            const line = t(`${topicId}.dialogues.${i}.lines.${j}`);
            if (line && line !== `${topicId}.dialogues.${i}.lines.${j}`) {
                dialogueLines.push(line);
            }
        }
        if (dialogueTitle && dialogueTitle !== `${topicId}.dialogues.${i}.title`) {
            dialogues.push({ title: dialogueTitle, lines: dialogueLines });
        }
    }

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

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

                    {topicGoal && topicGoal !== `${topicId}.goal` && (
                        <View style={styles.goalContainer}>
                            <Text style={styles.goalText}>{topicGoal}</Text>
                        </View>
                    )}

                    <View style={styles.section}>
                        <Text style={styles.description}>{topicDesc}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('mainScripture')}</Text>
                        {scriptureRef && scriptureRef !== `${topicId}.scriptureRef` && (
                            <Text style={styles.scriptureReference}>{scriptureRef}</Text>
                        )}
                        <View style={styles.scriptureContainer}>
                            <Text style={styles.scriptureText}>{mainScripture}</Text>
                        </View>
                        {scriptureExplanation && scriptureExplanation !== `${topicId}.scriptureExplanation` && (
                            <View style={styles.explanationContainer}>
                                <Text style={styles.explanationText}>{scriptureExplanation}</Text>
                            </View>
                        )}
                    </View>

                    {inspiredQuestions.length > 0 && (
                        <View style={styles.section}>
                            <TouchableOpacity
                                style={styles.expandableHeader}
                                onPress={() => toggleSection('questions')}
                            >
                                <Text style={styles.sectionTitle}>💭 {t('inspiredQuestions') || 'Preguntas Inspiradas'}</Text>
                                <Text style={styles.expandIcon}>{expandedSection === 'questions' ? '▼' : '▶'}</Text>
                            </TouchableOpacity>
                            {expandedSection === 'questions' && (
                                <View style={styles.expandableContent}>
                                    {inspiredQuestions.map((question, index) => (
                                        <View key={index} style={styles.questionCard}>
                                            <Text style={styles.questionText}>{question}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    )}

                    {examples.length > 0 && (
                        <View style={styles.section}>
                            <TouchableOpacity
                                style={styles.expandableHeader}
                                onPress={() => toggleSection('examples')}
                            >
                                <Text style={styles.sectionTitle}>📖 {t('examples') || 'Ejemplos'}</Text>
                                <Text style={styles.expandIcon}>{expandedSection === 'examples' ? '▼' : '▶'}</Text>
                            </TouchableOpacity>
                            {expandedSection === 'examples' && (
                                <View style={styles.expandableContent}>
                                    {examples.map((example, index) => (
                                        <View key={index} style={styles.exampleCard}>
                                            <Text style={styles.exampleTitle}>{example.title}</Text>
                                            <Text style={styles.exampleStory}>{example.story}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    )}

                    {dialogues.length > 0 && (
                        <View style={styles.section}>
                            <TouchableOpacity
                                style={styles.expandableHeader}
                                onPress={() => toggleSection('dialogues')}
                            >
                                <Text style={styles.sectionTitle}>💬 {t('dialogues') || 'Diálogos'}</Text>
                                <Text style={styles.expandIcon}>{expandedSection === 'dialogues' ? '▼' : '▶'}</Text>
                            </TouchableOpacity>
                            {expandedSection === 'dialogues' && (
                                <View style={styles.expandableContent}>
                                    {dialogues.map((dialogue, index) => (
                                        <View key={index} style={styles.dialogueCard}>
                                            <Text style={styles.dialogueTitle}>{dialogue.title}</Text>
                                            {dialogue.lines.map((line, lineIndex) => (
                                                <View key={lineIndex} style={styles.dialogueLine}>
                                                    <Text style={styles.dialogueText}>{line}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    )}

                    {objections.length > 0 && (
                        <View style={styles.section}>
                            <TouchableOpacity
                                style={styles.expandableHeader}
                                onPress={() => toggleSection('objections')}
                            >
                                <Text style={styles.sectionTitle}>❓ {t('commonObjections') || 'Objeciones Comunes'}</Text>
                                <Text style={styles.expandIcon}>{expandedSection === 'objections' ? '▼' : '▶'}</Text>
                            </TouchableOpacity>
                            {expandedSection === 'objections' && (
                                <View style={styles.expandableContent}>
                                    {objections.map((obj, index) => (
                                        <View key={index} style={styles.objectionCard}>
                                            <Text style={styles.objectionText}>❓ {obj.objection}</Text>
                                            <Text style={styles.answerText}>💡 {obj.answer}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    )}

                    {moreScriptures.length > 0 && (
                        <TouchableOpacity
                            style={styles.learnMoreButton}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.learnMoreText}>{t('learnMore')} 📚</Text>
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
    goalContainer: {
        backgroundColor: '#e0f2fe',
        borderRadius: 12,
        padding: 14,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#0284c7',
    },
    goalText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#0c4a6e',
        fontStyle: 'italic',
    },
    scriptureReference: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3b82f6',
        marginBottom: 8,
    },
    explanationContainer: {
        backgroundColor: '#f0f9ff',
        borderRadius: 10,
        padding: 14,
        marginTop: 12,
        borderLeftWidth: 3,
        borderLeftColor: '#0ea5e9',
    },
    explanationText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#0c4a6e',
    },
    expandableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
    expandIcon: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '600',
    },
    expandableContent: {
        marginTop: 8,
    },
    questionCard: {
        backgroundColor: '#fef3c7',
        borderRadius: 10,
        padding: 14,
        marginBottom: 10,
        borderLeftWidth: 3,
        borderLeftColor: '#f59e0b',
    },
    questionText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#78350f',
        fontStyle: 'italic',
    },
    exampleCard: {
        backgroundColor: '#f0fdf4',
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
        borderLeftWidth: 3,
        borderLeftColor: '#10b981',
    },
    exampleTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#065f46',
        marginBottom: 8,
    },
    exampleStory: {
        fontSize: 14,
        lineHeight: 20,
        color: '#047857',
    },
    dialogueCard: {
        backgroundColor: '#f5f3ff',
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
        borderLeftWidth: 3,
        borderLeftColor: '#8b5cf6',
    },
    dialogueTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#5b21b6',
        marginBottom: 10,
    },
    dialogueLine: {
        marginBottom: 8,
        paddingLeft: 8,
    },
    dialogueText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#6d28d9',
    },
    objectionCard: {
        backgroundColor: '#fef2f2',
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
        borderLeftWidth: 3,
        borderLeftColor: '#ef4444',
    },
    objectionText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#991b1b',
        marginBottom: 10,
    },
    answerText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#7f1d1d',
    },
});
