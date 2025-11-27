export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // en minutos
  videoUrl?: string;
  scriptureReferences: string[];
  questions: Question[];
  required: boolean;
  order: number;
}

export interface Question {
  id: string;
  question: string;
  type: 'text' | 'multiple' | 'boolean';
  options?: string[];
  correctAnswer?: string;
}

export const lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'La Restauración del Evangelio',
    description: 'Aprende sobre la restauración del evangelio de Jesucristo en los últimos días.',
    duration: 45,
    scriptureReferences: ['Josué 1:9', 'Hechos 3:20-21', '1 Nefi 13:40-41'],
    questions: [
      {
        id: 'q1-1',
        question: '¿Qué evento inició la Restauración?',
        type: 'multiple',
        options: ['La Primera Visión', 'La traducción del Libro de Mormón', 'La organización de la Iglesia'],
        correctAnswer: 'La Primera Visión'
      },
      {
        id: 'q1-2',
        question: '¿Por qué fue necesaria la Restauración?',
        type: 'text'
      }
    ],
    required: true,
    order: 1
  },
  {
    id: 'lesson-2',
    title: 'El Plan de Salvación',
    description: 'Comprende el plan de Dios para nuestra felicidad y salvación.',
    duration: 60,
    scriptureReferences: ['Moisés 1:39', 'Alma 34:32', '2 Nefi 2:25'],
    questions: [
      {
        id: 'q2-1',
        question: '¿Cuál es el propósito del Plan de Salvación?',
        type: 'multiple',
        options: ['Para probarnos', 'Para llevarnos de regreso a Dios', 'Para aprender lecciones'],
        correctAnswer: 'Para llevarnos de regreso a Dios'
      }
    ],
    required: true,
    order: 2
  },
  {
    id: 'lesson-3',
    title: 'El Evangelio de Jesucristo',
    description: 'Aprende sobre la fe, el arrepentimiento, el bautismo y el don del Espíritu Santo.',
    duration: 50,
    scriptureReferences: ['2 Nefi 31:20-21', '3 Nefi 27:13-22', 'Moroni 10:32-33'],
    questions: [
      {
        id: 'q3-1',
        question: '¿Cuáles son las primeras principles y ordenanzas del Evangelio?',
        type: 'multiple',
        options: [
          'Fe, Esperanza, Caridad',
          'Fe, Arrepentimiento, Bautismo, Don del Espíritu Santo',
          'Oración, Estudio de las Escrituras, Ayuno'
        ],
        correctAnswer: 'Fe, Arrepentimiento, Bautismo, Don del Espíritu Santo'
      }
    ],
    required: true,
    order: 3
  },
  {
    id: 'lesson-4',
    title: 'Mandamientos y Convenios',
    description: 'Entiende la importancia de guardar los mandamientos y hacer convenios.',
    duration: 55,
    scriptureReferences: ['DyC 82:10', 'Mosíah 2:41', 'DyC 130:20-21'],
    questions: [
      {
        id: 'q4-1',
        question: '¿Qué bendiciones recibimos al guardar los mandamientos?',
        type: 'text'
      }
    ],
    required: true,
    order: 4
  },
  {
    id: 'lesson-5',
    title: 'Leyes y Ordenanzas',
    description: 'Aprende sobre las leyes y ordenanzas necesarias para la exaltación.',
    duration: 40,
    scriptureReferences: ['3 Nefi 11:31-41', 'DyC 84:19-22', 'Moroni 6:1-4'],
    questions: [
      {
        id: 'q5-1',
        question: '¿Qué ordenanzas son esenciales para la salvación?',
        type: 'multiple',
        options: [
          'Bautismo y Confirmación',
          'Bautismo, Confirmación y Investidura',
          'Bautismo, Confirmación, Investidura y Matrimonio Eterno'
        ],
        correctAnswer: 'Bautismo y Confirmación'
      }
    ],
    required: true,
    order: 5
  }
];