/**
 * Color palette for the UI Kit
 * Extracted from the learning role implementation
 */
export const colors = {
  // Primary colors
  primary: '#4F46E5',
  primaryLight: '#6366F1',
  primaryDark: '#4338CA',
  primarySoft: '#8b5cf6', // Used in gradients
  
  // Secondary colors
  secondary: '#10B981',
  secondaryLight: '#34D399',
  
  // Accent colors
  accent: '#F59E0B',
  accentLight: '#FBBF24',
  
  // Background colors
  backgroundPage: '#F8FAFC',
  backgroundCard: '#FFFFFF',
  backgroundAlt: '#F1F5F9',
  backgroundElevated: '#FFFFFF',
  
  // Border colors
  borderSubtle: '#E2E8F0',
  borderDefault: '#E5E7EB',
  
  // Text colors
  textMain: '#0F172A',
  textMuted: '#64748B',
  textTertiary: '#94A3B8',
  textOnPrimary: '#FFFFFF',
  
  // Status colors
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
} as const;

export type ColorKey = keyof typeof colors;

