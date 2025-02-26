import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthLoadingScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const access_token = await AsyncStorage.getItem('access_token');
                setTimeout(() => {
                    navigation.replace(access_token ? 'Transactions' : 'Dashboard');
                }, 1000); // Agrega una pequeña espera para evitar transiciones abruptas
            } catch (error) {
                console.error("Error al verificar el token:", error);
                navigation.replace('Dashboard');
            }
        };

        checkAuth();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#007bff" />
        </View>
    );
};

export default AuthLoadingScreen;
