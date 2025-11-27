import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProgress } from '../../../context/ProgressContext';
import { useI18n } from '../../../context/I18nContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import LessonCard from '../../../components/LessonCard';
import { LESSONS, getLocalized } from '../../../data/lessonsData';
export default function InvestigatorLessons() {
  const { getLessonProgress } = useProgress();
  const { locale, t } = useI18n();
  const insets = useSafeAreaInsets();
  type RootStackParamList = {
    LessonDetail: { lessonId: string };
  };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderLessonItem = ({ item }: { item: any }) => {
    const lessonProgress = getLessonProgress(item.id)?.progress || 0;

    return (
      <LessonCard
        id={item.id}
        title={getLocalized(item.title, locale)}
        description={getLocalized(item.description, locale)}
        percent={lessonProgress}
        onPress={() => navigation.navigate('LessonDetail', { lessonId: item.id })}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('lesson.listTitle')}</Text>
        <Text style={styles.headerSubtitle}>
          {LESSONS.filter(lesson => getLessonProgress(lesson.id)?.completed).length} {t('lessons.of')} {LESSONS.length} {t('lessons.completed')}
        </Text>
      </View>

      <FlatList
        data={LESSONS}
        renderItem={renderLessonItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 20 }]}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  listContent: {
    padding: 16,
  },
  lessonCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  lessonCardCompleted: {
    borderColor: '#34C759',
    backgroundColor: '#f8fff8',
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  lessonIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 6,
    lineHeight: 20,
  },
  lessonDuration: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'right',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  completedText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});