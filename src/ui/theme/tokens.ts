/**
 * Central theme tokens export
 * Re-exports all theme tokens in a single place
 */
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
} as const;

export type Theme = typeof theme;

// Re-export individual modules for convenience
export { colors, typography, spacing, radius, shadows };

