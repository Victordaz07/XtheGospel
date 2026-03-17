import React, { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import type { Locale } from '../context/I18nContext';
import { LANGUAGE_OPTIONS } from '../i18n/locales';
import './LanguagePicker.css';

interface LanguagePickerProps {
    compact?: boolean;
}

const languageOptions: { code: Locale; name: string; flag: string }[] = [
    ...LANGUAGE_OPTIONS.map((option) => ({ code: option.code, name: option.label, flag: option.flag })),
];

export const LanguagePicker: React.FC<LanguagePickerProps> = ({ compact = false }) => {
    const { locale, setLocale, t } = useI18n();
    const [modalVisible, setModalVisible] = useState(false);

    const currentLanguage = languageOptions.find(opt => opt.code === locale);

    const handleLanguageSelect = async (code: Locale) => {
        await setLocale(code);
        setModalVisible(false);
    };

    if (compact) {
        return (
            <>
                <button
                    className="language-picker-compact"
                    onClick={() => setModalVisible(true)}
                >
                    {currentLanguage?.flag} {currentLanguage?.name}
                </button>
                {modalVisible && (
                    <div className="modal-overlay" onClick={() => setModalVisible(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3 className="modal-title">{t('profile.language')}</h3>
                            {languageOptions.map((option) => (
                                <button
                                    key={option.code}
                                    className={`option-button ${locale === option.code ? 'selected' : ''}`}
                                    onClick={() => handleLanguageSelect(option.code)}
                                >
                                    <span>{option.flag} {option.name}</span>
                                    {locale === option.code && <span className="checkmark">✓</span>}
                                </button>
                            ))}
                            <button
                                className="cancel-button"
                                onClick={() => setModalVisible(false)}
                            >
                                {t('common.cancel')}
                            </button>
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <div className="language-picker">
            <button
                className="language-picker-button"
                onClick={() => setModalVisible(true)}
            >
                {t('profile.language')}: {currentLanguage?.flag} {currentLanguage?.name}
            </button>
            {modalVisible && (
                <div className="modal-overlay" onClick={() => setModalVisible(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">{t('profile.language')}</h3>
                        {languageOptions.map((option) => (
                            <button
                                key={option.code}
                                className={`option-button ${locale === option.code ? 'selected' : ''}`}
                                onClick={() => handleLanguageSelect(option.code)}
                            >
                                <span>{option.flag} {option.name}</span>
                                {locale === option.code && <span className="checkmark">✓</span>}
                            </button>
                        ))}
                        <button
                            className="cancel-button"
                            onClick={() => setModalVisible(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

