import { StyleSheet, Dimensions } from 'react-native';
import AppStyles from '../../styles/AppStyles'; 

const { width, height } = Dimensions.get('window'); // Obtiene el tamaño de la pantalla

export default StyleSheet.create({
  container: {
    ...AppStyles.secondary, // Usa estilos globales
    justifyContent: 'center',  // Alineación de los elementos en el contenedor
    alignItems: 'center',  // Centra los elementos en el eje horizontal
    backgroundColor: AppStyles.secondary.backgroundColor,
  },

  dashboardContainer: {
    width: width *0.8,
    height: height * 0.85,
    backgroundColor: AppStyles.primary.backgroundColor,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

