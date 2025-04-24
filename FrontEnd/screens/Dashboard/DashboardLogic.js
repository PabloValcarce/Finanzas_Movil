import { useTheme } from '../../context/ThemeContext';
import { lightColors, darkColors } from '../../styles/colors';

export const useDashboardLogic = () => {
  const { isDark } = useTheme(); // Obtenemos el estado de 'isDark' desde el contexto

  // Seleccionar los colores según el tema
  const colors = isDark ? darkColors : lightColors;

  return { colors }; // Devolvemos los colores según el tema
};
