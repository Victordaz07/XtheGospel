import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useI18n } from '../../../context/I18nContext';

// Función para mezclar array
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default function QuizLesson6() {
    const { t } = useI18n();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [randomizedQuestions, setRandomizedQuestions] = useState<any[]>([]);

    // Preguntas originales sin randomizar
    const originalQuestions = [
        {
            question: t("quiz.lesson6.question1"),
            options: [
                t("quiz.lesson6.question1.option1"),
                t("quiz.lesson6.question1.option2"),
                t("quiz.lesson6.question1.option3"),
                t("quiz.lesson6.question1.option4")
            ],
            correct: parseInt(t("quiz.lesson6.question1.correct")),
            originalCorrect: parseInt(t("quiz.lesson6.question1.correct"))
        },
        {
            question: t("quiz.lesson6.question2"),
            options: [
                t("quiz.lesson6.question2.option1"),
                t("quiz.lesson6.question2.option2"),
                t("quiz.lesson6.question2.option3"),
                t("quiz.lesson6.question2.option4")
            ],
            correct: parseInt(t("quiz.lesson6.question2.correct")),
            originalCorrect: parseInt(t("quiz.lesson6.question2.correct"))
        },
        {
            question: t("quiz.lesson6.question3"),
            options: [
                t("quiz.lesson6.question3.option1"),
                t("quiz.lesson6.question3.option2"),
                t("quiz.lesson6.question3.option3"),
                t("quiz.lesson6.question3.option4")
            ],
            correct: parseInt(t("quiz.lesson6.question3.correct")),
            originalCorrect: parseInt(t("quiz.lesson6.question3.correct"))
        }
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
            const newCorrect = shuffledIndices.indexOf(question.originalCorrect);

            return {
                ...question,
                options: shuffledOptions,
                correct: newCorrect,
            };
        });

        // Mezclar el orden de las preguntas
        return shuffleArray(randomized);
    };

    // Inicializar el quiz randomizado
    useEffect(() => {
        setRandomizedQuestions(randomizeQuiz());
    }, []);

    const questions = randomizedQuestions;

    const handleAnswerSelect = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === null) {
            Alert.alert(t("quiz.selectAnswer"), t("quiz.selectAnswerMessage"));
            return;
        }

        // Guardar la respuesta del usuario
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = selectedAnswer;
        setSelectedAnswers(newAnswers);

        if (selectedAnswer === questions[currentQuestionIndex].correct) {
            setScore(score + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            setShowResult(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setSelectedAnswers([]);
        setShowResult(false);
        // Re-randomizar el quiz
        setRandomizedQuestions(randomizeQuiz());
    };

    const handleBackToLessons = () => {
        navigation.goBack();
    };

    if (showResult) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
                <ScrollView style={styles.scrollView} contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 20 }]}>
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultTitle}>{t("quiz.results")}</Text>
                        <Text style={styles.scoreText}>
                            {score} {t("quiz.of")} {questions.length}
                        </Text>
                        <Text style={styles.percentageText}>{percentage}%</Text>
                        <Text style={styles.resultMessage}>
                            {percentage >= 70 ? t("quiz.excellent") : percentage >= 50 ? t("quiz.good") : t("quiz.keepStudying")}
                        </Text>

                        {/* Revisión de Respuestas */}
                        <View style={styles.reviewContainer}>
                            <Text style={styles.reviewTitle}>Revisión de Respuestas</Text>
                            {questions.map((question, index) => {
                                const userAnswer = selectedAnswers[index];
                                const isCorrect = userAnswer === question.correct;
                                
                                return (
                                    <View key={index} style={styles.questionReview}>
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
                                                    Respuesta correcta: {question.options[question.correct]}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                );
                            })}
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleRestart}>
                            <Text style={styles.buttonText}>{t("quiz.tryAgain")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleBackToLessons}>
                            <Text style={[styles.buttonText, styles.secondaryButtonText]}>{t("quiz.backToLessons")}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // Verificar que hay preguntas disponibles
    if (!questions || questions.length === 0) {
        return (
            <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
                <ScrollView style={styles.scrollView} contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 20 }]}>
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Cargando preguntas...</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <ScrollView style={styles.scrollView} contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 20 }]}>
                <View style={styles.header}>
                    <Text style={styles.title}>{t("quiz.quizTitle")} - {t("lesson6.title")}</Text>
                    <Text style={styles.progress}>
                        {currentQuestionIndex + 1} {t("quiz.of")} {questions.length}
                    </Text>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{currentQuestion.question}</Text>

                    {currentQuestion.options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.optionButton,
                                selectedAnswer === index && styles.selectedOption
                            ]}
                            onPress={() => handleAnswerSelect(index)}
                        >
                            <Text style={[
                                styles.optionText,
                                selectedAnswer === index && styles.selectedOptionText
                            ]}>
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                    <Text style={styles.nextButtonText}>
                        {currentQuestionIndex < questions.length - 1 ? t("quiz.next") : t("quiz.finish")}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 8,
    },
    progress: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
    },
    questionContainer: {
        marginBottom: 24,
    },
    questionText: {
        fontSize: 18,
        color: '#2c3e50',
        marginBottom: 16,
        lineHeight: 24,
    },
    optionButton: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#e9ecef',
    },
    selectedOption: {
        borderColor: '#3498db',
        backgroundColor: '#e3f2fd',
    },
    optionText: {
        fontSize: 16,
        color: '#2c3e50',
    },
    selectedOptionText: {
        color: '#2980b9',
        fontWeight: '600',
    },
    nextButton: {
        backgroundColor: '#3498db',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    resultContainer: {
        alignItems: 'center',
        padding: 24,
    },
    resultTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 16,
    },
    scoreText: {
        fontSize: 20,
        color: '#7f8c8d',
        marginBottom: 8,
    },
    percentageText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#27ae60',
        marginBottom: 16,
    },
    resultMessage: {
        fontSize: 18,
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#3498db',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        width: '100%',
        marginBottom: 12,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#3498db',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButtonText: {
        color: '#3498db',
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
