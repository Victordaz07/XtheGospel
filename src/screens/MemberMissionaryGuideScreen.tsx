import React from 'react';
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

import { getMissionaryLessons } from '../data/member';
import type { MissionaryLessonId } from '../data/member/missionaryGuide';

type MemberGuideStackParamList = {
  MemberMissionaryGuide: undefined;
  MissionaryLessonDetail: { lessonId: MissionaryLessonId };
};

type Props = NativeStackScreenProps<MemberGuideStackParamList, 'MemberMissionaryGuide'>;

const H_PADDING = 16;

export const MemberMissionaryGuideScreen: React.FC<Props> = ({ navigation }) => {
  const lessons = getMissionaryLessons();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>Missionary Guide</Text>
          <Text style={styles.headerSubtitle}>
            Practica las lecciones con estructura, escrituras, preguntas inspiradas y ejemplos
            reales antes de enseñar.
          </Text>
        </View>

        {lessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            activeOpacity={0.85}
            style={styles.lessonCard}
            onPress={() =>
              navigation.navigate('MissionaryLessonDetail', {
                lessonId: lesson.id,
              })
            }
          >
            <View style={styles.lessonLeft}>
              <View style={styles.lessonBadge}>
                <Text style={styles.lessonBadgeText}>{lesson.order}</Text>
              </View>
              <View style={styles.lessonTextContainer}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>
                <Text style={styles.lessonObjective} numberOfLines={2}>
                  {lesson.objective}
                </Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#94A3B8" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        ))}
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
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5A48FF',
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
  },
  lessonCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  lessonBadge: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  lessonBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4F46E5',
  },
  lessonTextContainer: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  lessonSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  lessonObjective: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
});

export default MemberMissionaryGuideScreen;




