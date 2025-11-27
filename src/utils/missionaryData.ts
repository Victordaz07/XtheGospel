/**
 * Helper para cargar datos de lecciones misioneras desde i18n
 */

export interface MissionaryLessonData {
    id: string;
    title: string;
    doctrineFocus: string;
    overview: string;
    keyPoints: string[];
    keyScriptures: string[];
    prophetQuotes: string[];
    questions: string[];
    commitments: string[];
    pmgRefs: string;
    handbookRefs: string;
}

export const MISSIONARY_LESSON_IDS = ['lesson1', 'lesson2', 'lesson3', 'lesson4', 'lesson5', 'lesson6', 'lesson7'];

export const getMissionaryLessonData = (
    lessonId: string,
    t: (key: string) => string
): MissionaryLessonData | null => {
    const baseKey = `missionary.${lessonId}`;

    // Verificar que existe el título
    const title = t(`${baseKey}.title`);
    if (!title || title === `${baseKey}.title`) {
        return null;
    }

    // Cargar datos básicos
    const doctrineFocus = t(`${baseKey}.doctrineFocus`);
    const overview = t(`${baseKey}.overview`);
    const pmgRefs = t(`${baseKey}.pmgRefs`);
    const handbookRefs = t(`${baseKey}.handbookRefs`);

    // Cargar arrays dinámicamente
    const keyPoints: string[] = [];
    let i = 0;
    while (true) {
        const point = t(`${baseKey}.keyPoints.${i}`);
        if (!point || point === `${baseKey}.keyPoints.${i}`) break;
        keyPoints.push(point);
        i++;
    }

    const keyScriptures: string[] = [];
    i = 0;
    while (true) {
        const scripture = t(`${baseKey}.keyScriptures.${i}`);
        if (!scripture || scripture === `${baseKey}.keyScriptures.${i}`) break;
        keyScriptures.push(scripture);
        i++;
    }

    const prophetQuotes: string[] = [];
    i = 0;
    while (true) {
        const quote = t(`${baseKey}.prophetQuotes.${i}`);
        if (!quote || quote === `${baseKey}.prophetQuotes.${i}`) break;
        prophetQuotes.push(quote);
        i++;
    }

    const questions: string[] = [];
    i = 0;
    while (true) {
        const question = t(`${baseKey}.questions.${i}`);
        if (!question || question === `${baseKey}.questions.${i}`) break;
        questions.push(question);
        i++;
    }

    const commitments: string[] = [];
    i = 0;
    while (true) {
        const commitment = t(`${baseKey}.commitments.${i}`);
        if (!commitment || commitment === `${baseKey}.commitments.${i}`) break;
        commitments.push(commitment);
        i++;
    }

    return {
        id: lessonId,
        title,
        doctrineFocus,
        overview,
        keyPoints,
        keyScriptures,
        prophetQuotes,
        questions,
        commitments,
        pmgRefs,
        handbookRefs,
    };
};

export const getAllMissionaryLessons = (t: (key: string) => string): MissionaryLessonData[] => {
    return MISSIONARY_LESSON_IDS
        .map(id => getMissionaryLessonData(id, t))
        .filter((lesson): lesson is MissionaryLessonData => lesson !== null);
};

