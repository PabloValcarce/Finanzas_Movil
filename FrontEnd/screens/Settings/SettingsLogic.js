import { useTheme } from '../../context/ThemeContext'; // Usar el contexto para el tema
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSettings = () => {
  const { isDark} = useTheme();  // Obtener el tema y la función para alternarlo
  const navigation = useNavigation();

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
    isDark,  
    handleLogout,
  };
};

export default useSettings;
