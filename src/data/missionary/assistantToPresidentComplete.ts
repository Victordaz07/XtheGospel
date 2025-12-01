// JSON completo del Asistente del Presidente según especificación
// Este archivo contiene la estructura completa para reemplazar en leadershipModeEnhanced.ts

export const assistantToPresidentComplete = {
    id: "assistantToPresident",
    name: "Asistente del Presidente",
    color: "#10B981",
    icon: "star-outline",
    summary: "Compañerismo de élderes que apoya directamente al presidente de misión en el liderazgo, entrenamiento y logística de toda la misión.",
    spiritualMotto: "No importa el cargo, sino tu forma de servir.",
    coreScriptures: [
        { ref: "Mosíah 2:17", focus: "Cuando estáis al servicio de vuestros semejantes, solo estáis al servicio de vuestro Dios." },
        { ref: "DyC 84:88", focus: "El Señor va delante de tu faz, estará a tu diestra y a tu siniestra." },
        { ref: "DyC 1:38", focus: "Sea por mi propia voz o por la voz de mis siervos, es lo mismo." }
    ],
    dashboard: {
        heroText: "Sé los ojos y el corazón del presidente en el campo, con humildad y exactitud.",
        kpis: [
            {
                id: "mission_baptisms",
                label: "Bautismos de la misión (transferencia)",
                type: "number" as const,
                description: "Resumen de bautismos y confirmaciones en toda la misión."
            },
            {
                id: "mission_teaching_trend",
                label: "Tendencia de enseñanza",
                type: "trend" as const,
                description: "Evolución de lecciones, personas con fecha y asistencia a la Iglesia por semana."
            },
            {
                id: "zone_health_index",
                label: "Índice de salud de zonas",
                type: "score" as const,
                description: "Percepción combinada de obediencia, ánimo y foco espiritual por zona."
            },
            {
                id: "travel_load",
                label: "Carga de viajes y giras",
                type: "number" as const,
                description: "Número de días fuera de área esta semana para prevenir agotamiento."
            }
        ],
        quickActions: [
            {
                id: "open_leaders_council",
                label: "Consejo de líderes de misión",
                targetTabId: "mission_leaders_council"
            },
            {
                id: "plan_transfers",
                label: "Planear transfers",
                targetTabId: "transfers_planning"
            },
            {
                id: "office_tasks",
                label: "Lista de tareas de oficina",
                targetTabId: "office_admin"
            }
        ]
    },
    tabs: [
        {
            id: "dashboard",
            title: "Dashboard",
            subtitle: "Visión general de la misión.",
            purpose: "Dar un resumen rápido del estado espiritual y prosélito de toda la misión, con KPIs y acciones clave.",
            icon: "home-outline",
            description: "Resumen de la misión",
            sections: [
                {
                    id: "summary_info",
                    type: "info" as const,
                    title: "Resumen de la misión",
                    bullets: [
                        "Visualiza de un vistazo cómo está la misión esta semana.",
                        "Usa los indicadores para inspirar, no para presionar.",
                        "Recuerda: cada número representa personas reales y misioneros reales.",
                        "Tu rol es apoyar al presidente, no reemplazarlo."
                    ]
                },
                {
                    id: "kpi_definitions",
                    type: "list" as const,
                    title: "Indicadores principales (KPIs)",
                    fields: [
                        "Bautismos de la misión (transferencia)",
                        "Tendencia de enseñanza (lecciones, fechas, asistencia)",
                        "Índice de salud de zonas",
                        "Carga de viajes y giras"
                    ]
                },
                {
                    id: "kpi_status",
                    type: "form" as const,
                    title: "Estado actual de la misión",
                    description: "Registra el estado de los indicadores para esta semana.",
                    fields: [
                        "Bautismos totales de la transferencia",
                        "Tendencia de enseñanza (subiendo/bajando/estable)",
                        "Zonas con indicadores preocupantes",
                        "Días de viaje/gira esta semana"
                    ]
                },
                {
                    id: "mission_scripture_and_motto",
                    type: "template" as const,
                    title: "Escritura y lema de la transferencia",
                    fields: [
                        "Escritura clave de la transferencia (según el presidente)",
                        "Lema espiritual de la misión",
                        "Cómo aplicaremos esta escritura en nuestra obra como misión"
                    ]
                },
                {
                    id: "mission_health_check",
                    type: "checklist" as const,
                    title: "Salud espiritual de la misión",
                    items: [
                        "Las zonas cumplen consistentemente con las normas.",
                        "Los líderes de zona realizan sus reuniones semanalmente.",
                        "Los misioneros muestran buen ánimo general.",
                        "No hay problemas graves de obediencia sin atender.",
                        "Se ora por zonas, distritos y misioneros por nombre."
                    ]
                },
                {
                    id: "mission_vision",
                    type: "journal" as const,
                    title: "Visión para la misión",
                    prompts: [
                        "¿Cómo quiero que sea espiritualmente la misión al final de esta transferencia?",
                        "¿Qué atributos de Cristo debe reflejar más nuestra misión?",
                        "¿Qué metas espirituales quiero impulsar además de los números?",
                        "¿Cómo puedo apoyar mejor la visión del presidente?"
                    ]
                }
            ]
        },
        {
            id: "mission_leaders_council",
            title: "Consejo de Líderes",
            subtitle: "Planifica y registra el Consejo de Líderes de la Misión.",
            purpose: "Unir a los líderes en una visión compartida, capacitar y alinear la obra con la dirección del presidente de misión.",
            icon: "podium-outline",
            description: "Planifica y registra cada consejo de líderes de la misión.",
            sections: [
                {
                    id: "council_info",
                    type: "info" as const,
                    title: "Propósito del consejo de líderes",
                    bullets: [
                        "Transmitir la visión del presidente de misión.",
                        "Capacitar a los líderes en doctrina y habilidades misionales.",
                        "Compartir buenas prácticas entre zonas.",
                        "Establecer metas misionales claras y alcanzables.",
                        "Fortalecer la unidad y el ánimo general."
                    ]
                },
                {
                    id: "council_objectives",
                    type: "template" as const,
                    title: "Objetivos del consejo",
                    fields: [
                        "Tema central indicado por el presidente",
                        "Metas misionales para la transferencia",
                        "Problemas clave a tratar (según reportes de zonas)",
                        "Decisiones y acuerdos a comunicar luego a la misión"
                    ]
                },
                {
                    id: "council_agenda",
                    type: "template" as const,
                    title: "Agenda sugerida del consejo",
                    fields: [
                        "Oración inicial",
                        "Mensaje del presidente de misión",
                        "Indicaciones de los asistentes del presidente",
                        "Revisión breve de indicadores de la misión",
                        "Capacitaciones (doctrina + habilidades)",
                        "Prácticas (role plays)",
                        "Metas y compromisos por zona",
                        "Oración final"
                    ]
                },
                {
                    id: "training_blocks",
                    type: "list" as const,
                    title: "Bloques de capacitación",
                    fields: [
                        "Tema",
                        "Orador (presidente, esposa del presidente, AP, líderes de zona)",
                        "Escritura base",
                        "Objetivo de la capacitación",
                        "Aplicación práctica para la misión",
                        "Tiempo estimado por bloque",
                        "Resultados esperados (cambios concretos en la misión)"
                    ]
                },
                {
                    id: "council_notes",
                    type: "journal" as const,
                    title: "Notas del consejo",
                    prompts: [
                        "Puntos clave que se compartieron.",
                        "Impresiones espirituales durante el consejo.",
                        "Compromisos de la misión.",
                        "Acciones específicas que necesito revisar con cada líder de zona."
                    ]
                }
            ]
        },
        {
            id: "transfers_planning",
            title: "Transfers y asignaciones",
            subtitle: "Herramientas para ayudar al presidente a inspirarse en los traslados.",
            purpose: "Apoyar al presidente en la planificación de transfers con información precisa y revelación espiritual.",
            icon: "map-outline",
            description: "Herramientas para ayudar al presidente a inspirarse en los traslados.",
            sections: [
                {
                    id: "transfers_info",
                    type: "info" as const,
                    title: "Propósito de la planificación de transfers",
                    bullets: [
                        "Ayudar al presidente con información precisa sobre cada misionero.",
                        "Recopilar impresiones espirituales de líderes de zona.",
                        "Identificar necesidades de liderazgo y crecimiento.",
                        "Apoyar, no reemplazar, la revelación del presidente."
                    ]
                },
                {
                    id: "zone_feedback",
                    type: "list" as const,
                    title: "Comentarios de líderes de zona",
                    fields: [
                        "Nombre del misionero",
                        "Zona / distrito actual",
                        "Fortalezas",
                        "Desafíos",
                        "Recomendación de futuro (entrenador, líder de distrito, cambio de área, etc.)"
                    ]
                },
                {
                    id: "transfer_inspiration_journal",
                    type: "journal" as const,
                    title: "Impresiones espirituales sobre transfers",
                    prompts: [
                        "¿Qué sientes que el Señor quiere para este misionero en la próxima transferencia?",
                        "¿Hay combinaciones de compañeros que deban evitarse por prudencia?",
                        "¿Quiénes están listos para asumir nuevos liderazgos?",
                        "¿Qué zonas requieren refuerzos específicos?",
                        "¿Qué impresiones recibí durante la oración sobre los transfers?"
                    ]
                },
                {
                    id: "transfer_followup",
                    type: "checklist" as const,
                    title: "Seguimiento de transfers",
                    items: [
                        "Recopilé información de todos los líderes de zona sobre sus misioneros.",
                        "Revisé las necesidades de liderazgo en cada zona.",
                        "Compartí mis impresiones con el presidente de manera clara y humilde.",
                        "Respeté la autoridad del presidente en las decisiones finales.",
                        "Preparé la logística necesaria para los transfers."
                    ]
                }
            ]
        },
        {
            id: "office_admin",
            title: "Oficina y administración",
            subtitle: "Checklist diario de comunicación, datos y logística de la misión.",
            purpose: "Mantener la misión en orden temporal y espiritual, sin perder el enfoque en las personas.",
            icon: "briefcase-outline",
            description: "Checklist diario de comunicación, datos y logística de la misión.",
            sections: [
                {
                    id: "admin_info",
                    type: "info" as const,
                    title: "Rol administrativo del asistente",
                    bullets: [
                        "Ayudar al presidente a ver el estado de la misión.",
                        "Asegurar el uso correcto de tecnología y recursos.",
                        "Detectar riesgos y actuar rápido.",
                        "Coordinar logística sin perder el enfoque espiritual."
                    ]
                },
                {
                    id: "daily_office_checklist",
                    type: "checklist" as const,
                    title: "Rutina diaria en la oficina",
                    items: [
                        "Revisión de correos / mensajes del presidente",
                        "Actualización de indicadores semanales (o diarios) de la misión",
                        "Preparar y enviar comunicados a la misión según instrucciones",
                        "Coordinar viajes, recogidas y alojamientos necesarios",
                        "Verificar stock de materiales misionales y coordinar reposición",
                        "Revisar reportes de zonas y distritos",
                        "Atender emergencias o situaciones urgentes"
                    ]
                },
                {
                    id: "mission_wide_messages",
                    type: "template" as const,
                    title: "Mensajes a toda la misión",
                    fields: [
                        "Tema doctrinal o regla específica a recalcar",
                        "Contexto (por qué se envía este mensaje)",
                        "Instrucciones concretas (qué deben hacer los misioneros)",
                        "Fecha límite o próximos pasos",
                        "Promesa espiritual relacionada"
                    ]
                },
                {
                    id: "resource_management",
                    type: "form" as const,
                    title: "Gestión de recursos",
                    fields: [
                        "Materiales misionales necesarios",
                        "Vehículos y mantenimiento",
                        "Alojamientos y departamentos",
                        "Presupuesto y gastos",
                        "Necesidades especiales de zonas"
                    ]
                }
            ]
        },
        {
            id: "field_tours",
            title: "Giras e intercambios",
            subtitle: "Planifica giras por zonas para entrenar y animar a los misioneros.",
            purpose: "Usar las giras para levantar, entrenar y discernir las necesidades de la misión.",
            icon: "airplane-outline",
            description: "Planifica giras por zonas para entrenar y animar a los misioneros.",
            sections: [
                {
                    id: "tours_info",
                    type: "info" as const,
                    title: "Propósito de las giras",
                    bullets: [
                        "Entrenar líderes de zona y misioneros clave.",
                        "Ayudar en zonas con desafíos especiales.",
                        "Modelar obediencia, planificación y enseñanza eficaz.",
                        "Detectar problemas de ánimo, obediencia o coordinación.",
                        "Transmitir la visión del presidente directamente."
                    ]
                },
                {
                    id: "tour_planner",
                    type: "list" as const,
                    title: "Plan de gira",
                    fields: [
                        "Zona a visitar",
                        "Fechas",
                        "Enfoque doctrinal y práctico",
                        "Zonas / misioneros prioritarios a ver",
                        "Metas de la gira (espirituales y operativas)"
                    ]
                },
                {
                    id: "tour_detail",
                    type: "form" as const,
                    title: "Detalles de una gira",
                    fields: [
                        "Zona visitada",
                        "Líderes de zona y misioneros con los que trabajaste",
                        "Objetivo de la gira",
                        "Personas clave visitadas",
                        "Milagros o experiencias relevantes"
                    ]
                },
                {
                    id: "seed_planting_journal",
                    type: "journal" as const,
                    title: "Semillas plantadas",
                    prompts: [
                        "¿Qué mensajes clave compartimos en esta zona?",
                        "¿Qué testimonios y promesas sentimos inspirar?",
                        "¿A quién vimos especialmente necesitado de ánimo?",
                        "¿Qué seguimiento debemos coordinar con el líder de zona?",
                        "¿Qué impresiones recibí del Espíritu sobre esta zona?"
                    ]
                },
                {
                    id: "tour_followup",
                    type: "checklist" as const,
                    title: "Seguimiento de la gira",
                    items: [
                        "Compartí con el líder de zona lo que está haciendo bien.",
                        "Hablamos de formas específicas de mejorar.",
                        "Fijamos metas claras para su zona.",
                        "Anoté impresiones que debo compartir con el presidente.",
                        "Planifiqué una revisión futura para ver su progreso."
                    ]
                }
            ]
        },
        {
            id: "ap_companionship",
            title: "Compañerismo AP",
            subtitle: "Espacio para cuidar la unidad y la salud espiritual del compañerismo de asistentes.",
            purpose: "Mantener un compañerismo fuerte y unificado como modelo para toda la misión.",
            icon: "heart-outline",
            description: "Espacio para cuidar la unidad y la salud espiritual del compañerismo de asistentes.",
            sections: [
                {
                    id: "companionship_info",
                    type: "info" as const,
                    title: "Importancia del compañerismo AP",
                    bullets: [
                        "Tu compañerismo es un modelo para toda la misión.",
                        "La unidad entre APs fortalece toda la misión.",
                        "Cuidar tu compañerismo te permite servir mejor.",
                        "El presidente cuenta con un compañerismo unificado."
                    ]
                },
                {
                    id: "companionship_inventory",
                    type: "journal" as const,
                    title: "Inventario regular de compañerismo",
                    prompts: [
                        "¿En qué nos estamos comunicando bien y en qué no?",
                        "¿Hay alguna molestia que no hayamos hablado todavía?",
                        "¿Qué admiramos del otro esta semana?",
                        "¿Qué meta espiritual queremos fijar como compañerismo?",
                        "¿Cómo podemos servir mejor juntos al presidente y a la misión?"
                    ]
                },
                {
                    id: "rest_and_balance",
                    type: "checklist" as const,
                    title: "Equilibrio y cuidado personal",
                    items: [
                        "Dormimos lo suficiente al menos 5 noches esta semana",
                        "Tuvimos al menos un momento breve de recreación permitida el día de preparación",
                        "No dejamos que las tareas administrativas reemplazaran por completo nuestro estudio personal",
                        "Pedimos ayuda al presidente cuando la carga se sintió demasiado pesada",
                        "Mantenemos nuestro tiempo de estudio personal y de compañerismo",
                        "Cuidamos nuestra salud física y espiritual"
                    ]
                },
                {
                    id: "companionship_goals",
                    type: "template" as const,
                    title: "Metas del compañerismo",
                    fields: [
                        "Meta espiritual para esta transferencia",
                        "Cómo nos apoyaremos mutuamente",
                        "Compromisos específicos de unidad",
                        "Cómo modelaremos para la misión"
                    ]
                }
            ]
        },
        {
            id: "president_support",
            title: "Apoyo al Presidente",
            subtitle: "Herramientas para servir eficazmente al presidente de misión.",
            purpose: "Ser un apoyo fiel y eficaz para el presidente en todas sus responsabilidades.",
            icon: "hand-right-outline",
            description: "Herramientas para servir eficazmente al presidente de misión.",
            sections: [
                {
                    id: "support_info",
                    type: "info" as const,
                    title: "Rol de apoyo al presidente",
                    bullets: [
                        "Tu rol es apoyar, no reemplazar al presidente.",
                        "Sé honesto y leal en todas tus comunicaciones.",
                        "Anticípate a las necesidades del presidente.",
                        "Mantén la confidencialidad en todo momento."
                    ]
                },
                {
                    id: "daily_support_checklist",
                    type: "checklist" as const,
                    title: "Checklist diario de apoyo",
                    items: [
                        "Revisé los mensajes y correos del presidente",
                        "Preparé la información que necesita para decisiones",
                        "Anticipé necesidades logísticas o administrativas",
                        "Compartí información relevante de manera clara y concisa",
                        "Mantuve la confidencialidad en todo momento"
                    ]
                },
                {
                    id: "president_communication",
                    type: "journal" as const,
                    title: "Comunicación con el presidente",
                    prompts: [
                        "¿Qué información importante debo compartir con el presidente hoy?",
                        "¿Hay situaciones que requieren su atención inmediata?",
                        "¿Cómo puedo apoyar mejor su visión esta semana?",
                        "¿Qué impresiones espirituales recibí que debo compartir?",
                        "¿Hay algo que necesito aclarar o pedirle?"
                    ]
                }
            ]
        }
    ],
    recommendedHabits: [
        "Buscar cada mañana la guía del Señor específicamente para la misión entera.",
        "Hablar con el presidente con absoluta honestidad y lealtad.",
        "Nunca usar el cargo para mandar, solo para servir.",
        "Cuidar la amistad y unidad con tu compañero asistente como modelo para toda la misión.",
        "Mantener el equilibrio entre trabajo administrativo y trabajo en el campo.",
        "Orar diariamente por el presidente, su familia y toda la misión."
    ]
};

