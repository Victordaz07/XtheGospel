import { MemberActivity } from './activitiesTypes';

export const memberActivitiesEs: MemberActivity[] = [
  {
    id: 'quiz-doctrina-de-cristo-basico',
    title: 'Quiz: Doctrina de Cristo en acción',
    type: 'scripture-quiz',
    difficulty: 'easy',
    recommendedAfterModules: ['member_doctrine_of_christ'],
    estimatedMinutes: 8,
    description:
      'Un quiz rápido para ayudarte a repasar los puntos clave de la doctrina de Cristo y cómo se aplican en la vida diaria.',
    studyHint:
      'Si te atascas en alguna pregunta, vuelve al módulo “La doctrina de Cristo en la vida diaria” y repasa los resúmenes de cada sección.',
    reward: {
      xp: 100,
      badge: 'doctrina-de-cristo-nivel-1',
    },
    questions: [
      {
        id: 'dc-q1',
        prompt: '¿Qué describe mejor la fe en Jesucristo para un miembro de barrio?',
        options: [
          'Creer que Jesús existe y asistir a la Iglesia los domingos.',
          'Confiar tanto en Él que estoy dispuesto a actuar, cambiar y abrir la boca para testificar.',
          'Sentir paz cuando escucho música espiritual.',
          'Saber muchas escrituras de memoria.',
        ],
        correctOptionIndex: 1,
        explanation:
          'La fe verdadera siempre lleva a la acción. No es solo creer, es confiar lo suficiente como para obedecer e invitar a otros.',
        scriptureReference: '2 Nefi 25:26',
      },
      {
        id: 'dc-q2',
        prompt: '¿Cuál de estos ejemplos describe mejor el “arrepentimiento continuo”?',
        options: [
          'Confesar un pecado grave una sola vez en la vida.',
          'Sentirme culpable cada vez que cometo un error.',
          'Revisar mi vida con frecuencia, ajustar mi conducta y buscar cambiar con la ayuda del Señor.',
          'Evitar pensar en mis debilidades para no desanimarme.',
        ],
        correctOptionIndex: 2,
        explanation:
          'El arrepentimiento continuo es un proceso diario y gozoso de cambio y ajuste hacia Cristo, no solo un evento aislado.',
        scriptureReference: 'Alma 36',
      },
      {
        id: 'dc-q3',
        prompt: '“Perseverar hasta el fin” en un mundo lleno de distracciones significa principalmente:',
        options: [
          'Seguir asistiendo a la Iglesia aunque todo me parezca rutinario.',
          'Aguantar como pueda hasta que Cristo venga.',
          'Seguir viniendo a Cristo una y otra vez, renovando convenios y ayudando a otros a hacer lo mismo.',
          'Evitar hablar de mis dudas y problemas espirituales.',
        ],
        correctOptionIndex: 2,
        explanation:
          'Perseverar es un proceso activo: seguir viniendo a Cristo, renovar convenios y sostener a otros en el camino.',
        scriptureReference: '2 Nefi 31:20',
      },
    ],
  },
  {
    id: 'escenarios-vida-real-misioneros',
    title: '¿Qué harías en esta situación? (con los misioneros)',
    type: 'scenario-quiz',
    difficulty: 'medium',
    recommendedAfterModules: ['member_working_with_missionaries'],
    estimatedMinutes: 12,
    description:
      'Escenarios de la vida real para practicar cómo reaccionarías como miembro al trabajar con los misioneros.',
    studyHint:
      'Piensa siempre en principios: amor, agencia, revelación personal y respeto al rol de los misioneros y de los líderes del barrio.',
    reward: {
      xp: 150,
      badge: 'compañero-de-confianza',
    },
    questions: [
      {
        id: 'scen-m1',
        prompt:
          'Los misioneros te piden acompañarlos a una lección con un amigo tuyo que está pasando por un divorcio difícil. ¿Qué es lo más apropiado?',
        options: [
          'Hablar la mayor parte del tiempo porque conoces mejor la situación.',
          'Dejar que los misioneros enseñen, y tú aportar tu testimonio y apoyo en los momentos claves.',
          'Contar detalles muy personales del divorcio para que los misioneros entiendan todo.',
          'Declinar siempre este tipo de lección porque es “tema delicado”.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Tu rol como miembro es apoyar y testificar, no reemplazar a los misioneros ni exponer detalles innecesarios.',
      },
      {
        id: 'scen-m2',
        prompt:
          'Sientes que un investigador no está listo para bautizarse en la fecha que los misioneros sugieren. ¿Qué deberías hacer?',
        options: [
          'Hablar mal de los misioneros con otros miembros para desahogarte.',
          'Decírselo con amor al investigador para que cancele la fecha lo antes posible.',
          'Compartir tus impresiones con los misioneros en privado y, si es necesario, con el líder misional de barrio.',
          'No decir nada, porque los misioneros siempre saben más que tú.',
        ],
        correctOptionIndex: 2,
        explanation:
          'La comunicación honesta, respetuosa y en privado con los misioneros y líderes es la forma correcta de manejar estas impresiones.',
      },
    ],
  },
  {
    id: 'adivina-el-personaje-misional',
    title: 'Adivina el personaje misional',
    type: 'character-guess',
    difficulty: 'easy',
    recommendedAfterModules: ['member_doctrine_of_christ'],
    estimatedMinutes: 7,
    description:
      'Adivina qué personaje de las Escrituras se describe, para conectar principios misionales con ejemplos reales.',
    studyHint:
      'Piensa en cómo cada personaje vivió la doctrina de Cristo y abrió la boca para testificar.',
    reward: {
      xp: 80,
      badge: 'experto-en-ejemplos',
    },
    questions: [
      {
        id: 'char-1',
        prompt:
          'Fui un profeta que invitó a mi pueblo a venir a Cristo con gozo, hablé mucho del arrepentimiento y vi a miles bautizarse en las aguas de Mormón. ¿Quién soy?',
        options: ['Alma el Joven', 'Nefi', 'Mosíah', 'Enós'],
        correctOptionIndex: 0,
        explanation:
          'Alma el Joven predicó poderosamente el arrepentimiento y vio muchos convenios en las aguas de Mormón.',
      },
      {
        id: 'char-2',
        prompt:
          'Fui un misionero que predicó a un rey y a su pueblo. Muchos dejaron sus armas de guerra y estuvieron dispuestos a morir antes que quebrantar sus convenios. ¿Quién soy?',
        options: ['Amón', 'Mormón', 'Moroni', 'Helamán'],
        correctOptionIndex: 0,
        explanation:
          'Amón enseñó al rey Lamoni y a muchos lamanitas que luego se convirtieron en el pueblo de Anti-Nefi-Lehi.',
      },
    ],
  },
  {
    id: 'practica-companero-misional',
    title: 'Practica: Ser compañero de los misioneros',
    type: 'companion-practice',
    difficulty: 'medium',
    recommendedAfterModules: ['member_working_with_missionaries'],
    estimatedMinutes: 15,
    description:
      'Actividad guiada para que practiques cómo presentar amigos, compartir tu testimonio e invitar con amor.',
    studyHint:
      'No busques respuestas “perfectas”. Enfócate en ser claro, sencillo y centrado en Cristo.',
    reward: {
      xp: 200,
      badge: 'compañero-de-campo',
    },
    questions: [
      {
        id: 'comp-1',
        prompt:
          'Escribe (mentalmente o en un cuaderno) cómo presentarías a un amigo a los misioneros en menos de 30 segundos. Luego selecciona la opción que más se acerque a lo que escribiste.',
        options: [
          'Solo dar el nombre y el número de teléfono.',
          'Explicar brevemente quién es, su situación espiritual y por qué piensas que el evangelio podría ayudarle.',
          'Contar toda su historia personal con detalles.',
          'Decir únicamente: “Es un amigo, llámenlo”.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Una buena presentación da contexto suficiente para que los misioneros enseñen con sensibilidad, sin invadir la privacidad.',
      },
      {
        id: 'comp-2',
        prompt:
          'En una lección, el investigador te pregunta directamente: “¿De verdad vale la pena sacrificarse tanto por la Iglesia?”. ¿Qué respuesta sería más útil?',
        options: [
          'Responder con una explicación larga sobre la historia de la Iglesia.',
          'Decir que no es tan difícil si uno se acostumbra.',
          'Compartir brevemente una experiencia personal donde un sacrificio por el evangelio trajo paz y crecimiento espiritual.',
          'Decir que mejor hable de eso con los misioneros después.',
        ],
        correctOptionIndex: 2,
        explanation:
          'Un testimonio personal, breve y centrado en Cristo suele ser más poderoso que una explicación puramente intelectual.',
      },
    ],
  },
  {
    id: 'desafios-de-servicio-misional',
    title: 'Desafíos de servicio misional',
    type: 'service-challenge',
    difficulty: 'medium',
    recommendedAfterModules: [
      'member_doctrine_of_christ',
      'member_new_converts_temple',
    ],
    estimatedMinutes: 10,
    description:
      'Retos sencillos para aplicar de inmediato principios misionales en tu barrio y en tu hogar.',
    studyHint:
      'Elige uno o dos desafíos que realmente puedas hacer esta semana. No intentes hacer todo a la vez.',
    reward: {
      xp: 250,
      badge: 'manos-en-la-obra',
    },
    questions: [
      {
        id: 'serv-1',
        prompt:
          'Esta semana, elige al menos UNA de estas acciones y márcala como tu desafío personal:',
        options: [
          'Sentarme junto a un nuevo converso o visitante en la reunión sacramental y presentarle al menos a una persona más.',
          'Enviar un mensaje de ánimo a un misionero de tiempo completo o retornado.',
          'Orar por nombre por al menos dos personas con las que podría compartir el evangelio.',
          'Invitar a alguien a una actividad sencilla del barrio (no necesariamente a la reunión sacramental).',
        ],
        correctOptionIndex: 0,
        explanation:
          'No hay respuesta “correcta” aquí; la invitación es elegir y cumplir al menos un desafío concreto esta semana.',
      },
    ],
  },
  {
    id: 'reflexion-diario-misional-miembro',
    title: 'Reflexión: Mi diario misional como miembro',
    type: 'reflection-journal',
    difficulty: 'easy',
    recommendedAfterModules: [
      'member_doctrine_of_christ',
      'member_working_with_missionaries',
      'member_new_converts_temple',
    ],
    estimatedMinutes: 12,
    description:
      'Espacio guiado para escribir cómo el Señor te está usando ahora mismo en la obra de recoger a Israel.',
    studyHint:
      'Sé honesto. El Señor ya sabe dónde estás; este ejercicio es para que tú lo veas con más claridad.',
    reward: {
      xp: 120,
      badge: 'cronista-del-recogimiento',
    },
    questions: [
      {
        id: 'refl-1',
        prompt:
          'Escribe (fuera de la app, en tu diario físico o digital) una experiencia reciente en la que sentiste una impresión de servir, invitar o testificar, aunque haya sido algo pequeño.',
        explanation:
          'Luego, marca la actividad como completada para recordar que el Espíritu ya está obrando en tu vida.',
      },
      {
        id: 'refl-2',
        prompt:
          'Haz una lista de tres nombres: una persona de tu familia, un amigo y alguien de tu barrio o trabajo. Escribe qué podrías hacer por cada uno en las próximas dos semanas.',
        explanation:
          'Estos nombres pueden convertirse en tus primeras referencias preparadas por medio de la oración.',
      },
    ],
  },
];

