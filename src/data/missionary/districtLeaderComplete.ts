// JSON completo del Líder de Distrito según especificación
// Este archivo contiene la estructura completa para reemplazar en leadershipModeEnhanced.ts

export const districtLeaderComplete = {
    id: "districtLeader",
    name: "Líder de Distrito",
    color: "#3B82F6",
    icon: "people-outline",
    summary: "Élder responsable de un distrito (4–8 misioneros) que apoya, entrena y cuida espiritualmente a cada compañerismo.",
    spiritualMotto: "No importa dónde sirvas sino cómo sirvas.",
    coreScriptures: [
        { ref: "DyC 88:77", focus: "Enseñarse el uno al otro la doctrina del reino." },
        { ref: "DyC 121:41–42", focus: "Corregir con persuasión, longanimidad y amor sincero." },
        { ref: "DyC 18:15", focus: "Llevar aun una sola alma a Cristo." }
    ],
    dashboard: {
        heroText: "Sirve a tu distrito como un pastor amoroso, no como un jefe.",
        kpis: [
            {
                id: "weekly_lessons",
                label: "Lecciones semanales por área",
                type: "number" as const,
                description: "Suma de todas las lecciones enseñadas por cada compañerismo del distrito."
            },
            {
                id: "baptismal_dates",
                label: "Personas con fecha bautismal",
                type: "number" as const,
                description: "Cantidad de personas con fecha fija para bautismo dentro del distrito."
            },
            {
                id: "district_attendance",
                label: "Asistencia a la reunión de distrito",
                type: "percentage" as const,
                description: "Porcentaje de misioneros presentes y puntuales en la reunión semanal."
            },
            {
                id: "church_attendance",
                label: "Investigadores en la Iglesia",
                type: "number" as const,
                description: "Personas en enseñanza que asistieron a la reunión sacramental."
            }
        ],
        quickActions: [
            {
                id: "open_district_council",
                label: "Abrir consejo de distrito",
                targetTabId: "district_council"
            },
            {
                id: "plan_exchanges",
                label: "Planear intercambios",
                targetTabId: "exchanges"
            },
            {
                id: "review_baptismal_interviews",
                label: "Revisar entrevistas bautismales",
                targetTabId: "baptismal_interviews"
            }
        ]
    },
    tabs: [
        {
            id: "dashboard",
            title: "Dashboard",
            subtitle: "Visión general de tu distrito.",
            purpose: "Dar un resumen rápido del estado espiritual y prosélito del distrito, con KPIs y acciones clave.",
            icon: "home-outline",
            description: "Resumen del distrito",
            sections: [
                {
                    id: "summary_info",
                    type: "info" as const,
                    title: "Resumen del distrito",
                    bullets: [
                        "Revisa de un vistazo cómo está tu distrito esta semana.",
                        "Usa los indicadores como guía, no como presión.",
                        "Recuerda: cada número representa personas reales."
                    ]
                },
                {
                    id: "kpi_definitions",
                    type: "list" as const,
                    title: "Indicadores principales (KPIs)",
                    fields: [
                        "Lecciones enseñadas en la semana",
                        "Personas con fecha bautismal",
                        "Investigadores que asistieron a la Iglesia",
                        "Investigadores nuevos",
                        "Investigadores en riesgo (dejaron de asistir o perdieron contacto)"
                    ]
                },
                {
                    id: "kpi_status",
                    type: "form" as const,
                    title: "Estado actual del distrito",
                    description: "Registra el estado de tus indicadores para esta semana.",
                    fields: [
                        "Lecciones totales enseñadas",
                        "Personas con fecha",
                        "Investigadores en la Iglesia",
                        "Investigadores nuevos",
                        "Investigadores en riesgo"
                    ]
                },
                {
                    id: "district_scripture_and_motto",
                    type: "template" as const,
                    title: "Escritura y lema de la transferencia",
                    fields: [
                        "Escritura clave de la transferencia",
                        "Frase o lema espiritual del distrito",
                        "Cómo aplicaremos esta escritura en nuestra obra"
                    ]
                },
                {
                    id: "spiritual_health_check",
                    type: "checklist" as const,
                    title: "Salud espiritual del distrito",
                    items: [
                        "Los misioneros cumplen consistentemente con el horario.",
                        "Hay estudio personal y de compañerismo de calidad.",
                        "Los apartamentos están ordenados y limpios.",
                        "Hay buen ánimo general en el distrito.",
                        "Los misioneros oran por las personas en enseñanza por nombre."
                    ]
                },
                {
                    id: "district_vision",
                    type: "journal" as const,
                    title: "Visión para mi distrito",
                    prompts: [
                        "¿Cómo quiero que sea espiritualmente mi distrito al final de esta transferencia?",
                        "¿Qué atributos de Cristo quiero que reflejemos más como equipo?",
                        "¿Qué metas espirituales quiero impulsar (más allá de los números)?"
                    ]
                }
            ]
        },
        {
            id: "district_council",
            title: "Reunión de distrito",
            subtitle: "Planifica y registra el consejo semanal.",
            purpose: "Fortalecer espiritualmente, evaluar progreso real y capacitar al distrito.",
            icon: "people-circle-outline",
            description: "Planifica y registra cada consejo de distrito semanal.",
            sections: [
                {
                    id: "purpose_info",
                    type: "info" as const,
                    title: "Propósito de la reunión",
                    bullets: [
                        "Unir al distrito en visión y fe.",
                        "Revisar metas con nombres, no solo con números.",
                        "Compartir milagros y experiencias espirituales.",
                        "Identificar necesidades reales de personas en enseñanza.",
                        "Capacitar en doctrina y habilidades misionales.",
                        "Fortalecer el ánimo del distrito."
                    ]
                },
                {
                    id: "agenda",
                    type: "template" as const,
                    title: "Agenda sugerida",
                    fields: [
                        "Oración inicial",
                        "Pensamiento espiritual (2–3 minutos)",
                        "Revisión de metas y progreso",
                        "Experiencias espirituales",
                        "Capacitación práctica",
                        "Prácticas (role plays)",
                        "Metas con nombres",
                        "Oración final"
                    ]
                },
                {
                    id: "spiritual_start",
                    type: "template" as const,
                    title: "Inicio espiritual",
                    fields: [
                        "Escritura o cita profética para la reunión",
                        "Idea central del pensamiento espiritual",
                        "Aplicación para el distrito"
                    ]
                },
                {
                    id: "live_reports",
                    type: "form" as const,
                    title: "Progreso con nombres",
                    description: "Registra el estado de personas en enseñanza y áreas del distrito.",
                    fields: [
                        "Personas con fecha bautismal (nombres)",
                        "Personas en riesgo (nombres + motivo)",
                        "Investigadores nuevos",
                        "Investigadores que asistieron a la Iglesia",
                        "Investigadores que progresaron esta semana",
                        "Comentarios pastorales generales"
                    ]
                },
                {
                    id: "experiences",
                    type: "journal" as const,
                    title: "Experiencias espirituales",
                    prompts: [
                        "¿Qué milagro vimos esta semana en el distrito?",
                        "¿Qué oración fue respondida recientemente?",
                        "¿Qué experiencia confirmó nuestra fe mientras servíamos?"
                    ]
                },
                {
                    id: "training",
                    type: "form" as const,
                    title: "Capacitación misional",
                    description: "Capacitación doctrinal o práctica según la necesidad del distrito.",
                    fields: [
                        "Tema de la capacitación",
                        "Escritura o base doctrinal",
                        "Principio doctrinal enseñado",
                        "Habilidad práctica trabajada",
                        "Compromiso que el distrito asume"
                    ]
                },
                {
                    id: "roleplays",
                    type: "form" as const,
                    title: "Prácticas (role plays)",
                    fields: [
                        "Escenario a practicar (ej.: extender fecha bautismal, invitar a la Iglesia, resolver dudas)",
                        "Objetivo espiritual de la práctica",
                        "Puntos fuertes observados",
                        "Aspectos a mejorar",
                        "Compromiso de aplicación en el campo"
                    ]
                },
                {
                    id: "goals",
                    type: "form" as const,
                    title: "Metas con nombres",
                    description: "Metas específicas centradas en personas reales.",
                    fields: [
                        "Personas a enseñar esta semana (nombres)",
                        "Compromisos que se invitarán",
                        "Fechas a fijar o confirmar",
                        "Acciones específicas por área",
                        "Seguimiento planificado para la próxima reunión"
                    ]
                },
                {
                    id: "council_checklist",
                    type: "checklist" as const,
                    title: "Checklist de una buena reunión",
                    items: [
                        "La reunión comenzó con reverencia y enfoque espiritual.",
                        "Se habló de personas, no solo de números.",
                        "Todos los misioneros tuvieron oportunidad de participar.",
                        "Se compartieron experiencias espirituales.",
                        "Hubo una capacitación clara y aplicable.",
                        "Se realizó al menos una práctica (role play).",
                        "Cada área salió con metas concretas.",
                        "Se evitó comparar o avergonzar a los misioneros."
                    ]
                },
                {
                    id: "closing_prayer",
                    type: "template" as const,
                    title: "Oración final",
                    fields: [
                        "Personas específicas por las que se orará",
                        "Misioneros con necesidades especiales",
                        "Unidad y ánimo del distrito"
                    ]
                }
            ]
        },
        {
            id: "exchanges",
            title: "Intercambios",
            subtitle: "Planifica y da seguimiento a los intercambios.",
            purpose: "Usar los intercambios como herramienta de entrenamiento, ánimo y discernimiento espiritual.",
            icon: "swap-horizontal-outline",
            description: "Planifica y evalúa intercambios con cada élder del distrito.",
            meta: {
                entity: "exchange",
                supportsSave: true,
                supportsShare: true,
                supportsComments: false,
                shareTargets: ["missionary_app", "whatsapp", "email"]
            },
            actions: [
                {
                    id: "save_draft",
                    label: "Guardar borrador",
                    kind: "secondary"
                },
                {
                    id: "publish_to_missionary",
                    label: "Publicar al misionero",
                    kind: "primary",
                    target: "missionary_app"
                },
                {
                    id: "export_exchange",
                    label: "Compartir por…",
                    kind: "ghost",
                    shareTemplateId: "exchange_agenda_text"
                }
            ],
            shareTemplates: [
                {
                    id: "exchange_agenda_text",
                    title: "Detalle del intercambio",
                    body: "📌 Intercambio – {{date}} {{time}}\n\nCompañerismo: {{companionshipName}}\nMisionero contigo: {{missionaryName}}\nÁrea: {{area}}\n\nEnfoque principal: {{focus}}\nEscritura/principio: {{scripture}}\n\nMetas del día: {{goals.metasDia}}\nPersonas a visitar: {{goals.personasVisitar}}\nHábito a modelar: {{goals.habitoModelar}}\nIndicador de éxito: {{goals.indicadorExito}}\n\nNos veremos preparados y con fe para aprender juntos. – {{leaderName}}"
                }
            ],
            sections: [
                {
                    id: "exchanges_info",
                    type: "info" as const,
                    title: "Propósito de los intercambios",
                    bullets: [
                        "Entrenar a cada misionero según sus necesidades.",
                        "Compartir buenas prácticas entre áreas.",
                        "Conocer más de cerca el estado espiritual de los misioneros.",
                        "Animar a los que están desanimados o con desafíos."
                    ]
                },
                {
                    id: "exchange_planner",
                    type: "form" as const,
                    title: "Nuevo intercambio",
                    description: "Planificación básica de un intercambio.",
                    fields: [
                        "Compañerismo visitado",
                        "Misionero que estará contigo",
                        "Fecha del intercambio",
                        "Hora del intercambio",
                        "Área donde se realizará",
                        "Enfoque principal (buscar, enseñar, fijar fechas, planificación, obediencia, ánimo)",
                        "Escritura o principio que quieres enfatizar"
                    ]
                },
                {
                    id: "exchange_goals",
                    type: "form" as const,
                    title: "Metas del intercambio",
                    fields: [
                        "Metas específicas para el día (ej.: # de personas contactadas, lecciones, compromisos)",
                        "Personas en enseñanza a visitar durante el intercambio",
                        "Hábito o habilidad que se desea modelar",
                        "Indicador de éxito del intercambio"
                    ]
                },
                {
                    id: "exchange_review",
                    type: "journal" as const,
                    title: "Resumen e impresiones del intercambio",
                    prompts: [
                        "¿Qué dones viste en este misionero/compañerismo?",
                        "¿En qué área necesita más ayuda?",
                        "¿Qué compromiso espiritual establecieron juntos?",
                        "¿Qué impresión te dio el Espíritu sobre cómo apoyarles a futuro?"
                    ]
                },
                {
                    id: "exchange_followup",
                    type: "checklist" as const,
                    title: "Seguimiento del intercambio",
                    items: [
                        "Compartí con el misionero lo que hizo bien.",
                        "Hablamos con amor de lo que puede mejorar.",
                        "Establecimos metas claras para las próximas semanas.",
                        "Envié un breve reporte si era necesario (al líder de zona o presidente).",
                        "Planeé una futura revisión para ver su progreso."
                    ]
                },
                {
                    id: "exchange_history",
                    type: "list" as const,
                    title: "Historial de intercambios (estructura)",
                    fields: [
                        "Fecha",
                        "Área",
                        "Misionero(s) involucrados",
                        "Enfoque principal",
                        "Resultado clave / impresión espiritual"
                    ]
                }
            ]
        },
        {
            id: "baptismal_interviews",
            title: "Entrevistas bautismales",
            subtitle: "Organiza y da seguimiento a las entrevistas.",
            purpose: "Asegurar entrevistas reverentes, ordenadas y centradas en el testimonio y la conversión real.",
            icon: "water-outline",
            description: "Organiza y da seguimiento a las entrevistas bautismales del distrito.",
            meta: {
                entity: "baptismalInterview",
                supportsSave: true,
                supportsShare: true,
                supportsComments: false,
                shareTargets: ["missionary_app", "whatsapp", "email"]
            },
            actions: [
                {
                    id: "save_draft",
                    label: "Guardar borrador",
                    kind: "secondary"
                },
                {
                    id: "publish_to_companionship",
                    label: "Publicar al compañerismo",
                    kind: "primary",
                    target: "missionary_app"
                },
                {
                    id: "export_interview",
                    label: "Compartir por…",
                    kind: "ghost",
                    shareTemplateId: "baptismal_interview_text"
                }
            ],
            shareTemplates: [
                {
                    id: "baptismal_interview_text",
                    title: "Aviso de entrevista bautismal",
                    body: "🕊️ Entrevista bautismal programada\n\nPersona: {{personName}}\nCompañerismo: {{teachingCompanionship}}\nÁrea: {{teachingArea}}\n\nEntrevistador: {{interviewLeaderName}}\nFecha: {{date}} – Hora: {{time}}\nLugar: {{place}}\n\nNotas previas: {{notesBefore.concerns}}\n\nPor favor asegúrense de que llegue puntual, con un miembro de apoyo si es posible, y en un ambiente reverente."
                }
            ],
            sections: [
                {
                    id: "baptismal_info",
                    type: "info" as const,
                    title: "Propósito de la entrevista bautismal",
                    bullets: [
                        "Verificar la dignidad y preparación espiritual de la persona.",
                        "Confirmar su testimonio de Jesucristo y del Evangelio restaurado.",
                        "Asegurar que comprende los convenios que hará.",
                        "Brindar un momento de ministerio personal y amor cristiano."
                    ]
                },
                {
                    id: "interview_planner",
                    type: "form" as const,
                    title: "Nueva entrevista",
                    fields: [
                        "Nombre de la persona",
                        "Compañerismo que enseña",
                        "Área",
                        "Entrevistador (tú, ZL u otro designado)",
                        "Fecha de la entrevista",
                        "Hora de la entrevista",
                        "Lugar de la entrevista"
                    ]
                },
                {
                    id: "pre_notes",
                    type: "form" as const,
                    title: "Información previa",
                    fields: [
                        "Lecciones enseñadas (resumen)",
                        "Preocupaciones o dudas que ha expresado",
                        "Necesidades especiales (idioma, apoyo, situación familiar)"
                    ]
                },
                {
                    id: "interview_guidelines",
                    type: "template" as const,
                    title: "Recordatorios clave",
                    fields: [
                        "Si tú enseñaste a la persona, la entrevista la realiza un líder de zona u otro élder designado.",
                        "Asegura un ambiente reverente, privado y tranquilo.",
                        "Comienza con una breve explicación del propósito de la entrevista.",
                        "Haz preguntas con amor y escucha con atención.",
                        "Si hay dudas serias, consulta al líder de zona o presidente de misión antes de proceder."
                    ]
                },
                {
                    id: "spiritual_check",
                    type: "checklist" as const,
                    title: "Revisión espiritual básica",
                    items: [
                        "Comprende los principios básicos del Evangelio de Jesucristo.",
                        "Entiende el significado del convenio de bautismo.",
                        "Manifiesta deseo de guardar los mandamientos.",
                        "Testifica de Jesucristo.",
                        "Reconoce a José Smith como profeta y la Restauración."
                    ]
                },
                {
                    id: "pastoral_notes",
                    type: "journal" as const,
                    title: "Observaciones pastorales",
                    prompts: [
                        "¿Qué impresión tuviste del testimonio de esta persona?",
                        "¿Qué debe reforzarse antes del bautismo (si hay tiempo)?",
                        "¿Qué debería reforzarse inmediatamente después del bautismo?",
                        "¿Qué riesgo ves si no recibe apoyo constante?"
                    ]
                },
                {
                    id: "interview_history",
                    type: "list" as const,
                    title: "Historial de entrevistas",
                    fields: [
                        "Fecha",
                        "Nombre de la persona",
                        "Área",
                        "Estado (programada, completada, reprogramada)",
                        "Comentario breve"
                    ]
                }
            ]
        },
        {
            id: "personal_notes",
            title: "Notas personales",
            subtitle: "Bitácora privada para impresiones y revelación sobre tu distrito.",
            purpose: "Registrar impresiones del Espíritu y planes para servir mejor a cada misionero.",
            icon: "journal-outline",
            description: "Espacio para registrar impresiones espirituales sobre tu distrito.",
            meta: {
                entity: "personalNote",
                supportsSave: true,
                supportsPromoteToMessage: true
            },
            actions: [
                {
                    id: "promote_to_message",
                    label: "Compartir como mensaje al distrito",
                    kind: "ghost",
                    target: "leader_message"
                }
            ],
            sections: [
                {
                    id: "notes_info",
                    type: "info" as const,
                    title: "Uso de estas notas",
                    bullets: [
                        "Este espacio es privado: úsalo para registrar impresiones espirituales.",
                        "Enfócate en cómo ayudar, no en criticar.",
                        "Revisa estas notas antes de hacer intercambios o correcciones."
                    ]
                },
                {
                    id: "missionary_notes",
                    type: "journal" as const,
                    title: "Notas por misionero",
                    prompts: [
                        "Fortalezas de este misionero:",
                        "Áreas donde necesita apoyo:",
                        "Cómo puedo mostrarle más amor esta semana:",
                        "Invitación espiritual específica que siento hacerle:"
                    ]
                },
                {
                    id: "district_reflections",
                    type: "journal" as const,
                    title: "Reflexiones sobre el distrito",
                    prompts: [
                        "¿Qué desafíos generales enfrenta el distrito ahora mismo?",
                        "¿Qué milagros o avances he visto en el distrito últimamente?",
                        "¿Qué impresión tengo del Señor sobre mi servicio como líder?",
                        "¿Qué debería cambiar, empezar o dejar de hacer como líder de distrito?"
                    ]
                },
                {
                    id: "love_actions_checklist",
                    type: "checklist" as const,
                    title: "Acciones concretas de amor y servicio",
                    items: [
                        "He enviado un mensaje de ánimo a cada área esta semana.",
                        "He orado por cada misionero por nombre.",
                        "He escuchado con paciencia a un misionero que necesitaba desahogarse.",
                        "He reconocido en público algo bueno que hizo un misionero.",
                        "He corregido siempre en privado y con amor."
                    ]
                }
            ]
        },
        {
            id: "zone_messages",
            title: "Mensajes del líder de zona",
            subtitle: "Recibe y aplica la visión y énfasis de la zona.",
            purpose: "Conectar las instrucciones del líder de zona con acciones concretas en el distrito.",
            icon: "chatbubbles-outline",
            description: "Resumen de instrucciones y énfasis de la zona y la misión.",
            sections: [
                {
                    id: "zone_messages_info",
                    type: "info" as const,
                    title: "Rol del líder de zona",
                    bullets: [
                        "Te ayuda a ver el panorama más amplio de la obra.",
                        "Te transmite la visión del presidente de misión.",
                        "Es un apoyo, no un jefe.",
                        "Tu tarea es traducir esa visión a acciones concretas en tu distrito."
                    ]
                },
                {
                    id: "current_zone_focus",
                    type: "template" as const,
                    title: "Énfasis actual de la zona",
                    fields: [
                        "Principio doctrinal principal (ej.: fe, arrepentimiento, uso del Libro de Mormón).",
                        "Meta clave de la zona (ej.: lecciones con miembro, referencias de miembros, asistencia en la Iglesia).",
                        "Indicaciones específicas del líder de zona o del presidente de misión."
                    ]
                },
                {
                    id: "district_action_items",
                    type: "checklist" as const,
                    title: "Acciones para mi distrito",
                    items: [
                        "Expliqué el énfasis de la zona en la reunión de distrito.",
                        "Cada área tiene al menos una meta alineada con la visión de la zona.",
                        "Revisé estas metas a mitad de la semana.",
                        "Envié un breve reporte al líder de zona sobre cómo estamos aplicando el énfasis.",
                        "Compartí al menos un milagro o experiencia de nuestro distrito con la zona."
                    ]
                },
                {
                    id: "zone_communication",
                    type: "journal" as const,
                    title: "Notas de comunicación con el líder de zona",
                    prompts: [
                        "Dudas o temas que necesito aclarar con el líder de zona:",
                        "Situaciones que debo reportar (obediencia, bienestar, emergencias):",
                        "Ideas o sugerencias para mejorar la obra en la zona:",
                        "Milagros o buenas prácticas que podrían edificar a otros distritos:"
                    ]
                },
                {
                    id: "zone_announcements",
                    type: "list" as const,
                    title: "Anuncios vigentes de la zona (estructura)",
                    fields: [
                        "Fecha del anuncio",
                        "Tema",
                        "Acción requerida",
                        "Fecha límite",
                        "Responsable (tú, tu distrito, una área específica)"
                    ]
                }
            ]
        }
    ],
    recommendedHabits: [
        "Llamar o escribir brevemente a cada área a mitad de semana para animarles.",
        "Orar por cada misionero del distrito por nombre todos los días.",
        "Planificar el consejo de distrito con al menos 24 horas de anticipación.",
        "Realizar correcciones siempre en privado y con amor adicional después."
    ]
};

