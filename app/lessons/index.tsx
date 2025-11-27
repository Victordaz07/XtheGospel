import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { useI18n } from "../../context/I18nContext";

export default function LessonsIndex() {
    const { t } = useI18n();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const lessons = [
        { id: "Lesson1", title: t("lesson1.title"), description: t("lessons.lesson1.description") },
        { id: "Lesson2", title: t("lesson2.title"), description: t("lessons.lesson2.description") },
        { id: "Lesson3", title: t("lesson3.title"), description: t("lessons.lesson3.description") },
        { id: "Lesson4", title: t("lesson4.title"), description: t("lessons.lesson4.description") },
        { id: "Lesson5", title: t("lesson5.title"), description: t("lessons.lesson5.description") },
        { id: "Lesson6", title: t("lesson6.title"), description: t("lessons.lesson6.description") }
    ];

    const handleLessonPress = (lessonId: string) => {
        navigation.navigate(lessonId as never);
    };

    const handleQuizPress = () => {
        navigation.navigate('QuizIndex' as never);
    };

    const handleReflectionsPress = () => {
        navigation.navigate('ReflectionsIndex' as never);
    };

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
            >
                <Text style={styles.header}>{t("navigation.lessons")}</Text>
                <Text style={styles.subtitle}>{t("lessons.selectLesson")}</Text>

                <View style={styles.lessonsContainer}>
                    {lessons.map((lesson, index) => (
                        <TouchableOpacity
                            key={lesson.id}
                            style={styles.lessonCard}
                            onPress={() => handleLessonPress(lesson.id)}
                        >
                            <View style={styles.lessonNumber}>
                                <Text style={styles.lessonNumberText}>{index + 1}</Text>
                            </View>
                            <View style={styles.lessonContent}>
                                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                                <Text style={styles.lessonDescription}>{lesson.description}</Text>
                            </View>
                            <View style={styles.arrowContainer}>
                                <Text style={styles.arrow}>→</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Sección de Quiz y Reflexiones */}
                <View style={styles.additionalSection}>
                    <Text style={styles.sectionTitle}>{t("lessons.learningTools")}</Text>

                    <TouchableOpacity
                        style={[styles.additionalCard, { borderLeftColor: '#f59e0b' }]}
                        onPress={handleQuizPress}
                    >
                        <View style={[styles.additionalIcon, { backgroundColor: '#f59e0b' }]}>
                            <Text style={styles.additionalIconText}>?</Text>
                        </View>
                        <View style={styles.additionalContent}>
                            <Text style={styles.additionalTitle}>{t("lessons.quizTitle")}</Text>
                            <Text style={styles.additionalDescription}>{t("lessons.quizDescription")}</Text>
                        </View>
                        <View style={styles.arrowContainer}>
                            <Text style={styles.arrow}>→</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.additionalCard, { borderLeftColor: '#10b981' }]}
                        onPress={handleReflectionsPress}
                    >
                        <View style={[styles.additionalIcon, { backgroundColor: '#10b981' }]}>
                            <Text style={styles.additionalIconText}>💭</Text>
                        </View>
                        <View style={styles.additionalContent}>
                            <Text style={styles.additionalTitle}>{t("lessons.reflectionsTitle")}</Text>
                            <Text style={styles.additionalDescription}>{t("lessons.reflectionsDescription")}</Text>
                        </View>
                        <View style={styles.arrowContainer}>
                            <Text style={styles.arrow}>→</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        flexGrow: 1,
    },
    header: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#6b7280",
        marginBottom: 24,
        textAlign: "center",
    },
    lessonsContainer: {
        gap: 12,
    },
    lessonCard: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: "#3b82f6",
    },
    lessonNumber: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#3b82f6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    lessonNumberText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "700",
    },
    lessonContent: {
        flex: 1,
    },
    lessonTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: 4,
    },
    lessonDescription: {
        fontSize: 14,
        color: "#6b7280",
    },
    arrowContainer: {
        marginLeft: 12,
    },
    arrow: {
        fontSize: 20,
        color: "#3b82f6",
        fontWeight: "bold",
    },
    additionalSection: {
        marginTop: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: 16,
        textAlign: "center",
    },
    additionalCard: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        borderLeftWidth: 4,
        marginBottom: 12,
    },
    additionalIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    additionalIconText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "700",
    },
    additionalContent: {
        flex: 1,
    },
    additionalTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: 4,
    },
    additionalDescription: {
        fontSize: 14,
        color: "#6b7280",
    },
});