import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../styles/colors'; // Asegúrate de definir estos colores en tu archivo de colores

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors; // Usamos el tema correspondiente

  return StyleSheet.create({
    container: {
      marginTop: 20,
      padding: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary, // Título con color primario según el tema
      textAlign: 'center',
      marginBottom: 10,
    },
    tableWrapper: {
      justifyContent: 'center',
      width: '100%',
    },
    table: {
      minWidth: 300,
    },
    headerRow: {
      flexDirection: 'row',
      paddingVertical: 10,
      backgroundColor: colors.tableHeader, // Color de fondo de las cabeceras
    },
    header: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.background,
      paddingVertical: 10,
      textAlign: 'center',
    },
    cell: {
      flex: 1,
      textAlign: 'center',
      width: 120,
      color: colors.text,
    },
    negative: {
      backgroundColor: '#f0c8a5',
    },
    positive: {
      backgroundColor: '#d0eaff',
    },
    noExpenses: {
      textAlign: 'center',
      color: colors.text,
      fontSize: 16,
      marginTop: 15,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    subtitle: {
      color: colors.secondary,
      fontSize: 16,
    },
    select: {
      marginTop: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 10
    },
    checkboxContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: 15,
      borderRadius: 8,
    },
    checkboxLabel: {
      fontSize: 16,
      color: colors.text,
    },
  });
};
