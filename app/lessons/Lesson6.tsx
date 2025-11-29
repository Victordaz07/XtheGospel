import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useI18n } from '../../context/I18nContext';
import LessonCard from './components/LessonCard';
import LessonDetail from './LessonDetail';

const Lesson6: React.FC = () => {
    const { t } = useI18n();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(0);

    const topics = [
        { id: "lesson6.intro", icon: "🙏" },
        { id: "lesson6.priesthood", icon: "👨‍💼" },
        { id: "lesson6.missionary_work", icon: "🌍" },
        { id: "lesson6.service_and_charity", icon: "💝" },
        { id: "lesson6.temple_work", icon: "🏛️" },
        { id: "lesson6.family_history", icon: "📚" },
        { id: "lesson6.endure_faithfully", icon: "🏁" },
        { id: "lesson6.objections", icon: "❓" },
        { id: "lesson6.testimony_and_invitations", icon: "💬" }
    ];

    const handleTopicPress = (topicId: string) => {
        setSelectedTopic(topicId);
        const index = topics.findIndex(topic => topic.id === topicId);
        setCurrentTopicIndex(index);
    };

    const handleNextTopic = () => {
        if (currentTopicIndex < topics.length - 1) {
            const nextIndex = currentTopicIndex + 1;
            setCurrentTopicIndex(nextIndex);
            setSelectedTopic(topics[nextIndex].id);
        }
    };

    const handleTestLearning = () => {
        navigation.navigate('QuizLesson6' as never);
    };

    const handleBackToLesson = () => {
        setSelectedTopic(null);
        setCurrentTopicIndex(0);
    };

    if (selectedTopic) {
        return (
            <LessonDetail
                topicId={selectedTopic}
                onBack={handleBackToLesson}
                onNextTopic={handleNextTopic}
                onTestLearning={handleTestLearning}
                onBackToLesson={handleBackToLesson}
                isLastTopic={currentTopicIndex === topics.length - 1}
            />
        );
    }

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 20 }]}
            >
                <View style={styles.topicsContainer}>
                    {topics.map((topic, index) => (
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
};

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
    topicsContainer: {
        gap: 12,
    },
});

export default Lesson6;
