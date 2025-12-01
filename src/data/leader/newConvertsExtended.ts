// src/data/leader/newConvertsExtended.ts
// Nuevos conversos — Seguimiento completo 0–12 meses

export interface RiskLevel {
  label: string;
  description: string;
  suggestedActions: string[];
}

export interface ConversionDimension {
  title: string;
  indicators?: string[];
  questionsForLeaders?: string[];
  commonGaps?: string[];
  examplesOfSimpleCallings?: string[];
}

export interface SampleProfile {
  id: string;
  label: string;
  strengths: string[];
  risks: string[];
  suggestedPlan: string[];
}

export interface PriesthoodAndTempleFlow {
  title: string;
  steps: string[];
  notes?: string[];
}

export interface NewConvertsExtended {
  id: string;
  title: string;
  description: string;
  statusTags: string[];
  riskLevels: {
    low: RiskLevel;
    medium: RiskLevel;
    high: RiskLevel;
  };
  conversionDimensions: {
    spiritual: ConversionDimension;
    doctrinal: ConversionDimension;
    social: ConversionDimension;
    service: ConversionDimension;
  };
  priesthoodAndTempleFlow: PriesthoodAndTempleFlow;
  sampleProfiles: SampleProfile[];
}

export const newConvertsExtended: NewConvertsExtended = {
  id: "leader_new_converts_extended",
  title: "Nuevos conversos — Seguimiento completo 0–12 meses",
  description: "Herramienta para que los líderes vean el estado espiritual, social y doctrinal de cada nuevo converso, con niveles de riesgo, próximos pasos sugeridos y coordinación con misioneros.",
  statusTags: [
    "Recién bautizado (0–4 semanas)",
    "Primeros 3 meses",
    "3–6 meses",
    "6–12 meses",
    "En riesgo",
    "Progreso firme"
  ],
  riskLevels: {
    low: {
      label: "Riesgo bajo",
      description: "Asiste de forma constante, tiene amigos en el barrio, participa de ordenanzas y está desarrollando hábitos espirituales.",
      suggestedActions: [
        "Seguir ministrando con normalidad.",
        "Invitarlo a servir en llamamientos pequeños.",
        "Incluirlo en actividades familiares y de barrio.",
        "Revisar metas de templo y de estudio personal."
      ]
    },
    medium: {
      label: "Riesgo medio",
      description: "Faltas ocasionales a la Santa Cena, algunas dudas sin resolver, poca conexión social o presión familiar.",
      suggestedActions: [
        "Visitas específicas del obispo o líderes de organización.",
        "Reforzar doctrina básica: expiación, arrepentimiento, plan de salvación.",
        "Invitarlo a actividades pequeñas, no masivas.",
        "Asegurar transporte y acompañamiento a la capilla."
      ]
    },
    high: {
      label: "Riesgo alto",
      description: "Ausencia repetida, sentimientos de culpa, conflicto familiar fuerte, confusión doctrinal o críticas constantes al evangelio.",
      suggestedActions: [
        "Citas personales con el obispo o presidente de organización.",
        "Escuchar sin juzgar, validar emociones y luego enseñar doctrina.",
        "Activar red de apoyo: misioneros, familia puente, presidencias.",
        "Orar específicamente por él/ella en coordinación misional y consejo."
      ]
    }
  },
  conversionDimensions: {
    spiritual: {
      title: "Conversión espiritual",
      indicators: [
        "Participa de la Santa Cena con reverencia.",
        "Ora diariamente, aunque sean oraciones breves.",
        "Busca respuestas en las escrituras.",
        "Expresa testimonio, aunque sea pequeño."
      ],
      questionsForLeaders: [
        "¿Cuándo fue la última vez que contó una experiencia espiritual?",
        "¿Siente que Dios le responde?",
        "¿Se siente perdonado por sus pecados pasados?",
        "¿Entiende el propósito del bautismo y la confirmación?"
      ]
    },
    doctrinal: {
      title: "Comprensión doctrinal",
      indicators: [
        "Comprende las lecciones misionales básicas.",
        "Distingue entre doctrina oficial y opinión.",
        "Sabe dónde encontrar respuestas (Predicad Mi Evangelio, escrituras, Manual General, líderes)."
      ],
      commonGaps: [
        "Confusión sobre la Trinidad vs. la Deidad.",
        "Dudas sobre la autoridad del sacerdocio.",
        "Desconocimiento de cómo funciona el templo.",
        "Creencias previas mezcladas con el evangelio."
      ]
    },
    social: {
      title: "Integración social",
      indicators: [
        "Tiene al menos 2 amigos en la Iglesia.",
        "Se siente cómodo en las clases.",
        "Ha sido invitado a una noche de hogar o actividad.",
        "Sabe a quién recurrir cuando tiene problemas."
      ],
      questionsForLeaders: [
        "¿A quién llamaría si tuviera una crisis hoy?",
        "¿Sabe el nombre de su presidencia de quórum/organización?",
        "¿Se siente parte del barrio o solo 'visitante'?"
      ]
    },
    service: {
      title: "Servicio y participación",
      indicators: [
        "Acepta tareas pequeñas (orar, leer, ayudar).",
        "Demuestra deseo de servir.",
        "Está dispuesto a aceptar un llamamiento sencillo."
      ],
      examplesOfSimpleCallings: [
        "Recoger himnarios.",
        "Ayudar a preparar la sala.",
        "Apoyar en actividades de barrio.",
        "Acompañar a misioneros (si es apropiado)."
      ]
    }
  },
  priesthoodAndTempleFlow: {
    title: "Flujo sacerdocio y templo en nuevos conversos",
    steps: [
      "Bautismo y confirmación con misioneros y líderes presentes.",
      "Entrevista del obispo para sacerdocio Aarónico (varones) según dignidad y preparación.",
      "Entrevista para recomendación limitada al templo (hombres y mujeres).",
      "Participación en bautismos por los muertos lo antes posible.",
      "Meta de asistir regularmente al templo con el barrio."
    ],
    notes: [
      "No es necesario esperar meses para recomendación limitada.",
      "El obispo discierne el momento correcto, pero se prioriza temprano.",
      "Los misioneros ayudan a enseñar doctrina del templo antes y después."
    ]
  },
  sampleProfiles: [
    {
      id: "adult_single_male",
      label: "Hombre adulto soltero, recién bautizado",
      strengths: [
        "Gran testimonio de la Restauración.",
        "Deseo fuerte de cambiar su vida."
      ],
      risks: [
        "Soledad.",
        "Ambiente laboral hostil a la fe.",
        "Tentaciones previas aún cercanas."
      ],
      suggestedPlan: [
        "Ordenarlo al Sacerdocio Aarónico pronto.",
        "Incluirlo en un quórum activo.",
        "Asociarlo con un hermano fuerte que lo invite a actividades.",
        "Ayudarlo a fijar metas de templo."
      ]
    },
    {
      id: "single_mother",
      label: "Madre soltera con hijos pequeños",
      strengths: [
        "Deseo de criar bien a sus hijos.",
        "Fe en Jesucristo y deseo de paz."
      ],
      risks: [
        "Carga emocional y económica.",
        "Dificultad con transporte.",
        "Fatiga y falta de tiempo."
      ],
      suggestedPlan: [
        "Coordinar transporte con miembros.",
        "Sociedad de Socorro asigna hermanas de apoyo.",
        "Actividades centradas en la familia.",
        "Ayuda para comprender el papel del Padre Celestial en su vida."
      ]
    }
  ]
};

