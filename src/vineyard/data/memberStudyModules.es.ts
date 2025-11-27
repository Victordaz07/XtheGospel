import { StudyModule } from './types';

// Helper function to convert blocks to markdown
const blocksToMarkdown = (blocks: any[]): string => {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'heading':
          return `### ${block.text}`;
        case 'paragraph':
          return block.text;
        case 'list':
          if (block.style === 'bullet') {
            return block.items.map((item: string) => `- ${item}`).join('\n');
          }
          return block.items.map((item: string, index: number) => `${index + 1}. ${item}`).join('\n');
        default:
          return '';
      }
    })
    .join('\n\n');
};

// Helper function to convert references
const convertReferences = (refs: any) => {
  const references: any[] = [];
  
  if (refs.scriptures) {
    refs.scriptures.forEach((scripture: string) => {
      references.push({
        type: 'scripture',
        source: scripture,
      });
    });
  }
  
  if (refs.manuals) {
    refs.manuals.forEach((manual: string) => {
      references.push({
        type: 'manual',
        source: manual,
      });
    });
  }
  
  if (refs.talks) {
    refs.talks.forEach((talk: string) => {
      references.push({
        type: 'talk',
        source: talk,
      });
    });
  }
  
  return references;
};

export const memberStudyModulesEs: StudyModule[] = [
  {
    id: 'member_doctrine_of_christ',
    title: 'La doctrina de Cristo en la vida diaria',
    subtitle: 'Fe, arrepentimiento, convenios y perseverar — como miembro, no solo como investigador.',
    description:
      'Ayudar al miembro de barrio a ver la Doctrina de Cristo como un ciclo continuo y no como un evento aislado del bautismo o de la misión. La meta es que el miembro se sienta responsable de aplicar esta doctrina en su propia vida y de ayudar a otros a hacerlo, apoyando la obra misional y preparándose para la Segunda Venida.',
    levelRecommended: 1,
    sections: [
      {
        id: 'faith_in_christ_action',
        title: 'Fe en Jesucristo que impulsa acción',
        summary:
          'La fe verdadera no es solo creer que Cristo existe, sino confiar tanto en Él que estamos dispuestos a actuar, cambiar y abrir la boca para testificar.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. ¿Qué significa realmente tener fe en Cristo como miembro?',
          },
          {
            type: 'paragraph',
            text: 'La fe en Jesucristo no es solo aceptar que Él es el Hijo de Dios. Es confiar en Su carácter al punto de estar dispuestos a arriesgar comodidad, prestigio y tiempo para seguirle.',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Supone que el Señor está preparando personas a su alrededor.',
              'Ora con expectativa de recibir impresiones sobre a quién servir, invitar o consolar.',
              'Ve los mandamientos como oportunidades para demostrar amor, no como una lista fría de reglas.',
              'Confía en que el Salvador puede cambiar corazones, empezando por el suyo.',
              'Sigue actuando en la obra misional aun cuando el barrio parezca frío o poco interesado.',
            ],
          },
          {
            type: 'heading',
            text: '2. Fe que se traduce en pasos concretos',
          },
          {
            type: 'paragraph',
            text: 'Una fe que no cambia ninguna agenda es solo una idea bonita. Fe en Cristo, para un miembro, se ve en cosas muy específicas.',
          },
          {
            type: 'heading',
            text: 'En el hogar',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Reuniones familiares donde se habla de misioneros, conversos y amigos de la Iglesia.',
              'Oraciones donde se mencionan personas por nombre.',
              'Niños y jóvenes viendo que compartir el evangelio es un tema normal en casa.',
            ],
          },
          {
            type: 'heading',
            text: 'En el barrio',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Estar dispuesto a recibir asignaciones misionales sin ofenderse ni poner excusas.',
              'Llegar temprano a la capilla para buscar a los nuevos o visitantes y sentarse cerca de ellos.',
              'Ofrecerse para acompañar a los misioneros en lecciones clave, aunque implique reorganizar la agenda.',
            ],
          },
          {
            type: 'heading',
            text: 'En lo cotidiano',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Tener una lista mental o escrita de personas por las que se está orando para compartir el evangelio.',
              'Ser consciente de que una conversación normal puede volverse espiritual si el Espíritu lo indica.',
              'No esconder que es miembro de la Iglesia en el trabajo o en la escuela.',
            ],
          },
          {
            type: 'heading',
            text: '3. Obstáculos comunes a la fe misional',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Miedo al rechazo: "Si invito, se van a molestar".',
              'Perfeccionismo: "No sé lo suficiente para explicar bien".',
              'Vergüenza social: "No quiero que piensen que soy fanático".',
              'Experiencias pasadas difíciles: invitaciones rechazadas, amigos que se alejaron.',
            ],
          },
          {
            type: 'paragraph',
            text: 'El Evangelio enseña que la fe se fortalece al actuar, no al esperar a sentirnos listos. El miembro que decide actuar a pesar del temor está viviendo la doctrina de Cristo.',
          },
        ]),
        references: convertReferences({
          scriptures: ['2 Nefi 25:26', 'Éter 12:6', 'Santiago 2:17–18'],
          manuals: ['Predicad Mi Evangelio, cap. 3, "La doctrina de Cristo"', 'Ven, Sígueme — lecciones sobre fe en Cristo'],
          talks: ['Élder Dieter F. Uchtdorf — mensajes sobre fe y confianza en el Señor'],
        }),
      },
      {
        id: 'continuous_repentance',
        title: 'Arrepentimiento continuo: cómo luce en un miembro',
        summary:
          'El arrepentimiento no es solo para grandes pecados; es el proceso diario de ajustar el corazón hacia Cristo y dejar que Él nos cambie.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. El arrepentimiento no es castigo, es privilegio',
          },
          {
            type: 'paragraph',
            text: 'Para muchos miembros, "arrepentimiento" suena a algo dramático asociado a pecados graves. Pero el verdadero discipulado se mide en la capacidad de ajustar el rumbo cada día.',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Reconocer con humildad que aún podemos parecernos más a Cristo.',
              'Aceptar corrección sin excusas ni culpar a otros.',
              'Alegrarnos de que el Señor nos muestre los puntos ciegos.',
            ],
          },
          {
            type: 'heading',
            text: '2. Patrón de arrepentimiento diario para un miembro misional',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Revisar el día con el Señor: qué agradó y qué oportunidades se perdieron.',
              'Reconocer con precisión, sin generalidades ni autodesprecio.',
              'Expresar dolor sincero pero lleno de esperanza en la Expiación.',
              'Definir un plan de cambio específico para el día siguiente.',
              'Volver a levantarse sin quedarse atrapado en la culpa.',
            ],
          },
          {
            type: 'heading',
            text: '3. Arrepentimiento y la Santa Cena',
          },
          {
            type: 'paragraph',
            text: 'La Santa Cena es el laboratorio semanal del arrepentimiento continuo. Un miembro que vive la doctrina de Cristo llega con reverencia, escucha las oraciones con intención y sale con una decisión concreta para esa semana.',
          },
        ]),
        references: convertReferences({
          scriptures: ['Helamán 5:10–11', 'Mosíah 4:2–3', 'Doctrina y Convenios 58:42–43'],
          manuals: ['Predicad Mi Evangelio, cap. 3 — fe y arrepentimiento'],
          talks: [],
        }),
      },
      {
        id: 'endure_to_the_end',
        title: 'Perseverar hasta el fin en un mundo distraído',
        summary:
          'Perseverar no es aguantar aburridos, sino seguir avanzando con propósito, cargando las cargas unos de otros y cumpliendo convenios.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. El desafío: permanecer fiel cuando todo compite por nuestra atención',
          },
          {
            type: 'paragraph',
            text: 'Hoy basta con distraerse para alejarse del Evangelio: muchas horas en redes, poco tiempo en las Escrituras; entusiasmo por lo temporal, poca energía para servir.',
          },
          {
            type: 'heading',
            text: '2. Anclas espirituales para seguir firmes',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Oración sincera mañana y noche, aunque sea breve.',
              'Al menos un versículo significativo al día con intención de aplicarlo.',
              'Un acto deliberado de bondad cada día.',
              'Renovar los convenios en la Santa Cena con una frase clave para la semana.',
              'Registrar de forma simple el progreso en servicio misional.',
              'Rodearse de amigos que empujen hacia el templo y no hacia la tibieza.',
            ],
          },
          {
            type: 'heading',
            text: '3. Perseverar en la obra misional',
          },
          {
            type: 'paragraph',
            text: 'Perseverar hasta el fin incluye perseverar en la obra del Señor. No hay jubilación espiritual: se sigue aprendiendo, testificando y apoyando a conversos y misioneros.',
          },
        ]),
        references: convertReferences({
          scriptures: ['2 Nefi 31:20', '3 Nefi 27:16–22', 'Doctrina y Convenios 14:7'],
          manuals: [],
          talks: [],
        }),
      },
    ],
  },
  {
    id: 'member_new_converts_temple',
    title: 'Cuidado de nuevos conversos y preparación para el templo',
    subtitle: 'Acompañar más allá del bautismo.',
    description:
      'Este módulo enseña al miembro cómo acompañar y fortalecer a los nuevos conversos después del bautismo, ayudándoles a integrarse plenamente en la Iglesia y prepararse para recibir las bendiciones del templo.',
    levelRecommended: 2,
    sections: [
      {
        id: 'convert_care_principles',
        title: 'Principios para cuidar a los nuevos conversos',
        summary:
          'Un nuevo converso es un alma que ha hecho un convenio pero aún está aprendiendo a caminar espiritualmente. Los primeros meses son decisivos.',
        estimatedMinutes: 14,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. El bautismo no es el final: es el comienzo',
          },
          {
            type: 'paragraph',
            text: 'Un nuevo converso es un alma que ha hecho un convenio pero aún está aprendiendo a caminar espiritualmente. Los primeros meses son decisivos: sus raíces de fe están tiernas y necesitan luz, alimento y un entorno seguro.',
          },
          {
            type: 'heading',
            text: 'Principios eternos para cuidarles',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Amor constante y genuino: más amigos reales que visitas formales.',
              'Normalizar las preguntas: las dudas no destruyen la fe; el silencio sí.',
              'Involucrarlos en servicio sencillo para que se sientan parte de la familia.',
              'Ayudarles a formar un círculo de amistades dentro de la Iglesia.',
            ],
          },
          {
            type: 'heading',
            text: '¿Cómo luce un buen acompañamiento?',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Le escribes entre semana, no solo el domingo.',
              'Le preguntas cómo va su lectura del Libro de Mormón.',
              'Oras por él por nombre.',
              'Lo sientas contigo en la capilla.',
              'Lo presentas a otras personas del barrio.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Moroni 6:4'],
          manuals: ['Predicad Mi Evangelio, cap. 13 — Cuidado de conversos'],
          talks: ['Élder Jeffrey R. Holland — "El primer gran mandamiento"'],
        }),
      },
      {
        id: 'auxiliary_roles_callings',
        title: 'Rol de las organizaciones auxiliares y ejemplos de llamamientos',
        summary:
          'El Señor organiza Su Iglesia para que cada miembro sea edificado por la fe. Un converso no debe depender solo de los misioneros o de un líder.',
        estimatedMinutes: 16,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. La Iglesia tiene un diseño inspirado para sostener conversos',
          },
          {
            type: 'paragraph',
            text: 'El Señor organiza Su Iglesia para que cada miembro sea edificado por la fe. Un converso no debe depender solo de los misioneros o de un líder; debe integrarse plenamente en el cuerpo de la Iglesia.',
          },
          {
            type: 'heading',
            text: 'Roles clave de las organizaciones en los primeros 3 meses',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Sociedad de Socorro: acompañamiento espiritual, amistad y enseñanza personalizada del convenio bautismal.',
              'Quórum de élderes: invitarlo a servir, enseñarle responsabilidades del sacerdocio cuando corresponda, acompañarlo en metas espirituales.',
              'Niños y jóvenes: integración social, actividades, amistades sanas y tutoría espiritual para niños o jóvenes conversos.',
            ],
          },
          {
            type: 'heading',
            text: 'Llamamientos simples ideales para nuevos conversos',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Recibidor en la puerta.',
              'Ayudante en actividades.',
              'Repartir programas.',
              'Ayudar en preparación del sacramento (si tiene el sacerdocio adecuado).',
              'Ofrecer oraciones en las reuniones.',
              'Apoyar en limpieza del edificio o en tecnología.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Regla de oro: un nuevo converso debe recibir un llamamiento apropiado dentro de las primeras cuatro semanas.',
          },
        ]),
        references: convertReferences({
          scriptures: ['Efesios 4:12'],
          manuals: ['Manual General — principios sobre cuidado de los miembros y llamamientos'],
          talks: ['Élder Dieter F. Uchtdorf — "En el camino del discípulo"'],
        }),
      },
      {
        id: 'priesthood_and_temple',
        title: 'Primeros pasos con el Sacerdocio y el templo',
        summary:
          'Un varón recién bautizado comienza un camino hacia recibir el Sacerdocio Aarónico y, más adelante, el de Melquisedec. Debe avanzar con claridad, paz y acompañamiento.',
        estimatedMinutes: 18,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. El sacerdocio: proteger, bendecir y servir',
          },
          {
            type: 'paragraph',
            text: 'Un varón recién bautizado comienza un camino hacia recibir el Sacerdocio Aarónico y, más adelante, el de Melquisedec. Debe avanzar con claridad, paz y acompañamiento.',
          },
          {
            type: 'heading',
            text: '¿Qué es y qué no es el sacerdocio?',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Es la autoridad de Dios para bendecir, enseñar, bautizar, consolar y presidir bajo revelación.',
              'No es rango, ni control, ni privilegio humano, ni poder personal.',
            ],
          },
          {
            type: 'heading',
            text: 'Conversaciones importantes antes de ordenar al sacerdocio',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Ley de castidad.',
              'Palabra de Sabiduría.',
              'Diezmo.',
              'Recomendación para el templo.',
              'Servicio cristiano y oración personal.',
            ],
          },
          {
            type: 'heading',
            text: '2. Preparación para su primera vez en el templo',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'El templo es casa de fe, lugar de convenios eternos y escuela celestial.',
              'Debe saber qué esperar emocionalmente: paz, luz, amor.',
              'Debe entender cómo vestirse: ropa modesta, clara, sencilla.',
              'Debe ir acompañado, no solo, y vivir esa visita como un día especial.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Salmos 24:3–4'],
          manuals: ['Manual General — capítulos sobre preparación para el templo'],
          talks: ['Presidente Russell M. Nelson — "El templo y tu relación con Dios"'],
        }),
      },
    ],
  },
  {
    id: 'member_working_with_missionaries',
    title: 'Trabajar hombro a hombro con los misioneros',
    subtitle: 'De miembro espectador a compañero de confianza.',
    description:
      'Este módulo enseña al miembro cómo ser un verdadero compañero de los misioneros: preparar referencias, acompañar en lecciones, coordinar con los líderes y seguir cuidando a las personas después del bautismo.',
    levelRecommended: 2,
    sections: [
      {
        id: 'principles_with_missionaries',
        title: 'Principios para trabajar con los misioneros',
        summary:
          'Los misioneros no están llamados a hacer la obra solos. El Señor siempre ha usado compañeros: Moisés–Aarón, Alma–Amulek, Nefi–Lehi. En la obra misional moderna, el miembro es el tercer compañero.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: 'Introducción',
          },
          {
            type: 'paragraph',
            text: 'Los misioneros no están llamados a hacer la obra solos. El Señor siempre ha usado compañeros: Moisés–Aarón, Alma–Amulek, Nefi–Lehi. En la obra misional moderna, el miembro es el tercer compañero.',
          },
          {
            type: 'heading',
            text: '¿Qué significa ser compañero de los misioneros?',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Vive atento a impresiones: reconoce pensamientos como "Llámale", "Invítalo", "Escúchalo".',
              'Ama sin agenda: acompaña con respeto y autenticidad, comparte la verdad como amigo.',
              'Ve a los misioneros como compañeros, no como empleados de la Iglesia.',
              'Está dispuesto a ensuciarse las manos: va a lecciones, prepara el ambiente espiritual y se preocupa por la persona más allá de la cita.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Doctrina y Convenios 11:21'],
          manuals: ['Predicad Mi Evangelio, cap. 9 — Encontrar personas para enseñar'],
          talks: ['Élder David A. Bednar — "Ven y ve"'],
        }),
      },
      {
        id: 'inspired_referrals',
        title: 'Cómo preparar y ofrecer referencias de manera inspirada',
        summary:
          'La referencia no es un nombre; es una persona amada por Dios. Jesucristo a menudo trabajó mediante recomendaciones personales, y ese patrón sigue vigente hoy.',
        estimatedMinutes: 14,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: 'Introducción',
          },
          {
            type: 'paragraph',
            text: 'La referencia no es un nombre; es una persona amada por Dios. Jesucristo a menudo trabajó mediante recomendaciones personales, y ese patrón sigue vigente hoy.',
          },
          {
            type: 'heading',
            text: 'Principios para ofrecer referencias inspiradas',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'No ofrecer nombres al azar que los misioneros no puedan contactar con preparación previa.',
              'Hablar con la persona antes de dar su nombre: explicar quiénes son los misioneros y qué harán.',
              'Preparar el terreno compartiendo himnos, versículos o tu testimonio antes de la visita.',
              'Acompañar a los misioneros a la lección siempre que sea posible.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Alma 17:2–3'],
          manuals: ['Predicad Mi Evangelio, cap. 3 — Enseñar por el Espíritu'],
          talks: ['Presidente Russell M. Nelson — discursos sobre el recogimiento de Israel'],
        }),
      },
      {
        id: 'after_each_lesson',
        title: 'Acompañar después de cada lección',
        summary:
          'El bautismo es un comienzo, no una meta final. Un nuevo converso se mantiene cuando alguien camina con él. Los misioneros enseñan; los miembros proporcionan la comunidad de la Iglesia.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: 'Introducción',
          },
          {
            type: 'paragraph',
            text: 'El bautismo es un comienzo, no una meta final. Un nuevo converso se mantiene cuando alguien camina con él. Los misioneros enseñan; los miembros proporcionan la comunidad de la Iglesia.',
          },
          {
            type: 'heading',
            text: 'Principios para acompañar después de cada lección',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Volver a enseñar en tus propias palabras lo tratado en la lección y preguntar cómo lo vivió.',
              'Invitar a la participación: Escrituras conjuntas, actividades, nuevas amistades en el barrio.',
              'Ser la primera línea de apoyo: recordar compromisos, aclarar dudas simples, reforzar testimonios.',
              'Ayudar a su transición hacia el templo: explicar entrevistas, convenios y la paz del templo.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Mosíah 18:21'],
          manuals: ['Predicad Mi Evangelio, cap. 13 — Retención de nuevos conversos'],
          talks: ['Élder Dieter F. Uchtdorf — "Una persona a la vez"'],
        }),
      },
    ],
  },
];
