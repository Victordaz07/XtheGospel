/**
 * Training Paths (Member App)
 * STRICT NODE IDS: core-foundations, priesthood (paths)
 * Tracks: aaronic-deacon, aaronic-teacher, aaronic-priest, melchizedek-elder, melchizedek-high-priest
 * NO calling-based path/node. Teaser card only in dashboard.
 */

import type { TrainingPath, TrainingTrack, TrainingLesson } from '../types/training';

// ═══════════════════════════════════════════════════════════════
// PATHS
// ═══════════════════════════════════════════════════════════════

export const paths: TrainingPath[] = [
  {
    id: 'core-foundations',
    title: 'Fundamentos Básicos',
    description: 'Preparación esencial para el sacerdocio',
    category: 'core',
    trackIds: [],
  },
  {
    id: 'priesthood',
    title: 'Capacitación del Sacerdocio',
    description: 'Aarónico y Melquisedec',
    category: 'priesthood',
    trackIds: [
      'aaronic-deacon',
      'aaronic-teacher',
      'aaronic-priest',
      'melchizedek-elder',
      'melchizedek-high-priest',
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// TRACKS
// ═══════════════════════════════════════════════════════════════

export const tracksById: Record<string, TrainingTrack> = {
  'aaronic-deacon': {
    id: 'aaronic-deacon',
    pathId: 'priesthood',
    title: 'Diácono',
    description: 'Oficio del Sacerdocio Aarónico',
    priesthoodOffice: 'deacon',
    lessonIds: ['deacon-1', 'deacon-2'],
  },
  'aaronic-teacher': {
    id: 'aaronic-teacher',
    pathId: 'priesthood',
    title: 'Maestro',
    description: 'Oficio del Sacerdocio Aarónico',
    priesthoodOffice: 'teacher',
    lessonIds: ['teacher-1', 'teacher-2'],
  },
  'aaronic-priest': {
    id: 'aaronic-priest',
    pathId: 'priesthood',
    title: 'Presbítero',
    description: 'Oficio del Sacerdocio Aarónico',
    priesthoodOffice: 'priest',
    lessonIds: ['priest-1', 'priest-2'],
  },
  'melchizedek-elder': {
    id: 'melchizedek-elder',
    pathId: 'priesthood',
    title: 'Elder',
    description: 'Oficio del Sacerdocio de Melquisedec',
    priesthoodOffice: 'elder',
    lessonIds: ['elder-1', 'elder-2'],
  },
  'melchizedek-high-priest': {
    id: 'melchizedek-high-priest',
    pathId: 'priesthood',
    title: 'Sumo Sacerdote',
    description: 'Oficio del Sacerdocio de Melquisedec',
    priesthoodOffice: 'high_priest',
    lessonIds: ['high-priest-1', 'high-priest-2'],
  },
};

// ═══════════════════════════════════════════════════════════════
// LESSONS
// ═══════════════════════════════════════════════════════════════

const coreLessons: TrainingLesson[] = [
  {
    id: 'core-1',
    title: 'La Restauración del Evangelio',
    nodeId: 'core-foundations',
    order: 1,
    estimatedMinutes: 15,
    tags: ['restoration'],
  },
  {
    id: 'core-2',
    title: 'El Plan de Salvación',
    nodeId: 'core-foundations',
    order: 2,
    estimatedMinutes: 15,
    tags: ['plan'],
  },
  {
    id: 'core-3',
    title: 'El Sacerdocio',
    nodeId: 'core-foundations',
    order: 3,
    estimatedMinutes: 12,
    tags: ['priesthood'],
  },
  {
    id: 'core-4',
    title: 'Preparación para las Ordenanzas',
    nodeId: 'core-foundations',
    order: 4,
    estimatedMinutes: 10,
    tags: ['ordinances'],
  },
];

const trackLessons: TrainingLesson[] = [
  { id: 'deacon-1', title: 'Lección 1: Deberes del Diácono', nodeId: 'aaronic-deacon', order: 1, estimatedMinutes: 10 },
  { id: 'deacon-2', title: 'Lección 2: Servicio como Diácono', nodeId: 'aaronic-deacon', order: 2, estimatedMinutes: 10 },
  { id: 'teacher-1', title: 'Lección 1: Deberes del Maestro', nodeId: 'aaronic-teacher', order: 1, estimatedMinutes: 10 },
  { id: 'teacher-2', title: 'Servicio y reverencia como Maestro', nodeId: 'aaronic-teacher', order: 2, estimatedMinutes: 10 },
  { id: 'priest-1', title: 'Deberes del Presbítero: ordenanzas y dignidad', nodeId: 'aaronic-priest', order: 1, estimatedMinutes: 10 },
  { id: 'priest-2', title: 'Servicio pastoral: bautismos, confirmaciones y cuidado espiritual', nodeId: 'aaronic-priest', order: 2, estimatedMinutes: 10 },
  { id: 'elder-1', title: 'Deberes del Elder: ministrar y bendecir', nodeId: 'melchizedek-elder', order: 1, estimatedMinutes: 12 },
  { id: 'elder-2', title: 'Liderazgo servicial y cuidado espiritual', nodeId: 'melchizedek-elder', order: 2, estimatedMinutes: 12 },
  { id: 'high-priest-1', title: 'Deberes del Sumo Sacerdote: presidencia y llaves', nodeId: 'melchizedek-high-priest', order: 1, estimatedMinutes: 12 },
  { id: 'high-priest-2', title: 'Cuidado del rebaño: consejo, unidad y pureza de motivos', nodeId: 'melchizedek-high-priest', order: 2, estimatedMinutes: 12 },
];

export const lessonsById: Record<string, TrainingLesson> = [...coreLessons, ...trackLessons].reduce(
  (acc, lesson) => {
    acc[lesson.id] = lesson;
    return acc;
  },
  {} as Record<string, TrainingLesson>
);

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

export type TrainingNode = TrainingPath | TrainingTrack;

export function getNodeById(nodeId: string): TrainingNode | null {
  const path = paths.find((p) => p.id === nodeId);
  if (path) return path;
  const track = tracksById[nodeId];
  return track ?? null;
}

export function getLessonsForNode(nodeId: string): TrainingLesson[] {
  const node = getNodeById(nodeId);
  if (!node) return [];

  if ('lessonIds' in node && node.lessonIds?.length) {
    return node.lessonIds
      .map((id) => lessonsById[id])
      .filter(Boolean)
      .sort((a, b) => a.order - b.order);
  }

  return Object.values(lessonsById)
    .filter((l) => l.nodeId === nodeId)
    .sort((a, b) => a.order - b.order);
}
