import { StyleSheet, Dimensions } from 'react-native';
import AppStyles from '../../styles/AppStyles';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: AppStyles.primary.backgroundColor, // Reemplaza con tu variable de color primario
        width: width,
        height: 50,
        position: 'absolute',
        left: 0,
        zIndex: 1000,
    },
    brand: {
        fontSize: 24, // 1.5em en React Native
        fontWeight: 'bold',
        textDecorationLine: 'none',
        color: '#fff', // Reemplaza con tu variable de texto
    },
    // Menú que se despliega
    menu: {
        flexDirection: 'column',
        gap: 10,
        backgroundColor: AppStyles.secondary.backgroundColor,
        width: width * 0.85,
        zIndex: 1010,
        position: 'absolute',  // Esto posicionará el menú de manera absoluta
        top: 50,  // Ajusta el menú para que esté debajo de la barra de navegación
        left: '7.5%',  // Centra el menú horizontalmente en la pantalla
        right: '7.5%',  // Mantiene el menú centrado
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    menuOpen: {
        display: 'flex',
    },
    menuItem: {
        color: '#fff',
        fontSize: 18,
    },
    menuItemHover: {
        transform: [{ scale: 1.05 }],
        fontWeight: '500',
    },
    hamburger: {
        display: 'block',
        flexDirection: 'column',
        cursor: 'pointer',
    },
    hamburgerVisible: {
        display: 'flex',
    },
    bar: {
        width: 25,
        height: 3,
        backgroundColor: '#fff',  // Reemplaza con tu variable de texto
        marginVertical: 4,
    },
    logoutButton: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: '#fff',
        fontSize: 16,
    },
    logoutButtonHover: {
        textDecorationLine: 'underline',
    },
    // Responsive Design
    menuResponsive: {
        display: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        position: 'absolute',
        top: 50, // Ajustar según la altura del navbar
        left: 0,
        backgroundColor: '#007bff',  // Reemplaza con tu variable de color primario
        zIndex: 999,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    menuOpenResponsive: {
        display: 'flex',
    },
    hamburgerTransaction: {
        display: 'none',
    },
    hamburgerTransactionVisible: {
        display: 'flex',
    },
});

export default styles;
