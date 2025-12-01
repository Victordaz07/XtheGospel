// src/data/leader/friendsInTeachingExtended.ts
// Amigos en enseñanza — Acompañamiento inteligente

export interface TeachingStage {
  id: string;
  label: string;
  description: string;
  signs?: string[];
  leaderActions?: string[];
}

export interface CommonQuestion {
  question: string;
  suggestedResponse: string;
  scriptures?: string[];
}

export interface SundaySuggestionsByProfile {
  youngAdult?: string[];
  familyInvestigator?: string[];
  elderlyPerson?: string[];
}

export interface FriendsInTeachingExtended {
  id: string;
  title: string;
  description: string;
  teachingStages: TeachingStage[];
  commonQuestionsAndInspiredResponses: CommonQuestion[];
  sundaySuggestionsByProfile: SundaySuggestionsByProfile;
  whatMembersCanDoThisWeek?: string[];
}

export const friendsInTeachingExtended: FriendsInTeachingExtended = {
  id: "leader_friends_extended",
  title: "Amigos en enseñanza — Acompañamiento inteligente",
  description: "Herramienta para ayudar a líderes a entender en qué etapa está cada amigo en enseñanza, qué objeciones enfrenta y cómo puede ayudar el barrio.",
  teachingStages: [
    {
      id: "exploring",
      label: "Explorando",
      description: "Ha tenido poco contacto con la Iglesia, está probando y viendo cómo se siente.",
      signs: [
        "Asiste de vez en cuando a la Iglesia.",
        "Hace preguntas generales sobre Dios y la vida.",
        "No conoce casi nada de doctrina SUD."
      ],
      leaderActions: [
        "Invitar a actividades sencillas y cálidas.",
        "Asignar una familia que lo reciba en la capilla.",
        "Evitar presión excesiva; escuchar mucho, enseñar poco."
      ]
    },
    {
      id: "learning",
      label: "Aprendiendo con interés",
      description: "Ya recibe lecciones, lee algo y empieza a sentir el Espíritu.",
      signs: [
        "Cumple algunos compromisos de lectura.",
        "Comparte sentimientos espirituales.",
        "Empieza a cambiar hábitos."
      ],
      leaderActions: [
        "Invitar a clases de la Iglesia en paralelo a las lecciones.",
        "Ofrecer testimonio simple, no discursos largos.",
        "Coordinar con misioneros para reforzar doctrinas clave."
      ]
    },
    {
      id: "close_to_baptism",
      label: "Cerca del bautismo",
      description: "Entiende las doctrinas básicas, ha desarrollado fe y está considerando hacer convenios.",
      signs: [
        "Ha asistido varias veces a la Iglesia.",
        "Siente que el Libro de Mormón es verdadero.",
        "Habla de cambiar su vida.",
        "Ya tiene fecha tentativa de bautismo o está muy cerca."
      ],
      leaderActions: [
        "Coordinar entrevista con el obispo.",
        "Involucrar al barrio en el servicio bautismal.",
        "Invitarlo a conocer líderes de quórum/organización.",
        "Explicar cómo seguirá su progreso después del bautismo."
      ]
    }
  ],
  commonQuestionsAndInspiredResponses: [
    {
      question: "¿Por qué tengo que bautizarme otra vez si ya lo hice de niño?",
      suggestedResponse: "Validar el sentimiento y explicar con amor la necesidad de autoridad del sacerdocio y el ejemplo de Jesucristo.",
      scriptures: ["Hechos 19:1–6", "3 Nefi 11:21–26"]
    },
    {
      question: "¿Qué pasa si me equivoco después del bautismo?",
      suggestedResponse: "Enseñar que el bautismo es un comienzo, no un final, y que el arrepentimiento continuo y la Santa Cena nos ayudan.",
      scriptures: ["3 Nefi 18:7, 10–11", "DyC 58:42–43"]
    },
    {
      question: "Mi familia no está de acuerdo, ¿qué hago?",
      suggestedResponse: "Reconocer el dolor, enseñar sobre fe, paciencia y amor. Animar a no contender, sino a ser ejemplo de cambio.",
      scriptures: ["Mateo 10:37–39", "3 Nefi 12:44–45"]
    }
  ],
  sundaySuggestionsByProfile: {
    youngAdult: [
      "Sentarlo con Jóvenes Adultos Solteros.",
      "Invitarlo a instituto o clase de adultos jóvenes.",
      "Presentarlo a líderes de JAS."
    ],
    familyInvestigator: [
      "Recibirlos desde el estacionamiento.",
      "Ayudar con niños en la Primaria.",
      "Introducirlos a familias con hijos de edades similares."
    ],
    elderlyPerson: [
      "Ayudar con asiento cómodo.",
      "Hablar con calma y claridad.",
      "Invitarlo a actividades tranquilas y espirituales."
    ]
  },
  whatMembersCanDoThisWeek: [
    "Ofrecerse como hogar para una noche de hogar misional.",
    "Invitar a un amigo en enseñanza a una actividad específica con hora y lugar claros.",
    "Compartir un testimonio corto de cómo el evangelio cambió una situación real de la vida.",
    "Enviar un mensaje de texto o nota de ánimo antes de la próxima lección."
  ]
};

