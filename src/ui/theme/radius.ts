/**
 * Border radius values for the UI Kit
 */
export const radius = {
  small: '6px',
  medium: '10px',
  large: '16px',
  xl: '20px',
  xxl: '28px',
  full: '9999px',
} as const;

export type RadiusKey = keyof typeof radius;

