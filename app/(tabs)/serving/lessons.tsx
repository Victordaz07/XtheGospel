import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProgress } from '../../../context/ProgressContext';
import { useI18n } from '../../../context/I18nContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import LessonCard from '../../../components/LessonCard';
import { LESSONS, getLocalized } from '../../../data/lessonsData';

const MissionaryLessons: React.FC = () => {
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
          {LESSONS.filter(lesson => getLessonProgress(lesson.id)?.completed).length} de {LESSONS.length} completadas
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
};

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
});

export default MissionaryLessons;