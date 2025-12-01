// src/data/leader/leaderMode.ts
// Este archivo contiene el JSON PRINCIPAL del modo líder.
// Basado en Predicad Mi Evangelio 2023 y Manual General de la Iglesia 2024

export const leaderMode = {
  id: 'leader_mode',
  roleName: 'Líder — Apoyando la obra y nuevos conversos',
  description:
    'Modo para líderes de barrio o rama (obispado, presidencias de quórum/organización, líder misional) para apoyar amigos en enseñanza y nuevos conversos según Predicad Mi Evangelio y el Manual General.',

  modules: [
    {
      id: 'today_panel',
      order: 1,
      icon: 'flash-outline',
      title: 'Panel de hoy',
      subtitle: 'Lo más importante para hoy',
      routeName: 'LeaderTodayPanel',
    },
    {
      id: 'new_converts',
      order: 2,
      icon: 'people-outline',
      title: 'Nuevos conversos (0–12 meses)',
      subtitle: 'Acompaña su primer año en el evangelio',
      routeName: 'LeaderNewConverts',
    },
    {
      id: 'friends_in_teaching',
      order: 3,
      icon: 'book-outline',
      title: 'Amigos en enseñanza',
      subtitle: 'Coordina con los misioneros y los miembros',
      routeName: 'LeaderFriendsTeaching',
    },
    {
      id: 'meetings_and_resources',
      order: 4,
      icon: 'calendar-outline',
      title: 'Reuniones y recursos',
      subtitle: 'Plantillas y guías rápidas',
      routeName: 'LeaderMeetingsResources',
    },
    {
      id: 'integration_map',
      order: 5,
      icon: 'timeline-outline',
      title: 'Mapa de integración (12 meses)',
      subtitle: 'Resumen visual del primer año',
      routeName: 'LeaderIntegrationMap',
    },
    {
      id: 'guidelines_and_authority',
      order: 6,
      icon: 'shield-checkmark-outline',
      title: 'Directrices y autoridad',
      subtitle: 'Bajo qué normas se usa este modo',
      routeName: 'LeaderGuidelines',
    },
  ],

  panelToday: {
    groups: [
      {
        id: 'new_converts',
        title: 'Nuevos conversos',
        description: 'Acciones inmediatas para fortalecer nuevos conversos.',
        scriptural_basis: [
          'Predicad Mi Evangelio 2023, cap. 12: "Ayudar a los nuevos conversos a permanecer firmes en el camino del convenio".',
          'Manual General 29.2.5: prioridad del consejo de barrio en nuevos conversos.',
        ],
      },
      {
        id: 'friends',
        title: 'Amigos en enseñanza',
        description: 'Pasos concretos para ayudar a los amigos a progresar hacia el bautismo y la confirmación.',
        scriptural_basis: [
          'Predicad Mi Evangelio 2023, cap. 13: coordinación con los líderes de barrio.',
          'Manual General 38.8.26: cuidado de los amigos y nuevos conversos.',
        ],
      },
      {
        id: 'general',
        title: 'Recordatorios generales',
        description: 'Reuniones, asignaciones y seguimiento relacionados con la obra misional y el bienestar espiritual.',
        scriptural_basis: [
          'Manual General 29.2: función del consejo de barrio.',
          'Predicad Mi Evangelio 2023, cap. 1: participar en la obra de salvación y exaltación.',
        ],
      },
    ],
    sampleTasks: [
      {
        id: 't1',
        groupId: 'new_converts',
        name: 'Llamar a Carlos',
        description: 'Preguntar cómo se sintió en su segunda Santa Cena y escuchar cualquier duda.',
        dueLabel: 'Hoy',
        isDone: false,
      },
      {
        id: 't2',
        groupId: 'new_converts',
        name: 'Asignar ministración a Ana',
        description: 'Coordinar con presidencia de Sociedad de Socorro para que reciba ministración formal.',
        dueLabel: 'Antes del domingo',
        isDone: false,
      },
      {
        id: 't3',
        groupId: 'friends',
        name: 'Confirmar visita con Luis (amigo)',
        description: 'Asegurar que un miembro lo pueda acompañar a la lección sobre la Restauración.',
        dueLabel: 'Esta tarde',
        isDone: false,
      },
      {
        id: 't4',
        groupId: 'general',
        name: 'Preparar punto de consejo de barrio',
        description: 'Anotar en agenda: revisar lista de nuevos conversos y su progreso hacia el templo (5 minutos).',
        dueLabel: 'Próxima reunión',
        isDone: false,
      },
    ],
    emptyMessage:
      'No hay tareas urgentes registradas para hoy. Ore para saber a quién puede fortalecer y coordine con su obispado o presidencia de rama.',
  },

  newConverts: {
    principles: {
      summary:
        'Los nuevos conversos necesitan tres cosas esenciales para permanecer firmes: amigos, responsabilidades y alimento espiritual. El primer año después del bautismo es crítico.',
      fromPMG: [
        'Proveer al menos un buen amigo en la Iglesia que los acompañe.',
        'Dar responsabilidades apropiadas (llamamientos sencillos, servicio).',
        'Asegurar alimento espiritual constante: Santa Cena semanal, estudio, oración, enseñanza.',
      ],
      fromHandbook: [
        'Asignar ministración inmediatamente después del bautismo (Manual General cap. 21).',
        'Revisar regularmente su bienestar espiritual en consejo de barrio (29.2.5).',
        'Coordinar enseñanza continua durante un año (38.8.26).',
        'Ayudarles a prepararse para las ordenanzas del templo, empezando por bautismos por los muertos (27.2.1).',
      ],
    },
    fields: [
      {
        id: 'months_since_baptism',
        label: 'Meses desde el bautismo',
        description: 'Permite ver rápidamente en qué etapa del primer año se encuentra cada nuevo converso.',
      },
      {
        id: 'attends_sacrament',
        label: 'Asistencia a la sacramental',
        description: 'Indica si está asistiendo regularmente o si ha dejado de venir.',
      },
      {
        id: 'has_ministering',
        label: 'Ministración asignada',
        description: 'Muestra si ya tiene ministradores asignados y activos.',
      },
      {
        id: 'calling',
        label: 'Llamamiento actual',
        description: 'Responsabilidad actual en el barrio o rama, adecuada a sus circunstancias.',
      },
      {
        id: 'temple_status',
        label: 'Progreso hacia el templo',
        description:
          'Estado general: sin preparación, recomendación de uso limitado, bautismos por los muertos, preparación para investidura.',
      },
      {
        id: 'risk_level',
        label: 'Nivel de riesgo espiritual',
        description: 'Evaluación pastoral (bajo, medio, alto) basada en asistencia, conexión y señales de preocupación.',
      },
      {
        id: 'next_step',
        label: 'Próximo paso sugerido',
        description: 'Acción concreta que el líder o la organización pueden tomar esta semana para fortalecerle.',
      },
    ],
    integrationTimeline: {
      description:
        'Mapa de referencia para el primer año del nuevo converso. No es un calendario rígido, sino una guía flexible.',
      phases: [
        {
          id: 'month_0_1',
          label: 'Mes 0–1',
          focus: 'Bienvenida y base espiritual.',
          suggestedActions: [
            'Asignar ministración inmediatamente.',
            'Presentarlo al obispado/presidencia de rama y a su organización (EQ/SS/JAS/MoJ).',
            'Asegurar que asista a la Santa Cena y entienda su significado.',
            'Continuar enseñando las lecciones misionales restantes y repasar principios básicos.',
            'Ayudarle a crear hábitos de oración y estudio de las Escrituras.',
          ],
        },
        {
          id: 'month_1_3',
          label: 'Mes 1–3',
          focus: 'Pertenencia y primeras responsabilidades.',
          suggestedActions: [
            'Acompañarlo en la transición a las clases regulares de la organización correspondiente.',
            'Extender un llamamiento sencillo y significativo según sus capacidades.',
            'Invitarlo a actividades del barrio y de su organización.',
            'Enseñar sobre el templo y ayudarle a prepararse para bautismos por los muertos.',
            'Verificar que entienda y viva los principios básicos del evangelio (fe, arrepentimiento, mandamientos).',
          ],
        },
        {
          id: 'month_3_6',
          label: 'Mes 3–6',
          focus: 'Servicio y participación constante.',
          suggestedActions: [
            'Reforzar su experiencia en el llamamiento, brindándole apoyo y capacitación.',
            'Programar al menos una visita al templo para bautismos por los muertos.',
            'Invitarlo a compartir su testimonio en una clase o actividad adecuada.',
            'Identificar amigos adicionales en la Iglesia para ampliar su círculo de apoyo.',
            'Tratar con amor cualquier duda nueva o situaciones de oposición.',
          ],
        },
        {
          id: 'month_6_12',
          label: 'Mes 6–12',
          focus: 'Fortalecer el discipulado a largo plazo.',
          suggestedActions: [
            'Conversar sobre metas espirituales a futuro (misión, matrimonio en el templo, servicio).',
            'Revisar si está listo para obtener o renovar recomendación de uso limitado.',
            'Involucrarlo en actividades donde pueda compartir su testimonio.',
            'Revisar en consejo de barrio si aún requiere apoyo especial.',
            'Celebrar el cumplimiento de su primer año con gratitud y testimonio.',
          ],
        },
      ],
    },
  },

  friendsInTeaching: {
    purpose:
      'Ayudar a los líderes a apoyar a los misioneros y a los miembros en la integración de los amigos en enseñanza, sin reemplazar el rol de los misioneros.',
    fields: [
      {
        id: 'friend_name',
        label: 'Nombre del amigo',
        description: 'Nombre preferido del amigo en enseñanza.',
      },
      {
        id: 'brought_by',
        label: 'Quién lo invitó',
        description: 'Miembro que lo trajo originalmente o que es su principal contacto.',
      },
      {
        id: 'lesson_progress',
        label: 'Progreso en las lecciones',
        description: 'Lección actual (1–5), repaso, o preparación para entrevista bautismal.',
      },
      {
        id: 'has_baptism_date',
        label: '¿Tiene fecha de bautismo?',
        description: 'Indica si ya hay una fecha planificada con el obispado y los misioneros.',
      },
      {
        id: 'sacrament_attendance',
        label: 'Asistencia a la sacramental',
        description: 'Si asiste regularmente los domingos.',
      },
      {
        id: 'sunday_plan',
        label: 'Plan para el domingo',
        description: 'Miembro que se sentará con él/ella, quién lo recibirá al llegar, a qué clase irá.',
      },
      {
        id: 'support_notes',
        label: 'Notas de apoyo',
        description: 'Notas breves sobre necesidades de bienvenida, dudas frecuentes, puntos a reforzar.',
      },
    ],
    sundaySuggestions: [
      'Acordar con anticipación quién lo recibirá en la puerta del edificio.',
      'Hacer que al menos un miembro se siente junto a él/ella durante la reunión sacramental.',
      'Presentarlo brevemente a líderes clave (obispo/presidente de rama, líderes de organización).',
      'Explicarle la estructura de las reuniones del domingo y dónde están las clases.',
      'Invitarlo a una actividad o noche de hogar próxima con miembros del barrio.',
    ],
    exampleInspiredQuestions: [
      '¿Qué sintió la primera vez que vino a la Iglesia?',
      '¿Qué parte del evangelio le está trayendo más paz en este momento?',
      '¿Hay alguna preocupación que quisiera compartir antes de la próxima lección?',
      '¿Hay alguien a quien le gustaría invitar a acompañarle a la Iglesia?',
      '¿Qué necesitaría para sentirse más cómodo el próximo domingo?',
    ],
  },

  meetingsAndResources: {
    meetings: [
      {
        id: 'weekly_missionary_coordination',
        title: 'Coordinación misional semanal',
        description:
          'Reunión entre misioneros, líder misional de barrio y un miembro del obispado/presidencia de rama para coordinar la obra misional local.',
        participants: [
          'Misioneros de tiempo completo asignados al barrio o rama',
          'Líder misional de barrio (si lo hay)',
          'Un consejero del obispado o de la presidencia de rama',
        ],
        recommendedAgenda: [
          'Comenzar con oración y, si es apropiado, un pensamiento espiritual breve.',
          'Revisar lista de amigos en enseñanza: necesidades, próximos pasos, quién los acompaña.',
          'Revisar nuevos conversos: enseñanza de repaso, asignación de ministración y llamamientos.',
          'Planear quién invitará y acompañará a los amigos el próximo domingo.',
          'Coordinar actividades misionales del barrio (noches de hogar, devocionales, etc.).',
          'Asignar acciones específicas para la próxima semana.',
          'Terminar con oración, expresando gratitud por las personas a las que se sirve.',
        ],
        handbookReferences: [
          'Predicad Mi Evangelio 2023, cap. 13, secciones sobre coordinación con líderes de barrio.',
          'Manual General 23.1 y 23.5 (Obra misional y responsabilidad de los líderes).',
        ],
      },
      {
        id: 'ward_council_missionary_focus',
        title: 'Consejo de barrio — Enfoque en amigos y nuevos conversos',
        description:
          'Segmento del consejo de barrio dedicado al bienestar de amigos, nuevos conversos y miembros necesitados.',
        participants: [
          'Obispado o presidencia de rama',
          'Presidencias de EQ, SS, Primaria, Mujeres Jóvenes, Hombres Jóvenes, JAS, etc.',
          'Secretarios y otros líderes invitados según necesidad',
        ],
        recommendedAgenda: [
          'Identificar por nombre a nuevos conversos y amigos en enseñanza que necesiten apoyo.',
          'Preguntar: "¿Quién necesita un amigo, un llamamiento y alimento espiritual adicional?".',
          'Determinar acciones específicas: asignar compañeros, invitaciones, visitas y apoyo.',
          'Hablar brevemente del progreso hacia el templo de los nuevos conversos.',
          'Revisar el plan de integración de los próximos 1–3 meses.',
          'Registrar acuerdos claros (quién hará qué y para cuándo).',
        ],
        handbookReferences: [
          'Manual General 29.2.5: prioridad en amigos y nuevos conversos.',
          'Manual General cap. 4 y 29: función del consejo de barrio.',
        ],
      },
      {
        id: 'organization_leadership_meeting',
        title: 'Reunión de liderazgo de organización',
        description:
          'Reunión de presidencias de EQ, SS, JAS, MoJ, etc. para revisar cómo integran a nuevos conversos y amigos en su organización.',
        participants: [
          'Presidencia de la organización (EQ, SS, JAS, MoJ, etc.)',
          'Secretario',
          'Consejeros',
          'Líder misional de barrio u otro líder invitado según necesidad',
        ],
        recommendedAgenda: [
          'Revisar la lista de nuevos conversos asignados a la organización.',
          'Revisar amigos que están asistiendo a las clases y cómo se sienten.',
          'Ver quién necesita un llamamiento sencillo o una oportunidad de servir.',
          'Planear actividades o noches de hogar donde puedan sentirse bienvenidos.',
          'Coordinar con misioneros y obispado las necesidades específicas.',
        ],
        handbookReferences: [
          'Manual General 8, 9, 10, 11, 12, 13 según la organización.',
          'Predicad Mi Evangelio 2023, cap. 13, sección sobre el papel de los miembros.',
        ],
      },
    ],
    quickResources: [
      {
        id: 'welcome_first_sunday',
        title: 'Cómo recibir a un nuevo converso o amigo el primer domingo',
        bullets: [
          'Llegar unos minutos antes para estar listo para recibirlo.',
          'Saludarlo por su nombre y presentarle a 2 o 3 miembros clave.',
          'Explicarle cómo se organiza la reunión sacramental (himnos, oraciones, sacramento, discursos).',
          'Sentarse a su lado y ayudarle con el himnario y el programa.',
          'Después de la reunión, presentarlo al obispo/presidente de rama y al líder de su organización.',
          'Invitarlo a volver el siguiente domingo y, si es apropiado, a una actividad o noche de hogar.',
        ],
      },
      {
        id: 'warning_signs_new_converts',
        title: 'Señales de alerta en nuevos conversos',
        bullets: [
          'Deja de asistir de repente sin explicación clara.',
          'Menciona sentirse solo, confundido o desilusionado.',
          'Empieza a evitar a los misioneros o líderes.',
          'Expresa dudas fuertes sin encontrar espacios seguros para hablar.',
          'Familia o amigos ejercen presión fuerte para que abandone la Iglesia.',
        ],
        suggestedActions: [
          'Contactarlo personalmente con amor y sin juicio.',
          'Escuchar primero, antes de enseñar o corregir.',
          'Coordinar visita con el obispo/presidente de rama o líderes apropiados.',
          'Asegurarle que tiene un lugar en la Iglesia y que no está solo.',
          'Orar y ayunar, según se sienta apropiado, buscando guía del Espíritu.',
        ],
      },
      {
        id: 'working_with_missionaries',
        title: 'Cómo trabajar con los misioneros como líder de barrio',
        bullets: [
          'Comunicar cambios importantes en la vida de un amigo o nuevo converso que puedan afectar su progreso (siempre respetando la confidencialidad).',
          'Invitar a los misioneros a enseñar en hogares de miembros cuando sea posible.',
          'Preguntar regularmente a los misioneros qué apoyo específico necesitan de los líderes.',
          'Acompañar en lecciones clave (mandamientos sensibles, compromisos importantes).',
          'Evitar dirigir la obra "por encima" de los misioneros, sino caminar junto a ellos bajo la dirección del obispado.',
        ],
      },
      {
        id: 'help_prepare_for_temple',
        title: 'Ayudar a un nuevo converso a prepararse para el templo',
        bullets: [
          'Enseñar el propósito del templo con sencillez y reverencia.',
          'Revisar la dignidad básica requerida y animar a vivir los mandamientos.',
          'Invitarlo a hacer historia familiar sencilla (introducir nombres de padres y abuelos).',
          'Planear con tiempo una primera visita al templo para bautismos por los muertos.',
          'Coordinar con el obispo/presidente de rama para la recomendación de uso limitado cuando esté listo.',
        ],
      },
    ],
    convertPath12Weeks: {
      id: 'convert_12_weeks_path',
      title: 'Camino del Nuevo Converso — Primeras 12 Semanas',
      description:
        'Guía doctrinal, espiritual y social para los primeros tres meses del nuevo converso. Úsala en coordinación misional, consejo de barrio y entrevistas personales.',
      reference: 'convertPath12Weeks',
    },
  },

  integrationMap: {
    overview:
      'El mapa de integración de 12 meses muestra en una sola vista qué debería estar pasando aproximadamente en cada etapa del primer año del nuevo converso.',
    phases: [
      {
        id: '0_1',
        title: 'Mes 0–1: Bienvenida y seguridad espiritual',
        keyGoals: [
          'Que sienta que pertenece y que tiene amigos en la Iglesia.',
          'Que entienda la importancia de la Santa Cena.',
          'Que mantenga el hábito de la enseñanza de los misioneros.',
        ],
      },
      {
        id: '1_3',
        title: 'Mes 1–3: Pertenencia y primer llamamiento',
        keyGoals: [
          'Transición natural a clases regulares y organizaciones.',
          'Extender un llamamiento sencillo.',
          'Primera visita al templo para bautismos por los muertos.',
        ],
      },
      {
        id: '3_6',
        title: 'Mes 3–6: Servicio y consolidación del testimonio',
        keyGoals: [
          'Ejercer su llamamiento con apoyo amoroso.',
          'Recibir instrucción continua sobre principios del evangelio.',
          'Fortalecer amistades dentro del barrio o rama.',
        ],
      },
      {
        id: '6_12',
        title: 'Mes 6–12: Preparación para el futuro',
        keyGoals: [
          'Recomendación de uso limitado y visitas regulares al templo.',
          'Establecer metas a futuro (misión, sellamiento, servicio).',
          'Ayudarle a ver su propio progreso y las bendiciones de los convenios.',
        ],
      },
    ],
  },

  guidelinesAndAuthority: {
    purpose: 'Aclarar bajo qué autoridad y directrices se usa el modo Líder y qué límites tiene.',
    whoShouldUseThisMode: [
      'Miembros del obispado o presidencia de rama.',
      'Líder misional de barrio (donde exista).',
      'Presidencias de quórum de élderes y de Sociedad de Socorro.',
      'Presidencias de organizaciones de jóvenes y JAS, según lo autorice el obispo/presidente de rama.',
    ],
    authoritySources: [
      'Predicad Mi Evangelio, edición 2023.',
      'Manual General: Servir en La Iglesia de Jesucristo de los Santos de los Últimos Días.',
      'La dirección local del obispado o presidencia de rama.',
      'La guía e inspiración del Espíritu Santo.',
    ],
    principles: [
      'Todo lo que se haga debe alinearse con el propósito de Dios de invitar a todos a venir a Cristo.',
      'Los líderes sirven para fortalecer, no para controlar.',
      'Se respeta completamente el albedrío de cada persona.',
      'Las decisiones finales sobre disciplina, entrevistas y llamamientos pertenecen al obispado/presidencia de rama.',
      'Este modo es una ayuda, no reemplaza las reuniones y entrevistas inspiradas.',
    ],
    confidentiality: {
      summary:
        'La app nunca debe registrar detalles confidenciales de pecados, disciplina, problemas familiares graves o información sensible.',
      handbookReferences: [
        'Manual General 38.8: Confidencialidad.',
        'Manual General 31.2: Entrevistas con el obispo/presidente de rama.',
      ],
      doNotStore: [
        'Detalles específicos de transgresiones o pecados.',
        'Información de disciplina eclesiástica.',
        'Información médica o de salud mental sensible.',
        'Problemas matrimoniales o familiares detallados.',
        'Opiniones o comentarios negativos sobre miembros específicos.',
      ],
      allowedNotesExamples: [
        '"Se siente solo desde que se mudó, coordinar visita de ministración."',
        '"Está estudiando sobre el templo, sugerir clase de preparación."',
        '"Explorar juntos dudas sobre la oración en la próxima visita."',
      ],
    },
    disclaimerText:
      'Este modo de la app es una herramienta para apoyar la obra de salvación y exaltación a nivel de barrio o rama. No reemplaza el consejo de barrio, las entrevistas personales ni la revelación que recibe el obispo o la presidencia de rama. Todas las decisiones importantes deben tomarse bajo la guía del Espíritu y en armonía con el Manual General y Predicad Mi Evangelio.',
  },
} as const;

