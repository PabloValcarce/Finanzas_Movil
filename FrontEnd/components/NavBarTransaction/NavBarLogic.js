import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useNavBarLogic = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigation = useNavigation();
    

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const access_token = await AsyncStorage.getItem('access_token');

                if (!access_token) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Dashboard' }]
                    });
                }
            } catch (error) {
            }
        };
        
        checkAuth();
    }, [navigation]); // Agregamos navigation como dependencia

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('access_token');

            const tokenAfterLogout = await AsyncStorage.getItem('access_token'); // Verificar si se eliminó

            navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }]
            });
        } catch (error) {
            console.error("❌ Error al cerrar sesión:", error);
        }
    };

    return { isMenuOpen, toggleMenu, handleLogout };
};
