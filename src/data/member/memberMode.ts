// src/data/member/memberMode.ts
// Arquitectura base para el modo Miembro (similar a leaderMode)

export type MemberModuleId =
  | 'member_home'
  | 'member_diary'
  | 'member_transfers'
  | 'member_photos'
  | 'member_resources'
  | 'member_missionary_guide'
  | 'member_profile';

export interface MemberModule {
  id: MemberModuleId;
  order: number;
  icon: string;
  title: string;
  subtitle: string;
  routeName: string;
}

export interface MemberHomeSection {
  id: string;
  title: string;
  description: string;
}

export interface MemberModeConfig {
  id: string;
  roleName: string;
  description: string;
  modules: MemberModule[];
  home: {
    heroTitle: string;
    heroSubtitle: string;
    sections: MemberHomeSection[];
  };
  diaryConfig: Record<string, unknown>;
  transfersConfig: Record<string, unknown>;
  photosConfig: Record<string, unknown>;
  resourcesConfig: Record<string, unknown>;
}

export const memberMode: MemberModeConfig = {
  id: 'member_mode',
  roleName: 'Miembro — Diario Misional',
  description:
    'Modo principal para misioneros y miembros que usan Mi Diario Misional: diario, traslados, fotos, recursos y guía misional personalizada.',
  modules: [
    {
      id: 'member_home',
      order: 1,
      icon: 'home-outline',
      title: 'Inicio',
      subtitle: 'Resumen de tu día y tu área',
      routeName: 'MemberHome',
    },
    {
      id: 'member_diary',
      order: 2,
      icon: 'journal-outline',
      title: 'Mi diario',
      subtitle: 'Escribe tus experiencias y testimonios',
      routeName: 'MemberDiary',
    },
    {
      id: 'member_transfers',
      order: 3,
      icon: 'swap-horizontal-outline',
      title: 'Traslados',
      subtitle: 'Registra cada cambio de área y compañero',
      routeName: 'MemberTransfers',
    },
    {
      id: 'member_photos',
      order: 4,
      icon: 'image-outline',
      title: 'Fotos',
      subtitle: 'Galería de tu misión',
      routeName: 'MemberPhotos',
    },
    {
      id: 'member_resources',
      order: 5,
      icon: 'bookmark-outline',
      title: 'Recursos',
      subtitle: 'Guías, discursos y ayudas prácticas',
      routeName: 'MemberResources',
    },
    {
      id: 'member_missionary_guide',
      order: 6,
      icon: 'compass-outline',
      title: 'Missionary Guide',
      subtitle: 'Practica las lecciones y enseña con poder',
      routeName: 'MemberMissionaryGuide',
    },
    {
      id: 'member_profile',
      order: 7,
      icon: 'person-circle-outline',
      title: 'Perfil',
      subtitle: 'Configuración, idioma y rol',
      routeName: 'MemberProfile',
    },
  ],
  home: {
    heroTitle: 'Bienvenido a tu Diario Misional',
    heroSubtitle: 'Registra, recuerda y comparte tu misión con propósito.',
    sections: [
      {
        id: 'today_summary',
        title: 'Resumen de hoy',
        description: 'Revisa tus metas, citas y recordatorios espirituales.',
      },
      {
        id: 'quick_diary',
        title: 'Entrada rápida',
        description: 'Escribe en tu diario en menos de 2 minutos.',
      },
      {
        id: 'missionary_guide_shortcut',
        title: 'Practicar lecciones',
        description: 'Repasa las lecciones antes de salir a enseñar.',
      },
    ],
  },
  diaryConfig: {
    /* PEGA AQUÍ lo que ya definiste para Mi Diario (secciones, categorías, tags, etc.) */
  },
  transfersConfig: {
    /* PEGA AQUÍ la estructura de traslados que ya tienes (ciclos, áreas, compañeros, fechas). */
  },
  photosConfig: {
    /* PEGA AQUÍ configuración de álbum, categorías, etiquetas, etc. */
  },
  resourcesConfig: {
    /* PEGA AQUÍ lista de recursos misionales (discursos, PDFs, tips, etc.). */
  },
} as const;


