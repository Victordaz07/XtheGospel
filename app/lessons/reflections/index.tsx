import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Reflection {
    id: string;
    text: string;
    learnedWriting: string;
    mood: string;
    date: string;
    shared: boolean;
}

export default function ReflectionsScreen() {
    const insets = useSafeAreaInsets();
    const [reflection, setReflection] = useState('');
    const [learnedWriting, setLearnedWriting] = useState('');
    const [selectedMood, setSelectedMood] = useState('');
    const [shareWithMissionaries, setShareWithMissionaries] = useState(false);
    const [savedReflections, setSavedReflections] = useState<Reflection[]>([]);
    const [editingReflection, setEditingReflection] = useState<Reflection | null>(null);
    const [showMenu, setShowMenu] = useState<Reflection | null>(null);

    const moods = [
        { emoji: '😊', label: 'Feliz' },
        { emoji: '😌', label: 'Tranquilo' },
        { emoji: '🤔', label: 'Pensativo' },
        { emoji: '😢', label: 'Triste' },
        { emoji: '😤', label: 'Frustrado' },
        { emoji: '🙏', label: 'Agradecido' },
        { emoji: '😇', label: 'Inspirado' },
        { emoji: '😴', label: 'Cansado' },
    ];

    const [feedbackText, setFeedbackText] = useState('');

    useEffect(() => {
        loadReflections();
    }, []);

    const loadReflections = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@reflections');
            if (jsonValue != null) {
                const reflections = JSON.parse(jsonValue);
                // Eliminar duplicados basándose en el ID
                const uniqueReflections = reflections.filter((reflection: Reflection, index: number, self: Reflection[]) =>
                    index === self.findIndex(r => r.id === reflection.id)
                );
                setSavedReflections(uniqueReflections);

                // Si se encontraron duplicados, guardar la lista limpia
                if (uniqueReflections.length !== reflections.length) {
                    const cleanJsonValue = JSON.stringify(uniqueReflections);
                    await AsyncStorage.setItem('@reflections', cleanJsonValue);
                    console.log('Duplicados eliminados automáticamente');
                }
            }
        } catch (e) {
            console.error('Error loading reflections', e);
        }
    };

    const handleSave = async () => {
        if (reflection.trim() === '') {
            Alert.alert('Error', 'La reflexión no puede estar vacía.');
            return;
        }

        const newReflection: Reflection = {
            id: editingReflection ? editingReflection.id : Date.now().toString(),
            text: reflection.trim(),
            learnedWriting: learnedWriting.trim(),
            mood: selectedMood,
            date: editingReflection ? editingReflection.date : new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            shared: shareWithMissionaries,
        };

        let updatedReflections;
        if (editingReflection) {
            // Actualizar reflexión existente
            updatedReflections = savedReflections.map(item =>
                item.id === editingReflection.id ? newReflection : item
            );
        } else {
            // Agregar nueva reflexión
            updatedReflections = [newReflection, ...savedReflections];
        }
        try {
            const jsonValue = JSON.stringify(updatedReflections);
            await AsyncStorage.setItem('@reflections', jsonValue);
            setSavedReflections(updatedReflections);
            setReflection('');
            setLearnedWriting('');
            setSelectedMood('');
            setShareWithMissionaries(false);
            setEditingReflection(null);
            Alert.alert('Éxito', editingReflection ? 'Reflexión actualizada correctamente.' : 'Reflexión guardada correctamente.');
        } catch (e) {
            console.error('Error saving reflection', e);
            Alert.alert('Error', 'No se pudo guardar la reflexión.');
        }
    };

    const handleMenuPress = (reflectionItem: Reflection) => {
        setShowMenu(showMenu?.id === reflectionItem.id ? null : reflectionItem);
    };

    const handleMoodPress = (mood: { emoji: string; label: string }) => {
        setSelectedMood(mood.emoji);
        setFeedbackText(mood.label);
        setTimeout(() => setFeedbackText(''), 500);
    };

    const handleEdit = (reflectionItem: Reflection) => {
        setReflection(reflectionItem.text);
        setLearnedWriting(reflectionItem.learnedWriting || '');
        setSelectedMood(reflectionItem.mood || '');
        setShareWithMissionaries(reflectionItem.shared);
        setEditingReflection(reflectionItem);
        setShowMenu(null);
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            'Eliminar Reflexión',
            '¿Estás seguro de que quieres eliminar esta reflexión?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        try {
                            // Filtrar todas las reflexiones con el mismo ID (por si hay duplicados)
                            const updatedReflections = savedReflections.filter(r => r.id !== id);
                            const jsonValue = JSON.stringify(updatedReflections);
                            await AsyncStorage.setItem('@reflections', jsonValue);
                            setSavedReflections(updatedReflections);
                            setShowMenu(null);
                            Alert.alert('Éxito', 'Reflexión eliminada.');
                        } catch (e) {
                            console.error('Error deleting reflection', e);
                            Alert.alert('Error', 'No se pudo eliminar la reflexión.');
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
            <View style={styles.mainContainer}>
                <View
                    style={styles.scrollContainer}
                    onStartShouldSetResponder={() => {
                        setShowMenu(null);
                        return false; // Permite que el scroll funcione normalmente
                    }}
                >
                    <ScrollView
                        style={styles.scrollContainer}
                        showsVerticalScrollIndicator={true}
                        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
                    >
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Mis Reflexiones</Text>
                            <Text style={styles.headerSubtitle}>Comparte tus pensamientos y aprendizajes</Text>
                        </View>

                        {/* Formulario de nueva reflexión */}
                        <View style={styles.formContainer}>
                            <Text style={styles.formTitle}>{t('reflections.newReflection')}</Text>

                            <View style={styles.promptContainer}>
                                <Text style={styles.promptText}>
                                    ¿Qué aprendiste? ¿Cómo puedes aplicarlo?{'\n'}
                                    ¿Qué preguntas tienes?
                                </Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textInputDiscrete}
                                    value={reflection}
                                    onChangeText={setReflection}
                                    placeholder={t('reflections.placeholder')}
                                    placeholderTextColor="#9ca3af"
                                    multiline
                                    textAlignVertical="top"
                                    maxLength={1000}
                                />
                                <Text style={styles.characterCount}>
                                    {reflection.length} / 1000
                                </Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>📚 {t('reflections.learnedWriting')}</Text>
                                <TextInput
                                    style={styles.textInputSmall}
                                    value={learnedWriting}
                                    onChangeText={setLearnedWriting}
                                    placeholder={t('reflections.learnedWritingPlaceholder')}
                                    placeholderTextColor="#9ca3af"
                                    multiline
                                    textAlignVertical="top"
                                    maxLength={500}
                                />
                                <Text style={styles.characterCount}>
                                    {learnedWriting.length} / 500
                                </Text>
                            </View>

                            <View style={styles.moodContainer}>
                                <Text style={styles.moodLabel}>😊 {t('reflections.mood')}</Text>
                                <View style={styles.moodButtons}>
                                    {moods.map((mood) => (
                                        <TouchableOpacity
                                            key={mood.emoji}
                                            style={[
                                                styles.moodButton,
                                                selectedMood === mood.emoji && styles.moodButtonSelected
                                            ]}
                                            onPress={() => handleMoodPress(mood)}
                                        >
                                            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                {feedbackText && (
                                    <View style={styles.feedbackContainer}>
                                        <Text style={styles.feedbackText}>{feedbackText}</Text>
                                    </View>
                                )}
                            </View>

                            <View style={styles.shareContainer}>
                                <TouchableOpacity
                                    style={styles.checkboxContainer}
                                    onPress={() => setShareWithMissionaries(!shareWithMissionaries)}
                                >
                                    <View style={[
                                        styles.checkbox,
                                        shareWithMissionaries && styles.checkboxChecked
                                    ]}>
                                        {shareWithMissionaries && (
                                            <Text style={styles.checkmark}>✓</Text>
                                        )}
                                    </View>
                                    <View style={styles.checkboxTextContainer}>
                                        <Text style={styles.checkboxTitle}>Compartir con los misioneros</Text>
                                        <Text style={styles.checkboxDescription}>
                                            Permite que los misioneros vean tu reflexión para poder ayudarte mejor.
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.saveButton,
                                    reflection.trim() === '' && styles.saveButtonDisabled
                                ]}
                                onPress={handleSave}
                                disabled={reflection.trim() === ''}
                            >
                                <Text style={styles.saveButtonText}>
                                    {editingReflection ? `💾 ${t('reflections.update')}` : `💾 ${t('reflections.save')}`}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Lista de reflexiones guardadas - Optimizada */}
                        {savedReflections.length > 0 && (
                            <View style={styles.savedContainer}>
                                <View style={styles.savedHeader}>
                                    <Text style={styles.savedTitle}>📚 Reflexiones Guardadas</Text>
                                    <View style={styles.headerActions}>
                                        <Text style={styles.savedCount}>({savedReflections.length})</Text>
                                        <TouchableOpacity
                                            style={styles.cleanButton}
                                            onPress={loadReflections}
                                        >
                                            <Text style={styles.cleanButtonText}>🧹</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {savedReflections.map((item) => (
                                    <View key={item.id} style={styles.reflectionItem}>
                                        <View style={styles.reflectionHeader}>
                                            <Text style={styles.reflectionDate}>{item.date}</Text>
                                            <View style={styles.reflectionActions}>
                                                <View style={styles.menuContainer}>
                                                    <TouchableOpacity
                                                        style={styles.menuButton}
                                                        onPress={() => handleMenuPress(item)}
                                                    >
                                                        <Text style={styles.menuDots}>⋯</Text>
                                                    </TouchableOpacity>
                                                    {showMenu?.id === item.id && (
                                                        <View style={styles.menuDropdown}>
                                                            <TouchableOpacity
                                                                style={styles.menuItem}
                                                                onPress={() => handleEdit(item)}
                                                            >
                                                                <Text style={styles.menuItemText}>✏️ {t('reflections.edit')}</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={styles.menuItem}
                                                                onPress={() => handleDelete(item.id)}
                                                            >
                                                                <Text style={styles.menuItemText}>🗑️ {t('reflections.delete')}</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}
                                                </View>
                                                {item.shared && (
                                                    <View style={styles.sharedCheckmark}>
                                                        <Text style={styles.checkmarkText}>✅</Text>
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                        <Text style={styles.reflectionText} numberOfLines={3}>
                                            {item.text}
                                        </Text>
                                        {item.mood && (
                                            <View style={styles.reflectionMood}>
                                                <Text style={styles.moodEmojiSmall}>{item.mood}</Text>
                                            </View>
                                        )}
                                        {item.learnedWriting && (
                                            <Text style={styles.learnedWritingText} numberOfLines={2}>
                                                📚 {item.learnedWriting}
                                            </Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        )}

                        {savedReflections.length === 0 && (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No tienes reflexiones guardadas aún</Text>
                                <Text style={styles.emptySubtext}>
                                    Escribe tu primera reflexión usando el formulario de arriba
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    mainContainer: {
        flex: 1,
        marginHorizontal: 12,
        marginBottom: 8,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 40,
        flexGrow: 1,
    },
    header: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1f2937',
        textAlign: 'center',
        marginBottom: 6,
    },
    headerSubtitle: {
        fontSize: 15,
        color: '#6b7280',
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: '#f9fafb',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    formTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 8,
    },
    promptContainer: {
        marginBottom: 8,
        alignItems: 'center',
    },
    promptText: {
        fontSize: 13,
        color: '#6b7280',
        lineHeight: 18,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 12,
        fontSize: 15,
        color: '#374151',
        minHeight: 100,
        textAlignVertical: 'top',
    },
    textInputDiscrete: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 12,
        fontSize: 15,
        color: '#374151',
        minHeight: 40,
        textAlignVertical: 'top',
    },
    textInputSmall: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 12,
        fontSize: 15,
        color: '#374151',
        minHeight: 60,
        textAlignVertical: 'top',
    },
    characterCount: {
        fontSize: 11,
        color: '#9ca3af',
        textAlign: 'right',
        marginTop: 6,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 8,
    },
    moodContainer: {
        marginBottom: 16,
    },
    moodLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 12,
    },
    moodButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 4,
    },
    moodButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    moodButtonSelected: {
        backgroundColor: '#f1f5f9',
        borderColor: '#94a3b8',
    },
    moodEmoji: {
        fontSize: 18,
    },
    feedbackContainer: {
        marginTop: 8,
        alignItems: 'center',
    },
    feedbackText: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: '500',
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    shareContainer: {
        marginBottom: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#d1d5db',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    checkboxChecked: {
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
    },
    checkmark: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    checkboxTextContainer: {
        flex: 1,
    },
    checkboxTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    checkboxDescription: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 18,
    },
    saveButton: {
        backgroundColor: '#e0f2fe',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#0369a1',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButtonDisabled: {
        backgroundColor: '#f1f5f9',
        opacity: 0.7,
    },
    savedContainer: {
        backgroundColor: '#f9fafb',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    savedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    savedTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    savedCount: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '500',
    },
    cleanButton: {
        backgroundColor: '#f3f4f6',
        borderRadius: 16,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cleanButtonText: {
        fontSize: 16,
    },
    reflectionItem: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    reflectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    reflectionDate: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '500',
    },
    reflectionActions: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
    },
    menuContainer: {
        position: 'relative',
    },
    menuButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    menuDots: {
        fontSize: 16,
        color: '#64748b',
        fontWeight: 'bold',
    },
    menuDropdown: {
        position: 'absolute',
        top: 36,
        right: 0,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 1000,
        minWidth: 120,
    },
    menuItem: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    menuItemText: {
        fontSize: 14,
        color: '#374151',
    },
    sharedCheckmark: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#dcfce7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkText: {
        fontSize: 12,
    },
    deleteButton: {
        backgroundColor: '#fecaca',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    deleteButtonText: {
        color: '#dc2626',
        fontSize: 14,
    },
    reflectionText: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
    },
    reflectionMood: {
        marginTop: 8,
        marginBottom: 4,
    },
    moodEmojiSmall: {
        fontSize: 16,
    },
    learnedWritingText: {
        fontSize: 13,
        color: '#6b7280',
        fontStyle: 'italic',
        marginTop: 4,
        lineHeight: 18,
    },
    emptyContainer: {
        backgroundColor: '#f9fafb',
        borderRadius: 16,
        padding: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6b7280',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#9ca3af',
        textAlign: 'center',
        lineHeight: 20,
    },
});