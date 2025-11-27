import en from './en';
import es from './es';
import fr from './fr';
import pt from './pt';

export type Locale = 'es' | 'en' | 'fr' | 'pt';

export const dictionaries: Record<Locale, object> = {
    en,
    es,
    fr,
    pt,
};
