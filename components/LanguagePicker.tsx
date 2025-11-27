import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useI18n } from '../context/I18nContext';
import { Locale } from '../i18n';

interface LanguagePickerProps {
    compact?: boolean;
}

const languageOptions: { code: Locale; name: string; flag: string }[] = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
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
            <TouchableOpacity
                style={styles.compactButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.compactText}>
                    {currentLanguage?.flag} {currentLanguage?.name}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>
                    {t('profile.language')}: {currentLanguage?.flag} {currentLanguage?.name}
                </Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{t('profile.language')}</Text>

                        {languageOptions.map((option) => (
                            <TouchableOpacity
                                key={option.code}
                                style={[
                                    styles.optionButton,
                                    locale === option.code && styles.selectedOption
                                ]}
                                onPress={() => handleLanguageSelect(option.code)}
                            >
                                <Text style={styles.optionText}>
                                    {option.flag} {option.name}
                                </Text>
                                {locale === option.code && (
                                    <Text style={styles.checkmark}>✓</Text>
                                )}
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    buttonText: {
        fontSize: 16,
        color: '#2c3e50',
        textAlign: 'center',
    },
    compactButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    compactText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: '80%',
        maxWidth: 300,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#f8f9fa',
    },
    selectedOption: {
        backgroundColor: '#e3f2fd',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    optionText: {
        fontSize: 16,
        color: '#2c3e50',
    },
    checkmark: {
        fontSize: 18,
        color: '#007AFF',
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 15,
        padding: 10,
        alignItems: 'center',
    },
    cancelText: {
        fontSize: 16,
        color: '#7f8c8d',
    },
});
