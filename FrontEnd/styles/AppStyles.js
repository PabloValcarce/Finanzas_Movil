import { StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightColors, darkColors } from './colors'; // Colores para modo claro y oscuro

export default function useAppStyles() {
  const { isDark } = useTheme(); // Obtenemos si el tema actual es oscuro o claro
  const colors = isDark ? darkColors : lightColors; // Elegimos los colores según el tema

  return StyleSheet.create({
    // Estilo para contenedores y fondos
    secondary: {
      flex: 1,
      backgroundColor: colors.secondary, // Usamos el color correspondiente
    },
    primary: {
      backgroundColor: colors.primary,
    },
    text: {
      color: colors.text,  // El color de texto depende del tema
      fontFamily: 'Fenix-Regular', // Asegúrate de que esta fuente esté disponible
      fontSize: 16,
    },
    table: {
      backgroundColor: colors.tableBackground, // Color de fondo de la tabla según el tema
    },
    background: {
      backgroundColor: colors.background, // Color de fondo de la aplicación
    },
    button: {
      backgroundColor: colors.button, // El color de los botones
    },
    buttonHover: {
      backgroundColor: colors.buttonHover, // Hover button color
    },
  });
}
