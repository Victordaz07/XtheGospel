// src/data/member/missionaryGuide.ts
// Estructura de datos para el Missionary Guide dentro del modo miembro

export type MissionaryLessonId =
  | 'lesson_1_restoration'
  | 'lesson_2_plan'
  | 'lesson_3_gospel'
  | 'lesson_4_commandments'
  | 'lesson_5_laws_and_ordinances';

export interface MissionaryGuideSection {
  id: string;
  title: string;
  description: string;
  longContent: string;
  quickSummary: string;
  scriptures: {
    reference: string;
    text?: string;
    explanation: string;
  }[];
  inspiredQuestions: string[];
  commonComments: {
    comment: string;
    suggestedResponse: string;
  }[];
  pmgReferences: string[];
}

export interface MissionaryGuideLesson {
  id: MissionaryLessonId;
  order: number;
  title: string;
  subtitle: string;
  objective: string;
  keyDoctrines: string[];
  sections: MissionaryGuideSection[];
  quickFlow: string[];
}

export const missionaryGuide: MissionaryGuideLesson[] = [
  {
    id: 'lesson_1_restoration',
    order: 1,
    title: 'La Restauración del Evangelio de Jesucristo',
    subtitle: 'Primera visión, profetas y autoridad del sacerdocio',
    objective:
      'Ayudar al amigo a entender que Dios ha restaurado la Iglesia de Jesucristo por medio del profeta José Smith y que puede saberlo por sí mismo.',
    keyDoctrines: [
      'Dios es nuestro Padre Celestial y nos conoce por nombre.',
      'Jesucristo es el Salvador y cabeza de la Iglesia.',
      'Ha habido apostasía y restauración.',
      'José Smith fue llamado como profeta de los últimos días.',
      'El Libro de Mormón es evidencia de la Restauración.',
    ],
    sections: [
      // 🔹 PEGA AQUÍ las secciones detalladas que ya preparaste (introducción, Primera Visión, invitaciones, etc.)
    ],
    quickFlow: [
      'Conectar: una experiencia donde Dios te escuchó.',
      'Explicar brevemente la apostasía y la necesidad de un profeta.',
      'Relatar la historia de la Primera Visión con tu testimonio personal.',
      'Presentar el Libro de Mormón como evidencia de la Restauración.',
      'Invitar a leer y orar para saber si es verdad.',
      'Invitar a asistir a la Iglesia y fijar una siguiente lección.',
    ],
  },
  {
    id: 'lesson_2_plan',
    order: 2,
    title: 'El Plan de Salvación',
    subtitle: 'De dónde venimos, por qué estamos aquí y a dónde vamos',
    objective:
      'Ayudar al amigo a ver su vida dentro del plan de Dios: premortalidad, mortalidad, expiación de Cristo y vida después de la muerte.',
    keyDoctrines: [
      'Somos hijos de Dios con un propósito eterno.',
      'La vida es un tiempo de preparación.',
      'La expiación de Jesucristo hace posible el arrepentimiento y la resurrección.',
      'Hay grados de gloria y el deseo de Dios es que volvamos a Su presencia.',
    ],
    sections: [
      // 🔹 PEGA AQUÍ las secciones de la lección 2 (diagrama del plan, rol de Jesucristo, invitaciones, etc.)
    ],
    quickFlow: [
      'Conectar: hablar de preguntas profundas (origen, propósito, destino).',
      'Explicar el plan en un diagrama simple si es posible.',
      'Enfatizar el papel de Jesucristo en todo el plan.',
      'Ayudar a ver que los mandamientos son parte del plan, no reglas sueltas.',
      'Invitar a orar para saber que el plan es real y personal.',
    ],
  },
  {
    id: 'lesson_3_gospel',
    order: 3,
    title: 'El Evangelio de Jesucristo',
    subtitle: 'Fe, arrepentimiento, bautismo, Espíritu Santo y perseverar',
    objective:
      'Ayudar al amigo a entender el camino del convenio: fe en Cristo, arrepentimiento, bautismo, recepción del Espíritu Santo y perseverar hasta el fin.',
    keyDoctrines: [
      'La fe verdadera en Jesucristo lleva a la acción.',
      'El arrepentimiento es un proceso esperanzador, no de culpa eterna.',
      'El bautismo por inmersión, con autoridad, es esencial.',
      'El Espíritu Santo guía y consuela.',
      'Debemos perseverar con firmeza en Cristo.',
    ],
    sections: [
      // 🔹 PEGA AQUÍ las secciones de la lección 3 (cada principio con escrituras, preguntas, objeciones y ejemplos).
    ],
    quickFlow: [
      'Conectar: qué significa cambiar de verdad.',
      'Fe: confianza y acción en Jesucristo.',
      'Arrepentimiento: proceso real y lleno de esperanza.',
      'Bautismo + Espíritu Santo: nacer de nuevo.',
      'Perseverar hasta el fin: hábitos espirituales y apoyo de la Iglesia.',
    ],
  },
  {
    id: 'lesson_4_commandments',
    order: 4,
    title: 'Mandamientos',
    subtitle: 'Vivir el evangelio en la vida diaria',
    objective:
      'Mostrar que los mandamientos son expresiones del amor de Dios y el camino a la verdadera libertad y felicidad.',
    keyDoctrines: [
      'Dios da mandamientos para protegernos y guiarnos.',
      'Obedecer trae bendiciones espirituales y temporales.',
      'Ley de castidad, Palabra de Sabiduría, día de reposo, diezmo, etc.',
    ],
    sections: [
      // 🔹 PEGA AQUÍ la lección 4: cada mandamiento con escrituras, preguntas, objeciones y testimonios.
    ],
    quickFlow: [
      'Conectar: reglas vs. protección.',
      'Explicar que los mandamientos se entienden mejor viviendo el evangelio.',
      'Enseñar mandamientos clave según la preparación del amigo.',
      'Testificar de bendiciones específicas que has visto.',
    ],
  },
  {
    id: 'lesson_5_laws_and_ordinances',
    order: 5,
    title: 'Leyes y ordenanzas',
    subtitle: 'Organización de la Iglesia y progreso continuo',
    objective:
      'Ayudar al amigo a ver que el bautismo es el comienzo de una vida de convenios, ordenanzas y servicio en la Iglesia restaurada.',
    keyDoctrines: [
      'La Iglesia de Jesucristo está organizada con profetas, apóstoles y líderes locales.',
      'Hay ordenanzas adicionales: confirmación, sacerdocio, templo, sellamientos.',
      'El discipulado es un camino contínuo de servicio y crecimiento.',
    ],
    sections: [
      // 🔹 PEGA AQUÍ la lección 5 (organización de la Iglesia, ordenanzas adicionales, servicio continuo, etc.)
    ],
    quickFlow: [
      'Conectar: qué significa “pertenecer” a algo más grande.',
      'Explicar brevemente la organización de la Iglesia.',
      'Describir ordenanzas clave después del bautismo.',
      'Invitar a ver el bautismo como un comienzo, no un final.',
    ],
  },
] as const;


