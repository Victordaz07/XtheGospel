// src/data/leader/leaderModeAdditional.ts
// Este archivo contiene el JSON adicional: extendedMeetings, extendedResources, leaderBehavior, safeNotesSystem

export const leaderModeAdditional = {
  extendedMeetings: {
    weekly_missionary_coordination_full: {
      id: 'coordination_full',
      title: 'Coordinación misional semanal (versión extendida)',
      purpose: 'Reunión clave donde el barrio y los misioneros trabajan en unidad para avanzar la obra de salvación.',
      steps: [
        {
          step: 1,
          title: 'Inicio espiritual',
          details: 'Oración guiada por el misionero mayor o líder misional. Compartir un pensamiento de 1–2 minutos basado en PMG.',
          scripture_suggestions: [
            'DyC 4: Obra misional (entusiasmo)',
            'DyC 6: El Espíritu habla paz a tu mente',
            'Moroni 7: Caridad en la obra del Señor',
          ],
        },
        {
          step: 2,
          title: 'Revisar amigos en enseñanza',
          details: 'Se revisa cada amigo por nombre. No se discute su pasado, sino su progreso y sus sentimientos actuales.',
          example_questions: [
            '¿Qué preocupación expresó esta semana?',
            '¿Quién puede acompañarlo el domingo?',
            '¿Qué mandamiento podemos enseñar con amor esta semana?',
            '¿Qué duda debe aclararse antes del bautismo?',
          ],
          allowed_notes: [
            '"Luis está preocupado por la ley de castidad. Coordinar lección con un matrimonio del barrio."',
            '"Ana quiere saber más sobre la Santa Cena. Enviar video de Cristo instituyendo la Cena."',
          ],
          not_allowed_notes: [
            '"Tuvo un problema moral con su pareja."',
            '"Viene de una situación familiar complicada; no confiar mucho."',
          ],
        },
        {
          step: 3,
          title: 'Revisar nuevos conversos',
          details: 'Plan para reforzar su testimonio durante el primer año.',
          example_actions: [
            'Asignar miembro para acompañarla a Principios del Evangelio.',
            'Preparar una meta de oración diaria.',
            'Invitarlo a compartir testimonio en una actividad pequeña.',
          ],
          doctrinal_basis: [
            'PMG Cap. 12 — Permanecer firmes',
            'Manual General 38.8.26 — Enseñanza continua',
          ],
        },
        {
          step: 4,
          title: 'Plan de domingo',
          details: 'Decidir quién recibe al amigo, quién se sienta con él y quién lo invita después.',
          examples: [
            'Carlos: Hno. Pérez lo recibe, Hna. Ruiz se sienta con él en sacramental.',
            'Familia López: EQ se encarga de presentarlos a los líderes.',
          ],
        },
        {
          step: 5,
          title: 'Actividades misionales',
          details: 'Coordinar devocionales, noches de hogar, visitas de barrio, etc.',
          examples: [
            'Noche de hogar de barrio — lunes 15, invitar a todos los amigos actuales.',
            'Devocional misionero juvenil — con testimonios de nuevos conversos.',
          ],
        },
        {
          step: 6,
          title: 'Acciones asignadas',
          details: 'Cada acción debe tener nombre y fecha.',
          examples: [
            'Hno. Gómez enseñará Palabra de Sabiduría a Luis. Fecha: viernes.',
            'Hna. Rivera invitará a Anabel al templo por primera vez. Fecha: sábado.',
          ],
        },
        {
          step: 7,
          title: 'Oración final',
          details: 'Pedir inspiración para saber a quién ministrar esta semana.',
        },
      ],
    },
    ward_council_full: {
      id: 'ward_council_full',
      title: 'Consejo de barrio — sección completa de obra misional',
      purpose: 'Alinear a todas las organizaciones en el esfuerzo de amar, nutrir e integrar a amigos y nuevos conversos.',
      discussion_template: [
        '¿Qué nuevos conversos necesitan apoyo urgente?',
        '¿Qué amigos están asistiendo pero no se sienten incluidos?',
        '¿Quién necesita un llamamiento apropiado?',
        '¿Qué familias podrían invitar a estos amigos a una actividad?',
        '¿Qué obstáculos están enfrentando y cómo podemos ayudar?',
        '¿Quién puede acompañar a cada amigo el próximo domingo?',
      ],
      inspired_questions_for_leaders: [
        '¿Quién no ha sentido amor esta semana?',
        '¿Qué alma está pasando desapercibida?',
        '¿A quién necesita el Señor que llamemos hoy?',
        '¿Qué más podemos hacer como barrio para que alguien sienta que pertenece?',
      ],
      handbook_authority: [
        'Manual General 29.2.5 — Prioridad en nuevos conversos',
        'Manual General 4.2 — Principios del consejo',
        'PMG 2023 Cap. 13 — Rol del consejo de barrio',
      ],
    },
  },

  extendedResources: {
    additionalGuides: [
      {
        id: 'how_to_minister_love',
        title: 'Cómo ministrar como Cristo (Guía práctica)',
        content: [
          'Mirar a los ojos, escuchar y validar sentimientos.',
          'No corregir de inmediato; primero conectar.',
          'Evitar frases como: "No deberías sentir eso".',
          'Hacer preguntas abiertas, no interrogatorias.',
          'Recordar que "la caridad nunca deja de ser". (Moroni 7).',
        ],
      },
      {
        id: 'teaching_new_converts',
        title: 'Cómo enseñar doctrina a nuevos conversos (sin abrumarlos)',
        principles: [
          'Enseñar poco pero profundo.',
          'Conectar la doctrina con experiencias personales.',
          'Evitar lenguaje excesivamente técnico o cultural.',
          'Asegurar comprensión antes de avanzar.',
          'Invitar a practicar: oración, estudio, servicio.',
        ],
        scriptures: [
          'DyC 50:22 — Enseñar por el Espíritu',
          '2 Nefi 31 — Camino del convenio',
          'Moroni 6 — Qué significa pertenecer',
        ],
      },
      {
        id: 'helping_in_difficult_moments',
        title: 'Cómo ayudar cuando un nuevo converso se enfría',
        signs: [
          'No responde mensajes.',
          'Evita misioneros.',
          'Deja de tomar la Santa Cena.',
          'Expresa dudas profundas sin guía.',
        ],
        responses: [
          'Hacer una visita amorosa, no correctiva.',
          'Escuchar más de lo que se habla.',
          'Invitar a sentir, no solo a entender.',
          'Coordinar con obispo si necesita apoyo espiritual mayor.',
        ],
      },
    ],
  },

  leaderBehavior: {
    codeOfConduct: [
      'El líder debe mostrar siempre amor cristiano.',
      'Nunca debe juzgar o presionar.',
      'Debe buscar inspiración antes de cada decisión.',
      'Respeta el albedrío y dignidad de cada persona.',
      'Nunca comparte información confidencial con quien no corresponde.',
      'Mantiene un ambiente de revelación en cada reunión.',
    ],
    phrasesToUse: [
      '"¿Cómo te puedo apoyar esta semana?"',
      '"Estamos contigo."',
      '"Dios conoce tu corazón."',
      '"Estamos aquí para ayudarte, no para juzgarte."',
    ],
    phrasesToAvoid: [
      '"Eso es fácil, solo hazlo."',
      '"No deberías sentir eso."',
      '"Los misioneros dijeron que…"',
      '"Si no vienes, estás fallando."',
    ],
  },

  safeNotesSystem: {
    allowedNotes: [
      'Necesita acompañamiento el domingo.',
      'Le gustaría aprender más sobre el templo.',
      'Ha expresado dudas sobre la oración.',
      'Buscar un amigo que lo pueda invitar a actividades.',
    ],
    forbiddenNotes: [
      'Cualquier detalle de pecado pasado.',
      'Información disciplinaria.',
      'Problemas familiares específicos.',
      'Comentarios negativos sobre personas.',
      'Diagnósticos médicos o psicológicos.',
    ],
    template: {
      format: 'breve_y_pastoral',
      example: 'Ana se sintió sola este domingo. Coordinar que la reciba una hermana de la Sociedad de Socorro.',
    },
  },
} as const;

