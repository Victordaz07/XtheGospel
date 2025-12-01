// src/data/leader/convertPlansByOrganization.ts
// Planes detallados de integración por organización

export type OrganizationType = 'eldersQuorum' | 'reliefSociety' | 'youngAdults' | 'youngMen' | 'youngWomen' | 'primary';

export interface OrganizationPlan {
  organization: OrganizationType;
  organizationName: string;
  timeframe: '0-3' | '3-6' | '6-12';
  goals: string[];
  actions: string[];
  callings: string[];
  activities: string[];
  doctrinalFocus: string[];
  scriptures: string[];
}

export const convertPlansByOrganization: Record<OrganizationType, Record<'0-3' | '3-6' | '6-12', OrganizationPlan>> = {
  eldersQuorum: {
    '0-3': {
      organization: 'eldersQuorum',
      organizationName: 'Quórum de Élderes',
      timeframe: '0-3',
      goals: [
        'Recibir el Sacerdocio Aarónico y luego el Sacerdocio de Melquisedec cuando esté listo.',
        'Entender el propósito y poder del sacerdocio.',
        'Desarrollar amistades con otros élderes del quórum.',
        'Aprender a servir mediante el sacerdocio.'
      ],
      actions: [
        'Entrevista con el obispo para recibir el Sacerdocio Aarónico.',
        'Asignar un compañero de ministración que sea un élder experimentado.',
        'Incluirlo en reuniones de quórum y actividades de servicio.',
        'Enseñarle sobre el poder del sacerdocio y cómo usarlo para bendecir a otros.',
        'Invitarle a participar en ordenanzas del sacerdocio (bendiciones, etc.).'
      ],
      callings: [
        'Secretario de quórum (aprendizaje gradual).',
        'Ayudante en actividades de servicio.',
        'Asistente en preparación de salas para reuniones.',
        'Compañero de ministración (con apoyo).'
      ],
      activities: [
        'Actividades de servicio del quórum.',
        'Noches de hogar con familias del quórum.',
        'Actividades deportivas o recreativas.',
        'Proyectos de servicio comunitario.'
      ],
      doctrinalFocus: [
        'El sacerdocio: qué es, cómo se recibe, cómo se usa.',
        'La autoridad del sacerdocio vs. el poder del sacerdocio.',
        'El papel del padre y esposo en el hogar.',
        'La responsabilidad de servir a otros.'
      ],
      scriptures: ['DyC 84:20-22', 'DyC 121:36-46', 'Mosíah 18:8-10', 'Mateo 20:25-28']
    },
    '3-6': {
      organization: 'eldersQuorum',
      organizationName: 'Quórum de Élderes',
      timeframe: '3-6',
      goals: [
        'Fortalecer su comprensión del sacerdocio.',
        'Desarrollar habilidades de liderazgo.',
        'Profundizar en doctrina del sacerdocio.',
        'Prepararse para recibir el Sacerdocio de Melquisedec si aún no lo tiene.'
      ],
      actions: [
        'Asignar un llamamiento más significativo si está listo.',
        'Incluirlo en consejos de quórum cuando sea apropiado.',
        'Enseñarle sobre el templo y preparación para ordenanzas.',
        'Ayudarle a entender su papel como líder en el hogar.',
        'Coordinar con el obispo para entrevista de Sacerdocio de Melquisedec.'
      ],
      callings: [
        'Consejero en presidencia de quórum (si está preparado).',
        'Maestro de quórum.',
        'Especialista en actividades.',
        'Líder de grupo de ministración.'
      ],
      activities: [
        'Viajes al templo con el quórum.',
        'Actividades de capacitación en liderazgo.',
        'Proyectos de servicio más complejos.',
        'Actividades familiares del quórum.'
      ],
      doctrinalFocus: [
        'El Sacerdocio de Melquisedec y sus llaves.',
        'La función del quórum en la obra de salvación.',
        'El poder del sacerdocio en el hogar.',
        'Preparación para el templo.'
      ],
      scriptures: ['DyC 107:1-5', 'DyC 84:19-25', 'Alma 13:1-10', 'Éter 12:27']
    },
    '6-12': {
      organization: 'eldersQuorum',
      organizationName: 'Quórum de Élderes',
      timeframe: '6-12',
      goals: [
        'Ser un líder activo en el quórum.',
        'Mentorear a otros nuevos conversos.',
        'Prepararse para metas a largo plazo (misión, matrimonio en el templo).',
        'Desarrollar un testimonio sólido del sacerdocio.'
      ],
      actions: [
        'Asignar como mentor de nuevos conversos.',
        'Incluirlo en planificación de actividades del quórum.',
        'Ayudarle a establecer metas espirituales a largo plazo.',
        'Prepararle para responsabilidades mayores si está listo.',
        'Revisar progreso y celebrar logros.'
      ],
      callings: [
        'Presidente de quórum (si está preparado).',
        'Especialista en bienestar.',
        'Coordinador de actividades.',
        'Maestro de doctrina del evangelio.'
      ],
      activities: [
        'Liderazgo en actividades de servicio.',
        'Capacitación para líderes.',
        'Actividades de preparación misional (si aplica).',
        'Actividades de preparación para el templo.'
      ],
      doctrinalFocus: [
        'El sacerdocio y la familia eterna.',
        'Preparación para el templo y ordenanzas superiores.',
        'El papel del sacerdocio en la obra misional.',
        'Perseverar hasta el fin.'
      ],
      scriptures: ['DyC 84:33-44', 'DyC 88:119', '2 Nefi 31:20', 'Alma 37:33-37']
    }
  },
  reliefSociety: {
    '0-3': {
      organization: 'reliefSociety',
      organizationName: 'Sociedad de Socorro',
      timeframe: '0-3',
      goals: [
        'Sentirse parte de la hermandad de la Sociedad de Socorro.',
        'Entender el propósito y la historia de la organización.',
        'Desarrollar amistades con otras hermanas.',
        'Aprender sobre el poder de las mujeres en el evangelio.'
      ],
      actions: [
        'Asignar hermanas de compañerismo que la reciban y acompañen.',
        'Incluirla en reuniones y actividades de la Sociedad de Socorro.',
        'Enseñarle sobre la historia y propósito de la organización.',
        'Invitarle a participar en servicio y ministerio.',
        'Ayudarle a entender su valor como hija de Dios.'
      ],
      callings: [
        'Secretaria de clase (aprendizaje gradual).',
        'Ayudante en actividades.',
        'Compañera de ministerio (con apoyo).',
        'Asistente en organización de eventos.'
      ],
      activities: [
        'Actividades de servicio de la Sociedad de Socorro.',
        'Noches de hogar con hermanas.',
        'Actividades de desarrollo personal.',
        'Proyectos de servicio comunitario.'
      ],
      doctrinalFocus: [
        'El papel de las mujeres en el plan de salvación.',
        'El poder de la oración y la fe.',
        'El servicio como forma de discipulado.',
        'La importancia de la familia.'
      ],
      scriptures: ['Lucas 1:38', 'Proverbios 31:10-31', 'Mosíah 18:8-10', 'Alma 32:21']
    },
    '3-6': {
      organization: 'reliefSociety',
      organizationName: 'Sociedad de Socorro',
      timeframe: '3-6',
      goals: [
        'Fortalecer su testimonio del evangelio.',
        'Desarrollar habilidades de liderazgo.',
        'Profundizar en doctrina.',
        'Prepararse para el templo.'
      ],
      actions: [
        'Asignar un llamamiento más significativo si está lista.',
        'Incluirla en consejos de la Sociedad de Socorro cuando sea apropiado.',
        'Enseñarle sobre el templo y preparación para ordenanzas.',
        'Ayudarle a entender su papel como líder en el hogar.',
        'Coordinar con el obispo para recomendación limitada al templo.'
      ],
      callings: [
        'Consejera en presidencia de clase (si está preparada).',
        'Maestra de clase.',
        'Especialista en actividades.',
        'Líder de grupo de ministerio.'
      ],
      activities: [
        'Viajes al templo con la Sociedad de Socorro.',
        'Actividades de capacitación en liderazgo.',
        'Proyectos de servicio más complejos.',
        'Actividades familiares de la organización.'
      ],
      doctrinalFocus: [
        'El templo y las ordenanzas sagradas.',
        'La función de la Sociedad de Socorro en la obra de salvación.',
        'El poder de las mujeres en el evangelio.',
        'Preparación para el templo.'
      ],
      scriptures: ['DyC 25:3-16', 'DyC 84:19-25', 'Alma 13:1-10', 'Éter 12:27']
    },
    '6-12': {
      organization: 'reliefSociety',
      organizationName: 'Sociedad de Socorro',
      timeframe: '6-12',
      goals: [
        'Ser una líder activa en la Sociedad de Socorro.',
        'Mentorear a otras nuevas conversas.',
        'Prepararse para metas a largo plazo (matrimonio en el templo, servicio).',
        'Desarrollar un testimonio sólido del evangelio.'
      ],
      actions: [
        'Asignar como mentora de nuevas conversas.',
        'Incluirla en planificación de actividades de la Sociedad de Socorro.',
        'Ayudarle a establecer metas espirituales a largo plazo.',
        'Prepararle para responsabilidades mayores si está lista.',
        'Revisar progreso y celebrar logros.'
      ],
      callings: [
        'Presidenta de clase (si está preparada).',
        'Especialista en bienestar.',
        'Coordinadora de actividades.',
        'Maestra de doctrina del evangelio.'
      ],
      activities: [
        'Liderazgo en actividades de servicio.',
        'Capacitación para líderes.',
        'Actividades de preparación para el templo.',
        'Actividades de desarrollo personal avanzado.'
      ],
      doctrinalFocus: [
        'El templo y la familia eterna.',
        'Preparación para ordenanzas superiores.',
        'El papel de las mujeres en la obra misional.',
        'Perseverar hasta el fin.'
      ],
      scriptures: ['DyC 84:33-44', 'DyC 88:119', '2 Nefi 31:20', 'Alma 37:33-37']
    }
  },
  youngAdults: {
    '0-3': {
      organization: 'youngAdults',
      organizationName: 'Jóvenes Adultos Solteros (JAS)',
      timeframe: '0-3',
      goals: [
        'Integrarse en la comunidad de JAS.',
        'Desarrollar amistades con otros jóvenes adultos.',
        'Entender su papel como joven adulto en la Iglesia.',
        'Prepararse para metas futuras (misión, educación, carrera).'
      ],
      actions: [
        'Asignar un compañero JAS que lo reciba y acompañe.',
        'Incluirlo en actividades y reuniones de JAS.',
        'Enseñarle sobre oportunidades de servicio y crecimiento.',
        'Invitarle a participar en actividades sociales y espirituales.',
        'Ayudarle a establecer metas personales y espirituales.'
      ],
      callings: [
        'Secretario de JAS (aprendizaje gradual).',
        'Ayudante en actividades.',
        'Compañero de ministerio (con apoyo).',
        'Asistente en organización de eventos.'
      ],
      activities: [
        'Actividades sociales de JAS.',
        'Actividades de servicio.',
        'Actividades deportivas o recreativas.',
        'Devocionales y actividades espirituales.'
      ],
      doctrinalFocus: [
        'El papel de los jóvenes adultos en la Iglesia.',
        'Preparación para el futuro (misión, matrimonio, educación).',
        'El poder de la fe y la oración.',
        'La importancia de las decisiones correctas.'
      ],
      scriptures: ['1 Timoteo 4:12', 'Alma 37:35', 'DyC 88:119', 'Josué 1:9']
    },
    '3-6': {
      organization: 'youngAdults',
      organizationName: 'Jóvenes Adultos Solteros (JAS)',
      timeframe: '3-6',
      goals: [
        'Fortalecer su testimonio del evangelio.',
        'Desarrollar habilidades de liderazgo.',
        'Profundizar en doctrina.',
        'Prepararse para el templo y metas futuras.'
      ],
      actions: [
        'Asignar un llamamiento más significativo si está listo.',
        'Incluirlo en consejos de JAS cuando sea apropiado.',
        'Enseñarle sobre el templo y preparación para ordenanzas.',
        'Ayudarle a entender su papel como líder.',
        'Coordinar con el obispo para recomendación limitada al templo.'
      ],
      callings: [
        'Consejero en presidencia de JAS (si está preparado).',
        'Maestro de clase.',
        'Especialista en actividades.',
        'Líder de grupo de ministerio.'
      ],
      activities: [
        'Viajes al templo con JAS.',
        'Actividades de capacitación en liderazgo.',
        'Proyectos de servicio más complejos.',
        'Actividades de preparación misional (si aplica).'
      ],
      doctrinalFocus: [
        'El templo y las ordenanzas sagradas.',
        'Preparación para la misión (si aplica).',
        'El poder de los jóvenes adultos en la Iglesia.',
        'Preparación para el futuro.'
      ],
      scriptures: ['DyC 4', 'DyC 84:19-25', 'Alma 13:1-10', 'Éter 12:27']
    },
    '6-12': {
      organization: 'youngAdults',
      organizationName: 'Jóvenes Adultos Solteros (JAS)',
      timeframe: '6-12',
      goals: [
        'Ser un líder activo en JAS.',
        'Mentorear a otros nuevos conversos JAS.',
        'Prepararse para metas a largo plazo (misión, matrimonio en el templo).',
        'Desarrollar un testimonio sólido del evangelio.'
      ],
      actions: [
        'Asignar como mentor de nuevos conversos JAS.',
        'Incluirlo en planificación de actividades de JAS.',
        'Ayudarle a establecer metas espirituales a largo plazo.',
        'Prepararle para responsabilidades mayores si está listo.',
        'Revisar progreso y celebrar logros.'
      ],
      callings: [
        'Presidente de JAS (si está preparado).',
        'Especialista en bienestar.',
        'Coordinador de actividades.',
        'Maestro de doctrina del evangelio.'
      ],
      activities: [
        'Liderazgo en actividades de servicio.',
        'Capacitación para líderes.',
        'Actividades de preparación misional (si aplica).',
        'Actividades de preparación para el templo.'
      ],
      doctrinalFocus: [
        'El templo y la familia eterna.',
        'Preparación para la misión (si aplica).',
        'El papel de los jóvenes adultos en la obra misional.',
        'Perseverar hasta el fin.'
      ],
      scriptures: ['DyC 84:33-44', 'DyC 88:119', '2 Nefi 31:20', 'Alma 37:33-37']
    }
  },
  youngMen: {
    '0-3': {
      organization: 'youngMen',
      organizationName: 'Hombres Jóvenes',
      timeframe: '0-3',
      goals: [
        'Recibir el Sacerdocio Aarónico.',
        'Entender el propósito del sacerdocio.',
        'Desarrollar amistades con otros jóvenes.',
        'Aprender sobre el servicio y el liderazgo.'
      ],
      actions: [
        'Entrevista con el obispo para recibir el Sacerdocio Aarónico.',
        'Asignar un compañero joven que lo reciba y acompañe.',
        'Incluirlo en actividades y reuniones de Hombres Jóvenes.',
        'Enseñarle sobre el sacerdocio y cómo usarlo.',
        'Invitarle a participar en actividades de servicio.'
      ],
      callings: [
        'Secretario de quórum (aprendizaje gradual).',
        'Ayudante en actividades.',
        'Compañero de ministerio (con apoyo).',
        'Asistente en organización de eventos.'
      ],
      activities: [
        'Actividades de servicio de Hombres Jóvenes.',
        'Actividades deportivas o recreativas.',
        'Actividades de campamento.',
        'Proyectos de servicio comunitario.'
      ],
      doctrinalFocus: [
        'El Sacerdocio Aarónico y sus deberes.',
        'El papel de los jóvenes en la Iglesia.',
        'Preparación para la misión.',
        'La importancia de las decisiones correctas.'
      ],
      scriptures: ['DyC 13', '1 Timoteo 4:12', 'Alma 37:35', 'Josué 1:9']
    },
    '3-6': {
      organization: 'youngMen',
      organizationName: 'Hombres Jóvenes',
      timeframe: '3-6',
      goals: [
        'Fortalecer su comprensión del sacerdocio.',
        'Desarrollar habilidades de liderazgo.',
        'Profundizar en doctrina.',
        'Prepararse para el templo y la misión.'
      ],
      actions: [
        'Asignar un llamamiento más significativo si está listo.',
        'Incluirlo en consejos de quórum cuando sea apropiado.',
        'Enseñarle sobre el templo y preparación para ordenanzas.',
        'Ayudarle a entender su papel como líder.',
        'Coordinar con el obispo para recomendación limitada al templo.'
      ],
      callings: [
        'Consejero en presidencia de quórum (si está preparado).',
        'Maestro de quórum.',
        'Especialista en actividades.',
        'Líder de grupo de ministerio.'
      ],
      activities: [
        'Viajes al templo con Hombres Jóvenes.',
        'Actividades de capacitación en liderazgo.',
        'Proyectos de servicio más complejos.',
        'Actividades de preparación misional.'
      ],
      doctrinalFocus: [
        'El templo y las ordenanzas sagradas.',
        'Preparación para la misión.',
        'El poder del sacerdocio.',
        'Preparación para el futuro.'
      ],
      scriptures: ['DyC 4', 'DyC 84:19-25', 'Alma 13:1-10', 'Éter 12:27']
    },
    '6-12': {
      organization: 'youngMen',
      organizationName: 'Hombres Jóvenes',
      timeframe: '6-12',
      goals: [
        'Ser un líder activo en Hombres Jóvenes.',
        'Mentorear a otros nuevos conversos jóvenes.',
        'Prepararse para la misión.',
        'Desarrollar un testimonio sólido del evangelio.'
      ],
      actions: [
        'Asignar como mentor de nuevos conversos jóvenes.',
        'Incluirlo en planificación de actividades de Hombres Jóvenes.',
        'Ayudarle a establecer metas espirituales a largo plazo.',
        'Prepararle para responsabilidades mayores si está listo.',
        'Revisar progreso y celebrar logros.'
      ],
      callings: [
        'Presidente de quórum (si está preparado).',
        'Especialista en bienestar.',
        'Coordinador de actividades.',
        'Maestro de doctrina del evangelio.'
      ],
      activities: [
        'Liderazgo en actividades de servicio.',
        'Capacitación para líderes.',
        'Actividades de preparación misional.',
        'Actividades de preparación para el templo.'
      ],
      doctrinalFocus: [
        'El templo y la familia eterna.',
        'Preparación para la misión.',
        'El papel de los jóvenes en la obra misional.',
        'Perseverar hasta el fin.'
      ],
      scriptures: ['DyC 84:33-44', 'DyC 88:119', '2 Nefi 31:20', 'Alma 37:33-37']
    }
  },
  youngWomen: {
    '0-3': {
      organization: 'youngWomen',
      organizationName: 'Mujeres Jóvenes',
      timeframe: '0-3',
      goals: [
        'Sentirse parte de la hermandad de Mujeres Jóvenes.',
        'Entender el propósito de la organización.',
        'Desarrollar amistades con otras jóvenes.',
        'Aprender sobre el servicio y el liderazgo.'
      ],
      actions: [
        'Asignar jóvenes compañeras que la reciban y acompañen.',
        'Incluirla en actividades y reuniones de Mujeres Jóvenes.',
        'Enseñarle sobre la organización y su propósito.',
        'Invitarle a participar en actividades de servicio.',
        'Ayudarle a entender su valor como hija de Dios.'
      ],
      callings: [
        'Secretaria de clase (aprendizaje gradual).',
        'Ayudante en actividades.',
        'Compañera de ministerio (con apoyo).',
        'Asistente en organización de eventos.'
      ],
      activities: [
        'Actividades de servicio de Mujeres Jóvenes.',
        'Actividades deportivas o recreativas.',
        'Actividades de campamento.',
        'Proyectos de servicio comunitario.'
      ],
      doctrinalFocus: [
        'El papel de las jóvenes en la Iglesia.',
        'Preparación para el futuro (misión, educación, matrimonio).',
        'El poder de la fe y la oración.',
        'La importancia de las decisiones correctas.'
      ],
      scriptures: ['1 Timoteo 4:12', 'Alma 37:35', 'DyC 88:119', 'Josué 1:9']
    },
    '3-6': {
      organization: 'youngWomen',
      organizationName: 'Mujeres Jóvenes',
      timeframe: '3-6',
      goals: [
        'Fortalecer su testimonio del evangelio.',
        'Desarrollar habilidades de liderazgo.',
        'Profundizar en doctrina.',
        'Prepararse para el templo y metas futuras.'
      ],
      actions: [
        'Asignar un llamamiento más significativo si está lista.',
        'Incluirla en consejos de clase cuando sea apropiado.',
        'Enseñarle sobre el templo y preparación para ordenanzas.',
        'Ayudarle a entender su papel como líder.',
        'Coordinar con el obispo para recomendación limitada al templo.'
      ],
      callings: [
        'Consejera en presidencia de clase (si está preparada).',
        'Maestra de clase.',
        'Especialista en actividades.',
        'Líder de grupo de ministerio.'
      ],
      activities: [
        'Viajes al templo con Mujeres Jóvenes.',
        'Actividades de capacitación en liderazgo.',
        'Proyectos de servicio más complejos.',
        'Actividades de preparación misional (si aplica).'
      ],
      doctrinalFocus: [
        'El templo y las ordenanzas sagradas.',
        'Preparación para la misión (si aplica).',
        'El poder de las jóvenes en la Iglesia.',
        'Preparación para el futuro.'
      ],
      scriptures: ['DyC 4', 'DyC 84:19-25', 'Alma 13:1-10', 'Éter 12:27']
    },
    '6-12': {
      organization: 'youngWomen',
      organizationName: 'Mujeres Jóvenes',
      timeframe: '6-12',
      goals: [
        'Ser una líder activa en Mujeres Jóvenes.',
        'Mentorear a otras nuevas conversas jóvenes.',
        'Prepararse para metas a largo plazo (misión, matrimonio en el templo).',
        'Desarrollar un testimonio sólido del evangelio.'
      ],
      actions: [
        'Asignar como mentora de nuevas conversas jóvenes.',
        'Incluirla en planificación de actividades de Mujeres Jóvenes.',
        'Ayudarle a establecer metas espirituales a largo plazo.',
        'Prepararle para responsabilidades mayores si está lista.',
        'Revisar progreso y celebrar logros.'
      ],
      callings: [
        'Presidenta de clase (si está preparada).',
        'Especialista en bienestar.',
        'Coordinadora de actividades.',
        'Maestra de doctrina del evangelio.'
      ],
      activities: [
        'Liderazgo en actividades de servicio.',
        'Capacitación para líderes.',
        'Actividades de preparación misional (si aplica).',
        'Actividades de preparación para el templo.'
      ],
      doctrinalFocus: [
        'El templo y la familia eterna.',
        'Preparación para la misión (si aplica).',
        'El papel de las jóvenes en la obra misional.',
        'Perseverar hasta el fin.'
      ],
      scriptures: ['DyC 84:33-44', 'DyC 88:119', '2 Nefi 31:20', 'Alma 37:33-37']
    }
  },
  primary: {
    '0-3': {
      organization: 'primary',
      organizationName: 'Primaria',
      timeframe: '0-3',
      goals: [
        'Sentirse parte de la Primaria.',
        'Entender el propósito de la Primaria.',
        'Desarrollar amistades con otros niños.',
        'Aprender principios básicos del evangelio.'
      ],
      actions: [
        'Asignar compañeros que lo reciban y acompañen.',
        'Incluirlo en clases y actividades de la Primaria.',
        'Enseñarle sobre la Primaria y su propósito.',
        'Invitarle a participar en actividades.',
        'Ayudarle a entender su valor como hijo de Dios.'
      ],
      callings: [],
      activities: [
        'Actividades de la Primaria.',
        'Actividades de servicio.',
        'Actividades recreativas.',
        'Proyectos de servicio comunitario.'
      ],
      doctrinalFocus: [
        'Principios básicos del evangelio.',
        'El papel de los niños en la Iglesia.',
        'El poder de la fe y la oración.',
        'La importancia de las decisiones correctas.'
      ],
      scriptures: ['Mateo 19:14', '3 Nefi 22:13', 'Mosíah 3:19', 'Moroni 10:32']
    },
    '3-6': {
      organization: 'primary',
      organizationName: 'Primaria',
      timeframe: '3-6',
      goals: [
        'Fortalecer su testimonio del evangelio.',
        'Desarrollar habilidades básicas.',
        'Profundizar en doctrina básica.',
        'Prepararse para transición a Hombres Jóvenes/Mujeres Jóvenes.'
      ],
      actions: [
        'Incluirlo en actividades más avanzadas.',
        'Enseñarle sobre el sacerdocio (si es varón).',
        'Ayudarle a entender su papel como miembro.',
        'Prepararle para transición a organizaciones de jóvenes.'
      ],
      callings: [],
      activities: [
        'Actividades de servicio más complejas.',
        'Actividades de preparación para jóvenes.',
        'Proyectos de servicio más avanzados.',
        'Actividades de desarrollo personal.'
      ],
      doctrinalFocus: [
        'Principios más avanzados del evangelio.',
        'Preparación para organizaciones de jóvenes.',
        'El poder del evangelio.',
        'Preparación para el futuro.'
      ],
      scriptures: ['DyC 4', 'Alma 37:35', 'Josué 1:9', '1 Timoteo 4:12']
    },
    '6-12': {
      organization: 'primary',
      organizationName: 'Primaria',
      timeframe: '6-12',
      goals: [
        'Ser un líder activo en la Primaria.',
        'Mentorear a otros nuevos conversos niños.',
        'Prepararse para transición a organizaciones de jóvenes.',
        'Desarrollar un testimonio sólido del evangelio.'
      ],
      actions: [
        'Asignar como mentor de nuevos conversos niños.',
        'Incluirlo en actividades de liderazgo.',
        'Ayudarle a establecer metas espirituales.',
        'Prepararle para transición a organizaciones de jóvenes.',
        'Revisar progreso y celebrar logros.'
      ],
      callings: [],
      activities: [
        'Liderazgo en actividades.',
        'Capacitación para líderes jóvenes.',
        'Actividades de preparación para jóvenes.',
        'Actividades de desarrollo personal avanzado.'
      ],
      doctrinalFocus: [
        'Principios avanzados del evangelio.',
        'Preparación para organizaciones de jóvenes.',
        'El papel de los niños en la Iglesia.',
        'Perseverar hasta el fin.'
      ],
      scriptures: ['DyC 88:119', '2 Nefi 31:20', 'Alma 37:33-37', '1 Timoteo 4:12']
    }
  }
};

