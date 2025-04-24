import { StyleSheet, Dimensions } from 'react-native';
import { lightColors, darkColors } from '../../styles/colors';

const { width } = Dimensions.get('window');

export const styles = (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    navbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: colors.primary,
      width: width,
      height: 50,
      position: 'absolute',
      left: 0,
      zIndex: 1000,
    },
    brand: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    menu: {
      flexDirection: 'column',
      backgroundColor: colors.secondary,
      width: width * 0.85,
      zIndex: 1010,
      position: 'absolute',
      top: 50,
      left: '7.5%',
      right: '7.5%',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    menuOpen: {
      display: 'flex',
    },
    menuItem: {
      color: colors.text,
      fontSize: 18,
    },
    menuItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 10,
    },
    hamburger: {
      flexDirection: 'column',
    },
    bar: {
      width: 25,
      height: 3,
      backgroundColor: colors.text,
      marginVertical: 4,
    },
    logoutButton: {
      backgroundColor: 'transparent',
      fontSize: 16,
    },
    icon: {
      color: colors.text,
    },
  });
};
