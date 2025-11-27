import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useI18n } from '../../../context/I18nContext';
import QuizLevelSelector from './QuizLevelSelector';

export default function QuizIndex() {
  const navigation = useNavigation();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  const lessons = [
    {
      id: 1,
      title: t("lesson1.title"),
      subtitle: t("quiz.lesson1.subtitle"),
      description: t("quiz.lesson1.description"),
      questions: 3,
      color: "#3b82f6",
    },
    {
      id: 2,
      title: t("lesson2.title"),
      subtitle: t("quiz.lesson2.subtitle"),
      description: t("quiz.lesson2.description"),
      questions: 3,
      color: "#10b981",
    },
    {
      id: 3,
      title: t("lesson3.title"),
      subtitle: t("quiz.lesson3.subtitle"),
      description: t("quiz.lesson3.description"),
      questions: 3,
      color: "#f59e0b",
    },
    {
      id: 4,
      title: t("lesson4.title"),
      subtitle: t("quiz.lesson4.subtitle"),
      description: t("quiz.lesson4.description"),
      questions: 3,
      color: "#ef4444",
    },
    {
      id: 5,
      title: t("lesson5.title"),
      subtitle: t("quiz.lesson5.subtitle"),
      description: t("quiz.lesson5.description"),
      questions: 3,
      color: "#8b5cf6",
    },
  ];

  const handleLessonPress = (lessonId: number) => {
    setSelectedLesson(lessonId);
    setShowLevelSelector(true);
  };

  const handleLevelSelect = (level: 'easy' | 'medium' | 'hard') => {
    if (selectedLesson) {
      navigation.navigate(`QuizLesson${selectedLesson}` as never, { level } as never);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{t("quiz.title")}</Text>
            <Text style={styles.headerSubtitle}>{t("quiz.subtitle")}</Text>
          </View>

          <View style={styles.lessonsContainer}>
            {lessons.map((lesson) => (
              <TouchableOpacity
                key={lesson.id}
                style={[styles.lessonCard, { borderLeftColor: lesson.color }]}
                onPress={() => handleLessonPress(lesson.id)}
              >
                <View style={styles.lessonHeader}>
                  <View style={[styles.lessonIcon, { backgroundColor: lesson.color }]}>
                    <Text style={styles.lessonNumber}>{lesson.id}</Text>
                  </View>
                  <View style={styles.lessonInfo}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>
                  </View>
                </View>
                <Text style={styles.lessonDescription}>{lesson.description}</Text>
                <View style={styles.lessonFooter}>
                  <Text style={styles.questionCount}>{lesson.questions} {t("quiz.questions")}</Text>
                  <Text style={styles.startQuiz}>{t("quiz.start")}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>{t("quiz.tips.title")}</Text>
            <Text style={styles.infoText}>{t("quiz.tips.text")}</Text>
          </View>
        </ScrollView>
      </View>

      <QuizLevelSelector
        visible={showLevelSelector}
        onClose={() => setShowLevelSelector(false)}
        onSelectLevel={handleLevelSelect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
  },
  lessonsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  lessonCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  lessonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lessonNumber: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  lessonSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  lessonDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  },
  lessonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionCount: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  startQuiz: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});