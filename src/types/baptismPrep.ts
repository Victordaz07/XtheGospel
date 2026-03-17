/**
 * BaptismPrep - Cloud sync data model v1
 * EPIC 2.2: wards/{wardId}/baptismPreparation/{uid}
 */

export type BaptismPrep = {
  wardId: string;
  uid: string;
  items: Record<string, { completed: boolean; completedAt?: number | null }>;
  updatedAt: number;
};
