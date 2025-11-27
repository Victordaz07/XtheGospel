import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import JSON translation files
import esTranslations from '../i18n/es.json';
import enTranslations from '../i18n/en.json';
import frTranslations from '../i18n/fr.json';
import ptTranslations from '../i18n/pt.json';

const dictionaries = {
    es: esTranslations,
    en: enTranslations,
    fr: frTranslations,
    pt: ptTranslations,
};

export type Locale = 'es' | 'en' | 'fr' | 'pt';

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => Promise<void>;
    t: (path: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
    children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
    const [locale, setLocaleState] = useState<Locale>('es');

    useEffect(() => {
        loadLocale();
    }, []);

    const loadLocale = async () => {
        try {
            const storedLocale = await AsyncStorage.getItem('appLang');
            if (storedLocale && ['es', 'en', 'fr', 'pt'].includes(storedLocale)) {
                setLocaleState(storedLocale as Locale);
            } else {
                // Detectar idioma del sistema
                const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;
                const detectedLocale = systemLocale.includes('es') ? 'es' : 'en';
                setLocaleState(detectedLocale);
                await AsyncStorage.setItem('appLang', detectedLocale);
            }
        } catch (error) {
            console.error('Error loading locale:', error);
            setLocaleState('es');
        }
    };

    const setLocale = async (newLocale: Locale) => {
        try {
            await AsyncStorage.setItem('appLang', newLocale);
            setLocaleState(newLocale);
        } catch (error) {
            console.error('Error saving locale:', error);
        }
    };

    const t = (path: string, vars?: Record<string, string | number>): string => {
        const currentTranslations = dictionaries[locale] as Record<string, string>;
        const value = currentTranslations[path];

        // Si no se encuentra en el idioma actual, buscar en inglés como fallback
        if (value === undefined) {
            const englishTranslations = dictionaries.en as Record<string, string>;
            const englishValue = englishTranslations[path];
            if (englishValue === undefined) {
                return path; // Devolver la clave si no se encuentra en ningún idioma
            }

            // Aplicar variables si existen
            if (vars && typeof englishValue === 'string') {
                return englishValue.replace(/\{\{(\w+)\}\}/g, (match, key) => {
                    return vars[key]?.toString() || match;
                });
            }

            return englishValue.toString();
        }

        // Aplicar variables si existen
        if (vars && typeof value === 'string') {
            return value.replace(/\{\{(\w+)\}\}/g, (match, key) => {
                return vars[key]?.toString() || match;
            });
        }

        return value.toString();
    };

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = (): I18nContextType => {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};
