export const SUPPORTED_LOCALES = ['es', 'en', 'fr', 'pt'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';
export const FALLBACK_LOCALE: Locale = 'en';

export const LOCALE_STORAGE_KEY = 'appLang';

export const LANGUAGE_OPTIONS: { code: Locale; label: string; flag: string }[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
];

export function isSupportedLocale(value: string | null | undefined): value is Locale {
  if (!value) return false;
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function mapSystemLocale(systemLocale: string): Locale {
  const normalized = systemLocale.toLowerCase();
  if (normalized.startsWith('es')) return 'es';
  if (normalized.startsWith('fr')) return 'fr';
  if (normalized.startsWith('pt')) return 'pt';
  return 'en';
}
