// src/data/leader/leaderGuideExtended.ts
// Guía del Modo Líder — Autoridad, límites y buenas prácticas

export interface ConfidentialityRules {
  allowedNotes: string[];
  forbiddenNotes: string[];
  principles: string[];
}

export interface LeaderBehavior {
  codeOfConduct: string[];
  phrasesToUseOften: string[];
  phrasesToAvoid: string[];
}

export interface LeaderGuideExtended {
  id: string;
  title: string;
  description: string;
  authoritySources: string[];
  whoShouldUseThisMode: string[];
  confidentialityRules: ConfidentialityRules;
  leaderBehavior: LeaderBehavior;
  disclaimerText: string;
}

export const leaderGuideExtended: LeaderGuideExtended = {
  id: "leader_guide_extended",
  title: "Guía del Modo Líder — Autoridad, límites y buenas prácticas",
  description: "Documento interno para que los líderes entiendan bajo qué autoridad se usa el modo líder, qué límites de confidencialidad existen y cómo debe ser su conducta al manejar información de personas.",
  authoritySources: [
    "Las escrituras (Biblia, Libro de Mormón, DyC, Perla de Gran Precio).",
    "Predicad Mi Evangelio, capítulos sobre Obra misional y retención de conversos.",
    "Manual General de la Iglesia de Jesucristo de los Santos de los Últimos Días.",
    "Instrucciones del Presidente de Estaca, Obispo y líderes de área."
  ],
  whoShouldUseThisMode: [
    "Obispo y consejeros.",
    "Presidencia de Quórum de Élderes.",
    "Presidencia de Sociedad de Socorro.",
    "Presidencias de Hombres Jóvenes y Mujeres Jóvenes (en lo que les corresponda).",
    "Líder misional de barrio o rama.",
    "Secretarios autorizados que ayudan en reportes."
  ],
  confidentialityRules: {
    allowedNotes: [
      "Información básica de progreso espiritual (asistencia, lecciones recibidas, templo, sacerdocio).",
      "Necesidades generales: transporte, acompañamiento, apoyo emocional básico.",
      "Metas espirituales y doctrinales acordadas con la persona.",
      "Resumen breve de preocupaciones doctrinales."
    ],
    forbiddenNotes: [
      "Detalles gráficos de pecados pasados.",
      "Información íntima, legal o médica sin necesidad.",
      "Comentarios críticos, chismes o juicios personales.",
      "Etiquetas permanentes como 'difícil', 'problemático', etc."
    ],
    principles: [
      "Escribir como si la persona pudiera leerlo frente a ti.",
      "Guardar solo lo que sea útil para bendecir, no para controlar.",
      "Respetar la confidencialidad de entrevistas y confesiones.",
      "Compartir información solo con quienes tienen responsabilidad directa."
    ]
  },
  leaderBehavior: {
    codeOfConduct: [
      "Hablar siempre con respeto de cada converso o amigo en enseñanza.",
      "Evitar hacer bromas sobre la fe, el pasado o la situación social de las personas.",
      "Buscar primero entender antes de corregir.",
      "Ser ejemplo de diligencia: si la app sugiere una acción, procurarla con amor."
    ],
    phrasesToUseOften: [
      "\"Cuénteme más, quiero entender bien lo que siente.\"",
      "\"Gracias por confiar en nosotros.\"",
      "\"Podemos buscar la respuesta juntos.\"",
      "\"El Señor está consciente de usted y de su situación.\""
    ],
    phrasesToAvoid: [
      "\"Eso no debería afectarle si tuviera fe.\"",
      "\"Eso es fácil, solo deje de…\"",
      "\"Todos tenemos problemas, no se queje.\"",
      "\"Si sigue así, no debería bautizarse / seguir viniendo.\""
    ]
  },
  disclaimerText: "Esta herramienta no reemplaza la inspiración personal, el consejo del Espíritu Santo ni la autoridad del obispo. Es un apoyo visual y organizado para aplicar los principios de Predicad Mi Evangelio y el Manual General, siempre bajo la dirección de los líderes del sacerdocio."
};

