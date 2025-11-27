// types/index.ts
export interface LessonNote {
    userId: string;
    lessonId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: number;
    scriptureReferences: string[];
    questions: Question[];
    required: boolean;
    order: number;
}

export interface Question {
    id: string;
    type: 'multiple' | 'text';
    question: string;
    options?: string[];
    correctAnswer?: string;
}