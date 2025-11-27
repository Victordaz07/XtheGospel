import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useI18n } from '../../../context/I18nContext';

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    originalCorrectAnswer: number; // Para mantener la respuesta correcta original
}

// Función para mezclar array
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default function QuizLesson4() {
    const { t } = useI18n();
    const insets = useSafeAreaInsets();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [randomizedQuestions, setRandomizedQuestions] = useState<QuizQuestion[]>([]);

    // Preguntas originales sin randomizar
    const originalQuestions: QuizQuestion[] = [
        {
            id: "q1",
            question: t("quiz.lesson4.question1"),
            options: [
                t("quiz.lesson4.question1.option1"),
                t("quiz.lesson4.question1.option2"),
                t("quiz.lesson4.question1.option3"),
                t("quiz.lesson4.question1.option4"),
            ],
            correctAnswer: parseInt(t("quiz.lesson4.question1.correct")),
            originalCorrectAnswer: parseInt(t("quiz.lesson4.question1.correct")),
        },
        {
            id: "q2",
            question: t("quiz.lesson4.question2"),
            options: [
                t("quiz.lesson4.question2.option1"),
                t("quiz.lesson4.question2.option2"),
                t("quiz.lesson4.question2.option3"),
                t("quiz.lesson4.question2.option4"),
            ],
            correctAnswer: parseInt(t("quiz.lesson4.question2.correct")),
            originalCorrectAnswer: parseInt(t("quiz.lesson4.question2.correct")),
        },
        {
            id: "q3",
            question: t("quiz.lesson4.question3"),
            options: [
                t("quiz.lesson4.question3.option1"),
                t("quiz.lesson4.question3.option2"),
                t("quiz.lesson4.question3.option3"),
                t("quiz.lesson4.question3.option4"),
            ],
            correctAnswer: parseInt(t("quiz.lesson4.question3.correct")),
            originalCorrectAnswer: parseInt(t("quiz.lesson4.question3.correct")),
        },
    ];

    // Función para randomizar preguntas y opciones
    const randomizeQuiz = () => {
        const randomized = originalQuestions.map(question => {
            // Crear array de índices para las opciones
            const optionIndices = [0, 1, 2, 3];
            const shuffledIndices = shuffleArray(optionIndices);

            // Mezclar las opciones según los índices aleatorios
            const shuffledOptions = shuffledIndices.map(index => question.options[index]);

            // Encontrar la nueva posición de la respuesta correcta
            const newCorrectAnswer = shuffledIndices.indexOf(question.originalCorrectAnswer);

            return {
                ...question,
                options: shuffledOptions,
                correctAnswer: newCorrectAnswer,
            };
        });

        // Mezclar el orden de las preguntas
        return shuffleArray(randomized);
    };

    // Inicializar el quiz randomizado
    useEffect(() => {
        setRandomizedQuestions(randomizeQuiz());
    }, []);

    const quizQuestions = randomizedQuestions;

    const handleAnswerSelect = (answerIndex: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = answerIndex;
        setSelectedAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setShowResults(false);
        // Re-randomizar el quiz
        setRandomizedQuestions(randomizeQuiz());
    };

    const calculateScore = () => {
        let correctAnswers = 0;
        quizQuestions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                correctAnswers++;
            }
        });
        return correctAnswers;
    };

    const renderQuiz = () => {
        // Verificar que hay preguntas disponibles
        if (!quizQuestions || quizQuestions.length === 0) {
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Cargando preguntas...</Text>
                </View>
            );
        }

        const question = quizQuestions[currentQuestion];
        const isAnswered = selectedAnswers[currentQuestion] !== undefined;

        return (
            <View style={styles.quizContainer}>
                <View style={styles.header}>
                    <Text style={styles.questionCounter}>
                        {t('quiz.question')} {currentQuestion + 1} {t('quiz.of')} {quizQuestions.length}
                    </Text>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }
                            ]}
                        />
                    </View>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{question.question}</Text>

                    <View style={styles.optionsContainer}>
                        {question.options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.optionButton,
                                    selectedAnswers[currentQuestion] === index && styles.selectedOption
                                ]}
                                onPress={() => handleAnswerSelect(index)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    selectedAnswers[currentQuestion] === index && styles.selectedOptionText
                                ]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.navigationContainer}>
                    {currentQuestion > 0 && (
                        <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
                            <Text style={styles.previousButtonText}>Anterior</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[styles.nextButton, !isAnswered && styles.disabledButton]}
                        onPress={handleNext}
                        disabled={!isAnswered}
                    >
                        <Text style={styles.nextButtonText}>
                            {currentQuestion === quizQuestions.length - 1 ? t('quiz.finish') : t('quiz.next')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderResults = () => {
        const score = calculateScore();
        const percentage = Math.round((score / quizQuestions.length) * 100);

        return (
            <View style={styles.resultsContainer}>
                <View style={styles.resultsHeader}>
                    <Text style={styles.resultsTitle}>¡Quiz Completado!</Text>
                    <Text style={styles.resultsSubtitle}>Resultados de la Lección 4: Los Mandamientos</Text>
                </View>

                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{score} / {quizQuestions.length}</Text>
                    <Text style={styles.percentageText}>{percentage}%</Text>
                    <Text style={styles.scoreLabel}>Respuestas Correctas</Text>
                </View>

                {/* Revisión de Respuestas */}
                <View style={styles.reviewContainer}>
                    <Text style={styles.reviewTitle}>Revisión de Respuestas</Text>
                    {quizQuestions.map((question, index) => {
                        const userAnswer = selectedAnswers[index];
                        const isCorrect = userAnswer === question.correctAnswer;

                        return (
                            <View key={question.id} style={styles.questionReview}>
                                <Text style={styles.questionReviewText}>
                                    {index + 1}. {question.question}
                                </Text>
                                <View style={styles.answerReview}>
                                    <Text style={[
                                        styles.userAnswerText,
                                        isCorrect ? styles.correctAnswer : styles.incorrectAnswer
                                    ]}>
                                        Tu respuesta: {question.options[userAnswer]}
                                    </Text>
                                    {!isCorrect && (
                                        <Text style={styles.correctAnswerText}>
                                            Respuesta correcta: {question.options[question.correctAnswer]}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        );
                    })}
                </View>

                <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
                    <Text style={styles.restartButtonText}>{t('quiz.tryAgain')}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
            >
                <View style={styles.lessonHeader}>
                    <Text style={styles.lessonTitle}>Lección 4: Los Mandamientos</Text>
                    <Text style={styles.lessonSubtitle}>{t('quiz.testKnowledge')}</Text>
                </View>

                {showResults ? renderResults() : renderQuiz()}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    scrollContent: {
        padding: 20,
        flexGrow: 1,
    },
    lessonHeader: {
        marginBottom: 24,
        alignItems: 'center',
    },
    lessonTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 8,
    },
    lessonSubtitle: {
        fontSize: 16,
        color: '#6b7280',
    },
    quizContainer: {
        flex: 1,
    },
    header: {
        marginBottom: 24,
    },
    questionCounter: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 12,
    },
    progressBar: {
        height: 4,
        backgroundColor: '#e5e7eb',
        borderRadius: 2,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#ef4444',
        borderRadius: 2,
    },
    questionContainer: {
        flex: 1,
    },
    questionText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: 28,
    },
    optionsContainer: {
        gap: 12,
    },
    optionButton: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    selectedOption: {
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2',
    },
    optionText: {
        fontSize: 16,
        color: '#374151',
        textAlign: 'center',
    },
    selectedOptionText: {
        color: '#dc2626',
        fontWeight: '600',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    previousButton: {
        backgroundColor: '#6b7280',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        flex: 0.4,
    },
    previousButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    nextButton: {
        backgroundColor: '#ef4444',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        flex: 0.55,
    },
    disabledButton: {
        backgroundColor: '#9ca3af',
    },
    nextButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    resultsContainer: {
        flex: 1,
    },
    resultsHeader: {
        alignItems: 'center',
        marginBottom: 32,
    },
    resultsTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 8,
    },
    resultsSubtitle: {
        fontSize: 16,
        color: '#6b7280',
    },
    scoreContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    scoreText: {
        fontSize: 32,
        fontWeight: '700',
        color: '#ef4444',
        marginBottom: 4,
    },
    percentageText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#ef4444',
        marginBottom: 8,
    },
    scoreLabel: {
        fontSize: 14,
        color: '#6b7280',
    },
    restartButton: {
        backgroundColor: '#ef4444',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    restartButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        fontSize: 18,
        color: '#6b7280',
        textAlign: 'center',
    },
    reviewContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    reviewTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 16,
        textAlign: 'center',
    },
    questionReview: {
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    questionReviewText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 8,
        lineHeight: 22,
    },
    answerReview: {
        marginLeft: 8,
    },
    userAnswerText: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '500',
    },
    correctAnswer: {
        color: '#10b981',
    },
    incorrectAnswer: {
        color: '#ef4444',
    },
    correctAnswerText: {
        fontSize: 14,
        color: '#10b981',
        fontWeight: '500',
    },
});
