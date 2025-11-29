// src/data/leader/leaderScreensConfig.ts
// Este archivo contiene la configuración de pantallas del modo líder

export const leaderScreensConfig = {
  screens: [
    {
      id: 'LeaderTodayPanel',
      moduleId: 'today_panel',
      title: 'Panel de hoy',
      usesData: ['leaderMode.panelToday.groups', 'leaderMode.panelToday.sampleTasks'],
      layout: 'list_with_groups',
      description:
        'Muestra las tareas más importantes del día agrupadas por tipo: nuevos conversos, amigos y recordatorios generales.',
    },
    {
      id: 'LeaderNewConverts',
      moduleId: 'new_converts',
      title: 'Nuevos conversos (0–12 meses)',
      usesData: [
        'leaderMode.newConverts.fields',
        'leaderMode.newConverts.integrationTimeline',
        'leaderIntegrationExtended.phases',
      ],
      layout: 'card_list_with_timeline',
      description:
        'Lista de nuevos conversos con tarjetas detalladas, chips de estado, nivel de riesgo y próximo paso sugerido, más acceso a un mapa de integración de 12 meses.',
    },
    {
      id: 'LeaderFriendsTeaching',
      moduleId: 'friends_in_teaching',
      title: 'Amigos en enseñanza',
      usesData: [
        'leaderMode.friendsInTeaching.fields',
        'leaderMode.friendsInTeaching.sundaySuggestions',
        'leaderMode.friendsInTeaching.exampleInspiredQuestions',
      ],
      layout: 'card_list_with_actions',
      description:
        'Vista enfocada en amigos en enseñanza: estado, plan para el domingo, preguntas inspiradas y coordinación con misioneros.',
    },
    {
      id: 'LeaderMeetingsResources',
      moduleId: 'meetings_and_resources',
      title: 'Reuniones y recursos',
      usesData: [
        'leaderMode.meetingsAndResources.meetings',
        'leaderMode.meetingsAndResources.quickResources',
        'leaderModeAdditional.extendedMeetings',
        'leaderModeAdditional.extendedResources',
      ],
      layout: 'tabs_meetings_resources',
      description:
        'Pantalla con dos pestañas: plantillas de reuniones (coordinación, consejo de barrio, liderazgo) y recursos rápidos de apoyo doctrinal y práctico.',
    },
    {
      id: 'LeaderIntegrationMap',
      moduleId: 'integration_map',
      title: 'Mapa de integración (12 meses)',
      usesData: ['leaderMode.integrationMap.phases', 'leaderIntegrationExtended.phases'],
      layout: 'timeline_vertical',
      description:
        'Vista visual del primer año: fases, objetivos y acciones sugeridas en Mes 0–1, 1–3, 3–6, 6–12.',
    },
    {
      id: 'LeaderGuidelines',
      moduleId: 'guidelines_and_authority',
      title: 'Directrices y autoridad',
      usesData: [
        'leaderMode.guidelinesAndAuthority',
        'leaderModeAdditional.leaderBehavior',
        'leaderModeAdditional.safeNotesSystem',
      ],
      layout: 'document_sections',
      description:
        'Documento interno que explica bajo qué autoridad se usa el modo líder, principios doctrinales y límites de confidencialidad.',
    },
  ],
} as const;

