/**
 * Baptism Preparation - Doctrinal Content (Bilingual)
 * Preparación para el Bautismo - Contenido doctrinal completo
 * Used in Progreso → Preparación para el Bautismo
 */

export interface ScriptureRef {
  reference: string;
  text?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
}

export interface Section {
  id: string;
  title: string;
  content?: string[];
  scriptures?: ScriptureRef[];
  checklist?: ChecklistItem[];
}

export interface BaptismPreparationModule {
  id: string;
  title: string;
  subtitle: string;
  sections: Section[];
}

type Locale = 'es' | 'en' | 'fr' | 'pt';
type BaptismContentLocale = 'es' | 'en';

function normalizeBaptismLocale(locale: Locale): BaptismContentLocale {
  return locale === 'es' ? 'es' : 'en';
}

const BAPTISM_ES: BaptismPreparationModule = {
  id: 'baptism-preparation',
  title: 'Preparándome para el Bautismo',
  subtitle:
    'El bautismo es el primer convenio que hacemos con Dios. Es el comienzo de una nueva vida en Cristo.',
  sections: [
    {
      id: 'what-is-baptism',
      title: '¿Qué es el Bautismo?',
      content: [
        'El bautismo es una ordenanza sagrada realizada por la autoridad del sacerdocio.',
        'Se realiza por inmersión en el agua, simbolizando morir al pecado y nacer espiritualmente en Cristo.',
        'Es un convenio formal con Dios.',
      ],
      scriptures: [
        { reference: 'Mateo 3:13–17' },
        { reference: 'Hechos 2:38' },
        { reference: '2 Nefi 31:5–12' },
      ],
    },
    {
      id: 'why-baptism',
      title: '¿Por qué debo bautizarme?',
      content: [
        'Para seguir el ejemplo de Jesucristo.',
        'Para recibir el perdón de los pecados.',
        'Para recibir el don del Espíritu Santo.',
        'Para entrar en convenio con Dios.',
      ],
      scriptures: [
        { reference: 'Juan 3:5' },
        { reference: 'Mosíah 18:8–10' },
        { reference: 'Doctrina y Convenios 20:37' },
      ],
    },
    {
      id: 'requirements',
      title: 'Requisitos para el Bautismo',
      content: [
        'Humillarse ante Dios.',
        'Tener un corazón quebrantado y espíritu contrito.',
        'Estar dispuesto a tomar sobre sí el nombre de Cristo.',
        'Tener determinación de servirle hasta el fin.',
      ],
      checklist: [
        { id: 'humility', text: 'Me he humillado ante Dios.' },
        { id: 'repentance', text: 'He ejercido arrepentimiento sincero.' },
        { id: 'commitment', text: 'Deseo tomar sobre mí el nombre de Cristo.' },
        { id: 'obedience', text: 'Estoy dispuesto a guardar los mandamientos.' },
      ],
    },
    {
      id: 'interview',
      title: 'Entrevista Bautismal',
      content: [
        'Un líder autorizado confirmará tu fe y preparación espiritual.',
      ],
      checklist: [
        { id: 'faith-god', text: 'Creo que Dios es nuestro Padre Eterno.' },
        { id: 'faith-christ', text: 'Creo que Jesucristo es mi Salvador.' },
        {
          id: 'restoration',
          text: 'Creo que el evangelio fue restaurado por José Smith.',
        },
        { id: 'commandments', text: 'Estoy dispuesto a guardar los mandamientos.' },
      ],
    },
    {
      id: 'ordinance',
      title: 'La Ordenanza del Bautismo',
      content: [
        'La persona que bautiza levanta el brazo derecho en ángulo recto y dice:',
        '"Habiendo sido comisionado por Jesucristo, yo te bautizo en el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén."',
      ],
    },
    {
      id: 'confirmation',
      title: 'Confirmación y Don del Espíritu Santo',
      content: [
        'Después del bautismo, recibirás la confirmación como miembro de la Iglesia.',
        'Se pronuncia la frase: "Recibe el Espíritu Santo."',
      ],
    },
    {
      id: 'covenants',
      title: 'Convenios que hago en el Bautismo',
      checklist: [
        { id: 'take-name', text: 'Tomaré sobre mí el nombre de Cristo.' },
        { id: 'remember', text: 'Siempre lo recordaré.' },
        { id: 'keep-commandments', text: 'Guardaré Sus mandamientos.' },
        { id: 'serve-others', text: 'Serviré y consolaré a los demás.' },
      ],
    },
    {
      id: 'commitment',
      title: 'Mi Compromiso Personal',
      content: [
        'Escribe por qué deseas bautizarte y qué significa para ti este paso.',
      ],
    },
  ],
};

const BAPTISM_EN: BaptismPreparationModule = {
  id: 'baptism-preparation',
  title: 'Preparing for Baptism',
  subtitle:
    'Baptism is the first covenant we make with God. It is the beginning of a new life in Christ.',
  sections: [
    {
      id: 'what-is-baptism',
      title: 'What is Baptism?',
      content: [
        'Baptism is a sacred ordinance performed by the authority of the priesthood.',
        'It is performed by immersion in water, symbolizing dying to sin and being born spiritually in Christ.',
        'It is a formal covenant with God.',
      ],
      scriptures: [
        { reference: 'Matthew 3:13–17' },
        { reference: 'Acts 2:38' },
        { reference: '2 Nephi 31:5–12' },
      ],
    },
    {
      id: 'why-baptism',
      title: 'Why Should I Be Baptized?',
      content: [
        'To follow the example of Jesus Christ.',
        'To receive remission of sins.',
        'To receive the gift of the Holy Ghost.',
        'To enter into covenant with God.',
      ],
      scriptures: [
        { reference: 'John 3:5' },
        { reference: 'Mosiah 18:8–10' },
        { reference: 'Doctrine and Covenants 20:37' },
      ],
    },
    {
      id: 'requirements',
      title: 'Requirements for Baptism',
      content: [
        'Humble yourself before God.',
        'Have a broken heart and contrite spirit.',
        'Be willing to take upon yourself the name of Christ.',
        'Have determination to serve Him to the end.',
      ],
      checklist: [
        { id: 'humility', text: 'I have humbled myself before God.' },
        { id: 'repentance', text: 'I have exercised sincere repentance.' },
        { id: 'commitment', text: 'I desire to take upon myself the name of Christ.' },
        { id: 'obedience', text: 'I am willing to keep the commandments.' },
      ],
    },
    {
      id: 'interview',
      title: 'Baptismal Interview',
      content: [
        'An authorized leader will confirm your faith and spiritual preparation.',
      ],
      checklist: [
        { id: 'faith-god', text: 'I believe that God is our Eternal Father.' },
        { id: 'faith-christ', text: 'I believe that Jesus Christ is my Savior.' },
        {
          id: 'restoration',
          text: 'I believe that the gospel was restored by Joseph Smith.',
        },
        { id: 'commandments', text: 'I am willing to keep the commandments.' },
      ],
    },
    {
      id: 'ordinance',
      title: 'The Ordinance of Baptism',
      content: [
        'The person who baptizes raises the right arm to the square and says:',
        '"Having been commissioned of Jesus Christ, I baptize you in the name of the Father, and of the Son, and of the Holy Ghost. Amen."',
      ],
    },
    {
      id: 'confirmation',
      title: 'Confirmation and Gift of the Holy Ghost',
      content: [
        'After baptism, you will receive confirmation as a member of the Church.',
        'The phrase is pronounced: "Receive the Holy Ghost."',
      ],
    },
    {
      id: 'covenants',
      title: 'Covenants I Make at Baptism',
      checklist: [
        { id: 'take-name', text: 'I will take upon me the name of Christ.' },
        { id: 'remember', text: 'I will always remember Him.' },
        { id: 'keep-commandments', text: 'I will keep His commandments.' },
        { id: 'serve-others', text: 'I will serve and comfort others.' },
      ],
    },
    {
      id: 'commitment',
      title: 'My Personal Commitment',
      content: [
        'Write why you desire to be baptized and what this step means to you.',
      ],
    },
  ],
};

/**
 * Get baptism preparation content for the given locale.
 */
export function getBaptismPreparation(locale: Locale = 'es'): BaptismPreparationModule {
  const normalizedLocale = normalizeBaptismLocale(locale);
  return normalizedLocale === 'en' ? BAPTISM_EN : BAPTISM_ES;
}

/** @deprecated Use getBaptismPreparation(locale) for bilingual support */
export const baptismPreparation: BaptismPreparationModule = BAPTISM_ES;

/** Milestone IDs for progress bar (order matters) */
export const BAPTISM_MILESTONE_IDS = [
  'restoration',
  'plan-of-salvation',
  'gospel-of-jesus-christ',
  'commandments',
  'church-attendance',
  'interview',
  'date-scheduled',
] as const;
