import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Locale = 'es' | 'en' | 'fr' | 'pt';

// Import translation files
import esTranslations from '../i18n/es.json';
import enTranslations from '../i18n/en.json';
import frTranslations from '../i18n/fr.json';
import ptTranslations from '../i18n/pt.json';

const translations = {
    es: esTranslations,
    en: enTranslations,
    fr: frTranslations,
    pt: ptTranslations,
};

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => Promise<void>;
    t: (key: string) => string;
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
                // Default to Spanish
                setLocaleState('es');
                await AsyncStorage.setItem('appLang', 'es');
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

    const t = (key: string): string => {
        const currentTranslations = translations[locale];
        const value = currentTranslations[key];

        // If not found in current locale, try English as fallback
        if (value === undefined) {
            const englishValue = translations.en[key];
            return englishValue || key; // Return the key if not found anywhere
        }

        return value;
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
