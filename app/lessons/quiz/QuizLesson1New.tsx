import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    SafeAreaView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useI18n } from '../../../context/I18nContext';

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
}

export default function QuizLesson1() {
    const { t } = useI18n();
    const route = useRoute();
    const level = (route.params as any)?.level || 'easy';
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [showResults, setShowResults] = useState(false);

    // Todas las preguntas para Lesson 1: La Restauración
    const allQuestions: QuizQuestion[] = [
        // Nivel Fácil (3 preguntas)
        {
            id: "q1",
            question: "¿Qué hizo José Smith cuando tenía preguntas sobre qué iglesia era verdadera?",
            options: [
                "Fue a la iglesia más cercana",
                "Oró a Dios pidiendo sabiduría",
                "Preguntó a sus padres",
                "Leyó muchos libros"
            ],
            correctAnswer: 1
        },
        {
            id: "q2",
            question: "¿Qué es el Libro de Mormón?",
            options: [
                "Un libro de historia",
                "Otro testamento de Jesucristo",
                "Un libro de cuentos",
                "Un libro de ciencia"
            ],
            correctAnswer: 1
        },
        {
            id: "q3",
            question: "¿Cuál es el propósito principal de la Restauración?",
            options: [
                "Crear una nueva religión",
                "Restaurar la verdadera Iglesia de Cristo",
                "Unir todas las religiones",
                "Modernizar el cristianismo"
            ],
            correctAnswer: 1
        },
        // Nivel Medio (4 preguntas adicionales)
        {
            id: "q4",
            question: "¿En qué año tuvo José Smith la Primera Visión?",
            options: [
                "1820",
                "1821",
                "1819",
                "1822"
            ],
            correctAnswer: 0
        },
        {
            id: "q5",
            question: "¿Qué ángeles restauraron el Sacerdocio de Melquisedec?",
            options: [
                "Pedro, Santiago y Juan",
                "Miguel y Gabriel",
                "Moroni y Nefi",
                "Adán y Eva"
            ],
            correctAnswer: 0
        },
        {
            id: "q6",
            question: "¿Cuál fue el primer templo construido en esta dispensación?",
            options: [
                "Templo de Kirtland",
                "Templo de Nauvoo",
                "Templo de Salt Lake",
                "Templo de Palmyra"
            ],
            correctAnswer: 0
        },
        {
            id: "q7",
            question: "¿Qué significa 'restauración' en el contexto del evangelio?",
            options: [
                "Volver a construir algo",
                "Traer de vuelta algo que se había perdido",
                "Mejorar algo existente",
                "Crear algo nuevo"
            ],
            correctAnswer: 1
        },
        // Nivel Difícil (8 preguntas adicionales)
        {
            id: "q8",
            question: "¿Cuál fue la primera revelación recibida por José Smith?",
            options: [
                "La Primera Visión",
                "La visita de Moroni",
                "La traducción del Libro de Mormón",
                "La organización de la Iglesia"
            ],
            correctAnswer: 0
        },
        {
            id: "q9",
            question: "¿En qué lugar específico tuvo José Smith la Primera Visión?",
            options: [
                "El Bosque Sagrado",
                "La Granja de los Smith",
                "El Monte Cumorah",
                "El Río Susquehanna"
            ],
            correctAnswer: 0
        },
        {
            id: "q10",
            question: "¿Qué profeta del Libro de Mormón profetizó sobre José Smith?",
            options: [
                "Nefi",
                "Alma",
                "Mormón",
                "Moroni"
            ],
            correctAnswer: 0
        },
        {
            id: "q11",
            question: "¿Cuál fue el primer nombre oficial de la Iglesia restaurada?",
            options: [
                "Iglesia de Jesucristo de los Santos de los Últimos Días",
                "Iglesia de Cristo",
                "Iglesia de los Santos",
                "Iglesia Restaurada"
            ],
            correctAnswer: 1
        },
        {
            id: "q12",
            question: "¿Qué evento marcó el inicio de la Gran Apostasía?",
            options: [
                "La muerte de los apóstoles",
                "La caída del Imperio Romano",
                "La división de la Iglesia",
                "La pérdida de las llaves del sacerdocio"
            ],
            correctAnswer: 0
        },
        {
            id: "q13",
            question: "¿Cuántas dispensaciones ha habido según las enseñanzas de la Iglesia?",
            options: [
                "Siete",
                "Ocho",
                "Nueve",
                "Diez"
            ],
            correctAnswer: 0
        },
        {
            id: "q14",
            question: "¿Qué significa 'dispensación' en el contexto del evangelio?",
            options: [
                "Un período de tiempo",
                "Una época en que el evangelio se revela completamente",
                "Una organización de la Iglesia",
                "Un lugar geográfico"
            ],
            correctAnswer: 1
        },
        {
            id: "q15",
            question: "¿Cuál fue el último libro de escritura que se agregó al canon?",
            options: [
                "Doctrina y Convenios",
                "Perla de Gran Precio",
                "Libro de Mormón",
                "Biblia"
            ],
            correctAnswer: 1
        }
    ];

    // Seleccionar preguntas según el nivel
    const getQuestionsForLevel = (level: string): QuizQuestion[] => {
        switch (level) {
            case 'easy':
                return allQuestions.slice(0, 3);
            case 'medium':
                return allQuestions.slice(0, 7);
            case 'hard':
                return allQuestions;
            default:
                return allQuestions.slice(0, 3);
        }
    };

    const quizQuestions = getQuestionsForLevel(level);

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

    const calculateScore = () => {
        let correct = 0;
        quizQuestions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                correct++;
            }
        });
        return { correct, total: quizQuestions.length };
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setShowResults(false);
    };

    const getLevelInfo = () => {
        switch (level) {
            case 'easy':
                return { name: 'Moderado', color: '#10b981', icon: '🟢' };
            case 'medium':
                return { name: 'Medio', color: '#f59e0b', icon: '🟡' };
            case 'hard':
                return { name: 'Difícil', color: '#ef4444', icon: '🔴' };
            default:
                return { name: 'Moderado', color: '#10b981', icon: '🟢' };
        }
    };

    const levelInfo = getLevelInfo();

    if (showResults) {
        const { correct, total } = calculateScore();
        const percentage = Math.round((correct / total) * 100);

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.resultsContainer}>
                        <Text style={styles.resultsTitle}>¡Quiz Completado!</Text>
                        <Text style={styles.levelText}>
                            {levelInfo.icon} Nivel {levelInfo.name}
                        </Text>

                        <View style={styles.scoreContainer}>
                            <Text style={styles.scoreText}>{correct}/{total}</Text>
                            <Text style={styles.percentageText}>{percentage}%</Text>
                        </View>

                        <View style={styles.feedbackContainer}>
                            {percentage >= 80 ? (
                                <Text style={styles.feedbackText}>¡Excelente trabajo! 🎉</Text>
                            ) : percentage >= 60 ? (
                                <Text style={styles.feedbackText}>¡Buen trabajo! 👍</Text>
                            ) : (
                                <Text style={styles.feedbackText}>Sigue estudiando 💪</Text>
                            )}
                        </View>

                        <TouchableOpacity style={styles.resetButton} onPress={resetQuiz}>
                            <Text style={styles.resetButtonText}>Intentar de Nuevo</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    const currentQ = quizQuestions[currentQuestion];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.levelText}>
                        {levelInfo.icon} Nivel {levelInfo.name}
                    </Text>
                    <Text style={styles.progressText}>
                        Pregunta {currentQuestion + 1} de {quizQuestions.length}
                    </Text>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{currentQ.question}</Text>

                    <View style={styles.optionsContainer}>
                        {currentQ.options.map((option, index) => (
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
                            <Text style={styles.previousButtonText}>← Anterior</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[
                            styles.nextButton,
                            selectedAnswers[currentQuestion] === undefined && styles.disabledButton
                        ]}
                        onPress={handleNext}
                        disabled={selectedAnswers[currentQuestion] === undefined}
                    >
                        <Text style={styles.nextButtonText}>
                            {currentQuestion === quizQuestions.length - 1 ? 'Finalizar' : 'Siguiente →'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    scrollView: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    levelText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 8,
    },
    progressText: {
        fontSize: 16,
        color: '#6b7280',
    },
    questionContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    questionText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 24,
        lineHeight: 28,
    },
    optionsContainer: {
        gap: 12,
    },
    optionButton: {
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        borderColor: '#e5e7eb',
    },
    selectedOption: {
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
    },
    optionText: {
        fontSize: 16,
        color: '#374151',
        textAlign: 'center',
    },
    selectedOptionText: {
        color: '#ffffff',
        fontWeight: '600',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    previousButton: {
        backgroundColor: '#6b7280',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
    },
    previousButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    nextButton: {
        backgroundColor: '#3b82f6',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        flex: 1,
        marginLeft: 12,
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
        alignItems: 'center',
        padding: 20,
    },
    resultsTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 16,
    },
    scoreContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    scoreText: {
        fontSize: 48,
        fontWeight: '700',
        color: '#3b82f6',
    },
    percentageText: {
        fontSize: 24,
        color: '#6b7280',
        marginTop: 8,
    },
    feedbackContainer: {
        marginBottom: 32,
    },
    feedbackText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
        textAlign: 'center',
    },
    resetButton: {
        backgroundColor: '#10b981',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 12,
    },
    resetButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});
