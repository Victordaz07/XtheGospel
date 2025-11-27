import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos
type LessonProgress = {
    lessonId: string;
    completed: boolean;
    progress: number;      // 0..100
    lastAccessed: string;  // ISO string
    quizScore?: number;    // 0..100
    notes?: string;
};

interface ProgressContextType {
    progress: LessonProgress[];
    markLessonCompleted: (lessonId: string, quizScore?: number) => Promise<void>;
    updateLessonProgress: (lessonId: string, progress: number, notes?: string) => Promise<void>;
    getLessonProgress: (lessonId: string) => LessonProgress | undefined;
    getOverallProgress: () => number;
    clearProgress: () => Promise<void>;  // por ahora limpia todo sin QR
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

interface ProgressProviderProps {
    children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
    const [progress, setProgress] = useState<LessonProgress[]>([]);

    // Cargar progreso al montar
    useEffect(() => {
        loadProgress();
    }, []);

    // Guardar progreso cada vez que cambie
    useEffect(() => {
        if (progress.length > 0) {
            saveProgress();
        }
    }, [progress]);

    const loadProgress = async () => {
        try {
            const storedProgress = await AsyncStorage.getItem('lessonProgress');
            if (storedProgress) {
                const parsedProgress = JSON.parse(storedProgress);
                setProgress(parsedProgress);
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    };

    const saveProgress = async () => {
        try {
            await AsyncStorage.setItem('lessonProgress', JSON.stringify(progress));
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    };

    const markLessonCompleted = async (lessonId: string, quizScore?: number) => {
        try {
            const existing = progress.find(p => p.lessonId === lessonId);
            const updatedProgress = existing
                ? progress.map(p => p.lessonId === lessonId ? {
                    ...p,
                    completed: true,
                    progress: 100,
                    lastAccessed: new Date().toISOString(),
                    quizScore
                } : p)
                : [...progress, {
                    lessonId,
                    completed: true,
                    progress: 100,
                    lastAccessed: new Date().toISOString(),
                    quizScore
                }];

            setProgress(updatedProgress);
        } catch (error) {
            console.error('Error marking lesson completed:', error);
        }
    };

    const updateLessonProgress = async (lessonId: string, progressValue: number, notes?: string) => {
        try {
            const existing = progress.find(p => p.lessonId === lessonId);
            const updatedProgress = existing
                ? progress.map(p => p.lessonId === lessonId ? {
                    ...p,
                    progress: progressValue,
                    completed: progressValue === 100,
                    lastAccessed: new Date().toISOString(),
                    notes: notes !== undefined ? notes : p.notes
                } : p)
                : [...progress, {
                    lessonId,
                    completed: progressValue === 100,
                    progress: progressValue,
                    lastAccessed: new Date().toISOString(),
                    notes
                }];

            setProgress(updatedProgress);
        } catch (error) {
            console.error('Error updating lesson progress:', error);
        }
    };

    const getLessonProgress = (lessonId: string): LessonProgress | undefined => {
        return progress.find(p => p.lessonId === lessonId);
    };

    const getOverallProgress = (): number => {
        if (progress.length === 0) return 0;
        const totalProgress = progress.reduce((sum, lesson) => sum + lesson.progress, 0);
        return Math.round(totalProgress / progress.length);
    };

    const clearProgress = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem('lessonProgress');
            setProgress([]);
        } catch (error) {
            console.error('Error clearing progress:', error);
        }
    };

    return (
        <ProgressContext.Provider value={{
            progress,
            markLessonCompleted,
            updateLessonProgress,
            getLessonProgress,
            getOverallProgress,
            clearProgress
        }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = (): ProgressContextType => {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};