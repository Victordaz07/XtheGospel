import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useI18n } from '../context/I18nContext';

// Import lesson components
import LessonsIndex from '../app/lessons/index';
import Lesson1 from '../app/lessons/Lesson1';
import Lesson2 from '../app/lessons/Lesson2';
import Lesson3 from '../app/lessons/Lesson3';
import Lesson4 from '../app/lessons/Lesson4';
import Lesson5 from '../app/lessons/Lesson5';
import Lesson6 from '../app/lessons/Lesson6';
import QuizLesson6 from '../app/lessons/quiz/QuizLesson6';

// Import Quiz and Reflections components
import QuizIndex from '../app/lessons/quiz/index';
import QuizLesson1 from '../app/lessons/quiz/QuizLesson1';
import QuizLesson2 from '../app/lessons/quiz/QuizLesson2';
import QuizLesson3 from '../app/lessons/quiz/QuizLesson3';
import QuizLesson4 from '../app/lessons/quiz/QuizLesson4';
import QuizLesson5 from '../app/lessons/quiz/QuizLesson5';
import ReflectionsIndex from '../app/lessons/reflections/index';

const Stack = createStackNavigator();

export default function LessonsNavigator() {
    const { t } = useI18n();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#3b82f6',
                    height: 60, // Reducir altura del header
                    elevation: 8, // Sombra en Android
                    shadowColor: '#000', // Sombra en iOS
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 18, // Reducir tamaño del título
                },
            }}
        >
            <Stack.Screen
                name="LessonsIndex"
                component={LessonsIndex}
                options={{ title: t('navigation.lessons') }}
            />
            <Stack.Screen
                name="Lesson1"
                component={Lesson1}
                options={{ title: t('lesson1.title') }}
            />
            <Stack.Screen
                name="Lesson2"
                component={Lesson2}
                options={{ title: t('lesson2.title') }}
            />
            <Stack.Screen
                name="Lesson3"
                component={Lesson3}
                options={{ title: t('lesson3.title') }}
            />
            <Stack.Screen
                name="Lesson4"
                component={Lesson4}
                options={{ title: t('lesson4.title') }}
            />
            <Stack.Screen
                name="Lesson5"
                component={Lesson5}
                options={{ title: t('lesson5.title') }}
            />
            <Stack.Screen
                name="Lesson6"
                component={Lesson6}
                options={{ title: t('lesson6.title') }}
            />
            <Stack.Screen
                name="QuizLesson6"
                component={QuizLesson6}
                options={{ title: t('quiz.quizTitle') + ' - ' + t('lesson6.title') }}
            />

            {/* Quiz Screens */}
            <Stack.Screen
                name="QuizIndex"
                component={QuizIndex}
                options={{ title: t('quiz.title') }}
            />
            <Stack.Screen
                name="QuizLesson1"
                component={QuizLesson1}
                options={{ title: t('quiz.quizTitle') + ' 1' }}
            />
            <Stack.Screen
                name="QuizLesson2"
                component={QuizLesson2}
                options={{ title: t('quiz.quizTitle') + ' 2' }}
            />
            <Stack.Screen
                name="QuizLesson3"
                component={QuizLesson3}
                options={{ title: t('quiz.quizTitle') + ' 3' }}
            />
            <Stack.Screen
                name="QuizLesson4"
                component={QuizLesson4}
                options={{ title: t('quiz.quizTitle') + ' 4' }}
            />
            <Stack.Screen
                name="QuizLesson5"
                component={QuizLesson5}
                options={{ title: t('quiz.quizTitle') + ' 5' }}
            />

            {/* Reflections Screen */}
            <Stack.Screen
                name="ReflectionsIndex"
                component={ReflectionsIndex}
                options={{ title: t('reflections.title') }}
            />
        </Stack.Navigator>
    );
}