import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { StorageService } from '../utils/storage';
import { normalizeStoredRole } from '../config/roles';

// Import JSON translation files
import esTranslations from '../../i18n/es.json';
import enTranslations from '../../i18n/en.json';
import frTranslations from '../../i18n/fr.json';
import ptTranslations from '../../i18n/pt.json';
import missionaryEsTranslations from '../i18n/missionary.es.json';
import memberEsTranslations from '../i18n/member.es.json';
import memberEnTranslations from '../i18n/member.en.json';
import memberFrTranslations from '../i18n/member.fr.json';
import memberPtTranslations from '../i18n/member.pt.json';

const dictionaries = {
    es: esTranslations,
    en: enTranslations,
    fr: frTranslations,
    pt: ptTranslations,
};

// Diccionario de misioneros (solo español por ahora)
const missionaryDictionaries = {
    es: missionaryEsTranslations,
    en: {}, // TODO: Agregar cuando tengamos las traducciones
    fr: {},
    pt: {},
};

const memberDictionaries = {
    es: memberEsTranslations,
    en: memberEnTranslations,
    fr: memberFrTranslations,
    pt: memberPtTranslations,
};

export type Locale = 'es' | 'en' | 'fr' | 'pt';

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => Promise<void>;
    t: (path: string, vars?: Record<string, string | number>) => string;
    setUserRole: (role: string | null) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Helper to get nested value from object using dot notation
const getNestedValue = (obj: Record<string, any>, path: string): any => {
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            return undefined;
        }
    }
    return current;
};

// Helper to apply variable substitution
const applyVars = (value: any, vars?: Record<string, string | number>): string => {
    if (value === undefined || value === null) {
        return '';
    }
    const str = value.toString();
    if (vars) {
        return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return vars[key]?.toString() || match;
        });
    }
    return str;
};

interface I18nProviderProps {
    children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
    const [locale, setLocaleState] = useState<Locale>('es');
    const [userRole, setUserRoleState] = useState<string | null>(null);

    useEffect(() => {
        loadLocale();
        // Cargar rol desde storage y normalizarlo
        const storedRoleRaw = StorageService.getItem('userRole');
        if (storedRoleRaw) {
            // Normalize role using centralized normalizer (handles legacy values)
            const normalizedRole = normalizeStoredRole(storedRoleRaw);
            setUserRoleState(normalizedRole);
        }
        
        // Escuchar cambios en storage usando storage event (más eficiente)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'userRole') {
                setUserRoleState(e.newValue);
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        // También escuchar cambios locales (mismo tab)
        const checkRole = () => {
            const currentRole = StorageService.getItem('userRole');
            if (currentRole !== userRole) {
                setUserRoleState(currentRole);
            }
        };
        
        // Usar un intervalo más largo para evitar loops
        const interval = setInterval(checkRole, 2000);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [userRole]);

    const loadLocale = async () => {
        try {
            const storedLocale = StorageService.getItem('appLang');
            if (storedLocale && ['es', 'en', 'fr', 'pt'].includes(storedLocale)) {
                setLocaleState(storedLocale as Locale);
            } else {
                // Detectar idioma del sistema
                const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;
                const detectedLocale = systemLocale.includes('es') ? 'es' : 'en';
                setLocaleState(detectedLocale);
                StorageService.setItem('appLang', detectedLocale);
            }
        } catch (error) {
            console.error('Error loading locale:', error);
            setLocaleState('es');
        }
    };

    const setLocale = async (newLocale: Locale) => {
        try {
            StorageService.setItem('appLang', newLocale);
            setLocaleState(newLocale);
        } catch (error) {
            console.error('Error saving locale:', error);
        }
    };

    // Helper para navegar objetos anidados usando path con puntos
    const getNestedValue = (obj: any, path: string): any => {
        const keys = path.split('.');
        let current = obj;
        for (const key of keys) {
            if (current === undefined || current === null) {
                return undefined;
            }
            current = current[key];
        }
        return current;
    };

    const t = (path: string, vars?: Record<string, string | number>): string => {
        // Si es misionero y la clave empieza con "missionary.", buscar primero en missionaryDictionaries
        if (userRole === 'missionary' && path.startsWith('missionary.')) {
            const missionaryTranslations = missionaryDictionaries[locale] as Record<string, any>;
            const missionaryValue = getNestedValue(missionaryTranslations, path);
            if (missionaryValue !== undefined) {
                if (vars && typeof missionaryValue === 'string') {
                    return missionaryValue.replace(/\{\{(\w+)\}\}/g, (match, key) => {
                        return vars[key]?.toString() || match;
                    });
                }
                return missionaryValue.toString();
            }
        }

        if (userRole === 'member' && path.startsWith('member.')) {
            const memberTranslations = memberDictionaries[locale] as Record<string, any>;
            const memberValue = getNestedValue(memberTranslations, path);
            const fallbackMemberTranslations = memberDictionaries.en as Record<string, any>;
            const fallbackMemberValue = getNestedValue(fallbackMemberTranslations, path);

            const resolvedMemberValue = memberValue ?? fallbackMemberValue;

            if (resolvedMemberValue !== undefined && resolvedMemberValue !== null) {
                if (vars && typeof resolvedMemberValue === 'string') {
                    return resolvedMemberValue.replace(/\{\{(\w+)\}\}/g, (match, key) => {
                        return vars[key]?.toString() || match;
                    });
                }
                return resolvedMemberValue.toString();
            }
        }

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

    const setUserRole = (role: string | null) => {
        setUserRoleState(role);
    };

    return (
        <I18nContext.Provider value={{ locale, setLocale, t, setUserRole }}>
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

