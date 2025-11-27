import { MemberActivity } from './activitiesTypes';

export const memberActivities: MemberActivity[] = [
  {
    id: 'quiz-fe-accion',
    moduleId: 'member_doctrine_of_christ',
    type: 'QUIZ_SINGLE',
    title: 'Fe que impulsa acción',
    shortDescription: 'Pon a prueba cómo aplicarías la fe en decisiones reales y pequeñas acciones diarias.',
    xp: 10,
    levelRecommended: 1,
    question:
      'Juan lleva años en la Iglesia pero casi nunca habla del evangelio con nadie. Dice que "tiene fe", pero evita cualquier situación donde pudiera compartir su testimonio. ¿Qué describe mejor la situación?',
    options: [
      {
        id: 'a',
        text: 'Juan tiene fe suficiente; compartir es un don extra que no todos reciben.',
        isCorrect: false,
        feedback:
          'La fe verdadera siempre impulsa a la acción. No todos comparten de la misma manera, pero la fe en Cristo inevitablemente nos mueve a servir y testificar.',
      },
      {
        id: 'b',
        text: 'Juan necesita desarrollar una fe que lo lleve a confiar en que el Señor le ayudará a hablar, aunque se sienta nervioso.',
        isCorrect: true,
        feedback:
          'Correcto. La fe incluye confiar en que Cristo suplirá lo que nos falta (véase Éter 12:27) y dar pasos pequeños pero reales.',
      },
      {
        id: 'c',
        text: 'Mientras Juan asista a la Iglesia, no importa si nunca comparte su testimonio.',
        isCorrect: false,
        feedback:
          'El discipulado va más allá de asistir. El Señor nos invita a ser testigos de Él en todo tiempo y en todo lugar.',
      },
    ],
  },
  {
    id: 'quiz-referencias-preparadas',
    moduleId: 'member_working_with_missionaries',
    type: 'QUIZ_SINGLE',
    title: '¿Lista de nombres o inspiración?',
    shortDescription: 'Evalúa si tus invitaciones nacen del Espíritu o de la presión social.',
    xp: 12,
    levelRecommended: 2,
    question:
      'Tu líder misional de barrio pide referencias. Te das cuenta de que tienes cinco contactos en el celular, pero solo has orado por dos de ellos. ¿Qué deberías hacer primero?',
    options: [
      {
        id: 'a',
        text: 'Enviar los cinco nombres de inmediato para demostrar entusiasmo.',
        isCorrect: false,
        feedback:
          'Las referencias impulsivas suelen carecer de seguimiento. El Señor puede inspirarte respecto a quién y cuándo.',
      },
      {
        id: 'b',
        text: 'Orar y servir a esas personas durante la semana antes de compartir sus nombres.',
        isCorrect: true,
        feedback:
          'Preparar el corazón propio y el de la persona crea condiciones para que el Espíritu confirme la invitación.',
      },
      {
        id: 'c',
        text: 'Esperar a que los misioneros reciban la revelación; no es tu responsabilidad.',
        isCorrect: false,
        feedback:
          'Los misioneros dependen de la revelación de los miembros sobre su círculo de influencia. Trabajan en equipo.',
      },
    ],
  },
  {
    id: 'quiz-cuidado-templo',
    moduleId: 'member_new_converts_temple',
    type: 'QUIZ_SINGLE',
    title: 'Acompañar hacia el templo',
    shortDescription: 'Revisa cómo convertir una simple visita en un apoyo real rumbo al templo.',
    xp: 15,
    levelRecommended: 2,
    question:
      'María fue bautizada hace un mes y desea obtener una recomendación limitada para bautismos por los muertos. ¿Cuál es la mejor ayuda inicial?',
    options: [
      {
        id: 'a',
        text: 'Insistir en que primero aprenda toda la historia familiar avanzada.',
        isCorrect: false,
        feedback:
          'El proceso debe ser progresivo. La familiaridad con historia familiar se puede enseñar poco a poco.',
      },
      {
        id: 'b',
        text: 'Explicarle el proceso de entrevista y ofrecer acompañarla a su primera visita al templo.',
        isCorrect: true,
        feedback:
          'La enseñanza clara y el acompañamiento reducen la ansiedad y mantienen el enfoque en convenios, no en procedimientos.',
      },
      {
        id: 'c',
        text: 'Aconsejarle esperar un año para evitar que se abrume.',
        isCorrect: false,
        feedback:
          'No hay razón doctrinal para esperar si la persona progresa dignamente. Postergar innecesariamente puede apagar el deseo.',
      },
    ],
  },
  {
    id: 'scenario-nuevo-converso-solo',
    moduleId: 'member_new_converts_temple',
    type: 'SCENARIO',
    title: 'Nuevo converso sentado solo',
    shortDescription: 'Decide qué harías ante señales tempranas de desánimo y aislamiento.',
    xp: 20,
    levelRecommended: 1,
    scenario:
      'Es domingo. Ves a un hermano recién bautizado sentado solo al fondo del salón sacramental. Ya estás sentado con tu familia y el himno de apertura está por iniciar. ¿Qué haces?',
    options: [
      {
        id: 'a',
        text: 'Te quedas donde estás y piensas hablarle al final.',
        isCorrect: false,
        feedback:
          'Postergar casi siempre significa olvidar. Los nuevos conversos necesitan señales inmediatas de que pertenecen al barrio.',
      },
      {
        id: 'b',
        text: 'Le haces señas desde lejos para que sepa que lo viste.',
        isCorrect: false,
        feedback:
          'Es cordial, pero no suficiente. El Salvador se acercaba a las personas, no solo las miraba de lejos.',
      },
      {
        id: 'c',
        text: 'Te levantas, lo invitas a sentarse contigo y lo presentas a tu familia.',
        isCorrect: true,
        feedback:
          'Esta opción refleja Mosíah 18:21. Los misioneros se irán; el barrio se queda. Tu amistad puede marcar la diferencia en su perseverancia.',
      },
    ],
  },
  {
    id: 'scenario-invitacion-natural',
    moduleId: 'member_working_with_missionaries',
    type: 'SCENARIO',
    title: 'Invitación en el trabajo',
    shortDescription: 'Aprende a responder con amor, claridad doctrinal y sin entrar en contención.',
    xp: 18,
    levelRecommended: 2,
    scenario:
      'En la oficina, una compañera comenta que busca maneras de enseñar principios espirituales a sus hijos. Sabes que los misioneros tienen una lección enfocada en el Plan de Salvación para familias.',
    options: [
      {
        id: 'a',
        text: 'Le entregas un folleto sin contexto y te vas.',
        isCorrect: false,
        feedback:
          'Los folletos son útiles, pero sin una conversación y sin escuchar pueden sentirse como publicidad.',
      },
      {
        id: 'b',
        text: 'Compartes tu experiencia familiar y ofreces presentar a los misioneros cuando ella se sienta lista.',
        isCorrect: true,
        feedback:
          'Involucra tu testimonio, escucha sus necesidades y ofrece una invitación abierta sin presión.',
      },
      {
        id: 'c',
        text: 'Le dices que pregunte directamente en internet.',
        isCorrect: false,
        feedback:
          'Perderías la oportunidad de ministrar personalmente. El Señor te inspiró porque confía en tu voz.',
      },
    ],
  },
  {
    id: 'scripture-match-consuelo',
    moduleId: 'member_working_with_missionaries',
    type: 'QUIZ_SCRIPTURE_MATCH',
    title: '¿Qué escritura compartirías?',
    shortDescription: 'Pon a prueba tu discernimiento espiritual en situaciones cotidianas.',
    xp: 15,
    levelRecommended: 2,
    situation:
      'Una amiga que investiga la Iglesia te dice: "Siento que Dios se ha olvidado de mí". ¿Qué escritura sería más apropiada compartir primero?',
    scriptures: [
      {
        id: 'a',
        reference: 'Isaías 41:10',
        text: 'No temas, porque yo estoy contigo...',
        isCorrect: true,
        explanation:
          'Este pasaje habla directamente del consuelo y la cercanía del Señor. Es una base perfecta antes de abordar mandamientos o convenios.',
      },
      {
        id: 'b',
        reference: 'Mosíah 2:41',
        text: 'Y quisiéramos que consideraseis el bendito y feliz estado...',
        isCorrect: false,
        explanation:
          'Gran escritura, pero puede sonar más condicional que consoladora en primera instancia.',
      },
      {
        id: 'c',
        reference: 'DyC 130:20--21',
        text: 'Hay una ley, irrevocablemente decretada...',
        isCorrect: false,
        explanation:
          'Habla sobre leyes y bendiciones, pero no responde a la necesidad emocional inmediata.',
      },
    ],
  },
  {
    id: 'scripture-match-servir',
    moduleId: 'member_doctrine_of_christ',
    type: 'QUIZ_SCRIPTURE_MATCH',
    title: 'Escrituras sobre servicio valiente',
    shortDescription: 'Aplica principios del evangelio a decisiones prácticas del día a día.',
    xp: 15,
    levelRecommended: 2,
    situation:
      'Un joven adulto dice que teme invitar a sus amigos porque siente que no sabe qué decir. ¿Qué pasaje le ayudaría a confiar en el Espíritu?',
    scriptures: [
      {
        id: 'a',
        reference: 'DyC 84:85',
        text: 'Ni os preocupéis por lo que habéis de decir...',
        isCorrect: true,
        explanation:
          'Promesa directa del Señor de que el Espíritu pondrá palabras en su boca en el momento preciso.',
      },
      {
        id: 'b',
        reference: 'Alma 37:35',
        text: 'Oh, recuerda, hijo mío, y aprende sabiduría en tu juventud...',
        isCorrect: false,
        explanation:
          'Buen consejo, pero no aborda la ansiedad de abrir la boca en el momento.',
      },
      {
        id: 'c',
        reference: 'Moisés 1:39',
        text: 'Esta es mi obra y mi gloria...',
        isCorrect: false,
        explanation:
          'Testifica del propósito de Dios, pero DyC 84:85 responde de manera más directa a la inquietud específica.',
      },
    ],
  },
  {
    id: 'character-samuel-lamanita',
    moduleId: 'member_doctrine_of_christ',
    type: 'CHARACTER_GUESS',
    title: 'Adivina el personaje',
    shortDescription: 'Descubre qué harías como miembro misional frente a desafíos reales.',
    xp: 8,
    levelRecommended: 1,
    clues: [
      'Prediqué el arrepentimiento desde lo alto de un muro.',
      'Muchos intentaron hacerme callar, incluso lanzándome piedras y flechas.',
      'Fui enviado a advertir a un pueblo que se creía muy justo.',
    ],
    options: ['Abinadí', 'Samuel el Lamanita', 'Alma el Joven', 'Helamán'],
    correctName: 'Samuel el Lamanita',
    explanation:
      'Samuel es un potente ejemplo de valentía al testificar. Su historia recuerda a los miembros que la verdad puede ser impopular, pero necesaria.',
  },
  {
    id: 'real-world-mission-orar-por-nombres',
    moduleId: 'member_working_with_missionaries',
    type: 'REAL_WORLD_MISSION',
    title: 'Orar por nombres específicos',
    shortDescription: 'Ejercita habilidades que fortalecen tu capacidad de servir.',
    xp: 30,
    levelRecommended: 1,
    description:
      'Durante siete días seguidos, ora cada noche mencionando al menos dos personas por nombre que podrían ser bendecidas por el evangelio.',
    instructions:
      'Escribe sus nombres en un papel o en la app. Pide inspiración sobre cómo servirles. No empieces necesariamente invitando; comienza sirviendo y escuchando.',
    reflectionPrompt:
      'Después de la semana, registra qué sentimientos o impresiones recibiste respecto a esas personas.',
  },
  {
    id: 'real-world-mission-acompanar-misioneros',
    moduleId: 'member_working_with_missionaries',
    type: 'REAL_WORLD_MISSION',
    title: 'Acompaña a los misioneros en una enseñanza',
    shortDescription: 'Aprende el rol correcto del miembro dentro de una enseñanza misional.',
    xp: 40,
    levelRecommended: 2,
    description:
      'Coordina con los misioneros de tu barrio para acompañarlos a una cita de enseñanza o de ministración.',
    instructions:
      'Antes de la cita, ora para saber qué experiencia o testimonio personal podrías compartir. Durante la visita, evita dominar la conversación; permite que los misioneros dirijan y sé un testigo adicional.',
    reflectionPrompt:
      '¿Qué sentiste al ver a los misioneros enseñar? ¿Qué aprendiste sobre cómo tú mismo puedes invitar a otros a venir a Cristo?',
  },
  {
    id: 'reading-block-escrituras-vivas',
    moduleId: 'member_doctrine_of_christ',
    type: 'READING_BLOCK',
    title: 'Lectura guiada: Escrituras vivas',
    shortDescription: 'Aprende a actuar con fe en circunstancias comunes y presiones reales.',
    xp: 6,
    levelRecommended: 1,
    content:
      'Repasa 2 Nefi 25:26 y escribe en tu diario dos maneras en que tu familia podría "hablar de Cristo" con más naturalidad esta semana. Enfócate en conversaciones reales, no discursos formales.',
    reflectionQuestion:
      '¿Qué cambio pequeño podrías hacer en tus conversaciones diarias para que el nombre del Salvador aparezca con más frecuencia y amor?',
  },
  {
    id: 'reading-block-ministerio-silencioso',
    moduleId: 'member_new_converts_temple',
    type: 'READING_BLOCK',
    title: 'Meditación: Ministerio silencioso',
    shortDescription: 'Desarrolla sensibilidad espiritual para reconocer oportunidades misionales.',
    xp: 6,
    levelRecommended: 1,
    content:
      'Lee Mosíah 18:21--23 y anota verbos o acciones concretas que describan la vida de la comunidad de Helamán. Compara con la experiencia actual de tu barrio.',
    reflectionQuestion:
      '¿Qué acción silenciosa (mensaje, visita, servicio sencillo) podrías realizar esta semana para que un nuevo converso sienta ese mismo espíritu de unidad?',
  },
];
export { memberActivitiesEs } from './memberActivities.es';
export { memberActivitiesEn } from './memberActivities.en';
export { memberActivitiesFr } from './memberActivities.fr';
export { memberActivitiesPt } from './memberActivities.pt';

