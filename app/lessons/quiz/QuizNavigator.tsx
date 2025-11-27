import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useI18n } from '../../context/I18nContext';

// Importar las pantallas de quiz individuales
import QuizIndex from './index';
import QuizLesson1 from './QuizLesson1';
import QuizLesson2 from './QuizLesson2';
import QuizLesson3 from './QuizLesson3';
import QuizLesson4 from './QuizLesson4';
import QuizLesson5 from './QuizLesson5';

const Stack = createStackNavigator();

export default function QuizNavigator() {
    const { t } = useI18n();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#3b82f6',
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="QuizIndex"
                component={QuizIndex}
                options={{
                    title: t('quiz.title'),
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="QuizLesson1"
                component={QuizLesson1}
                options={{ title: `${t('quiz.quizTitle')} 1` }}
            />
            <Stack.Screen
                name="QuizLesson2"
                component={QuizLesson2}
                options={{ title: `${t('quiz.quizTitle')} 2` }}
            />
            <Stack.Screen
                name="QuizLesson3"
                component={QuizLesson3}
                options={{ title: `${t('quiz.quizTitle')} 3` }}
            />
            <Stack.Screen
                name="QuizLesson4"
                component={QuizLesson4}
                options={{ title: `${t('quiz.quizTitle')} 4` }}
            />
            <Stack.Screen
                name="QuizLesson5"
                component={QuizLesson5}
                options={{ title: `${t('quiz.quizTitle')} 5` }}
            />
        </Stack.Navigator>
    );
}
