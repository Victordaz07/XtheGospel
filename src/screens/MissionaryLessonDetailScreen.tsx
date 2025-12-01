import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { getMissionaryLessonById } from '../data/member';
import type { MissionaryLessonId } from '../data/member/missionaryGuide';

type MemberGuideStackParamList = {
  MemberMissionaryGuide: undefined;
  MissionaryLessonDetail: { lessonId: MissionaryLessonId };
};

type Props = NativeStackScreenProps<MemberGuideStackParamList, 'MissionaryLessonDetail'>;

const H_PADDING = 16;

export const MissionaryLessonDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { lessonId } = route.params;

  const lesson = useMemo(() => getMissionaryLessonById(lessonId), [lessonId]);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  if (!lesson) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text>No se encontró la lección.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color="#4B5563" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>{lesson.title}</Text>
            <Text style={styles.headerSubtitle}>{lesson.subtitle}</Text>
          </View>
        </View>

        <View style={styles.objectiveCard}>
          <Text style={styles.objectiveLabel}>Objetivo de la lección</Text>
          <Text style={styles.objectiveText}>{lesson.objective}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Doctrinas clave</Text>
          {lesson.keyDoctrines.map((d, idx) => (
            <View key={idx} style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{d}</Text>
            </View>
          ))}
        </View>

        {lesson.quickFlow?.length ? (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Flujo rápido (antes de salir)</Text>
            {lesson.quickFlow.map((step, idx) => (
              <View key={idx} style={styles.stepRow}>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>{idx + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {lesson.sections.map((sec) => {
          const isOpen = !!openSections[sec.id];
          return (
            <View key={sec.id} style={styles.sectionCard}>
              <TouchableOpacity
                style={styles.sectionHeader}
                activeOpacity={0.8}
                onPress={() => toggleSection(sec.id)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionTitle}>{sec.title}</Text>
                  {!!sec.description && (
                    <Text style={styles.sectionDescription} numberOfLines={2}>
                      {sec.description}
                    </Text>
                  )}
                </View>
                <Ionicons
                  name={isOpen ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color="#6B7280"
                />
              </TouchableOpacity>

              {!!sec.quickSummary && (
                <View style={styles.quickSummaryBox}>
                  <Text style={styles.quickSummaryLabel}>Resumen rápido</Text>
                  <Text style={styles.quickSummaryText}>{sec.quickSummary}</Text>
                </View>
              )}

              {isOpen && (
                <View style={styles.sectionBody}>
                  {!!sec.longContent && (
                    <View style={{ marginBottom: 8 }}>
                      <Text style={styles.bodyText}>{sec.longContent}</Text>
                    </View>
                  )}

                  {sec.scriptures?.length ? (
                    <View style={styles.subSection}>
                      <Text style={styles.subSectionTitle}>Escrituras sugeridas</Text>
                      {sec.scriptures.map((scr, idx) => (
                        <View key={idx} style={styles.scriptureRow}>
                          <Text style={styles.scriptureRef}>{scr.reference}</Text>
                          {!!scr.explanation && (
                            <Text style={styles.scriptureExplanation}>{scr.explanation}</Text>
                          )}
                        </View>
                      ))}
                    </View>
                  ) : null}

                  {sec.inspiredQuestions?.length ? (
                    <View style={styles.subSection}>
                      <Text style={styles.subSectionTitle}>Preguntas inspiradas</Text>
                      {sec.inspiredQuestions.map((q, idx) => (
                        <View key={idx} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>?</Text>
                          <Text style={styles.bulletText}>{q}</Text>
                        </View>
                      ))}
                    </View>
                  ) : null}

                  {sec.commonComments?.length ? (
                    <View style={styles.subSection}>
                      <Text style={styles.subSectionTitle}>
                        Comentarios comunes y posibles respuestas
                      </Text>
                      {sec.commonComments.map((c, idx) => (
                        <View key={idx} style={styles.commentBox}>
                          <Text style={styles.commentLabel}>Investigador:</Text>
                          <Text style={styles.commentText}>{c.comment}</Text>
                          <Text style={styles.commentLabel}>Posible respuesta:</Text>
                          <Text style={styles.commentText}>{c.suggestedResponse}</Text>
                        </View>
                      ))}
                    </View>
                  ) : null}

                  {sec.pmgReferences?.length ? (
                    <View style={styles.subSection}>
                      <Text style={styles.subSectionTitle}>Predicad Mi Evangelio</Text>
                      {sec.pmgReferences.map((r, idx) => (
                        <Text key={idx} style={styles.pmgRefText}>
                          • {r}
                        </Text>
                      ))}
                    </View>
                  ) : null}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F0FF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: H_PADDING,
    paddingTop: 12,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
    borderRadius: 999,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  objectiveCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  objectiveLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F46E5',
    marginBottom: 4,
  },
  objectiveText: {
    fontSize: 13,
    color: '#111827',
  },
  sectionCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  sectionDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  quickSummaryBox: {
    marginTop: 8,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  quickSummaryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4F46E5',
    marginBottom: 2,
  },
  quickSummaryText: {
    fontSize: 12,
    color: '#111827',
  },
  sectionBody: {
    marginTop: 8,
  },
  bodyText: {
    fontSize: 12,
    color: '#111827',
    lineHeight: 18,
  },
  subSection: {
    marginTop: 8,
  },
  subSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  bulletDot: {
    width: 14,
    fontSize: 13,
    color: '#4B5563',
    marginRight: 2,
    textAlign: 'center',
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    color: '#111827',
  },
  scriptureRow: {
    marginBottom: 4,
  },
  scriptureRef: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
  },
  scriptureExplanation: {
    fontSize: 12,
    color: '#111827',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4F46E5',
  },
  stepText: {
    flex: 1,
    fontSize: 12,
    color: '#111827',
  },
  commentBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 6,
  },
  commentLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
  },
  commentText: {
    fontSize: 12,
    color: '#111827',
    marginBottom: 4,
  },
  pmgRefText: {
    fontSize: 11,
    color: '#6B7280',
  },
});

export default MissionaryLessonDetailScreen;




