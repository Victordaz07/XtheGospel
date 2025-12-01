// JSON completo del Líder de Zona según especificación
// Este archivo contiene la estructura completa para reemplazar en leadershipModeEnhanced.ts

export const zoneLeaderComplete = {
    id: "zoneLeader",
    name: "Líder de Zona",
    color: "#F59E0B",
    icon: "ribbon-outline",
    summary: "Herramientas para dirigir, entrenar y cuidar espiritualmente a toda la zona.",
    spiritualMotto: "El que quiera ser el mayor, sea vuestro servidor.",
    coreScriptures: [
        { ref: "DyC 107:99", focus: "Aprender su deber y cumplirlo en toda diligencia." },
        { ref: "DyC 121:36–37", focus: "Los poderes del cielo solo se manejan con justicia y mansedumbre." },
        { ref: "Mateo 20:26–27", focus: "Liderar sirviendo como Jesucristo." }
    ],
    dashboard: {
        heroText: "Inspira visión y unidad en toda tu zona, empezando por tu propio ejemplo.",
        kpis: [
            {
                id: "weekly_lessons",
                label: "Lecciones enseñadas en la semana",
                type: "number" as const,
                description: "Total de lecciones enseñadas en toda la zona."
            },
            {
                id: "lessons_with_member",
                label: "Lecciones con miembro presente",
                type: "number" as const,
                description: "Lecciones enseñadas con un miembro de la Iglesia presente."
            },
            {
                id: "baptismal_dates",
                label: "Personas con fecha bautismal",
                type: "number" as const,
                description: "Cantidad de personas con fecha fija para bautismo en la zona."
            },
            {
                id: "church_attendance",
                label: "Investigadores que asistieron a la Iglesia",
                type: "number" as const,
                description: "Personas en enseñanza que asistieron a la reunión sacramental."
            },
            {
                id: "new_investigators",
                label: "Investigadores nuevos",
                type: "number" as const,
                description: "Nuevos investigadores encontrados esta semana."
            },
            {
                id: "districts_with_goals",
                label: "Distritos con metas claras y activas",
                type: "number" as const,
                description: "Número de distritos que tienen metas claras y están trabajando activamente."
            }
        ],
        quickActions: [
            {
                id: "open_zone_council",
                label: "Abrir consejo de zona",
                targetTabId: "zone_council"
            },
            {
                id: "plan_zone_exchanges",
                label: "Planear intercambios de zona",
                targetTabId: "zone_exchanges"
            },
            {
                id: "review_zone_reports",
                label: "Revisar reportes de zona",
                targetTabId: "zone_reports"
            }
        ]
    },
    tabs: [
        {
            id: "dashboard",
            title: "Dashboard",
            subtitle: "Visión general de tu zona.",
            purpose: "Dar un resumen rápido del estado espiritual y prosélito de la zona, con KPIs y acciones clave.",
            icon: "home-outline",
            description: "Resumen de la zona",
            sections: [
                {
                    id: "summary_info",
                    type: "info" as const,
                    title: "Resumen de la zona",
                    bullets: [
                        "Visualiza de un vistazo cómo está tu zona esta semana.",
                        "Usa los indicadores para inspirar, no para presionar.",
                        "Recuerda: cada número representa personas reales y misioneros reales."
                    ]
                },
                {
                    id: "kpi_definitions",
                    type: "list" as const,
                    title: "Indicadores principales (KPIs)",
                    fields: [
                        "Lecciones enseñadas en la semana",
                        "Lecciones con miembro presente",
                        "Personas con fecha bautismal",
                        "Investigadores que asistieron a la Iglesia",
                        "Investigadores nuevos",
                        "Distritos con metas claras y activas"
                    ]
                },
                {
                    id: "kpi_status",
                    type: "form" as const,
                    title: "Estado actual de la zona",
                    description: "Registra el estado de tus indicadores para esta semana.",
                    fields: [
                        "Lecciones totales enseñadas en la zona",
                        "Lecciones con miembro presente",
                        "Personas con fecha bautismal",
                        "Investigadores en la Iglesia",
                        "Investigadores nuevos",
                        "Distritos con indicadores preocupantes"
                    ]
                },
                {
                    id: "zone_scripture_and_motto",
                    type: "template" as const,
                    title: "Escritura y lema de la zona",
                    fields: [
                        "Escritura clave de la transferencia",
                        "Lema espiritual de la zona",
                        "Cómo aplicaremos esta escritura en nuestra obra como zona"
                    ]
                },
                {
                    id: "zone_health_check",
                    type: "checklist" as const,
                    title: "Salud espiritual de la zona",
                    items: [
                        "Los distritos cumplen consistentemente con el horario.",
                        "Los líderes de distrito realizan sus reuniones semanalmente.",
                        "Los misioneros muestran buen ánimo general.",
                        "No hay problemas graves de obediencia sin atender.",
                        "Se ora por zonas, distritos y misioneros por nombre."
                    ]
                },
                {
                    id: "zone_vision",
                    type: "journal" as const,
                    title: "Visión para mi zona",
                    prompts: [
                        "¿Cómo quiero que sea espiritualmente mi zona al final de esta transferencia?",
                        "¿Qué atributos de Cristo debe reflejar más nuestra zona?",
                        "¿Qué metas espirituales quiero impulsar además de los números?",
                        "¿Qué legado quiero dejar en esta zona cuando ya no sea líder?"
                    ]
                }
            ]
        },
        {
            id: "zone_council",
            title: "Consejo / Reunión de zona",
            subtitle: "Planifica y registra los consejos de zona.",
            purpose: "Unir a la zona en una visión compartida, capacitar y alinear la obra con la dirección del presidente de misión.",
            icon: "people-circle-outline",
            description: "Planifica y registra cada consejo de zona.",
            sections: [
                {
                    id: "council_info",
                    type: "info" as const,
                    title: "Propósito del consejo de zona",
                    bullets: [
                        "Transmitir la visión del presidente de misión.",
                        "Capacitar a la zona en doctrina y habilidades misionales.",
                        "Compartir buenas prácticas entre distritos.",
                        "Establecer metas de zona claras y alcanzables.",
                        "Fortalecer la unidad y el ánimo general."
                    ]
                },
                {
                    id: "zone_vision",
                    type: "template" as const,
                    title: "Visión de la zona (transferencia)",
                    fields: [
                        "Declaración de propósito de la zona",
                        "Meta principal de la zona (bautismos / convenios / indicadores)",
                        "Promesa espiritual asociada",
                        "Cómo se comunicará esta visión a toda la zona"
                    ]
                },
                {
                    id: "council_agenda",
                    type: "template" as const,
                    title: "Agenda sugerida del consejo",
                    fields: [
                        "Oración inicial",
                        "Mensaje del presidente de misión (si aplica)",
                        "Indicaciones de los asistentes del presidente",
                        "Revisión breve de indicadores de la zona",
                        "Capacitaciones (doctrina + habilidades)",
                        "Prácticas (role plays)",
                        "Metas y compromisos por distrito",
                        "Oración final"
                    ]
                },
                {
                    id: "trainings",
                    type: "list" as const,
                    title: "Bloques de capacitación",
                    fields: [
                        "Tema",
                        "Orador (ZL, AP, Pdte, otros)",
                        "Escritura base",
                        "Objetivo de la capacitación",
                        "Aplicación práctica para la zona"
                    ]
                },
                {
                    id: "council_notes",
                    type: "journal" as const,
                    title: "Notas del consejo",
                    prompts: [
                        "Puntos clave que se compartieron.",
                        "Impresiones espirituales durante el consejo.",
                        "Compromisos de la zona.",
                        "Acciones específicas que necesito revisar con cada líder de distrito."
                    ]
                }
            ]
        },
        {
            id: "zone_exchanges",
            title: "Intercambios de zona",
            subtitle: "Planifica giras e intercambios como líder de zona.",
            purpose: "Usar los intercambios para levantar, entrenar y discernir las necesidades de la zona.",
            icon: "swap-horizontal-outline",
            description: "Planifica y evalúa intercambios con líderes de distrito y misioneros clave.",
            sections: [
                {
                    id: "exchanges_info",
                    type: "info" as const,
                    title: "Propósito de los intercambios de zona",
                    bullets: [
                        "Entrenar líderes de distrito y misioneros clave.",
                        "Ayudar en áreas con desafíos especiales.",
                        "Modelar obediencia, planificación y enseñanza eficaz.",
                        "Detectar problemas de ánimo, obediencia o coordinación."
                    ]
                },
                {
                    id: "exchange_plan",
                    type: "list" as const,
                    title: "Plan maestro de intercambios",
                    fields: [
                        "Distrito / área",
                        "Misioneros involucrados",
                        "Fecha",
                        "Enfoque principal (doctrina, encontrar, enseñar, planificación, obediencia, ánimo)",
                        "Resultado deseado"
                    ]
                },
                {
                    id: "exchange_detail",
                    type: "form" as const,
                    title: "Detalles de un intercambio",
                    fields: [
                        "Área visitada",
                        "Misionero con el que trabajaste",
                        "Objetivo del intercambio",
                        "Personas clave visitadas",
                        "Milagros o experiencias relevantes"
                    ]
                },
                {
                    id: "leader_care",
                    type: "journal" as const,
                    title: "Cuidar a los líderes de distrito",
                    prompts: [
                        "¿Qué desafíos enfrenta este líder de distrito?",
                        "¿Qué consejo espiritual le di?",
                        "¿Qué compromiso fijamos juntos?",
                        "¿Cómo puedo reforzarle durante la semana?"
                    ]
                },
                {
                    id: "exchange_followup",
                    type: "checklist" as const,
                    title: "Seguimiento del intercambio",
                    items: [
                        "Compartí con el líder de distrito lo que está haciendo bien.",
                        "Hablamos de formas específicas de mejorar.",
                        "Fijamos metas claras para su distrito.",
                        "Anoté impresiones que debo compartir con los AP o el presidente si es necesario.",
                        "Planifiqué una revisión futura para ver su progreso."
                    ]
                }
            ]
        },
        {
            id: "zone_reports",
            title: "Reportes y normas",
            subtitle: "Supervisa datos, normas especiales y uso de recursos.",
            purpose: "Mantener la zona en orden temporal y espiritual, sin perder el enfoque en las personas.",
            icon: "clipboard-outline",
            description: "Supervisa datos, normas especiales y uso de recursos de la zona.",
            sections: [
                {
                    id: "reports_info",
                    type: "info" as const,
                    title: "Rol administrativo del líder de zona",
                    bullets: [
                        "Ayudar al presidente a ver el estado de la zona.",
                        "Asegurar el uso correcto de tecnología y recursos.",
                        "Detectar riesgos y actuar rápido.",
                        "Apoyar a los líderes locales (estaca y barrios)."
                    ]
                },
                {
                    id: "weekly_zone_review",
                    type: "checklist" as const,
                    title: "Revisión semanal de la zona",
                    items: [
                        "Carpetas de área o registros digitales al día.",
                        "Uso correcto de dispositivos y redes sociales según la misión.",
                        "Departamentos limpios y cuidados.",
                        "Fondos sagrados usados correctamente.",
                        "Respeto absoluto en interacciones entre élderes y hermanas.",
                        "Cualquier emergencia fue reportada a tiempo."
                    ]
                },
                {
                    id: "problem_areas",
                    type: "form" as const,
                    title: "Áreas de atención especial",
                    fields: [
                        "Área o distrito",
                        "Tipo de problema (obediencia, ánimo, salud, seguridad, progreso bajo)",
                        "Detalles",
                        "Acciones tomadas",
                        "Necesita escalarse a AP / presidente (sí/no)"
                    ]
                },
                {
                    id: "stake_coordination",
                    type: "form" as const,
                    title: "Coordinación con la estaca",
                    fields: [
                        "Estaca / líder local contactado",
                        "Reuniones de coordinación realizadas",
                        "Iniciativas conjuntas (actividades, ferias, etc.)",
                        "Compromisos asumidos por la estaca",
                        "Seguimiento pendiente"
                    ]
                }
            ]
        },
        {
            id: "zone_communication",
            title: "Comunicación",
            subtitle: "Comunica la visión, noticias y ánimo a toda la zona.",
            purpose: "Mantener a la zona alineada, informada e inspirada.",
            icon: "chatbubbles-outline",
            description: "Comunica la visión, noticias y ánimo a toda la zona.",
            sections: [
                {
                    id: "communication_info",
                    type: "info" as const,
                    title: "Principios de comunicación como ZL",
                    bullets: [
                        "Ser claro, breve y espiritual.",
                        "Evitar mensajes que solo sean presión numérica.",
                        "Compartir historias y milagros, no solo indicadores.",
                        "Recordar siempre el propósito: invitar a otros a venir a Cristo."
                    ]
                },
                {
                    id: "weekly_zone_message",
                    type: "form" as const,
                    title: "Mensaje semanal a la zona",
                    fields: [
                        "Tema doctrinal principal",
                        "Milagro o historia para compartir",
                        "Meta concreta de la semana (zona)",
                        "Invitación espiritual a toda la zona",
                        "Escritura o cita profética de apoyo"
                    ]
                },
                {
                    id: "district_followup",
                    type: "checklist" as const,
                    title: "Checklist de seguimiento con los distritos",
                    items: [
                        "Verifiqué que cada líder de distrito entendió el mensaje de la semana.",
                        "Pregunté cómo lo aplicarán en su distrito.",
                        "Recibí al menos un milagro o buena noticia de cada distrito.",
                        "Atendí dudas o inquietudes que surgieron.",
                        "Compartí los mejores ejemplos con toda la zona (respetando la privacidad)."
                    ]
                },
                {
                    id: "zone_notes",
                    type: "journal" as const,
                    title: "Notas de comunicación y ánimo",
                    prompts: [
                        "¿Qué tono estoy transmitiendo a mi zona: miedo o fe?",
                        "¿Qué tipo de mensajes han levantado más el ánimo últimamente?",
                        "¿Quién en la zona necesita un mensaje personal de aliento esta semana?",
                        "¿Qué debo comunicar a los AP o al presidente sobre el estado de la zona?"
                    ]
                }
            ]
        }
    ],
    recommendedHabits: [
        "Orar diariamente por cada distrito y por tu compañero líder de zona.",
        "Revisar indicadores de la zona con ojos espirituales, no solo administrativos.",
        "Visitar regularmente a los misioneros más débiles o desanimados.",
        "Modelar obediencia exacta y buena actitud aun cuando las metas sean exigentes."
    ]
};

