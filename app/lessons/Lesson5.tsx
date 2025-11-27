import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LessonCard from "./components/LessonCard";
import LessonDetail from "./LessonDetail";
import { useI18n } from "../../context/I18nContext";

export default function Lesson5() {
  const { t } = useI18n();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [selectedTopic, setSelectedTopic] = React.useState<string | null>(null);
  const [currentTopicIndex, setCurrentTopicIndex] = React.useState<number>(0);

  const topics = [
    { id: "lesson5.topic1", icon: "💧" }, // Bautismo y confirmación
    { id: "lesson5.topic2", icon: "👨‍💼" }, // Seguir al profeta
    { id: "lesson5.topic3", icon: "👨‍💼" }, // Sacerdocio y organizaciones auxiliares
    { id: "lesson5.topic4", icon: "💍" }, // Matrimonio eterno y familia
    { id: "lesson5.topic5", icon: "🏛️" }, // Templos e historia familiar
    { id: "lesson5.topic6", icon: "🌍" }, // La obra misional
    { id: "lesson5.topic7", icon: "🏁" } // Perseverar hasta el fin
  ];

  const handleTopicPress = (topicId: string) => {
    const topicIndex = topics.findIndex(topic => topic.id === topicId);
    setSelectedTopic(topicId);
    setCurrentTopicIndex(topicIndex);
  };

  const handleNextTopic = () => {
    if (currentTopicIndex < topics.length - 1) {
      const nextIndex = currentTopicIndex + 1;
      setCurrentTopicIndex(nextIndex);
      setSelectedTopic(topics[nextIndex].id);
    }
  };

  const handleTestLearning = () => {
    // Navegar al quiz de la lección 5
    setSelectedTopic(null);
    setCurrentTopicIndex(0);
    (navigation as any).navigate('QuizLesson5');
  };

  const handleBackToLesson = () => {
    setSelectedTopic(null);
    setCurrentTopicIndex(0);
  };

  const handleBack = () => {
    setSelectedTopic(null);
    setCurrentTopicIndex(0);
  };

  if (selectedTopic) {
    const isLastTopic = currentTopicIndex === topics.length - 1;
    return (
      <LessonDetail
        topicId={selectedTopic}
        onBack={handleBack}
        onNextTopic={handleNextTopic}
        onTestLearning={handleTestLearning}
        onBackToLesson={handleBackToLesson}
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
        <Text style={styles.header}>{t("lesson5.title")}</Text>
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