import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LessonCard from "./components/LessonCard";
import LessonDetail from "./LessonDetail";
import { useI18n } from "../../context/I18nContext";

export default function Lesson1() {
  const { t } = useI18n();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [selectedTopic, setSelectedTopic] = React.useState<string | null>(null);
  const [currentTopicIndex, setCurrentTopicIndex] = React.useState<number>(0);

  const topics = [
    { id: "lesson1.intro", icon: "🙏" },
    { id: "lesson1.christ_church", icon: "✝️" },
    { id: "lesson1.apostasy", icon: "🌑" },
    { id: "lesson1.jose_smith_searches", icon: "🔍" },
    { id: "lesson1.first_vision", icon: "✨" },
    { id: "lesson1.book_of_mormon", icon: "📖" },
    { id: "lesson1.priesthood_and_church_today", icon: "👨‍💼" },
    { id: "lesson1.objections", icon: "❓" },
    { id: "lesson1.testimony_and_invitations", icon: "💬" }
  ];

  const handleTopicPress = (topicId: string) => {
    const index = topics.findIndex(topic => topic.id === topicId);
    setCurrentTopicIndex(index);
    setSelectedTopic(topicId);
  };

  const handleBack = () => {
    setSelectedTopic(null);
    setCurrentTopicIndex(0);
  };

  const handleNextTopic = () => {
    if (currentTopicIndex < topics.length - 1) {
      const nextIndex = currentTopicIndex + 1;
      setCurrentTopicIndex(nextIndex);
      setSelectedTopic(topics[nextIndex].id);
    }
  };

  const handleTestLearning = () => {
    // Navegar al quiz de la lección 1 con nivel fácil por defecto
    setSelectedTopic(null);
    setCurrentTopicIndex(0);
    (navigation as any).navigate('QuizLesson1', { level: 'easy' });
  };

  const handleBackToLesson = () => {
    setSelectedTopic(null);
    setCurrentTopicIndex(0);
  };

  if (selectedTopic) {
    const isLastTopic = currentTopicIndex === topics.length - 1;
    return (
      <LessonDetail
        topicId={selectedTopic}
        onBack={handleBack}
        onNextTopic={!isLastTopic ? handleNextTopic : undefined}
        onTestLearning={isLastTopic ? handleTestLearning : undefined}
        onBackToLesson={isLastTopic ? handleBackToLesson : undefined}
        isLastTopic={isLastTopic}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { paddingBottom: insets.bottom }]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
      >
        <Text style={styles.header}>{t("lesson1.title")}</Text>
        <View style={styles.grid}>
          {topics.map((topic) => (
            <LessonCard
              key={topic.id}
              title={t(topic.id)}
              icon={topic.icon}
              onPress={() => handleTopicPress(topic.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  grid: {
    flexDirection: "column",
  },
});
