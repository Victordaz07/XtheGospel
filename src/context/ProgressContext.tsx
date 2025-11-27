import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { StorageService } from '../utils/storage';

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
    getOverallProgress: () => { completedLessons: number; totalLessons: number; percentage: number };
    getCurrentLesson: () => { lessonId: string; lastAccessed: string } | null;
    clearProgress: () => Promise<void>;
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
            const storedProgress = StorageService.getItem('lessonProgress');
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
            StorageService.setItem('lessonProgress', JSON.stringify(progress));
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

    const getOverallProgress = (): { completedLessons: number; totalLessons: number; percentage: number } => {
        const totalLessons = 7; // Total de lecciones disponibles
        const completedLessons = progress.filter(p => p.completed).length;
        const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        return { completedLessons, totalLessons, percentage };
    };

    const getCurrentLesson = (): { lessonId: string; lastAccessed: string } | null => {
        if (progress.length === 0) return null;
        
        // Obtener la lección más recientemente accedida que no esté completada
        const incompleteLessons = progress
            .filter(p => !p.completed)
            .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime());
        
        if (incompleteLessons.length > 0) {
            return {
                lessonId: incompleteLessons[0].lessonId,
                lastAccessed: incompleteLessons[0].lastAccessed
            };
        }
        
        // Si todas están completadas, devolver la última accedida
        const sortedByAccess = [...progress].sort((a, b) => 
            new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
        );
        
        return sortedByAccess.length > 0 ? {
            lessonId: sortedByAccess[0].lessonId,
            lastAccessed: sortedByAccess[0].lastAccessed
        } : null;
    };

    const clearProgress = async (): Promise<void> => {
        try {
            StorageService.removeItem('lessonProgress');
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
            getCurrentLesson,
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

