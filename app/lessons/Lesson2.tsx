import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LessonCard from "./components/LessonCard";
import LessonDetail from "./LessonDetail";
import { useI18n } from "../../context/I18nContext";

export default function Lesson2() {
  const { t } = useI18n();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [selectedTopic, setSelectedTopic] = React.useState<string | null>(null);
  const [currentTopicIndex, setCurrentTopicIndex] = React.useState<number>(0);

  const topics = [
    { id: "lesson2.topic1", icon: "🏠" },
    { id: "lesson2.topic2", icon: "🎯" },
    { id: "lesson2.topic3", icon: "☁️" },
    { id: "lesson2.topic4", icon: "💡" },
    { id: "lesson2.topic5", icon: "🙏" },
    { id: "lesson2.topic6", icon: "📚" },
    { id: "lesson2.topic7", icon: "✨" }
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
    // Navegar al quiz de la lección 2
    setSelectedTopic(null);
    setCurrentTopicIndex(0);
    (navigation as any).navigate('QuizLesson2');
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
        <Text style={styles.header}>{t("lesson2.title")}</Text>
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