import { StyleSheet } from 'react-native';

// Definir colores de manera explícita
const colors = {
  primary: '#144468',
  secondary: '#4682B4',
  tableBackground:'#ddd',
  tertiary: '#87CEFA',
  button: '#FF4500',
  buttonHover: '#f0c8a5',
  text: 'white',
};

export default StyleSheet.create({
  // Estilo global para la aplicación
  secondary: {
    flex: 1,
    backgroundColor: colors.secondary, // Usamos el color definido
  },
  primary:{
    backgroundColor: colors.primary,
  },
  // Estilos para texto
  text: {
    color: colors.text,
    fontFamily: 'Fenix-Regular', // Asegúrate de cargar la fuente más adelante
    fontSize: 16,
  },
  table:{
    backgroundColor:colors.tableBackground,
  }

  
});
