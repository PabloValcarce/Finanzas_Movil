import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const useSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadPreferences = async () => {
      const storedDarkMode = await AsyncStorage.getItem('dark_mode');
      if (storedDarkMode !== null) {
        setDarkMode(JSON.parse(storedDarkMode));
      }
    };
    loadPreferences();
  }, []);

  const toggleDarkMode = async () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    await AsyncStorage.setItem('dark_mode', JSON.stringify(newValue));
    // Aquí puedes disparar algo como un cambio de tema en tu contexto global
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
}, [navigation]);

  const handleLogout = async () => {
    try {
        await AsyncStorage.removeItem('access_token');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }]
        });
    } catch (error) {
        console.error("❌ Error al cerrar sesión:", error);
    }
};

  return {
    darkMode,
    toggleDarkMode,
    handleLogout,
  };
};

export default useSettings;
