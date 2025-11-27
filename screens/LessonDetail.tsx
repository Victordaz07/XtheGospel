// screens/LessonDetail.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useI18n } from '../context/I18nContext';
import { useNavigation } from '@react-navigation/native';
import { LESSONS, Lesson, getLocalized } from '../data/lessonsData';

interface LessonDetailProps {
  route: {
    params: {
      lessonId: string;
    };
  };
}

const LessonDetail: React.FC<LessonDetailProps> = ({ route }) => {
  const { lessonId } = route.params;
  const { userRole } = useAuth();
  const { getLessonProgress, updateLessonProgress, markLessonCompleted } = useProgress();
  const { locale, t } = useI18n();
  const navigation = useNavigation();

  const [noteContent, setNoteContent] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Buscar la lección por ID
  const lesson = LESSONS.find(l => l.id === lessonId);
  const lessonProgress = getLessonProgress(lessonId);

  useEffect(() => {
    if (lessonProgress?.notes) {
      setNoteContent(lessonProgress.notes);
    }
  }, [lessonProgress]);

  if (!lesson) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Lección no encontrada</Text>
      </View>
    );
  }

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const calculateQuizScore = (): number => {
    if (quizAnswers.length === 0) return 0;
    let correct = 0;
    lesson.quiz.forEach((q, index) => {
      if (quizAnswers[index] === q.answerIndex) {
        correct++;
      }
    });
    return Math.round((correct / lesson.quiz.length) * 100);
  };

  const saveNotes = async () => {
    if (!noteContent.trim()) {
      Alert.alert('Error', 'La nota no puede estar vacía');
      return;
    }

    setIsLoading(true);
    try {
      const currentProgress = lessonProgress?.progress || 0;
      await updateLessonProgress(lessonId, currentProgress, noteContent.trim());
      Alert.alert('Éxito', 'Notas guardadas correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar las notas');
      console.error('Error saving notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const finishLesson = async () => {
    const score = calculateQuizScore();
    setIsLoading(true);
    try {
      await markLessonCompleted(lessonId, score);
      Alert.alert(
        '¡Lección Completada!',
        `Has completado la lección con un ${score}% de aciertos en el quiz.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo completar la lección');
      console.error('Error finishing lesson:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header con estado de completada */}
      {lessonProgress?.completed && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>✅ Completada</Text>
        </View>
      )}

      {/* Contenido de la lección */}
      <View style={styles.lessonContent}>
        <Text style={styles.title}>{getLocalized(lesson.title, locale)}</Text>
        <Text style={styles.description}>{getLocalized(lesson.description, locale)}</Text>

        {/* Referencias bíblicas */}
        <View style={styles.referencesContainer}>
          <Text style={styles.sectionTitle}>📖 {t('lesson.scriptures')}:</Text>
          {lesson.scriptures.map((scripture, index) => (
            <Text key={index} style={styles.referenceText}>• {scripture.ref}</Text>
          ))}
        </View>

        {/* Quiz */}
        <View style={styles.quizContainer}>
          <Text style={styles.sectionTitle}>❓ {t('lesson.quiz.title')}:</Text>
          {lesson.quiz.map((question, index) => (
            <View key={index} style={styles.questionItem}>
              <Text style={styles.questionText}>{index + 1}. {getLocalized(question.question, locale)}</Text>
              <View style={styles.optionsContainer}>
                {question.options.map((option, optIndex) => (
                  <TouchableOpacity
                    key={optIndex}
                    style={[
                      styles.optionButton,
                      quizAnswers[index] === optIndex && styles.selectedOption
                    ]}
                    onPress={() => handleQuizAnswer(index, optIndex)}
                  >
                    <Text style={[
                      styles.optionText,
                      quizAnswers[index] === optIndex && styles.selectedOptionText
                    ]}>
                      {String.fromCharCode(65 + optIndex)}. {getLocalized(option, locale)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Sección de notas */}
      <View style={styles.notesSection}>
        <Text style={styles.sectionTitle}>📝 {t('lesson.notes')}</Text>

        <TextInput
          multiline
          placeholder="Escribe tus notas o impresiones sobre esta lección..."
          value={noteContent}
          onChangeText={setNoteContent}
          style={styles.noteInput}
          textAlignVertical="top"
        />

        <View style={styles.buttonsContainer}>
          <Button
            title={isLoading ? "Guardando..." : `💾 ${t('lesson.actions.saveNotes')}`}
            onPress={saveNotes}
            disabled={isLoading || !noteContent.trim()}
            color="#007AFF"
          />

          <Button
            title={isLoading ? "Finalizando..." : `✅ ${t('lesson.actions.complete')}`}
            onPress={finishLesson}
            disabled={isLoading || quizAnswers.length !== lesson.quiz.length}
            color="#34C759"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  completedBadge: {
    backgroundColor: '#34C759',
    padding: 10,
    alignItems: 'center',
  },
  completedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lessonContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a365d',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  referencesContainer: {
    backgroundColor: '#ebf8ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  quizContainer: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  questionItem: {
    marginBottom: 15,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 10,
  },
  optionsContainer: {
    marginLeft: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#4b5563',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2d3748',
  },
  referenceText: {
    fontSize: 14,
    color: '#3182ce',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  notesSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    marginTop: 10,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 12,
    padding: 16,
    minHeight: 150,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 15,
  },
});

export default LessonDetail;