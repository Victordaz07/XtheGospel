// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: number;
  scriptureReferences: string[];
  questions: {
    id: string;
    type: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  required: boolean;
  order: number;
};

type RootStackParamList = {
  Home: undefined;
  LessonDetail: { lesson: Lesson };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const dummyLesson: Lesson = {
    id: '1',
    title: 'Lección de Prueba',
    description: 'Esto es una lección de ejemplo.',
    duration: 10,
    scriptureReferences: ['Juan 3:16'],
    questions: [
      { id: 'q1', type: 'multiple', question: '¿Quién es Jesucristo?', options: ['Dios', 'Un profeta', 'Un ángel'], correctAnswer: 'Dios' }
    ],
    required: true,
    order: 1,
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla de Inicio</Text>
      <Button
        title="Ir a LessonDetail"
        onPress={() => navigation.navigate('LessonDetail', { lesson: dummyLesson })}
      />
    </View>
  );
}
