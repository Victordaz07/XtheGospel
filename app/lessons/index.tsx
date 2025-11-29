import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { useI18n } from "../../context/I18nContext";

// Intentar importar missionaryLessons, con fallback si falla
let missionaryLessons: any[] = [];
try {
    const module = require("../../data/missionaryGuideLessons");
    missionaryLessons = module.missionaryLessons || [];
    console.log('✅ Import exitoso, lecciones:', missionaryLessons.length);
} catch (error) {
    console.error('❌ Error importando missionaryLessons:', error);
    // Fallback: definir lecciones directamente
    missionaryLessons = [
        { order: 1, titleKey: 'lesson1.title', tagKey: 'lesson1.tag', durationKey: 'lesson1.duration', screenName: 'Lesson1' },
        { order: 2, titleKey: 'lesson2.title', tagKey: 'lesson2.tag', durationKey: 'lesson2.duration', screenName: 'Lesson2' },
        { order: 3, titleKey: 'lesson3.title', tagKey: 'lesson3.tag', durationKey: 'lesson3.duration', screenName: 'Lesson3' },
        { order: 4, titleKey: 'lesson4.title', tagKey: 'lesson4.tag', durationKey: 'lesson4.duration', screenName: 'Lesson4' },
        { order: 5, titleKey: 'lesson5.title', tagKey: 'lesson5.tag', durationKey: 'lesson5.duration', screenName: 'Lesson5' },
        { order: 6, titleKey: 'lesson6.title', tagKey: 'lesson6.tag', durationKey: 'lesson6.duration', screenName: 'Lesson6' },
    ];
    console.log('⚠️ Usando fallback, lecciones:', missionaryLessons.length);
}

export default function LessonsIndex() {
    const { t } = useI18n();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const lessons = React.useMemo(() => {
        if (!missionaryLessons || missionaryLessons.length === 0) {
            console.warn('⚠️ missionaryLessons está vacío o undefined');
            return [];
        }
        const mapped = missionaryLessons
            .sort((a, b) => a.order - b.order)
            .map((lesson) => ({
                id: lesson.screenName,
                title: t(lesson.titleKey),
                tag: t(lesson.tagKey),
                duration: t(lesson.durationKey)
            }));
        console.log('📚 Lecciones mapeadas:', mapped.length, mapped);
        return mapped;
    }, [t]);

    // Debug: verificar que las lecciones se carguen
    React.useEffect(() => {
        console.log('🔍 DEBUG LessonsIndex:');
        console.log('  - missionaryLessons:', missionaryLessons?.length || 0);
        console.log('  - lessons mapped:', lessons.length);
        console.log('  - first lesson:', lessons[0]);
    }, [lessons]);

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
                {/* Header Card */}
                <View style={styles.headerCard}>
                    <Text style={styles.headerTitle}>{t("missionaryGuide.headerTitle")}</Text>
                    <Text style={styles.headerSubtitle}>{t("missionaryGuide.headerSubtitle")}</Text>
                </View>

                <View style={styles.lessonsContainer}>
                    {lessons.length > 0 ? (
                        lessons.map((lesson, index) => (
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
                                    <Text style={styles.lessonDescription}>{lesson.tag} • {lesson.duration}</Text>
                                </View>
                                <View style={styles.arrowContainer}>
                                    <Text style={styles.arrow}>→</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>Cargando lecciones...</Text>
                        </View>
                    )}
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
        backgroundColor: "#E8F4FD", // Fondo azul claro como en la imagen
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        flexGrow: 1,
    },
    headerCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 14,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#5A48FF",
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#7A7A7A",
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
    emptyState: {
        padding: 40,
        alignItems: "center",
    },
    emptyStateText: {
        fontSize: 16,
        color: "#6b7280",
        textAlign: "center",
    },
});