// src/data/leader/leaderIntegrationExtended.ts
// Este archivo contiene el mapa extendido de integración de 12 meses

export const leaderIntegrationExtended = {
  id: 'leader_integration_map',
  title: 'Mapa de integración de nuevos conversos (12 meses)',
  description:
    'Guía de referencia para que los líderes acompañen a los nuevos conversos durante su primer año en la Iglesia, basada en Predicad Mi Evangelio y el Manual General.',

  phases: [
    {
      id: '0_1',
      label: 'Mes 0–1: Bienvenida y seguridad espiritual',
      focus: 'Que el nuevo converso se sienta amado, acompañado y seguro en la Iglesia.',
      objectives: [
        'Asegurar que tome la Santa Cena cada semana.',
        'Ayudarle a entender la importancia de la oración y las Escrituras.',
        'Conectarlo con al menos un amigo firme en el evangelio.',
      ],
      suggestedActionsForLeaders: [
        'Asignar ministradores inmediatamente después del bautismo.',
        'Presentarlo al obispo/presidente de rama y líderes de su organización.',
        'Preguntar cómo se siente en las reuniones y si hay algo que le confunda.',
        'Coordinar con los misioneros para completar las lecciones de repaso.',
        'Invitarlo a una noche de hogar o actividad del barrio.',
      ],
      scripturalBasis: [
        'Moroni 6:4 — Cuidar de los nuevos miembros.',
        'PMG 2023, Cap. 12 — Permanecer firmes en el camino del convenio.',
        'Manual General 29.2.5 — Prioridad en nuevos conversos.',
      ],
    },
    {
      id: '1_3',
      label: 'Mes 1–3: Pertenencia y primeras responsabilidades',
      focus: 'Ayudarle a sentir que pertenece a un pueblo de convenios, no solo a una reunión dominical.',
      objectives: [
        'Integrarlo a las clases y quórums/organizaciones apropiadas.',
        'Extender un llamamiento sencillo, según lo determine el obispado.',
        'Ayudarle a desarrollar hábitos de estudio y oración constantes.',
      ],
      suggestedActionsForLeaders: [
        'Acompañarlo durante varias semanas a su clase para que no esté solo.',
        'Hablar con él/ella sobre sus talentos y cómo podría servir.',
        'Explicar qué es un llamamiento y por qué es una oportunidad de servir.',
        'Enseñar sobre el templo y comenzar a hablar de historia familiar.',
        'Planear una primera visita al templo para bautismos por los muertos.',
      ],
      scripturalBasis: [
        'DyC 84:106 — Fortaleced a los débiles.',
        'Moroni 6:5–6 — Reunirse con frecuencia para orar y hablar unos con otros.',
        'PMG 2023, Cap. 12 — Responsabilidades para los nuevos conversos.',
      ],
    },
    {
      id: '3_6',
      label: 'Mes 3–6: Servicio, templo y consolidación del testimonio',
      focus: 'Afirmar su fe mediante servicio, participación en el templo y amistades sanas.',
      objectives: [
        'Ayudarle a servir y magnificar su llamamiento con apoyo.',
        'Fortalecer su comprensión de los convenios bautismales.',
        'Lograr al menos una experiencia significativa en el templo.',
      ],
      suggestedActionsForLeaders: [
        'Revisar periódicamente cómo se siente con su llamamiento.',
        'Invitarlo a participar en proyectos de servicio del barrio.',
        'Acompañarlo al templo para bautismos por los muertos.',
        'Resolver dudas doctrinales que hayan surgido con el tiempo.',
        'Asegurar que los ministradores lo visiten y lo conozcan bien.',
      ],
      scripturalBasis: [
        'Mosíah 18:8–10 — Estar dispuestos a llevar las cargas los unos de los otros.',
        'DyC 88:119 — Organizaos; preparaos para cada necesidad.',
        'Manual General 27.2.1 — Bautismos por los muertos y trabajo del templo.',
      ],
    },
    {
      id: '6_12',
      label: 'Mes 6–12: Profundizar convenios y visión a largo plazo',
      focus: 'Mirar hacia el futuro: templo, familia, servicio continuo en la Iglesia.',
      objectives: [
        'Ayudarle a ver su progreso espiritual y reconocer las bendiciones.',
        'Enseñarle sobre metas eternas: sellamiento, servicio misional, liderazgo.',
        'Fortalecer la relación con su quórum/organización.',
      ],
      suggestedActionsForLeaders: [
        'Conversar sobre metas espirituales: misión, matrimonio en el templo, servicio.',
        'Revisar si está listo para obtener o renovar recomendación de uso limitado.',
        'Involucrarlo en actividades donde pueda compartir su testimonio.',
        'Revisar en consejo de barrio si aún requiere apoyo especial.',
        'Celebrar el cumplimiento de su primer año con gratitud y testimonio.',
      ],
      scripturalBasis: [
        'DyC 128:22–24 — Alegrémonos por la gran obra del templo.',
        '2 Nefi 31:20 — Seguid adelante con firmeza en Cristo.',
        'Manual General 26.5 — Fomentar el servicio y crecimiento continuo.',
      ],
    },
  ],
} as const;

