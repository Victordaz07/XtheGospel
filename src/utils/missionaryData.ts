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
    // Intentar primero con missionary.lessonX, luego con lessonX directamente
    let baseKey = `missionary.${lessonId}`;
    let title = t(`${baseKey}.title`);
    
    // Si no existe, intentar con lessonX directamente (nuestro formato premium)
    if (!title || title === `${baseKey}.title`) {
        baseKey = lessonId;
        title = t(`${baseKey}.title`);
    }
    
    // Verificar que existe el título
    if (!title || title === `${baseKey}.title`) {
        console.warn(`⚠️ No se encontró título para ${lessonId} con baseKey ${baseKey}`);
        return null;
    }

    // Cargar datos básicos - intentar ambos formatos
    let doctrineFocus = t(`${baseKey}.doctrineFocus`);
    if (!doctrineFocus || doctrineFocus === `${baseKey}.doctrineFocus`) {
        // Intentar con intro.desc como fallback
        doctrineFocus = t(`${baseKey}.intro.desc`) || t(`${baseKey}.intro`) || '';
    }
    
    let overview = t(`${baseKey}.overview`);
    if (!overview || overview === `${baseKey}.overview`) {
        // Intentar con intro.desc como fallback
        overview = t(`${baseKey}.intro.desc`) || t(`${baseKey}.intro`) || '';
    }
    
    // Intentar obtener pmgRefs y handbookRefs
    let pmgRefs = t(`${baseKey}.pmgRefs`);
    if (!pmgRefs || pmgRefs === `${baseKey}.pmgRefs`) {
        // Si no existe, usar un valor por defecto basado en la lección
        pmgRefs = 'Predicad Mi Evangelio - Capítulo 3';
    }
    
    let handbookRefs = t(`${baseKey}.handbookRefs`);
    if (!handbookRefs || handbookRefs === `${baseKey}.handbookRefs`) {
        // Si no existe, usar un valor por defecto
        handbookRefs = 'Manual Misional - Sección de Lecciones';
    }

    // Cargar arrays dinámicamente - intentar ambos formatos
    const keyPoints: string[] = [];
    // Intentar con keyPoints primero
    let i = 0;
    while (true) {
        const point = t(`${baseKey}.keyPoints.${i}`);
        if (!point || point === `${baseKey}.keyPoints.${i}`) break;
        keyPoints.push(point);
        i++;
    }
    // Si no hay keyPoints, usar los títulos de las secciones como puntos clave
    if (keyPoints.length === 0) {
        const sections = ['intro', 'christ_church', 'apostasy', 'first_vision', 'book_of_mormon'];
        for (const section of sections) {
            const sectionTitle = t(`${baseKey}.${section}`);
            if (sectionTitle && sectionTitle !== `${baseKey}.${section}`) {
                keyPoints.push(sectionTitle);
            }
        }
    }

    const keyScriptures: string[] = [];
    // Intentar con keyScriptures primero
    i = 0;
    while (true) {
        const scripture = t(`${baseKey}.keyScriptures.${i}`);
        if (!scripture || scripture === `${baseKey}.keyScriptures.${i}`) break;
        keyScriptures.push(scripture);
        i++;
    }
    // Si no hay keyScriptures, usar las escrituras de intro
    if (keyScriptures.length === 0) {
        const introScripture = t(`${baseKey}.intro.scriptureRef`);
        if (introScripture && introScripture !== `${baseKey}.intro.scriptureRef`) {
            keyScriptures.push(introScripture);
        }
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
    // Intentar con questions primero (formato antiguo)
    i = 0;
    while (true) {
        const question = t(`${baseKey}.questions.${i}`);
        if (!question || question === `${baseKey}.questions.${i}`) break;
        questions.push(question);
        i++;
    }
    // Si no hay questions, usar las preguntas inspiradas de intro
    if (questions.length === 0) {
        i = 0;
        while (true) {
            const question = t(`${baseKey}.intro.questions.${i}`);
            if (!question || question === `${baseKey}.intro.questions.${i}`) break;
            questions.push(question);
            i++;
            if (i > 10) break; // Limitar para evitar loops infinitos
        }
    }

    const commitments: string[] = [];
    i = 0;
    while (true) {
        const commitment = t(`${baseKey}.commitments.${i}`);
        if (!commitment || commitment === `${baseKey}.commitments.${i}`) break;
        commitments.push(commitment);
        i++;
    }
    // Si no hay commitments, usar las invitaciones de testimony_and_invitations
    if (commitments.length === 0) {
        i = 0;
        while (true) {
            const invitation = t(`${baseKey}.testimony_and_invitations.invitations.${i}`);
            if (!invitation || invitation === `${baseKey}.testimony_and_invitations.invitations.${i}`) break;
            commitments.push(invitation);
            i++;
            if (i > 10) break;
        }
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

