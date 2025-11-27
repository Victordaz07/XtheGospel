import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export default function AuthScreen() {
    const { login, isLoading } = useAuth();
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const insets = useSafeAreaInsets();

    const handleRoleSelection = (role: string) => {
        setSelectedRole(role);
    };

    const confirmLogin = async () => {
        if (!selectedRole) {
            Alert.alert('Selección requerida', 'Por favor selecciona un rol para continuar');
            return;
        }

        try {
            await login(selectedRole);
        } catch (error) {
            Alert.alert('Error', 'No se pudo iniciar sesión. Intenta nuevamente.');
            console.error('Login error:', error);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Image
                source={{ uri: 'https://img.icons8.com/clouds/300/000000/lDS-mormon.png' }}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Selecciona tu rol para continuar</Text>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[
                        styles.roleButton,
                        selectedRole === 'investigator' && styles.roleButtonSelected
                    ]}
                    onPress={() => handleRoleSelection('investigator')}
                >
                    <Text style={[
                        styles.roleButtonText,
                        selectedRole === 'investigator' && styles.roleButtonTextSelected
                    ]}>
                        👤 Investigador
                    </Text>
                    <Text style={styles.roleDescription}>
                        Estoy aprendiendo sobre el evangelio
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.roleButton,
                        selectedRole === 'missionary' && styles.roleButtonSelected
                    ]}
                    onPress={() => handleRoleSelection('missionary')}
                >
                    <Text style={[
                        styles.roleButtonText,
                        selectedRole === 'missionary' && styles.roleButtonTextSelected
                    ]}>
                        🙌 Misionero
                    </Text>
                    <Text style={styles.roleDescription}>
                        Estoy enseñando el evangelio
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[
                    styles.loginButton,
                    (!selectedRole || isLoading) && styles.loginButtonDisabled
                ]}
                onPress={confirmLogin}
                disabled={!selectedRole || isLoading}
            >
                <Text style={styles.loginButtonText}>
                    {isLoading ? 'Cargando...' : 'Continuar'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        marginBottom: 40,
        textAlign: 'center',
    },
    buttonsContainer: {
        width: '100%',
        marginBottom: 30,
    },
    roleButton: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    roleButtonSelected: {
        borderColor: '#007AFF',
        backgroundColor: '#f0f8ff',
    },
    roleButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 5,
    },
    roleButtonTextSelected: {
        color: '#007AFF',
    },
    roleDescription: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    loginButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    loginButtonDisabled: {
        backgroundColor: '#ccc',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});