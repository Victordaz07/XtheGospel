// src/data/leader/convertPath12Weeks.ts
// Camino del Nuevo Converso — Primeras 12 Semanas
// Guía doctrinal, espiritual y social para el progreso de nuevos conversos durante sus primeros tres meses.

export interface ConvertWeek {
  week: number;
  theme: string;
  spiritualGoals: string[];
  doctrinalFocus: string[];
  socialIntegration: string[];
  tasks: string[];
  suggestedScriptures: string[];
}

export interface ConvertPath12Weeks {
  id: string;
  title: string;
  description: string;
  weeks: ConvertWeek[];
}

export const convertPath12Weeks: ConvertPath12Weeks = {
  id: "convert_12_weeks_path",
  title: "Camino del Nuevo Converso — Primeras 12 Semanas",
  description:
    "Guía doctrinal, espiritual y social para los primeros tres meses del nuevo converso. Úsala en coordinación misional, consejo de barrio y entrevistas personales.",
  weeks: [
    {
      week: 1,
      theme: "Bienvenida, identidad y pertenencia",
      spiritualGoals: [
        "Participar de la Santa Cena.",
        "Orar por primera vez como miembro.",
        "Recibir testimonio sincero de miembros clave."
      ],
      doctrinalFocus: [
        "Identidad como hijo/hija de Dios.",
        "Propósito del bautismo.",
        "El don del Espíritu Santo."
      ],
      socialIntegration: [
        "Conocer al obispo y a una familia puente.",
        "Ser acompañado por un miembro en todas las reuniones.",
        "Ser presentado al barrio de manera apropiada."
      ],
      tasks: [
        "Visita del obispado o un consejero.",
        "Acompañamiento personal el primer domingo.",
        "Oración diaria (20–30 segundos)."
      ],
      suggestedScriptures: ["Mosíah 18:8–10", "Moroni 6:4", "Juan 14:27"]
    },
    {
      week: 2,
      theme: "Libro de Mormón y oración diaria",
      spiritualGoals: [
        "Leer las escrituras 5 días esta semana.",
        "Sentir deseo de aprender más de Jesucristo."
      ],
      doctrinalFocus: [
        "Revelación personal.",
        "Cómo escuchar la voz del Espíritu.",
        "Por qué el Libro de Mormón es evidencia de la Restauración."
      ],
      socialIntegration: [
        "Ser invitado a una noche de hogar o actividad pequeña.",
        "Hacer un amigo de su misma edad o situación."
      ],
      tasks: [
        "Leer 1 capítulo o 5 versículos diarios.",
        "Recibir un marcador y plan de estudio simple.",
        "Orar después de cada lectura."
      ],
      suggestedScriptures: ["2 Nefi 32:3", "Moroni 10:3–5", "DyC 11:12–13"]
    },
    {
      week: 3,
      theme: "Preparación para el sacerdocio / recomendación limitada",
      spiritualGoals: [
        "Entender qué es el sacerdocio.",
        "Desear participar en ordenanzas futuras.",
        "Sentir el Espíritu en una visita al templo (exterior)."
      ],
      doctrinalFocus: [
        "Aarónico y Melquisedec: funciones y propósito.",
        "Importancia del templo.",
        "La Santa Cena como renovación de convenios."
      ],
      socialIntegration: [
        "Asignación de ministración.",
        "Asistir con un miembro al templo (por fuera)."
      ],
      tasks: [
        "Entrevista con el obispo para sacerdocio (si es varón).",
        "Entrevista para recomendación limitada.",
        "Explicar bautismos por los muertos."
      ],
      suggestedScriptures: ["DyC 84:20–22", "DyC 13", "3 Nefi 18:1–12"]
    },
    {
      week: 4,
      theme: "Integración social completa",
      spiritualGoals: [
        "Sentirse parte del cuerpo de Cristo.",
        "Ver el barrio como su familia espiritual."
      ],
      doctrinalFocus: [
        "Unidad y comunión de los santos.",
        "La importancia de ministrar y ser ministrado."
      ],
      socialIntegration: [
        "Asistir a una actividad oficial del barrio.",
        "Participar de una clase de forma activa."
      ],
      tasks: [
        "Planificar la siguiente actividad juntos.",
        "Crear un pequeño círculo de amigos.",
        "Conversar con el quórum o la Sociedad de Socorro."
      ],
      suggestedScriptures: ["Mosíah 18:21", "Efesios 2:19", "Romanos 12:5"]
    },
    {
      week: 5,
      theme: "Fundamentos del evangelio en la vida diaria",
      spiritualGoals: [
        "Aplicar principios en decisiones personales.",
        "Reconocer la guía del Espíritu."
      ],
      doctrinalFocus: [
        "La fe verdadera implica acción.",
        "El arrepentimiento es un proceso continuo."
      ],
      socialIntegration: [
        "Participar en actividades de grupo.",
        "Escuchar el testimonio de un miembro sobre conversión."
      ],
      tasks: [
        "Escribir 2 experiencias espirituales recientes.",
        "Compartir lo que está aprendiendo con un amigo miembro."
      ],
      suggestedScriptures: ["Alma 32:26–43", "DyC 58:26–28"]
    },
    {
      week: 6,
      theme: "Construcción de hábitos espirituales sólidos",
      spiritualGoals: ["Orar mañana y noche.", "Leer 6 días esta semana."],
      doctrinalFocus: [
        "Cómo recibir revelación frecuente.",
        "Cómo evitar recaídas espirituales."
      ],
      socialIntegration: [
        "Conectar con alguien de su edad en la organización.",
        "Participar en la actividad que más le gustó."
      ],
      tasks: [
        "Diseñar un plan personal de estudio de 30 días.",
        "Estudio familiar o con un amigo miembro."
      ],
      suggestedScriptures: ["DyC 88:119", "Helamán 5:12"]
    },
    {
      week: 7,
      theme: "Entender el rol del templo en el plan eterno",
      spiritualGoals: [
        "Desear servir regularmente en el templo.",
        "Entender la importancia de la obra vicaria."
      ],
      doctrinalFocus: [
        "La exaltación es un proceso.",
        "El templo es la casa del Señor."
      ],
      socialIntegration: [
        "Participar en un viaje de templo programado.",
        "Crear lazos con miembros que aman el templo."
      ],
      tasks: [
        "Completar primeras ordenanzas vicarias.",
        "Estudiar material oficial sobre el templo."
      ],
      suggestedScriptures: ["Salmos 24:3–4", "DyC 97:15–17"]
    },
    {
      week: 8,
      theme: "Fortalecer identidad y testimonio personal",
      spiritualGoals: [
        "Reconocer respuestas específicas a oraciones.",
        "Compartir testimonio con alguien."
      ],
      doctrinalFocus: [
        "Dios responde en Su tiempo.",
        "El testimonio crece al compartirlo."
      ],
      socialIntegration: [
        "Participar en ministración ligera.",
        "Salir con miembros a un servicio o actividad."
      ],
      tasks: [
        "Escribir su testimonio por primera vez.",
        "Compartirlo con un misionero o líder."
      ],
      suggestedScriptures: ["Jacobo 4:6", "3 Nefi 5:13"]
    },
    {
      week: 9,
      theme: "Profundizar en doctrina básica",
      spiritualGoals: [
        "Comprender mejor la expiación.",
        "Reconocer el poder santificador del Espíritu."
      ],
      doctrinalFocus: [
        "La gracia de Jesucristo.",
        "El perdón continuo."
      ],
      socialIntegration: [
        "Involucrarse en un servicio del barrio.",
        "Practicar ministración básica."
      ],
      tasks: [
        "Leer Mosíah 2–4.",
        "Hacer un acto de servicio específico."
      ],
      suggestedScriptures: ["Mosíah 2:17", "Isaías 1:18"]
    },
    {
      week: 10,
      theme: "Prepararse para llamamientos simples",
      spiritualGoals: [
        "Entender qué es un llamamiento inspirado.",
        "Aceptar oportunidades de servicio."
      ],
      doctrinalFocus: [
        "La Iglesia es una Iglesia de servicio.",
        "Los llamamientos son inspirados."
      ],
      socialIntegration: [
        "Ser invitado a participar en algo real.",
        "Sentir responsabilidad en el barrio."
      ],
      tasks: [
        "Asistir a una reunión adicional (actividad, presidencia, etc.).",
        "Ayudar a preparar una actividad o clase."
      ],
      suggestedScriptures: ["DyC 4", "Mateo 25:35–40"]
    },
    {
      week: 11,
      theme: "Fundamento emocional y social",
      spiritualGoals: [
        "Reconocer cómo el evangelio trae paz emocional.",
        "Trabajar en sanar heridas espirituales."
      ],
      doctrinalFocus: [
        "Jesucristo sana corazones.",
        "El Espíritu Santo consuela."
      ],
      socialIntegration: [
        "Resolver dudas con líderes.",
        "Crear nuevas metas espirituales concretas."
      ],
      tasks: [
        "Sesión de preguntas doctrinales con un líder.",
        "Actividad simple con miembros de confianza."
      ],
      suggestedScriptures: ["Juan 14:26–27", "Alma 7:11–13"]
    },
    {
      week: 12,
      theme: "Proyectar el primer año completo",
      spiritualGoals: [
        "Elaborar metas espirituales a 6 y 12 meses.",
        "Establecer hábitos permanentes."
      ],
      doctrinalFocus: [
        "Perseverar hasta el fin.",
        "La conversión es continua."
      ],
      socialIntegration: [
        "Ser plenamente parte de su organización.",
        "Ser incluido en ministración formal."
      ],
      tasks: [
        "Plan anual de conversión (escrito).",
        "Revisión con el obispo o líder misional.",
        "Evaluación de progreso de 90 días."
      ],
      suggestedScriptures: ["2 Nefi 31:20", "DyC 14:7"]
    }
  ]
};

